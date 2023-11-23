import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useUserContext } from "context/UserContext"; 

import LoginForm from "./LoginForm";
import SocialMedia from "./SocialMedia";
import LoginFooter from "./LoginFooter";

import styles from "./Login.module.css";
import { isAnyFieldNotEmpty } from "util/validation";
import { useAuth } from "context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const {   setUserInfo } = useAuth();
  const { users, errorMsg } = useUserContext();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const onSubmitAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
  };

  return (
    <div className={`${styles.form} ${styles.login}`}>
      <p className={styles.title}>Login</p>
      {/* <LoginForm onSubmitAccount={onSubmitAccount} /> */}
      <LoginFooter text={"Not a member?"} btnText={"Signup now"} />
      <SocialMedia />
    </div>
  );
}
