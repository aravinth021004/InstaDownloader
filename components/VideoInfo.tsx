export default function VideoDisplay({
  videoUrl,
}: {
  videoUrl: string;
}) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
    

      {/* Video Player */}
      <div className="w-full">
        <video
          controls
          src={videoUrl}
          className="w-full max-h-[80vh] rounded-lg shadow-lg object-contain"
        />
      </div>

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
