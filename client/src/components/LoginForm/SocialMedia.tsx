import { socialMedia } from "util/socialMedia";
import styles from "./SocialMedia.module.css";

export default function SocialMedia() {
  return (
    <div className={styles.media_options}>
      {socialMedia.map(({ name, icon }) => (
        <div className={`${styles.field} ${styles.git}`} key={name}>
          <i className={styles.git_icon}>{icon}</i>
          <span className={styles.tooltip}>{name}</span>
        </div>
      ))}
    </div>
  );
}
