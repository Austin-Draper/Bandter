dpd.users.me(function(user) {
  if (user) {
    $(".logged-out").remove();
    $("#logout-btn").click(function() {
      dpd.users.logout(function(res, err) {
        location.href = "/";
      });
    });
  } else {
    $(".logged-in").remove();
  }
});
