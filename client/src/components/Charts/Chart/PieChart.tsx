import { Chart } from "primereact/chart";
import { PieData, PieOptions } from "../../../util/chartData";

export default function PieChart() {
  return (
    <Chart
      type="polarArea"
      data={PieData}
      options={PieOptions}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
}
