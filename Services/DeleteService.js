ToDoApp.factory("DeleteService", function($http, $state) {
  var factory = {};
  factory.delete = function(url) {
    return $http({
      method: "DELETE",
      url: url,
      headers : {
         'Headers' : localStorage.getItem('loginToken')
      }
    })
  }

  // factory.activateUser = function (token) {
  //   console.log("hi..............." +token);
  //   return $http({
  //     method: "GET",
  //     url: baseUrl + "activateuser/" + token,
  //   })
  // }

  return factory;
});
