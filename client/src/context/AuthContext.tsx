import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import AuthService from "service/auth";
import Login from "pages/Singnin/Login";

export type User = { [key: string]: string };

type State = {
  isConnect: boolean;
  setIsConnect: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  onChangeConnectForm: () => void;
  logout: () => void;
  signUp: (
    username: string,
    password: string,
    name: string,
    email: string,
    url: string
  ) => Promise<void>;
  logIn: (username: string, password: string) => Promise<void>;
};

type UserResponse = {
  username: string;
  email: string;
};

export const AuthContext = createContext<State>({} as State);
const contextRef = createRef();

export function AuthProvider({
  authService,
  authErrorEventBus,
  children,
}: {
  authService: AuthService;
  authErrorEventBus: AuthErrorEventBus;
  children: React.ReactNode;
}) {
  const [isConnect, setIsConnect] = useState(true);
  const [userInfo, setUserInfo] = useState<User>({});
  // const [user, setUser] = useState(undefined);

  useImperativeHandle(contextRef, () =>
    userInfo ? userInfo.token : undefined
  );

  const onChangeConnectForm = () => {
    setIsConnect(!isConnect);
  };

  useEffect(() => {
    authErrorEventBus.listen((err: any) => {
      console.log(err);
      setUserInfo({});
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
      url: string
    ): Promise<void> =>
      authService
        .signup(username, password, name, email, url)
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
        console.log("sss");
        setUserInfo({});
      }),
    [authService]
  );

  return (
    <AuthContext.Provider
      value={{
        isConnect,
        setIsConnect,
        onChangeConnectForm,
        userInfo,
        setUserInfo,
        logout,
        signUp,
        logIn,
      }}
    >
      {/* {userInfo ? (
        children
      ) : (
        <div className="app">
          <Login onSignUp={signUp} onLogin={logIn} />
        </div>
      )} */}
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

export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);
