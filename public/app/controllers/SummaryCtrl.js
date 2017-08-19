angular.module('summary', [])
  .controller('SummaryCtrl', function SummaryCtrl($scope, $http) {
    var init = function() {
      $http.get('/summary').then(function (resp) {
        $scope.debts = resp.data;
      });
    }

    init();
  });
