import { ChatMessageProps } from "@/types";

export function AssistantMessage({ message }: { message: ChatMessageProps }) {
  return message !== null ? <p>{message.content}</p> : null;
}
