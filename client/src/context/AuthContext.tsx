import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthService, { AuthResponse, UserResponse } from "service/auth";

export type User = { [key: string]: string } | undefined;
export type authMsg = {
  status: "warn" | "info";
  message: string;
};

// type UserResponse = {
//   username: string;
//   email: string;
// };

type State = {
  authMsg: authMsg;
  setAuthMsg: React.Dispatch<React.SetStateAction<authMsg>>;
  authInfo: AuthResponse | undefined;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthResponse| undefined>>;
  logout: () => void;
  signUp: (user: UserResponse) => Promise<void>;
  logIn: (username: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<State>({} as State);

export function AuthProvider({
  authService,
  authErrorEventBus,
  children,
}: {
  authService: AuthService;
  authErrorEventBus: AuthErrorEventBus;
  children: React.ReactNode;
}) {
  const [authMsg, setAuthMsg] = useState<authMsg>({
    status: "warn",
    message: "",
  });
  const [authInfo, setAuthInfo] = useState<AuthResponse| undefined>(undefined);

  useEffect(() => {
    authErrorEventBus.listen((err: any) => {
      setAuthInfo(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService
      .me()
      .then((userResponse: AuthResponse) => setAuthInfo({ ...userResponse }))
      .catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (user: UserResponse): Promise<void> =>
      authService.signup(user).then((user) => {
        setAuthMsg({
          ...authMsg,
          status: "info",
          message: user.message ?? "",
        });
        setAuthInfo({ ...user });
      }),
    [authService]
  );

  const logIn = useCallback(
    async (username: string, password: string): Promise<void> =>
      authService.login(username, password).then((user) => {
        console.log('login : ',user);
        setAuthInfo({ ...user });
      }),
    [authService]
  );

  const logout = useCallback(
    async () =>
      authService.logout().then(() => {
        setAuthInfo(undefined);
      }),
    [authService]
  );

  return (
    <AuthContext.Provider
      value={{
        authMsg,
        setAuthMsg,
        authInfo,
        setAuthInfo,
        logout,
        signUp,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  private callback: ((error: any) => void) | undefined;

  listen(callback: (error: Error) => void) {
    this.callback = callback;
  }

  notify(error: Error) {
    this.callback?.(error);
  }
}

export const useAuth = () => useContext(AuthContext);
