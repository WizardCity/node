app.controller('MyProjectList', function($scope, $http, $sce) {
  
  $http.get('/js/home.json').success(function (data){
    $scope.myData = data.media.map(function (m) {
      m.url = $sce.trustAsResourceUrl(m.url);
      return m;
    });
    
  });
  
});
