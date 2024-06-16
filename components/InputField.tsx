import {HTMLInputTypeAttribute} from "react";

export default function InputField({
    title,
    placeholder,
    type,
    className,
    value,
    onTextChange
}: {
    title: string,
    placeholder: string,
    type: HTMLInputTypeAttribute,
    className?: string
    value: string,
    onTextChange: (value: string) => void
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
                className="
                    w-full
                    border-[1px]
                    rounded-lg
                    shadow
                    shadow-neutral-50
                    border-neutral-200
                    dark:shadow-neutral-950
                    dark:border-neutral-700
                    dark:border-[2px]
                    px-4
                    py-2
                "
            />
        </div>
    )
}