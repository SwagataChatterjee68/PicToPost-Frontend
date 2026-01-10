import { useState } from "react";
import "./generateCaption.css";
import Navbar from "../navbar/Navbar";
export default function CaptionGenerator() {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setCaption("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/generate`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.status === 401) {
        window.location.href = "/";
        return;
      }
      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      alert("Error generating caption");
    }
    setLoading(false);
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
                <img src={preview} />
              </div>
              <div className="caption-box">
                <h2>Caption Result</h2>
                <p>{caption || "Waiting for AI to respond"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
