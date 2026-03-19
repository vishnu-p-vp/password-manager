import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPassword } from "../redux/passwordSlice";
import API from "../services/API";
import "./PasswordForm.css";

function PasswordForm() {
  const dispatch = useDispatch(); 

  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await API.post("/add-password", {
      site,
      username,
      password,
    });

    dispatch(addPassword(res.data));

    // clear inputs
    setSite("");
    setUsername("");
    setPassword("");
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