import React from "react";
import VideoDownloader from "./Down";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "30px", background: "#f4f4f4", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", color: "#222" }}>🎥 YouTube Video Downloader</h1>
      <VideoDownloader />
    </div>
  );
}
