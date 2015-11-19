//var app = angular.module('spa',[ ]);

(function(){
	var app = angular.module('spa',[ ]);

	// app.controller('TaskController',function(){

	// 	this.tasks = tasks;
	// });

	// app.factory('updateService', function($rootScope) {
 //    var sharedService = {};
    
 //    sharedService.message = '';

 //    sharedService.prepForBroadcast = function(msg) {
 //        this.message = msg;
 //        this.broadcastItem();
 //    };

 //    sharedService.broadcastItem = function() {
 //        $rootScope.$broadcast('handleBroadcast');
 //    };

 //    return sharedService;
	// });

   app.factory("updateFactory",['$http',function($http){

   	var obj = {};

   	obj.fetchTasks = function(){
   		return $http.get('http://127.0.0.1:8000/tasks/');
   	}
   	return obj;

   }]);

   app.controller('TaskController', function($scope,updateFactory){

    var assigner = this;
    assigner.tasks = [];
   	updateFactory.fetchTasks().success(function(response){
   		console.log('response');
   		console.log(response);
   		$scope.tasks = response;
   		console.log("scope tasks");
   		console.log($scope.tasks);
   		assigner.tasks = $scope.tasks;
   	});

   });

	// app.controller('TaskController',['$http',function($http){
	// 	var assigner = this;
	// 	assigner.tasks = [];

	// 	$http.get('http://127.0.0.1:8000/tasks/').success(function(data){
	// 		//console.log(data);

	// 		assigner.tasks = data;
	// 		//console.log(assigner.tasks);
	// 	}); 

	// 	}

	// ]);

	// var task = {
	// 	title:'First task',
	// 	description:'Test task',
	// 	completed:false,
	// 	assign:'Arone'
	// }

	app.controller('ShowController', function($scope){
    $scope.IsVisible = false;
    $scope.ShowHide = function()
    {
    	$scope.IsVisible = $scope.IsVisible ? false : true;
    }

    // this.setTab = function(newValue){
    //   this.tab = newValue;
    // };

    // this.isSet = function(tabName){
    //   return this.tab === tabName;
    // };
  });


	var tasks =[
	{
		title:'First task',
		description:'Test task',
		completed:false,
		assign:'Arone',
		id:1
	},
	{
		title:'Second task',
		description:'Test task 2',
		completed:false,
		assign:'Arone',
		id:2
	}
	]

})();