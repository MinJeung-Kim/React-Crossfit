import { useEffect } from "react";

import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";

import { useUserContext } from "context/UserContext";
import { useAuthContext } from "../../context/AuthContext";

import styles from "./Singnin.module.css";

export default function Singnin() {
  const { isConnect } = useAuthContext();
  const { setUsers, setErrorMsg } = useUserContext();

  useEffect(() => {
    setUsers({});
    setErrorMsg({});
  }, [isConnect]);

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        {isConnect ? <Login /> : <Registration />}
      </div>
    </div>
  );
}
