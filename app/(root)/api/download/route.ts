import axios from "axios";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

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

    //==================================================================
    const $ = cheerio.load(response.data.html);

    const username = $("#user_info p.mb-0.h4").text().trim();
    const name = $("#user_info p.text-muted").text().trim();
    const profilePicture = $("img.rounded-circle").attr("src");
    // const description = $("#download_content .mt-3 p.text-sm").html()?.trim();
    const image = $("video").attr("poster");
    const videoUrl = $("video > source").attr("src");

    let description = "";
    let likes = "";
    let comments = "";
    let numOfYears = "";

    $("#download_content .card").each((_, cardElem) => {
      const card = $(cardElem);
      description = card.find(".mt-3 p.text-sm").text().trim();

      // Stats: likes, comments, years
      const statSmallTags = card.find(
        ".d-flex.justify-content-between.text-sm small"
      );

      likes = statSmallTags
        .eq(0)
        .contents()
        .filter((_, el) => el.type === "text")
        .text()
        .trim();
      comments = statSmallTags
        .eq(1)
        .contents()
        .filter((_, el) => el.type === "text")
        .text()
        .trim();
      numOfYears = statSmallTags
        .eq(2)
        .contents()
        .filter((_, el) => el.type === "text")
        .text()
        .trim();
    });
    //==================================================================

    // const statDiv = $('div.d-flex.justify-content-between.text-sm');

    // // Cleanly extract text nodes only (exclude <i>)
    // const smallTags = statDiv.find('small');

    // const likes = smallTags.eq(0).contents().filter((_, el) => el.type === 'text').text().trim();      // e.g., "310.8K"
    // const comments = smallTags.eq(1).contents().filter((_, el) => el.type === 'text').text().trim();    // e.g., "665"
    // const numOfYears = smallTags.eq(2).contents().filter((_, el) => el.type === 'text').text().trim();  // e.g., "1 year ago"

    // Select the <a> tag with all specified classes inside the video > source div
    // const videoUrl = $('video > source').attr('src');

    // console.log("Video URL:", videoUrl);
    const data = {
      username,
      name,
      profilePicture,
      description,
      image,
      likes,
      comments,
      numOfYears,
      videoUrl,
    };

    // console.log("Data:", data.videoUrl);

    return NextResponse.json({ success: true, videoUrl: data.videoUrl, result: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
