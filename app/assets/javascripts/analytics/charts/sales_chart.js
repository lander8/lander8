//= require analytics/charts/helpers

// Format sales for a given time
function generateSalesData(number_of_days) {
  return fetchData('/analytics/sales').then(function(data){
    var rawData = {};

    // Generate the 30 days
    for (var i = 0; i < number_of_days; i++) {
      // Super long string formatting
      if (number_of_days > 1) {
        rawData[ (moment().subtract(i, 'days').format().substring(0, moment().subtract(i, 'days').format().indexOf("T"))) ] = 0
      } else {
        for (var j = 0; j < 24; j++) {
          rawData[ (moment().subtract(j, 'hours').format("YYYY-MM-DDTHH:00:00")) ] = 0
        }
      }
    }

    // Loop through all dates in array, add revenue to days that we have data for
    data[current_website].orders.map(function(order) {
      if (number_of_days > 1 && order.created_at.substring(0, order.created_at.indexOf("T")) in rawData) {
        rawData[order.created_at.substring(0, order.created_at.indexOf("T"))] += order.total
      } else if (moment(order.created_at).format("YYYY-MM-DDTHH:00:00") in rawData) {
        rawData[moment(order.created_at).format("YYYY-MM-DDTHH:00:00")] += order.total
      }
    })

    return Object.keys(rawData).map(function(key, index) {
      return {x: new Date(key), y: rawData[key]}
    }); 
  })
}


function plotSalesData(number_of_days) {
  generateSalesData(number_of_days).then(function(data) {
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
            return '$' + Number(d.y).toFixed(2) + ' in sales on <br>' + moment(d.x).format('dddd, MMMM Do YYYY ( HH:mm )') 
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
          data: data // An array of objects
        }
      ])
      .tooltip()
      .render();
    } catch(e) {
      document.getElementById('salesChart').innerHTML = "No Data to show."
    }
  })
}