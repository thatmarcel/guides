import { ReactNode } from "react";

export default function MiscButton({
    children,
    className,
    isAlternative,
    isGhost,
    onClick
}: {
    children: ReactNode;
    className?: string;
    isAlternative?: boolean;
    isGhost?: boolean;
    onClick?: () => void;
}) {
    return (
        <button onClick={onClick} className={`
            ${isAlternative
                ? `
                    bg-black
                    border-black
                    border-[1px]
                    text-white
                    text-sm
                    px-4
                    py-[6px]
                    hover:bg-neutral-800
                    active:bg-neutral-700
                    dark:bg-white
                    dark:text-black
                    dark:border-transparent
                    dark:hover:bg-neutral-100
                    dark:active:bg-neutral-200
                `
                : isGhost
                    ? `
                        px-6
                        py-[7px]
                        hover:bg-neutral-100
                        dark:hover:bg-neutral-800
                        active:bg-neutral-200
                        dark:active:bg-neutral-700
                        border-[1px]
                        border-transparent
                    `
                    : `
                        bg-neutral-50
                        hover:bg-neutral-100
                        dark:hover:bg-neutral-800
                        active:bg-neutral-200
                        dark:active:bg-neutral-700
                        border-black
                        border-[1px]
                        px-6
                        py-[7px]
                        dark:bg-transparent
                        dark:border-white
                    `
            }
            font-medium
            rounded-lg
            transition
            duration-200
            ${className || ""}
        `}>
            {children}
        </button>
    );
}