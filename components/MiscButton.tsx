import { ReactNode } from "react";

export default function MiscButton({
    children,
    className,
    isAlternative,
    isGhost,
    onClick,
    isDisabled
}: {
    children: ReactNode,
    className?: string,
    isAlternative?: boolean,
    isGhost?: boolean,
    onClick?: () => void,
    isDisabled?: boolean
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
                    enabled:hover:bg-neutral-800
                    active:bg-neutral-700
                    dark:bg-white
                    dark:text-black
                    dark:border-transparent
                    enabled:dark:hover:bg-neutral-100
                    dark:active:bg-neutral-200
                `
                : isGhost
                    ? `
                        px-6
                        py-[7px]
                        enabled:hover:bg-neutral-100
                        enabled:dark:hover:bg-neutral-800
                        enabled:active:bg-neutral-200
                        enabled:dark:active:bg-neutral-700
                        border-[1px]
                        border-transparent
                    `
                    : `
                        bg-neutral-50
                        enabled:hover:bg-neutral-100
                        enabled:dark:hover:bg-neutral-800
                        enabled:active:bg-neutral-200
                        enabled:dark:active:bg-neutral-700
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
            disabled:opacity-50
            ${className || ""}
        `} disabled={isDisabled}>
            {children}
        </button>
    );
}