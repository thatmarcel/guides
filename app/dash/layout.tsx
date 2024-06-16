import {ClerkProvider, SignedIn, SignedOut} from "@clerk/nextjs";
import Unauthenticated from "../../components/Unauthenticated";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
    return (
        <ClerkProvider>
            <SignedOut>
                <Unauthenticated
                    language="en"
                />
            </SignedOut>
            <SignedIn>
                {children}
            </SignedIn>
        </ClerkProvider>
    )
}