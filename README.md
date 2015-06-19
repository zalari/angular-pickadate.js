angular-pickadate.js
====================

Angularjs extension for the slick date/time picker, [pickadate.js by Amsul](http://amsul.ca/pickadate.js/)

The use is very simple once you include this directive:

    <input type="text" za-pick-a-date="curDate" />
    <input type="text" za-pick-a-time="curDate" />

I went over my head for you guys and added constraints for min/max. Here is how you can use them. Merry xmas!

    From: <input type="text" za-pick-a-date="startDate" max-date="endDate" />
    To: <input type="text" za-pick-a-date="endDate" min-date="startDate" />

### Options

[pickadate.js by Amsul](http://amsul.ca/pickadate.js/) has a lot of options. You can control the options by
through these directives as well.
For the pick-a-date directive use `za-pick-a-date-options`.
For the pick-a-time directive use `za-pick-a-time-options`.
Pass in a structure like this { ... } with all the options you can think of. They will be passed to the directive.
Example:

    <input type="text" za-pick-a-date="curDate" za-pick-a-date-options="{ format: 'dd/mm/yy', selectYears: true }" />

### Notes

 - Version 0.3.0 breaks some things and enables AngularJS 1.3+ usage; you have to explicitly load this module now:
    angular.module(yourModule,['zalari.pickadate.datepicker','zalari.pickadate.timepicker'])
 - For more information on the date filter in AngularJS please visit [http://docs.angularjs.org/api/ng/filter/date].
 - Watch out for UTC times. Apparently the default way AngularJS serializes your time is with the T…Z pattern, meaning it is the time in Greenwich. 
 - Documentation needs an overhaul... bear with us!

Here is the original blog post about this piece of code: [Coding Insight](http://www.codinginsight.com/angularjs-and-pickadate/)
