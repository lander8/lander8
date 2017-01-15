//= require analytics/charts/helpers

function plotSalesData(number_of_days) {
  return fetchData('/analytics/sales/' + window.current_website + '/' + number_of_days).then(function(data){
    return generateChartAxis(data);
  })
  .then(function(data){
    clearPreviousChart('salesChart');
    
    try {
      new Contour({
        el: '#salesChart',
        xAxis: { 
          title: "Time",
          type: 'time',
          firstAndLast: true
        },
        yAxis: {
          title: "Dollars in Sales",
          labels: { 
            formatter: function (datum) { 
              return '$' + datum 
            }
          }
        },
        tooltip: {
          showTime: 300,
          animate: true,
          distance: 0,
          formatter: function(d) { 
            return '$' + Number(d.y).toFixed(2) + ' in sales on <br>' + (number_of_days > 1 ? moment(d.x).format('dddd, MMMM Do YYYY') : moment(d.x).format('dddd, MMMM Do YYYY LT'))
          }
        },
        line: {
          animationDirection: "bottom-to-top"
        }
      })
      .cartesian()
      .line([
        {
          name: "Sales Over Time",
          data: data 
        }
      ])
      .tooltip()
      .render();
    } catch(e) {
      document.getElementById('salesChart').innerHTML = "No Data to show."
    }
  })
}