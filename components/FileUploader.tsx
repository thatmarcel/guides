"use client"

import {Dashboard} from "@uppy/react";
import {useState} from "react";
import Uppy, {UppyFile} from "@uppy/core";
import ScreenCapture from "@uppy/screen-capture";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/screen-capture/dist/style.min.css";
import Tus from "@uppy/tus";
import {HttpRequest} from "tus-js-client";
import prepareBunnyVideoUpload from "../helpers/actions/prepare_bunny_video_upload";

export default function FileUploader({
    title,
    className,
    onUploadedVideoURLChange
}: {
    title: string,
    className?: string,
    onUploadedVideoURLChange: (url: string) => void
}) {
    const [_, setVideoId] = useState<string | null>(null);
    const onBeforeRequest = async (req: HttpRequest, _file: UppyFile) => {
        const videoUploadInfo = await prepareBunnyVideoUpload();
        req.setHeader("AuthorizationSignature", videoUploadInfo.authorizationSignature);
        req.setHeader("AuthorizationExpire", videoUploadInfo.uploadExpirationTimestamp.toString());
        req.setHeader("VideoId", videoUploadInfo.videoId);
        req.setHeader("LibraryId", videoUploadInfo.libraryId);
        setVideoId(videoUploadInfo.videoId);
    };

    const [uppy] = useState(() => {
        const u = new Uppy({
            restrictions: {
                maxNumberOfFiles: 1,
                allowedFileTypes: [
                    ".mov",
                    ".mkv",
                    ".mp4"
                ]
            }
        })
        .use(ScreenCapture)
        .use(Tus, {
            endpoint: "https://video.bunnycdn.com/tusupload",
            onBeforeRequest
        });

        u.on("upload-success", (file, response) => {
            console.log(file.name, response.uploadURL);
            setVideoId(vi => {
                onUploadedVideoURLChange(`https://iframe.mediadelivery.net/embed/248890/${vi}`);
                return vi;
            });
        });

        u.on("file-removed", () => {
            onUploadedVideoURLChange(null);
        })

        return u;
    });

    return (
        <div className={className}>
            <p
                className="text-lg font-medium pb-1"
            >
                {title}
            </p>

            <Dashboard
                width="100%"
                height="400px"
                theme="auto"
                doneButtonHandler={null}
                showRemoveButtonAfterComplete={true}
                note="One video file in .mkv, .mov, .mp4"
                uppy={uppy}
            />
        </div>
    )
}