import toast from "react-hot-toast";
import logo from "../assets/aarogya-logo.jpeg";

export const showToast = (message) => {
  toast.custom(
    (t) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          maxWidth: "320px",
        }}
      >
        <img
          src={logo}
          alt="Aarogya"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <div>
          <p style={{ fontWeight: 600, color: "#1b5e20" }}>
            Aarogya Harvest
          </p>
          <p style={{ fontSize: 14, color: "#444" }}>
            {message}
          </p>
        </div>
      </div>
    ),
    { duration: 5000 }
  );
};
