export default interface GuideStepData {
    title: string;
    description: string;
    coverImageUrl: string | null;
    coverVideoUrl: string | null;
    buttons: {
        title: string;
        href: string;
    }[],
    troubleshootingSections: {
        title: string;
        description: string;
    }[]
}