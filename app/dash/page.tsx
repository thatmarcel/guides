"use server"

import MiscButton from "../../components/MiscButton";
import getOwnedGuides from "../../helpers/actions/get_owned_guides";
import PlusIcon from "../../icons/PlusIcon";
import DashboardContainer from "../../components/DashboardContainer";
import {Metadata, ResolvingMetadata} from "next";
import Link from "next/link";

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
                    <Link href={`/dash/edit/${guideData.id}`}>
                        <button
                            key={`guide-list-item-${index}`}
                            className="
                                rounded-xl
                                shadow
                                shadow-neutral-50
                                px-6
                                py-3
                                border-2
                                border-neutral-200
                                hover:bg-neutral-50
                                duration-300
                                w-full
                                text-left
                                mb-4
                            "
                        >
                            <p className="font-bold text-xl">
                                {guideData.title}
                            </p>
                            <p className="text-sm">
                                {guideData.description}
                            </p>
                        </button>
                    </Link>
                ))
                : <p>
                    You haven't created any guides yet.
                </p>
            }
        </DashboardContainer>
    )
}