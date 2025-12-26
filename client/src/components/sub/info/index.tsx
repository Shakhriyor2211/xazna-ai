import { Key, useCallback, useEffect, useState } from "react";
import { Tab, Tabs } from "@heroui/react";
import { RiChatSmileAiLine, RiVoiceprintLine } from "react-icons/ri";
import { LuScanText } from "react-icons/lu";
import { getError, getRequest } from "@/utils/axios-instance";
import { AxiosErrorProps, SubInfoProps } from "@/types";
import { useAlertStore } from "@/providers/alert";
import { SubInfoTable } from "./table";
import { ENDPOINTS } from "@/shared/site";
import { useIntlayer } from "next-intlayer";

export function SubInfo() {
  const content = useIntlayer("sub-content");
  const [tool, setTool] = useState("llm");
  const [cost, setCost] = useState<SubInfoProps["mdl"][number] | null>(null);
  const [info, setInfo] = useState<SubInfoProps | null>(null);
  const { setAlert } = useAlertStore();

  const handleMdlChange = useCallback(
    (mdl: Key) => {
      setCost(info?.mdl[Number(mdl)] ?? null);
    },
    [info]
  );
  const handleToolChange = useCallback((t: Key) => {
    setTool(t as string);
  }, []);

  const getInfo = useCallback(async () => {
    try {
      const { data } = await getRequest({
        url: `${ENDPOINTS.plan_info}?tool=${tool}`,
      });
      if (data) {
        setInfo(data);
        setCost(data.mdl[0]);
      }
    } catch (e) {
      const { data, status } = getError(e as AxiosErrorProps);
      if (status && status >= 500)
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          description: content.errors.server.value,
          isVisible: true,
        }));
      else
        setAlert((prev) => ({
          ...prev,
          color: "danger",
          description: data.message ?? content.errors.server.value,
          isVisible: true,
        }));
    }
  }, [tool]);

  useEffect(() => {
    getInfo();
  }, [tool]);

  return (
    <div className="space-y-8 mt-12">
      <div className="w-[[calc(100wv-64px)]] flex flex-col">
        <Tabs
          onSelectionChange={handleToolChange}
          classNames={{
            tabList:
              "gap-4 lg:gap-6 w-full relative rounded-none p-0 border-b border-divider",
            tab: "max-w-fit h-12",
          }}
          color="primary"
          variant="underlined"
        >
          <Tab
            key="llm"
            title={
              <div className="flex items-center space-x-2">
                <RiChatSmileAiLine className="hidden sm:inline-block h-5 w-5" />
                <span>{content.tab.chatbot}</span>
              </div>
            }
          />
          <Tab
            key="stt"
            title={
              <div className="flex items-center space-x-2">
                <RiVoiceprintLine className="hidden sm:inline-block h-5 w-5" />
                <span>{content.tab.stt}</span>
              </div>
            }
          />
          <Tab
            key="tts"
            title={
              <div className="flex items-center space-x-2">
                <LuScanText className="hidden sm:inline-block h-5 w-5" />
                <span>{content.tab.tts}</span>
              </div>
            }
          />
        </Tabs>
      </div>
      <div className="flex justify-end items-center space-x-2">
        <Tabs
          size="sm"
          color="primary"
          radius="full"
          onSelectionChange={handleMdlChange}
        >
          {info?.mdl.map((m, i) => {
            return <Tab key={i} title={m.title} />;
          })}
        </Tabs>
      </div>
      {info !== null && (
        <SubInfoTable
          plan={info?.plan}
          rate={info?.rate}
          tool={tool}
          cost={cost}
        />
      )}
    </div>
  );
}
