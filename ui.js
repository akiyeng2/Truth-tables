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
			<input type="text" class="form-control" placeholder="Enter expression"/>\
		</div>\
	</div>';
	document.getElementsByClassName("expression")[0].children[1].children[0].children[1].disabled=false;

	element.insertAdjacentHTML("afterend",addition);
	
}