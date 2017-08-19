angular.module('board', [])
  .controller('BoardCtrl', function BoardCtrl($scope, $http) {
    var init = function () {
      $http.get('/board').then(function (resp) {
        $scope.boards = resp.data;
      });
    };

    $scope.$on("updateBoard", function () {
      init();
    });

    init();
  });
