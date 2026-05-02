"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar1, Pen } from "lucide-react";
import { useState } from "react";
import { ru } from "date-fns/locale";
import { taskApi } from "@/lib/api/task.api";
import { Task } from "@/lib/types";

import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false });

interface CreateTaskProps {
  onTaskCreated: (task: Task) => void;
}

export default function CreateTask({ onTaskCreated }: CreateTaskProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    if (!title && !description) return;
    setOpen(false);

    const { data } = await taskApi.createTask({ title, description, deadline: deadline ? deadline.toISOString() : undefined });
    onTaskCreated(data);

    setTitle("");
    setDescription("");
    location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <div className=" absolute bottom-8 right-5 bg-primary flex items-center justify-center cursor-pointer text-white rounded-full size-8 p-2">
            <Pen />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Добавить новую задачу</DialogTitle>
            <DialogDescription>Создайте новую задачу, отслеживайте её и добавляйте друзей для совместного отслеживания задачи</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Заголовок</Label>
              <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)} id="title" className="ring-none outline-none" />
            </Field>
            <Field>
              <Label htmlFor="description">Описание</Label>
              <MarkdownEditor value={description} onChange={setDescription} preview="live" />
            </Field>
          </FieldGroup>
          <div>
            <p className="text-xs inline-block">Выбрать дату дедлайна (по умолчанию дедлайна - нет)</p>
            <Button onClick={() => setIsCalendarOpen((prev) => !prev)} variant={"outline"} size={"icon"} className="mt-2">
              <Calendar1 />
            </Button>
          </div>
          {isCalendarOpen && (
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              className="rounded-lg border w-full"
              locale={ru}
              modifiersClassNames={{
                today: "size-8! bg-gray-200 rounded-lg",
              }}
              classNames={{
                day: "size-8",
                week: "flex flex-row justify-between mt-2",
              }}
            />
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DialogClose>
            <Button onClick={onSubmit} type="submit">
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
