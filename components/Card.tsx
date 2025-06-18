import VideoData from "@/app/(root)/Types/VideoData";
import {
  Card,
  //   CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function CardDemo({ result }: { result: VideoData | null }) {

    function downloadVideo(videoUrl : string) {
        const link = document.createElement('a');
        link.href = videoUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

  return (
    <Card className="w-full max-w-sm border-white">
      {result && (
        <CardHeader className="text-center justify-center">
          <CardTitle>
            <Image
              src={result.profilePicture}
              alt="Profile Picture"
              width={60}
              height={60}
            />
          </CardTitle>
          <CardDescription className="text-white">
            {result.username}
          </CardDescription>
          {/* <CardAction>
          
        </CardAction> */}
        </CardHeader>
      )}
      {result && (
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* <div>
                <Image src={ result.image } alt="Thumbnail" width={90} height={160} />
            </div> */}

            <div className="grid gap-2">
              <video
                controls
                src={result.videoUrl}
                className="w-full max-h-[40vh] rounded-lg shadow-lg object-contain"
              />
            </div>
            <div className="text-center grid gap-2">
              <button
                onClick={() => {
                    downloadVideo(result.videoUrl)
                }}
                className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Download Video
              </button>
            </div>
          </div>
        </CardContent>
      )}
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
