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

  const url =
    "https://insta-save.net/content.php?url=" +
    encodeURIComponent(instagramLink);

  try {
    const response = await axios.get(url);
    // console.log(response.data.data);
    // console.log(response.data.html);
    const $ = cheerio.load(response.data.html); 


    // Select the <a> tag with all specified classes inside the visolix-download-bottom div
    const videoUrl = $('video > source').attr('src');

    // console.log("Video URL:", videoUrl);
    // console.log('Preview Image URL:', previewImageUrl);

    return new Response(
      JSON.stringify({ success: true, videoUrl })
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
