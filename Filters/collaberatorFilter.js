ToDoApp.filter('collaberatorFilter', function() {
  return function(userList, note) {
    var filterUser = [];
    var tempArray = [];
    console.log(userList);
    console.log(note);
    var newUser ={};
    if (userList != undefined) {
      console.log("In if...........");
      for (var i = 0; i < userList.length; i++) {
        var user = userList[i];

        if (user.id !== note.createdBy) {
          filterUser.push(user);
        }
      }
    }
    tempArray = filterUser;
    filterUser = [];
    console.log(filterUser);
    if (note.collaberatorList != undefined) {
      console.log("In collaverator list................" + note.collaberatorList);
      if (userList != undefined) {
        console.log("In if...........");
        for (var i = 0; i < userList.length; i++) {
          var user1 = userList[i];
          for (var j = 0; j < note.collaberatorList.length; j++) {
            console.log("in collaberator...");
            var collaberaredUser = note.collaberatorList[j];

            console.log(collaberaredUser.id);
            console.log(filterUser);
            console.log(newUser);
            if (user1.id !== collaberaredUser.id && user1.id !== note.createdBy) {
              console.log("in collaberator...dfsdf");

              filterUser.push(user1);
              tempArray = filterUser;
            }
          }

        }
      }


    }


    return tempArray;
  };

});
