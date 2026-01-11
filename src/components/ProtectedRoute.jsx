import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/post/`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAllowed(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return allowed ? children : <Navigate to="/" replace />;
}
