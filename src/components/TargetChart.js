import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TargetChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Series 1",
        data: [
          [1, 34],
          [3.8, 43],
          [5, 31],
          [10, 43],
          [13, 33],
          [15, 43],
          [18, 33],
          [20, 52],
        ],
      },
    ],
    options: {
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      xaxis: {
        labels: false,
      },
      title: {
        text: "+12.% of target",
        align: "left",
        style: {
          fontSize: "10px",
          color: "#666",
        },
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val.toFixed(1);
          },
        },
      },
      //   fill: {
      //     type: "gradient",
      //     gradient: {
      //       shade: "dark",
      //       gradientToColors: ["#EC9EC0", "#FDD835"],
      //       shadeIntensity: 1,
      //       type: "horizontal",
      //       opacityFrom: 1,
      //       opacityTo: 1,
      //       stops: [0, 80],
      //     },
      //   },
      grid: {
        show: false,
      },
      yaxis: {
        labels: false,
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={50}
        width={100}
      />
    </div>
  );
};

export default TargetChart;
