ToDoApp.factory("GetService", function($http, $state) {
  var factory = {};
  console.log("Inget sevice");
  factory.getModel = function(url) {
    return $http({
      method: "GET",
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
