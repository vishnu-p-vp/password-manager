import { useState } from "react";
import API from "../services/API";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../pages/login.css"; // reuse same design

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const handleRegister = async () => {
  try {
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const res = await API.post("/register", {
      username,
      email,
      hashedPassword,
    });

    alert("Registration successful!");
    navigate("/");
  } catch (err) {
    alert("Registration failed");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account 📝</h2>
        <p className="subtitle">Register to get started</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p className="footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;