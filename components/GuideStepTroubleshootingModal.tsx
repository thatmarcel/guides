import localize from "../helpers/localize";
import TroubleshootingItemPane from "./TroubleshootingItemPane";
import GuideStepData from "../types/guide_step_data";

export default function GuideStepTroubleshootingModal({
    isOpen,
    setOpen,
    stepData,
    language
}: {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void,
    stepData: GuideStepData,
    language: string
}) {
    return (
        <div className={`
            fixed
            top-0
            bottom-0
            left-0
            right-0
            transition-all
            duration-300
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}>
            <div
                className={`
                    fixed
                    top-0
                    bottom-0
                    left-0
                    right-0
                    opacity-25
                    bg-black
                `}
                onClick={() => setOpen(false)}
            />

            <div
                className={`
                    fixed
                    top-0
                    left-0
                    right-0
                    flex
                    p-8
                `}
            >
                <div
                    className={`
                        w-full
                        max-w-[700px]
                        bg-white
                        rounded-xl
                        p-8
                        mx-auto
                        break-words
                    `}
                >
                    <h3 className="text-2xl md:text-3xl font-bold leading-7">
                        {localize("troubleshootingModalTitle", language)}
                    </h3>

                    {stepData.troubleshootingSections.map((section, sectionIndex) => (
                        <TroubleshootingItemPane
                            title={section.title}
                            key={sectionIndex}
                        >
                            {section.description}
                        </TroubleshootingItemPane>
                    ))}

                    <TroubleshootingItemPane
                        title={localize("troubleshootingModalContactMeSectionTitle", language)}
                    >
                        {localize("troubleshootingModalContactMeSectionText", language)}
                    </TroubleshootingItemPane>
                </div>
            </div>
        </div>
    );
}