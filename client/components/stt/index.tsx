"use client";

import { STTHistory } from "./history";
import { STTGenerate } from "./generate";
import { ContentDataProps, ContentHistoryProps } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useAlertStore } from "@/providers/alert";
import { getRequest } from "@/utils/axios-instance";
import { ENDPOINTS, STT_CONFIGS } from "@/shared/site";
import { Sidebar } from "../navigation/sidebar";
import { Header } from "../navigation/header";

export function STT() {
  const [sttData, setSttData] = useState<ContentDataProps>({
    text: null,
    audioUrl: "",
    downloadUrl: "",
    id: "",
  });
  const [history, setHistory] = useState<ContentHistoryProps>({
    results: [],
    total: 0,
    range: 1,
    isLoading: true,
    showInput: false,
    showControls: true,
  });

  const { setAlert } = useAlertStore();

  const getHistory = useCallback(
    async (range: number = 1) => {
      try {
        const { data } = await getRequest({
          url: `${ENDPOINTS.stt_list}?page=${range}&page_size=${
            STT_CONFIGS.pagination.rows_per_page
          }`,
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
        }));
      }
    },
    [history]
  );
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title="Speech to text" />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto max-w-2xl mx-auto space-y-6">
          <STTGenerate
            sttData={sttData}
            setSttData={setSttData}
            history={history}
            getHistory={getHistory}
          />
          <STTHistory
            setSttData={setSttData}
            getHistory={getHistory}
            history={history}
            setHistory={setHistory}
          />
        </div>
      </div>
    </main>
  );
}
