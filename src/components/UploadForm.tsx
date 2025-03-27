"use client";

import { useState } from "react";
import axios from "axios";

interface UploadFormProps {
  onUploadSuccess: (socket: WebSocket) => void;
}

export default function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("You are not authenticated.");
        return;
      }

      // Step 1: Upload the file
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/fileUpload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Step 2: Connect WebSocket
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_BASE_URL}`);

      ws.onopen = () => {
        ws.send(JSON.stringify({ type: "register", token }));
      };

      onUploadSuccess(ws);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold">Upload a Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
