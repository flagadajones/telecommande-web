angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function ($scope) {})

.controller('PlaylistsCtrl', ['$scope', "mySocket", 'Servers', 'Renderers',
    function ($scope, mySocket, Servers, Renderers) {
        Servers.query({}, function (servers) {
            $scope.servers = servers;
        });
        Renderers.query({}, function (renderers) {
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
.controller('AlbumsCtrl', ['$scope', '$rootScope','$stateParams', '$location', '$ionicScrollDelegate', 'Albums', 'Pistes',

        function ($scope,$rootScope, $stateParams, $location, $ionicScrollDelegate, Albums, Pistes) {
        $rootScope.config={server:'55076f6e-6b79-4d65-6471-b8a386975678',renderer:'2baf6bff-fd48-4bbc-9c02-680183b513c1'};
            
            $scope.$root.isScrollable = true;
        $scope.page = 0;
        $scope.albums = [];
        $scope.albumsData = [];
        $scope.$root.cls = "bar-albums";
        $scope.loadMore = function () {
            var data = [];
            var l = $scope.albums.length
            if ($scope.albumsData.length != 0) {
                for (var i = l; i < l + 20; i++) {
                    data.push($scope.albumsData[i]);
                }
            }
            console.log("data");
            $scope.albums = $scope.albums.concat(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.selectedAlbum = {
            "searchable": "1",
            "childCount": "13",
            "restricted": "1",
            "parentID": "0$1$12",
            "id": "0$1$12$5952",
            "title": "1, 2, 3 Soleils",
            "genre": "Mizrahi",
            "album": "1, 2, 3 Soleils",
            "creator": "Taha, Khaled, Fudel",
            "albumArtURI": [{
                "dlna:profileID": "JPEG_TN",
                "Text": "http://192.168.0.102:4242/disk/DLNA-PNJPEG_TN-OP01-CI1-FLAGS00f00000/defaultalbumart/a_u_d_i_o.jpg/O0$1$8I435978.jpg?scale=160x160"
            }],
            "artist": "Taha, Khaled, Fudel",
            "childCountContainer": "0",
            "modificationTime": "984363987",
            "lastUpdated": "984363987",
            "class": "object.container.album.musicAlbum"
        };
        $scope.$on('$imageLoaded', function (color) {
            console.log(e);
            console.log(color);

        });
        $scope.color = "#000010";


        $scope.componentToHex =
            function (c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
        };

        $scope.rgbToHex =
            function (color) {
                var result = "#" + $scope.componentToHex(color[0]) + $scope.componentToHex(color[1]) + $scope.componentToHex(color[2]);

                return result;
        };
        /*
        $scope.getHeight = function () {
            return 208;
        };
        $scope.getW = function () {
            return 150;
        };
*/

        $scope.colorLuminance = function (hex, lum) {

            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            lum = lum || 0;

            // convert to decimal and change luminosity
            var rgb = "#",
                c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
            }

            return rgb;
        };
        $scope.transition = function (e) {


            if ($scope.page === 0) {
                $scope.selectedAlbum = e;
                var colorThief = new ColorThief();
                colorThief.getColor($scope.selectedAlbum.albumArtURI[0].Text, 10, function (colorRGB) {
                    $scope.color = $scope.rgbToHex(colorRGB);
                    var isLight = isLightColor(colorRGB);
                    if (isLight) {
                        $scope.deeperColor = $scope.colorLuminance($scope.color, -0.2);
                        var tmpColor = $scope.deeperColor;
                        $scope.deeperColor = $scope.color;
                        $scope.color = tmpColor;
                    } else {
                        $scope.deeperColor = $scope.colorLuminance($scope.color, 0.2);
                    }


                    //                   var resultColor = complementaryColor({r:colorRGB[0],g:colorRGB[1],b:colorRGB[2]});
                    //                    tmpColor=[];
                    //                    tmpColor[0]=resultColor.r;
                    //                    tmpColor[1]=resultColor.g;
                    //                    tmpColor[2]=resultColor.b;
                    //                    $scope.textColor=$scope.rgbToHex(tmpColor);//4E
                    $scope.textColor = "#" + (0xffffff ^ parseInt($scope.color.replace("#", ""), 16)).toString(16);
                    $scope.$root.cls = "bar-detailAlbum";
                    $scope.scroll = $ionicScrollDelegate.getScrollPosition();
                    console.log($scope.scroll);
                    $ionicScrollDelegate.scrollTop();
                    $scope.page = 1;
                    $scope.$root.isScrollable = false;
                    Pistes.get({
                        serverId: $stateParams.serverId,
                        albumId: $scope.selectedAlbum.id
                    }, function (pistes) {
                        $scope.pistes = pistes.Result.item;
                    });
                });


            } else {
                $scope.page = 0;
                $scope.$root.isScrollable = true;
                $scope.$root.cls = "bar-albums";

                if ($scope.scroll) {
                    console.log($scope.scroll);
                    $ionicScrollDelegate.scrollTo($scope.scroll.left, $scope.scroll.top);
                }

            }
        };


        Albums.get({
            serverId: $stateParams.serverId
        }, function (albums) {
            $scope.albumsData = albums.Result.container;
        });

       // $scope.transition($scope.selectedAlbum);
}])

.controller('AlbumCtrl', ['$scope', '$stateParams', 'Album', 'Pistes',
        function ($scope, $stateParams, Album, Pistes) {

        Album.get({
            serverId: $stateParams.serverId,
            albumId: $stateParams.albumId
        }, function (album) {
            $scope.album = album.Result.container[0];
        });
        Pistes.get({
            serverId: $stateParams.serverId,
            albumId: $stateParams.albumId
        }, function (album) {
            $scope.pistes = album.Result.item;
        });

                                           }]);