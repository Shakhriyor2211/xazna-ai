import { useAlertStore } from "@/providers/alert";
import { Button, Textarea } from "@heroui/react";
import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  RefObject,
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
  content: any;
  setIsStreaming: Dispatch<SetStateAction<boolean>>;
  ws: RefObject<WebSocket | null>;
  handleSendMessage: (value: string) => void;
}

export function SessionForm({
  ws,
  content,
  isStreaming,
  handleSendMessage,
  setIsStreaming,
}: SessionFormProps) {
  const { setAlert } = useAlertStore();
  const formRef = useRef<HTMLFormElement>(null);
  const recordPluginRef = useRef<RecordPlugin | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMesssage] = useState("");
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
        description: content.session.error.server.value,
      }));
    }
  }, [ws]);

  const handleLLMSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSendMessage(message);
      setMesssage("");
    },
    [message]
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
    form_data.append("audio", file);
    form_data.append("mdl", "Base");
    form_data.append("save", "disable");

    try {
      const { data } = await postRequest({
        url: ENDPOINTS.stt_generate,
        data: form_data,
        headers: {
          "message-Type": "multipart/form-data",
        },
      });
      if (data) {
        setIsLoading(false);
        handleSendMessage(data.text);
      }
    } catch (err) {
      setIsLoading(false);
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        description: content.errors.session.server.value,
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
          value={isRecording ? "" : message}
          onValueChange={setMesssage}
          isDisabled={isRecording}
          placeholder={
            isRecording ? "" : content.session.form.message.label.value
          }
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
