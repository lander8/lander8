function fetchData(url){
  return $.ajax({
    type: 'GET',
    url: url,
  })
}

// Clears the chart completely (for use before adding a chart in its place)
function clearPreviousChart(chartID) {
	document.getElementById(chartID).innerHTML = "";
}

// Sets any given element as the active one in the group
function setActiveInGroup(element) {
  $(element).siblings().removeClass("active");
  $(element).addClass('active');
}

// Used for time based chart
function generateEmptyTimeDataArray(number_of_days) {
	var rawData = {}
	// Generate the 30 days
  for (var i = 0; i < number_of_days; i++) {
    // Super long string formatting
    if (number_of_days > 1) {
      rawData[ (moment().subtract(i, 'days').format("YYYY-MM-DD")) ] = 0
    } else {
      for (var j = 0; j < 24; j++) {
        rawData[ (moment().subtract(j, 'hours').format("YYYY-MM-DDTHH:00:00")) ] = 0
      }
    }
  }

  return rawData;
}

// The X and Y axis objects
function generateChartAxis(rawData) {
	return Object.keys(rawData).map(function(key, index) {
    return {x: moment(key)._d, y: rawData[key]}
  }); 
}