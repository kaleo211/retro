angular.module('board', [])
  .controller('BoardCtrl', function ($scope, $http, $mdToast, $mdDialog, $route, localStorageService) {
    if (!localStorageService.isSupported) {
      console.log('local storage is not supported by this browser!')
    }

    var getItems = function () {
      url = '/board/' + $scope.board.id + '/item';
      $http.get(url).then(resp => {
        $scope.items = resp.data;
      });
    };

    init = function () {
      $http.get('/board').then(resp => {
        $scope.boards = resp.data;
        if (localStorageService.get('board') == null) {
          if ($scope.boards.length > 0) {
            localStorageService.set('board', $scope.boards[0]);
          }
        }
        $scope.board = localStorageService.get('board');
        getItems();
      });
    };

    init();

    $scope.updateBoard = function () {
      if ($scope.board != null) {
        localStorageService.set('board', $scope.board);
        getItems();
        return $scope.board.name;
      }
      return "";
    };

    $scope.addItem = function (title, column) {
      var item = {
        title: title,
        column: column,
        BoardId: $scope.board.id,
        plus: 1
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

    var updateItem = function (item) {
      var url = '/board/' + $scope.board.id + '/item/' + item.id;
      $http.put(url, item).then(resp => {
        $scope.items = resp.data;
      })
    };

    $scope.crossItem = function (item) {
      item.done = true;
      updateItem(item);
    }

    $scope.plusOne = function (item) {
      item.plus += 1;
      updateItem(item);
    }

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

    $scope.addBoard = function () {
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
