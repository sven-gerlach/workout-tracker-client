'use strict'

const Chart = require('chart.js')

function exerciseVolume (volume, dates) {
  // grab context
  const ctx = $('#exercise-volume-chart')

  const exerciseVolumeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Volume',
        data: volume
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          type: 'time',
          distribution: 'series',
          time: {
            displayFormats: {
              day: 'D MMM'
            }
          }
        }]
      }
    }
  })
}

module.exports = {
  exerciseVolume
}
