'use strict';

angular.module('')
.directive('quickbooks_connect', 
  function($window){
    return {
      restrict: 'E',    
      template: '<ipp:connectToIntuit></ipp:connectToIntuit>',
      link: function(scope) {

          var script = $window.document.createElement('script');
          script.type = 'text/javascript';
          script.src = '//js.appcenter.intuit.com/Content/IA/intuit.ipp.anywhere.js';
          
          script.onload = function () {
             scope.$emit('intuitjs:loaded');
          };
          
          $window.document.body.appendChild(script);
          
          scope.$on('intuitjs:loaded', function () {
            $window.intuit.ipp.anywhere.setup({
              menuProxy: '/path/to/blue-dot', 
              grantUrl: ('grantUrl')
            });
            scope.connected = true;
            scope.$apply();
          });
      }
    };
  }
);
