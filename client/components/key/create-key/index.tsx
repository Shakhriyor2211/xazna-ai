import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Divider,
} from "@heroui/react";
import { PiPlus } from "react-icons/pi";
import { Fragment } from "react";
import { CreateKeyPermissions } from "./tab";

export function CreateKey() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<PiPlus className="w-4 h-4" />}
      >
        Create key
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>
                <h1 className="font-semibold">Create API key</h1>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-default-400 text-sm font-semibold">
                  Permissions
                </p>
                <CreateKeyPermissions
                  title={"Chat bot"}
                  tabs={[
                    { key: "disable", title: "Disable" },
                    { key: "enable", title: "Enable" },
                  ]}
                />
                <CreateKeyPermissions
                  title={"Text to speech"}
                  tabs={[
                    { key: "disable", title: "Disable" },
                    { key: "enable", title: "Enable" },
                  ]}
                />
                <CreateKeyPermissions
                  title={"Speech to text"}
                  tabs={[
                    { key: "disable", title: "Disable" },
                    { key: "enable", title: "Enable" },
                  ]}
                />
                <Divider className="my-4" />
                <CreateKeyPermissions
                  title={"History"}
                  tabs={[
                    { key: "disable", title: "Disable" },
                    { key: "read", title: "Read" },
                    { key: "write", title: "Write" },
                  ]}
                />
                <CreateKeyPermissions
                  title={"Monitoring"}
                  tabs={[
                    { key: "disable", title: "Disable" },
                    { key: "read", title: "Read" },
                    { key: "write", title: "Write" },
                  ]}
                />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
