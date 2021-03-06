var server = "192.168.0.23:4242";
//var server="localhost:4242";
angular.module('starter.services', ['ngResource']) //'ngResource'
.factory('mySocket', function (socketFactory) {
    var myIoSocket = io.connect('http://' + server);
    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });
    return mySocket;
})
    .factory('Albums', ['$resource',
  function ($resource) {
            return $resource('http://' + server + '/servers/:serverId/albums', {}, {
                get: {
                    method: 'GET',
                    params: {},
                    isArray: false
                }

            });
  }])
    .factory('Album', ['$resource',
  function ($resource) {
            return $resource('http://' + server + '/servers/:serverId/album/:albumId', {}, {
                get: {
                    method: 'GET',
                    params: {

                    },
                    isArray: false
                }

            });
  }])

.factory('Pistes', ['$resource',
  function ($resource) {
        return $resource('http://' + server + '/servers/:serverId/albums/:albumId/pistes', {}, {
            get: {
                method: 'GET',
                params: {},
                isArray: false
            }

        });
  }])

.factory('Servers', ['$resource',
  function ($resource) {
        return $resource('http://' + server + '/servers', {}, {
            query: {
                method: 'GET',

                isArray: true
            }
        });
  }])

.factory('Renderers', ['$resource',
  function ($resource) {
        return $resource('http://' + server + '/renderers/:listController:id/:docController', {
            id: "@id",
            listController: "@listController",
            docController: "@docController"
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            get: {
                method: 'GET',
                isArray: false
            },
            /*
        //  http://{server}/renderers/requests
                requests: {
                    method: 'PUT',
                    params: {
                        listController: "requests"
                    }
                },
*/
            // //  http://{server}/renderers/id/transportUri
            transportUri: {
                method: "PUT",
                params: {
                    docController: "transportUri"
                }
            },
            next: {
                method: "GET",
                params: {
                    docController: "next"
                }
            },
            prev: {
                method: "GET",
                params: {
                    docController: "prev"
                }
            },
            play: {
                method: "GET",
                params: {
                    docController: "play"
                }
            },
            pause: {
                method: "GET",
                params: {
                    docController: "pause"
                }
            }

        });
  }])
    .filter('partition', function () {
        var cache = {};
        var filter = function (arr, size) {
            if (!arr) {
                return;
            }
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            var arrString = JSON.stringify(arr);
            var fromCache = cache[arrString + size];
            if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
                return fromCache;
            }
            cache[arrString + size] = newArr;
            return newArr;
        };
        return filter;
    });