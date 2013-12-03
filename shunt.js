 /**
 * Converts a token into an operator
 * @constructor
 * @param {String} name the name of the token you want to convert
 * @returns {Operator} An operator with a name, precedence, type, and associativity
 */
function operator(name){
	//Basically a if-then statement to set precedences. I'll find a better way to do this eventually
	
	
	//Set some defaults
	/** @private */ this.name=name;
	/** @private */ this.associativity="left";
	/** @private */ this.type="operator";
	/** @private */ this.precedence=1;
	//Order of precedence is undefined for boolean logic, so I have to make up my own
	if(isNumeric(name)){
		this.type="numeric";}
	
	else if(name=="("){
		this.type="open";
	}else if(name==")"){
		this.type="close";
	}else if(name=="!"){
		this.precedence=10;
		this.associativity="right";
	}else if(name=="equals" ||name=="implies"){
		this.precedence=5;
	}else if(name=="xor"||name=="nor"){
		this.precqedence=4;
	}else if(name=="nand"){
		this.precedence=3;
	}else if(name=="or"){
		this.precedence=2;
	}else if(name=="and"){
		this.precedence=1;
	}else if(name.length=="1"){
		this.type="numeric";
	}
	//Set up an object for use
	var op={
		"name":this.name,
		"type":this.type,
		"associativity":this.associativity,
		"precedence":this.precedence
	};
	return op;
}
/**
 * This converts a string into a token object
 * 
 * @param {String} input The string you want to turn into tokens
 * @param {Boolean} operatorify If true, return operator objects, otherwise return 
 * @returns {String[]|Token[]} Either returns the original string split into its components, or if operatorify is true, it returns operator objects
 */
function tokenize(input,operatorify){
	//Splits the string by putting a space between each token, with only a few tokens allowed
	//I'm still working on the order of operations here
	input=str_replace(["nand","nor","implies","equals","not","xor","and","or","(",")"],[" 3 "," 4 "," 5 "," 6 "," 7 "," 8 ", " 9 ", " 10 ", " ( "," ) "],input).replace(/\s{2,}/g, ' ').trim();
	input=str_replace(["3","4","5","6","7","8", "9", "10", "(",")"],["nand","nor","implies","equals","not","xor","and","or","(",")"],input).split(" ");
	if(!operatorify){
		return input;
	}else{
		for(var i in input){
			input[i]=new operator(input[i]);
		}
		return input;
	}
}

/**
 * Implements a rudimentary shunting yard algorithm to convert infix to postfix, or Reverse Polish Notation
 * 
 * @param {String} input The string to shunt
 * @returns {Stack} A stack with output tokens to be read in reverse polish
 */
function shunt(input){
	//Split the string into tokens so it can be read by the algorithm
	input=tokenize(input,true);
	//Initialize a stack for operators and a reverse polish output to push to
	var operators=new Stack();
	var output=new Queue();
	
	for(var i in input){
		var token=input[i];
		//Add all numbers and variables to the stack automatically
		if(token.type=="numeric"){
			output.enqueue(token);
		}
		else if(token.type=="operator"){
			/*Add operators to the queue if:
			 * There is something in the operator queue and the token at the top is an operator
			 * and (the token is left associative (anything but the 'not' operator) and it has a precedence lower than or equal to the next token on the stack)
			 */
		
			while(!operators.empty() && operators.peek().type=="operator" && ((token.associativity=="left" && token.precedence==operators.peek().precedence) || (token.precedence<operators.peek().precedence))){
				output.enqueue(operators.pop());
			
			}
			operators.push(token);
			
		}else if(token.type=="open"){
			operators.push(token);
		}else if(token.type=="close"){
			
			//Until you reach an open parenthesis, keep adding operators to the queue
			while (!operators.empty()) {
				if(operators.peek().type!="open"){
					output.enqueue(operators.pop());
				}else{
					operators.pop();
					break;
				}
			}
			
			
		}else{
			output.enqueue(token);
		}
		
	}
	//Add the rest of the items on the operator stack to the queue
	while(!operators.empty()){
		output.enqueue(operators.pop());
	}
	output.stack.reverse();
	return output.stack;
}
/**
 * Returns a single value at the top of a stack after having gone through a shunted function
 * 
 * @param {Queue} output The output queue returned by the shunting yard algorithm
 * @returns {Boolean} The result of the sunting
 */
function RPN(output){
	var result=new Stack();
	for(var i in output){
		token=output[i];
		if(isNumeric(token.name)){
			//Cast numbers to boolean
			result.push((token.name)==1?true:false);
		}else{
			//Basically converting all of the functions into simple ones using ^ ** ! ||
			if(token.name=="not"){
				var first=result.pop();
				result.push(!first);
				
			}else if(token.name=="and"){
				result.push(result.pop() && result.pop());
			}else if(token.name=="or"){
				result.push(result.pop() || result.pop());
			}else if(token.name=="implies"){
				var first=result.pop();
				var second=result.pop();
				result.push(!second||first);
			}else if(token.name=="equals"){
				var first=result.pop();
				var second=result.pop();
				result.push(first==second);

			}else if(token.name=="xor"){
				var first=result.pop();
				var second=result.pop();
				result.push(first^second);
			}else if(token.name=="nor"){
				var first=result.pop();
				var second=result.pop();
				result.push(!(first||second));
			}else if(token.name=="nand"){
				var first=result.pop();
				var second=result.pop();
				result.push(!(first&&second));
			}
		}
		
		
	}
	return result.pop();
}