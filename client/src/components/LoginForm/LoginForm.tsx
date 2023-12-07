import { ChangeEvent, FormEvent, useState } from "react";

import { UserResponse } from "service/auth";

import LockIcon from "components/common/icons/LockIcon";
import UserIcon from "components/common/icons/UserIcon";
import EyeIcon from "components/common/icons/EyeIcon";
import MailIcon from "components/common/icons/MailIcon";
import PhoneIcon from "components/common/icons/PhoneIcon";
import UserFocusIcon from "components/common/icons/UserFocusIcon";
import EyeClosedIcon from "components/common/icons/EyeClosedIcon";
import LoginInput from "components/common/LoginInput/LoginInput";
import RadioButton from "components/common/RadioButton/RadioButton";
import LoadDataButton from "components/common/Buttons/LoadDataButton";

import styles from "./LoginForm.module.css";

type Props = {
  isSignup: boolean;
  user: UserResponse;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function LoginForm({
  isSignup,
  onSubmit,
  user,
  onChange,
}: Props) {
  const [isShowPw, setIsShowPw] = useState(false);
  const { username, password, name, email, phone, gender } = user;

  return (
    <form className={styles.input_form} onSubmit={onSubmit}>
      <LoginInput
        icon={<UserIcon />}
        name={"username"}
        placeholder={"ID"}
        value={username}
        onChange={onChange}
      />
      <LoginInput
        icon={<LockIcon />}
        name={"password"}
        type={isShowPw ? "text" : "password"}
        placeholder={"Password"}
        value={password}
        onChange={onChange}
        sideIcon={
          isShowPw ? (
            <EyeIcon onClick={() => setIsShowPw(false)} />
          ) : (
            <EyeClosedIcon onClick={() => setIsShowPw(true)} />
          )
        }
      />

      {isSignup && (
        <div className={styles.singnup}>
          <LoginInput
            icon={<UserFocusIcon />}
            name={"name"}
            placeholder={"Name"}
            value={name}
            onChange={onChange}
          />
          <LoginInput
            icon={<MailIcon />}
            name={"email"}
            type="email"
            placeholder={"Email"}
            value={email}
            onChange={onChange}
          />
          <LoginInput
            icon={<PhoneIcon />}
            name={"phone"}
            placeholder={"Phone"}
            value={phone}
            onChange={onChange}
          />
          <div className={styles.radio_wrap}>
            <RadioButton name="gender" value="M" label="여자" checked={gender === "M"} 
            onChange={onChange}/>
            <RadioButton name="gender" value="F" label="남자"  checked={gender === "F"}
            onChange={onChange}/>
          </div>
        </div>
      )}

      {!isSignup && <RememberMeOption />}

      <div className={styles.input_field}>
        <LoadDataButton title={isSignup ? "SignUp Now" : "Login Now"} />
      </div>
    </form>
  );
}

const RememberMeOption = () => (
  <div className={styles.checkbox_text}>
    <div className={styles.checkbox_content}>
      <input type="checkbox" id="logCheck" />
      <label className={styles.text} htmlFor="logCheck">
        Remember me
      </label>
    </div>
    <p className={styles.remember_text}>Forgot password?</p>
  </div>
);
