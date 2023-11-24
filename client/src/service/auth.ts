interface HttpClient {
  fetch(url: string, options: any): Promise<any>;
}

interface TokenStorage {
  saveToken(token: string): void;
  getToken(): string | null;
  clearToken(): void;
}

interface ApiResponse {
  message?: string;
}

interface AuthResponse extends ApiResponse {
  token: string;
}

interface UserResponse extends ApiResponse {
  username: string;
  name: string;
  email: string;
  phone: string;
}

export default class AuthService {
  private http: HttpClient;
  private tokenStorage: TokenStorage;

  constructor(http: HttpClient, tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(
    username: string,
    password: string,
    name: string,
    email: string,
    phone: string
  ): Promise<AuthResponse> {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        phone,
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

  async me(): Promise<UserResponse> {
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
