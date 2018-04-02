function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-add-show="form"]';
  var App = window.App;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function (data) {
    console.log(formHandler);
  });
  formHandler.addInputHandler(Validation.isDateAndTime)

})(window);
