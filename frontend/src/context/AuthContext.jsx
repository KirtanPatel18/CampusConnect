import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setIsLoggedIn(true);
        setUserId(data.userId);
      } catch (err) {
        setIsLoggedIn(false);
        setUserId(null);
        console.error("Auth check failed:", err);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/logout", {
        credentials: "include",
        method: "GET",
      });

      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(false);
        setUserId(null);
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, logout, setIsLoggedIn, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
