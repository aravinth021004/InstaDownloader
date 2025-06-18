import VideoData from "@/app/(root)/Types/VideoData";
import Image from "next/image";

export default function VideoDisplay({
  videoUrl,
  result,
}: {
  videoUrl: string;
  result: VideoData | null;
}) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Video Player */}
      <div className="w-full">
        <video
          controls
          src={videoUrl}
          className="w-full max-h-[40vh] rounded-lg shadow-lg object-contain"
        />
      </div>
      {result && (
        <div>
          <h2>{result.username}</h2>
          <h2>{result.name}</h2>
          <Image
            src={result.profilePicture}
            width={50}
            height={50}
            alt="profile Picture"
          />
        </div>
      )}

      {/* Download Button */}
      <div className="text-center">
        <a
          href={videoUrl}
          download
          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Download Video
        </a>
      </div>
    </div>
  );
}
