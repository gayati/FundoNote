ToDoApp.controller('NoteController', function($scope, $rootScope, $state, $mdPanel, $mdSidenav, $mdDialog,
  PostService, $timeout, $location, $filter) {
  var baseurl = "http://localhost:9000/";


  $scope.allNotes = [];
  $scope.mynotes = [];
  $scope.color = "White";
  $scope.noteTitle = "";
  $scope.noteDesc = "";
  $scope.isArchived = false;
  $scope.isPinned = false;
  $scope.isTrashed = false;
  $scope.image = "";
  $scope.labelList = null;
  $scope.tempDate = '';
  $scope.remindertime = "";
  $scope.userInfo = {};
  $scope.noteLabels = [];



  //Note controller

  //menuList for more option
  $scope.menuList = [{
      option: 'Delete note'
    },
    {
      option: 'Add Label'
    }
  ];

  //trash menuList for more option in trash page
  $scope.trashMenuList = [{
      option: 'Delete forever'
    },
    {
      option: 'Restore'
    }
  ];

  //colorList
  $scope.colorList = [
    [{
      color: '#FFFFFF',
      tooltip: 'White'
    }, {
      color: '#EC407A',
      tooltip: 'Pink'
    }, {
      color: '#AB47BC',
      tooltip: 'Voilet'
    }, {
      color: '#82B1FF',
      tooltip: 'Blue'
    }],
    [{
      color: '#64B5F6',
      tooltip: 'Dark Blue'
    }, {
      color: '#CCFF90',
      tooltip: 'Green'
    }, {
      color: '#A7FFEB',
      tooltip: 'Teal'
    }, {
      color: '#FF8A80',
      tooltip: 'Red'
    }],
    [{
      color: '#D5DBDB',
      tooltip: 'Gray'
    }, {
      color: '#FFD180',
      tooltip: 'Orange'
    }, {
      color: '#D7C9C8',
      tooltip: 'Brown'
    }, {
      color: '#F5F518',
      tooltip: 'Yellow'
    }]

  ];

  //Get collaberatedNote
  $scope.getCollaberatedNote = function() {
    console.log($scope.userInfo);
    console.log("In get collaberared...................");
    if ($scope.userInfo.id != undefined) {
      var url = baseurl + 'getCollaberatednotes/' + $scope.userInfo.id;
      PostService.getModel(url).then(function successCallback(response) {
        console.log(response.data);
        $scope.collaberatedNote = response.data;
        $scope.concatFun();

      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  }

  $scope.concatFun = function() {
    $scope.allNotes = $scope.mynotes.concat($scope.collaberatedNote);
    console.log($scope.allNotes);
    showHideheader();
  }


  //Get Notes
  $scope.getNote = function() {
    console.log("In get note");
    var url = baseurl + 'getNotes';
    PostService.getModel(url).then(function successCallback(response) {
      $scope.mynotes = response.data;
      $scope.getCollaberatedNote();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  //function for show and hide header
  var showHideheader = function() {
    var myArray = $scope.allNotes;
    for (var i = 0; i < myArray.length; i++) {
      var noteObj = myArray[i];
      if (noteObj.isPinned === true) {
        $scope.showPinned = true;
      } else if (noteObj.isPinned === false) {
        $scope.showOther = true;
      }
    }
  }


  //Get User
  function getUser() {
    console.log("In get User");
    var url = baseurl + 'getUser';
    PostService.getModel(url).then(function successCallback(response) {
      console.log("success" + response.data.id);
      $scope.userInfo = response.data;
      console.log($scope.userInfo);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
    return $scope.userInfo;
  }

  getUser();
  $scope.getNote();

  //create note function
  $scope.createNote = function() {
    var note = {
      title: $scope.noteTitle,
      description: $scope.noteDesc,
      color: $scope.color,
      isArchived: $scope.isArchived,
      isPinned: $scope.isPinned,
      isTrashed: $scope.isTrashed,
      reminder: null,
      remindertime: "",
      image: $scope.image,
      labelList: [],
    }
    var url = baseurl + 'createNote';
    if ((note.title !== "" || note.description !== "") || note.image !== undefined) {
      updateNote(note, url);

    } else {
      console.log("title or desc undefined............");

    }
  };

  //Uodate Note..
  var updateNote = function(note, url) {
    PostService.postService(note, url).then(function successCallback(response) {
      $scope.getNote();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }



  $scope.pin = true;
  $scope.isClicked = false;
  $scope.changePinIcon = function() {
    $scope.isClicked = !$scope.isClicked;
    if ($scope.isClicked) {
      $scope.pin = false;
      $scope.bluePin = true;
    } else {
      $scope.pin = true;
      $scope.bluePin = true;

    }
  }

  //updatePin function
  $scope.updatePin = function(notes) {
    if (notes === undefined) {
      $scope.isPinned = true;
    } else if (notes.isPinned === false) {
      notes.isPinned = true;
      notes.isArchived = false;
      notes.isTrashed = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      updateNote(notes, url);

    } else {
      notes.isPinned = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      updateNote(notes, url);
    }
  }

  //archiveNote function
  $scope.archiveNote = function(notes) {
    if (notes === undefined) {
      $scope.isArchived = true;
    } else if (notes.isArchived === false) {
      notes.isArchived = true;
      notes.isPinned = false;
      notes.isTrashed = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      updateNote(notes, url);
    } else {
      notes.isArchived = false;
      var url = baseurl + 'updateNote/' + notes.noteId;
      updateNote(notes, url);
    }
  }

  //update Note color
  $scope.updateNotecolor = function(note, color) {
    if (note === undefined) {
      $scope.color = color;
    } else {
      note.color = color
      var url = baseurl + 'updateNote/' + note.noteId;
      updateNote(note, url);
    }
  }

  //Get url parameter
  var url = $location.path().split("/");
  $scope.parameter = url[3];

  //add time reminder array
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


  //update reminder function
  $scope.Updatereminder = function(note) {
    if (note === undefined) {

    } else {
      note.reminder = note.tempDate;
      $scope.reminderTime = note.remindertime
      note.remindertime = $scope.reminderTime;
      var url = baseurl + 'updateNote/' + note.noteId;
      updateNote(note, url);
    }
  }

  //remove reminder
  $scope.removeReminder = function($event, note) {
    note.reminder = null;
    var url = baseurl + 'updateNote/' + note.noteId;
    updateNote(note, url);

  }


  //set todays reminder
  $scope.today = new Date();
  $scope.Latertoday = function(note) {
    if ($scope.today.getHours() > 12 && $scope.today.getHours() < 8) {
      note.reminder = $scope.today;
      note.remindertime = "8.00 AM"
      var url = baseurl + 'updateNote/' + note.noteId;
      updateNote(note, url);
    } else {
      note.reminder = $scope.today;
      note.remindertime = "8.00 PM"
      var url = baseurl + 'updateNote/' + note.noteId;
      updateNote(note, url);
    }
  }

  //set tommorrows reminder
  $scope.setTomorrowDate = function(note) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    note.reminder = tomorrow;
    note.remindertime = "8.00 AM"
    var url = baseurl + 'updateNote/' + note.noteId;
    updateNote(note, url);
  }

  //set nextWeek reminder
  $scope.setNextWeekDate = function(note) {
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + (1 + 7 - nextWeek.getDay()) % 7);
    note.reminder = nextWeek;
    note.remindertime = "8.00 AM"
    var url = baseurl + 'updateNote/' + note.noteId;
    updateNote(note, url);
  }

  //Note Dilogue
  $scope.showDialogue = function(clickEvent, notes) {
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

  //note Dilogue controller
  function dialogueController($scope, note) {
    $scope.notes = note;
    $scope.updateNote = function(note) {
      var url = baseurl + 'updateNote/' + note.noteId;
      updateNote(note, url);
    }

    $scope.hideDialogueBox = function() {
      $mdDialog.hide();
    }
  }

  // Add image on note
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

  $scope.zoom = function() {
    var imageId = document.getElementById('view');
    if (imageId.style.width == "400px") {
      imageId.style.width = "300px";
      imageId.style.height = "300px";

    } else {
      imageId.style.width = "400px";
      imageId.style.height = "400px";
    }
  }

  function updateImage(image, note) {
    if (note === undefined) {
      $scope.image = image;
    } else {
      console.log("In update image...............");
      note.image = image;
      var url = baseurl + 'updateNote/' + note.noteId;
      updateNote(note, url);
    }
  }


  //removeImage function
  $scope.removeImage = function(note) {
    note.image = null;
    var url = baseurl + 'updateNote/' + note.noteId;
    updateNote(note, url);
  }



  //function for trash page
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

  //function for deleteNoteforever
  var deleteNoteforever = function(noteId) {
    console.log("In delte forever");
    var url = baseurl + 'deleteNote/' + noteId;
    PostService.delete(url).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log("erorr.................");
      console.log("error" + response.data);
    })
  }

  //function for restore note
  var restoreNote = function(notes, data) {
    console.log(notes + "in restore");
    notes.isTrashed = false;
    var url = baseurl + 'updateNote/' + notes.noteId;
    updateNote(notes, url);
  }


  //controller for handling the functionalities of sidebar and toolbar(HomeController)

  //
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
      if ($mdSidenav(componentId).isOpen()) {
        document.getElementById("myDiv").style.marginLeft = "200px";
      } else {
        document.getElementById("myDiv").style.marginLeft = "0px";
      }
    };
  }


  //functions for going to particular state
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
    localStorage.removeItem("loginToken");
    console.log(localStorage.getItem("loginToken"));
    $state.go('login')
  }

  $scope.goToReminder = function() {
    $state.go('home.reminder')
  }

  $scope.goToLabel = function(label) {
    $state.go('home.label', {
      name: label.label
    })
  }

  $scope.goToSearch = function() {
    $state.go('home.search');
  }


  //create label Dialogue
  $scope.allLabels = [];
  $scope.showLabel = true;
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

  //label controller
  function LabelController($scope, $mdDialog) {
    $scope.labelId = 0;
    $scope.label = "";
    $scope.userId = 0;

    //function for display label on Dilogue box
    var getLabel = function() {
      var url = baseurl + 'getLabels';
      PostService.getModel(url).then(function successCallback(response) {
        $scope.allLabels = response.data;
        console.log($scope.allLabels);
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
    getLabel();

    //function for create label
    $scope.addLabel = function() {
      console.log("In add label........" + $scope.allLabels);
      var label = {
        labelId: $scope.labelId,
        label: $scope.label,
        userId: $scope.userId
      }
      var flag = false;
      for (var i = 0; i <= $scope.allLabels.length; i++) {
        console.log("In for");
        var lableObj = $scope.allLabels[i];
        console.log(lableObj);
        if (lableObj != undefined && lableObj.label === label.label) {
          flag = true;
        } else {}
      }

      if (flag === false) {
        var url = baseurl + 'addLabel';
        PostService.postService(label, url).then(function successCallback(response) {
          getLabel();
          $scope.getNote();
        }, function errorCallback(response) {
          console.log("error" + response.data);
        })
      } else {
        console.log("In addlabel" + label);

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
      PostService.delete(url).then(function successCallback(response) {
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
      PostService.updateMethod(label, url).then(function successCallback(response) {
        console.log(response);
        getLabel();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  }

  //function for display labels on side bar
  $scope.getLabel = function() {
    var url = baseurl + 'getLabels';
    PostService.getModel(url).then(function successCallback(response) {
      $scope.allLabels = response.data;
      console.log($scope.allLabels);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }
  $scope.getLabel();


  //function for logoutCard
  $scope.logoutCard = false;
  $scope.logOut = function() {
    if ($scope.logoutCard === false) {
      $scope.logoutCard = true;
      getUser();
    } else {
      $scope.logoutCard = false;
    }
  }


  //function for list grid switch
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
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "250px";
    }
    $scope.showGridView = false;
    $scope.showListView = true;
  }


  //function for upload profile
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

  //profile upload controller
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

    //function for converting base64 uri to form data....
    const dataURLtoFile = (dataurl, filename) => {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1)
        n -= 1
      }
      return new File([u8arr], filename, {
        type: mime
      });
    }


    // function for uploading profile pic
    $scope.uploadProfilePic = function functionName(myCroppedImage) {
      console.log("In upload profile pic...............");
      var url = baseurl + 'upload';
      console.log(myCroppedImage);
      const file = dataURLtoFile(myCroppedImage, $scope.filename);
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

    // function to update user profile ...
    function updateUserPofile(image) {
      var user = getUser();
      console.log(user);
      var url = baseurl + 'updateUser';
      user.profileImage = image;
      console.log(user);
      PostService.updateMethod(user, url).then(function successCallback(response) {
        console.log(response);
        getUser();
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
    $scope.hideDialogueBox = function() {
      $mdDialog.hide();
    }
  }


  $scope.morePanel = function(ev, note, templatePage) {
    console.log(note + "in more panel");
    var position = $mdPanel.newPanelPosition()
      .relativeTo(ev.target)
      .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);
    console.log("position of panel ", position);
    var config = {
      locals: {
        label: $scope.allLabels,
        note: note,
        spe: $scope.thisScope
      },
      attachTo: angular.element(document.body),
      controller: morePanelCtrl,
      templateUrl: 'Template/' + templatePage + '.html',
      position: position,
      openFrom: ev,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: false,
      zIndex: 2,
    };
    $mdPanel.open(config);
  }

  function morePanelCtrl(mdPanelRef, $timeout, $scope, note, label, spe) {
    $scope.more = true;

    $scope.label = label;
    $scope.note = note;
    $scope.selected = note.labelList;

    $scope.exists = function(item, list) {
      for (var i = 0; i < list.length; i++) {
        var selectedobject = list[i];
        if (selectedobject.label == item.label) {
          return true;
        }
      }
      return false;
    };

    $scope.toggle = function(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
      $scope.addNoteLabel(note, item);
    };

    //function to add label
    $scope.addNoteLabel = function(note, label) {

      console.log("in add method" + note.noteId);
      var noteLabel = {}
      noteLabel.noteId = note.noteId,
        noteLabel.labelId = label.labelId
      console.log("In addlabel" + noteLabel.noteId);
      var url = baseurl + 'addnoteLabel';
      PostService.postService(noteLabel, url).then(function successCallback(response) {}, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }

    $scope.getLabel = function() {
      var url = baseurl + 'getLabels';
      PostService.getModel(url).then(function successCallback(response) {
        $scope.allLabels = response.data;
        console.log($scope.allLabels);
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
  $scope.getLabel();


    //Delete note
    $scope.trashNote = function() {
      console.log(note);
      if (note.isTrashed === true) {
        note.isTrashed = false;
        var url = baseurl + 'updateNote/' + note.noteId;
        updateNote(note, url);
      } else {
        note.isTrashed = true;
        note.isPinned = false;
        note.isArchived = false;
        var url = baseurl + 'updateNote/' + note.noteId;
        updateNote(note, url);
      }
    }

    $scope.hidemore = function() {
      console.log("hide method ");
      $scope.more = false;
    }

  }


  $scope.removeLabel = function(notes, label) {
    console.log("in remove label..............");
    var url = baseurl + 'removeLabel/' + notes.noteId + "/" + label.labelId;
    PostService.delete(url).then(function successCallback(response) {
      console.log(response);
      $scope.getNote();
      $state.reload();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.collaberatorDialogue = function(clickEvent, notes) {
    console.log(notes.noteId);
    // console.log(userInfo);
    $mdDialog.show({
      locals: {
        note: notes,
      },
      controller: collaberatorController,
      templateUrl: 'Template/collaberator.view.html',
      parent: angular.element(document.body),
      targetEvent: clickEvent,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen,
    });
  }




  function collaberatorController($scope, note) {
    var getAllUser = function() {
      var url = baseurl + 'getAllUsers';
      PostService.getModel(url).then(function successCallback(response) {
        console.log(response.data);
        $scope.userList = response.data;
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }
    getAllUser();

    $scope.note = note;
    $scope.sharedEmail = "";
    $scope.userInfo = getUser();
    console.log("In collaberator controller" + $scope.userInfo);

    $scope.addCollaberator = function(user) {
      console.log(user + " In add collaberator");
      var collaberator = {
        sharedBy: $scope.userInfo.id,
        sharedTo: user.id,
        noteId: note.noteId
      };
      var url = baseurl + 'addCollaberator';
      PostService.postService(collaberator, url).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })
    }

    $scope.hideDialogueBox = function() {
      $mdDialog.hide();
    }
  }


  $scope.isUrl = function(notes) {
  console.log(notes);
  var urlArray =[];
  var url = notes.description;
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   if(regexp.test(url)){
     urlArray.push(url);
     console.log(urlArray );
     var url = baseurl + 'addUrl';
     PostService.postService(urlArray, url).then(function successCallback(response) {
       console.log(response);
     }, function errorCallback(response) {

     })
   }else{
     console.log("Not proper url..........");
   }
}









});




ToDoApp.filter('dateformat', function($filter) {

  return function(remiderDate) {

    console.log("inside filter", remiderDate);
    if (!remiderDate) {
      return;
    }

    remiderDate = new Date(remiderDate);

    var dt = "";
    var todatedate = new Date();
    console.log(todatedate.getMonth(), todatedate.getDate());
    var ltempToday = new Date(todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate());

    var ltempTom = new Date(todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate() + 1);
    var ltempYes = new Date(todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate() - 1);

    var ltempRD = new Date(remiderDate.getFullYear(), remiderDate.getMonth(), remiderDate.getDate());

    console.log(ltempRD);
    console.log(ltempTom);

    if ((ltempToday - ltempRD) == 0) {
      dt += "Today";
    } else if ((ltempTom - ltempRD) == 0) {
      dt += "Tomorrow";
    } else if ((ltempYes - ltempRD) == 0) {
      dt += "Yesterday";
    } else {
      dt = $filter('date')(remiderDate, 'MMM dd, yyyy');
      dt = dt.replace(", " + todatedate.getFullYear(), '');
    }


    return dt;
  };


});
