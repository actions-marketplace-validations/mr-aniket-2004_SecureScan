import axios from "axios";

// Base URL targeting the API prefix
// const API_BASE_URL = "https://securescan-hg2e.onrender.com/api/v1";
export const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const triggerScan = async (repoUrl) => {
  const response = await axios.post(`${API_BASE_URL}/scan`, {
    repo_url: repoUrl,
  });
  return response.data;
};

export const fetchScanStatus = async (jobId) => {
  const response = await axios.get(`${API_BASE_URL}/scan/${jobId}`);
  return response.data;
};

export const getPdfDownloadUrl = (jobId) => {
  return `${API_BASE_URL}/scan/${jobId}/pdf`;
};
