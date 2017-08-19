var app = angular.module('app', [
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'board'
]);

app.controller('AppCtrl', function ($scope, $mdDialog) {
  angular.element(document).ready(function () {
  });

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
});

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.otherwise({ redirectTo: '/' });
});
