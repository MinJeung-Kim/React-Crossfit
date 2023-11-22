import { Chart } from "primereact/chart";
import {
  BarData,
  BarOptions,
  PieData,
  PieOptions,
} from "../../../util/chartData";

type Props = {
  type: string;
};

export default function Charts({ type }: Props) {
  return (
    <Chart
      type={type}
      data={type === "polarArea" ? PieData : BarData}
      options={type === "polarArea" ? PieOptions : BarOptions}
      // style={
      //   type === "polarArea" && {
      //     height: "450px",
      //     display: "flex",
      //     justifyContent: "center",
      //   }
      // }
    />
  );
}
