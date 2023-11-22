import { Link } from "react-router-dom";
import styles from "./SideNavigationBar.module.css";

type Props = {
  items: { name: string; url?: string }[];
};

export default function SubMenu({ items }: Props) {
  return (
    <ul className={styles.sub_menu}>
      {items.map(({ name, url }) => (
        <li key={name}>
          <Link to={url || "#"}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
