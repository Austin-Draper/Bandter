// set the correct nav button as active
$(function() {
  $("#navbar").load("nav.html", function() {
    $("#bandsNav").addClass('active');
  });
});
