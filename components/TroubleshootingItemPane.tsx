import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";

export default function TroubleshootingItemPane({
    children,
    title
}: {
    children: string,
    title: string
}) {
    return (
        <div className="markdown-view">
            <h4 className="mt-2 text-xl md:text-2xl font-bold">
                {title}
            </h4>
            <div className="-mt-1">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}>
                    {children}
                </Markdown>
            </div>
        </div>
    )
}