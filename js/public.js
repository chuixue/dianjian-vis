// JavaScript Document
function dateF(date){ return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(); }
function getKeys(obj){
	var ls=[];
	for(var key in obj){ ls.push(key);}
	return ls;
}
function getValues(obj){
	var ls=[];
	for(var key in obj){ ls.push(obj[key]);}
	return ls;
}
function getItemsCount(obj){
	var count = 0;
	for(var key in obj)count++;
	return count;	
}
function range(ls, callback){
	for(var i=0; i<ls.length; i++)for(var j=i+1; j<ls.length; j++)callback(ls[i], ls[j]);
}
function rangeN(a, b){	var ls = []; for(var i=a; i<b; i++){ ls.push(i); } return ls; }