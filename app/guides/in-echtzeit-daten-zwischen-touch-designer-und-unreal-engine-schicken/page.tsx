import guideData from "../../../guides/in-echtzeit-daten-zwischen-touch-designer-und-unreal-engine-schicken.json";
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
                language="de"
            />
        </div>
    )
}