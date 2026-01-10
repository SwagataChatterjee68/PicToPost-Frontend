import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 200) {
        localStorage.removeItem("user");
        alert("Logout successful");
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("Unable to logout");
    }

    setLoggingOut(false);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">PicToPost</h1>

      <button
        className="logout-btn"
        onClick={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </nav>
  );
}
