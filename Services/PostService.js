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



  // factory.registerUser = function(user) {
  //   console.log(user);
  //   return $http({
  //     method: "POST",
  //     url: baseUrl + "register",
  //     data: user
  //   }).then(function successCallback(response) {
  //     console.log(response.data);
  //     $state.go('checkEmail');
  //   }, function errorCallback(response) {
  //     console.log("error" + response.data);
  //   })
  // }
  // var baseUrl = "http://localhost:9000/";
  //
  //
  // factory.resetPassword = function(user,token) {
  //   console.log(user);
  //   return $http({
  //     method: "POST",
  //     url: baseUrl + "resetpassword/" + token,
  //     data: user
  //   })
  // }



  return factory;
});

  // factory.loginUser = function(user) {
  //   console.log(user);
  //   return $http({
  //     method: "POST",
  //     url: baseUrl + "login",
  //     data: user
  //   }).then(function successCallback(response) {
  //     console.log(response.data);
  //     $state.go('home');
  //     localStorage.setItem("loginToken", response.data);
  //   }, function errorCallback(response) {
  //     console.log("error" + response.data);
  //   })
  // }


  // factory.forgotPassword = function(user) {
  //   console.log(user);
  //   return $http({
  //     method: "POST",
  //     url: baseUrl + "forgotpassword",
  //     data: user
  //   }).then(function successCallback(response) {
  //     console.log("success" +response.data);
  //     $state.go('resetpassword')
  //   }, function errorCallback(response) {
  //     console.log("error" + response.data);
  //   })
  // }
