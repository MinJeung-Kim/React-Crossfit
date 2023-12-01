import { IoMdLogOut } from "react-icons/io";

type Props = {
  onClick: () => void;
};

export default function LogoutIcon({ onClick }: Props) {
  return <IoMdLogOut size="23" onClick={onClick} />;
}
