"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  // Local States
  const [file, setFile] = useState<File | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  async function handleUpload() {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await axios.post("http://localhost:3001/fileUpload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', res.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  return (
    <div>
      <h1>Distributed Video Transcoder</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
