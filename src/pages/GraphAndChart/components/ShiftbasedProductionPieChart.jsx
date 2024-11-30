/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ShiftbasedProductionPieChart extends Component {
  render() {
    let data = this.props.data;
    const options = {
      animationEnabled: true,
      title: {
        text: "Shift Base Production",
      },
      subtitles: [
        {
          // text: "71% Positive",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,### KG",
          dataPoints: data?.map((item) => {
            return {
              name: item?.name,
              y: item?.weight,
            };
          }),

          // [
          // 	{ name: "Production Weight", y: 555 },
          // 	{ name: "Very Unsatisfied", y: 311 },
          // 	{ name: "Very Satisfied", y: 40 },
          // 	{ name: "Satisfied", y: 17 },
          // 	{ name: "Neutral", y: 7 }
          // ]
        },
      ],
    };

    console.log("options", options)
    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default ShiftbasedProductionPieChart;
