//= require analytics/charts/helpers

// Format sales for a given time
function generateSalesData(number_of_days) {
  return fetchData(`/analytics/sales/${number_of_days}`).then(function(data){
    var rawData = generateEmptyTimeDataArray(number_of_days);

    // Loop through all dates in array, add revenue to days that we have data for
    data[current_website].orders.map(function(order) {
      if (number_of_days > 1 && (moment(order.created_at).format("YYYY-MM-DD")) in rawData) {
        rawData[moment(order.created_at).format("YYYY-MM-DD")] += order.total
      } else if (moment(order.created_at).format("YYYY-MM-DDTHH:00:00") in rawData) {
        rawData[moment(order.created_at).format("YYYY-MM-DDTHH:00:00")] += order.total
      }
    })

    return generateChartAxis(rawData);
  })
}


function plotSalesData(number_of_days) {
  return generateSalesData(number_of_days).then(function(data) {
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