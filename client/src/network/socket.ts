import socket, { Socket as SocketIOClient } from "socket.io-client";

export default class Socket {
  private io: SocketIOClient;

  constructor(baseURL: string, getAccessToken: () => void) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on("connect_error", (err) => {
      console.log("socket error", err.message);
    });
  }

  onSync(event: string, callback: (message: string) => void) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message: string) => callback(message));
    return () => this.io.off(event);
  }
}
