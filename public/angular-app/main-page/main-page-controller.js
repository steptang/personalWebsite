angular.module('console').controller('MainController', MainController);

function MainController($cookies, AuthFactory) {
	var vm = this;

	//set global variables
	vm.title = 'AWS Instance Control Panel';
	vm.subtitle = 'Software Deployment and Testing';

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = 250;
    var w = $(window).width();
    
    var nh = Math.floor(Math.random() * h)+300;
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(){
    var newqa = makeNewPosition();
    var newqb = makeNewPosition();
    var newqc = makeNewPosition();
    var newqd = makeNewPosition();
    var newqe = makeNewPosition();
    var oldqa = $('.a').offset();
    var oldqb = $('.b').offset();
    var oldqc = $('.c').offset();
    var oldqd = $('.d').offset();
    var oldqe = $('.d').offset();
    var speeda = calcSpeed([oldqa.top, oldqa.left], newqa);
    var speedb = calcSpeed([oldqb.top, oldqb.left], newqb);
    var speedc = calcSpeed([oldqc.top, oldqc.left], newqc);
    var speedd = calcSpeed([oldqd.top, oldqd.left], newqd);
    var speede = calcSpeed([oldqe.top, oldqe.left], newqe);
    
    $('.a').animate({ top: newqa[0], left: newqa[1] }, speeda, function(){
      animateDiv();        
    });
    $('.b').animate({ top: newqb[0], left: newqb[1] }, speedb, function(){
      animateDiv();        
    });
    $('.c').animate({ top: newqc[0], left: newqc[1] }, speedc, function(){
      animateDiv();        
    });
    $('.d').animate({ top: newqd[0], left: newqd[1] }, speedd, function(){
      animateDiv();        
    });
    $('.e').animate({ top: newqe[0], left: newqe[1] }, speede, function(){
      animateDiv();        
    });
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}

animateDiv();

}