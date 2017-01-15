function plotSiteTrafficData(number_of_days) {
  return fetchData('/analytics/site-traffic/' + window.current_website + '/' + number_of_days).then(function(data){
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
