import GuideEditor from "../../../components/GuideEditor";
import DashboardContainer from "../../../components/DashboardContainer";

export const metadata = {
    title: "New guide",
    description: "Create a new guide"
}

export default function DashboardNewGuidePage() {
    return (
        <DashboardContainer
            headerTitle="New guide"
            headerButton={null}
            shouldHaveBackButton={true}
        >
            <GuideEditor />
        </DashboardContainer>
    )
}