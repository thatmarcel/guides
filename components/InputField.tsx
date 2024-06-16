import {HTMLInputTypeAttribute} from "react";

export default function InputField({
    title,
    placeholder,
    type,
    className,
    value,
    onTextChange,
    hasError
}: {
    title: string,
    placeholder: string,
    type: HTMLInputTypeAttribute,
    className?: string
    value: string,
    onTextChange: (value: string) => void,
    hasError?: boolean
}) {
    return (
        <div className={className}>
            <p
                className="text-lg font-medium pb-1"
            >
                {title}
            </p>

            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => { onTextChange && onTextChange(e.target.value) }}
                className={`
                    w-full
                    border-[1px]
                    rounded-lg
                    shadow
                    shadow-neutral-50
                    dark:shadow-neutral-950
                    dark:border-[2px]
                    px-4
                    py-2
                    ${hasError ? "border-red-500" : "border-neutral-200 dark:border-neutral-700"}
                `}
            />
        </div>
    )
}