export const BarData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "#42A5F5",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "My Second dataset",
      backgroundColor: "#FFA726",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};

export const BarOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
    y: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
  },
};

export const PieData = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26C6DA", "#7E57C2"],
      label: "My dataset",
    },
  ],
  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
};

export const PieOptions = {
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    r: {
      grid: {
        color: "#ebedef",
      },
    },
  },
};
