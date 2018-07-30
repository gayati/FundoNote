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
  return factory;
});
