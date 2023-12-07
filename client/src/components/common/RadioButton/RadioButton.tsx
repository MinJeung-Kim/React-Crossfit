import { ChangeEvent } from "react";
import styles from "./RadioButton.module.css";

type Props = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButton({
  name,
  value,
  label,
  checked,
  onChange,
}: Props) {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
