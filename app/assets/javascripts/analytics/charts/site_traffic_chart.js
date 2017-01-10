function generateSiteTrafficData(number_of_days) {
  return fetchData('/analytics/site-traffic').then(function(data){
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
    data[current_website].traffic.map(function(view) {
      if (number_of_days > 1 && view.created_at.substring(0, view.created_at.indexOf("T")) in rawData) {
        rawData[view.created_at.substring(0, view.created_at.indexOf("T"))]++
      } else if (moment(view.created_at).format("YYYY-MM-DDTHH:00:00") in rawData) {
        rawData[moment(view.created_at).format("YYYY-MM-DDTHH:00:00")]++
      }
    })

    return Object.keys(rawData).map(function(key, index) {
      return {x: new Date(key), y: rawData[key]}
    }); 
  })
}

function plotSiteTrafficData(number_of_days) {
  generateSiteTrafficData(number_of_days).then(function(data){
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
            return d.y + ' total views on <br>' + moment(d.x).format('dddd, MMMM Do YYYY ( HH:mm )') 
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
