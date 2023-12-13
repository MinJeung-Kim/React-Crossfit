import { MdClear } from "react-icons/md";

type Props = {
  onClick: () => void;
};

export default function ClearIcon({ onClick }: Props) {
  return <MdClear size="23" onClick={onClick} />;
}
