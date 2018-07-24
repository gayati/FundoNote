ToDoApp.factory("PutService",function ($http) {
  var factory = {};
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
  return factory;
});
