import Card from "../../components/Card/Card";
import ChartForm from "../../components/Charts/ChartForm"; 

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <article className={styles.dashboard}>
      <Card />
      <ChartForm /> 
    </article>
  );
}
