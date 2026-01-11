import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: "include", // ✅ REQUIRED
        }
      );

      if (response.ok) {
        navigate("/generate");
      } else {
        const data = await response.json();
        alert(data.message || "Login failed");
      }
    } catch {
      alert("Server connection failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1 className="heading">Hello Again</h1>
        <p className="sub-heading">
          Log in to create captions and social-ready content
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text" // ✅ FIXED
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="primary-btn">Login</button>
        </form>

        <div className="footer">
          <p>No account yet?</p>
          <Link to="/signup">Create one here</Link>
        </div>
      </div>
    </div>
  );
}
