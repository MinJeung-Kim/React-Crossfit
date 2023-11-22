import SearchButton from "../../components/SearchButton/SearchButton";
import styles from "./Users.module.css";

export default function Users() {
  return (
    <article className={styles.users}>
      <SearchButton />
    </article>
  );
}
