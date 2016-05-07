angular.module('app', [])
	.controller('todoCtrl', function($scope) {
		$scope.todoList = [
			{text: 'learn angularJs', done: false}, 
			{text: 'build app', done: false}, 
			{text: 'learn gulp', done: false}
		];
		$scope.getTotalTodos = function() {
			return $scope.todoList.length;
		};
		$scope.addToList = function() {
			$scope.todoList.push({text: $scope.textNew, done:false});
		}
		$scope.removeCompleted = function() {
			var oldList = $scope.todoList;
			$scope.todoList = [];
			angular.forEach(oldList, function(todo){
				if (!todo.done) $scope.todoList.push(todo);
			});
		};
	})
