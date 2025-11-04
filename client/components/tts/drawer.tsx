import { AudioPlayer } from "@/shared/audio-player";
import { ContentDataProps } from "@/types";
import { Drawer, DrawerBody, DrawerContent, Textarea } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback } from "react";

interface ContentDrawerProps {
  ttsData: ContentDataProps;
  setTtsData: Dispatch<SetStateAction<ContentDataProps>>;
}

export function TTSDrawer({ ttsData, setTtsData }: ContentDrawerProps) {
  const handleClose = useCallback(() => {
    setTtsData((prev) => ({ ...prev, text: null, audioUrl: "" }));
  }, [ttsData]);

  return (
    <Drawer
      className="px-2 pb-2 pt-8 bg-white dark:bg-neutral-900"
      radius="sm"
      size="full"
      isOpen={ttsData.text !== "" && ttsData.audioUrl !== ""}
      placement="bottom"
      onClose={handleClose}
    >
      <DrawerContent>
        <DrawerBody as="form" className="w-full max-w-7xl mx-auto space-y-4">
          <Textarea
            isDisabled
            value={ttsData.text ?? ""}
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

          <AudioPlayer
            stream_url={ttsData.audioUrl}
            download_url={ttsData.downloadUrl ?? ""}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
