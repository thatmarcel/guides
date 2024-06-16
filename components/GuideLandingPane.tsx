import GuideData from "../types/guide_data";
import localize from "../helpers/localize";
import Link from "next/link";
import MiscButton from "./MiscButton";

export default function GuideLandingPane({
    guideData,
    language
}: {
    guideData: GuideData,
    language: string
}) {
    return (
        <div className="w-full h-full flex md:items-center p-12 md:p-16">
            <div className="mx-auto md:min-w-[500px] w-full md:w-auto">
                <h1 className="text-2xl md:text-4xl font-bold max-w-[700px]">
                    {guideData.title}
                </h1>
                <p className="mt-2 text-md md:text-lg">
                    {guideData.steps.length === 1
                        ? localize("guideStepCountLabelTextForOne", language)
                        : localize("guideStepCountLabelTextForNotOne", language).replace("{stepCount}", guideData.steps.length)
                    }
                </p>
                <p className="mt-6 text-md md:text-md max-w-[700px] md:leading-6">
                    {guideData.description}
                </p>
                <Link href={`/g/${guideData.slug}/steps/1`}>
                    <MiscButton className="mt-10">
                        {localize("startGuideButtonTitle", language)}
                    </MiscButton>
                </Link>
            </div>
        </div>
    );
}