import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.includes("token");

    if (token) {
      setAllowed(true);
      alert("You are logged in");
      navigate("/generate");
    } else {
      alert("You are not logged in");
      navigate("/");
    }
  }, []);

  return allowed ? children : null;
}
