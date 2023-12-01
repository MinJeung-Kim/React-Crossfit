
export type Members = {
    id:number;
    username:string;
    name:string;
    email:string;
    phone:string;
  }

interface HttpClient {
    fetch(url: string, options: any): Promise<any>;
  }
  
  interface TokenStorage {
    saveToken(token: string): void;
    getToken(): string | null;
    clearToken(): void;
  }
  
  export default class MemberService {
    private http: HttpClient;
    private tokenStorage: TokenStorage;
    constructor(http: HttpClient, tokenStorage: TokenStorage) {
      this.http = http;
      this.tokenStorage = tokenStorage;
    }

    async getMembers(username?: string) {
        const query = username ? `?username=${username}` : "";
        return this.http.fetch(`/members${query}`, {
          method: "GET",
          headers: this.getHeaders(),
        });
      }
    
      async postMember(
        rezDate: Date,
        rezTime: string,
        week: string,
        note: string
      ) {
        return this.http.fetch(`/members`, {
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
    
      async deleteMember(MemberId: string) {
        return this.http.fetch(`/members/${MemberId}`, {
          method: "DELETE",
          headers: this.getHeaders(),
        });
      }
    
      async updateMember(
        MemberId: string,
        rezDate: Date,
        rezTime: string,
        week: string,
        note: string
      ) {
        return this.http.fetch(`/members/${MemberId}`, {
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