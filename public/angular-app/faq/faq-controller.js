/* /public/angular-app/faq/faq-controller.js
- sets title for the FAQ page */

angular.module('console').controller('FaqController', FaqController);

function FaqController() {
	var vm = this;

	//set global variables
	vm.title = 'Frequently Asked Questions';
}