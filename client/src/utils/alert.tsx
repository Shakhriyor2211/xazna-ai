"use client";
import { Alert } from "@heroui/alert";
import { useAlertStore } from "../providers/alert";
import { useEffect } from "react";

export default function AlertSnackbar() {
  const { alert, setAlert } = useAlertStore();
  useEffect(() => {
    if (!alert.isVisible) return;
    const timer = setTimeout(() => {
      setAlert((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, 4000);

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="fixed top-4 right-4 z-[200] max-w-96 sm:w-96 sm:max-w-none">
      <Alert
        {...alert}
        onClose={() =>
          setAlert((prev) => ({
            ...prev,
            isVisible: false,
          }))
        }
      />
    </div>
  );
}
