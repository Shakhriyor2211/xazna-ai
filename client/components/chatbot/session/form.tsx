import { useAlertStore } from "@/providers/alert";
import { ChatMessageProps } from "@/types";
import { Button, Textarea } from "@heroui/react";
import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { PiStopFill } from "react-icons/pi";
import { RxArrowUp } from "react-icons/rx";
import { SessionMicrophone } from "../microphone";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import { ENDPOINTS } from "@/shared/site";
import { postRequest } from "@/utils/axios-instance";

interface SessionFormProps {
  isStreaming: boolean;
  setIsStreaming: Dispatch<SetStateAction<boolean>>;
  ws: MutableRefObject<WebSocket | null>;
  handleSenMessage: (value: string) => void;
}

export function SessionForm({
  ws,
  isStreaming,
  handleSenMessage,
  setIsStreaming,
}: SessionFormProps) {
  const { setAlert } = useAlertStore();
  const formRef = useRef<HTMLFormElement>(null);
  const recordPluginRef = useRef<RecordPlugin | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        if (!isStreaming) formRef.current?.requestSubmit();
      }
    },
    [isStreaming]
  );

  const handleCancel = useCallback(() => {
    try {
      ws.current?.send(JSON.stringify({ action: "cancel" }));
      setIsStreaming(false);
    } catch (err) {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        description: "Failed to cancel process.",
      }));
    }
  }, [ws]);

  const handleLLMSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSenMessage(content);
      setContent("");
    },
    [content]
  );
  const handleSTTSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (recordPluginRef.current === null) return;

      setIsLoading(true);
      setIsRecording(false);

      recordPluginRef.current.stopRecording();

      recordPluginRef.current.on("record-end", handleRecordEnd);

      return () => {
        recordPluginRef.current?.un("record-end", handleRecordEnd);
      };
    },
    [recordPluginRef]
  );

  const handleRecordEnd = useCallback(async (blob: Blob) => {
    const extension = blob.type.split("/")[1].split(";")[0];
    const file = new File([blob], `recording.${extension}`, {
      type: blob.type,
    });
    const form_data = new FormData();
    form_data.append("file", file);
    form_data.append("model", "Base");
    try {
      const { data } = await postRequest({
        url: ENDPOINTS.stt_generate,
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data) {
        setIsLoading(false);
        handleSenMessage(data.text);
      }
    } catch (err) {
      setIsLoading(false);
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        description: "Failed to send audio file.",
        color: "danger",
      }));
    }
  }, []);

  return (
    <form
      ref={formRef}
      className="px-4 sm:px-8"
      onSubmit={isRecording ? handleSTTSubmit : handleLLMSubmit}
    >
      <div className="relative  mx-auto max-w-4xl">
        <Textarea
          fullWidth
          color="primary"
          variant="bordered"
          size="lg"
          radius="full"
          name="chat"
          value={isRecording ? "" : content}
          onValueChange={setContent}
          isDisabled={isRecording}
          placeholder={isRecording ? "" : "Ask anything ..."}
          minRows={1}
          onKeyDown={handleKeyDown}
          classNames={{
            inputWrapper: "h-14 min-h-14 border-1 border-default-300",
            input: "h-6 min-h-6 resize-none overflow-hidden px-8",
          }}
        />
        <SessionMicrophone
          recordPluginRef={recordPluginRef}
          setIsRecording={setIsRecording}
          isRecording={isRecording}
        />
        {isStreaming ? (
          <Button
            className="absolute right-2 bottom-2"
            onPress={handleCancel}
            type="button"
            radius="full"
            isIconOnly
          >
            <PiStopFill className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            isLoading={isLoading}
            className="absolute right-2 bottom-2"
            type="submit"
            radius="full"
            isIconOnly
          >
            <RxArrowUp className="w-5 h-5" />
          </Button>
        )}
      </div>
    </form>
  );
}
