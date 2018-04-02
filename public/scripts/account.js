// set the correct nav button as active
$(function() {
  $("#navbar").load("nav.html", function() {
    $("#accountNav").addClass('active');
  });
});

dpd.users.me(function(user) {
  if (user) {
    $(".username").text(user.username);
  }
});
