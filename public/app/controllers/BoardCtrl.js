angular.module('board', [])
  .controller('BoardCtrl', function BoardCtrl($scope, $http, $mdToast, $mdDialog) {
    $scope.board = null;

    init = function () {
      $http.get('/board').then(resp => {
        $scope.boards = resp.data;
        $scope.board = resp.data[0];

        url = '/board/' + $scope.board.id + '/item';
        $http.get(url).then(resp => {
          $scope.items = resp.data;
          console.log("items: ", $scope.items.happy);
        });
      });
    };

    $scope.$on("updateBoard", function () {
      init();
    });

    init();

    $scope.addItem = function (item) {
      $http.post('/board/item', item).then(
        resp => {
          $scope.items = resp.data;
          toast('SUCCEEDED TO ADD ITEM!');
          $mdDialog.cancel();
        },
        resp => {
          toast('FAILED TO ADD ITEM!');
        });
    };

    $scope.addHappyItem = function (chip) {
      var item = {
        title: chip,
        column: 'happy',
        BoardId: $scope.board.id
      };
      $scope.addItem(item);
      return item;
    };

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
        resp => {
          $scope.board = resp.data;
          toast('SUCCEEDED TO ADD BOARD!');
          $mdDialog.cancel();
        },
        resp => {
          toast('FAILED TO ADD BOARD!')
        }
      );
    };
  });
