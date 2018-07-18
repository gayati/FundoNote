ToDoApp.controller('NoteController', function($scope, $state, $mdSidenav, PostService, GetService, $timeout) {
  var baseurl = "http://localhost:9000/";

  $scope.toggleLeft = buildToggler('left');
    $scope.allNotes = [];

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }

  $scope.myFunction = function() {
    console.log("myfun");
    document.getElementById("myDiv").style.marginLeft = "200px";
}
  // var note = {
  //   title: $scope.noteTitle="hello",
  //   description: $scope.noteDesc="Ranu",
  //   color: $scope.noteDesc="sdfxd",
  //   isArchived: false,
  //   isPinned: false,
  //   isTrashed: false
  // }

  getNote();


  $scope.createNote = function() {
    var note = {
      title: $scope.noteTitle,
      description: $scope.noteDesc,
      color: "white",
      isArchived: false,
      isPinned: false,
      isTrashed: false
    }
    var url = baseurl + 'createNote';
    console.log($scope.noteTitle);
    if ($scope.noteTitle == undefined && $scope.noteDesc == undefined) {
      console.log("fdggggggg");
    } else {
      PostService.postService(note, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  }

  function getNote() {
    var url = baseurl + 'getNotes';
    GetService.getModel(url).then(function successCallback(response) {
      $scope.allNotes = response.data;
      console.log($scope.allNotes);
//       for (var i = 0; i < $scope.allNotes.length; i++) {
//           var item = $scope.allNotes[i];
//           console.log(item.isArchived);
//          if(item.isArchived === true){
//           $scope.archiveNotes = [];
//            $scope.archiveNotes.push(item);
//            console.log("in archive");
//            console.log($scope.archiveNotes);
//          }
// }
      // $scope.showNote = true;
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }




  $scope.colorList = [
    [{
      color: '#FFFFFF'
    }, {
      color: '#EC407A'
    }, {
      color: '#AB47BC'
    }, {
      color: '#82B1FF'
    }],
    [{
      color: '#64B5F6'
    }, {
      color: '#CCFF90'
    }, {
      color: '#A7FFEB'
    }, {
      color: '#FF8A80'
    }],
    [{
      color: '#D5DBDB'
    }, {
      color: '#FFD180'
    }, {
      color: '#D7C9C8'
    }, {
      color: '#F5F518'
    }]

  ];


  $scope.updateNotecolor = function(notes,color) {
    console.log("in update note" + color + notes.title + notes.description + notes.noteId + " " +notes.isArchived);
    var note = {
      title: notes.title,
      description: notes.description,
      color: color,
      isArchived: notes.isArchive,
      isPinned: false,
      isTrashed: false
    }
    var url = baseurl + 'updateNote/' + notes.noteId ;
    PostService.postService(note, url).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }

  $scope.archiveNote = function(notes,data) {
    console.log("in update note" + notes.color + notes.title + notes.description + notes.noteId + " " +notes.isArchived);
    var note = {
      title: notes.title,
      description: notes.description,
      color: notes.color,
      isArchived: data,
      isPinned: false,
      isTrashed: false
    }
    var url = baseurl + 'updateNote/' + notes.noteId ;
    PostService.postService(note, url).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }


  $scope.menuList = [{
      option: 'Delete note'
    },
    {
      option: 'Add Label'
    }
  ];


})
