import { createContext, useState, useEffect, useRef, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem("token") || null, 
  user: null,
  loading: true
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
        ...state, token:null, user:null
    }; 

    default:
      return state;
  };
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const firstRender = useRef();


  useEffect(() => {
    if (firstRender.current) {
        firstRender.current = false;
        return;
      }
    const fetchUser = async () => {
      if (!state.token) return;

      try {  
        const res = await fetch("http://localhost:8080/api/v2/auth/me", {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        
        const data = await res.json();
        dispatch({type: "SET_USER", payload: data}); 
      } catch (error) {
        console.error("Error fetching user:", error);
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

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
