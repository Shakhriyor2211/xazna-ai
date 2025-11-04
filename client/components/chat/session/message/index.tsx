import { ChatMessageProps } from "@/types";
import { AssistantMessage } from "./assistant";
import { UserMessage } from "./user";
import {
  Dispatch,
  Fragment,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface MessageProps {
  messages: ChatMessageProps[];
  autoScrollEnabled: boolean;
  setAutoScrollEnabled: Dispatch<SetStateAction<boolean>>;
}

export function SessionMessage({
  messages,
  autoScrollEnabled,
  setAutoScrollEnabled,
}: MessageProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleAutoScroll = useCallback(() => {
    setAutoScrollEnabled(false);
  }, [autoScrollEnabled]);

  useEffect(() => {
    if (!bottomRef.current || !autoScrollEnabled) return;

    bottomRef.current.scrollIntoView({
      behavior: isFirstLoad ? "auto" : "smooth",
    });

    if (isFirstLoad && messages.length > 0) {
      setIsFirstLoad(false);
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 sm:px-8"
      onWheel={handleAutoScroll}
    >
      <div className="text-sm sm:text-base space-y-8 w-full mx-auto max-w-4xl">
        {messages.map((message, index) => (
          <Fragment key={index}>
            {message.role === "user" ? (
              <UserMessage message={message} />
            ) : (
              <AssistantMessage message={message} />
            )}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
