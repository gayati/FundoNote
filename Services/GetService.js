ToDoApp.factory("GetService", function($http, $state) {
  var factory = {};
  console.log("In get user.............");
  factory.getModel = function(url) {
    return $http({
      method: "GET",
      url: url,
      headers : {
         'Headers' : localStorage.getItem('loginToken')
      }
    })
  }
  return factory;
});
