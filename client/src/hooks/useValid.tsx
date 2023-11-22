import { FocusEvent } from "react";
import { useUserContext } from "context/UserContext";
import {
  INPUT_VALUE,
  emailValidation,
  passwordValidation,
  phoneValidation,
} from "util/validation";

type InputName = "email" | "password" | "passwordConfirm" | "phone";

export default function useValid() {
  const { errorMsg, setErrorMsg, users } = useUserContext();

  const validations = {
    email: emailValidation,
    password: passwordValidation,
    phone: phoneValidation,
    passwordConfirm: (value: string) => users["password"] === value,
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const inputName = e.target.name as InputName;
    const validationFunction = validations[inputName];

    if (!validationFunction) {
      throw new Error(`Unsupported input type: ${inputName}`);
    }

    const isValid = validationFunction(users[inputName]);
    const newErrorMsg = {
      ...errorMsg,
      [inputName]: isValid ? "" : INPUT_VALUE[inputName],
    };

    setErrorMsg(newErrorMsg);
  };

  return { handleBlur };
}
