import type { AxiosInstance } from "axios";
import axios from "axios";

class APIService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL + "/api",
    });
    this.client.interceptors.response.use(
      (config) => {
        console.info(`received response status: ${config.status} , data: ${config.data}`);
        return config;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.client;
  }
}

export default new APIService();
