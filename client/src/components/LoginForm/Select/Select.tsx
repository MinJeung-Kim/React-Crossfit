import { ReactNode, useEffect, useRef, useState } from "react";
import { UserResponse } from "service/auth";

import styles from "./Select.module.css";

type Props = {
  icon: ReactNode;
  name: string;
  value: string;
  user: UserResponse;
  setUser: React.Dispatch<React.SetStateAction<UserResponse>>;
  options: { [key: string]: string }[];
};

export default function Select({
  icon,
  name,
  value,
  user,
  setUser,
  options,
}: Props) {
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

  const handleClickOption = (value: string) => {
    setUser({ ...user, [name]: value });
    setDropMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isDropMenuOpen && !dropMenuRef.current?.contains(e.target))
        setDropMenuOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isDropMenuOpen]);

  return (
    <div className={styles.input_field} ref={dropMenuRef}>
      {icon}
      <input
        type="text"
        name={name}
        value={`${value} 개월`}
        readOnly
        onClick={() => setDropMenuOpen(!isDropMenuOpen)}
      />
      {isDropMenuOpen && (
        <ul className={styles.select}>
          {options.map(({ value, text }) => (
            <li
              key={value}
              value={value}
              onClick={() => handleClickOption(value)}
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
