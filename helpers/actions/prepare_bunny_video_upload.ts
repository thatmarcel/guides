"use server"

import {generate} from "randomstring";
import {sha256} from "js-sha256";

export default async function prepareBunnyVideoUpload() {
    const title = `User Upload: ${generate(16)}`;

    const videoCreationResponse = await fetch(`https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos`, {
        method: "POST",
        headers: {
            "AccessKey": process.env.BUNNY_STREAM_KEY,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title
        })
    });

    const videoCreationResult = await videoCreationResponse.json();

    console.log(videoCreationResult)

    const videoId = videoCreationResult.guid;

    const uploadExpirationTimestamp = Date.now() + (60 * 60 * 24 * 1000);

    const authorizationSignature = sha256(`${process.env.BUNNY_STREAM_LIBRARY_ID}${process.env.BUNNY_STREAM_KEY}${uploadExpirationTimestamp}${videoId}`);

    return {
        authorizationSignature,
        uploadExpirationTimestamp,
        videoId,
        libraryId: process.env.BUNNY_STREAM_LIBRARY_ID
    }
}