"use server"

import { Metadata, ResolvingMetadata } from "next";
import GuideStepPane from "../../../../../components/GuideStepPane";
import { notFound } from "next/navigation";
import getGuide from "../../../../../helpers/actions/get_guide";
import GuideData from "../../../../../types/guide_data";
import { getLocale } from "next-intl/server";

type Params = {
    slug: string,
    step: string
}

type Props = {
    params: Params
}

export async function generateMetadata(
    {params}: Props,
    _parent: ResolvingMetadata
): Promise<Metadata> {
    let guideData: GuideData;
    try {
        guideData = await getGuide(params.slug);
    } catch {
        notFound();
    }

    return {
        title: guideData.steps[parseInt(params.step) - 1] ? `${guideData.steps[parseInt(params.step) - 1].title} | ${guideData.title}` : "",
        description: guideData.description
    }
}

export default async function GuideViewPage({
    params
}: {
    params: Params
}) {
    let guideData: GuideData;
    try {
        guideData = await getGuide(params.slug);
    } catch {
        notFound();
    }

    const stepIndex = parseInt(params.step) - 1;

    if (stepIndex >= guideData.steps.length) {
        notFound();
    }

    const local = await getLocale();
    const languageCode = local.includes("de") ? "de" : "en";

    return (
        <div className="h-screen w-full">
            <GuideStepPane
                guideData={guideData}
                stepIndex={stepIndex}
                language={languageCode}
            />
        </div>
    )
}