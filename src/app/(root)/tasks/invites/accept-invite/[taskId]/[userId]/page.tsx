import { userApi } from "@/lib/api/user.api";
import { notFound, redirect } from "next/navigation";

interface Params {
  taskId: string;
  userId: string;
}

export default async function TaskUserPage({ params }: { params: Promise<Params> }) {
  const { taskId, userId } = await params;

  await userApi.acceptInvite(taskId, userId);

  redirect("/tasks");
}
