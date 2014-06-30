/*
 * angular-deckgrid-demo
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */
//angular.module('starter.controllers', ['starter.services'])
angular.module('starter.directives', [])
    .directive('imageloaded', [

    function () {

            'use strict';

            return {
                restrict: 'A',

                link: function (scope, element, attrs) {
                    var cssClass = attrs.loadedclass;

                    element.bind('load', function (e) {
                        var colorThief = new ColorThief();
                        console.log(element);
                        console.log(angular.element(element));
                        console.log(angular.element(element));
                        var color = colorThief.getColor(angular.element(element)[0]);

                        scope.$emit('$imageLoaded', color);
                    });

                    //         angular.element(element).addClass(cssClass);

                }
            }
}
])
.directive("dynamicStyle",function(){
    return {
      templateUrl: 'css/piste_line_style_template.css'
    }
  })
;