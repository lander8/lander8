$(document).ready(function(){
	$('#report-bug').click(function(){
    $('#bugReportModal').modal('show');
  });

  $('#bugReportModal #submit').click(function(e){
  	e.preventDefault();

  	$.ajax({
			type: "POST",
			url: '/report-bug',
			data: $("#bugReportModal form").serialize(),
			success: function(data)
			{
				$('#bugReportModal').modal('hide');
				successModal("Success!", "Your report was submitted. Thanks for helping make Lander8 better!")	
			}
  	});
  })

	$('#contact').click(function(){
    $('#contactModal').modal('show');
  });

  $('#contactModal #submit').click(function(e){
  	e.preventDefault();

  	$.ajax({
			type: "POST",
			url: '/send-contact',
			data: $("#contactModal form").serialize(),
			success: function(data)
			{
				$('#contactModal').modal('hide');
				successModal("Success!", "Your email was sent. Please allow up to 5 business days for a reply.");				
			}
  	});
  })
})

function successModal(header, body) {
	$('body').append(
		"<div class='modal fade' id='successModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>" +
		  "<div class='modal-dialog' role='document'>" +
		    "<div class='modal-content'>" +
		      "<div class='modal-header'>" +
		        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
		        "<h4 class='modal-title' id='myModalLabel'>" + header + "</h4>" +
		      "</div>" +
		      "<div class='modal-body'>" +
		        "<p>" + body + "</p>" +
		      "</div>" +
		      "<div class='modal-footer'>" +
		      	"<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
		      "</div>" +
		    "</div>" +
		  "</div>" +
		"</div>"
	);
	$('#successModal').modal('show');
}