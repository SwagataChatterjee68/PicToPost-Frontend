import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./generateCaption.css";

export default function CaptionGenerator() {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = e.target.image.files[0];
    if (!file) {
      alert("Select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setPreview(URL.createObjectURL(file));
    setCaption("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post/`, {
        method: "POST",
        body: formData,
        credentials: "include", // ✅ REQUIRED for cookie auth
      });

      // Not authenticated
      if (response.status === 401) {
        navigate("/");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }

      const data = await response.json();
      setCaption(data.caption || "No caption generated");
    } catch (error) {
      console.error(error);
      alert("Error generating caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="main-page">
        <div className="content-card">
          <h1 className="app-title">PicToPost</h1>
          <p className="sub-heading">
            Turn any photo into a fun social media caption in seconds
          </p>

          <form onSubmit={handleSubmit} className="upload-form">
            <input type="file" name="image" accept="image/*" />

            <button className="generate-btn" disabled={loading}>
              {loading ? "Creating Caption..." : "Generate Caption"}
            </button>
          </form>

          {preview && (
            <div className="output-area">
              <div className="image-box">
                <img src={preview} alt="Preview" />
              </div>

              <div className="caption-box">
                <h2>Caption Result</h2>
                <p>{caption || "Waiting for AI to respond..."}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
