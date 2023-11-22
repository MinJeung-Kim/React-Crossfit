export const INPUT_VALUE = {
  email: "이메일 형식에 맞춰주세요.",
  password: "8 ~ 10자 영문, 숫자 조합.",
  passwordConfirm: "비밀번호를 확인해주세요.",
  phone: "'-'제외 숫자만 입력.",
};

const EMAIL_REGEX =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

export function emailValidation(email: string) {
  return EMAIL_REGEX.test(email);
}

//  8 ~ 10자 영문, 숫자 조합
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
export function passwordValidation(password: string) {
  return PASSWORD_REGEX.test(password);
}

//  숫자만입력
const PHONE_REGEX = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
export function phoneValidation(phone: string) {
  return PHONE_REGEX.test(phone);
}

export const isAnyFieldNotEmpty = (items: { [key: string]: string }) =>
  Object.values(items).some((value) => value !== "");
