export type ScheduleType = {
  id: number;
  rezTime: string;
  rezDate: string;
  week: string;
  note: string;
  name: string;
  username: string;
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

  async getSchedules(username?: string) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/schedules${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postSchedule(
    rezDate: Date,
    rezTime: string,
    week: string,
    note: string
  ) {
    return this.http.fetch(`/schedules`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        rezDate,
        rezTime,
        week,
        note,
        username: "roxie",
        name: "Roxie",
      }),
    });
  }

  async deleteSchedule(scheduleId: string) {
    return this.http.fetch(`/schedules/${scheduleId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateSchedule(
    scheduleId: string,
    rezDate: Date,
    rezTime: string,
    week: string,
    note: string
  ) {
    return this.http.fetch(`/schedules/${scheduleId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({
        rezDate,
        rezTime,
        week,
        note,
      }),
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
