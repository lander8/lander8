//= require jquery
//= require jquery_ujs
//= require modals
//= require contour.min.js
//= require_tree ./charts/

$(document).ready(function(){
  window.current_website = $($('.sites li')[0]).attr("data-website");

  plotSalesData(30);

  $('.sites li').click(function(e){
    setActiveInGroup(this);
    window.current_website = $(this).attr("data-website");
    setActiveInGroup('#salesChartShow');
    setActiveInGroup('.chart-nav.sales');
    setActiveInGroup('#sales30day');
    plotSalesData(30);
  })

  // -- Sales Click Events -- //
  $('#salesChartShow').click(function(){
    setActiveInGroup(this);
    setActiveInGroup('.chart-nav.sales');
    setActiveInGroup('#sales30day');
    plotSalesData(30);
  });

  $('#sales30day').click(function(){
    setActiveInGroup(this);
    plotSalesData(30);
  });

  $('#sales7day').click(function(){
    setActiveInGroup(this);
    plotSalesData(7);
  });

  $('#sales1day').click(function(){
    setActiveInGroup(this);
    plotSalesData(1);
  });

  // -- Conversions Click Events -- //
  $('#conversionChartShow').click(function(){
    setActiveInGroup(this);
    setActiveInGroup('.chart-nav.conversions');
    plotConversionData();
  });

  // -- Site Traffic Click Events -- //
  $('#siteTrafficChartShow').click(function(){
    setActiveInGroup(this);
    setActiveInGroup('.chart-nav.site-traffic');
    setActiveInGroup('#siteTraffic30day');
    plotSiteTrafficData(30);
  });

  $('#siteTraffic30day').click(function(){
    setActiveInGroup(this);
    plotSiteTrafficData(30);
  });

  $('#siteTraffic7day').click(function(){
    setActiveInGroup(this);
    plotSiteTrafficData(7);
  });

  $('#siteTraffic1day').click(function(){
    setActiveInGroup(this);
    plotSiteTrafficData(1);
  });
});

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
    },
    line: {
      animationDirection: "bottom-to-top"
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
