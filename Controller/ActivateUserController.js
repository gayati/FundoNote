ToDoApp.controller('ActivateUserController', function($scope, $state, $location, GetService) {
  var output = $location.search()
  var baseurl = "http://localhost:9000/";

  console.log(output);
  $scope.activateUser = function() {
    var url = baseurl+"activateuser/" + output.token;
    GetService.getModel(url).then(function successCallback(response) {
      console.log("success" +response.data);
      $state.go('login')
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }

  $scope.activateUser();

});
