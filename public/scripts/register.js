$(function() {
  $("#navbar").load("nav.html");
});

$("form").submit(function() {
  var username = $("#username").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirm-password").val();

  if (!username) {
    alert("Username is required");
  } else if (!password) {
    alert("Password is required");
  } else if (password !== confirmPassword) {
    alert("Passwords do not match");
  } else {
    dpd.users.post({
      username: username,
      password: password
    }, function(user, error) {
      if (error) {
        alert(JSON.stringify(error));
      } else {
        location.href = "/login.html";
      }
    });
  }

  return false;
});
