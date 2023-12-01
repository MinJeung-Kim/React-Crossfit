import { IoIosArrowForward } from "react-icons/io";

type Props = {
  onClick: () => void;
};

export default function ArrowForwardIcon({ onClick }: Props) {
  return <IoIosArrowForward size="24" onClick={onClick} />;
}
