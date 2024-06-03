import guideData from "../../../../../guides/in-echtzeit-daten-zwischen-touch-designer-und-unreal-engine-schicken.json";
import { Metadata, ResolvingMetadata } from "next";
import GuideStepPane from "../../../../../components/GuideStepPane";
import { notFound } from "next/navigation";

type Props = {
    params: {
        /* guide: string, */
        step: string
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: guideData.steps[parseInt(params.step) - 1] ? `${guideData.steps[parseInt(params.step) - 1].title} | ${guideData.title}` : "",
        description: guideData.description
    }
}

export default function GuideViewPage({
    params
}: {
    params: {
        /* guide: string, */
        step: string
    }
}) {
    const stepIndex = parseInt(params.step) - 1;

    if (stepIndex >= guideData.steps.length) {
        notFound();
    }

    return (
        <div className="h-screen w-full">
            <GuideStepPane
                guideData={guideData}
                stepIndex={stepIndex}
                language="de"
            />
        </div>
    )
}