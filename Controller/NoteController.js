ToDoApp.controller('NoteController', function($scope,$rootScope, $state, $mdSidenav, $mdDialog, PostService, GetService,commonService) {
  var baseurl = "http://localhost:9000/";

  $scope.toggleLeft = buildToggler('left');
  $scope.allNotes = [];
    $scope.color = "White";
    $scope.noteTitle = "";
    $scope.noteDesc = "";
    $scope.isArchived = false;
    $scope.isPinned = false;
    $scope.isTrashed = false;


//  $scope.colorList = commonService.colorList;

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
  };



    $scope.showDialogue = function(clickEvent, note) {
      $mdDialog.show({
        controller: dialogueController,
        templateUrl: 'Template/noteDialogue.view.html',
        parent: angular.element(document.body),
        targetEvent: clickEvent,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen,
        locals: {
          note: note
        }
      });
    }

    function dialogueController($scope, note) {
      $scope.note = note;
      $scope.updateNote = function(note) {
        console.log("In update note.............");
        // var title = $('#title1').html();
        // var description = $('#description1').html();
        //
        // var note = {
        //   title: $scope.noteTitle,
        //   description: $scope.noteDesc,
        //   color: note.color,
        //   isArchived:note.isArchived,
        //   isPinned: note.isPinned,
        //   isTrashed: note.isTrashed
        // }
        console.log(note);
        var url = baseurl + 'updateNote/' +note.noteId;
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

      $scope.hideDialogueBox = function () {
         $mdDialog.hide();
      }


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


  // $scope.changeNotecolor = function(color) {
  //   $scope.color = color;
  // }

  $scope.createNote = function() {
    // var title = $('#title').html();
    // var description = $('#description').html();
    var note = {
      title: $scope.noteTitle,
      description: $scope.noteDesc,
      color: $scope.color,
      isArchived: $scope.isArchived,
      isPinned: $scope.isPinned,
      isTrashed: $scope.isTrashed
    }

    console.log(note.title + "notetitle");
    var url = baseurl + 'createNote';
    if (note.title == "" &&  note.description == "") {
      console.log("title or desc undefined............");
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
    console.log("In get note");
    var url = baseurl + 'getNotes';
    GetService.getModel(url).then(function successCallback(response) {
      $scope.allNotes = response.data;
      console.log($scope.allNotes);
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


  $scope.updateNotecolor = function(noteId,notes, color) {
     console.log(noteId);
    if(noteId === undefined){
      console.log("In A");
      $scope.color = color;
    }
    else{
      console.log("In B");
    console.log("in update note" + color + notes.title + notes.description + notes.noteId + " " + notes.isArchived);
     notes.color = color
    // var note = {
    //   title: notes.title,
    //   description: notes.description,
    //   color: color,
    //   isArchived: notes.isArchived,
    //   isPinned: notes.isPinned,
    //   isTrashed: notes.isTrashed
    // }
    console.log(notes.title + "update note color");
    var url = baseurl + 'updateNote/' + notes.noteId;
    PostService.postService(notes, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }
  }

  $scope.archiveNote = function(notes) {
    if(notes === undefined){
     $scope.isArchived  = true;
   }else if(notes.isArchived === false){
     console.log("In archived false");
    console.log("in update note" + notes.color + notes.title + notes.description + notes.noteId + " " + notes.isArchived);
    notes.isArchived = true;
    notes.isPinned=false;
    var url = baseurl + 'updateNote/' + notes.noteId;
    PostService.postService(notes, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }else{
    notes.isArchived = false;
    var url = baseurl + 'updateNote/' + notes.noteId;
    PostService.postService(notes, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }
}


  $scope.menuList = [{
      option: 'Delete note'
    },
    {
      option: 'Add Label'
    }
  ];


  $scope.trashMenuList = [{
      option: 'Delete forever'
    },
    {
      option: 'Restore'
    }
  ];

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

  $scope.ctrlNote = function(index, notes) {
    console.log("in ctrl note");
    if (index == 0) {
      console.log("index");
      trashNote(notes, true)
    }
  }

  var trashNote = function(notes, data) {
    // var note = {
    //   title: notes.title,
    //   description: notes.description,
    //   color: notes.color,
    //   isArchived: notes.isArchived,
    //   isPinned: notes.isPinned,
    //   isTrashed: data
    // }
    notes.isTrashed = data;
    var url = baseurl + 'updateNote/' + notes.noteId;
    PostService.postService(notes, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }


  $scope.ctrltrashNote = function(index, notes) {
    console.log("in ctrl trash");
    if (index == 0) {
      console.log("index");
      deleteNoteforever(notes.noteId)
    }
    if (index == 1) {
      restoreNote(notes, false)
    }
  }

  var deleteNoteforever = function(noteId) {
    console.log("In delte forever");
    var url = baseurl + 'deleteNote/' + noteId;
    var note = {};
    PostService.postService(note, url).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }

  var restoreNote = function(notes, data) {
    // var note = {
    //   title: notes.title,
    //   description: notes.description,
    //   color: notes.color,
    //   isArchived: notes.isArchived,
    //   isPinned: notes.isPinned,
    //   isTrashed: data
    // }
    notes.isTrashed = data;
    var url = baseurl + 'updateNote/' + notes.noteId;
    PostService.postService(note, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }



  $scope.logoutCard = false;
  $scope.logOut = function() {
    if ($scope.logoutCard === false) {
      $scope.logoutCard = true;
    } else {
      $scope.logoutCard = false;
    }
  }

  $scope.updatePin = function(notes) {
    if(notes === undefined){
      $scope.isPinned = true;
    }
    else if (notes.isPinned === false || notes.isArchived === true) {
      console.log("In update false");
      console.log("in update note" + notes.color + notes.title + notes.description + notes.noteId + " " + notes.isArchived);
      notes.isPinned = true;
      notes.isArchived = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      PostService.postService(notes, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }else{
    console.log("In update true");
    console.log("in update note" + notes.color + notes.title + notes.description + notes.noteId + " " + notes.isArchived);
    notes.isPinned = false;
    var url = baseurl + 'updateNote/' + notes.noteId;
    PostService.postService(notes, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
}
}



});
