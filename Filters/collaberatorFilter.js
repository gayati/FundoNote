ToDoApp.filter('collaberatorFilter', function() {
  return function(userList, note) {
    var filterUser = [];
    console.log(userList);
    console.log(note);
    for (var i = 0; i < userList.length; i++) {
      var user = userList[i];
      var collaberatorList = note.collaberatorList;
      console.log(note.collaberatorList);
      for (var j = 0; j < collaberatorList.length; j++) {
        var collaberaredUser = collaberatorList[j];

      console.log(collaberaredUser.id);
        if (user.id !== note.createdBy && user.id !== collaberaredUser.id) {
          filterUser.push(user);
        }
      }
    }
    return filterUser;
  };

});
