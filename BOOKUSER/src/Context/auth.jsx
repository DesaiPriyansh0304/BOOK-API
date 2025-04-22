import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [user, setUser] = useState(null);
  const authorizationToken = `Bearer ${token}`;


  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };
  console.log("✌️user --->", user);

  const userAuthentication = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/user", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      if (err.response && err.response.status === 401) {
        // Handle unauthorized error
        setUser(null);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, storeTokenInLS, authorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authcontextValue = useContext(AuthContext);

  if (!authcontextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authcontextValue;
};

export default AuthContext;
// export { useAuth };
