"use client";

import { useUserStore } from "@/hooks/user";
import { Spinner } from "@heroui/react";
import { ProfileImage } from "./image";
import { ProfileInfo } from "./info";
import { ProfileCredentials } from "./credentials";
import { Sidebar } from "@/components/navigation/sidebar";
import { Header } from "@/components/navigation/header";
import { useIntlayer } from "next-intlayer";

export function Profile() {
  const content = useIntlayer("profile-content");
  const { user, setUser } = useUserStore();
  return (
    <main className="flex h-svh">
      <Sidebar />
      <div className="flex-1">
        <Header title={content.title.value} />
        <div className="h-[calc(100svh-65px)] bg-white dark:bg-black overflow-y-auto relative">
          {user === null ? (
            <div className="h-full flex items-center justify-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <div className="space-y-12 pt-6">
              <div className="space-y-6">
                <h1 className="text-lg text-center lg:text-left px-4">
                  {content.infromation.title}
                </h1>
                <div className="px-8 space-y-6">
                  <ProfileImage user={user} setUser={setUser} />
                  <ProfileInfo user={user} setUser={setUser} />
                </div>
              </div>
              <div className="space-y-6">
                <h1 className="text-lg text-center lg:text-left px-4">
                  {content.security.title}
                </h1>
                <div className="px-8">
                  <ProfileCredentials user={user} setUser={setUser} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
