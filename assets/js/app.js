'use strict';

window.app = angular.module('AngularElectronTemplate', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'angularAwesomeSlider']);

var d3 = require('d3')

app.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});