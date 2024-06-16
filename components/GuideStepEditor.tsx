import InputField from "./InputField";
import MarkdownField from "./MarkdownField";
import GuideStepData from "../types/guide_step_data";
import FileUploader from "./FileUploader";
import MiscButton from "./MiscButton";

export default function GuideStepEditor({
    stepData,
    stepIndex,
    onStepDataChange,
    onStepDeletion,
    isEditingGuide
}: {
    stepData: GuideStepData,
    stepIndex: number,
    onStepDataChange: (stepData: GuideStepData) => void,
    onStepDeletion: () => void,
    isEditingGuide: boolean
}) {
    return (
        <div className="w-full">
            <InputField
                title="Title"
                placeholder="Read about politics"
                type="text"
                className="mt-4"
                value={stepData.title}
                onTextChange={newValue => {
                    stepData.title = newValue;
                    onStepDataChange(stepData);
                }}
            />

            <MarkdownField
                key={`guide-step-editor-markdown-field-${stepIndex}`}
                title="Content"
                startValue={stepData.description}
                className="mt-4"
                onMarkdownUpdated={newValue => {
                    stepData.description = newValue;
                    onStepDataChange(stepData);
                }}
            />

            <FileUploader
                key={`guide-step-editor-video-uploader-${stepIndex}`}
                title={isEditingGuide ? "Replace video (optional)" : "Video (optional)"}
                className="mt-4"
                onUploadedVideoURLChange={newVideoURL => {
                    stepData.coverVideoUrl = newVideoURL;
                    onStepDataChange(stepData);
                }}
            />

            {stepIndex > 0
                ? <MiscButton
                    className="mt-4 text-red-500 border-red-500 dark:border-red-500 w-full sm:w-auto"
                    onClick={onStepDeletion}
                >
                    Delete step
                </MiscButton>
                : null
            }
        </div>
    )
}