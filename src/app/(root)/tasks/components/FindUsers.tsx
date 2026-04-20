"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userApi } from "@/lib/api/user.api";
import { User } from "@/lib/types";
import { Send, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

interface FindUsersProps {
  taskId: string;
}

export default function FindUsers({ taskId }: FindUsersProps) {
  const [usersToInvite, setUsersToInvite] = useState<User[]>([]);
  const [usersToInviteSearch, setUsersToInviteSearch] = useState<string>("");

  const getUsersToInvite = async () => {
    const data = await userApi.getUsers(usersToInviteSearch);
    setUsersToInvite(data);
  };

  const sendInvite = async (userEmail: string) => {
    await userApi.sendInvite(userEmail, taskId);
  };

  useEffect(() => {
    getUsersToInvite();
  }, [usersToInviteSearch]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"} asChild className="p-2">
          <UserPlus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Добавить пользователя</DialogTitle>
        <Label>Начните вводить почту пользователя для совместного отслеживания задачи</Label>
        <Input value={usersToInviteSearch} onChange={(e) => setUsersToInviteSearch(e.currentTarget.value)} />
        <div className="w-full border border-gray-200" />
        <div className="max-h-60 overflow-y-scroll custom-thumb flex flex-col gap-y-3">
          {usersToInvite.length > 0 ? (
            usersToInvite.map((user) => (
              <div className="border border-gray-200 rounded-lg w-full flex items-center justify-between p-2" key={user.id}>
                <div className="flex items-center gap-x-2">
                  <Avatar>
                    <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
                <Button onClick={() => sendInvite(user.email)} variant={"outline"} size={"icon"}>
                  <Send />
                </Button>
              </div>
            ))
          ) : (
            <h1 className="text-gray-500">Не найдено</h1>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
