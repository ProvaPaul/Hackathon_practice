import React, { useState } from "react";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
      const response = await fetch("http://localhost:3000/process-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the image.");
      }

      const data = await response.json();
      setExtractedText(data.text || "No text extracted.");
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Error processing the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Image Text Extractor</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>

      {isLoading && <p>Processing...</p>}

      {extractedText && (
        <div style={{ marginTop: "20px" }}>
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
