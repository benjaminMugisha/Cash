import { createContext, useEffect, useReducer, useState } from "react";
import { userInfo } from "./apiClient";

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token") || null, 
  user: null,
  loading: true, 
  sessionMessage: ""
};

function authReducer(state, action) {
  switch(action.type){
    case "LOGIN":
      return {
        ...state, token: action.payload 
    };
    case "SET_USER":
         return {
      ...state, user:action.payload, loading:false
    };
    case "LOGOUT":
      return { 
        ...initialState 
    }; 
    case "SET_SESSION_MESSAGE" :
      return {
        ...state, sessionMessage: action.payload
      }

    default:
      return state;
  };
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      if (!state.token) {
        dispatch({ type: "SET_USER", payload: null}); 
        return;
      }  

      try {  
        const res = await userInfo();

        dispatch({type: "SET_USER", payload: res.data}); 
      } catch(error) {
        console.log("Error from fetching user: ", error);
        dispatch({ type: "LOGOUT" });
      }
    };

    fetchUser(); 
  }, [state.token]);

  const login = (token) => {   
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: token });
  }

  const logout = () => { 
    localStorage.removeItem("token");  
    dispatch({ type: "LOGOUT" });
  }

  const setSessionMessage = (msg) => {
    dispatch({ type: "SET_SESSION_MESSAGE", payload: msg});
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setSessionMessage }}>
      {children}
    </AuthContext.Provider>
  );
}
