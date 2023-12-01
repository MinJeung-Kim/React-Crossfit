import styles from "./TitleHeader.module.css";

type Props = {
  title: string;
};

export default function TitleHeader({ title }:Props) {
  return <p className={styles.title}>{title}</p>;
}
