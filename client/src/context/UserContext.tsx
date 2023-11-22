import { createContext, useContext, useState } from "react";

type Users = { [key: string]: string };
type State = {
  errorMsg: Users;
  setErrorMsg: React.Dispatch<React.SetStateAction<Users>>;

  users: Users;
  setUsers: React.Dispatch<React.SetStateAction<Users>>;
};

const UserContext = createContext<State>({} as State);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [errorMsg, setErrorMsg] = useState({});
  const [users, setUsers] = useState({});

  return (
    <UserContext.Provider value={{ errorMsg, setErrorMsg, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUserContext = () => useContext(UserContext);
