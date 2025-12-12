import { COLORS } from "@/shared/site";
import { Button } from "@heroui/react";
import React, {
  useRef,
  useEffect,
  Fragment,
  useCallback,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";
import { PiMicrophone, PiX } from "react-icons/pi";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";

interface SessionMicrophoneProps {
  recordPluginRef: MutableRefObject<RecordPlugin | null>;
  isRecording: boolean;
  setIsRecording: Dispatch<SetStateAction<boolean>>;
}

export function SessionMicrophone({
  recordPluginRef,
  isRecording,
  setIsRecording,
}: SessionMicrophoneProps) {
  const micContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (micContainerRef.current === null) return;
    const wavesurferInstance = WaveSurfer.create({
      container: micContainerRef.current,
      waveColor: COLORS.primary,
      height: 40,
      barGap: 2,
    });

    recordPluginRef.current = RecordPlugin.create({
      renderRecordedAudio: false,
      scrollingWaveform: true,
      continuousWaveform: false,
    });

    wavesurferInstance.registerPlugin(recordPluginRef.current);

    return () => {
      wavesurferInstance.destroy();
    };
  }, []);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    if (
      recordPluginRef.current !== null &&
      !recordPluginRef.current.isRecording()
    )
      recordPluginRef.current.startRecording();
  }, [recordPluginRef]);

  const stopRecording = useCallback(async () => {
    setIsRecording(false);

    if (recordPluginRef.current?.isRecording()) {
      recordPluginRef.current.stopRecording();
    }
  }, [recordPluginRef]);

  return (
    <Fragment>
      {isRecording ? (
        <Button
          color="danger"
          className="absolute left-2 bottom-2"
          radius="full"
          variant="light"
          isIconOnly
          onPress={stopRecording}
        >
          <PiX className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          className="absolute left-2 bottom-2"
          radius="full"
          variant="light"
          isIconOnly
          onPress={startRecording}
        >
          <PiMicrophone className="w-5 h-5" />
        </Button>
      )}

      <div
        className={`absolute inset-y-0 inset-x-14 ${
          isRecording ? "flex items-center" : "hidden"
        }`}
      >
        <div className="flex-1" ref={micContainerRef} />
      </div>
    </Fragment>
  );
}
