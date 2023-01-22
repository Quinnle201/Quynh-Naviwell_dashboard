export const lineChartData = {
  type: "line",
  data: {
    labels: ["Jan", "March", "June", "September", "December"],
    datasets: [
      {
        label: "Weight",
        data: [218, 200, 198, 191, 186],
        borderColor: "#4766FF",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Blood Presure",
        data: [190, 181, 167, 149, 130],
        borderColor: "#73D44D",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Resting Heart Rate",
        data: [110, 98, 85, 78, 62],
        borderColor: "#FF4D4D",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Body Fat",
        data: [40.5, 28.2, 26, 23.7, 20.3],
        borderColor: "#FFB54F",
        borderWidth: 2,
        fill: false,
      },
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      xAxes: [{
        // display: false
      }],
      yAxes: [{
        display: false
      }],
    },
  },
};
  
export default lineChartData;