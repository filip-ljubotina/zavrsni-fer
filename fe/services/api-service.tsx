"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "https://zavrsni-be-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const addTokenToHeaders = () => {
  const token = localStorage.getItem("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const ApiService = {
  get: async (url: string) => {
    addTokenToHeaders();
    return await api.get(url);
  },

  post: async (url: string, data: any) => {
    addTokenToHeaders();
    return await api.post(url, data);
  },

  put: async (url: string, data: any) => {
    addTokenToHeaders();
    return await api.put(url, data);
  },

  delete: async (url: string) => {
    addTokenToHeaders();
    return await api.delete(url);
  },
};

export default ApiService;
