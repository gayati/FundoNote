 ToDoApp.controller('HomeController', function($scope, $state, $mdDialog, PostService,$mdSidenav,GetService ) {
   var baseurl = "http://localhost:9000/";

   $scope.showDialogue = function(clickEvent, notes) {
     console.log(notes.noteId + ":In show dialogue");
     $mdDialog.show({
       controller: dialogueController,
       templateUrl: 'Template/noteDialogue.view.html',
       parent: angular.element(document.body),
       targetEvent: clickEvent,
       clickOutsideToClose: true,
       fullscreen: $scope.customFullscreen,
       locals: {
         note: notes
       }
     });
   }

   function dialogueController($scope, note) {
     console.log("In dialiogue " + note.title);
     $scope.notes = note;
     $scope.updateNote = function(note) {
       console.log("In update note.............");
       console.log(note);
       var url = baseurl + 'updateNote/' + note.noteId;
       PostService.postService(note, url).then(function successCallback(response) {
         console.log(response);
         getNote();
       }, function errorCallback(response) {
         console.log("error" + response.data);
       })
     }

     // $scope.updateDialogueNotecolor = function (data,notes,color) {
     //   console.log("IN update dialogue");
     //   $scope.$parent.updateNotecolor(data,notes,color);
     // }

     $scope.hideDialogueBox = function() {
       $mdDialog.hide();
     }
   }

   $scope.changeColor = function() {
     if ($state.is('home.dashboard')) {
       $scope.title = "Fundoo Notes";
       $scope.CustomColor = {
         'backgroundcolor': '#fb0',
         'color': 'black'
       }
     } else if ($state.is('home.archive')) {
       $scope.title = "Archive";
       $scope.CustomColor = {
         'backgroundcolor': '#A09E98',
         'color': 'white'
       }
     } else if ($state.is('home.trash')) {
       $scope.title = "Trash";
       $scope.CustomColor = {
         'backgroundcolor': 'rgb(99, 99, 99)',
         'color': 'white'
       }
     }
   };
   $scope.changeColor();

   $scope.showLabel = function(clickEvent) {
     console.log("In show label");
     $mdDialog.show({
       controller: LabelController,
       templateUrl: 'Template/label.view.html',
       parent: angular.element(document.body),
       targetEvent: clickEvent,
       clickOutsideToClose: true,
       fullscreen: $scope.customFullscreen
     });
   };


   function LabelController($scope, $mdDialog) {

     console.log("In close fun");
     $scope.labelId = 0;
     $scope.label = "";
     $scope.userId = 0;

       function getLabel() {
         var url = baseurl + 'getLabels';
         GetService.getModel(url).then(function successCallback(response) {
           $scope.allLabels = response.data;
           console.log($scope.allLabels);
         }, function errorCallback(response) {
           console.log("error" + response.data);
         })
       }

       getLabel();

       $scope.addLabel = function() {
         var label = {
         labelId:   $scope.labelId,
         label : $scope.label,
         userId:  $scope.userId
         }
         console.log("In addlabel" + label);
         var url = baseurl + 'addLabel';
         if (label.label == "" ) {
           console.log("label undefined............");
         } else {
           PostService.postService(label, url).then(function successCallback(response) {
             console.log(response);
               getLabel();
           }, function errorCallback(response) {
             console.log("error" + response.data);
           })
         }
       }

   }

   $scope.toggleLeft = buildToggler('left');

   function buildToggler(componentId) {
     return function() {
       $mdSidenav(componentId).toggle();
       //$mdSidenav.isOpen = false;
       if ($mdSidenav(componentId).isOpen()) {
         document.getElementById("myDiv").style.marginLeft = "200px";
       } else {
         document.getElementById("myDiv").style.marginLeft = "0px";
       }
     };
   }



   $scope.goToArchive = function() {
     $state.go('home.archive')
   };

   $scope.goTotrash = function() {
     $state.go('home.trash')
   };

   $scope.goToDashboard = function() {
     $state.go('home.dashboard')
   };

   $scope.goToLogin = function() {
     $state.go('login')
   }


   $scope.logoutCard = false;
   $scope.logOut = function() {
     if ($scope.logoutCard === false) {
       $scope.logoutCard = true;
     } else {
       $scope.logoutCard = false;
     }
   }

 });
