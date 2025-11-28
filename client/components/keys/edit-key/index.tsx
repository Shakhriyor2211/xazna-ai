import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Divider,
  Input,
} from "@heroui/react";
import { Fragment, useCallback, useState } from "react";
import { EditKeyPermissions } from "./tab";
import { Key } from "@react-types/shared";
import { putRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { KeyResultsProps, KeyTableProps } from "@/types";
import { useAlertStore } from "@/providers/alert";

interface EditKeyProps extends KeyTableProps {
  item: KeyResultsProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditKey({
  item,
  history,
  getHistory,
  isOpen,
  setIsOpen,
}: EditKeyProps) {
  const { setAlert } = useAlertStore();
  const [permissions, setPermissions] = useState({
    llm: item.permission.llm,
    tts: item.permission.tts,
    stt: item.permission.stt,
    history: item.permission.history,
    monitoring: item.permission.monitoring,
  });
  const [name, setName] = useState(item.name);
  const [error, setError] = useState("");

  const handlePermissionChange = useCallback(
    (key: Key) => {
      const [name, value] = (key as string).split("-");
      setPermissions((prev) => ({ ...prev, [name]: value }));
    },
    [permissions]
  );

  const handleFocus = useCallback(() => {
    setError("");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (name.trim() === "") {
      setError("This field is required.");
      return;
    }

    try {
      const { data } = await putRequest({
        url: `${ENDPOINTS.token_item}/${item.id}`,
        data: { name, ...permissions },
      });
      if (data) {
        setIsOpen(false);
        getHistory(
          history.page,
          history.page_size,
          history.order.column,
          history.order.direction
        );
      }
    } catch {
      setAlert((prev) => ({
        ...prev,
        color: "danger",
        title: "",
        description: "Failed to edit key.",
        isVisible: true,
      }));
    }
  }, [permissions, name]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setName(item.name);
    setPermissions({
      llm: item.permission.llm,
      tts: item.permission.tts,
      stt: item.permission.stt,
      history: item.permission.history,
      monitoring: item.permission.monitoring,
    });
  }, [item]);

  return (
    <Drawer radius="none" isOpen={isOpen} onClose={handleClose}>
      <DrawerContent>
        {(onClose) => (
          <Fragment>
            <DrawerHeader>
              <h1 className="font-semibold">Edit API key</h1>
            </DrawerHeader>
            <DrawerBody>
              <Input
                color="primary"
                type="text"
                variant="bordered"
                value={name}
                placeholder="Name"
                onFocus={handleFocus}
                onValueChange={setName}
                classNames={{
                  base: "relative",
                  inputWrapper:
                    "dark:bg-neutral-900 border-1 border-default-300",
                  label: "text-default-500",
                  helperWrapper: "absolute top-full left-0 -mt-0.5",
                }}
                isInvalid={Boolean(error) || Boolean(error)}
                errorMessage={error}
              />
              <p className="text-default-400 text-sm font-semibold mt-4">
                Permissions
              </p>
              <EditKeyPermissions
                defaultKey={`llm-${item.permission.llm}`}
                handleChange={handlePermissionChange}
                title={"Chat bot"}
                tabs={[
                  { key: "llm-disable", title: "Disable" },
                  { key: "llm-enable", title: "Enable" },
                ]}
              />
              <EditKeyPermissions
                defaultKey={`tts-${item.permission.tts}`}
                handleChange={handlePermissionChange}
                title={"Text to speech"}
                tabs={[
                  { key: "tts-disable", title: "Disable" },
                  { key: "tts-enable", title: "Enable" },
                ]}
              />
              <EditKeyPermissions
                defaultKey={`stt-${item.permission.stt}`}
                handleChange={handlePermissionChange}
                title={"Speech to text"}
                tabs={[
                  { key: "stt-disable", title: "Disable" },
                  { key: "stt-enable", title: "Enable" },
                ]}
              />
              <Divider className="my-4" />
              <EditKeyPermissions
                defaultKey={`history-${item.permission.history}`}
                handleChange={handlePermissionChange}
                title={"History"}
                tabs={[
                  { key: "history-disable", title: "Disable" },
                  { key: "history-read", title: "Read" },
                  { key: "history-write", title: "Write" },
                  { key: "history-all", title: "All" },
                ]}
              />
              <EditKeyPermissions
                defaultKey={`monitoring-${item.permission.monitoring}`}
                handleChange={handlePermissionChange}
                title={"Monitoring"}
                tabs={[
                  { key: "monitoring-disable", title: "Disable" },
                  { key: "monitoring-read", title: "Read" },
                  { key: "monitoring-write", title: "Write" },
                  { key: "monitoring-all", title: "All" },
                ]}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Save
              </Button>
            </DrawerFooter>
          </Fragment>
        )}
      </DrawerContent>
    </Drawer>
  );
}
