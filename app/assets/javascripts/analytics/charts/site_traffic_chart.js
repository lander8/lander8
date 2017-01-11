function generateSiteTrafficData(number_of_days) {
  return fetchData('/analytics/site-traffic/' + number_of_days).then(function(data){
    var rawData = generateEmptyTimeDataArray(number_of_days);

    // Loop through all dates in array, add revenue to days that we have data for
    data[current_website].traffic.map(function(view) {
      if (number_of_days > 1 && (moment(view.created_at).format("YYYY-MM-DD")) in rawData) {
        rawData[moment(view.created_at).format("YYYY-MM-DD")] += 1
      } else if (moment(view.created_at).format("YYYY-MM-DDTHH:00:00") in rawData) {
        rawData[moment(view.created_at).format("YYYY-MM-DDTHH:00:00")] += 1
      }
    })

    return generateChartAxis(rawData); 
  })
}

function plotSiteTrafficData(number_of_days) {
  return generateSiteTrafficData(number_of_days).then(function(data){
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
          title: "Number of Views"
        },
        tooltip: {
          showTime: 300,
          animate: true,
          distance: 0,
          formatter: function(d) { 
            return d.y + ' total views on <br>' + (number_of_days > 1 ? moment(d.x).format('dddd, MMMM Do YYYY') : moment(d.x).format('dddd, MMMM Do YYYY LT'))
          }
        },
        line: {
          animationDirection: "bottom-to-top"
        }
      })
      .cartesian()
      .line([
        {
          name: "Views Over Time",
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
