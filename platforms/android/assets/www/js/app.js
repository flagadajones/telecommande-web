// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'btford.socket-io', 'ngTouch'])
//, 'starter.directives', 'akoenig.deckgrid'
.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html"
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        }
    })
        .state('app.playlists', {
            url: "/playlists",
            views: {
                'menuContent': {
                    templateUrl: "templates/playlists.html",
                    controller: 'PlaylistsCtrl'
                }
            }
        })

    .state('app.albums', {
        url: "/server/:serverId/albums",
        views: {
            'menuContent': {
                templateUrl: "templates/albums.html",
                controller: 'AlbumsCtrl'
            }
        }
    })
        .state('app.album', {
            url: "/server/:serverId/album/:albumId",
            views: {
                'menuContent': {
                    templateUrl: "templates/album.html",
                    controller: 'AlbumsCtrl'
                }
            }
        })


    .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
            'menuContent': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/server/55076f6e-6b79-4d65-6471-b8a386975678/albums');
});