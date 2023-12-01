import { FaPlus } from "react-icons/fa6";

type Props = {
  onClick: () => void;
};

export default function PlusIcon({ onClick }: Props) {
  return <FaPlus size="23" onClick={onClick} />;
}
