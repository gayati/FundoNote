// ToDoApp.factory("UserService", function($http, $state) {
//   var factory = {};
//   var baseUrl = "http://localhost:9000/";
//
//   factory.postService = function(data,url) {
//     return $http({
//       method: "POST",
//       url: url,
//       data: data
//     })
//   }
// 
//   // factory.registerUser = function(user) {
//   //   console.log(user);
//   //   return $http({
//   //     method: "POST",
//   //     url: baseUrl + "register",
//   //     data: user
//   //   }).then(function successCallback(response) {
//   //     console.log(response.data);
//   //     $state.go('checkEmail');
//   //   }, function errorCallback(response) {
//   //     console.log("error" + response.data);
//   //   })
//   // }
//
//   factory.activateUser = function (token) {
//     console.log("hi..............." +token);
//     return $http({
//       method: "GET",
//       url: baseUrl + "activateuser/" + token,
//     }).then(function successCallback(response) {
//       console.log("success" +response.data);
//       $state.go('login')
//     }, function errorCallback(response) {
//       console.log("error" + response.data);
//     })
//   }
//
//   // factory.loginUser = function(user) {
//   //   console.log(user);
//   //   return $http({
//   //     method: "POST",
//   //     url: baseUrl + "login",
//   //     data: user
//   //   }).then(function successCallback(response) {
//   //     console.log(response.data);
//   //     $state.go('home');
//   //     localStorage.setItem("loginToken", response.data);
//   //   }, function errorCallback(response) {
//   //     console.log("error" + response.data);
//   //   })
//   // }
//
//
//   // factory.forgotPassword = function(user) {
//   //   console.log(user);
//   //   return $http({
//   //     method: "POST",
//   //     url: baseUrl + "forgotpassword",
//   //     data: user
//   //   }).then(function successCallback(response) {
//   //     console.log("success" +response.data);
//   //     $state.go('resetpassword')
//   //   }, function errorCallback(response) {
//   //     console.log("error" + response.data);
//   //   })
//   // }
//
//   factory.resetPassword = function(user,token) {
//     console.log(user);
//     return $http({
//       method: "POST",
//       url: baseUrl + "resetpassword/" + token,
//       data: user
//     }).then(function successCallback(response) {
//       console.log("success" +response.data);
//       $state.go('login')
//     }, function errorCallback(response) {
//       console.log("error" + response.data);
//     })
//   }
//
//
//
//   return factory;
// });
