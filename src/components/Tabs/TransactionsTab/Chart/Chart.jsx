import React from 'react';
import { Line as LineChart } from 'react-chartjs';

function rand(min, max, num) {
  var rtn = [];
  while (rtn.length < num) {
    rtn.push((Math.random() * (max - min)) + min);
  }
  return rtn;
}

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'My First dataset',
      fillColor: 'rgba(122, 115, 252, 0.2)',
      strokeColor: 'rgba(122, 115, 252, 1)',
      pointColor: 'rgba(122, 115, 252, 1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(122, 115, 252, 1)',
      data: rand(32, 100, 12)
    }
  ]
};

const Chart = () => (
  <LineChart data={data} options={{responsive: true}} />
);

export default Chart;