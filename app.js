var ToDoApp = angular.module('ToDoApplication', ['ui.router', 'ngMaterial', "ngMessages","content-editable",'ngSanitize','ngImgCrop',]);
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
    // .state('home.dashboard', {
    //   url: '/dashboard',
    //   templateUrl: 'Template/dashboard.view.html',
    //   controller: 'LabelController',
    // })
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
  // .state('logout', {
  // url: '/logout',
  // templateUrl: 'Template/logout.view.html',
  // controller: 'UserController'
  //   })





  $urlRouterProvider.otherwise('/login');
}]);


ToDoApp.run(function($rootScope){
  $rootScope.$on('$locationChangeStart',
function(event, toState){
    // do something
    console.log(event);
    console.log(toState);
    var path = toState.split('/');
    console.log(path[5]);

    if(path[5]!=undefined){
      if(path[5] == "dashboard"){
        $rootScope.title = "Fundoo Notes";
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
        $rootScope.title = "Label";
        $rootScope.CustomColor = {
          'backgroundcolor': 'rgb(96, 125, 139)',
          'color': 'white'
        }
      }




    }
})
})
