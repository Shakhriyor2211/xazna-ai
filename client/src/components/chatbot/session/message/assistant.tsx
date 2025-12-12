import { ChatMessageProps } from "@/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AssistantMessage({ message }: { message: ChatMessageProps }) {
  return message !== null ? (
    <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
  ) : null;
}
