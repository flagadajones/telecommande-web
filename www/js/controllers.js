angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function ($scope) {})

.controller('PlaylistsCtrl', ['$scope',"mySocket", 'Servers', 'Renderers',function ($scope,mySocket,Servers,Renderers) {
    Servers.query({
        }, function (servers) {
            $scope.servers = servers;
        });
    Renderers.query({
        }, function (renderers) {
            $scope.renderers = renderers;
        });
                                           
     mySocket.on('device:server', function (data) {
         console.log(data);
            $scope.servers.push(data);
    });
     mySocket.on('device:renderer', function (data) {
         console.log(data);
            $scope.renderers.push(data);
    });

}])

.controller('PlaylistCtrl', function ($scope, $stateParams) {})
//    .controller('AlbumsCtrl', function ($scope, $stateParams) {})
.controller('AlbumsCtrl', ['$scope', '$stateParams', 'Albums',
        function ($scope, $stateParams, Albums) {

        Albums.get({
            serverId: $stateParams.serverId
        }, function (albums) {
            $scope.albums = albums.Result.container;
        });
                                           }]);