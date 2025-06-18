"use client";
import { deletePostByResult } from "@/app/(root)/actions/action";
import VideoData from "@/app/(root)/Types/VideoData";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function CardDemo({ result }: { result: VideoData | null }) {

  const deletePost = async () => {
    await deletePostByResult(result);
  }

  function downloadVideo(videoUrl: string) {
    const link = document.createElement("a");
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
          <CardAction>
            <button
              onClick={deletePost}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </CardAction>
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
                className="w-full max-h-[17vh] rounded-lg shadow-lg object-contain"
              />
            </div>
            <div className="text-center grid gap-2">
              <button
                onClick={() => {
                  downloadVideo(result.videoUrl);
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
