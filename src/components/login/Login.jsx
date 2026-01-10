import { useState } from "react";
import "./login.css";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("user", data.username);
        window.location.href = "/generate";
      } else if (response.status === 401) {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };
  return (
    <div className="page-wrapper">
      <div className="card">
        <h1 className="heading">Hello Again</h1>
        <p className="sub-heading">
          Log in to create captions, hashtags and social ready content
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="string"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="primary-btn">Login</button>
        </form>
        <div className="footer">
          <p>No account yet?</p> <a href="/signup">Create one here</a>
        </div>
      </div>
    </div>
  );
}
