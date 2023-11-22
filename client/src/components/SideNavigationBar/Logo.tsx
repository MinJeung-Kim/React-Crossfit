import { SiCplusplus } from "react-icons/si";
import styles from "./SideNavigationBar.module.css";

export default function Logo() {
  return (
    <div className={styles.logo_details}>
      <SiCplusplus />
      <span className={styles.logo_name}>CodingLab</span>
    </div>
  );
}
