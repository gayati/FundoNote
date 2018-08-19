ToDoApp.factory("PostService", function($http, $state,$location) {
  var factory = {};

  factory.postService = function(data,url) {
    console.log(data);
    return $http({
      method: "POST",
      url: url,
      data: data,
      headers : {
			   'Headers' : localStorage.getItem('loginToken')
			}
    })

  }

  factory.delete = function(url) {
    return $http({
      method: "DELETE",
      url: url,
      headers : {
         'Headers' : localStorage.getItem('loginToken')
      }
    })
  }

  factory.getModel = function(url) {
    return $http({
      method: "GET",
      url: url,
      headers : {
         'Headers' : localStorage.getItem('loginToken')
      }
    })
  }


  factory.updateMethod = function (data,url) {
    console.log(data);
    return $http({
     method:"PUT",
     url:url,
     data:data,
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
