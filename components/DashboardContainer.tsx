import {ReactNode} from "react";
import MiscButton from "./MiscButton";
import BackIcon from "../icons/BackIcon";
import DashboardTopBar from "./DashboardTopBar";

export default function DashboardContainer({
    children,
    headerTitle,
    headerButton,
    shouldHaveBackButton
}: {
    children: ReactNode,
    headerTitle: string,
    headerButton: ReactNode | null
    shouldHaveBackButton: boolean
}) {
    return (
        <div className="w-screen h-full">
            <DashboardTopBar />

            <div className="w-full flex px-8 py-6 pt-4 pb-20">
                <div className={`mx-auto max-w-[1000px] w-full ${shouldHaveBackButton ? "md:-mt-9" : ""}`}>
                    {shouldHaveBackButton
                        ? <a href="/dash">
                            <MiscButton isGhost={true} className="-ml-6 -mb-1">
                                <BackIcon
                                    className="inline mr-1 mb-[2.25px] w-5 h-5 fill-black dark:fill-white"
                                />

                                Back to overview
                            </MiscButton>
                        </a>
                        : null
                    }
                    <div className="flex items-center mb-8">
                        <h1 className="text-4xl font-bold grow">
                            {headerTitle}
                        </h1>

                        {headerButton}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}