"use client";

import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import { taskApi } from "@/lib/api/task.api";
import { Task, User } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Check, Heart, Pen, Trash } from "lucide-react";
import { useUser } from "@/lib/hooks/use-user";
import FindUsers from "./components/FindUsers";

export default function TasksPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    const { data } = await taskApi.getTasks();
    setTasks(data);
  };

  const addTaskToList = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleIsFav = (taskId: string) => {
    taskApi.toggleIsFav(taskId);
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFav: !task.isFav };
        }
        return task;
      });
    });
  };

  const toggleIsDone = (taskId: string) => {
    taskApi.toggleIsDone(taskId);
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
    });
  };

  const deleteTask = (taskId: string) => {
    taskApi.delete(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    setLoading(true);
    try {
      getTasks();
    } catch {
      console.log("Error while fetching tasks");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl shadow-2xl h-full dark:bg-accent relative transition-all duration-300 py-8 px-5 flex items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (!tasks) {
    return;
  }

  console.log(tasks);

  return (
    <div className="rounded-2xl shadow-2xl h-full dark:bg-accent relative transition-all duration-300 py-8 px-5">
      <div className="w-full h-full grid grid-cols-4 grid-rows-5 gap-y-5 gap-x-4">
        {tasks
          .sort((a, b) => {
            if (a.isFav && !b.isFav) return -1;
            if (!a.isFav && b.isFav) return 1;
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          })
          .map((task) => (
            <Sheet key={task.id}>
              <SheetTrigger asChild>
                <div className="relative rounded-lg shadow-sm cursor-pointer flex items-center justify-center">
                  <h1>{task.title}</h1>
                  <div className="absolute right-1 bottom-1 flex gap-x-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      variant={"outline"}
                      size={"icon"}
                    >
                      <Trash />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleIsFav(task.id);
                      }}
                      variant={"destructive"}
                      size={"icon"}
                    >
                      <Heart fill={`${task.isFav ? "red" : "none"}`} />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleIsDone(task.id);
                      }}
                      variant={"outline"}
                      size={"icon"}
                      className={`${task.isDone ? "bg-green-500" : "bg-green-500/10"}`}
                    >
                      <Check color={`${task.isDone ? "white" : "green"}`} />
                    </Button>
                  </div>
                  <h1 className="text-xs text-gray-400 absolute left-1 bottom-1">
                    Задача добавлена <br /> пользователем {task.author ? task.author.name : user!.name} <br />
                    <span>Создана: {format(task.createdAt, "dd LLL hh:mm", { locale: ru })}</span>
                  </h1>
                </div>
              </SheetTrigger>
              <SheetContent className="py-12 px-8 max-w-full overflow-y-scroll">
                <SheetTitle className="text-center">{task.title}</SheetTitle>
                <h1 className="text-xs text-gray-500 text-end">Задачу необходимо выполнить до {format(task.deadline, "dd LLLL", { locale: ru })}</h1>
                <div className="custom-thumb overflow-x-hidden h-48">
                  <SheetDescription className="whitespace-pre-line wrap-break-word">{task.description}</SheetDescription>
                </div>
                <h1>Так же над задачей работают: </h1>
                <div className="absolute bottom-6 right-1 flex gap-x-3">
                  <FindUsers taskId={task.id} />
                  <Button size={"icon"} asChild className="p-2">
                    <Pen className="size-4" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ))}
      </div>
      <CreateTask onTaskCreated={addTaskToList} />
    </div>
  );
}
