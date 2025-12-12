import { Drawer, DrawerBody, DrawerContent } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { ContentDataProps, ContentHistoryProps, TTSConfigProps } from "@/types";
import { TTSHistory } from ".";

interface TTSHistoryMobileProps {
  isOpen: boolean;
  history: ContentHistoryProps;
  setIsOpen: (isOpen: boolean) => void;
  setHistory: Dispatch<SetStateAction<ContentHistoryProps>>;
  setTtsData: Dispatch<SetStateAction<ContentDataProps>>;
  getHistory: (page?: number) => void;
}

export function TTSHistoryMobile({
  isOpen,
  setIsOpen,
  history,
  setTtsData,
  setHistory,
  getHistory,
}: TTSHistoryMobileProps) {
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  return (
    <Drawer
      className="p-4 bg-white dark:bg-neutral-900"
      placement="bottom"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <DrawerContent>
        <DrawerBody className="w-full max-w-7xl mx-auto">
          <TTSHistory
            history={history}
            setTtsData={setTtsData}
            setHistory={setHistory}
            getHistory={getHistory}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
