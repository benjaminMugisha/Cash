import { createContext, useState, useEffect, useRef } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useState(null);
  const firstRender = useRef(true); 

  useEffect(() => {
    const fetchUser = async () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8080/api/v2/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser(); 
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
