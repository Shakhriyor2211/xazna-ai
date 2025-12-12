import { Drawer, DrawerBody, DrawerContent } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { TTSConfigListProps, TTSConfigProps } from "@/types";
import { TTSSettings } from ".";

interface TTSSettingsMobileProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSettings: Dispatch<SetStateAction<TTSConfigProps | null>>;
  settings: TTSConfigProps | null;
  settingsList: TTSConfigListProps;
  isLoading: boolean;
}

export function TTSSettingsMobile({
  isOpen,
  setIsOpen,
  setSettings,
  isLoading,
  settings,
  settingsList,
}: TTSSettingsMobileProps) {
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
          <TTSSettings
            isLoading={isLoading}
            setSettings={setSettings}
            settings={settings}
            settingsList={settingsList}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
