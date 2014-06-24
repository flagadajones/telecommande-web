angular.module('starter.services', ['ngResource']) //'ngResource'
.factory('mySocket', function (socketFactory) {
    var myIoSocket=io.connect('http://localhost:4242');
    var mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
})
.factory('Albums', ['$resource',
  function ($resource) {
        return $resource('http://192.168.0.102:4242/servers/:serverId/albums', {}, {
            query: {
                method: 'GET',
                params: {
                    serverId: 'phones'
                },
                isArray: true
            }
        });
  }])
.factory('Servers', ['$resource',
  function ($resource) {
        return $resource('http://localhost:4242/servers', {}, {
            query: {
                method: 'GET',
                
                isArray: true
            }
        });
  }])

.factory('Renderers', ['$resource',
  function ($resource) {
        return $resource('http://localhost:4242/renderers', {}, {
            query: {
                method: 'GET',
                                isArray: true
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