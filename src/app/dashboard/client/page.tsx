"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import TranscodeProgress from "@/components/TranscodeProgress";

export default function ClientDashboardPage() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [showProgress, setShowProgress] = useState(false);

  const handleUploadSuccess = (ws: WebSocket) => {
    setSocket(ws);
    setShowProgress(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-6 py-12 flex justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          Client Dashboard
        </h1>
        <UploadForm onUploadSuccess={handleUploadSuccess} />
        {showProgress && socket && <TranscodeProgress socket={socket} />}
      </div>
    </div>
  );
}
