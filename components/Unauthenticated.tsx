import {SignInButton} from "@clerk/nextjs";
import MiscButton from "./MiscButton";
import localize from "../helpers/localize";

export default function Unauthenticated({ language }: { language: string }) {
    return (
        <div className="w-screen h-screen flex items-center">
            <MiscButton isAlternative={true} className="mx-auto">
                <SignInButton>
                    {localize("authenticateButtonTitle", language)}
                </SignInButton>
            </MiscButton>
        </div>
    )
}