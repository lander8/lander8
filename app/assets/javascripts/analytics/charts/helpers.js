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