import guideData from "../../../guides/sending-values-between-touch-designer-and-unreal-engine.json";
import GuideLandingPane from "../../../components/GuideLandingPane";

export const metadata = {
    title: guideData.title,
    description: guideData.description,
}

export default function GuideViewPage({
    params
}: {
    params: {
        /* guide: string */
    }
}) {
    return (
        <div className="h-screen w-full">
            <GuideLandingPane
                guideData={guideData}
                language="en"
            />
        </div>
    )
}