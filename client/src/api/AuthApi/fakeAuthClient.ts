import axios from "axios";

type Login = {
  email: string;
  password: string;
};

type Register = {
  name: string;
  email: string;
  password: string;
};

export default class fakeAuthClient {
  async login(account: Login) {
    return axios.post("http://localhost:8000/login", account);
  }

  async register(inputs: Register) {
    return axios.post("http://localhost:8000/users", inputs);
  }
}
