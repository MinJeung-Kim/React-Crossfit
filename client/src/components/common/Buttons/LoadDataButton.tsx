import styles from "./LoadDataButton.module.css";

type Props = {
  title: string;
};

export default function LoadDataButton({ title }: Props) {
  return <input className={styles.button} type="submit" value={title} />;
}
