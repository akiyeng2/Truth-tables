/**
 * @description Checks if something is numeric
 * 
 * @param n item to check if numeric
 * @returns {Boolean} Returns if it is a number
 */
function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Creates a simple implementation of a Queue
 * 
 * @constructor
 * @returns null
 */
function Queue(){
	/** @private */ this.stack=new Array();
	
	/**
	 * Pops the queue
	 * 
	 * @private
	 * @returns {Token} returns the token at the top of the queue 
	 */
	this.dequeue=function(){
		return this.stack.pop();
	};
	/**
	 * pushes a value onto the queue
	 * 
	 * @private
	 * @param {token} Token to add onto the queue
	 * @returns null
	 */
	this.enqueue=function(addition){
		this.stack.unshift(addition);
	};
}
/**
 * Creates a simple implementation of a stack
 * 
 * @constructor
 * @returns null
 */
function Stack(){
	/** @private */ this.stack=new Array();
	/**
	 * Pops the stack
	 * 
	 * @private
	 * @returns {Token} token at top of stack
	 */
	this.pop=function(){
		return this.stack.pop();
	};
	/**
	 * pushes an item to the stack
	 * 
	 * @private
	 * @param {Token }item
	 * @returns null
	 */
	this.push=function(item){
		this.stack.push(item);
	};
	
	/**
	 * Looks at the top of the stack
	 * 
	 * @private
	 * @returns null
	 */
	this.peek=function(){
		return this.stack[this.stack.length-1];
	};
	/**
	 * Checks if the stack is empty 
	 * 
	 * @private
	 * @returns {Boolean} is the stack empty
	 */
	this.empty=function(){
		return (this.stack.length<1);
	};
}
