import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 🚨 THIS LINE IS CRITICAL
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#ffffff",
            color: "#1b5e20",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          },
        }}
      />
    </>
  </React.StrictMode>
);
