import {getRequestConfig} from 'next-intl/server';
import {headers} from "next/headers";

export default getRequestConfig(async () => {
    const languageHeader = headers().get("Accept-Language");

    if (languageHeader && languageHeader.split(",")[0].includes("de")) {
        return {
            locale: "de"
        }
    }

    return {
        locale: "en"
    };
});