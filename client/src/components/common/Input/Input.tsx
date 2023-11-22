import React, { FocusEvent, ChangeEvent, useState } from "react";
import { BiShow } from "react-icons/bi";
import { MdErrorOutline } from "react-icons/md";

import { useUserContext } from "context/UserContext";

import styles from "./Input.module.css";

type Input = {
  [key: string]: string;
};

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon: React.ReactNode;
  hideIcon?: React.ReactNode;
  inputs: Input;
  setInputs: React.Dispatch<React.SetStateAction<Input>>;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export default function Input({
  name,
  type = "text",
  placeholder = "",
  required = true,
  icon,
  hideIcon,
  inputs,
  setInputs,
  onBlur,
}: Props) {
  const { errorMsg } = useUserContext();
  const [isType, setIsType] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextInputs = {
      ...inputs,
      [name]: value,
    };

    setInputs(nextInputs);
  };

  const chooseIcon = () => {
    if (hideIcon) {
      return (
        <>
          <i className={styles.showHidePw} onClick={() => setIsType(!isType)}>
            {isType ? hideIcon : <BiShow />}
          </i>
          <i className={styles.icon}>{icon}</i>
        </>
      );
    }
  };

  return (
    <>
      <div className={styles.input_field} key={name}>
        <input
          name={name}
          value={inputs[name] || ""}
          onChange={handleChange}
          onBlur={onBlur}
          type={isType ? "text" : type}
          placeholder={placeholder}
          required={required}
        />
        {hideIcon ? chooseIcon() : <i className={styles.icon}>{icon}</i>}
      </div>
      {Object.keys(errorMsg).find((key) => key === name) &&
        errorMsg[name] !== "" && (
          <span className={styles.errorMsg}>
            <i>
              <MdErrorOutline />
            </i>
            {errorMsg[name]}
          </span>
        )}
    </>
  );
}
