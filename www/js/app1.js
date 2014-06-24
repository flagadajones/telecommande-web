angular.module('ionicApp', ['ionic', 'ngResource'])


.controller('AppCtrl', function ($scope, $ionicSideMenuDelegate) {

    ionic.Platform.ready(function () {
        navigator.splashscreen.hide();
    });


    $scope.leftButtons = [{
        type: 'button-icon button-clear ion-navicon',
        tap: function (e) {
            $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
        }
  }];
    $scope.albums = Albums.get({
                serverId: '55076f6e-6b79-4d65-6471-b8a386975678'//$routeParams.serverId
            }, function (albums) {
                console.log(albums);
            });

})
  .factory('Albums', ['$resource',
  function ($resource) {
            return $resource('http://localhost:4242/servers/:serverId/albums', {}, {
                query: {
                    method: 'GET',
                    params: {
                        serverId: 'phones'
                    },
                    isArray: true
                }
            });
  }])
    .controller('AlbumsCtrl', ['$scope', '$routeParams', 'Albums',
        function ($scope) {

            $scope.albums = Albums.get({
                serverId: $routeParams.serverId
            }, function (albums) {
                console.log(albums);
            });
                                           }]);*/