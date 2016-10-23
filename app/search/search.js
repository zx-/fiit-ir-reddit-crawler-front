'use strict';

angular.module('myApp.search', ['ngRoute','ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl',
    controllerAs: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', [
  '$scope',
  function($scope) {

    $scope.sort = "_score";
    $scope.order = "desc";
    $scope.notQuery = "";
    $scope.orQuery = "";

    function scoreQ(querystring){
        return ejs.FunctionScoreQuery()
            .query(ejs.MultiMatchQuery(
                ["domain", "comments.text", "subreddit.name^2", "title^4", "user-text^3" ],
                querystring)
                .type("most_fields")
                .operator("and"))
            .function(ejs.ScriptScoreFunction()
                .script("(doc['score'].value / log(doc['subreddit.sub-count'].value))/300"))
            .boostMode("sum")
            .scoreMode("sum");
    }

    $scope.queryFn = function(querystring,notQuery,orQuery) {
        var boolQ = null;

        if(orQuery.length > 0) {
            boolQ =  ejs.BoolQuery()
                .should(scoreQ(querystring))
                .should(scoreQ(orQuery));
        }

        if(notQuery.length > 0) {
            boolQ = boolQ || ejs.BoolQuery().must(scoreQ(querystring));
            boolQ.mustNot(ejs.MultiMatchQuery(
                    ["domain", "comments.text", "subreddit.name", "title", "user-text" ],
                    notQuery));
        }

        return boolQ || scoreQ(querystring);
    }

}]);