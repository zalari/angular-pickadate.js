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


    <za-pick-a-date ng-model="curDate" />
    <za-pick-a-time ng-model="curDate" />

Additionaly zaMinDate, zaMaxDate for the datepicker and minTime, zaMaxTime, zaDisabledTimes and the options as well are supported! The directives are ngModelController-aware and thus, ng-required & Co. work as well.

    From: <za-pick-a-date ng-model="startDate" za-max-date="endDate" />
    To: <za-pick-a-date ng-model="endDate" za-min-date="startDate" />
    

### Options

[pickadate.js by Amsul](http://amsul.ca/pickadate.js/) has a lot of options. You can control the options 
through these directives as well.
For the pick-a-date directive use `za-pick-a-date-options`.
For the pick-a-time directive use `za-pick-a-time-options`.
Pass in an Object { ... } with all the options you can think of. They will be passed to the directive.
Example:

    <za-pick-a-date="curDate" za-pick-a-date-options="{ format: 'dd/mm/yy', selectYears: true }" />


### Examples
You can view the included [examples](./examples) after running;


    npm install
    npm run examples
   
   

### Notes

 - Version 0.5.0+ breaks everything again (you have to use ng-model now!) and enables AngularJS 1.3+ usage; you have to explicitly load this module now:
    angular.module(yourModule,['zalari.pickadate.datepicker','zalari.pickadate.timepicker'])
 - For more information on the date filter in AngularJS please visit [http://docs.angularjs.org/api/ng/filter/date].
 - Documentation needs an overhaul... bear with me!

Inspired by the blog post on: [Coding Insight](http://www.codinginsight.com/angularjs-and-pickadate/)
