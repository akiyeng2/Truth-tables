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
	if(isNumeric(name)){
		this.type="numeric";
	}
	
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
		this.precedence=4;
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
 * 
 * @param input
 * @param operatorify
 * @returns
 */
function tokenize(input,operatorify){
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
function shunt(input){
	input=tokenize(input,true);
	var operators=new Stack();
	var output=new Queue();
	
	for(var i in input){
//		console.log("Output queue:",output.stack);
//		console.log("Operator stack",operators);
		var token=input[i];
//		console.log(token);
		if(token.type=="numeric"){
			output.enqueue(token);
		}
		else if(token.type=="operator"){
//			console.log(token);
			while(!operators.empty() && operators.peek().type=="operator" && ((token.associativity=="left" && token.precedence==operators.peek().precedence) || (token.precedence<operators.peek().precedence))){
				output.enqueue(operators.pop());
			
			}
			operators.push(token);
			
		}else if(token.type=="open"){
//			console.log(token);
			operators.push(token);
		}else if(token.type=="close"){
			while (!operators.empty()) {
				if(operators.peek().type!="open"){
					output.enqueue(operators.pop());
				}else{
					operators.pop();
					break;
				}
			}
			if(operators.empty()){
//				throw new Error("Mismatched parenthesis");
			}
			
			
		}else{
			output.enqueue(token);
		}
		
	}
	while(!operators.empty()){
		output.enqueue(operators.pop());
	}
	output.stack.reverse();
	return output.stack;
}
function RPN(output){
	var result=new Stack();
	for(var i in output){
//		console.log(result.stack);
		token=output[i];
//		console.log(token.name);
		if(isNumeric(token.name)){
			result.push((token.name)==1?true:false);
//			console.log(result.stack);
		}else{
			
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