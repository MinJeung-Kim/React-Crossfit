import { FaPen } from "react-icons/fa6";

type Props = {
  onClick: () => void;
};

export default function PenFillIcon({ onClick }: Props) {
  return <FaPen size="24" onClick={onClick} />;
}
