ToDoApp.controller('LabelController', function($scope, $state, $mdDialog, PostService ) {
  var baseurl = "http://localhost:9000/";

    $scope.labelId = 0;
    $scope.label = "";
    $scope.userId = 0;

      function getLabel() {
        var url = baseurl + 'getLabels';
        GetService.getModel(url).then(function successCallback(response) {
          $scope.allLabels = response.data;
          console.log($scope.allLabels);
        }, function errorCallback(response) {
          console.log("error" + response.data);
        })
      }

      getLabel();

      $scope.addLabel = function() {
        var label = {
        labelId:   $scope.labelId,
        label : $scope.label,
        userId:  $scope.userId
        }
        console.log("In addlabel" + label);
        var url = baseurl + 'addLabel';
        if (label.label == "" ) {
          console.log("label undefined............");
        } else {
          PostService.postService(label, url).then(function successCallback(response) {
            console.log(response);
              getLabel();
          }, function errorCallback(response) {
            console.log("error" + response.data);
          })
        }
      }



});
