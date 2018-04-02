  $(function() {
    $("#navbar").load("nav.html");
  });

  dpd.users.me(function(user) {
    if (user) {
      location.href = "/index.html";
    }
  });

  $("form").submit(function() {
    var username = $("#username").val();
    var password = $("#password").val();

    dpd.users.login({
      username: username,
      password: password
    }, function(session, error) {
      if (error) {
        alert(error.message);
      } else {
        location.href = "/index.html";
      }
    });

    return false;
  });
