"use client";

import { useUserStore } from "@/hooks/user";
import { Layout } from "@/providers/layout";
import { Spinner } from "@heroui/react";
import { ProfileImage } from "./image";
import { ProfileInfo } from "./info";
import { ProfileCredentials } from "./credentials";

export function Profile() {
  const { user, setUser } = useUserStore();
  return (
    <Layout title="Information">
      <div className="relative h-full">
        {user === null ? (
          <div className="h-full flex items-center justify-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <div className="space-y-12">
            <div className="space-y-6 px-8 pt-6">
              <ProfileImage user={user} setUser={setUser} />
              <ProfileInfo user={user} setUser={setUser} />
            </div>
            <div className="space-y-6">
              <h1 className="font-semibold text-xl text-center lg:text-left px-4 pb-4 border-b border-default-300">
                Security
              </h1>
              <div className="px-8">
                <ProfileCredentials user={user} setUser={setUser} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
