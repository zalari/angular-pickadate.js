// pick-a-date (attribute)
angular.module('ng').directive('zaPickADate', function () {
    return {
        restrict: "A",
        scope: {
            zaPickADate: '=',
            minDate: '=',
            maxDate: '=',
			pickADateOptions: '='
        },
        link: function (scope, element, attrs) {
			var options = $.extend(scope.pickADateOptions || {}, {
				onSet: function (e) {
                    if (scope.$$phase || scope.$root.$$phase) // we are coming from $watch or link setup
                        return;
                    var select = element.pickadate('picker').get('select'); // selected date
                    scope.$apply(function () {
                        if (e.hasOwnProperty('clear')) {
                            scope.zaPickADate = null;
                            return;
                        }
                        if (!scope.zaPickADate)
                            scope.zaPickADate = new Date(0);
                        scope.zaPickADate.setYear(select.obj.getFullYear());
                        // Interesting: getYear returns only since 1900. Use getFullYear instead.
						// It took me half a day to figure that our. Ironically setYear()
						// (not setFullYear, duh) accepts the actual year A.D.
                        // So as I got the $#%^ 114 and set it, guess what, I was transported to ancient Rome 114 A.D.
                        // That's it I'm done being a programmer, I'd rather go serve Emperor Trajan as a sex slave.
                        scope.zaPickADate.setMonth(select.obj.getMonth());
                        scope.zaPickADate.setDate(select.obj.getDate());
                    });
                },
                onClose: function () {
                    element.blur();
                }
			});
            element.pickadate(options);
            function updateValue(newValue) {
                if (newValue) {
                    scope.zaPickADate = (newValue instanceof Date) ? newValue : new Date(newValue);
                    // needs to be in milliseconds
                    element.pickadate('picker').set('select', scope.zaPickADate.getTime());
                } else {
                    element.pickadate('picker').clear();
                    scope.zaPickADate = null;
                }
            }
            updateValue(scope.zaPickADate);
            element.pickadate('picker').set('min', scope.minDate ? scope.minDate : false);
            element.pickadate('picker').set('max', scope.maxDate ? scope.maxDate : false);
            scope.$watch('zaPickADate', function (newValue, oldValue) {
                if (newValue == oldValue)
                    return;
                updateValue(newValue);
            }, true);
            scope.$watch('minDate', function (newValue, oldValue) {
                element.pickadate('picker').set('min', newValue ? newValue : false);
            }, true);
            scope.$watch('maxDate', function (newValue, oldValue) {
                element.pickadate('picker').set('max', newValue ? newValue : false);
            }, true);
        }
    };
});

// pick-a-time (attribute)
angular.module('ng').directive('zaPickATime', function () {
    return {
        restrict: "A",
        scope: {
            zaPickATime: '=',
			pickATimeOptions: '=',
            zaMinTime: '=',
            zaMaxTime: '='
        },
        link: function (scope, element, attrs) {
			var options = $.extend(scope.pickATimeOptions || {}, {
				onSet: function (e) {
                    if (scope.$$phase || scope.$root.$$phase) // we are coming from $watch or link setup
                        return;
                    var select = element.pickatime('picker').get('select'); // selected date
                    scope.$apply(function () {
                        if (e.hasOwnProperty('clear')) {
                            scope.pickATime = null;
                            return;
                        }
                        if (!scope.zaPickATime)
                            scope.zaPickATime = new Date(0);
                        // (attrs.setUtc)
                            // ? scope.zaPickATime.setUTCHours(select.hour)
                            // : scope.zaPickATime.setHours(select.hour);
                        scope.zaPickATime.setHours(select.hour);
                        scope.zaPickATime.setMinutes(select.mins);
                        scope.zaPickATime.setSeconds(0);
                        scope.zaPickATime.setMilliseconds(0);
                    });
                },
                onClose: function () {
                    element.blur();
                }
			});
            element.pickatime(options);
            function updateValue(newValue) {
                if (newValue) {
                    scope.zaPickATime = (newValue instanceof Date) ? newValue : new Date(newValue);
                    // needs to be in minutes
                    var totalMins = scope.zaPickATime.getHours() * 60 + scope.zaPickATime.getMinutes();
                    element.pickatime('picker').set('select', totalMins);
                } else {
                    element.pickatime('picker').clear();
                    scope.zaPickATime = null;
                }
            }
            updateValue(scope.zaPickATime);
            //process minTime + maxTime attributes
            element.pickatime('picker').set('min', scope.zaMinTime ? scope.zaMinTime : false);
            element.pickatime('picker').set('max', scope.zaMaxTime ? scope.zaMaxTime: false);
            //Watcher for 2-way data binding for directive itself
            scope.$watch('zaPickATime', function (newValue, oldValue) {
                if (newValue == oldValue)
                    return;
                updateValue(newValue);
            }, true);
            //additional watches for the minTime and maxTime attributes
            scope.$watch('zaMinTime', function (newValue, oldValue) {
                element.pickatime('picker').set('min', newValue ? newValue : false);
            }, true);
            scope.$watch('zaMaxTime', function (newValue, oldValue) {
                element.pickatime('picker').set('max', newValue ? newValue : false);
            }, true);

        }
    };
});