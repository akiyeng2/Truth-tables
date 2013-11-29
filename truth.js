/** 
 * This generates a table which iterates through the values on a truth table
 * 
 * @param {integer} num: The number of variables to generate an array for
 * @example
 * //returns [[1,1,0,0],[1,0,1,0]]
 * genval	ues(2);
 * @returns {integer array} The values of the variables to iterate through
 */
function genvalues(num){
	var array=[];
	for(var i=1;i<=num;i++){
		array.push([]);
		//Check how often to switch the value
		var modulation=Math.pow(2,num-i);
		var bool=1;
		for(var j=1;j<=Math.pow(2,num);j++){
			if(modulation<=0){
				//Reset the modulation and flip the value
				modulation=Math.pow(2,num-i);
				bool^=true;
			}  
			
			array[i-1].push(bool);
			modulation--;
		}
	}
	return array;
}
/**
 * Generates a truth table in console
 *
 * @param {String} input The string with the truth statement, e.g. "p and q"
 * @param {Integer} num The number of variables
 * @returns {Boolean[]} The results of the truth table
 */

function table(input, num){
	var postfix=shunt(input);
	vars={};
	for(var i=112;i<112+num;i++){
		vars[String.fromCharCode[i]]=1;
	}
	var vals=genvalues(num);
	var results=[];
	for(var i=0;i<Math.pow(2,num);i++){
		var output="";
		for(var j=0;j<num;j++){
			//Start at 112, the char code for p, and go forward
			vars[String.fromCharCode(j+112)]=vals[j][i];
			output+=!!vals[j][i]+"\t";
		}
		//Clone the input as opposed to creating a reference to it
		newinput=JSON.parse(JSON.stringify(postfix));

		for(var z=0;z<newinput.length;z++){
			var token=newinput[z].name;
			//Check if the token is a variable, if it is, replace it with its value
			if((token.length===1) && !(token=="(" ||token==")")){
				//Replace "p", or "q", with their respective values
				newinput[z].name=vars[newinput[z].name];


			}
		}
		//Apply the shunting algorithm and evaluate it
		var result=!!RPN(newinput);

		results.push(result);
		
	}
	return results;
}
