import { ParticlesBackground } from "@/components/bg";
import AuthWrapper from "../../components/AuthWrapper";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthWrapper
      backButtonHref="/a/login"
      backButtonText="Уже есть аккаунт?"
      backButtonTitle="Войти"
      description="Присоединяйтесь к <span class='text-black font-bold'>LiveTask</span> и начните управлять проектами вместе с командой без задержек."
      title="Создать аккаунт"
    >
      <RegisterForm />
      <ParticlesBackground />
    </AuthWrapper>
  );
}
