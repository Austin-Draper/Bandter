(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selecotr: " + selector);
    }
  }

  FormHandler.prototype.addInputHandler = function (fn) {
      console.log('Setting input handler for form');
      this.$formElement.on('input', '[name="dateTime"]', function (event) {
        // Event handler code will go here
        var dateAndTime = event.target.value;
        var message = '';
        if (fn(dateAndTime)) {
        event.target.setCustomValidity('');
        } else {
        message = dateAndTime + ' is not an authorized input!'
        event.target.setCustomValidity(message);
      }
      });
    };

  FormHandler.prototype.addSubmitHandler = function(fn) {
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;

      });
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
