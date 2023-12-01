import { PiEyeClosedBold } from "react-icons/pi";

type Props = {
  onClick: () => void;
};

export default function EyeClosedIcon({ onClick }: Props) {
  return <PiEyeClosedBold size="23" onClick={onClick} />;
}
