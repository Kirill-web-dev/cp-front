import { api } from "../axios";
import { API_URL } from "../constants";

class UserApi {
  public async getMe() {
    const { data } = await api.get(`${API_URL}/user/me`);

    return data;
  }

  public async getUsers(userEmail: string) {
    const { data } = await api.get(`${API_URL}/user/users?user-email=${userEmail}`);

    return data;
  }

  public async sendInvite(userEmail: string, taskId: string) {
    return await api.post(`${API_URL}/user/send-invite`, { userEmail, taskId });
  }

  public async acceptInvite(taskId: string, userId: string) {
    return await api.get(`${API_URL}/user/accept-invite/${taskId}/${userId}`);
  }
}

export const userApi = new UserApi();
