"use server"

import MiscButton from "../../components/MiscButton";
import getOwnedGuides from "../../helpers/actions/get_owned_guides";
import PlusIcon from "../../icons/PlusIcon";
import DashboardContainer from "../../components/DashboardContainer";
import {Metadata, ResolvingMetadata} from "next";
import Link from "next/link";
import ExternalLinkIcon from "../../icons/ExternalLinkIcon";

export async function generateMetadata(
    _params: any,
    _parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: "My guides",
        description: "List of all owned guides",
    }
}

export default async function DashboardPage() {
    const ownedGuides = await getOwnedGuides();

    return (
        <DashboardContainer
            headerTitle="My guides"
            headerButton={
                <a href="/dash/new">
                    <MiscButton isGhost={true}>
                        <PlusIcon
                            className="inline mr-3 mb-[2.25px] w-3 h-3 fill-black dark:fill-white"
                        />

                        Add new
                    </MiscButton>
                </a>
            }
            shouldHaveBackButton={false}
        >
            {ownedGuides && ownedGuides.length > 0
                ? ownedGuides.map((guideData, index) => (
                    <div
                        key={`guide-list-item-${index}`}
                        className="
                            mb-4
                            shadow
                            shadow-neutral-50
                        "
                    >
                        <Link href={`/dash/edit/${guideData.id}`}>
                            <button
                                className="
                                rounded-xl
                                px-6
                                py-3
                                border-2
                                border-neutral-200
                                hover:bg-neutral-50
                                duration-300
                                w-full
                                text-left
                                overflow-hidden
                                text-ellipsis
                                bg-white
                                dark:bg-neutral-900
                                z-20
                                relative
                            "
                            >
                                <p className="font-bold text-xl line-clamp-3">
                                    {guideData.title}
                                </p>
                                <p className="text-sm line-clamp-2">
                                    {guideData.description}
                                </p>
                            </button>
                        </Link>

                        <Link href={`/guides/${guideData.slug}`}>
                            <button
                                className="
                                    border-l-2
                                    border-b-2
                                    border-r-2
                                    border-neutral-200
                                    -mt-3
                                    rounded-b-xl
                                    px-6
                                    pt-5
                                    pb-2
                                    w-full
                                    text-left
                                    bg-neutral-100
                                    z-0
                                    flex
                                    items-center
                                "
                            >
                                <p className="grow">
                                    Open guide
                                </p>

                                <ExternalLinkIcon
                                    className="inline ml-3 w-4 h-4 float-right fill-black dark:fill-white"
                                />
                            </button>
                        </Link>
                    </div>
                ))
                : <p className="-mt-6">
                    You haven't created any guides yet.
                </p>
            }
        </DashboardContainer>
    )
}