var app = angular.module('app', [
  'md.data.table',
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'transaction',
  'summary'
]);

app.controller('AppCtrl', function ($scope, $mdDialog, $window) {
  angular.element(document).ready(function () {
  });

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.reload = function () {
    $window.location.reload();
  };
});

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.otherwise({ redirectTo: '/' });
});
