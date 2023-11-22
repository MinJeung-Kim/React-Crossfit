export default class Auth {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async auth(params) {
    return params?.name ? this.#register(params) : this.#login(params);
  }

  // async auth(account) {
  //   return account && this.#login(account);
  // }

  async #login({ email, password }) {
    return this.apiClient
      .login({
        email,
        password,
      }) //
      .then((res) => { 
        const users = res.data.user;
        // const user = users.find((user) => user.email === email);
        // if (!user || user.password !== password) {
        //   return false;
        //   // throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
        // }
        // const { password: _, ...rest } = users;
        return {
          ...users,
          accessToken: res.data.accessToken,
          status: res.status,
        };
      });
  }

  async #register({ name, email, password }) { 
    return this.apiClient
      .register({ name, email, password }) //
      .then((res) => {
        // const users = res.data.user;

        // const { password: _, ...rest } = users;
        // return { ...rest, accessToken: res.data.accessToken };
        return res.status;
      });
  }

  async #logout() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
