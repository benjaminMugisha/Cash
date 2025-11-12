import axios from "axios"; 

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v2", 
});

export const deposit = (amount) => {
  return apiClient.patch(`/accounts/deposit`, { amount });
}

export const withdraw = (amount) => {
  return apiClient.patch(`/accounts/${id}/withdraw`, { amount });
}

export const transfer = ( toIban, amount) => {
  return apiClient.patch("/accounts/transfer", { toIban, amount });
}

apiClient.interceptors.request.use(
 (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (err) => Promise.reject(err)
  );

export default apiClient;
