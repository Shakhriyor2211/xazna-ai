import { ChatMessageProps } from "@/types";

export function UserMessage({ message }: { message: ChatMessageProps }) {
  return message !== null ? (
    <div className="flex justify-end">
      <div className="bg-default-200 py-2 px-3 sm:py-3 sm:px-4 rounded-4xl inline-flex justify-center min-w-24">
        <p>{message.content}</p>
      </div>
    </div>
  ) : null;
}
