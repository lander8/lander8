//= require jquery
//= require jquery_ujs
//= require modals
//= require contour.min.js
//= require_tree ./charts/

$(document).ready(function(){
  var loadingTimeout;
  $(".spinner-container").hide();
  // show spinner on AJAX start
  $(document).ajaxStart(function(){
    loadingTimeout = setTimeout(function() {
      $(".spinner-container").show();
    }, 500);
  });

  // hide spinner on AJAX stop
  $(document).ajaxStop(function(){
    clearTimeout(loadingTimeout);
    $(".spinner-container").hide();
  });

  window.current_website = $($('.sites li')[0]).attr("data-website");

  plotSalesData(30);

  $('.sites li').click(function(e){
    var that = this;
    window.current_website = $(that).attr("data-website");

    plotSalesData(30).then(function(){
      setActiveInGroup(that);
      setActiveInGroup('#salesChartShow');
      setActiveInGroup('.chart-nav.sales');
      setActiveInGroup('#sales30day');
    })
  })

  // -- Sales Click Events -- //
  $('#salesChartShow').click(function(){
    var that = this;
    plotSalesData(30).then(function(){
      setActiveInGroup(that);
      setActiveInGroup('.chart-nav.sales');
      setActiveInGroup('#sales30day');
    })
  });

  $('#sales30day').click(function(){
    var that = this;
    plotSalesData(30).then(function(){
      setActiveInGroup(that);
    })
  });

  $('#sales7day').click(function(){
    var that = this;
    plotSalesData(7).then(function(){
      setActiveInGroup(that);
    })
  });

  $('#sales1day').click(function(){
    var that = this;
    plotSalesData(1).then(function(){
      setActiveInGroup(that);
    })
  });

  // -- Conversions Click Events -- //
  $('#conversionChartShow').click(function(){
    setActiveInGroup(this);
    setActiveInGroup('.chart-nav.conversions');
    plotConversionData();
  });

  // -- Site Traffic Click Events -- //
  $('#siteTrafficChartShow').click(function(){
    var that = this;
    plotSiteTrafficData(30).then(function(){
      setActiveInGroup(that);
      setActiveInGroup('.chart-nav.site-traffic');
      setActiveInGroup('#siteTraffic30day');
    })
  });

  $('#siteTraffic30day').click(function(){
    var that = this;
    plotSiteTrafficData(30).then(function(){
      setActiveInGroup(that);
    })
  });

  $('#siteTraffic7day').click(function(){
    var that = this;
    plotSiteTrafficData(7).then(function(){
      setActiveInGroup(that);
    })
  });

  $('#siteTraffic1day').click(function(){
    var that = this;
    plotSiteTrafficData(1).then(function(){
      setActiveInGroup(that);
    })
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
