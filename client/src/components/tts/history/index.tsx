import useDate from "@/hooks/date";
import { ENDPOINTS, TTS_CONFIGS } from "@/shared/site";
import { getRequest } from "@/utils/axios-instance";
import { Button, Code, Input } from "@heroui/react";
import {
  Dispatch,
  Fragment,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { PiTextAlignLeftLight } from "react-icons/pi";
import { RiSearch2Line } from "react-icons/ri";
import { useDebounce } from "@/hooks/debounce";
import { TTSDelete } from "./delete";
import { ContentDataProps, ContentHistoryProps } from "@/types";
import { useIntlayer } from "next-intlayer";

interface TTSHistoryDataProps {
  getHistory: (page?: number) => void;
  history: ContentHistoryProps;
  setHistory: Dispatch<SetStateAction<ContentHistoryProps>>;
  setTtsData: Dispatch<SetStateAction<ContentDataProps>>;
}

export function TTSHistory({
  history,
  setTtsData,
  setHistory,
  getHistory,
}: TTSHistoryDataProps) {
  const content = useIntlayer("tts-content");
  const [q, setQ] = useState("");
  const historyRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(q, 500);
  const { mediumDate } = useDate();

  const handleSearch = useCallback(async () => {
    try {
      const { data } = await getRequest({
        url: `${ENDPOINTS.tts_search}?q=${q}`,
      });
      if (data) {
        setHistory((prev) => ({
          ...prev,
          results: data.slice(0, 100),
          total: data.length,
        }));
      }
    } catch {
      setHistory((prev) => ({
        ...prev,
        results: [],
        total: 0,
      }));
    }
  }, [history, q]);

  const handelOpenDrawer = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const index = Number(event.currentTarget.dataset.index ?? -1);
      if (index >= 0) {
        setTtsData({
          text: history.results[index].text,
          audioUrl: `${ENDPOINTS.audio_stream}/${history.results[index].audio.id}`,
          downloadUrl: `${ENDPOINTS.audio_download}/${history.results[index].audio.id}`,
          id: history.results[index].id,
        });
      }
    },
    [history]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setQ(value);
      if (history.showControls)
        setHistory((prev) => ({
          ...prev,
          showControls: false,
        }));
    },
    [history, q]
  );

  useEffect(() => {
    if (!debouncedQuery.trim() && !history.isLoading) {
      getHistory();
      return;
    }
    if (!history.isLoading) handleSearch();
  }, [debouncedQuery]);

  useLayoutEffect(() => {
    if (history.scrollBottom)
      historyRef.current?.scrollTo({
        top: historyRef.current.scrollHeight,
        behavior: "smooth",
      });
  }, [history.results]);
  return (
    <form className="space-y-2">
      {history.showInput ? (
        <Input
          radius="sm"
          isClearable
          variant="bordered"
          fullWidth
          classNames={{
            inputWrapper: "border border-default-300",
          }}
          placeholder={content.history.form.search.label.value}
          startContent={<RiSearch2Line className="text-gray-600" />}
          value={q}
          onClear={() => setQ("")}
          onValueChange={handleSearchChange}
        />
      ) : null}

      {history.total > 0 ? (
        <Fragment>
          <div
            ref={historyRef}
            className="space-y-2 mt-4 mb-12 max-h-64 sm:max-h-[calc(100svh-320px)] overflow-y-auto -mx-2"
          >
            {history.results.map((item, i) => (
              <div
                data-index={i}
                key={i}
                onClick={handelOpenDrawer}
                className="hover:bg-default-100 p-2 rounded-lg flex items-center gap-4 text-sm"
              >
                <Code className="py-2">
                  <PiTextAlignLeftLight className="w-5 h-5 text-default-600" />
                </Code>
                <div className="flex flex-col flex-1 cursor-pointer">
                  <span className="w-40 truncate">{item.text}</span>
                  <span className="text-xs text-default-500">
                    {mediumDate(item.created_at)}
                  </span>
                </div>
                <TTSDelete
                  history={history}
                  id={item.id}
                  getHistory={getHistory}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              className={
                history.showControls &&
                history.results.length > TTS_CONFIGS.pagination.default_rows
                  ? "visible"
                  : "invisible"
              }
              fullWidth
              size="sm"
              onPress={() =>
                getHistory(history.range - TTS_CONFIGS.pagination.load_rows)
              }
            >
              {content.history.buttons.less}
            </Button>

            <Button
              className={
                history.showControls && history.total !== history.results.length
                  ? "visible"
                  : "invisible"
              }
              color="primary"
              fullWidth
              size="sm"
              onPress={() =>
                getHistory(history.range + TTS_CONFIGS.pagination.load_rows)
              }
            >
              {content.history.buttons.more}
            </Button>
          </div>
        </Fragment>
      ) : (
        <h3 className="text-sm text-default-400 py-2">
          {history.showInput
            ? content.history.empty.search
            : content.history.empty.load}
        </h3>
      )}
    </form>
  );
}
