export default function VideoDisplay({ previewImageUrl, videoUrl } : {previewImageUrl : string, videoUrl : string}) {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md text-center">
      {/* Preview Image */}
      <div className="mb-4">
        <img
          src={previewImageUrl}
          alt="Video preview"
          className="w-full rounded-md"
        />
      </div>

      {/* Video Player */}
      <div className="mb-4">
        <video controls className="w-full rounded-md">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Download Button */}
      <a
        href={videoUrl}
        download
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Download Video
      </a>
    </div>
  );
}
