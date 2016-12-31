$(document).ready(function(){
	new Contour({
    el: '.salesChart',
    xAxis: { 
    	title: "Time",
    	type: 'time',
    	firstAndLast: true
    },
    yAxis: {
    	title: "Dollars in Sales"
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
  		name: "Sales Over Time",
  		data: [
		  	{ x: new Date('1/1/2000'), y: 5},
		    { x: new Date('2/1/2000'), y: 3},
		    { x: new Date('3/1/2000'), y: 6},
		    { x: new Date('4/1/2000'), y: 7},
		    { x: new Date('4/2/2000'), y: 4},
		    { x: new Date('4/30/2000'), y: 2}
		  ]
	  }
  ])
  .tooltip()
  .render();
})