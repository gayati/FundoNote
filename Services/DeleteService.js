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

  return factory;
});
