import React from "react";
import ReactApexChart from "react-apexcharts";

class BitCoinChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "New Clients",
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          height: 340,
          toolbar: {
            show: false,
          },
        },

        plotOptions: {
          candlestick: {
            colors: {
              upward: "#3ab67a",
              downward: "#fd5353",
            },
          },
        },
        title: {
          text: "",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: true,
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="bitcoinhChart">
        <ReactApexChart
          options={this.state.options}
          series={this.props.series}
          type="candlestick"
          height={340}
        />
      </div>
    );
  }
}

export default BitCoinChart;
