function testController($scope) {
    $scope.curDate = '';
    $scope.newDate = function() {
        return new Date();
    };
}

function testController2($scope) {
    $scope.startDate = '2014-02-24 12:00:00';
    $scope.endDate = '2014-02-27 12:00:00';
}

function testController3($scope) {
    $scope.curDate = '2014-02-24 12:00:00';
}