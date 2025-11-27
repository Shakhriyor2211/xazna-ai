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
import { postRequest } from "@/utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";
import { KeyTableProps } from "@/types";
import { useAlertStore } from "@/providers/alert";

export function CreateKey({ history, getHistory }: KeyTableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
      const [name, value] = JSON.stringify(key).split("-");
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
      const { data } = await postRequest({
        url: ENDPOINTS.key_generate,
        data: { name, ...permissions },
      });
      if (data) {
        onOpenChange();
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
        description: "Failed to create key.",
        isVisible: true,
      }));
    } finally {
      setName("");
      setPermissions({
        llm: "disable",
        tts: "disable",
        stt: "disable",
        history: "disable",
        monitoring: "disable",
      });
    }
  }, [permissions, name]);

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<PiPlus className="w-4 h-4" />}
      >
        Create key
      </Button>
      <Drawer radius="none" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <Fragment>
              <DrawerHeader>
                <h1 className="font-semibold">Create API key</h1>
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
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={"Chat bot"}
                  tabs={[
                    { key: "llm-disable", title: "Disable" },
                    { key: "llm-enable", title: "Enable" },
                  ]}
                />
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={"Text to speech"}
                  tabs={[
                    { key: "tts-disable", title: "Disable" },
                    { key: "tts-enable", title: "Enable" },
                  ]}
                />
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={"Speech to text"}
                  tabs={[
                    { key: "stt-disable", title: "Disable" },
                    { key: "stt-enable", title: "Enable" },
                  ]}
                />
                <Divider className="my-4" />
                <CreateKeyPermissions
                  handleChange={handlePermissionChange}
                  title={"History"}
                  tabs={[
                    { key: "history-disable", title: "Disable" },
                    { key: "history-read", title: "Read" },
                    { key: "history-write", title: "Write" },
                    { key: "history-all", title: "All" },
                  ]}
                />
                <CreateKeyPermissions
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
                  Create
                </Button>
              </DrawerFooter>
            </Fragment>
          )}
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
