import Charts from "./Chart/Charts";
import styles from "./ChartForm.module.css";

export default function ChartForm() {
  return (
    <div className={styles.graphBox}>
      <div className={styles.box}>
        <Charts type={"polarArea"} />
        {/* <PieChart /> */}
      </div>
      <div className={styles.box}>
        <Charts type={"bar"} />
        {/* <BarChart /> */}
      </div>
    </div>
  );
}
