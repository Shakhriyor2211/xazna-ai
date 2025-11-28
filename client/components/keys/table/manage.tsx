import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { KeyResultsProps } from "@/types";
import { putRequest } from "@/utils/axios-instance";
import { Switch } from "@heroui/react";
import { useCallback } from "react";

export function KeyManage({ item }: { item: KeyResultsProps }) {
  const { setAlert } = useAlertStore();
  const handleSettings = useCallback(async (is_active: Boolean) => {
    try {
      const _ = await putRequest({
        url: `${ENDPOINTS.token_manage}/${item.id}`,
        data: {
          is_active,
        },
      });
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        title: "",
        description: "Failed to change settings.",
        isVisible: true,
      }));
    }
  }, []);
  return (
    <Switch
      size="sm"
      onValueChange={handleSettings}
      defaultSelected={item.is_active}
      aria-label="Enable status"
    />
  );
}
