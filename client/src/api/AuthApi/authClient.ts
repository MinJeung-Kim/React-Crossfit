import axios, { AxiosInstance } from "axios";

type User = {
  email: string;
  password: string;
  name: string;
  id: number;
};

type Register = {
  name: string;
  email: string;
  password: string;
};

export default class AuthClient {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL,
    });
  }

  async login(params: Record<string, User>): Promise<any> {
    return this.httpClient.get("/login", { params });
  }

  async logout(params: Record<string, User>): Promise<any> {
    return this.httpClient.get("/logout", { params });
  }

  async register(params: Record<string, Register>): Promise<any> {
    return this.httpClient.get("/users", { params });
  }
}
