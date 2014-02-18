/**
 * angular-strap
 * @version v2.0.0-rc.3 - 2014-02-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, document, undefined) {
'use strict';

// Source: dist/modules/popover.tpl.js
angular.module('tower.directives.popover').run(['$templateCache', function($templateCache) {
$templateCache.put('partials/popover.html',
    "<div class=\"popover\"><div class=\"arrow\"></div><h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3><div class=\"popover-content\" ng-bind=\"content\"></div></div>"
  );

}]);



// Source: dist/modules/tooltip.tpl.js
angular.module('tower.directives.tooltip').run(['$templateCache', function($templateCache) {
$templateCache.put('partials/tooltip.html',
    "<div class=\"tooltip in\" ng-show=\"title\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\" ng-bind=\"title\"></div></div>"
  );

}]);


})(window, document);
