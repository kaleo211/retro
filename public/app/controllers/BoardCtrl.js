angular.module('board', [])
  .controller('BoardCtrl', function BoardCtrl($scope, $http, $mdToast, $mdDialog) {
    var init = function () {
      $http.get('/board').then(function (resp) {
        $scope.boards = resp.data;
        console.log($scope.boards);
      });
    };

    $scope.$on("updateBoard", function () {
      init();
    });

    init();


    $scope.showNewBoardDialog = function (ev) {
      $mdDialog.show({
        contentElement: "#newBoardDialog",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      });
    };

    var toast = function (msg) {
      $mdToast.show({
        template: '<md-toast class="md-toast">' + msg + '</md-toast>',
        hideDelay: 3000,
        position: 'top right'
      });
    };

    $scope.submit = function () {
      $http.post('/board', $scope.newBoard).then(
        function(resp) {
          $scope.board = resp.data;
          toast('SUCCEEDED TO ADD!');
          $mdDialog.cancel();
        },
        function(resp) {
          toast('FAILED TO ADD!')
        }
      );
    };
  });
