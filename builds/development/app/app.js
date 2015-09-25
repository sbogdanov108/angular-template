// initialize material design js
$.material.init();

(function()
{
  'use strict';

  angular
    .module( 'ngFit', [
      'ngRoute',
      'ngFit.about',
      'ngFit.contact',
      'ngFit.main',
      'ngFit.navbar'
    ] )
    .config( function( $routeProvider )
    {
      $routeProvider
        .otherwise( {
          redirectTo: '/'
        } );
    } );

})();