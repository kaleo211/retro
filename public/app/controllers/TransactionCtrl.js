angular.module('transaction', [])
  .controller('TransactionCtrl', function TransactionCtrl($scope, $http) {
    var init = function () {
      $http.get('/transactions').then(function (resp) {
        $scope.transactions = resp.data;
      });
    };
    $scope.$on("updateTransactions", function () {
      init();
    });

    $scope.cap = function (s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    var query = {
      order: {
        field: 'date',
        order: 'desc'
      }
    };

    var search = function () {
      $http.post('/transactions/search', query).then(
        function (resp) {
          $scope.transactions = resp.data;
        }
      );
    };

    $scope.reorder = function (field) {
      console.log(field, "field");
      if (query.order.field == field) {
        query.order.order = query.order.order == 'desc' ? 'asc' : 'desc';
      }
      query.order.field = field;
      search();
    }

    $scope.focus = function (field, value) {
      query.focus = {
        field: field,
        value: value
      };
      search();
    }

    $scope.columns = ['type', 'from', 'to', 'category', 'date', 'memo'];
    init();
  })

  .controller('TransactionAddCtrl', function TransactionAddCtrl($scope, $http, $mdToast, $mdDialog, $rootScope) {
    $http.get('/members').then(function (resp) {
      $scope.members = resp.data;
    });

    $scope.init = function () {
      $scope.transaction = {
        date: new Date(),
        type: 'expense'
      };
    };
    $scope.init();

    $scope.showAddTransactionDialog = function (ev, type) {
      $scope.transaction.type = type;
      var dialogElement;
      if (type == 'expense') {
        dialogElement = '#newExpenseDialog';
      } else if (type == 'transfer') {
        dialogElement = '#newTransferDialog';
      }

      $mdDialog.show({
        contentElement: dialogElement,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      });
    };

    var toast = function (msg) {
      $mdToast.show({
        template: '<md-toast class="md-toast">' + msg + '</md-toast>',
        hideDelay: 6000,
        position: 'top right'
      });
    };

    var isEmpty = function (field) {
      if (!$scope.transaction[field]) {
        toast(field.toUpperCase() + " SHOULD NOT BE EMPTY!");
        return true;
      }
      return false;
    };

    var validateFields = function () {
      if (isEmpty("from") || isEmpty("total") || isEmpty("date")) return true;
      if ($scope.transaction.type == 'expense' && isEmpty('category')) return true;
      if ($scope.transaction.type == 'transfer' && isEmpty('to')) return true;
      return false;
    };

    $scope.submit = function () {
      event.preventDefault();
      if (validateFields()) {
        return;
      }

      $http.post('/transactions', $scope.transaction).then(
        function (resp) {
          $scope.transactions = resp.data;
          toast('SUCCESSFULLY ADDED!');
          $mdDialog.cancel();
          $rootScope.$broadcast('updateTransactions');
        },
        function (resp) {
          toast('FAILED TO SUBMIT!');
        }
      );
      $scope.init();
    };
  });
