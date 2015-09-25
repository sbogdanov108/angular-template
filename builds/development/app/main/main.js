angular.module( 'ngFit.main', [ 'ngRoute' ] )

  .config( [ '$routeProvider', function( $routeProvider )
  {
    $routeProvider
      .when( '/', {
        templateUrl: 'app/main/main.html',
        controller : 'MainCtrl'
      } )
  } ] )

  .controller( 'MainCtrl', [ '$scope', function( $scope )
  {
    $scope.title         = 'Main';
    $scope.name          = 'Сергей';
    $scope.clickFunction = function( name )
    {
      alert( 'Hi, ' + name );
    };
  } ] );