"use server"

import MiscButton from "./MiscButton";
import {currentUser} from "@clerk/nextjs/server";

export default async function DashboardBottomBar() {
    const { username } = await currentUser();

    return (
        <div
            className="
                fixed
                bottom-0
                left-0
                right-0
                border-t-2
                border-neutral-200
                items-center
                flex
                bg-white
                dark:bg-neutral-900
            "
        >
            <p className="md:inline-block grow ml-5 hidden">
                {username
                    ? <>You are signed in as <span className="font-medium">{username}</span>.</>
                    : <>You are signed in.</>
                }
            </p>
            <a href="https://accounts.guides.cx/user" className="w-full md:w-auto md:float-right px-1 md:px-0">
                <MiscButton isGhost={true} className="my-1 md:mr-1 md:pr-4 w-full md:w-auto">
                    Manage account
                </MiscButton>
            </a>
        </div>
    )
}