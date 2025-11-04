import { TTS_CONFIGS } from "@/shared/site";
import { Textarea } from "@heroui/react";
import { ChangeEvent, useCallback } from "react";

interface TTSTextAreaProps {
  text: string;
  setText: (text: string) => void;
}

export function TTSTextArea({ text, setText }: TTSTextAreaProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.slice(0, TTS_CONFIGS.max_length);
      if (text.length === 5000 && value.length === 5000) return;
      setText(value);
    },
    [text]
  );

  const handleClear = useCallback(() => {
    setText("");
  }, [text]);

  return (
    <Textarea
      isClearable
      value={text}
      onClear={handleClear}
      onChange={handleChange}
      name="text"
      fullWidth
      variant="bordered"
      radius="none"
      placeholder="Enter text"
      classNames={{
        base: "h-full",
        inputWrapper: "!h-full border-none shadow-none",
        input: "h-full p-2",
        label: "text-default-500",
      }}
      disableAutosize
    />
  );
}
