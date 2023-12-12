type HttpClient = {
  fetch(url: string, options: any): Promise<any>;
};

type TokenStorage = {
  saveToken(token: string): void;
  getToken(): string | null;
  clearToken(): void;
};

export type AuthResponse = {
  username: string;
  token: string;
  message?: string;
};

export type UserResponse = {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  gender: "M" | "F";
  birthDay: string;
  membership: "1" | "3";
  lockerYn: "Y" | "N";
  locker: "1" | "3";
  price: number;
  startDate: string;
  endDate: string;
  userAgmtYn: "Y";
};

export default class AuthService {
  private http: HttpClient;
  private tokenStorage: TokenStorage;

  constructor(http: HttpClient, tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(user: UserResponse): Promise<AuthResponse> {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        ...user,
      }),
    });

    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    this.tokenStorage.saveToken(data.token);

    return data;
  }

  async me(): Promise<AuthResponse> {
    const token = this.tokenStorage.getToken();
    return this.http.fetch("/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout(): Promise<void> {
    this.tokenStorage.clearToken();
  }
}
