import os
import re
from typing import List, Dict, Any

from src.scanner.validators.validator_factory import ValidatorFactory

# High-precision Regex patterns for common leaked secrets
SECRET_PATTERNS = {
    "AWS Access Key": r"AKIA[0-9A-Z]{16}",
    "GitHub Personal Access Token": r"ghp_[a-zA-Z0-9]{36}",
    "Slack Bot Token": r"xoxb-[0-9]{11}-[0-9]{11}-[a-zA-Z0-9]{24}",
    "OpenAI API Key": r"sk-(proj-)?[a-zA-Z0-9_-]{32,}",
    "Generic API Key": r"(?i)(api|key|secret|password|token)\s*[:=]\s*['\"]([A-Za-z0-9_\-]{10,})['\"]",
    "RSA Private Key": r"-----BEGIN " + r"RSA PRIVATE KEY-----",
    "JWT Token": r"eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*"
}

# Directories to ignore during scan
IGNORED_DIRS = {
    ".git", "node_modules", "venv", ".venv", "__pycache__", 
    "build", "dist", "bin", "obj", ".idea", ".vscode","Readme.md", "LICENSE", "docs", "tests", "test"
}

# Binary and non-text file extensions to skip automatically
IGNORED_EXTENSIONS = {
    ".exe", ".dll", ".so", ".dylib", ".pyc", ".toc", 
    ".pkg", ".zip", ".tar", ".gz", ".png", ".jpg", ".jpeg"
}

class SecretDetector:
    """Scans files in a directory for hardcoded secrets and credentials."""

    def __init__(self, target_dir: str):
        self.target_dir = target_dir

    async def scan(self) -> List[Dict[str, Any]]:
        findings = []

        for root, dirs, files in os.walk(self.target_dir):
            # Skip ignored directories
            dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]

            for file in files:
                # Skip binary files based on extension
                if any(file.lower().endswith(ext) for ext in IGNORED_EXTENSIONS):
                    continue

                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, self.target_dir)

                # Skip non-text files gracefully
                try:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                        for line_no, line in enumerate(f, start=1):
                            for secret_type, pattern in SECRET_PATTERNS.items():
                                match = re.search(pattern, line)
                                if match:
                                    full_match = match.group(0)
                                    
                                    # Extract inner group for generic keys if present, else full match
                                    token_to_validate = match.group(2) if secret_type == "Generic API Key" and match.lastindex and match.lastindex >= 2 else full_match

                                    # 1. LIVE VALIDATION CALL
                                    status = await ValidatorFactory.validate(secret_type, token_to_validate)

                                    # 2. SEVERITY ELEVATION (ACTIVE keys become CRITICAL)
                                    severity = "CRITICAL" if status == "ACTIVE" else ("HIGH" if "Key" in secret_type or "Token" in secret_type else "MEDIUM")

                                    # 3. MASK MATCH FOR DISPLAY
                                    masked_match = full_match[:10] + "..." if len(full_match) > 10 else full_match

                                    findings.append({
                                        "file_path": relative_path,
                                        "line_number": line_no,
                                        "issue_type": secret_type,
                                        "severity": severity,
                                        "raw_match": masked_match,
                                        "validation_status": status,  # <--- CRITICAL FIELD
                                        "commit_hash": None,
                                        "author": None
                                    })
                except Exception:
                    # Skip unreadable binary files
                    continue

        return findings