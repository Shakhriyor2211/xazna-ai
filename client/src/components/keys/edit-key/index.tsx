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
import { getError, putRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, KeyResultsProps, KeyTableProps } from "@/types";
import { useAlertStore } from "@/providers/alert";
import { useIntlayer } from "next-intlayer";

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
  const content = useIntlayer("keys-content");
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
      setError(content.errors.form.name.required.value);
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
    <Drawer size="lg" radius="none" isOpen={isOpen} onClose={handleClose}>
      <DrawerContent>
        {(onClose) => (
          <Fragment>
            <DrawerHeader>
              <h1 className="font-semibold">
                {content.table.dropdown.edit.drawer.title}
              </h1>
            </DrawerHeader>
            <DrawerBody>
              <Input
                color="primary"
                type="text"
                variant="bordered"
                value={name}
                placeholder={
                  content.table.dropdown.edit.drawer.form.name.label.value
                }
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
                {content.table.dropdown.edit.drawer.permissions.title}
              </p>
              <EditKeyPermissions
                defaultKey={`llm-${item.permission.llm}`}
                handleChange={handlePermissionChange}
                title={
                  content.table.dropdown.edit.drawer.permissions.chatbot.title
                    .value
                }
                tabs={[
                  {
                    key: "llm-disable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.chatbot
                        .tabs.disable.value,
                  },
                  {
                    key: "llm-enable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.chatbot
                        .tabs.enable.value,
                  },
                ]}
              />
              <EditKeyPermissions
                defaultKey={`tts-${item.permission.tts}`}
                handleChange={handlePermissionChange}
                title={
                  content.table.dropdown.edit.drawer.permissions.tts.title.value
                }
                tabs={[
                  {
                    key: "tts-disable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.tts.tabs
                        .disable.value,
                  },
                  {
                    key: "tts-enable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.tts.tabs
                        .enable.value,
                  },
                ]}
              />
              <EditKeyPermissions
                defaultKey={`stt-${item.permission.stt}`}
                handleChange={handlePermissionChange}
                title={
                  content.table.dropdown.edit.drawer.permissions.stt.title.value
                }
                tabs={[
                  {
                    key: "stt-disable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.tts.tabs
                        .disable.value,
                  },
                  {
                    key: "stt-enable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.stt.tabs
                        .enable.value,
                  },
                ]}
              />
              <Divider className="my-4" />
              <EditKeyPermissions
                defaultKey={`history-${item.permission.history}`}
                handleChange={handlePermissionChange}
                title={
                  content.table.dropdown.edit.drawer.permissions.history.title
                    .value
                }
                tabs={[
                  {
                    key: "history-disable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.disable.value,
                  },
                  {
                    key: "history-read",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.read.value,
                  },
                  {
                    key: "history-write",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.write.value,
                  },
                  {
                    key: "history-all",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.all.value,
                  },
                ]}
              />
              <EditKeyPermissions
                defaultKey={`monitoring-${item.permission.monitoring}`}
                handleChange={handlePermissionChange}
                title={
                  content.table.dropdown.edit.drawer.permissions.monitoring
                    .title.value
                }
                tabs={[
                  {
                    key: "monitoring-disable",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.disable.value,
                  },
                  {
                    key: "monitoring-read",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.read.value,
                  },
                  {
                    key: "monitoring-write",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.write.value,
                  },
                  {
                    key: "monitoring-all",
                    title:
                      content.table.dropdown.edit.drawer.permissions.history
                        .tabs.all.value,
                  },
                ]}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {content.table.dropdown.edit.drawer.buttons.cancel}
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {content.table.dropdown.edit.drawer.buttons.submit}
              </Button>
            </DrawerFooter>
          </Fragment>
        )}
      </DrawerContent>
    </Drawer>
  );
}
