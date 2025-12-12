import { AlertProps } from "@/types";
import { create } from "zustand";

interface AlertStoreProps {
  alert: AlertProps;
  setAlert: (payload: AlertProps | ((prev: AlertProps) => AlertProps)) => void;
}

export const useAlertStore = create<AlertStoreProps>((set) => ({
  alert: {
    isVisible: false,
    title: "",
    description: "Alert description",
    color: "success",
    variant: "flat",
  },
  setAlert: (payload) =>
    set((state) => ({
      alert: typeof payload === "function" ? payload(state.alert) : payload,
    })),
}));
