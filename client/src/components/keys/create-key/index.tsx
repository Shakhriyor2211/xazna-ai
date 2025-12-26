import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Divider,
  Input,
} from "@heroui/react";
import { PiPlus } from "react-icons/pi";
import { Fragment, useCallback, useState } from "react";
import { CreateKeyPermissions } from "./tab";
import { Key } from "@react-types/shared";
import { getError, postRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, KeyTableProps } from "@/types";
import { useAlertStore } from "@/providers/alert";
import { useIntlayer } from "next-intlayer";

export function CreateKey({ history, getHistory }: KeyTableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const content = useIntlayer("keys-content");
  const { setAlert } = useAlertStore();
  const [permissions, setPermissions] = useState({
    llm: "disable",
    tts: "disable",
    stt: "disable",
    history: "disable",
    monitoring: "disable",
  });
  const [name, setName] = useState("");
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
      const { data } = await postRequest({
        url: ENDPOINTS.token_generate,
        data: { name, ...permissions },
      });
      if (data) {
        setName("");
        setPermissions({
          llm: "disable",
          tts: "disable",
          stt: "disable",
          history: "disable",
          monitoring: "disable",
        });
        onOpenChange();
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

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<PiPlus className="w-4 h-4 shrink-0" />}
      >
        {content.create.title}
      </Button>
      <Drawer
        size="lg"
        radius="none"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <Fragment>
              <DrawerHeader>
                <h1 className="font-semibold">{content.create.drawer.title}</h1>
              </DrawerHeader>
              <DrawerBody>
                <Input
                  color="primary"
                  type="text"
                  variant="bordered"
                  value={name}
                  placeholder={content.create.drawer.form.name.label.value}
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
                  {content.create.drawer.permissions.title}
                </p>
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={content.create.drawer.permissions.chatbot.title.value}
                  tabs={[
                    {
                      key: "llm-disable",
                      title:
                        content.create.drawer.permissions.chatbot.tabs.disable
                          .value,
                    },
                    {
                      key: "llm-enable",
                      title:
                        content.create.drawer.permissions.chatbot.tabs.enable
                          .value,
                    },
                  ]}
                />
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={content.create.drawer.permissions.tts.title.value}
                  tabs={[
                    {
                      key: "tts-disable",
                      title:
                        content.create.drawer.permissions.tts.tabs.disable
                          .value,
                    },
                    {
                      key: "tts-enable",
                      title:
                        content.create.drawer.permissions.tts.tabs.enable.value,
                    },
                  ]}
                />
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={content.create.drawer.permissions.stt.title.value}
                  tabs={[
                    {
                      key: "stt-disable",
                      title:
                        content.create.drawer.permissions.stt.tabs.disable
                          .value,
                    },
                    {
                      key: "stt-enable",
                      title:
                        content.create.drawer.permissions.stt.tabs.enable.value,
                    },
                  ]}
                />
                <Divider className="my-4" />
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={content.create.drawer.permissions.history.title.value}
                  tabs={[
                    {
                      key: "history-disable",
                      title:
                        content.create.drawer.permissions.history.tabs.disable
                          .value,
                    },
                    {
                      key: "history-read",
                      title:
                        content.create.drawer.permissions.history.tabs.read
                          .value,
                    },
                    {
                      key: "history-write",
                      title:
                        content.create.drawer.permissions.history.tabs.write
                          .value,
                    },
                    {
                      key: "history-all",
                      title:
                        content.create.drawer.permissions.history.tabs.all
                          .value,
                    },
                  ]}
                />
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={
                    content.create.drawer.permissions.monitoring.title.value
                  }
                  tabs={[
                    {
                      key: "monitoring-disable",
                      title:
                        content.create.drawer.permissions.history.tabs.disable
                          .value,
                    },
                    {
                      key: "monitoring-read",
                      title:
                        content.create.drawer.permissions.history.tabs.read
                          .value,
                    },
                    {
                      key: "monitoring-write",
                      title:
                        content.create.drawer.permissions.history.tabs.write
                          .value,
                    },
                    {
                      key: "monitoring-all",
                      title:
                        content.create.drawer.permissions.history.tabs.all
                          .value,
                    },
                  ]}
                />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {content.create.drawer.buttons.cancel}
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {content.create.drawer.buttons.submit}
                </Button>
              </DrawerFooter>
            </Fragment>
          )}
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
