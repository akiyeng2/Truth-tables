Element.prototype.remove=function(){
	this.parentElement.removeChild(this);
	if(document.getElementsByClassName("expression").length==1){
		document.getElementsByClassName("expression")[0].children[1].children[0].children[1].disabled=true;
	}else{
		document.getElementsByClassName("expression")[0].children[1].children[0].children[1].disabled=false;

	}
};
function add(element){
	var addition='\
	<div class="expression">\
		<br>\
		<div class="input-group">\
			<span class="input-group-btn">\
			<button type="button" class="btn btn-default" onclick="add(this.parentNode.parentNode.parentNode);this.blur();"><span class="glyphicon glyphicon-plus"></span></button>\
			<button type="button" class="btn btn-default" onclick="this.parentNode.parentNode.parentNode.remove();"><span class="glyphicon glyphicon-minus"></span></button>\
			</span>\
			<input type="text" class="form-control" placeholder="Enter expression" onkeydown="check(this.parentNode.parentNode,event);"/>\
		</div>\
	</div>';
	document.getElementsByClassName("expression")[0].children[1].children[0].children[1].disabled=false;

	element.insertAdjacentHTML("afterend",addition);
	
}
function check(element,event){
	var keynum=0;
	if(window.event){
		keynum=event.keyCode;
	}else if(e.which){
		keynum=event.which;
	}
	if(keynum==9){
		event.preventDefault();
		if(!event.shiftKey){
			if(element.nextElementSibling.tagName!="BR"){
				element.nextElementSibling.children[1].children[1].focus();
			}else{
				add(element);
				element.nextElementSibling.children[1].children[1].focus();
			}
		}else{
			element.previousElementSibling.children[1].children[1].focus();
		}
	}
	
	
}
function generate(btn){
	$("#results").css("display","block");
	$("#truthtable").html("");
	btn.blur();
	var expressions=document.getElementsByClassName("expression");
	var truthTable=genvalues(document.getElementById("numvars").value);
	var columns=[];
	
	for(var i=112;i<parseInt(document.getElementById("numvars").value)+112;i++){
		columns.push(String.fromCharCode(i));
	}
	for(var i=0;i<expressions.length;i++){
		var exp=expressions[i].children[1].children[1].value;
		columns.push(str_replace(["nand","and","equals","implies","xor","nor","or","not"],["\\uparrow","\\land","\\Leftrightarrow","\\implies","\\oplus","\\downarrow","\\lor","\\lnot"],exp));
		truthTable.push(table(exp,document.getElementById("numvars").value));
		
		
	}
	var htmltable=$("<table></table>");
	htmltable.attr("class","table table-bordered");
	var row=$("<tr></tr>");
	for(var i=0;i<columns.length;i++){
		var val=columns[i];
		
		row.append($("<td></td>").html("\\("+val+"\\)"));
		
	}
	htmltable.append(row);

	for(var i=0;i<Math.pow(2,document.getElementById("numvars").value);i++){
		row=$("<tr></tr>");
		for(var j=0;j<truthTable.length;j++){
			var value=(truthTable[j][i])?"T":"F";
			row.append($("<td></td>").html(value));
		}
		htmltable.append(row);
	}
	htmltable.appendTo(document.getElementById("truthtable"));
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

	
	
}