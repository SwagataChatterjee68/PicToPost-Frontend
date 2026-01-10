import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GenerateCaption from "./components/generateCaption/GenerateCaption";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <GenerateCaption />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
