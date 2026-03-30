import { ParticlesBackground } from "@/components/bg";
import AuthWrapper from "../../components/AuthWrapper";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthWrapper
      backButtonHref="/a/register"
      backButtonText="Еще нет аккаунта?"
      backButtonTitle="Создать"
      description="Войдите в свой аккаунт, чтобы продолжить работу над задачами."
      title="С возвращением!"
    >
      <LoginForm />
      <ParticlesBackground />
    </AuthWrapper>
  );
}
