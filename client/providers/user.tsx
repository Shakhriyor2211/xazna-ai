"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { getRequest } from "../utils/axios-instance";
import { ENDPOINTS } from "@/shared/site";

export const UserContext = createContext<any>(null);

export interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "superadmin" | "user";
  is_blocked: boolean;
  is_active: boolean;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const getUser = useCallback(async () => {
    try {
      const res = await getRequest({ url: ENDPOINTS.profile });
      setUser(res.data);
    } catch {
    } finally {
      setIsLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoaded, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
