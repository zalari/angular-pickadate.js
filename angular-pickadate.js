// pick-a-date (attribute)
angular.module('ng').directive('zaPickADate', function () {
    return {
        restrict: "A",
        scope: {
            zaPickADate: '=ngModel', // Use the model to have parent forms update their dirty and such states
            zaMinDate: '=',
            zaMaxDate: '=',
            zaPickADateOptions: '='
        },
        link: function (scope, element, attrs) {
            var options = $.extend(scope.zaPickADateOptions || {}, {
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
                        //HACK: create always a new object, to properly trigger an angular-watch
                        var tempDate = new Date(scope.zaPickADate.getTime());
                        // Interesting: getYear returns only since 1900. Use getFullYear instead.
                        // It took me half a day to figure that our. Ironically setYear()
                        // (not setFullYear, duh) accepts the actual year A.D.
                        // So as I got the $#%^ 114 and set it, guess what, I was transported to ancient Rome 114 A.D.
                        // That's it I'm done being a programmer, I'd rather go serve Emperor Trajan as a sex slave.
                        tempDate.setYear(select.obj.getFullYear());
                        tempDate.setMonth(select.obj.getMonth());
                        tempDate.setDate(select.obj.getDate());
                        scope.zaPickADate = tempDate;
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
            element.pickadate('picker').set('min', scope.zaMinDate ? scope.zaMinDate : false);
            element.pickadate('picker').set('max', scope.zaMaxDate ? scope.zaMaxDate : false);
            scope.$watch('zaPickADate', function (newValue, oldValue) {
                if (newValue == oldValue)
                    return;
                updateValue(newValue);
            }, true);
            scope.$watch('zaMinDate', function (newValue, oldValue) {
                element.pickadate('picker').set('min', newValue ? newValue : false);
            }, true);
            scope.$watch('zaMaxDate', function (newValue, oldValue) {
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
            zaPickATime: '=ngModel', // Use the model to have parent forms update their dirty and such states
            zaPickATimeOptions: '=',
            zaMinTime: '=',
            zaMaxTime: '=',
            zaDisabledTimes: '='
        },
        link: function (scope, element, attrs) {

            var options = $.extend(scope.zaPickATimeOptions || {}, {
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
                        var tempTime = new Date(scope.zaPickATime.getTime());
                        //HACK: always create a new date object, thus angularjs watches get triggered
                        // (attrs.setUtc)
                        // ? scope.zaPickATime.setUTCHours(select.hour)
                        // : scope.zaPickATime.setHours(select.hour);
                        tempTime.setHours(select.hour);
                        tempTime.setMinutes(select.mins);
                        tempTime.setSeconds(0);
                        tempTime.setMilliseconds(0);
                        scope.zaPickATime = tempTime;
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

            //additional watches
            scope.$watch('zaMinTime', function (newValue, oldValue) {
                element.pickatime('picker').set('min', newValue ? newValue : false);
            }, true);

            scope.$watch('zaMaxTime', function (newValue, oldValue) {
                element.pickatime('picker').set('max', newValue ? newValue : false);
            }, true);

            scope.$watch('zaDisabledTimes', function (newValue, oldValue) {
                element.pickatime('picker').set('disable', newValue ? newValue : []);
            }, true);

        }
    };
});