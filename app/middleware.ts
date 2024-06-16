import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import {
    clerkMiddleware,
    createRouteMatcher
} from "@clerk/nextjs/server";

let locales = ["en", "de"];

function getLocale(request) {
    let languages = new Negotiator({ headers: request.headers }).languages();
    let defaultLocale = "en";

    return match(languages, locales, defaultLocale);
}

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return;
    }

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

const isProtectedRoute = createRouteMatcher([
    "/dash(.*)"
]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
});

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)"
    ]
}