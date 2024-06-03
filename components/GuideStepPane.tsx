import GuideData from "../types/guide_data";
import localize from "../helpers/localize";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import MiscButton from "./MiscButton";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";
import GuideStepBottomButtonPane from "./GuideStepBottomButtonPane";
import rehypeExternalLinks from "rehype-external-links";

export default function GuideStepPane({
    guideData,
    stepIndex,
    language
}: {
    guideData: GuideData,
    stepIndex: number,
    language: string
}) {
    const stepData = guideData.steps[stepIndex];

    return (
        <div className="w-full h-full">
            <div className="pt-4 px-5">
                <Link href={`/guides/${guideData.slug}`}>
                    <h2 className="
                        text-md
                        md:text-lg
                        font-medium
                        max-w-[700px]
                        underline
                        underline-offset-2
                        decoration-[1px]
                        hover:text-neutral-800
                        active:text-neutral-700
                        dark:hover:bg-neutral-100
                        dark:active:bg-neutral-200
                    ">
                        {guideData.title}
                    </h2>
                </Link>
                <p className="text-sm md:text-md mt-1 md:mt-0">
                    {localize("currentStepLabelText", language).replace("{stepNumber}", stepIndex + 1)}
                </p>
            </div>

            <div className="w-full flex md:mt-8">
                <div className="w-full max-w-[700px] mx-auto p-8 pt-2">
                    {stepData.coverVideoUrl
                        ? <iframe
                            className="w-full aspect-video bg-neutral-50 mb-6 md:mb-8"
                            src={stepData.coverVideoUrl}
                            loading="lazy"
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                            allowFullScreen={true}
                        ></iframe>
                        : stepData.coverImageUrl
                        ? <></>
                            : <img
                                className="w-full bg-neutral-50 mb-6 md:mb-8"
                                src={stepData.coverImageUrl}
                                alt=""
                            />
                    }
                    <h1 className="text-2xl md:text-3xl font-bold max-w-[700px]">
                        {stepData.title}
                    </h1>
                    {stepData.buttons.length > 0
                        ? <div className="mt-6">
                            {stepData.buttons.map((buttonInfo, i) => (
                                <Link href={buttonInfo.href} target="_blank" key={i}>
                                    <MiscButton isAlternative={true}>
                                        {buttonInfo.title}


                                        <ExternalLinkIcon
                                            className="inline ml-3 mb-[2.25px] w-3 h-3 fill-white dark:fill-black"
                                        />
                                    </MiscButton>
                                </Link>
                            ))}
                        </div>
                        : null
                    }

                    <div className="markdown-view mt-6 w-full break-words">
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}>
                            {stepData.description}
                        </Markdown>
                    </div>

                    <GuideStepBottomButtonPane
                        guideData={guideData}
                        stepIndex={stepIndex}
                        language={language}
                    />
                </div>
            </div>
        </div>
    );
}