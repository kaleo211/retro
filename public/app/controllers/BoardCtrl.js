angular.module('board', [])
  .controller('BoardCtrl', function BoardCtrl($scope, $http, $mdToast, $mdDialog, $route) {
    $scope.board = null;

    var getItems = function () {
      url = '/board/' + $scope.board.id + '/item';
      $http.get(url).then(resp => {
        $scope.items = resp.data;
      });
    };

    init = function () {
      $http.get('/board').then(resp => {
        $scope.boards = resp.data;
        $scope.board = resp.data[0];
        getItems();
      });
    };

    $scope.$on("updateBoard", function () {
      init();
    });

    init();

    $scope.addItem = function (title, column) {
      var item = {
        title: title,
        column: column,
        BoardId: $scope.board.id
      };

      $http.post('/board/item', item).then(
        resp => {
          $scope.items = resp.data;
          $scope.title = "";
          toast('SUCCEEDED TO ADD ITEM!');
        },
        resp => {
          toast('FAILED TO ADD ITEM!');
        });
    };

    $scope.checkItem = function (id) {
      var url = '/board/' + $scope.board.id + '/item/' + id;
      $http.put(url).then(
        resp => {
          $scope.items = resp.data;
          toast('SUCCEEDED TO UPDATE ITEM!');
        },
        resp => {
          toast('FAILED TO UPDATE ITEM!');
        });
    };

    $scope.deleteItem = function (id) {
      var url = '/board/' + $scope.board.id + '/item/' + id;
      $http.delete(url).then(
        resp => {
          $scope.items = resp.data;
          toast('SUCCEEDED TO DELETE ITEM!');
        },
        resp => {
          toast('FAILED TO DELETE ITEM!');
        });
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
