export type ScheduleType = {
  id: number;
  time: string;
  insDt: Date;
  week: string;
  userName: string;
};
interface HttpClient {
  fetch(url: string, options: any): Promise<any>;
}

interface TokenStorage {
  saveToken(token: string): void;
  getToken(): string | null;
  clearToken(): void;
}

export default class ScheduleService {
  private http: HttpClient;
  private tokenStorage: TokenStorage;
  constructor(http: HttpClient, tokenStorage: TokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getSchedules(username: string) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/schedules${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postSchedule(text: string) {
    return this.http.fetch(`/schedules`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: "ellie", name: "Ellie" }),
    });
  }

  async deleteSchedule(tweetId: string) {
    return this.http.fetch(`/schedules/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateSchedule(tweetId: string, text: string) {
    return this.http.fetch(`/schedules/${tweetId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

// export async function getSchedule() {
//   const response = await axiosPrivate.get<ScheduleType[]>("/scheduler");

//   return response.data;
// }

// export async function postSchedule(data: {
//   time: string;
//   insDt: Date;
//   week:string;
//   userName: string;
// }) {
//   const response = await axiosPrivate.post<ScheduleType[]>("/scheduler", data);

//   return response.data;
// }
