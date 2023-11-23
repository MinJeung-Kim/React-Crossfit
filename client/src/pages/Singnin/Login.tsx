import { FormEvent, ChangeEvent, useState } from "react";

// import Login from "../../components/Login/Login";
import Registration from "../../components/Registration/Registration";

import { useUserContext } from "context/UserContext";

import LoginForm from "components/Login/LoginForm";
import LoginFooter from "components/Login/LoginFooter";
import SocialMedia from "components/Login/SocialMedia";

import styles from "./Login.module.css";

type Props = {
  onSignUp: (
    username: string,
    password: string,
    name: string,
    email: string,
    url: string
  ) => void;
  onLogin: (username: string, password: string) => void;
};

export default function Login({ onSignUp, onLogin }: Props) {
  const { users, setUsers, setErrorMsg } = useUserContext();
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setURL] = useState("");
  const [text, setText] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signup) {
      try {
        onSignUp(username, password, name, email, url);
      } catch (error: any) {
        setErrorMsg(error);
      }
    } else {
      try {
        onLogin(username, password);
      } catch (error: any) {
        setErrorMsg(error);
      }
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setUsers({ ...users, [name]: value });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <div className={`${styles.form} ${styles.login}`}>
          <p className={styles.title}>Login</p>
          <LoginForm
            onSubmit={onSubmit}
            username={username}
            password={password}
            onChange={onChange}
          />
          <LoginFooter text={"Not a member?"} btnText={"Signup now"} />
          <SocialMedia />
        </div>
        {/* {isConnect ? <Login /> : <Registration />} */}
      </div>
    </div>
  );
}
