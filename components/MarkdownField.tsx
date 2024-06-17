"use client"

import {Milkdown, MilkdownProvider, useEditor} from "@milkdown/react";
import {defaultValueCtx, Editor, rootCtx} from "@milkdown/core";
import {commonmark} from "@milkdown/preset-commonmark";
import {gfm} from "@milkdown/preset-gfm";
import {history} from "@milkdown/plugin-history";
import {clipboard} from "@milkdown/plugin-clipboard";
import {listener, listenerCtx} from "@milkdown/plugin-listener";
import {useEffect} from "react";

const MilkdownEditor = ({
    startValue,
    onMarkdownUpdated
}: {
    startValue: string,
    onMarkdownUpdated: (markdown: string) => void
}) => {
    const { get } = useEditor((root) =>
        Editor
            .make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, startValue);
            })
            .config((ctx) => {
                ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
                    onMarkdownUpdated(markdown);
                });
            })
            .use(listener)
            .use(commonmark)
            .use(gfm)
            .use(history)
            .use(clipboard)
    );

    return <Milkdown />;
};

export default function MarkdownField({
    title,
    startValue,
    className,
    onMarkdownUpdated
}: {
    title: string,
    startValue: string,
    className?: string,
    onMarkdownUpdated: (markdown: string) => void
}) {
    return (
        <div className={className}>
            <p
                className="text-lg font-medium pb-1"
            >
                {title} (supports <a
                    className="underline underline-offset-2"
                    href="https://www.markdownguide.org/cheat-sheet/#basic-syntax"
                >
                    Markdown
                </a>)
            </p>

            <MilkdownProvider>
                <MilkdownEditor
                    startValue={startValue}
                    onMarkdownUpdated={onMarkdownUpdated}
                />
            </MilkdownProvider>
        </div>
    )
}