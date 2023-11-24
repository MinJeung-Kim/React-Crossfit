import styles from "./LoginFooter.module.css";

type Props = {
  text: string;
  btnText: string;
  isSignup: boolean;
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function LoginFooter({
  text,
  btnText,
  isSignup,
  setIsSignup,
}: Props) {
  return (
    <div className={styles.login_signup}>
      <p className={styles.text}>
        {text}
        <button
          className={styles.toggle_button}
          onClick={() => setIsSignup(!isSignup)}
        >
          {btnText}
        </button>
      </p>
    </div>
  );
}
