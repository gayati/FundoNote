var ToDoApp = angular.module('ToDoApplication', ['ui.router', 'ngMaterial', "ngMessages","content-editable"]);
ToDoApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'Template/register.view.html',
      controller: 'UserController'
    })
    .state('checkEmail', {
      url: '/checkEmail',
      templateUrl: 'Template/email.view.html',
      controller: 'UserController'
    })
    .state('activateUser', {
      url: '/activateUser',
      // templateUrl: 'Template/register.view.html',
      controller: 'ActivateUserController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'Template/login.view.html',
      controller: 'UserController'
    })
    .state('forgotpassword', {
      url: '/forgotPassword',
      templateUrl: 'Template/forgotpassword.view.html',
      controller: 'UserController'
    })
    .state('resetpassword', {
      url: '/resetPassword',
      templateUrl: 'Template/resetPassword.view.html',
      controller: 'UserController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'Template/homepage.view.html',
      controller: 'NoteController'
    })
    .state('home.dashboard', {
      url: '/dashboard',
      templateUrl: 'Template/dashboard.view.html',
      controller: 'NoteController'
    })
    .state('home.archive', {
      url: '/archive',
      templateUrl: 'Template/archive.view.html',
      controller: 'NoteController'
    })
    .state('home.trash', {
      url: '/trash',
      templateUrl: 'Template/trash.view.html',
      controller: 'NoteController'
    })
  // .state('logout', {
  // url: '/logout',
  // templateUrl: 'Template/logout.view.html',
  // controller: 'UserController'
  //   })





  $urlRouterProvider.otherwise('/login');
}]);
