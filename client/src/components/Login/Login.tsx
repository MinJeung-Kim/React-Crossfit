import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useUserContext } from "context/UserContext";
import { useAuthContext } from "../../context/AuthContext";

import LoginForm from "./LoginForm";
import SocialMedia from "./SocialMedia";
import LoginFooter from "./LoginFooter";

import styles from "./Login.module.css";
import { isAnyFieldNotEmpty } from "util/validation";

export default function Login() {
  const navigate = useNavigate();
  const { auth, setUserInfo } = useAuthContext();
  const { users, errorMsg } = useUserContext();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const onSubmitAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = isAnyFieldNotEmpty(errorMsg);
    if (result === true) return;
    
    try {
      const userInfo = await auth.auth(users);
      if (userInfo.status === 200) {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        setCookie("accessToken", userInfo.accessToken, { expires: today });

        const { accessToken: _, ...rest } = userInfo;
        setUserInfo(rest);
        navigate("/", { replace: true });
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.form} ${styles.login}`}>
      <p className={styles.title}>Login</p>
      <LoginForm onSubmitAccount={onSubmitAccount} />
      <LoginFooter text={"Not a member?"} btnText={"Signup now"} />
      <SocialMedia />
    </div>
  );
}
