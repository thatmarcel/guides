import MiscButton from "./MiscButton";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";
import Link from "next/link";
import localize from "../helpers/localize";

export default function CreateGuideBottomPromo({ language }: { language: string }) {
    return (
        <div className="block flex items-center absolute bottom-0 left-0 right-0 pb-4 bg-white black:bg-gray-900">
            <Link href="/dash" target="_blank" className="mx-auto">
                <MiscButton isGhost={true}>
                    {localize("createGuidePromoButtonTitle", language)}

                    <ExternalLinkIcon
                        className="inline ml-3 mb-[2.23px] w-[13px] h-[13px] fill-black dark:fill-white"
                    />
                </MiscButton>
            </Link>
        </div>
    )
}