"use server"

import GuideLandingPane from "../../../components/GuideLandingPane";
import getGuide from "../../../helpers/actions/get_guide";
import GuideData from "../../../types/guide_data";
import {notFound} from "next/navigation";
import {Metadata, ResolvingMetadata} from "next";
import {getLocale} from "next-intl/server";
import CreateGuideBottomPromo from "../../../components/CreateGuideBottomPromo";

type Params = {
    slug: string
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
        title: guideData.title,
        description: guideData.description
    }
}

export default async function GuideViewPage({
    params
}: {
    params: {
        slug: string
    }
}) {
    let guideData: GuideData;
    try {
        guideData = await getGuide(params.slug);
    } catch {
        notFound();
    }

    const local = await getLocale();
    const languageCode = local.includes("de") ? "de" : "en";

    return (
        <div className="h-screen w-full">
            <GuideLandingPane
                guideData={guideData}
                language={languageCode}
            />

            <CreateGuideBottomPromo
                language={languageCode}
            />
        </div>
    )
}