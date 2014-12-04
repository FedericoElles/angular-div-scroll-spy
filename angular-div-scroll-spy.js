/**
 * ScrollSpy
 *
 * #1 "scroll-spy" directive is placed on the container row,
 * #2 Sidebar and Content elements must be within the "scroll-spy" element
 * #3 The spy="<id>" directive is added to all hook elements, which will receive the "current" class if the
 *    hooked element is scrolled to in the content element having the id="<id>"
 *
 * Source: http://alxhill.com/blog/articles/angular-scrollspy/
 */

angular.module('AngularDivScrollSpy', [])


.directive('scrollSpy', function($window) {
  return {
    restrict: 'A',
    controller: function($scope) {
      $scope.spies = [];
      this.addSpy = function(spyObj) {
        return $scope.spies.push(spyObj);
      };
      return this;
    },
    link: function(scope, elem, attrs) {
      var spyElems;
      var spyContainer = elem;
      var offset = 0;
      if (attrs.scrollOffset){
        offset = parseInt(attrs.scrollOffset, 10);
        if (isNaN(offset)){
          offset = 0;
        }
      }

    
      //if the scroll-spy element and the scrollable div are not the same, specify the name
      //inside the attribute: scroll-spy="<id of scrollable element>"
      if (attrs.scrollSpy.length > 0){
        if (attrs.scrollSpy === 'child'){
          spyContainer = angular.element(elem.children()[0]);
        } else {
          spyContainer = angular.element(document.getElementById(attrs.scrollSpy));
        }
      }
      
      spyElems = [];
      scope.$watch('spies', function(spies) {

        var spy, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = spies.length; _i < _len; _i++) {
          spy = spies[_i];
          if (spyElems[spy.id] == null) {
            _results.push(spyElems[spy.id] = spyContainer.find('#' + spy.id));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },true);
      
      
      
      return $(spyContainer).scroll(function() { //$window
        var highlightSpy, pos, spy, _i, _len, _ref;
        highlightSpy = null;
        _ref = scope.spies;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          spy = _ref[_i];
          spy.out();
          spyElems[spy.id] = spyElems[spy.id].length === 0 ? spyContainer.find('#' + spy.id) : spyElems[spy.id];
          if (spyElems[spy.id].length !== 0) {
            if ((pos = spyElems[spy.id][0].offsetTop) - $(spyContainer).scrollTop() + offset <= 0) { //$window.scrollY //.offset().top 
              spy.pos = pos;
              
              if (highlightSpy == null) {
                highlightSpy = spy;
              }
              if (highlightSpy.pos < spy.pos) {
                highlightSpy = spy;
              }
            }
          }
        }
        //Fallback: If no focus is available, select first registered item
        if (highlightSpy == null && _ref.length>0){
          highlightSpy = _ref[0];
        }

        return highlightSpy != null ? highlightSpy["in"]() : void 0;
      });
    }
  };
})  
  
.directive('spy', function($location) {
  return {
    restrict: "A",
    require: "^scrollSpy",
    link: function(scope, elem, attrs, scrollSpy) {
      var _ref;
      if ((_ref = attrs.spyClass) == null) {
        attrs.spyClass = "active";
      }
      return scrollSpy.addSpy({
        id: attrs.spy,
        "in": function() {
          return elem.addClass(attrs.spyClass);
        },
        out: function() {
          return elem.removeClass(attrs.spyClass);
        }
      });
    }
  };
})

;
