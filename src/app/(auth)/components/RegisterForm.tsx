"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { authApi } from "@/lib/api/auth.api";
import { redirect } from "next/navigation";

const registerFormSchema = z.object({
  name: z.string("Поле обязательно к заполнению").min(1, "Поле обязательно к заполнению"),
  email: z.email("Неверно введена почта, пожалуйста, проверьте введенные данные."),
  password: z.string().min(6, "Пароль должен содержать более 5 символов"),
});

type registerSchemaType = z.infer<typeof registerFormSchema>;

const colors = ["bg-gray-200", "bg-green-500", "bg-orange-500", "bg-red-500", "bg-red-500"];

export default function RegisterForm() {
  const [step, setStep] = useState<number>(1);
  const [OTP, setOTP] = useState<string>();
  const [isPasswordFieldOpen, setIsPasswordFieldOpen] = useState<boolean>(false);
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[0-9]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
    if (/[A-Z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const onSubmit = (data: registerSchemaType) => {
    authApi.register(data);
    setStep(2);
  };

  const onSubmitOTP = async () => {
    const response = await authApi.verifyAccount(OTP!);
    if (response.error) {
      return 0;
    } else {
      setTimeout(() => {
        redirect("/");
      }, 3000);
    }
  };

  return (
    <>
      {step === 1 && (
        <form className="flex flex-col gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">Имя</FieldLabel>
                <Input {...field} id="name" autoComplete="on" placeholder="Иван Иванов" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
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
              const strength = getPasswordStrength(field.value as string);

              return (
                <Field>
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <div className="flex gap-1 mt-2 h-1.5">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-full w-full rounded-full transition-colors duration-300 ${strength >= step ? colors[strength] : "bg-gray-200 dark:bg-gray-800"}`}
                      />
                    ))}
                  </div>
                  <InputGroup>
                    <InputGroupInput {...field} id="password" type={`${isPasswordFieldOpen ? "text" : "password"}`} autoComplete="off" placeholder="******" />
                    <InputGroupAddon onClick={() => setIsPasswordFieldOpen((prev) => !prev)} className="cursor-pointer" align="inline-end">
                      {isPasswordFieldOpen ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-xs text-gray-400 italic">
                    Для повышения сложности пароля используйте следующие пункты
                    <br />* <span className={cn(field.value.length >= 6 && "text-emerald-300")}>Используйте &ge; 6 символов</span>
                    <br />* <span className={cn(field.value.match(/[A-Z]/) && "text-emerald-300")}>Используйте заглавные буквы</span>
                    <br />* <span className={cn(field.value.match(/[0-9!@#$%^&*(),.?":{}|<>]/) && "text-emerald-300")}>Используйте цифры и спец. символы</span>
                  </p>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              );
            }}
          />
          <Button variant={"outline"} className="bg-black text-white">
            Продолжить
          </Button>
        </form>
      )}
      {step === 2 && (
        <div className="flex gap-y-3 flex-col items-center">
          <p className="text-xs text-gray-400">
            На почту <span className="text-black font-bold">{form.getValues("email")}</span> был отправлен шестизначный код для подтверждения почты, пожалуйста введите его.
          </p>
          <InputOTP value={OTP} onChange={(value) => setOTP(value)} pattern={REGEXP_ONLY_DIGITS} maxLength={6} id="otp-verification" required>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={onSubmitOTP} className="w-full" variant={"outline"}>
            Создать аккаунт
          </Button>
        </div>
      )}
    </>
  );
}
