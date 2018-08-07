ToDoApp.controller('NoteController', function($scope, $rootScope, $state, $mdPanel, $mdSidenav, $mdDialog,
  PostService, GetService, PutService, DeleteService, commonService, $timeout) {
  var baseurl = "http://localhost:9000/";


  $scope.allNotes = [];
  $scope.color = "White";
  $scope.noteTitle = "";
  $scope.noteDesc = "";
  $scope.isArchived = false;
  $scope.isPinned = false;
  $scope.isTrashed = false;
  //  $scope.tempDate = '';
  //  $scope.remindertime = "";



  getNote();

  $scope.noteLabels = [];

  $scope.ctrlNote = function(clickEvent, index, notes) {
    console.log("in ctrl note");
    if (index == 0) {
      console.log("index");
      trashNote(notes)
    }
    if (index == 1) {
      $scope.showAddlabelDialogue(clickEvent, notes);
    }
  }


  $scope.showAddlabelDialogue = function(clickEvent, note) {
    console.log("In add label dialgue");
    console.log(note);
    $mdDialog.show({
      locals: {
        label: $scope.allLabels,
        note1: note
      },
      controller: addLabelController,
      templateUrl: 'Template/addlabel.view.html',
      parent: angular.element(document.body),
      targetEvent: clickEvent,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen
    });
  }

  var addLabelController = function($scope, $rootScope, label, note1) {
    console.log("In add labelcontroller");
    $scope.label1 = label;
    $scope.note = note1;
    $scope.selected = [];
    console.log(note1);

    $scope.exists = function(item, list) {

      return list.indexOf(item) > -1;
    };



    $scope.toggle = function(label, note, list) {
      var idx = list.indexOf(label);
      if (idx > -1) {
        // list.splice(idx, 1);
      } else {
        $scope.addNoteLabel(note, label);
      }
    };

    // $scope.checkLabels = function($event,note,labelObject){
    // 	 $scope.value;
    // 	  console.log("checking labels...");
    // 	  for(var i = 0; i < note.labels.length ; i++){
    // 		  if(note.labels[i].labelId == labelObject.label){
    // 			  console.log("found label")
    // 			  $scope.value="true";
    // 		  }else{
    // 			  console.log("label not found..!!!")
    // 			  $scope.value="false";
    // 		  }
    // 	  }
    //   }

    // $scope.editChange = function(isChecked,note,label,$index){
    //  	 console.log(isChecked)
    //  	 console.log(note)
    //  	 console.log(label)
    //    if(isChecked){
    //   	 console.log("calling method..!!")
    //   	 $scope.addLabelToNote(note,label);
    //    }else if(!isChecked){
    //   	 console.log("calling delete method...");
    //   	// $scope.deleteLabelFromNote(note,label,$index);
    //    }
    // }

    $scope.addNoteLabel = function(note, label) {
      console.log("in add method");
      var noteLabel = {}
      noteLabel.noteId = note.noteId,
        noteLabel.labelId = label.labelId

      console.log("In addlabel" + label);
      var url = baseurl + 'addnoteLabel';
      console.log(url);
      PostService.postService(noteLabel, url).then(function successCallback(response) {
        console.log(response);
        getNoteLabel(noteLabel.noteId);
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  }

  var getNoteLabel = function(noteId) {
    console.log("In getlabel" + noteId);
    var url = baseurl + 'getNoteLabels/' + noteId;
    console.log(url);
    GetService.getModel(url).then(function successCallback(response) {
      console.log("In get service of getNoteLabel");
      var noteLabels = response.data;
      return noteLabels;
      console.log("In get note label.........." + $scope.noteLabels);
      //console.log("In get note label.........." + $scope.noteLabels.labelId);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })


  }

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
    } else if ($state.is('home.reminder')) {
      $scope.title = "Reminder";
      $scope.CustomColor = {
        'backgroundcolor': 'rgb(96, 125, 139)',
        'color': 'white'
      }
    }
  };
  $scope.changeColor();



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

  $scope.goToReminder = function() {
    console.log("jkggggggg");
    $state.go('home.reminder')
  }


  // function tokenDecode(str) {
  //   var output = str.replace('-', '+').replace('_', '/');
  //   return window.atob(output);
  // }

  // $scope.getProfileInfo = function () {
  //
  // }



  var userInfo = "";

  function getUser() {
    console.log("In get User");
    var url = baseurl + 'getUser';
    GetService.getModel(url).then(function successCallback(response) {
      console.log("success" + response.data.id);
      $scope.userInfo = response.data;
      userInfo = $scope.userInfo;
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })

    return userInfo;
  }

  getUser();

  $scope.logoutCard = false;
  $scope.logOut = function() {
    if ($scope.logoutCard === false) {
      $scope.logoutCard = true;
      getUser();
      //var token = localStorage.getItem("loginToken");
      // console.log(token);
      // var user = {};
      // if (token !== null) {
      //   var encoded = token.split('.')[1];
      //   user = JSON.parse(tokenDecode(encoded));
      //   console.log(user.sub);
      //   $scope.userDetails = user;
      //   console.log($scope.userDetails);
      // } else {
      //   $location.path('login');
      // }
    } else {
      $scope.logoutCard = false;
    }
  }

  var elements = document.getElementsByClassName("mdcard");

  var i;

  $scope.showGridView = false;
  $scope.showListView = true;
  $scope.listView = function() {
    console.log("In list view");
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "800px";
    }
    $scope.showListView = false;
    $scope.showGridView = true;
  }

  $scope.gridView = function() {
    console.log("In list view");
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "250px";
    }
    $scope.showGridView = false;
    $scope.showListView = true;
  }

  $scope.goToSearch = function() {
    console.log("In go search");
    $state.go('home.search');
  }




  $scope.allLabels = [];
  $scope.showLabel = true;
  //$scope.showCreate = true;
  $scope.showDelete = false;

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

    $scope.labelId = 0;
    $scope.label = "";
    $scope.userId = 0;

    var getLabel = function() {
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
        labelId: $scope.labelId,
        label: $scope.label,
        userId: $scope.userId
      }
      console.log("In addlabel" + label);
      var url = baseurl + 'addLabel';
      if (label.label == "") {
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



    $scope.hideDialogueBox = function() {
      $mdDialog.hide();
    }



    $scope.close = false;
    $scope.done = false;
    $scope.add = true;
    $scope.isClicked = false;
    $scope.changeIcon = function() {
      $scope.isClicked = !$scope.isClicked;
      if ($scope.isClicked) {
        $scope.add = true;
        $scope.close = false;
        $scope.done = false;
      } else {
        $scope.add = false;
        $scope.close = true;
        $scope.done = true;
      }
    }


    $scope.showCreate = true
    //$scope.showLabel = true
    $scope.beforeEdit = function(label) {
      label.showDelete = true;
      label.showLabel = false;
    }


    $scope.afterEdit = function(label) {
      label.showDelete = false;
      label.showLabel = true;

    }




    $scope.deleteLabel = function(label) {
      var url = baseurl + 'deleteLabel/' + label.labelId;
      DeleteService.delete(url).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log("erorr.................");
        console.log("error" + response.data);
      })
    }

    $scope.updateLabel = function(label) {
      console.log("In update label" + label.label + label.labelId + label.userId);
      console.log(label);
      var url = baseurl + 'updateLabel/' + label.labelId;
      PutService.updateMethod(label, url).then(function successCallback(response) {
        console.log(response);
        getLabel();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }



  }

  var getLabel = function() {
    var url = baseurl + 'getLabels';
    GetService.getModel(url).then(function successCallback(response) {
      $scope.allLabels = response.data;
      console.log($scope.allLabels);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }
  getLabel();







  // $scope.selected = [];
  // $scope.toggle = function(item, list) {
  //   var idx = list.indexOf(item);
  //   if (idx > -1) {
  //     list.splice(idx, 1);
  //   } else {
  //     list.push(item);
  //   }
  // };



  $scope.createNote = function() {
    var note = {
      title: $scope.noteTitle,
      description: $scope.noteDesc,
      color: $scope.color,
      isArchived: $scope.isArchived,
      isPinned: $scope.isPinned,
      isTrashed: $scope.isTrashed,
      reminder: $scope.tempDate,
    }
    //console.log($scope.tempDate);
    console.log(note.title + "notetitle");
    var url = baseurl + 'createNote';
    if (note.title == "" && note.description == "") {
      console.log("title or desc undefined............");
    } else {
      PostService.postService(note, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  };



  function getNote() {
    console.log("In get note");
    var url = baseurl + 'getNotes';
    GetService.getModel(url).then(function successCallback(response) {
      $scope.allNotes = response.data;
      var noteArray = response.data;
      //  var noteArray = $scope.allNotes;
      showHideheader();
      // console.log('  $scope.allNotes', $scope.allNotes);
      // for (var i = 0; i < noteArray.length; i++) {
      //   var noteObj = noteArray[i];
      //   console.log(noteObj.noteId);
      // var LabelList = getNoteLabel(noteObj.noteId);
      // no
      // }

    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  var showHideheader = function() {
    var myArray = $scope.allNotes;
    console.log(myArray);
    for (var i = 0; i < myArray.length; i++) {
      var noteObj = myArray[i];
      console.log(noteObj.isPinned);
      if (noteObj.isPinned === true) {
        console.log("In isPinned true");
        $scope.showPinned = true;
      } else if (noteObj.isPinned === false) {
        $scope.showOther = true;
      }
    }
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




  $scope.updateNotecolor = function(note, color) {
    if (note === undefined) {
      console.log("In A");
      $scope.color = color;
    } else {
      console.log("In B");
      note.color = color
      console.log(note.title + "update note color");
      var url = baseurl + 'updateNote/' + note.noteId;
      PostService.postService(note, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("erorr.................");
        console.log("error" + response.data);
      })
    }
  }

  $scope.archiveNote = function(notes) {
    if (notes === undefined) {
      $scope.isArchived = true;
    } else if (notes.isArchived === false) {
      console.log("in update note" + notes.color + notes.title + notes.description + notes.noteId + " " + notes.isArchived);
      notes.isArchived = true;
      notes.isPinned = false;
      notes.isTrashed = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      PostService.postService(notes, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("erorr.................");
        console.log("error" + response.data);
      })
    } else {
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

  var trashNote = function(notes) {
    if (notes.isTrashed === true) {
      notes.isTrashed = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      PostService.postService(notes, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("erorr.................");
        console.log("error" + response.data);
      })
    } else {
      console.log("In trash true");
      notes.isTrashed = true;
      notes.isPinned = false;
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

    DeleteService.delete(url).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }

  var restoreNote = function(notes, data) {
    console.log(notes + "in restore");
    notes.isTrashed = false;
    var url = baseurl + 'updateNote/' + notes.noteId;
    PostService.postService(notes, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }

  $scope.updatePin = function(notes) {
    if (notes === undefined) {
      $scope.isPinned = true;
    } else if (notes.isPinned === false) {
      console.log("In update false");
      console.log("in update note" + notes.color + notes.title + notes.description + notes.noteId + " " + notes.isArchived);
      notes.isPinned = true;
      notes.isArchived = false;
      notes.isTrashed = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      PostService.postService(notes, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    } else {
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


  $scope.addTime = [{
      'name': 'Morning   8:00 AM',
      'value': '8:00 AM'
    },
    {
      'name': 'Afternoon 1:00 PM',
      'value': '1:00 PM'
    },
    {
      'name': 'Evening   6:00 PM',
      'value': '6:00 PM'
    },
    {
      'name': 'Night     8:00 PM',
      'value': '8:00 PM'
    },
    {
      'name': 'custom',
      'value': ''
    }

  ];



  $scope.Updatereminder = function(note) {
    if (note === undefined) {
      console.log("To create note................");
    } else {
      console.log(note.tempDate);
      $scope.myDate = new Date(note.tempDate);
      note.reminder = $scope.myDate;
      $scope.reminderTime = note.remindertime
      note.remindertime = $scope.reminderTime;
      console.log(note.remindertime);
      console.log(note.reminder);
      var url = baseurl + 'updateNote/' + note.noteId;
      PostService.postService(note, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  }


  $scope.removeReminder = function($event, note) {
    console.log("In remove reminder........");
    console.log(note);
    note.reminder = null;
    var url = baseurl + 'updateNote/' + note.noteId;
    PostService.postService(note, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }


  // $scope.showMenu = function($event, noteId) {
  //   console.log("show menu");
  //   var position = $mdPanel.newPanelPosition()
  //     .relativeTo($event.currentTarget)
  //     .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
  //
  //   var config = {
  //     attachTo: angular.element(document.body),
  //     controller: PanelMenuCtrl,
  //     templateUrl: 'Template/reminder.view.html',
  //     position: position,
  //     openFrom: $event,
  //     clickOutsideToClose: true,
  //     escapeToClose: true,
  //     focusOnOpen: false,
  //     zIndex: 2
  //   };
  //   console.log($event);
  //   $mdPanel.open(config);
  // }
  //
  // function PanelMenuCtrl(mdPanelRef, $timeout, $scope) {
  //   $scope.reminder = true;
  //   $scope.pickDateTime = function() {
  //     // $scope.dateTime=false;
  //     $scope.reminder = false;
  //     console.log("onclick pick date and time");
  //   }
  //   console.log("panelController ", mdPanelRef);
  //   this._mdPanelRef = mdPanelRef;
  // }

  $scope.today = new Date();
  console.log("today", $scope.today)
  $scope.Latertoday = function(note) {
    if ($scope.today.getHours() > 12 && $scope.today.getHours() < 8) {
      note.reminder = $scope.today;
      note.remindertime = "8.00 AM"
      var url = baseurl + 'updateNote/' + note.noteId;
      PostService.postService(note, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    } else {
      note.reminder = $scope.today;
      note.remindertime = "8.00 PM"
      var url = baseurl + 'updateNote/' + note.noteId;
      PostService.postService(note, url).then(function successCallback(response) {
        console.log(response);
        getNote();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  }

  $scope.setTomorrowDate = function(note) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    note.reminder = tomorrow;
    note.remindertime = "8.00 AM"
    var url = baseurl + 'updateNote/' + note.noteId;
    PostService.postService(note, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.setNextWeekDate = function(note) {
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + (1 + 7 - nextWeek.getDay()) % 7);
    note.reminder = nextWeek;
    note.remindertime = "8.00 AM"
    var url = baseurl + 'updateNote/' + note.noteId;
    PostService.postService(note, url).then(function successCallback(response) {
      console.log(response);
      getNote();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }



  // $scope.uploadImage = function(evt) {
  //   console.log(evt);
  //   var file = evt;
  //   console.log("In upload image..............." + file);
  //   console.log("Calling image upload service.................");
  //   // document.addEventListener("change", uploadPicture(file));
  // }

  $scope.call = function(ev, note) {
    document.addEventListener('change', function(ev) {
      console.log(ev.target.files[0]);
      var url = baseurl + 'upload';
      console.log(ev.target.files[0]);
      var form = new FormData();
      form.append("file", ev.target.files[0]);
      PostService.imageUploadService(form, url).then(function successCallback(response) {
        console.log(response.data);
        var image = response.data;
        updateImage(image, note)
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    });
  }


  function updateImage(image, note) {
    console.log("In update image...............");
    note.image = image;
    var url = baseurl + 'updateNote/' + note.noteId;
    PostService.postService(note, url).then(function successCallback(response) {
      getNote();
      console.log(response);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.removeImage = function(note) {
    note.image = null;
    var url = baseurl + 'updateNote/' + note.noteId;
    PostService.postService(note, url).then(function successCallback(response) {
      getNote();
      console.log(response);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.UploadProfile = function(clickEvent) {
    $mdDialog.show({
      controller: profileUplodController,
      templateUrl: 'Template/prifileupload.view.html',
      parent: angular.element(document.body),
      targetEvent: clickEvent,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
    });
  }

  function profileUplodController($scope) {
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.filename = "";
    var handleFileSelect = function(evt) {
      var file = evt.target.files[0];
      $scope.filename = evt.target.files[0].name;
      console.log(evt);
      var reader = new FileReader();
      reader.onload = function(evt) {
        console.log(evt);
        $scope.$apply(function($scope) {
          $scope.myImage = evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    $timeout(function() {
      angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
    }, 1000, false);


    const dataURLtoFile = (dataurl, filename) => {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1)
        n -= 1 // to make eslint happy
      }
      return new File([u8arr], filename, {
        type: mime
      });
    }



    $scope.uploadProfilePic = function functionName(myCroppedImage) {
      console.log("In upload profile pic...............");
      var url = baseurl + 'upload';
      console.log(myCroppedImage);
      const file = dataURLtoFile(myCroppedImage, "profile.png");
      console.log(file);
      var form1 = new FormData();
      form1.append("file", file);
      PostService.imageUploadService(form1, url).then(function successCallback(response) {
        console.log(response.data);
        var image = response.data;
        updateUserPofile(image);
      }, function errorCallback(response) {
        console.log("error" + response.data);
      });
    }


    function updateUserPofile(image) {
      var user = getUser();
      console.log(user);
      var url = baseurl + 'updateUser';
      user.profileImage = image;
      console.log(user);
      PutService.updateMethod(user, url).then(function successCallback(response) {
        console.log(response);
        getUser();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }



  }






});
