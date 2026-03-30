import { ParticlesBackground } from "@/components/bg";
import AuthWrapper from "../../components/AuthWrapper";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthWrapper
      backButtonHref="/a/login"
      backButtonText="Уже есть аккаунт?"
      backButtonTitle="Войти"
      description="Присоединяйтесь к <span class='text-primary font-bold'>Live</span><span class='text-emerald-500'>Task</span> и начните управлять проектами вместе с командой без задержек."
      title="Создать аккаунт"
    >
      <RegisterForm />
      <ParticlesBackground />
    </AuthWrapper>
  );
}
