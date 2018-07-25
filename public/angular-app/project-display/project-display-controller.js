angular.module('console').controller('ProjectController', ProgrammingController);

function ProjectController($http, $routeParams) {
	var vm = this;
	var id = $routeParams.id;
	var addr = '/api/projects/' + id;
	vm.getProject = function() {
		$http.get(addr).then(function(response) {
			console.log(response.data);
			vm.project = response.data;
		}).catch(function(error) {
			console.log(error);
		});
	}
	vm.getProject();

};