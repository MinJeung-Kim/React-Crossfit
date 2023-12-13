import { FormEvent, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";

import { UserResponse } from "service/auth";
import { useAuth } from "context/AuthContext";
import { DATE_FORMAT, TODAY } from "util/schedule";

import LoginForm from "components/LoginForm/LoginForm";
import LoginFooter from "components/LoginForm/LoginFooter";
import SocialMedia from "components/LoginForm/SocialMedia";
import ConfirmToast from "components/ConfirmToast/ConfirmToast";
import TitleHeader from "components/common/TitleHeader/TitleHeader";

import styles from "./Login.module.css";

export default function Login() {
  const today = new Date();
  const navigate = useNavigate();
  const { authMsg, setAuthMsg, signUp, logIn } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState<UserResponse>({
    id: 0,
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    gender: "M",
    birthDay: "",
    membership: "1",
    extension: 0,
    lockerYn: "Y",
    locker: "1",
    price: 0,
    startDate: TODAY,
    endDate: "",
    userAgmtYn: "Y",
  });

  const [isAlert, setIsAlert] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = user;

    if (isSignup) {
      signUp({
        ...user,
        endDate: format(
          today.setMonth(today.getMonth() + Number(user.membership)),
          DATE_FORMAT
        ),
      })
        .then(() => setIsSignup(false))
        .catch(setError);
    } else {
      logIn(username, password)
        .then(() => navigate("/"))
        .catch(setError);
    }
  };

  const setError = (error: any) => {
    setAuthMsg(error.toString());
    setIsAlert(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <div className={`${styles.form} ${styles.login}`}>
          <TitleHeader title={isSignup ? "Registration" : "Login"} />
          <LoginForm
            isSignup={isSignup}
            user={user}
            setUser={setUser}
            onSubmit={onSubmit}
            onChange={onChange}
          />

          <LoginFooter
            text={isSignup ? "Are you a member? " : "Not a member? "}
            btnText={isSignup ? "Signin" : "SignUp "}
            isSignup={isSignup}
            setIsSignup={setIsSignup}
          />
          {!isSignup && <SocialMedia />}
        </div>
      </div>

      {isAlert && <ConfirmToast messageStatus={authMsg} />}
    </div>
  );
}
