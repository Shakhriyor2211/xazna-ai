"use client";

import { useAlertStore } from "@/providers/alert";
import { Layout } from "@/providers/layout";
import { ENDPOINTS, TTS_CONFIGS } from "@/shared/site";
import {
  AxiosErrorProps,
  ContentDataProps,
  ContentHistoryProps,
  TTSConfigListProps,
  TTSConfigProps,
} from "@/types";
import { getDataError, getRequest, postRequest } from "@/utils/axios-instance";
import { Spinner, Button, Tabs, Tab } from "@heroui/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { TTSTextArea } from "./text-area";
import { IoSettingsOutline } from "react-icons/io5";
import { TTSHistory } from "./history";
import { TTSDrawer } from "./drawer";
import { TTSSettings } from "./settings";
import { TTSSettingsMobile } from "./settings/mobile";
import { TTSHistoryMobile } from "./history/mobile";
import { RiHistoryFill } from "react-icons/ri";
import { Header } from "../navigation/header";
import { Sidebar } from "../navigation/sidebar";

export function TTS() {
  const [text, setText] = useState("");
  const [ttsData, setTtsData] = useState<ContentDataProps>({
    text: "",
    audioUrl: "",
    downloadUrl: "",
    id: "",
  });
  const [settings, setSettings] = useState<TTSConfigProps | null>(null);
  const [settingsList, setSettingsList] = useState<TTSConfigListProps>({
    formats: [],
    mdls: [],
    emotions: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlertStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<ContentHistoryProps>({
    results: [],
    total: 0,
    range: TTS_CONFIGS.pagination.default_rows,
    isLoading: true,
    showInput: false,
    showControls: true,
    scrollBottom: false,
  });

  const getHistory = useCallback(
    async (
      range: number = TTS_CONFIGS.pagination.default_rows,
      scrollBottom = true
    ) => {
      try {
        const { data } = await getRequest({
          url: `${ENDPOINTS.tts_list}?page_size=${range}`,
        });

        if (data)
          setHistory((prev) => ({
            ...prev,
            results: data.results,
            total: data.count,
            showInput: data.count > 0,
          }));
      } catch {
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          isVisible: true,
          title: "",
          description: "Failed to load history.",
        }));
      } finally {
        setHistory((prev) => ({
          ...prev,
          range,
          isLoading: false,
          showControls: true,
          scrollBottom,
        }));
      }
    },
    [history]
  );
  const getSettings = useCallback(async () => {
    const { data } = await getRequest({ url: ENDPOINTS.tts_settings });

    try {
      const { data } = await getRequest({ url: ENDPOINTS.tts_settings });

      if (data) {
        setSettingsList(data);
        setSettings({
          mdl: data.mdls[0],
          emotion: data.emotions[0],
          format: data.formats[0],
        });
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        isVisible: true,
        title: "",
        description: "Failed to load settings.",
      }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!text || text.trim() === "") {
        return;
      }

      setIsLoading(true);

      try {
        const { data } = await postRequest({
          url: ENDPOINTS.tts_generate,
          method: "POST",
          data: {
            text: text?.trim(),
            ...settings,
          },
        });
        if (data) {
          setTtsData({
            text: data.text,
            audioUrl: `${ENDPOINTS.audio_stream}/${data.audio.id}`,
            downloadUrl: `${ENDPOINTS.audio_download}/${data.audio.id}`,
            id: data.id,
          });
          getHistory(history.range, false);
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
    [isLoading, settings, history, text]
  );

  const handleOpenSetting = useCallback(() => {
    setSettingsOpen(true);
  }, [settingsOpen]);

  const handleOpenHistory = useCallback(() => {
    setHistoryOpen(true);
  }, [historyOpen]);

  useEffect(() => {
    getSettings();
    getHistory();
  }, []);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Text to speech" />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto sm:flex">
          <form className="sm:flex-1 h-full relative" onSubmit={handleSubmit}>
            <TTSTextArea text={text} setText={setText} />
            <div className="bg-white dark:bg-black absolute inset-x-0 bottom-0 p-4 space-y-4 sm:space-y-0">
              <div className="sm:hidden flex justify-end gap-2">
                <Button
                  onPress={handleOpenSetting}
                  variant="bordered"
                  isIconOnly
                  className="border border-default-300"
                >
                  <IoSettingsOutline className="w-5 h-5 text-default-600" />
                </Button>
                <Button
                  onPress={handleOpenHistory}
                  variant="bordered"
                  isIconOnly
                  className="border border-default-300"
                >
                  <RiHistoryFill className="w-5 h-5 text-default-600" />
                </Button>
              </div>
              <div className="flex justify-end items-center gap-4">
                <span className="text-xs text-default-600">
                  {text.length}&nbsp;/&nbsp;5000 characters
                </span>
                <Button
                  className="w-40"
                  isDisabled={Boolean(!text.trim())}
                  type="submit"
                  isLoading={isLoading}
                  spinner={<Spinner variant="dots" color="white" size="sm" />}
                  color="primary"
                >
                  {!isLoading ? "Synthesize speech" : ""}
                </Button>
              </div>
            </div>
          </form>

          <div className="hidden sm:flex flex-col sm:w-90 space-y-4 border-l border-default-200 p-4">
            <Tabs
              variant="underlined"
              classNames={{
                tabList:
                  "w-full rounded-none p-0 border-b border-divider gap-0",
                cursor: "absolute inset-x-0",
                tab: "max-w-fit pl-0 pr-6 h-12 relative",
              }}
            >
              <Tab as="div" title="Settings" key="settings">
                <TTSSettings
                  settingsList={settingsList}
                  setSettings={setSettings}
                  settings={settings}
                  isLoading={isLoading}
                />
              </Tab>
              <Tab as="div" title="History" key="history">
                <TTSHistory
                  setTtsData={setTtsData}
                  setHistory={setHistory}
                  history={history}
                  getHistory={getHistory}
                />
              </Tab>
            </Tabs>
          </div>

          <TTSDrawer ttsData={ttsData} setTtsData={setTtsData} />
          <TTSSettingsMobile
            isLoading={isLoading}
            settings={settings}
            settingsList={settingsList}
            setSettings={setSettings}
            isOpen={settingsOpen}
            setIsOpen={setSettingsOpen}
          />
          <TTSHistoryMobile
            isOpen={historyOpen}
            setIsOpen={setHistoryOpen}
            history={history}
            setTtsData={setTtsData}
            setHistory={setHistory}
            getHistory={getHistory}
          />
        </div>
      </div>
    </main>
  );
}
