import { ChangeEvent, ReactNode } from "react";
import styles from "./LoginInput.module.css";

type Props = {
  icon: ReactNode;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  sideIcon?: ReactNode;
};

export default function LoginInput({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  sideIcon,
}: Props) {
  return (
    <div className={styles.input_field}>
      {icon}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    {sideIcon}
    </div>
  );
}
