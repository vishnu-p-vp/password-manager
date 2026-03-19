import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ storedPasswords }) => {
  const navigate = useNavigate();

  return (
  <div
    style={{
      minHeight: "100vh", /* full viewport height */
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4f46e5, #9333ea)", /* same as login/dashboard */
      padding: "20px"
    }}
  >
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9"
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Welcome!</h1>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        You have <strong>{ storedPasswords==null ? "3" : storedPasswords?.length}</strong> passwords stored.
      </p>

      <div>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            marginRight: "15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Show Passwords
        </button>

        <button
          onClick={() => navigate("/add-password")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Add a Password
        </button>
      </div>
    </div>
    </div>
  );
};

export default HomePage;