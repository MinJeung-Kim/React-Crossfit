import { IoIosArrowBack } from "react-icons/io";

type Props = {
  onClick: () => void;
};

export default function ArrowBackIcon({ onClick }: Props) {
  return <IoIosArrowBack size="24" onClick={onClick} />;
}
