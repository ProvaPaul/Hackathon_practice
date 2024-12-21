import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [extractedTextID, setExtractedTextID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Generate a preview URL for the selected image
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/process-image",
        formData
      );

      setExtractedText(response.data.text || "No text extracted.");
      setExtractedTextID(response.data.id || "none");
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Image Text Extractor</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        {isLoading ? "Processing..." : "Upload"}
      </button>

      {imagePreview && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Image:</h3>
          <img
            src={imagePreview}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}

      {isLoading && <p>Processing...</p>}

      {extractedText && (
        <div style={{ marginTop: "20px" }}>
          <h3>Extracted Text ID:</h3>
          <p>{extractedTextID}</p>
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
