import {ReactNode} from "react";
import MiscButton from "./MiscButton";
import BackIcon from "../icons/BackIcon";
import {UserButton} from "@clerk/nextjs";

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
            <div className="w-full pr-8 pt-6 h-16">
                <div className="inline-block float-right">
                    <UserButton />
                </div>
            </div>

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