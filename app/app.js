'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.search',
  'myApp.version',
  'elasticui',
  'ngSanitize'
]).
config([
  '$locationProvider',
  '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'});
}]).constant('euiHost', 'http://rarcoo.synology.me:9200');
