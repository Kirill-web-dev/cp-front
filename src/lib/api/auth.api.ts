import { toast } from "sonner";
import { api } from "../axios";
import { API_URL } from "../constants";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

class AuthApi {
  public async register(body: RegisterForm) {
    return await api.post(`${API_URL}/auth/register`, body);
  }

  public async login(body: LoginForm) {
    return await api.post(`${API_URL}/auth/login`, body);
  }

  public async logout() {
    return await api.get(`${API_URL}/auth/logout`);
  }

  public async verifyAccount(code: string) {
    const { data } = await api.post(`${API_URL}/user/otp-confirmation?code=${code}`);
    if (data.error) {
      toast.error("Ошибка подтверждения.", {
        description: data.message,
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.success("Успешное подтверждение.", {
        description: "Почта успешно подтверждения через пару секунд вы будете перенаправлены на главную страницу",
        duration: 3000,
        position: "top-center",
      });
    }

    return data;
  }
}

export const authApi = new AuthApi();
