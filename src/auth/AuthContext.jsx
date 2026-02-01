import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("customer");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setReady(true);
  }, []);

  const login = (data) => {
    localStorage.setItem("customer", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("customer");
    setUser(null);
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
