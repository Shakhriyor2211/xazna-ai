import { useAlertStore } from "@/providers/alert";
import { COLORS } from "@/shared/site";
import { Button } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import {
  useRef,
  useEffect,
  Fragment,
  useCallback,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { PiMicrophone, PiX } from "react-icons/pi";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";

interface SessionMicrophoneProps {
  recordPluginRef: RefObject<RecordPlugin | null>;
  isRecording: boolean;
  setIsRecording: Dispatch<SetStateAction<boolean>>;
}

export function SessionMicrophone({
  recordPluginRef,
  isRecording,
  setIsRecording,
}: SessionMicrophoneProps) {
  const micContainerRef = useRef<HTMLDivElement | null>(null);
  const { setAlert } = useAlertStore();
  const content = useIntlayer("chatbot-content");

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

    recordPluginRef.current.on("record-progress", (time) => {
      if (time / 1000 > 120) {
        recordPluginRef.current?.pauseRecording();
        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          description: content.errors.recording_limit,
          color: "danger",
        }));
      }
    });

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
