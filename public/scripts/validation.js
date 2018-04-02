(function (window) {
  'use strict';
  var App = window.App || {};

  var Validation = {
    isDateAndTime: function (date) {

      var matches = value.match(/^(\d{2}).(\d{2}).(\d{4}).(\d{2}).(\d{2}).(\d{2})$/);
      if (matches === null) {
        // invalid
        return false;
      } else{
        // checking the date
        var year = parseInt(matches[3], 10);
        var month = parseInt(matches[1], 10);
        var day = parseInt(matches[2], 10) - 1; // months are 0-11
        var hour = parseInt(matches[4], 10);
        var minute = parseInt(matches[5], 10);
        var second = parseInt(matches[6], 10);
        var date = new Date(year, month, day, hour, minute, second);
        if (date.getFullYear() !== year
        || date.getMonth() != month
        || date.getDate() !== day
        || date.getHours() !== hour
        || date.getMinutes() !== minute
        || date.getSeconds() !== second
        ){
          // invalid
          return false;
        } else {
          // valid
          return true;
        }

      }
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
