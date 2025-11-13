"use client";
import { useAlertStore } from "@/providers/alert";
import { Layout } from "@/providers/layout";
import { ENDPOINTS, ROUTES } from "@/shared/site";
import { postRequest } from "@/utils/axios-instance";
import { Button, Textarea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useCallback, useRef, useState } from "react";
import { RxArrowUp } from "react-icons/rx";
import { SessionMicrophone } from "./microphone";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";

export function Chat() {
  const { setAlert } = useAlertStore();
  const { replace } = useRouter();
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recordPluginRef = useRef<RecordPlugin | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
    },
    []
  );

  const handleCreateSession = useCallback(async (value: string) => {
    if (value.trim() === "") return;

    try {
      const { data } = await postRequest({
        url: ENDPOINTS.chat_session_generate,
        data: { content: value.trim(), model: "Base" },
      });
      if (data) {
        replace(`${ROUTES.chat}/${data.slug}`);
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        color: "danger",
        description: "Failed to send message.",
      }));
    }
  }, []);
  const handleSessionSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleCreateSession(content);
      setContent("");
    },
    [content]
  );

  const handleSTTSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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

        handleCreateSession(data.text);
      }
    } catch (err) {
      setAlert((prev) => ({
        ...prev,
        isVisible: true,
        description: "Failed to send audio file.",
        color: "danger",
      }));
    }
  }, []);

  return (
    <Layout title="Chatbot">
      <div className="p-4 sm:p-8 space-y-8 flex flex-col justify-center h-full">
        <h1 className="text-center text-2xl">What’s on your mind today?</h1>
        <form
          ref={formRef}
          className="w-full mx-auto"
          onSubmit={isRecording ? handleSTTSubmit : handleSessionSubmit}
        >
          <div className="relative max-w-4xl mx-auto">
            <Textarea
              fullWidth
              color="primary"
              variant="bordered"
              size="lg"
              name="chat"
              radius="full"
              value={isRecording ? "" : content}
              onValueChange={setContent}
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
            <Button
              isLoading={isLoading}
              className="absolute right-2 bottom-2"
              type="submit"
              radius="full"
              isIconOnly
            >
              <RxArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
