import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class EfficiencyGraph extends Component {
  render() {
    let data = this.props.data;

    console.log("Data", data);
    const options = {
      theme: "light2",
      animationEnabled: true,
      //   exportEnabled: true,
      title: {
        text: "Production Details",
      },
      toolTip: {
        shared: true,
      },

      axisY: {
        title: "Total Time",
        suffix: "Min",
      },
      axisX: {
        title: "Machine", // Optional: set a title for the x-axis
        valueFormatString: "MMM", // Adjust to match your data format if applicable
        labelAngle: -45, // Optional: rotate labels for better visibility
      },
      data: [
        {
          type: "spline",
          xValueFormatString: "MMM",
          yValueFormatString: "#,###.## Min",
          //   name: data[0]?.name,
          name: "Time",
          showInLegend: true,
          dataPoints: data?.slice(0, 16)?.map((item, index) => ({
            label: item["machine_number"], // Use 'label' for string-based x-axis
            y:  item["av_time"][0],
          })),
        },
      ],

      //   legend: {
      //     dockInsidePlotArea: true,
      //     horizontalAlign: "right",
      //   },
      //   data: [
      //     {
      //       type: "spline",
      //       xValueFormatString: "M",
      //       yValueFormatString: "#,###.## TW",
      //       name: "F1",
      //       showInLegend: true,
      //       dataPoints: data?.map((item) => ({
      //         x: item["name"],
      //         y: item["Total weight"],
      //       })),
      //     },
      //     {
      //       type: "spline",
      //       xValueFormatString: "M",
      //       yValueFormatString: "#,###.## PIPE",
      //       name: "F2",
      //       showInLegend: true,
      //       dataPoints: data?.map((item) => ({
      //         x: item["name"],
      //         y: item["Pipes"],
      //       })),
      //     },
      //     {
      //       type: "spline",
      //       xValueFormatString: "M",
      //       yValueFormatString: "#,###.## AVW",
      //       name: "F3",
      //       showInLegend: true,
      //       dataPoints: data?.map((item) => ({
      //         x: item["name"],
      //         y: Number(item["Average Pipe Weight"]),
      //       })),
      //     },

      //   ],
    };

    console.log("options", options);
    return (
      <div className=" flex justify-center items-center">
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default EfficiencyGraph;
