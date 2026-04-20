import { api } from "../axios";
import { API_URL } from "../constants";

interface CreateTaskBody {
  title: string;
  description: string;
  deadline?: string;
}

class TaskApi {
  public async createTask(body: CreateTaskBody) {
    return await api.post(`${API_URL}/task/create`, body);
  }

  public async getTasks() {
    return await api.get(`${API_URL}/task/findAll`);
  }

  public async toggleIsFav(taskId: string) {
    return await api.get(`${API_URL}/task/toggle-is-fav/${taskId}`);
  }

  public async toggleIsDone(taskId: string) {
    return await api.get(`${API_URL}/task/toggle-is-done/${taskId}`);
  }

  public async delete(taskId: string) {
    return await api.get(`${API_URL}/task/delete/${taskId}`);
  }
}

export const taskApi = new TaskApi();
