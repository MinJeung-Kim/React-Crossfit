import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthService from "service/auth";

export type User = { [key: string]: string } | undefined;

type State = {
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
  signUp: (
    username: string,
    password: string,
    name: string,
    email: string,
    phone: string
  ) => Promise<void>;
  logIn: (username: string, password: string) => Promise<void>;
};

type UserResponse = {
  username: string;
  email: string;
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
  const [userInfo, setUserInfo] = useState<User>(undefined);

  useEffect(() => {
    authErrorEventBus.listen((err: any) => {
      setUserInfo(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService
      .me()
      .then((userResponse: UserResponse) => setUserInfo({ ...userResponse }))
      .catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (
      username: string,
      password: string,
      name: string,
      email: string,
      phone: string
    ): Promise<void> =>
      authService
        .signup(username, password, name, email, phone)
        .then((user) => setUserInfo({ ...user })),
    [authService]
  );

  const logIn = useCallback(
    async (username: string, password: string): Promise<void> =>
      authService
        .login(username, password)
        .then((user) => setUserInfo({ ...user })),
    [authService]
  );

  const logout = useCallback(
    async () =>
      authService.logout().then(() => {
        setUserInfo(undefined);
      }),
    [authService]
  );

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
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
