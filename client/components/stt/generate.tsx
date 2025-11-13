import { ENDPOINTS } from "@/shared/site";
import { getDataError, postRequest } from "@/utils/axios-instance";
import { Button, Spinner } from "@heroui/react";
import { filesize } from "filesize";
import {
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineAudiotrack } from "react-icons/md";
import { STTDrawer } from "./drawer";
import {
  AxiosErrorProps,
  ContentDataProps,
  ContentHistoryProps,
} from "@/types";
import { useAlertStore } from "@/providers/alert";

interface STTGenerateProps {
  history: ContentHistoryProps;
  sttData: ContentDataProps;
  setSttData: Dispatch<SetStateAction<ContentDataProps>>;
  getHistory: (page?: number) => void;
}

export function STTGenerate({
  history,
  sttData,
  getHistory,
  setSttData,
}: STTGenerateProps) {
  const [file, setFile] = useState<File | null>(null);
  const { setAlert } = useAlertStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: handleDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: {
      "audio/wav": [".wav"],
      "audio/mpeg": [".mp3"],
    },
    maxSize: 50 * 1024 * 1024,
  });

  const handleClear = useCallback(() => {
    setFile(null);
  }, [file]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (file === null) return;

      setIsLoading(true);

      const form_data = new FormData();

      form_data.append("file", file);
      form_data.append("model", "Base");

      try {
        const { data } = await postRequest({
          url: ENDPOINTS.stt_generate,
          data: form_data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data) {
          setSttData({
            audioUrl: `${ENDPOINTS.audio_stream}/${data.audio.id}`,
            downloadUrl: `${ENDPOINTS.audio_download}/${data.audio.id}`,
            text: data.text,
            id: data.id,
          });
          getHistory(history.range);
        }
      } catch (err) {
        const { message } = getDataError(err as AxiosErrorProps);

        setAlert((prev) => ({
          ...prev,
          isVisible: true,
          description: message,
          color: "danger",
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [file, history, isLoading]
  );

  return (
    <Fragment>
      <form className="p-4 sm:p-8" onSubmit={handleSubmit}>
        {file === null ? (
          <div
            className="flex-1 flex flex-col justify-center relative border border-dashed border-default-400 h-48 rounded-sm"
            {...getRootProps()}
          >
            {isDragActive ? (
              <div className="absolute inset-0 bg-black/10" />
            ) : null}
            <input {...getInputProps()} />

            <div className="space-y-4 flex flex-col items-center justify-center">
              <FiUploadCloud className="w-6 h-6 text-primary" />
              <h3 className="text-xs text-default-500 text-center">
                MP3 or WAV, maximum file size 50 MB
              </h3>

              <Button
                onPress={open}
                size="sm"
                color="primary"
                variant="bordered"
                className="border-1"
              >
                Browse file
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center">
            <div className="bg-default-100 dark:bg-neutral-900 w-full rounded-md p-4 gap-2 flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <MdOutlineAudiotrack className="w-10 h-10 text-default-600" />
                <div>
                  <h3 className="flex-1 w-56 text-sm text-default-600 truncate">
                    {file.name}
                  </h3>
                  <span className="text-xs text-default-500">
                    {filesize(file?.size ?? 0, {
                      standard: "jedec",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex justify-end gap-2">
                <Button
                  size="sm"
                  type="submit"
                  isLoading={isLoading}
                  spinner={<Spinner variant="dots" color="white" size="sm" />}
                  color="primary"
                >
                  {!isLoading ? "Generate text" : ""}
                </Button>
                <Button isDisabled={isLoading} onPress={handleClear} size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
      <STTDrawer sttData={sttData} setSttData={setSttData} setFile={setFile} />
    </Fragment>
  );
}
