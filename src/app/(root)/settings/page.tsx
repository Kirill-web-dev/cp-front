"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/lib/hooks/use-user";

export default function SettingsPage() {
  const { user, loading } = useUser();

  if (!user) {
    return;
  }

  if (loading) {
    return (
      <div className="rounded-2xl shadow-2xl h-full dark:bg-accent relative transition-all duration-300 py-8 px-5 flex items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-2xl h-full dark:bg-accent relative transition-all duration-300 py-8 px-5">
      <div className="">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
