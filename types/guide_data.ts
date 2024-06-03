import GuideStepData from "./guide_step_data";

export default interface GuideData {
    slug: string;
    title: string;
    description: string;
    steps: GuideStepData[]
}