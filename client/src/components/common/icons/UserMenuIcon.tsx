import { GoKebabHorizontal } from "react-icons/go";

type Props = {
  onClick:()=> void
}

export default function UserMenuIcon({onClick}:Props) {
  return <GoKebabHorizontal size="23" onClick={onClick}/>;
}
