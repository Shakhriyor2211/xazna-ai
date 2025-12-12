import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, KeyResultsProps } from "@/types";
import { getError, putRequest } from "@/utils/axios-instance";
import { Switch } from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { useCallback } from "react";

export function KeyManage({ item }: { item: KeyResultsProps }) {
  const { setAlert } = useAlertStore();
  const content = useIntlayer("keys-content");
  const handleSettings = useCallback(async (is_active: Boolean) => {
    try {
      const _ = await putRequest({
        url: `${ENDPOINTS.token_manage}/${item.id}`,
        data: {
          is_active,
        },
      });
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
          description: data.message,
          isVisible: true,
        }));
    }
  }, []);
  return (
    <Switch
      size="sm"
      defaultSelected={item.is_active}
      onValueChange={handleSettings}
      classNames={{
        wrapper: "p-0 h-3 overflow-visible",
        thumb: [
          "w-5 h-5 border-2 shadow-lg border-default-300",
          "group-data-[selected=true]:ms-6 group-data-[selected=true]:border-primary",
          "group-data-[pressed=true]:w-7",
          "group-data-pressed:group-data-selected:ms-4",
        ],
      }}
    />
  );
}
