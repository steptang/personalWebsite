angular.module('console').controller('HardwareController', HardwareController);

function HardwareController($http) {
	var vm = this;

	vm.getProjects = function() {
		$http.get('/api/projects').then(function(response) {
			console.log(response.data);
			vm.projects = [];
			for(var project in response.data){
				console.log(response.data[project].type);
				if(response.data[project].type == ("hardware")){
					vm.projects.push(response.data[project]);
				}
			}
		}).catch(function(error) {
			console.log(error);
		});
	}
	vm.getProjects();
};