// set the correct nav button as active
$(function() {
  $("#navbar").load("nav.html", function() {
    $("#browseShowsNav").addClass('active');
  });
});

//http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

var id = GetURLParameter("id");

console.log(id);

dpd.shows.get(id, function(result, err) {
  if (err) return console.log(err);
  //console.log(result, result.id);
  console.log(result);
  var date = new Date(result.date).toLocaleString();

  $("#displayShow").append("<h1 class='display-3'>" + result.showName + "</h1>");
  $("#displayShow").append("<p class='lead'>Featuring: " + result.bandsPlaying + "</p>");

  $("#displayShow").append("<img style='max-height:400px;' src='" + result.imageURL + "' alt='Show Image'>");
  $("#displayShow").append("<hr class='my-4'><p>" + result.location + " | " + date + "</p>");

});
var query = {
  "showID": id
};

function displaySingleComment(comment){
  var node = document.getElementById('nodeID');
  var date = new Date(comment.datetime).toLocaleString();
  var commentCardHTML = "<div class='card'>\
    <div class='card-header'><cite>" + date + "</cite></div>\
    <div class='card-body'>\
      <blockquote class='blockquote mb-0'>\
        <p>" + comment.comment + "</p>\
        <footer class='blockquote-footer'>" + comment.user + "</footer>\
      </blockquote>\
    </div>\
  </div>";

  $("#node-id").prepend(commentCardHTML);
}

function displayAllComments(){

 dpd.comments.get(query, function(result, err) {
   if (err) return console.log(err);
   //console.log(result, result.id);
   console.log(result);
   $.each(result, function(key, comments) {
      displaySingleComment(comments);
   })
 });
}

displayAllComments();

function addComment() {
 var usercomment = $("#example").val();
 document.getElementById("example").value= "";
 console.log(usercomment);
 var id = GetURLParameter("id");
 var date = new Date();
 var user = dpd.users.me(function(me) {
   dpd.comments.post({
     "user": me.username,
     "rating": 3,
     "comment": usercomment,
     "datetime": date,
     "showID": id
   })
   displaySingleComment({datetime: date, comment: usercomment, user:me.username});
 });
}
