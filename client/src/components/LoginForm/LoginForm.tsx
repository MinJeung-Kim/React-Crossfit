import { ChangeEvent, FormEvent, useState } from "react";

import { UserResponse } from "service/auth";

import EyeIcon from "components/common/icons/EyeIcon";
import MailIcon from "components/common/icons/MailIcon";
import LockIcon from "components/common/icons/LockIcon";
import UserIcon from "components/common/icons/UserIcon";
import PhoneIcon from "components/common/icons/PhoneIcon";
import LockersIcon from "components/common/icons/LockersIcon";
import BirthdayIcon from "components/common/icons/BirthdayIcon";
import UserFocusIcon from "components/common/icons/UserFocusIcon";
import EyeClosedIcon from "components/common/icons/EyeClosedIcon";
import MembershipIcon from "components/common/icons/MembershipIcon";

import Select from "components/LoginForm/Select/Select";
import LoginInput from "components/common/LoginInput/LoginInput";
import RadioButton from "components/common/RadioButton/RadioButton";
import LoadDataButton from "components/common/Buttons/LoadDataButton";

import styles from "./LoginForm.module.css";

type Props = {
  isSignup: boolean;
  user: UserResponse;
  setUser: React.Dispatch<React.SetStateAction<UserResponse>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const MEMBERSHIP_OPTIONS = [
  { value: "1", text: "1개월" },
  { value: "3", text: "3개월" },
];

export default function LoginForm({
  isSignup,
  onSubmit,
  user,
  setUser,
  onChange,
}: Props) {
  const [isShowPw, setIsShowPw] = useState(false);
  const {
    username,
    password,
    name,
    email,
    phone,
    gender,
    birthDay,
    membership,
    lockerYn,
    locker,
  } = user;

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
            <RadioButton
              name="gender"
              value="M"
              label="여자"
              checked={gender === "M"}
              onChange={onChange}
            />
            <RadioButton
              name="gender"
              value="F"
              label="남자"
              checked={gender === "F"}
              onChange={onChange}
            />
          </div>
          <LoginInput
            icon={<BirthdayIcon />}
            name="birthDay"
            type="date"
            placeholder="BirthDay"
            value={birthDay}
            onChange={onChange}
            required={false}
            max="9999-12-31"
          />
          <Select
            icon={<MembershipIcon />}
            name="membership"
            user={user}
            value={membership}
            setUser={setUser}
            options={MEMBERSHIP_OPTIONS}
          />
          <div className={styles.radio_wrap}>
            <RadioButton
              name="lockerYn"
              value="Y"
              label="사물함 사용"
              checked={lockerYn === "Y"}
              onChange={onChange}
            />
            <RadioButton
              name="lockerYn"
              value="N"
              label="사물함 미사용"
              checked={lockerYn === "N"}
              onChange={onChange}
            />
          </div>
          {lockerYn === "Y" && (
            <Select
              icon={<LockersIcon />}
              name="locker"
              user={user}
              value={locker}
              setUser={setUser}
              options={MEMBERSHIP_OPTIONS}
            />
          )}
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
