import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = document.cookie.includes("token");

    if (token) {
      setAllowed(true);
    } else {
      window.location.href = "/";
    }
  }, []);

  return allowed ? children : null;
}
