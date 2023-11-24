import { FiAlertTriangle, FiXCircle } from "react-icons/fi";
import styles from "./Confirmation.module.css";

type Props = {
  message: string;
};

export default function Confirmation({ message }: Props) { 
  
  return (
    <>
      <div className={styles.wrapper}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Confirmation</div>
          <FiXCircle className={styles.icon} />
        </div>
        <div className={styles.content}>
          <FiAlertTriangle className={styles.icon} />
          <span className={styles.content_title}>{message}</span>
        </div>
        <div className={styles.buttons}>
          <button>No</button>
          <button>Yes</button>
        </div>
      </div>
    </>
  );
}
