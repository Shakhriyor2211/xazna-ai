import { TTSConfigListProps, TTSConfigProps } from "@/types";
import { Select, SelectItem } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
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
  const content = useIntlayer("tts-content");

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name;
    setSettings((prev) =>
      prev === null ? prev : { ...prev, [name]: event.target.value }
    );
  }, []);

  return settings !== null ? (
    <div className="space-y-6 z-50">
      <Select
        disallowEmptySelection
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
        label={content.settings.form.select.model.label}
      >
        {(mdl) => <SelectItem>{mdl.label}</SelectItem>}
      </Select>
      <Select
        disallowEmptySelection
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
        label={content.settings.form.select.emotion.label}
      >
        {(emotion) => <SelectItem>{emotion.label}</SelectItem>}
      </Select>
      <Select
        disallowEmptySelection
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
        label={content.settings.form.select.format.label}
      >
        {(format) => <SelectItem>{format.label}</SelectItem>}
      </Select>
    </div>
  ) : null;
}
