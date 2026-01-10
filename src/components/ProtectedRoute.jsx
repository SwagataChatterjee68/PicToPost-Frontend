import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.includes("token");

    if (token) {
      setAllowed(true);
    } else {
      navigate("/");
    }
  }, []);

  return allowed ? children : null;
}
