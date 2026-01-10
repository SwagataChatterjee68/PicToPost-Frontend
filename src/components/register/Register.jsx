import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.css";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("user", data.username);
        alert("Account created successfully");
        navigate("/generate");
      } else {
        alert(data.message);
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
          Build your account to transform images into social media posts{" "}
        </p>
        <form onSubmit={handleRegister}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
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
