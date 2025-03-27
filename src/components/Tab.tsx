import Link from "next/link";
import { JSX } from "react";
import axios from "axios";

interface Instruction {
  title: string;
  content: JSX.Element;
  downloadLink?: string;
  downloadText?: string;
  terminalCommand?: string;
}

interface TabProps {
  title: string;
  description: string;
  instructions: Instruction[];
}

export default function Tab({ title, description, instructions }: TabProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          {title}
        </h1>
        <p className="text-gray-700 text-center">{description}</p>

        <div className="space-y-4 text-sm text-gray-800">
          {instructions.map((block, idx) => (
            <div
              key={idx}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
            >
              <h2 className="font-semibold mb-1">
                {idx + 1}. {block.title}
              </h2>
              {block.content}

              {block.downloadLink && (
                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("accessToken");
                      if (!token) {
                        alert("You must be logged in to download the script.");
                        return;
                      }

                      const response = await axios.get(block.downloadLink!, {
                        responseType: "blob", // important to receive raw data
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });

                      const url = window.URL.createObjectURL(
                        new Blob([response.data])
                      );
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", "run.sh");
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                    } catch (err: any) {
                      if (axios.isAxiosError(err)) {
                        console.error("Axios error:", {
                          message: err.message,
                          status: err.response?.status,
                          data: err.response?.data,
                        });

                        alert(
                          `Failed to download script.\nStatus: ${
                            err.response?.status
                          }\nMessage: ${
                            err.response?.data?.message || err.message
                          }`
                        );
                      } else {
                        console.error("Unexpected error:", err);
                        alert(
                          "An unexpected error occurred while downloading the script."
                        );
                      }
                    }
                  }}
                  className="inline-block mt-2 bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  {block.downloadText || "Download"}
                </button>
              )}

              {block.terminalCommand && (
                <div className="mt-3 bg-white border p-3 rounded text-sm text-gray-700">
                  <code>{block.terminalCommand}</code>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600">
          Need help?{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
