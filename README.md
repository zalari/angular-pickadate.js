angular-pickadate.js
====================

AngularJS 1.3+ extension for the slick date/time picker, [pickadate.js by Amsul](http://amsul.ca/pickadate.js/)

The use is very simple once you require and load the directive this directive with something like:
```
...

angular
  .module('yourModule', [
    'zalari.pickadate.datepicker',
    'zalari.pickadate.timepicker'
  ]);
...

```

You can use it like that:


    <input type="text" za-pick-a-date ng-model="curDate" />
    <input type="text" za-pick-a-time ng-model="curDate" />

Additionaly minDate, maxDate for the datepicker and minTime, maxTime, disabledTime and the options as well are supported! Everything is prefixed with za- .

    From: <input type="text" za-pick-a-date ng-model="startDate" za-max-date="endDate" />
    To: <input type="text" za-pick-a-date ng-model="endDate" za-min-date="startDate" />
    

### Options

[pickadate.js by Amsul](http://amsul.ca/pickadate.js/) has a lot of options. You can control the options by
through these directives as well.
For the pick-a-date directive use `za-pick-a-date-options`.
For the pick-a-time directive use `za-pick-a-time-options`.
Pass in a structure like this { ... } with all the options you can think of. They will be passed to the directive.
Example:

    <input type="text" za-pick-a-date="curDate" za-pick-a-date-options="{ format: 'dd/mm/yy', selectYears: true }" />

### Notes

 - Version 0.4.0 breaks everything (you have to use ng-model now!) and enables AngularJS 1.3+ usage; you have to explicitly load this module now:
    angular.module(yourModule,['zalari.pickadate.datepicker','zalari.pickadate.timepicker'])
 - For more information on the date filter in AngularJS please visit [http://docs.angularjs.org/api/ng/filter/date].
 - Documentation needs an overhaul... bear with me!

Inspired by the blog post on: [Coding Insight](http://www.codinginsight.com/angularjs-and-pickadate/)
