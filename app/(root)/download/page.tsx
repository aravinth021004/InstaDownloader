"use client";

// import VideoDisplay from "@/components/VideoInfo";
import { useState } from "react";
import VideoData from "../Types/VideoData";
import { CardDemo } from "@/components/Card";

export default function Downloader() {
  const [link, setLink] = useState<string>("");
  // const [videoUrl, setVideoUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<VideoData | null>(null);

  const handleDownload = async () => {
    // console.log("Open button clicked");
    setResult(null);
    setIsLoading(true);
    setError("");
    // setVideoUrl("");

    fetchVideo();

    async function fetchVideo() {
      try {
        console.log(link);
        await fetch(`/api/download?url=${encodeURIComponent(link)}`, {
          method: "GET",
        }).then(async (res) => {
          const data = await res.json();
          // console.log("Data:", data);
          setResult(data.result);
          // console.log("Result:", result);
          // if (result) {
            // setVideoUrl(result.videoUrl);
            // console.log("Result Video:", result.videoUrl);
          // } else {
            // setVideoUrl(data.videoUrl);
            // console.log("Data Video:", data.videoUrl);
          // }
        });

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
        required
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
      ) : error ? (
        <div className="text-red-500 mt-4">{error}</div>
      ) : (
        // videoUrl && <VideoDisplay videoUrl={videoUrl} result={result} />
        result && <CardDemo result={result} />
      )}
      
    </div>
  );
}
