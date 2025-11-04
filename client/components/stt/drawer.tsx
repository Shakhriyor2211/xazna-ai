import { AudioPlayer } from "@/shared/audio-player";
import { ENDPOINTS } from "@/shared/site";
import { ContentDataProps } from "@/types";
import { putRequest } from "@/utils/axios-instance";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Textarea,
} from "@heroui/react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";

interface ContentDrawerProps {
  setFile: (file: File | null) => void;
  sttData: ContentDataProps;
  setSttData: Dispatch<SetStateAction<ContentDataProps>>;
}

export function STTDrawer({
  sttData,
  setSttData,
  setFile,
}: ContentDrawerProps) {
  const [newText, setNewText] = useState<string | null>(null);
  const handleClose = useCallback(() => {
    setFile(null);
    setSttData((prev) => ({ ...prev, text: null, audioUrl: "" }));
  }, []);

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewText(event.target.value);
    },
    [newText]
  );

  const handleReset = useCallback(() => {
    setNewText(null);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement | HTMLDivElement>) => {
      event.preventDefault();
      try {
        const _ = await putRequest({
          url: `${ENDPOINTS.stt_change}/${sttData.id}`,
          data: { text: newText },
        });
        setSttData((prev) => ({ ...prev, text: newText }));
      } catch {}
    },
    [newText, sttData]
  );

  return (
    <Drawer
      className="px-2 pb-2 pt-8 bg-white dark:bg-neutral-900"
      radius="sm"
      size="full"
      isOpen={sttData.text !== null}
      placement="bottom"
      onClose={handleClose}
    >
      <DrawerContent>
        <DrawerBody
          as="form"
          className="w-full max-w-7xl mx-auto space-y-4"
          onSubmit={handleSubmit}
        >
          <Textarea
            value={newText ?? sttData.text ?? ""}
            onChange={handleTextChange}
            name="text"
            fullWidth
            radius="sm"
            placeholder="Enter text"
            classNames={{
              base: "h-full",
              inputWrapper: "!h-full",
              input: "h-full p-2",
              label: "text-default-500",
            }}
            disableAutosize
          />
          <div className="flex gap-2 justify-end">
            <Button
              isDisabled={sttData.text === newText || newText === null}
              onPress={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              isDisabled={sttData.text === newText || Boolean(!newText)}
              color="primary"
            >
              Update
            </Button>
          </div>
          <AudioPlayer
            stream_url={sttData.audioUrl}
            download_url={sttData.downloadUrl}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
