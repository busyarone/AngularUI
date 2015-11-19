//var app = angular.module('spa',[ ]);

(function(){
	var app = angular.module('spa',[ ]);

	// app.controller('TaskController',function(){

	// 	this.tasks = tasks;
	// });

	app.controller('TaskController',['$http',function($http){
		var assigner = this;
		assigner.tasks = [];

		$http.get('http://127.0.0.1:8000/tasks/').success(function(data){
			//console.log(data);

			assigner.tasks = data;
			//console.log(assigner.tasks);
		}); 

		
	}


	]);

	
	app.controller('ShowController', function($scope){
		console.log('inside show controller');
    $scope.IsVisible = false;
    $scope.ShowHide = function()
    {
    	console.log('show hide function');
    	$scope.IsVisible = $scope.IsVisible ? false : true;
    }

   
  });


	app.controller("AddController",['$http',function($http){
		this.newtask ={};

		console.log('inside add controller');
		this.createnewtask = function(tasklist)
		{	
			this.newtask.completed="false";
			console.log('pushing new task');
			console.log(tasklist.tasks);
			tasklist.tasks.push(this.newtask);

			$http.post('http://127.0.0.1:8000/tasks/',this.newtask);

			this.newtask ={};
		};
	}]);

	app.controller("DeleteController",['$http',function($http){
		
		console.log('inside delete controller');

		this.deletetask = function(tasklist,deletetask)
		{
			console.log('deleting a task');
			console.log(tasklist.tasks);
			console.log(deletetask);

			for(var i=0; i<tasklist.tasks.length; i++)
			{
				var obj = tasklist.tasks[i];
				console.log(obj.id);
				console.log(deletetask.id);
				var task_id = obj.id;
				if(deletetask.id == task_id)
				{
					console.log('matching id found');
					tasklist.tasks.splice(i,1);

					//$http.delete('http://127.0.0.1:8000/tasks/'.concat(task_id));

					//$http({method:'DELETE',url:'http://127.0.0.1:8000/tasks/'.concat(task_id)});
					$http({method:'DELETE',url:'http://127.0.0.1:8000/tasks/'+task_id+'/'});
				}



			}
		};
		
	}]);


	app.controller("UpdateController",['$http','$scope',function($http,$scope){
		
		console.log('inside update controller');

		this.update_task = {};

		
		this.update_current_task = function(tasklist,task)
		{
			
			console.log(tasklist);
			console.log(task);
			this.update_task.id = task.id;
			console.log(this.update_task);
			console.log("looping all tasks");

			for(var i=0;i<tasklist.tasks.length;i++)
			{

				var obj = tasklist.tasks[i];
				console.log(obj);
				if(task.id == obj.id)
				{
					console.log('matching id found');
					console.log(tasklist.tasks[i]);
					tasklist.tasks[i].title = this.update_task.title;
					tasklist.tasks[i].description = this.update_task.description;
					tasklist.tasks[i].assign = this.update_task.assign;
					tasklist.tasks[i].completed = this.update_task.completed;
					console.log(tasklist.tasks[i]);

					$http.put('http://127.0.0.1:8000/tasks/'+task.id+'/',this.update_task);
				}
			}


			this.update_task ={};
			
		};
		
	}]);


	

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