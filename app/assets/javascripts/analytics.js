// Clears the chart completely (for use before adding a chart in its place)
function clearPreviousChart(chartID) {
	document.getElementById(chartID).innerHTML = "";
}

// ---------- BEGIN SALES CHART ---------- //

// Format sales for past month
function monthlySalesData(data) {
  var rawData = {};

  // Generate the 30 days
  for (var i = 0; i < 30; i++) {
    // Super long string formatting
    rawData[ (moment().subtract(i, 'days').format().substring(0, moment().subtract(i, 'days').format().indexOf("T"))) ] = 0
  }

  // Loop through all dates in array, add revenue to days that we have data for
  data[current_website].orders.map(function(order) {
    if ( order.created_at.substring(0, order.created_at.indexOf("T")) in rawData ){
      rawData[order.created_at.substring(0, order.created_at.indexOf("T"))] += order.total
    }
  })

  return Object.keys(rawData).map(function(key, index) {
    return {x: new Date(key), y: rawData[key]}
  }); 
}

// Shows basic sales data for the past 30 days
function plotSalesData(data) {
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
          return '$' + d.y + ' in sales on <br>' + moment(d.x).format('dddd, MMMM Do YYYY') 
        }
      }
    })
    .cartesian()
    .line([
    	{
    		name: "Sales Over Time",
        data: monthlySalesData(data) // An array of objects
  	  }
    ])
    .tooltip()
    .render();
  } catch(e) {
    document.getElementById('salesChart').innerHTML = "No Data to show."
  }
}

// ---------- END SALES CHART ---------- //




// Shows conversion data
function plotConversionData() {
	clearPreviousChart('salesChart');

	new Contour({
    el: '#salesChart',
    xAxis: { 
    	title: "Time",
    	type: 'time',
    	firstAndLast: true
    },
    yAxis: {
    	title: "Conversions"
    },
    tooltip: {
    	showTime: 300,
    	animate: true,
    	distance: 0
    }
  })
  .cartesian()
  .line([
  	{
  		name: "Conversions Over Time",
  		data: [
		  	{ x: new Date('1/1/2000'), y: 199122},
		    { x: new Date('2/1/2000'), y: 532323},
		    { x: new Date('3/1/2000'), y: 146112},
		    { x: new Date('4/1/2000'), y: 74443},
		    { x: new Date('5/1/2000'), y: 233443},
		    { x: new Date('6/1/2000'), y: 934434},
		    { x: new Date('7/1/2000'), y: 12323},
		    { x: new Date('8/1/2000'), y: 976112},
		    { x: new Date('9/1/2000'), y: 334443},
		    { x: new Date('10/1/2000'), y: 632343},
		    { x: new Date('11/1/2000'), y: 362323},
		    { x: new Date('12/1/2000'), y: 896112}
		  ]
	  }
  ])
  .tooltip()
  .render();
}
