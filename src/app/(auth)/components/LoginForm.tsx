"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { authApi } from "@/lib/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.email("Неверно введена почта, пожалуйста, проверьте введенные данные."),
  password: z.string().min(6, "Пароль должен содержать более 5 символов"),
});

type loginSchemaType = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [isPasswordFieldOpen, setIsPasswordFieldOpen] = useState<boolean>(false);
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: loginSchemaType) => {
    const { data: response } = await authApi.login(data);

    if (!response.success) {
      return toast.error(response.message, { position: "top-center" });
    }

    redirect("/tasks");
  };

  return (
    <form className="flex flex-col gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="email">Почта</FieldLabel>
            <Input {...field} id="email" autoComplete="on" placeholder="example@email.ru" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => {
          return (
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <InputGroup>
                <InputGroupInput {...field} id="password" type={`${isPasswordFieldOpen ? "text" : "password"}`} autoComplete="off" placeholder="******" />
                <InputGroupAddon onClick={() => setIsPasswordFieldOpen((prev) => !prev)} className="cursor-pointer" align="inline-end">
                  {isPasswordFieldOpen ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
      <Button variant={"outline"} className="bg-black text-white">
        Войти
      </Button>
    </form>
  );
}
