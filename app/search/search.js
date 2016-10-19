'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl',
    controllerAs: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', [
  '$scope',
  function($scope) {

    $scope.aa = function(source) {
      console.log(source);
    }

}]);