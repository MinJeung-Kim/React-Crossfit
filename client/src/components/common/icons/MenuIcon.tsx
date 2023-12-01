import { FiMenu } from "react-icons/fi";

type Props = {
  onClick: () => void;
};

export default function MenuIcon({ onClick }: Props) {
  return <FiMenu size="23" onClick={onClick} />;
}
