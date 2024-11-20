// import React, { Component } from "react";
// import CanvasJSReact from "@canvasjs/react-charts";
// //var CanvasJSReact = require('@canvasjs/react-charts');

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// export class MachineEfficiency extends Component {
//   render() {
//     const options = {
//       theme: "light2",
//       animationEnabled: true,
//       exportEnabled: true,
//       title: {
//         text: "Min/Max Temperature in Dubai",
//       },
//       axisX: {
//         valueFormatString: "MMM",
//         interval: 1,
//         intervalType: "month",
//       },
//       axisY: {
//         title: "Temperature (°C)",
//         suffix: "°C",
//       },
//       toolTip: {
//         shared: true,
//       },
//       legend: {
//         dockInsidePlotArea: true,
//         horizontalAlign: "right",
//       },
//       data: [
//         {
//           type: "spline",
//           xValueFormatString: "MMM",
//           yValueFormatString: "#,###.##°C",
//           name: "Minimum",
//           showInLegend: true,
//           dataPoints: [
//             { x: new Date(2020, 0, 1), y: 14.1 },
//             { x: new Date(2020, 1, 1), y: 15 },
//             { x: new Date(2020, 2, 1), y: 17.2 },
//             { x: new Date(2020, 3, 1), y: 20.8 },
//             { x: new Date(2020, 4, 1), y: 24.4 },
//             { x: new Date(2020, 5, 1), y: 26.6 },
//             { x: new Date(2020, 6, 1), y: 29.2 },
//             { x: new Date(2020, 7, 1), y: 29.2 },
//             { x: new Date(2020, 8, 1), y: 26.9 },
//             { x: new Date(2020, 9, 1), y: 23.5 },
//             { x: new Date(2020, 10, 1), y: 19.7 },
//             { x: new Date(2020, 11, 1), y: 15.8 },
//           ],
//         },
//         {
//           type: "spline",
//           xValueFormatString: "MMM",
//           yValueFormatString: "#,###.##°C",
//           name: "Maximum",
//           showInLegend: true,
//           dataPoints: [
//             { x: new Date(2020, 0, 1), y: 24.3 },
//             { x: new Date(2020, 1, 1), y: 26.1 },
//             { x: new Date(2020, 2, 1), y: 29.4 },
//             { x: new Date(2020, 3, 1), y: 34.3 },
//             { x: new Date(2020, 4, 1), y: 38.8 },
//             { x: new Date(2020, 5, 1), y: 40.8 },
//             { x: new Date(2020, 6, 1), y: 42.1 },
//             { x: new Date(2020, 7, 1), y: 42.3 },
//             { x: new Date(2020, 8, 1), y: 39.9 },
//             { x: new Date(2020, 9, 1), y: 36.3 },
//             { x: new Date(2020, 10, 1), y: 30.8 },
//             { x: new Date(2020, 11, 1), y: 26.3 },
//           ],
//         },
//       ],
//     };
//     return (
//         <div className="bg-white shadow-[5px_5px_20px_1px_rgba(0,0,0,0.2)] p-8 rounded-lg flex justify-center items-center">
//         <CanvasJSChart
//           options={options}
//           /* onRef={ref => this.chart = ref} */
//         />
//         {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//       </div>
//     );
//   }
// }
// export default MachineEfficiency;
