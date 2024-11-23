import axios from 'axios';

// Mock API delay
const MOCK_API_DELAY = 1500;

export const api = {
  get: async (url: string) => {
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
    return axios.get(url);
  },
  post: async (url: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
    return axios.post(url, data);
  }
};

