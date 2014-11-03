function StateMachine() {
	this.state = null;
}

createjs.EventDispatcher.initialize(StateMachine.prototype); // mixin EventDispatcher

StateMachine.prototype.switch = function() {
	var args = Array.prototype.slice.call(arguments);
	var state = args.shift();
	
	console.log('switch ' + this.state + ' -> ' + state);
	
	var oldState = this.state;
	this.state = state;
	this.dispatchEvent({type: 'switch', oldState : oldState, newState : this.state, args : args});
	
	
	// var exitEvent;
	// if (this.state) {
		// exitEvent = {type: 'exit' + this.state, args : args};
	// }
	// this.state = state;
	// if (exitEvent) {
		// this.dispatchEvent(exitEvent);
	// }
	// if (this.state) {
		// this.dispatchEvent({type: 'enter' + this.state, args : args});
	// }
	
}

// function StateMachineTest() {
	// var machine = new StateMachine();
	// machine['enterState1'] = function (){console.log("enter state 1")};
	// machine['exitState1'] = function (){console.log("exit state 1")};
	// machine['enterState2'] = function (){console.log("enter state 2")};
	
	// machine.switch('State1');
	// machine.switch('State2');
	
	// console.log(machine);
// }

