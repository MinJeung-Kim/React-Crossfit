interface AuthErrorEventBus {
  notify(error: Error): void;
}

interface FetchOptions {
  method: string;
  headers: Record<string, string>;
  body: string;
}

export default class HttpClient {
  private baseURL: string;
  private authErrorEventBus: AuthErrorEventBus;

  constructor(baseURL: string, authErrorEventBus: AuthErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url: string, options: FetchOptions) { 
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    let data;
    try {
      if (options.method !== "DELETE") {
        data = await res.json();
      }
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : "Something went wrong! 🤪";
      const error = new Error(message);
      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
      }
      throw new Error(message);
    }
    return data;
  }
}
