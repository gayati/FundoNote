ToDoApp.controller('UserController', function($scope, $state, $location, PostService) {
  var baseurl = "http://localhost:9000/";

  $scope.registerUser = function() {
    var user = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      mobileNumber: $scope.mobileNumber,
      emailId: $scope.Email,
      password: $scope.Password
    }
    var url = baseurl + 'register';
    PostService.postService(user, url).then(function successCallback(response) {
      console.log(response.data);
      $state.go('checkEmail');
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.checkEmail = function() {
    $state.go('checkEmail')
  }

  $scope.loginUser = function() {
    var loginDetails = {
      emailId: $scope.userEmail,
      password: $scope.userPassword
    }
    console.log(loginDetails);
    var url = baseurl + 'login';
    PostService.postService(loginDetails, url).then(function successCallback(response) {
      console.log(response.data);
      $state.go('home.dashboard');
      localStorage.setItem("loginToken", response.data);
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.forgotPassword = function() {
    var emailId = {
      emailId: $scope.userEmail,
    }
    var url = baseurl + 'forgotpassword';
    PostService.postService(emailId, url).then(function successCallback(response) {
      console.log("success" + response.data);
      $state.go('resetpassword')
      console.log("fdggggggggggggggggg");
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }


  $scope.resetPassword = function() {
    var password = {
      password: $scope.Password,
    }
    console.log(password);
    var output = $location.search()
    console.log(output);
    var url = baseurl+ "resetpassword/" + output.token;
    PostService.postService(password,url).then(function successCallback(response) {
      console.log("success" +response.data);
      $state.go('login')
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.goToLogin = function() {
    $state.go('login');
  }

  // $scope.goToHome = function() {
  //   $state.go('home')
  // }


  // $scope.goToresetPassword = function() {
  //   $state.go('resetpassword')
  // }
});
