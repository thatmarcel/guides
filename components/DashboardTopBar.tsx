"use client"

import {UserButton} from "@clerk/nextjs";
import {dark, experimental__simple} from "@clerk/themes";
import {useDarkMode} from "usehooks-ts";

export default function DashboardTopBar() {
    const { isDarkMode } = useDarkMode();

    return (
        <div className="w-full pr-8 pt-6 h-16">
            <div className="inline-block float-right">
                <UserButton
                    afterSignOutUrl="https://accounts.guides.cx/sign-in"
                    afterMultiSessionSingleSignOutUrl="https://accounts.guides.cx/sign-in"
                    appearance={{
                        baseTheme: isDarkMode ? dark : experimental__simple
                    }}
                    showName={true}
                    userProfileProps={{
                        appearance: {
                            baseTheme: isDarkMode ? dark : experimental__simple
                        }
                    }}
                />
            </div>
        </div>
    )
}