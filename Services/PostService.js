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




//  formData.append("file", "/home/bridgeit/Documents/pictures/sample2.jpeg");

  factory.imageUploadService = function(file,url) {  
    return $http({
      method: "POST",
      url: url,
      data: file,
      headers: {"Content-Type": undefined}
    })
  }

  return factory;
});
