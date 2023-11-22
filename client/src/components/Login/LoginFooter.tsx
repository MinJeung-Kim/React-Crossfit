import { useAuthContext } from "context/AuthContext";
import styles from "./Login.module.css";

type Props = {
  text: string;
  btnText: string;
};
export default function LoginFooter({ text, btnText }: Props) {
  const { onChangeConnectForm } = useAuthContext();

  return (
    <div className={styles.login_signup}>
      <p className={styles.text}>
        {text}
        <button
          type="reset"
          className={`${styles.text} ${styles.signup_text}`}
          onClick={onChangeConnectForm}
        >
          {btnText}
        </button>
      </p>
    </div>
  );
}
