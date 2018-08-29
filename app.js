var ToDoApp = angular.module('ToDoApplication', ['ui.router', 'ngMaterial', "ngMessages","content-editable",'ngSanitize','ngImgCrop','auth0.auth0']);
ToDoApp.config(['$stateProvider','$urlRouterProvider','angularAuth0Provider','$locationProvider', function($stateProvider, $urlRouterProvider,  angularAuth0Provider,$locationProvider) {
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
    .state('home.search', {
      url: '/search',
      templateUrl: 'Template/search.view.html',
      controller: 'NoteController'
    })
    .state('home.reminder', {
      url: '/reminder',
      templateUrl: 'Template/reminder.view.html',
      controller: 'NoteController'
    })
    .state('home.label', {
      url: '/label/:name',
      templateUrl: 'Template/noteLabel.view.html',
      controller: 'NoteController'
    })


//  Initialization for the angular-auth0 library
     // angularAuth0Provider.init({
     //   clientID: 'YOUR_CLIENT_ID',
     //   domain: 'undefined',
     //   responseType: localStorage.getItem('loginToken'),
     //   audience: 'https://undefined/userinfo',
     //   redirectUri: 'http://localhost:9000/home/dashboard',
     //   scope: 'openid'
     // });

    $urlRouterProvider.otherwise('/login');

    // $locationProvider.hashPrefix('');

     /// Comment out the line below to run the app
     // without HTML5 mode (will use hashes in routes)
    // $locationProvider.html5Mode(true);





}]);


ToDoApp.run(function($rootScope){
  $rootScope.$on('$locationChangeStart',
function(event, toState){
    var path = toState.split('/');
    if(path[5]!=undefined){
      if(path[5] == "dashboard"){
        $rootScope.title = "FundooNotes";
        $rootScope.CustomColor = {
          'backgroundcolor': '#fb0',
          'color': 'white'
        }
      }
      else if(path[5] == "archive"){
        $rootScope.title = "Archive";
        $rootScope.CustomColor = {
          'backgroundcolor': '#A09E98',
          'color': 'white'
        }
      }
      else if(path[5] == "reminder"){
        $rootScope.title = "Reminder";
        $rootScope.CustomColor = {
          'backgroundcolor': '#A09E98',
          'color': 'white'
        }
      }
      else if(path[5] == "trash"){
        $rootScope.title = "Trash";
        $rootScope.CustomColor = {
          'backgroundcolor': 'rgb(99, 99, 99)',
          'color': 'white'
        }
      }
      else if(path[5] == "label"){
        $rootScope.title = path[6];
        $rootScope.CustomColor = {
          'backgroundcolor': 'rgb(96, 125, 139)',
          'color': 'white'
        }
      }
      else if(path[5] == "search"){
        $rootScope.title = "FundooNotes";
        $rootScope.CustomColor = {
          'backgroundcolor': 'rgb(62, 80, 180)',
          'color': 'white'
        }
      }




    }
})
})
