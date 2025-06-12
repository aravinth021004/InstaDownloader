"use client";

import VideoDisplay from "@/components/VideoInfo";
import { useState } from "react";


export default function Downloader() {
  const [link, setLink] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [previewImageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleDownload = async () => {
    setError("");
    setVideoUrl("");

    fetchVideo();

    async function fetchVideo() {
      try {
        console.log(link);
        const res = await fetch(
          `/api/download?url=${encodeURIComponent(link)}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        setVideoUrl(data.videoUrl);
        setImageUrl(data.previewImageUrl);

        // if (res.ok) {
        //   setVideoUrl(data.videoUrl);
        //   console.log(data.videoUrl);
        //   const a = document.createElement("a");
        //   a.href = videoUrl;
        //   a.download = ''; // Optional: set filename like 'myvideo.mp4'
        //   a.style.display = "none";
        //   document.body.appendChild(a);
        //   a.click();
        //   document.body.removeChild(a);

        //   // await fetch(data.videoUrl).catch((error) => console.log(error));
        // } else {
        //   setError(data.error || "Unknown error occurred");
        // }
      } catch (err) {
        setError("Error fetching video" + err);
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Paste Instagram Reel URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full"
      />
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Open
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {videoUrl && previewImageUrl && <VideoDisplay previewImageUrl={previewImageUrl} videoUrl={videoUrl} />}

      {/* {videoUrl && (
        <div className="mt-4">
          <p>Direct Video Link:</p>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {videoUrl}
          </a>
        </div>
      )} */}
    </div>
  );
}
