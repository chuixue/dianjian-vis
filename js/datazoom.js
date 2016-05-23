// JavaScript Document

function Zoom(id, height_zoom){
	this.parent = $("#" + id);		//parent object
	this.id = id;					//parent div
	this.did = this.id + '_data';	//data div
	this.zid = this.id + '_zoom';	//zoom div
	this.tid = this.id + '_tail';	//tail div
	this.hz = height_zoom || 40;	//height zoom
	this.hd = $("#" + this.id).height() - this.hz;	//height data
	this.tpzooms = 0;	//zoom temp start pos
	this.tpzoome = 100;	//zoom temp end pos
	this.zoomdata = [];
	
	this.zoomOption = {
		dataZoom: { realtime:false, show: true, start : this.tpzooms, height:this.hz, shandleColor:'rgba(70,130,180,0.8)', y:0 },
		xAxis : [ { type : 'time', show:false} ],
		yAxis : [ { type : 'value' } ],
		grid : {x : 0, y : this.hz, height :0, },
		series : [{ name: 'series1', type: 'line', data:[] } ]
	};               

	this.datazoomInit = function (){
		this.parent.html();
		this.parent.append("<div id='" + this.did + "' style='width:100%;height:" + this.hd + "px'></div>").
			append("<div id='" + this.zid + "' style='width:100%;height:" + this.hz + "px'>dd</div>");		
	}	
	this.loadZoom = function (data, callback){ 
		this.zoomdata = data;
		this.zoomOption.series[0].data = data;
		var myChart = echarts.init(document.getElementById(this.zid));
		myChart.setOption(this.zoomOption, true);
		myChart.on("dataZoom", function(p){
			if(Math.abs(p.start - this.tpzooms)<1 && Math.abs(p.end - this.tpzoome)<1)return;
			this.tpzooms = p.start;
			this.tpzoome = p.end;
			if(callback)callback([p.start, p.end], 
				[data[Math.round(data.length * p.start / 100)], data[Math.round(data.length * p.end / 100)]]);
		});
		return this;
	}
	this.addPlay = function(cb_click){
		$("#" + this.zid + " div:first-child").append("<div id='" + this.tid + 
			"' style='float:right;overflow:hidden;padding:0 10px 2px 5px;width:70px;height:" + this.hz + "px'></div>");
		//icon-play-circle
		$("#" + this.tid).append('<i class="icon-play-circle icon-3x" onclick="'+ cb_click+ '"></i>');
	}
	
	this.datazoomInit();
	this.loadZoom();

}

function range(a, b){	var ls = []; for(var i=a; i<b; i++){ ls.push(i); } return ls; }
function cout(obj){ console.log(obj); }