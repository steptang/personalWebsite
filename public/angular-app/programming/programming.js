angular.module('console').controller('ProgrammingController', ProgrammingController);

function ProgrammingController($http) {
	var vm = this;

	vm.getProjects = function() {
		$http.get('/api/projects').then(function(response) {
			console.log(response.data);
			vm.projects = response.data;
		}).catch(function(error) {
			console.log(error);
		});
	}
	vm.getProjects();

};