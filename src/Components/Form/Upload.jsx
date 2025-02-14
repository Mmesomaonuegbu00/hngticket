import { useState, useEffect } from "react";
import cloud from '../../assets/upload-icon.png';
import './upload.css';
import sha1 from 'js-sha1';


const UploadProfilePhoto = ({ nextStep, error, setError }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedFormData")) || {};
    setFormData({
      fullName: savedData.fullName || "",
      email: savedData.email || "",
      message: savedData.message || "",
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
    } else {
      setError("Please upload an image.");
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedFile) {
      setError("Please upload an image.");
      return;
    }
  
    if (!formData.fullName || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }
  
    setIsUploading(true);
  
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const cloudApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const cloudApiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
  
    console.log("Cloud Name:", cloudName);
    console.log("Cloud API Key:", cloudApiKey);
    console.log("Cloud API Secret:", cloudApiSecret);
  
    if (!cloudName || !cloudApiKey || !cloudApiSecret) {
      setError("Cloudinary credentials are missing.");
      setIsUploading(false);
      return;
    }
  
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const signatureString = `timestamp=${timestamp}${cloudApiSecret}`;
    const signature = sha1(signatureString);
  
    const uploadData = new FormData();
    uploadData.append("file", selectedFile);
    uploadData.append("timestamp", timestamp);
    uploadData.append("api_key", cloudApiKey);
    uploadData.append("signature", signature);
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: uploadData,
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Upload successful", data);
        const savedData = {
          ...formData,
          profileImageUrl: data.secure_url,
        };
        localStorage.setItem("savedFormData", JSON.stringify(savedData));
        localStorage.setItem("formComplete", "true");
  
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
        setImagePreview(null);
        setSelectedFile(null);
        setError("");
        nextStep();
      } else {
        console.error("Upload failed", data);
        setError("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      setError("An error occurred during upload. Please try again.");
    }
  
    setIsUploading(false);
  };
  

  return (
    <div className="form-tab">
      <div className="upload-div">
        <p>Upload Profile Photo</p>
        <div className="upload">
          <form onSubmit={handleSubmit}>
            <label className="file-label">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="preview-image" />
              ) : (
                <img src={cloud} alt="Upload Icon" className="cloud-icon" />
              )}
              <p>Drag & drop or click to upload</p>
            </label>
            {error && <p className="error-message">{error}</p>}

            {isUploading && <p>Uploading...</p>}
          </form>
        </div>
      </div>

      <hr className="line2" />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Enter your name</label><br />
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>} <br />

          <label htmlFor="email">Enter your email *</label><br />
          <input
            type="email"
            name="email"
            placeholder="hello@avioflagos.io"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>} <br />

          <label htmlFor="message">About the project</label><br />
          <textarea
            name="message"
            placeholder="Textarea"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <div className="ticket-button">
            <button className="button1" onClick={() => setStep(1)}>Back</button>
            <button
              type="submit"
              className="button2"
              disabled={!imagePreview || isUploading}
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProfilePhoto;
