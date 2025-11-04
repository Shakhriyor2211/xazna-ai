import useDate from "@/hooks/date";
import { ENDPOINTS, STT_CONFIGS } from "@/shared/site";
import { getRequest } from "@/utils/axios-instance";
import { Code, Input, Pagination, Skeleton } from "@heroui/react";
import {
  Dispatch,
  Fragment,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { PiMusicNote } from "react-icons/pi";
import { RiSearch2Line } from "react-icons/ri";
import { useDebounce } from "@/hooks/debounce";
import { STTDelete } from "./delete";
import { ContentDataProps, ContentHistoryProps } from "@/types";

interface STTHistoryDataProps {
  getHistory: (page?: number) => void;
  history: ContentHistoryProps;
  setHistory: Dispatch<SetStateAction<ContentHistoryProps>>;
  setSttData: Dispatch<SetStateAction<ContentDataProps>>;
}

export function STTHistory({
  getHistory,
  history,
  setHistory,
  setSttData,
}: STTHistoryDataProps) {
  const [q, setQ] = useState("");
  const debouncedQuery = useDebounce(q, 500);
  const { mediumDate } = useDate();

  const handleSearch = useCallback(async () => {
    try {
      const { data } = await getRequest({
        url: `${ENDPOINTS.stt_search}?q=${q}`,
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
        setSttData({
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

  return (
    <form className="space-y-2">
      <h3 className="font-semibold px-4 sm:px-8">History</h3>
      {history.isLoading ? (
        <Fragment>
          <div className="px-4 sm:px-8">
            <Skeleton className="h-9.5 rounded-lg" />
          </div>

          <div className="space-y-2 mt-4 mb-12 max-h-72 overflow-y-auto px-2 sm:px-6">
            {[...Array(STT_CONFIGS.pagination.rows_per_page)].map((_, i) => (
              <div key={i} className="p-2 flex items-center gap-4">
                <Skeleton className="rounded-lg w-9 h-10" />
                <div className="flex flex-col flex-1 space-y-1">
                  <Skeleton className="rounded w-50 h-3" />
                  <Skeleton className="rounded w-28 h-3" />
                </div>
                <Skeleton className="rounded-lg w-8 h-8" />
              </div>
            ))}
          </div>
          <div className="flex justify-end px-4 sm:px-8">
            <Skeleton className="w-64 h-7 rounded-md" />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {history.showInput ? (
            <Input
              radius="sm"
              isClearable
              variant="bordered"
              fullWidth
              classNames={{
                base: "px-4 sm:px-8",
                inputWrapper: "border border-default-300",
              }}
              placeholder="Search by name ..."
              startContent={<RiSearch2Line className="text-gray-600" />}
              value={q}
              onClear={() => setQ("")}
              onValueChange={handleSearchChange}
            />
          ) : null}

          {history.total > 0 ? (
            <Fragment>
              <div className="space-y-2 mt-4 mb-12 max-h-72 overflow-y-auto px-2 sm:px-6">
                {history.results.map((item, i) => (
                  <div
                    data-index={i}
                    key={item.id}
                    onClick={handelOpenDrawer}
                    className="hover:bg-default-100 p-2 rounded-lg flex items-center gap-4 text-sm"
                  >
                    <Code className="py-2.5">
                      <PiMusicNote className="w-5 h-5 text-default-600" />
                    </Code>
                    <div className="flex flex-col flex-1 cursor-pointer">
                      <span className="w-50 truncate">{item.audio.name}</span>
                      <span className="text-xs text-default-500">
                        {mediumDate(item.created_at)}
                      </span>
                    </div>
                    <STTDelete
                      history={history}
                      id={item.id}
                      getHistory={getHistory}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end px-4 sm:px-8">
                {history.showControls &&
                history.total > STT_CONFIGS.pagination.rows_per_page ? (
                  <Pagination
                    classNames={{
                      item: "cursor-pointer",
                      prev: "cursor-pointer",
                      next: "cursor-pointer",
                    }}
                    size="sm"
                    showShadow
                    showControls
                    page={history.range}
                    total={Math.ceil(
                      history.total / STT_CONFIGS.pagination.rows_per_page
                    )}
                    onChange={getHistory}
                    color="primary"
                  />
                ) : null}
              </div>
            </Fragment>
          ) : (
            <h3 className="text-sm text-default-400 py-2 px-4 sm:px-8">
              {history.showInput
                ? "No results found."
                : "There is no data yet."}
            </h3>
          )}
        </Fragment>
      )}
    </form>
  );
}
