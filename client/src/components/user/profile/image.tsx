import { useAlertStore } from "@/providers/alert";
import { ENDPOINTS } from "@/shared/site";
import { AxiosErrorProps, UserProps, UserStoreProps } from "@/types";
import { deleteRequest, getError, postRequest } from "@/utils/axios-instance";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useIntlayer } from "next-intlayer";
import { ChangeEvent, Fragment, useCallback, useRef, useState } from "react";
import { MdAdd, MdOutlineEdit } from "react-icons/md";
import { PiTrash } from "react-icons/pi";

export function ProfileImage({ user, setUser }: UserStoreProps) {
  const content = useIntlayer("profile-content");
  const [image, setImage] = useState<File | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { setAlert } = useAlertStore();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChangeOpen = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setImage(event.target.files?.[0] ?? null);
    },
    []
  );

  const handleChangeClose = useCallback(() => {
    setImage(null);
    if (formRef.current) formRef.current.reset();
  }, [image, formRef]);

  const handleDeleteOpen = useCallback(() => {
    setDeleteOpen(true);
  }, [deleteOpen]);

  const handleDeleteClose = useCallback(() => {
    setDeleteOpen(false);
  }, [deleteOpen]);

  const handleImageSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      if (image) formData.append("portrait", image);

      const { data } = await postRequest({
        url: ENDPOINTS.change_account_image,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data) {
        setUser((prev: UserProps | null) =>
          prev !== null
            ? {
                ...prev,
                picture: { portrait: data.portrait ?? null },
              }
            : prev
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
    } finally {
      if (formRef.current) formRef.current.reset();
      setImage(null);
    }
  }, [image, formRef]);

  const handleImageDelete = useCallback(async () => {
    try {
      const { data } = await deleteRequest({
        url: ENDPOINTS.change_account_image,
      });

      if (data) {
        setUser((prev: UserProps | null) =>
          prev !== null ? { ...prev, picture: { portrait: null } } : prev
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
    } finally {
      if (formRef.current) formRef.current.reset();
      setDeleteOpen(false);
    }
  }, [formRef, deleteOpen]);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <Avatar
          className={
            user?.picture.portrait !== null
              ? "shrink-0 bg-transparent"
              : "shrink-0"
          }
          color={user?.picture.portrait !== null ? "primary" : "default"}
          isBordered
          src={user?.picture.portrait ?? ""}
          showFallback
          size="lg"
        />
        <form className="flex-1 flex flex-col sm:flex-row gap-2" ref={formRef}>
          {user?.picture.portrait !== null ? (
            <Button
              as="label"
              htmlFor="image-upload"
              size="sm"
              className="bg-zinc-800 text-white"
              startContent={<MdOutlineEdit className="w-4 h-4" />}
            >
              {content.infromation.form.image.change}
            </Button>
          ) : (
            <Button
              as="label"
              htmlFor="image-upload"
              size="sm"
              className="bg-zinc-800 text-white"
              startContent={<MdAdd className="w-4 h-4" />}
            >
              {content.infromation.form.image.add}
            </Button>
          )}
          {user?.picture.portrait !== null ? (
            <Button
              color="danger"
              onPress={handleDeleteOpen}
              size="sm"
              startContent={<PiTrash className="w-4 h-4" />}
            >
              {content.infromation.form.image.remove.title}
            </Button>
          ) : null}

          <input
            id="image-upload"
            onChange={handleChangeOpen}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </form>
        <Modal
          onKeyDown={(event) => {
            if (event.key === "Enter") handleImageSubmit();
          }}
          isOpen={image !== null}
          onClose={handleChangeClose}
        >
          <ModalContent>
            {(onClose) => (
              <Fragment>
                <ModalHeader className="flex flex-col gap-1">
                  {content.infromation.form.image.preview.modal.title}
                </ModalHeader>
                <ModalBody>
                  <Avatar
                    isBordered
                    color="primary"
                    src={image ? URL.createObjectURL(image) : ""}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover mx-auto bg-transparent"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    {
                      content.infromation.form.image.preview.modal.buttons
                        .cancel
                    }
                  </Button>
                  <Button onPress={handleImageSubmit} color="primary">
                    {
                      content.infromation.form.image.preview.modal.buttons
                        .submit
                    }
                  </Button>
                </ModalFooter>
              </Fragment>
            )}
          </ModalContent>
        </Modal>
        <Modal isOpen={deleteOpen} onClose={handleDeleteClose}>
          <ModalContent>
            {(onClose) => (
              <Fragment>
                <ModalHeader className="flex flex-col gap-1">
                  {content.infromation.form.image.remove.modal.title}
                </ModalHeader>
                <ModalBody>
                  <p className="text-sm">
                    {content.infromation.form.image.remove.modal.description}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    {content.infromation.form.image.remove.modal.buttons.cancel}
                  </Button>
                  <Button color="primary" onPress={handleImageDelete}>
                    {content.infromation.form.image.remove.modal.buttons.submit}
                  </Button>
                </ModalFooter>
              </Fragment>
            )}
          </ModalContent>
        </Modal>
      </div>
      <p className="text-xs text-foreground-500">
        {content.infromation.form.image.description}
      </p>
    </div>
  );
}
