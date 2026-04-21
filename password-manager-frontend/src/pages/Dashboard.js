import { useEffect, useState } from "react";
import API from "../services/API";
import { useDispatch, useSelector } from "react-redux";
import { setPasswords, deletePassword } from "../redux/passwordSlice";
import { decryptData } from "../utils/encryption";
import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const passwords = useSelector((state) => state.passwords.list);

  const [showPasswords, setShowPasswords] = useState({});

  const fetchPasswords = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const key = sessionStorage.getItem("encKey");

      if (!key) {
        alert("Session expired. Please login again.");
        return;
      }

      const res = await API.get(`/passwords?uid=${uid}`);

      const decrypted = res.data.passwords.map((item) => ({
        ...item,
        site: item.website,
        password: decryptData(item.password, key),
      }));

      dispatch(setPasswords(decrypted));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleDelete = async (item) => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete password for ${item.site}?`
      );

      if (!confirmDelete) return;

      await API.delete(`/deletepassword?pid=${item.pid}`);

      dispatch(deletePassword(item.pid));

      fetchPasswords();

    } catch (err) {
      console.error(err);
    }
  };

  const togglePassword = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Password Manager 🔐</h2>
        <p className="subtitle">All your saved passwords in one place</p>

        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Username / Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {passwords.map((item) => (
              <tr key={item.pid}>
                <td>{item.site}</td>
                <td>{item.username}</td>
                <td>
                  <div className="password-cell">
                    {showPasswords[item.pid] ? item.password : "••••••••"}
                    <span
                      className="toggle-password"
                      onClick={() => togglePassword(item.pid)}
                    >
                      {showPasswords[item.pid] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4f46e5" viewBox="0 0 24 24">
                          <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4f46e5" viewBox="0 0 24 24">
                          <path d="M12 5c-7.633 0-12 7-12 7 1.747 2.717 4.477 5 12 5s10.253-2.283 12-5c0 0-4.367-7-12-7zm0 10c-2.757 0-5-2.243-5-5 0-.926.275-1.788.738-2.5l6.762 6.762c-.712.463-1.574.738-2.5.738zm4.262-1.262l-6.762-6.762c.712-.463 1.574-.738 2.5-.738 2.757 0 5 2.243 5 5 0 .926-.275 1.788-.738 2.5z"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;