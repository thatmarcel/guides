"use client"

import GuideData from "../types/guide_data";
import Link from "next/link";
import MiscButton from "./MiscButton";
import localize from "../helpers/localize";
import { useState } from "react";
import GuideStepTroubleshootingModal from "./GuideStepTroubleshootingModal";

export default function GuideStepBottomButtonPane({
    guideData,
    stepIndex,
    language
}: {
    guideData: GuideData,
    stepIndex: number,
    language: string
}) {
    const [
        isTroubleshootingModalOpen,
        setTroubleshootingModalOpen
    ] = useState(false);

    return (
        <div className="mt-8 md:mt-9 w-full">
            {guideData.steps.length > (stepIndex + 1)
                ? <Link href={`/g/${guideData.slug}/steps/${stepIndex + 2}`}>
                    <MiscButton className="max-sm:w-full mb-2 md:mb-0 mr-6 md:mr-10">
                        {localize("nextGuideStepButtonTitle", language)}
                    </MiscButton>
                </Link>
                : null
            }

            <MiscButton
                isGhost={true}
                className="max-sm:w-full md:-ml-6"
                onClick={() => setTroubleshootingModalOpen(true)}
            >
                {localize("guideTroubleshootingButtonTitle", language)}
            </MiscButton>

            <GuideStepTroubleshootingModal
                isOpen={isTroubleshootingModalOpen}
                setOpen={setTroubleshootingModalOpen}
                stepData={guideData.steps[stepIndex]}
                language={language}
            />
        </div>
    );
}