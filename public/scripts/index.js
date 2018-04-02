$(function() {
  $("#navbar").load("nav.html");
});

var currentdate = new Date();
var datetime = "Last Sync: " + (currentdate.getMonth() + 1) + "/" +
  currentdate.getDate() + "/" +
  currentdate.getFullYear() + " @ " +
  currentdate.getHours() + ":" +
  currentdate.getMinutes() + ":" +
  currentdate.getSeconds();
console.log(datetime);

var myarray = [];
// getting all the objects in shows collection
dpd.shows.get(function(result, err) {
  if (err) return console.log(err);
  console.log(result);
  // store only imageURL string of the objects into array myarray
  for (var i = 0; i < result.length; i++) {
    myarray.push(result[i].imageURL); // kinda redundant but whatevs
    var idiv = document.createElement("div"); // dynamically create a div element
    if (i == 0) {
      idiv.className = "carousel-item active"; // assign class it will belong to
    } else {
      idiv.className = "carousel-item";
    }
    var elem = document.createElement("img"); // dynamically create a img element
    elem.className = "d-block w-100";
    elem.src = myarray[i];
    var ilink = document.createElement("a"); // dynamically create a link element
    ilink.href = "displayShow.html?id=" + result[i].id;
    ilink.appendChild(elem); // stuff <img> between <a> </a>
    idiv.appendChild(ilink); // stuff ^ between <div> </div>
    document.getElementById("inner").appendChild(idiv); // stuff this code into carousel
  }
  console.log(myarray);
});
