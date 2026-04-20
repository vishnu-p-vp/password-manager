import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPassword } from "../redux/passwordSlice";
import { encryptData } from "../utils/encryption";
import API from "../services/API";
import "./PasswordForm.css";

function PasswordForm() {
  const dispatch = useDispatch(); 

  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
  try {
    const uid = localStorage.getItem("uid");
    const key = sessionStorage.getItem("encKey");

    if (!key) {
      alert("Session expired. Please login again.");
      return;
    }

    const encryptedPassword = encryptData(password, key);

    const formData = new FormData();
    formData.append("url", site);
    formData.append("uid", uid);
    formData.append("username", username);
    formData.append("email", username);
    formData.append("password", encryptedPassword);

    const res = await API.post("/newpasswordstore", formData);

    dispatch(addPassword({
      ...res.data,
      password, // store decrypted in redux for UI
    }));

    setSite("");
    setUsername("");
    setPassword("");

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Add New Password 🔑</h2>

        <input
          type="text"
          placeholder="Website / URL"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}

export default PasswordForm;