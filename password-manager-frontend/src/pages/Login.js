import { useState } from "react";
import API from "../services/API";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { generateKey } from "../utils/encryption";
import CryptoJS from "crypto-js";
import "../pages/login.css";

function Login() {

  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    // 🔑 Generate encryption key
    const encryptionKey = generateKey(password);

    // store temporarily
    sessionStorage.setItem("encKey", encryptionKey);

    // 🔐 hash for backend auth
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("hashed_master_password", hashedPassword);

    const res = await API.post("/login", formData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("uid", res.data.uid);

    dispatch(loginSuccess(res.data.token));
    navigate("/home");

  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <div className="login-container">
  <div className="login-box">
    <h2>Password Manager 🔐</h2>
    <p className="subtitle">Login to your account</p>

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

<button onClick={handleLogin}>Login</button>

    <p className="footer-text">
      Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
    </p>
  </div>
</div>
  );
}

export default Login;