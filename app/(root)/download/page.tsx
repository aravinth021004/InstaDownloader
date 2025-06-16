"use client";

import VideoDisplay from "@/components/VideoInfo";
import { useState } from "react";

export default function Downloader() {
  const [link, setLink] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
        className="border text-white border-gray-300 rounded p-2 w-full"
      />
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        disabled={isLoading}
        style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
      >
        Open
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="loader border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin mr-2"></div>
          Loading...
        </div>
      ) : (
        error ? (
          <div className="text-red-500 mt-4">{error}</div>
        ) : (
          videoUrl && <VideoDisplay videoUrl={videoUrl} />
        ))}


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
