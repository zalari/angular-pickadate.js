'use strict';
angular.module('pickadateExample', [])
  .controller('testController', function ($scope) {
    $scope.curDate = '';
    $scope.newDate = function () {
      return new Date();
    };
  })
  .controller('testController2', function ($scope) {
    $scope.startDate = '2014-02-24 12:00:00';
    $scope.endDate = '2014-02-27 12:00:00';
  })
  .controller('testController3', function ($scope) {
    $scope.curDate = '2014-02-24 12:00:00';
  });