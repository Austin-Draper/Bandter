var INITIAL_NUMBER_OF_SHOWS = 5;
var ADDITIONAL_SHOWS_PER_SCROLL = 5;
var FUTURE_SHOWS_ENABLED = true;
var orderedShows;
var numPastDisplayed = 0;
var numFutureDisplayed = 0;
var previousOrderedShows = [];

var dateQuery = {
  $sort: {
    date: 1
  }
}



// set the correct nav button as active
$(function() {
  $("#navbar").load("nav.html", function() {
    $("#browseShowsNav").addClass('active');
  });
});


$(function() {
  $('#searchButton').click(function() {
    var search = $('#usersSearch').val();

    let dQuery = {
      $or: [{
          showName: search
        },
        {
          bandsPlaying: search
        },
        {
          location: search
        }
      ]
    }

    dpd.shows.get(dQuery, function(result) {
      $('.well').empty();
      $.each(result, function(key, show) {
        retValue = createItem(show);
        $('.well').append(retValue);
      })
    })

    $('#usersSearch').val('');

  });
});

$('#usersSearch').keypress(function(e) {
  if (e.which == 13) { //Enter key pressed
    $('#searchButton').click(); //Trigger search button click event
  }
});


function createItem(show) {
  var time = new Date(show.date).toLocaleString();
  var htmlString =
    "<div class=\"card\">\
    <h5 class=\"card-header\"><strong>" + show.showName + "</strong> - " + show.location + "</h5>\
    <div class=\"card-body\">\
      <div class=\"card flex-row flex-wrap\">\
        <div class=\"card-header border-0\">\
          <img class=\"img-thumbnail\" src=\"" + show.imageURL + "\" alt=\"Show Title\">\
              <p><strong>" + time + "</strong></p></div>\
        <div class=\"card-block px-2\">\
          <p></p>\
          <h5 class=\"card-title\"><strong>Featuring</strong></h5>\
          <p class=\"card-text\">" + show.bandsPlaying + "</p>\
          <a href=\"displayShow.html?id=" + show.id + "\" class=\"btn btn-primary\"style=\"margin-bottom:10px;\">More Info</a>\
        </div>\
      </div>\
    </div>\
  </div>"

  return htmlString;
}




//deployd date queries suck so we're making pasta
dpd.shows.get(dateQuery, function(result, err) {
  // Current date in deployd format
  var isodate = new Date().toISOString()
  console.log(result);
  if (err) return console.log(err);
  for (var i = 0; i < result.length; i++) {

    if (result[i].date >= isodate) {

      // Split all shows so they're only today->forward
      orderedShows = result.slice(i);
      previousOrderedShows = previousOrderedShows.reverse();
      break;
    } else {
      previousOrderedShows[i] = (result[i]);
    }
  }
  futureShows();
});

function futureShows() {
  $('.well').empty();
  $.each(orderedShows, function(key, show) {

    // Hard code-y because of weird break issue
    // Iterated through all elems and that's no beuno, but :shrug:
    if (key < INITIAL_NUMBER_OF_SHOWS) {
      retValue = createItem(show);
      $('.well').append(retValue);
      numFutureDisplayed++;
    }
  });
}

function pastShows() {
  $('.well').empty();
  $.each(previousOrderedShows, function(key, show) {
    // Hard code-y because of weird break issue
    // Iterated through all elems and that's no beuno, but :shrug:
    if (key < INITIAL_NUMBER_OF_SHOWS) {
      retValue = createItem(show);
      $('.well').append(retValue);
      numPastDisplayed++;
    }
  });
}

$(function() {
  $('#toggle-event').change(function() {
    $('#console-event').html('Toggle: ' + $(this).prop('checked'))
    numFutureDisplayed = 0;
    numPastDisplayed = 0;
    // If toggling to PAST
    if (FUTURE_SHOWS_ENABLED) {
      FUTURE_SHOWS_ENABLED = false;
      pastShows();
    }
    // Toggle to FUTURE
    else {
      FUTURE_SHOWS_ENABLED = true;
      futureShows();
    }

  })
})

// Add shows on user scroll
$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {

    // Handle showing future shows
    if (FUTURE_SHOWS_ENABLED) {
      for (var start = numFutureDisplayed; numFutureDisplayed < orderedShows.length; numFutureDisplayed++) {
        if ((numFutureDisplayed - start) == ADDITIONAL_SHOWS_PER_SCROLL) {
          break;
        }
        retValue = createItem(orderedShows[numFutureDisplayed]);
        $('.well').append(retValue);
      }
      // Past shows
    } else {
      for (var start = numPastDisplayed; numPastDisplayed < previousOrderedShows.length; numPastDisplayed++) {
        if ((numPastDisplayed - start) == ADDITIONAL_SHOWS_PER_SCROLL) {
          break;
        }
        retValue = createItem(previousOrderedShows[numPastDisplayed]);
        $('.well').append(retValue);
      }
    }

  }
});
