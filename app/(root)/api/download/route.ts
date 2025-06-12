import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const instagramLink = searchParams.get("url");
  console.log(instagramLink);
  if (!instagramLink) {
    return new Response(JSON.stringify({ error: "Missing Instagram URL" }), {
      status: 400,
    });
  }

  const url = "https://save-free.app/wp-json/visolix/api/download";


  try {
    const response = await axios.post(
      url,
      {
        url: instagramLink,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data.data);
    const $ = cheerio.load(response.data.data); // make sure response.data.data is the HTML string

    // Select the <a> tag with all specified classes inside the visolix-download-bottom div
    const videoUrl = $(
      ".visolix-download-bottom a.visolix-btn.visolix-download-media.visolix-flex-center.visolix-item-download"
    ).attr("href");

    const previewImageUrl = $('.visolix-media-box img').eq(1).attr('src');



    // console.log("Video URL:", videoUrl);
    // console.log('Preview Image URL:', previewImageUrl);

    return new Response(JSON.stringify({ success: true, videoUrl, previewImageUrl }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
