"use client";

import { useEffect, useState } from "react";

interface VideoResolution {
  s3_path: string;
  download_url: string;
}

interface TranscodeProgressProps {
  socket: WebSocket | null;
}

export default function TranscodeProgress({ socket }: TranscodeProgressProps) {
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [message, setMessage] = useState("");
  const [outputVideos, setOutputVideos] = useState<
    Record<string, VideoResolution>
  >({});

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data);

        switch (msg.type) {
          case "videoProcessed":
            setStatus("success");
            setMessage(
              msg.message || "Your video has been successfully processed!"
            );
            setOutputVideos(msg.outputVideos || {});
            break;

          case "videoProcessingFailed":
            setStatus("error");
            setMessage(msg.message || "Video processing failed");
            break;

          default:
            console.warn("Unknown WebSocket message:", msg);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    const handleError = () => {
      setStatus("error");
      setMessage("Connection error occurred");
    };

    const handleClose = () => {
      if (status === "processing") {
        setStatus("error");
        setMessage("Connection closed before processing completed");
      }
    };

    socket.addEventListener("message", handleMessage);
    socket.addEventListener("error", handleError);
    socket.addEventListener("close", handleClose);

    return () => {
      socket.removeEventListener("message", handleMessage);
      socket.removeEventListener("error", handleError);
      socket.removeEventListener("close", handleClose);
    };
  }, [socket, status]);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Transcoding Status</h2>

      {status === "processing" && (
        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-full animate-pulse"
              style={{ width: "100%" }}
            />
          </div>
          <p className="text-gray-600">Processing your video...</p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4">
          <div className="flex items-center text-green-600">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="font-medium">{message}</p>
          </div>

          {Object.keys(outputVideos).length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Available resolutions:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(outputVideos).map(([resolution, videoData]) => (
                  <a
                    key={resolution}
                    href={videoData.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {resolution.toUpperCase()}
                      </span>
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center text-red-600">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}
