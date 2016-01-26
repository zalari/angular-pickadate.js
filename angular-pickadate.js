angular.module('zalari.pickadate.datepicker', []).directive('zaPickADate', function () {
  return {
    restrict: 'E',
    template: '<input placeholder="{{placeholder}}" type="text" />',
    scope: {
      zaMinDate: '=',
      zaMaxDate: '=',
      zaPickADateOptions: '=',
      pickDate: '=ngModel',
      placeholder: '@'
    },
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelController) {

      var _internalDate = {};
      var _initial = true;

      //helper functions
      var _registerWatches = function () {

        //register watches for optional arguments... and update picker accordingly
        scope.$watch('zaMinDate', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            element.pickadate('picker').set('min', newValue ? newValue : false);
          }
        }, true);

        scope.$watch('zaMaxDate', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            element.pickadate('picker').set('max', newValue ? newValue : false);
          }
        }, true);

        scope.$watch('pickDate', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            ngModelController.$render();
          }
        }, true);



      };

      //we need to update the value for the angular side of thing, through ngModelController
      //aka this is updateAngularValue
      var _dateParser = function (viewValue) {

        //initially we have to set the control to pristine; but only once
        //furthermore do not reflect the first update back...
        if (_initial) {
          ngModelController.$setPristine();
          //ngModelController.$rollbackViewValue();
          _initial = false;
        }

        //we get the new viewValue and we need to convert it to the real js date back...
        //if the viewValue is empty, we assume, that date needs to be cleared
        if (viewValue === null) {
          return null;
        } else {

          //when the initial date has been undefined; then create a new date
          //otherwise update the old value
          if (angular.isUndefined(_internalDate)) {
            _internalDate = new Date();
          }

          _internalDate.setYear(viewValue.obj.getFullYear());
          _internalDate.setMonth(viewValue.obj.getMonth());
          _internalDate.setDate(viewValue.obj.getDate());

          return _internalDate;
        }

      };

      //setup picker, i.e. pass options
      var _setupPicker = function () {

        //N.B: this is not a deep copy...
        var options = angular.extend(scope.zaPickADateOptions || {}, {

          //set handler; a date has been selected for the datepicker
          onSet: function (e) {

            // we are coming from $watch or link setup; so exit
            //TODO: figure out, why onSet is triggered during those phases
            if (scope.$$phase || scope.$root.$$phase) {
              return;
            }

            var pickerDate = element.pickadate('picker').get('select');
            ngModelController.$setViewValue(pickerDate);
          },

          //close handler
          onClose: function () {
            element.blur();
          }
        });

        //set options on element
        element.pickadate(options);
      };

      //helper for angular -> datepicker
      var _updatePickerValue = function (dateObj) {
        if (dateObj) {
          // needs to be in milliseconds
          element.pickadate('picker').set('select', dateObj.getTime());
        } else {
          element.pickadate('picker').clear();
        }

      };

      var _init = function () {

        //the current element is the input "below" the enclosing directive element
        element = element.find('input');
        _setupPicker();

        //overwrite the $render method of ngModelController
        ngModelController.$render = function () {

          //we get called, whenever the external model changes...
          //copy it to internal date;
          //because in Angular 1.3+ $viewValue are always strings
          //-> https://github.com/angular/angular.js/commit/1eda18365a348c9597aafba9d195d345e4f13d1e
          //-> https://github.com/angular-ui/bootstrap/issues/2659
          //we need to actually re-create a real Date; when it is null / undefined, let it be undefined / null
          //_internalDate = (ngModelController.$viewValue ? new Date(ngModelController.$viewValue) : undefined);
          _internalDate = ngModelController.$modelValue;
          _updatePickerValue(_internalDate);
        };

        ngModelController.$parsers.push(_dateParser);

        //set additional options on element
        element.pickadate('picker').set('min', scope.zaMinDate ? scope.zaMinDate : false);
        element.pickadate('picker').set('max', scope.zaMaxDate ? scope.zaMaxDate : false);

        //register watches
        _registerWatches();

      };


      _init();

    }
  };
});

angular.module('zalari.pickadate.timepicker', []).directive('zaPickATime', function () {
  return {
    template: '<input placeholder="{{placeholder}}" type="text" />',
    restrict: 'E',
    scope: {
      zaPickATimeOptions: '=',
      zaMinTime: '=',
      zaMaxTime: '=',
      zaDisabledTimes: '=',
      pickTime: '=ngModel',
      placeholde: '@'
    },
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelController) {

      var _initial = true;
      var _internalDate = {};

      //helper functions

      var _registerWatches = function () {
        scope.$watch('zaMinTime', function (newValue, oldValue) {
          element.pickatime('picker').set('min', newValue ? newValue : false);
        }, true);

        scope.$watch('zaMaxTime', function (newValue, oldValue) {
          element.pickatime('picker').set('max', newValue ? newValue : false);
        }, true);

        scope.$watch('zaDisabledTimes', function (newValue, oldValue) {
          element.pickatime('picker').set('disable', newValue ? newValue : []);
        }, true);

        scope.$watch('pickTime', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            ngModelController.$render();
          }
        }, true);
      };

      var _setupTimePicker = function () {
        var options = angular.extend(scope.zaPickATimeOptions || {}, {
          onSet: function (e) {

            // we are coming from $watch or link setup; so exit
            //TODO: figure out, why onSet is triggered during those phases
            if (scope.$$phase || scope.$root.$$phase) {
              return;
            }

            var pickerDate = element.pickatime('picker').get('select');
            ngModelController.$setViewValue(pickerDate);


          },
          onClose: function () {
            element.blur();
          }
        });

        element.pickatime(options);

      };

      var _updatePickerValue = function (dateObj) {
        if (dateObj) {
          // needs to be in minutes
          var totalMins = dateObj.getHours() * 60 + dateObj.getMinutes();
          element.pickatime('picker').set('select', totalMins);
        } else {
          element.pickatime('picker').clear();
        }
      };

      //to propagate changes back to angular...
      // directive->angular
      var _timeParser = function (viewValue) {

        //initially we have to set the control to pristine; but only once
        if (_initial) {
          ngModelController.$setPristine();
          _initial = false;
        }

        //if the viewValue is null, we assume, that date needs to be cleared
        if (viewValue === null) {
          return null;
        } else {

          //when the initial date has been undefined; then create a new date
          //otherwise update the old value
          if (angular.isUndefined(_internalDate)) {
            _internalDate = new Date();
          }

          _internalDate.setHours(viewValue.hour);
          _internalDate.setMinutes(viewValue.mins);

          return _internalDate;
        }
      };


      var _init = function () {

        //the actual element is the input "below" the directive
        element = element.find('input');
        _setupTimePicker();


        ngModelController.$render = function () {
          //we get called, whenever the external model changes...
          //copy it to internal date;
          //because in Angular 1.3+ $viewValue are always strings
          //-> https://github.com/angular/angular.js/commit/1eda18365a348c9597aafba9d195d345e4f13d1e
          //-> https://github.com/angular-ui/bootstrap/issues/2659
          _internalDate = ngModelController.$modelValue;
          _updatePickerValue(_internalDate);

        };

        //process minTime + maxTime attributes
        element.pickatime('picker').set('min', scope.zaMinTime ? scope.zaMinTime : false);
        element.pickatime('picker').set('max', scope.zaMaxTime ? scope.zaMaxTime : false);

        //add parser
        ngModelController.$parsers.push(_timeParser);


        _registerWatches();
      };

      _init();

    }
  };
});
