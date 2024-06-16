import MiscButton from "./MiscButton";
import PlusIcon from "../icons/PlusIcon";
import GuideStepData from "../types/guide_step_data";

export default function GuideEditorStepSelection({
    className,
    steps,
    selectedStepIndex,
    setSelectedStepIndex,
    onAddStepButtonClick
}: {
    className?: string,
    steps: GuideStepData[],
    selectedStepIndex: number,
    setSelectedStepIndex: (index: number) => void,
    onAddStepButtonClick: () => void
}) {
    return (
        <div className={className}>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {steps.map((item, index) => (
                    <button
                        key={`guide-editor-step-selection-item-${index}`}
                        onClick={() => setSelectedStepIndex(index)}
                        className={`
                            inline-block
                            border-[1px]
                            rounded-lg
                            shadow
                            shadow-neutral-50
                            border-neutral-200
                            dark:shadow-neutral-950
                            dark:border-[2px]
                            dark:hover:bg-neutral-700
                            px-6
                            py-3
                            duration-300
                            h-20
                            overflow-hidden
                            ${selectedStepIndex === index
                                ? `
                                    border-neutral-300
                                    border-[2px]
                                    bg-neutral-50
                                    dark:bg-neutral-700
                                    dark:border-neutral-300
                                `
                                : "dark:bg-neutral-800 dark:border-neutral-700"
                            }
                        `}
                    >
                        <p className="font-medium text-lg">
                            Step {index + 1}
                        </p>
                        <p className="text-sm font-normal text-ellipsis overflow-hidden line-clamp-1">
                            {item.title}
                        </p>
                    </button>
                ))}

                <MiscButton isGhost={true} onClick={onAddStepButtonClick} className="h-20">
                    <PlusIcon
                        className="inline mr-3 mb-[2.25px] w-3 h-3 fill-black dark:fill-white"
                    />

                    Add step
                </MiscButton>
            </div>
        </div>
    )
}