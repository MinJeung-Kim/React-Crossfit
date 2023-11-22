import { Chart } from "primereact/chart";
import { BarData, BarOptions } from "../../../util/chartData";

export default function BarChart() {
  return <Chart type="bar" data={BarData} options={BarOptions} />;
}
