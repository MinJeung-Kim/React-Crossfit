import { FormEvent, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "context/AuthContext";

import LoginForm from "components/LoginForm/LoginForm";
import LoginFooter from "components/LoginForm/LoginFooter";
import SocialMedia from "components/LoginForm/SocialMedia";
import ConfirmToast from "components/ConfirmToast/ConfirmToast";
import TitleHeader from "components/common/TitleHeader/TitleHeader";

import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const { signUp, logIn } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
  });
  const [text, setText] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password, name, email, phone } = loginInfo;

    if (isSignup) {
      signUp(username, password, name, email, phone)
        .then(() => setIsSignup(false))
        .catch(setError);
    } else {
      logIn(username, password)
        .then(() => navigate("/"))
        .catch(setError);
    }
  };

  const setError = (error: any) => {
    setText(error.toString());
    setIsAlert(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <div className={`${styles.form} ${styles.login}`}>
          <TitleHeader title={isSignup ? "Registration" : "Login"}/>
          {/* <p className={styles.title}>{isSignup ? "Registration" : "Login"}</p> */}
          <LoginForm
            isSignup={isSignup}
            loginInfo={loginInfo}
            onSubmit={onSubmit}
            onChange={onChange}
          />

          <LoginFooter
            text={isSignup ? "Are you a member? " : "Not a member? "}
            btnText={isSignup ? "Signin" : "SignUp "}
            isSignup={isSignup}
            setIsSignup={setIsSignup}
          />
          <SocialMedia />
        </div>
      </div>

      {isAlert && <ConfirmToast message={text} />}
    </div>
  );
}
