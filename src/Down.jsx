import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4000";

export default function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [itag, setItag] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch video info
  const fetchVideoInfo = async () => {
    if (!url) return alert("Enter a YouTube URL");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/video_info`, { url });
      console.log(data)
      setVideoInfo(data);
      if (data.formats?.length) setItag(data.formats[0].itag);
    } catch (err) {
      alert("Failed to fetch video info");
    }
    setLoading(false);
  };

  // Download video
  const downloadVideo = () => {
    if (!itag) return alert("Select a resolution");
window.location.href = `${API_BASE}/download/${itag}?url=${encodeURIComponent(url)}`;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <input
        type="text"
        placeholder="Paste YouTube URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
      <button
        onClick={fetchVideoInfo}
        style={{ width: "100%", padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        {loading ? "Loading..." : "Get Video Info"}
      </button>

      {videoInfo && (
        <div style={{ marginTop: "20px", textAlign: "left", display:"flex", justifyContent: "space-between" }}>
          <div>
            <h3>{videoInfo.title}</h3>
          <p><strong>Author:</strong> {videoInfo.uploader}</p>
          <p><strong>Views:</strong> {videoInfo.view_count}</p>
          <p><strong>Length:</strong> {videoInfo.duration} seconds</p>
          <p><strong>Resoultion: </strong>MP4</p>
                    {
            videoInfo.formats.length>1 &&
                     <><label style={{ display: "block", marginTop: "10px" }}>Select Resolution:</label>

                     <select value={itag} onChange={(e) => setItag(e.target.value)}>
  { videoInfo.formats.map((f, i) => (
    <option key={i} value={f.itag}>
      {f.quality} ({f.ext})
    </option>
  ))}
</select></>

  }
 


          <button
            onClick={downloadVideo}
            style={{ width: "100%", padding: "10px", background: "green", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            ⬇️ Download Video
          </button>
          </div>

    <div>
      <img src={videoInfo.thumbnail} alt="Thumbnail" style={{ width: "300px",
     }} />
    </div>




        </div>
      )}
    </div>
  );
}
