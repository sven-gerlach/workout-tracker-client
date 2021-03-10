'use strict'

const Chart = require('chart.js')

// this plugin checks if the first dataset has a length of less than [x],
// and if true sets the output to a text message
Chart.plugins.register({
  afterDraw: function (chart) {
    if (chart.data.datasets[0].data.length < 2) {
      // No data is present
      const ctx = chart.chart.ctx
      const width = chart.chart.width
      const height = chart.chart.height
      chart.clear()

      ctx.save()
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.font = '1.2rem BlinkMacSystemFont'
      ctx.fillText('At least two separate workouts are needed', width / 2, height / 8)
      ctx.restore()
    }
  }
})

function exerciseVolume (volume, dates) {
  // grab context
  const ctx = $('#exercise-volume-chart')

  const exerciseVolumeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'kg',
        data: volume,
        backgroundColor: 'rgba(240,248,255, 0.8)',
        borderColor: 'rgba(240,248,255, 0.8)'
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'rgba(240,248,255, 1)',
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: 'rgba(240,248,255, 1)',
            major: {
              enabled: true
            }
          },
          gridLines: {
            zeroLineColor: 'rgba(240,248,255, 1)'
          },
          scaleLabel: {
            display: true,
            labelString: 'Aggregate Volume',
            fontColor: 'rgba(240,248,255, 1)'
          }
        }],
        xAxes: [{
          type: 'time',
          distribution: 'series',
          time: {
            displayFormats: {
              day: 'D MMM'
            }
          },
          gridLines: {
            zeroLineColor: 'rgba(240,248,255, 1)'
          },
          ticks: {
            fontColor: 'rgba(240,248,255, 1)'
          }
        }]
      }
    }
  })
}

module.exports = {
  exerciseVolume
}
