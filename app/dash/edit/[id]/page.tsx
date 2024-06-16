"use server"

import GuideEditor from "../../../../components/GuideEditor";
import DashboardContainer from "../../../../components/DashboardContainer";
import {Metadata, ResolvingMetadata} from "next";
import GuideData from "../../../../types/guide_data";
import {notFound} from "next/navigation";
import getOwnedGuide from "../../../../helpers/actions/get_owned_guide";

type Params = {
    id: string
}

export async function generateMetadata(
    _params: any,
    _parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: "Edit guide",
        description: "Edit one of the guides"
    }
}

export default async function DashboardEditGuidePage({
    params
}: {
    params: Params
}) {
    let guideData: GuideData;
    try {
        guideData = await getOwnedGuide(params.id);
    } catch {
        notFound();
    }

    return (
        <DashboardContainer
            headerTitle="Edit guide"
            headerButton={null}
            shouldHaveBackButton={true}
        >
            <GuideEditor
                editedGuideData={guideData}
            />
        </DashboardContainer>
    )
}