/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class DowntimeGraph extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "All Time Summer Olympic Medals",
      },
      legend: {
        verticalAlign: "center",
        horizontalAlign: "right",
        reversed: true,
        cursor: "pointer",
        fontSize: 16,
        itemclick: this.toggleDataSeries,
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "stackedColumn100",
          name: "Gold",
          showInLegend: true,
          color: "#D4AF37",
          dataPoints: [
            { label: "01", y: 8 },
            { label: "02", y: 473 },
            { label: "03", y: 273 },
            { label: "04", y: 243 },
            { label: "05", y: 269 },
            { label: "06", y: 243 },
            { label: "07", y: 195 },
            { label: "08", y: 236 },
            { label: "09", y: 194 },
            { label: "10", y: 192 },
          ],
        },
        {
          type: "stackedColumn100",
          name: "Silver",
          showInLegend: true,
          color: "#C0C0C0",
          dataPoints: [
            { label: "01", y: 897 },
            { label: "02", y: 376 },
            { label: "03", y: 299 },
            { label: "04", y: 272 },
            { label: "05", y: 272 },
            { label: "06", y: 212 },
            { label: "07", y: 210 },
            { label: "08", y: 189 },
            { label: "09", y: 156 },
            { label: "10", y: 165 },
          ],
        },
        {
          type: "stackedColumn100",
          name: "Bronze",
          showInLegend: true,
          color: "#D4AF37",
          dataPoints: [
            { label: "01", y: 789 },
            { label: "02", y: 355 },
            { label: "03", y: 303 },
            { label: "04", y: 310 },
            { label: "05", y: 283 },
            { label: "06", y: 236 },
            { label: "07", y: 233 },
            { label: "08", y: 174 },
            { label: "09", y: 187 },
            { label: "10", y: 162 },
          ],
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default DowntimeGraph;
