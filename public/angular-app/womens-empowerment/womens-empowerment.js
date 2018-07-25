angular.module('console').controller('WomensController', WomensController);

function WomensController($http) {
	var vm = this;

	vm.getProjects = function() {
		$http.get('/api/projects').then(function(response) {
			console.log(response.data);
			vm.projects = [];
			for(var project in response.data){
				console.log(response.data[project].type);
				if(response.data[project].type == ("womens")){
					vm.projects.push(response.data[project]);
				}
			}
		}).catch(function(error) {
			console.log(error);
		});
	}
	vm.getProjects();
};