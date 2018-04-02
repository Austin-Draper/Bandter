// set the correct nav button as active
$(function() {
  $("#navbar").load("nav.html", function() {
    $("#addShowNav").addClass('active');
  });
});

$("form").submit(function(e) {
  e.preventDefault();

  var showName = $("#showName").val();
  var bandsPlaying = $("#bands").val().split(",");
  var location = $("#location").val();
  var date = $("#dateTime").val();
  var imageURL = $("#imageURL").val();

  dpd.shows.post({
    "showName": showName,
    "bandsPlaying": bandsPlaying,
    "location": location,
    "date": date,
    "imageURL": imageURL
  }, function(result, err) {
    if (err) return console.log(err);
    console.log(result, result.id);
    window.location.href = "displayShow.html?id=" + result.id;
  });
});


//todo on submit should navigate to the display show page
