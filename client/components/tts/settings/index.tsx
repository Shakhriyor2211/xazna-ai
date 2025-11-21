import { TTSConfigListProps, TTSConfigProps } from "@/types";
import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

interface TTSSettingsProps {
  setSettings: Dispatch<SetStateAction<TTSConfigProps | null>>;
  settings: TTSConfigProps | null;
  settingsList: TTSConfigListProps;
  isLoading: boolean;
}

export function TTSSettings({
  setSettings,
  settings,
  settingsList,
  isLoading,
}: TTSSettingsProps) {
  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    setSettings((prev) =>
      prev === null ? prev : { ...prev, [name]: event.target.value }
    );
  }, []);

  return settings !== null ? (
    <div className="space-y-6 z-50">
      <Select
        variant="underlined"
        classNames={{
          mainWrapper: "border-b border-default-200",
        }}
        onChange={handleChange}
        isDisabled={isLoading}
        size="sm"
        name="mdl"
        items={settingsList.mdls.map((m) => ({ key: m, label: m }))}
        selectedKeys={[settings.mdl]}
        label="Model"
        placeholder="Select a mdl"
      >
        {(mdl) => <SelectItem>{mdl.label}</SelectItem>}
      </Select>
      <Select
        variant="underlined"
        classNames={{
          mainWrapper: "border-b border-default-200",
        }}
        onChange={handleChange}
        isDisabled={isLoading}
        size="sm"
        name="emotion"
        items={settingsList.emotions.map((e) => ({ key: e, label: e }))}
        selectedKeys={[settings.emotion]}
        label="Emotion"
        placeholder="Select a emotion"
      >
        {(emotion) => <SelectItem>{emotion.label}</SelectItem>}
      </Select>
      <Select
        variant="underlined"
        classNames={{
          mainWrapper: "border-b border-default-200",
        }}
        onChange={handleChange}
        isDisabled={isLoading}
        size="sm"
        name="format"
        items={settingsList.formats.map((f) => ({ key: f, label: f }))}
        selectedKeys={[settings.format]}
        label="Audio format"
        placeholder="Select an audio format"
      >
        {(format) => <SelectItem>{format.label}</SelectItem>}
      </Select>
    </div>
  ) : null;
}
