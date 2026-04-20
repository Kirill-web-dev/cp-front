"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authApi } from "@/lib/api/auth.api";
import { userApi } from "@/lib/api/user.api";
import { useUser } from "@/lib/hooks/use-user";
import { User } from "@/lib/types";
import { ArrowRight, Book, LogOut, Settings, User2, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
  {
    icon: <Book />,
    href: "/tasks",
    lable: "Задачи",
  },
  {
    icon: <Users />,
    href: "/teams",
    lable: "Команды",
  },
  {
    icon: <User2 />,
    href: "/friends",
    lable: "Друзья",
  },
  {
    icon: <Settings />,
    href: "/settings",
    lable: "Настройки",
  },
];

export default function Sidebar() {
  const { user } = useUser();
  const [isSidebarFull, setIsSidebarFull] = useState(false);

  const logoutUser = async () => {
    await authApi.logout();
    redirect("/a/login");
  };

  if (!user) {
    return;
  }

  return (
    <aside className={`${isSidebarFull ? "w-14" : "w-45"} py-10 relative rounded-2xl shadow-2xl transition-normal duration-300 h-full dark:bg-accent`}>
      <ArrowRight
        className={`${isSidebarFull ? "rotate-0" : "rotate-180"} absolute bottom-2 right-4 cursor-pointer transition-all duration-300 `}
        onClick={() => setIsSidebarFull((prev) => !prev)}
      />
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center justify-center">
          <Avatar className={`${isSidebarFull ? "size-8" : "size-12"}`}>
            <AvatarImage />
            <AvatarFallback className={`font-medium ${isSidebarFull ? "text-sm" : "text-xl"}`}>{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          {!isSidebarFull && <p>{user.name}</p>}
        </div>
        <div className="flex flex-col gap-y-12">
          {links.map((link) => (
            <Fragment key={link.href}>
              {!isSidebarFull ? (
                <Button variant={"secondary"} asChild>
                  <Link href={link.href} className="flex justify-start">
                    {link.icon}
                    {link.lable}
                  </Link>
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={"secondary"} asChild>
                      <Link href={link.href} className="flex justify-start">
                        {link.icon}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{link.lable}</TooltipContent>
                </Tooltip>
              )}
            </Fragment>
          ))}
        </div>
        <div className="flex flex-col items-center gap-y-3">
          <ThemeSwitcher classname="cursor-pointer" />
          <Button onClick={logoutUser} variant={"destructive"}>
            <LogOut />
            {!isSidebarFull && "Выйти"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
