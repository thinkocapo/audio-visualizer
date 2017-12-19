app.controller('homeCtrl', function ($scope, $rootScope) {	
	window.addEventListener("dragover",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);
	window.addEventListener("drop",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);

	$scope.options = {       
        from: 0,
        to: 255,
        step: 1,
        // dimension: " color",
        css: {
          background: {"background-color": "silver"},
          before: {"background-color": "purple"},
          default: {"background-color": "white"},
          after: {"background-color": "green"},
          pointer: {"background-color": "red"}          
        }        
      };
});