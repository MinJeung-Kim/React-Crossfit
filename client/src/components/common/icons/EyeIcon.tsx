import { PiEyeBold } from "react-icons/pi";

type Props = {
  onClick: () => void;
};

export default function EyeIcon({ onClick }: Props) {
  return <PiEyeBold size="23" onClick={onClick} />;
}
