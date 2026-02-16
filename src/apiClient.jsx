import axios from "axios";   

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v2", 
});
export default apiClient;

apiClient.interceptors.request.use( (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(err) => Promise.reject(err)
);

apiClient.interceptors.response.use(
  (response) => response ,
  (error) => {
    if (
      error.response && error.response.status === 401 &&
      error.response.data.message === "JWT token has expired. Please log in again."
    ) {

      localStorage.removeItem("token");
      localStorage.setItem("sessionMessage", "Your session has expired. Please login again");
      window.location.href = "/login" 
    }

    return Promise.reject(error); 
  }
) 

export const loginEndpoint = () => {
  return apiClient.post(`/auth/login`, {
    email, password
  })
}
export const register = (firstName, lastName, accountUsername, balance, email, password) => {
  return apiClient.post(`/auth/register`, 
  {firstName, lastName, accountUsername, balance, email, password}); 
}

export const userInfo = () => {
  return apiClient.get("/auth/me");
}


export const getAccounts = (pageNo, pageSize) =>{
  return apiClient.get(`/accounts/all`, {
    params: { pageNo, pageSize }});
} 
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
  return apiClient.get(`/loans/account`, { 
  params: { pageNo, pageSize }});
}
export const getLoanInfo = (loanId) => {
  return apiClient.get(`/loans/${loanId}`);
}
export const repayCustom = (loanId, amount) => {
  return apiClient.patch(`/loans/repay/${loanId}`, { amount });
}
export const repayFullLoan = (loanId) => { 
  return apiClient.patch(`/loans/repay-full/${loanId}`);
}
export const applyForLoan = (income, principal, monthsToRepay) => {
  return apiClient.post(`/loans/apply`, 
   { income, principal, monthsToRepay }
  );
}




export const ddCreate = (toIban, amount) => {
  return apiClient.post(`/dd/create`, {
    toIban, amount
  })
}
export const ddUpdate = (id, amount) => {
  return apiClient.patch(`/dd/update/${id}`, { amount});
}
export const getDirectDebits = (pageNo, pageSize) => {
  return apiClient.get(`/dd/all`, {
    params: { pageNo, pageSize}
  });
}
export const cancelDD = (loanId) => {
  return apiClient.patch(`dd/cancel/${loanId}`);
}
export const getAllDds = (pageNo, pageSize) => {
  return apiClient.get(`/dd/dd`, {
    params: { pageNo, pageSize}
  });
}




export const getTransactions = (pageNo, pageSize) => {
  return apiClient.get("/transactions/tx", {
    params : { pageNo, pageSize }
  })
}
export const getUserTransactions = (pageNo, pageSize) => {
  return apiClient.get("/transactions", {
    params : { pageNo, pageSize }
  })
}




//admin
export const getAdminCount = () => {
  return apiClient.get("/admin/stats")
}

export const getAdminDD = (pageNo, pageSize) => {
  return apiClient.get("/dd/dd", {
    params : {pageNo, pageSize}
  })
}
export const getAdminLoans = (pageNo, pageSize) => {
  return apiClient.get("/loans", {
    params: {pageNo, pageSize}
  });
}
export const getAdminTx = (pageNo, pageSize) => {
  return apiClient.get("/transactions/tx", {
    params: {pageNo, pageSize}
  });
}
export const getActiveDds = (pageNo, pageSize) => {
  return apiClient.get("/dd/activedd", {
    params: {pageNo, pageSize}
  });
} 
export const registerAdmin = (firstName, lastName, email, password) => {
  return apiClient.post("/auth/create-admin", {
    firstName, lastName, email, password
  });
}

export const getAdmins = (pageNo, pageSize) => {
  return apiClient.get("/auth/admins", {
    params: {pageNo, pageSize}
  });
}

export const getInactiveUsers = (pageNo, pageSize) => {
  return apiClient.get(`/auth/inactive`, {
    params: {pageNo, pageSize}
  })
}

export const deactivateUser = (id) => {
  return apiClient.patch(`/auth/deactivate/${id}`);
}

export const reactivateUser = (id) => {
  return apiClient.patch(`/auth/reactivate/${id}`);
}
export const getUsers = (pageNo, pageSize) => {
  return apiClient.get("/auth/users", {
    params: {pageNo, pageSize}
  });
}
