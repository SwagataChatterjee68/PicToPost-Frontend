import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
          credentials: "include", // ✅ REQUIRED
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully");
        navigate("/"); // go to login
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="wrapper">
      <div className="register-card">
        <h1>Join PicToPost</h1>
        <p className="sub-heading">
          Build your account to transform images into social media posts
        </p>

        <form onSubmit={handleRegister}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="submit-btn">Register</button>
        </form>

        <p className="link-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
