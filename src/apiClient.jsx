import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v2", 
});
export default apiClient;

//request interceptor to add the token in the header. 
apiClient.interceptors.request.use( (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(err) => Promise.reject(err)
);

//response interceptor to detect expired tokens: 
apiClient.interceptors.response.use(
  (response) => response ,
  (error) => {
    if (
      error.response && error.response.status === 401 &&
      error.response.data.message === "JWT token has expired. Please log in again."
    ) {

      //clear token and redirect the user to login.
      localStorage.removeItem("token");
      // sendSessionExpiredMessage("your session has expired. Please login again");
      localStorage.setItem("sessionMessage", "Your session has expired. Please login again");
      window.location.href = "/login" //redirecting.
    }

    return Promise.reject(error); 
  }
) 

export const deposit = (amount) => {
  return apiClient.patch(`/accounts/deposit`, { amount });
}

export const withdraw = (amount) => {
  return apiClient.patch(`/accounts/withdraw`, { amount });
}

export const transfer = ( toIban, amount) => {
  return apiClient.patch("/accounts/transfer", { toIban, amount });
}

export const getLoans = (pageNo, pageSize) => {
  return apiClient.get(`/auth/me/loans`, { 
  params: { pageNo, pageSize }});
}

export const ddCreate = (toIban, amount) => {
  return apiClient.post("/dd/create", {
    toIban, amount
  })
}

export const ddUpdate = (id, amount) => {
  return apiClient.patch(`/dd/update/${id}`, { amount});
}

export const repayCustom = (loanId, amount) => {
  return apiClient.patch(`/loans/repay/${loanId}`, { amount });
}

export const repayFullLoan = (loanId) => { 
  return apiClient.patch(`/loans/repay-full/${loanId}`);
}

export const getAccounts = (pageNo, pageSize) =>{
  return apiClient.get(`/accounts/all`, {
    params: { pageNo, pageSize }});
} 

export const getDirectDebits = (pageNo, pageSize) => {
  return apiClient.get(`/auth/me/direct-debits`, {
    params: { pageNo, pageSize}
  });
}

export const cancelDD = (loanId) => {
  return apiClient.patch(`dd/cancel/${loanId}`);
}

 export const applyForLoan = (income, principal, monthsToRepay) => {
  return apiClient.post(`/loans/apply`, 
   { income, principal, monthsToRepay }
  );
 }

export const getTransactions = (pageNo, pageSize) => {
  return apiClient.get("/transactions", {
    params : { pageNo, pageSize }
  })
}


export const userInfo = () => {
  return apiClient.get("/auth/me");
}


export const getLoanInfo = (loanId) => {
  return apiClient.get(`/loans/${loanId}`);
}
