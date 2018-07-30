ToDoApp.factory("PostService", function($http, $state,$location) {
  var factory = {};

  factory.postService = function(data,url) {
    console.log(data);
    console.log("in post service..........");
    return $http({
      method: "POST",
      url: url,
      data: data,
      headers : {
			   'Headers' : localStorage.getItem('loginToken')
			}
    })
  }
  return factory;
});
