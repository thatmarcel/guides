import englishTranslations from "../strings/en.json";
import germanTranslations from "../strings/de.json";

export default function localize(identifier: string, language: string) {
    if (language === "de") {
        return germanTranslations[identifier];
    }

    return englishTranslations[identifier];
}