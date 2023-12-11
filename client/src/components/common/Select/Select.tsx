import { ChangeEvent } from "react";
import styles from "./Select.module.css";

type Props = {
  name: string;
  value: string;
  options?: { [key: string]: string }[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Select({ name, value, options, onChange }: Props) {
  return (
    <div className={styles.input_field}>
      <input name={name} type="date" value={value} onChange={onChange} />
    </div>
  );
}
