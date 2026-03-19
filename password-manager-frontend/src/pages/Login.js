import { useState } from "react";
import API from "../services/API";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import "../pages/login.css";

function Login() {

  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data.token));
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
  <div className="login-box">
    <h2>Password Manager 🔐</h2>
    <p className="subtitle">Login to your account</p>

    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />

    <button>Login</button>

    <p className="footer-text">
      Don't have an account? <span>Register</span>
    </p>
  </div>
</div>
  );
}

export default Login;