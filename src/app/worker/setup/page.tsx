"use client";

import { useState } from "react";
import Tab from "@/components/Tab";

const tabs = [
  {
    name: "Setup",
    title: "Setup Your Worker Environment",
    description:
      "Follow the instructions below to get started. This setup is for macOS.",
    instructions: [
      {
        title: "Install Docker Desktop",
        content: (
          <ul className="list-disc list-inside">
            <li>
              Go to{" "}
              <a
                href="https://www.docker.com/products/docker-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                docker.com
              </a>
            </li>
            <li>Download & install Docker Desktop for macOS</li>
            <li>Run Docker and keep it running in the background</li>
          </ul>
        ),
      },
      {
        title: "Install Python 3",
        content: (
          <ul className="list-disc list-inside">
            <li>
              Visit{" "}
              <a
                href="https://www.python.org/downloads/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                python.org
              </a>
            </li>
            <li>Download and install Python 3 for macOS</li>
            <li>
              Ensure <code>python3</code> is available in Terminal
            </li>
          </ul>
        ),
      },
      {
        title: "Download & Run Setup Script",
        content: (
          <p>Once Docker and Python are ready, download and run this script:</p>
        ),
        downloadLink: `${process.env.NEXT_PUBLIC_BASE_URL}/script/generate-run-sh`,
        downloadText: "Download run.sh",
        terminalCommand: "chmod +x run.sh && source run.sh",
      },
    ],
  },
  {
    name: "Teardown",
    title: "Teardown Your Worker Environment",
    description:
      "Use this script when you want to stop and clean up your worker environment.",
    instructions: [
      {
        title: "What this does",
        content: (
          <ul className="list-disc list-inside">
            <li>Stops the notification server process</li>
            <li>Stops and removes the video processor Docker container</li>
          </ul>
        ),
      },
      {
        title: "Download & Run Kill Script",
        content: (
          <p>Download and run this script to teardown your worker setup:</p>
        ),
        downloadLink: "/scripts/kill.sh",
        downloadText: "Download kill.sh",
        terminalCommand: "chmod +x kill.sh && ./kill.sh",
      },
    ],
  },
];

export default function WorkerScriptsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex space-x-6 border-b border-gray-200">
          {tabs.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => setActiveTab(idx)}
              className={`pb-2 text-lg font-medium ${
                idx === activeTab
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <Tab
        title={tab.title}
        description={tab.description}
        instructions={tab.instructions}
      />
    </>
  );
}
