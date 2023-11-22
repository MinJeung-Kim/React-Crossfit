import { FormEvent } from "react";

import RegistrationForm from "./RegistrationForm";
import LoginFooter from "components/Login/LoginFooter";

import { useUserContext } from "context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import { isAnyFieldNotEmpty } from "util/validation";

import styles from "../Login/Login.module.css";

export default function Registration() {
  const { auth, onChangeConnectForm } = useAuthContext();
  const { users, errorMsg } = useUserContext();

  const onSubmitAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = isAnyFieldNotEmpty(errorMsg);
    if (result === true) return;

    try {
      const status = await auth.auth(users);
      if (status === 201) {
        onChangeConnectForm();
      } else {
        console.error("회원 가입 실패!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.form} ${styles.login}`}>
      <p className={styles.title}> Registration </p>
      <RegistrationForm onSubmitAccount={onSubmitAccount} />
      <LoginFooter text={"Are you a member?"} btnText={"Signin"} />
    </div>
  );
}
