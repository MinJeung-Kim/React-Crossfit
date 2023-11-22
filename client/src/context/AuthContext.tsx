import { createContext, useContext, useState } from "react";
import { removeCookie } from "typescript-cookie";

import Auth from "../api/AuthApi/auth";
import fakeAuthClient from "../api/AuthApi/fakeAuthClient";

export type User = { email: string; name: string };

type State = {
  isConnect: boolean;
  setIsConnect: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  auth: Auth;
  onChangeConnectForm: () => void;
  onLogout: () => void;
};

export const AuthContext = createContext<State>({} as State);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnect, setIsConnect] = useState(true);
  const [userInfo, setUserInfo] = useState({ email: "", name: "" });

  const client = new fakeAuthClient();
  const auth = new Auth(client);

  const onChangeConnectForm = () => {
    setIsConnect(!isConnect);
  };
  const onLogout = () => {
    removeCookie("accessToken");
    setUserInfo({ email: "", name: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        isConnect,
        setIsConnect,
        onChangeConnectForm,
        auth,
        userInfo,
        setUserInfo,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
