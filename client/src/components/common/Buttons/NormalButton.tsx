import styles from "./NormalButton.module.css";

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function NormalButton({ text, onClick, disabled }: Props) {
  return (
    <button
      className={`${styles.button} ${disabled && styles.action}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
