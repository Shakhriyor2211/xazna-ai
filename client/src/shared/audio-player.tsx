import WavesurferPlayer from "@wavesurfer/react";
import { useCallback, useState } from "react";
import { COLORS } from "./site";
import { Button, PressEvent } from "@heroui/button";

import { SliderValue } from "@heroui/slider";
import WaveSurfer from "wavesurfer.js";
import { RiPauseCircleFill, RiPlayCircleFill } from "react-icons/ri";
import { BiDislike, BiLike } from "react-icons/bi";
import { LuDownload } from "react-icons/lu";

interface PlayerProps {
  stream_url: string;
  download_url?: string | null;
}

export function AudioPlayer({ stream_url, download_url = null }: PlayerProps) {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState<SliderValue>(70);

  const handleReady = useCallback(
    (ws: WaveSurfer) => {
      setWavesurfer(ws);
      setIsPlaying(false);
    },
    [wavesurfer, isPlaying]
  );

  const handlePlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
    setIsPlaying(!isPlaying);
  }, [wavesurfer, isPlaying]);

  const handleFinish = useCallback(() => {
    setIsPlaying(false);
  }, [isPlaying]);

  const handleMute = useCallback(() => {
    wavesurfer && wavesurfer.setMuted(!isMuted);
    setIsMuted(!isMuted);
  }, [wavesurfer, isMuted]);

  const handleSpeed = useCallback(
    (event: PressEvent) => {
      const value = parseFloat(event.target.id);
      wavesurfer && wavesurfer.setPlaybackRate(value);
      setSpeed(value);
    },
    [wavesurfer, speed]
  );

  const handleVolume = useCallback(
    (value: SliderValue) => {
      setVolume(value);
      wavesurfer && wavesurfer.setVolume((value as number) / 100);
    },
    [wavesurfer, volume]
  );

  const handleDownload = useCallback(async () => {
    if (download_url === null) return;

    const link = document.createElement("a");
    link.href = download_url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [download_url]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex justify-center">
        {isPlaying ? (
          <RiPauseCircleFill
            onClick={handlePlayPause}
            className="w-10 h-10 text-primary hover:text-primary/80 cursor-pointer"
          />
        ) : (
          <RiPlayCircleFill
            onClick={handlePlayPause}
            className="w-10 h-10 text-primary hover:text-primary/80 cursor-pointer"
          />
        )}
      </div>

      <div className="flex-1 space-y-2">
        <WavesurferPlayer
          height={48}
          progressColor={COLORS.primary}
          dragToSeek={true}
          url={stream_url ?? ""}
          onReady={handleReady}
          onFinish={handleFinish}
        />
      </div>

      <div className="flex gap-2">
        {/* <Button size="sm" isIconOnly variant="light">
          <BiLike className="text-default-600 w-5 h-5" />
        </Button>
        <Button size="sm" isIconOnly variant="light">
          <BiDislike className="text-default-600 w-5 h-5" />
        </Button> */}
        {download_url !== null ? (
          <Button onPress={handleDownload} size="sm" isIconOnly variant="light">
            <LuDownload className="text-default-600 w-5 h-5" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
