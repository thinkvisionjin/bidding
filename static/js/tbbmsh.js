function edit(){
	
}


function rendertoolbar_func(toolbar) {
	var container = $("<div style='margin-top: 5px ;margin-bottom: 10px;'></div>");
    var span = $("<span style='float: left; margin-top: 5px; margin-right: 10px;'>招标编号/名称/公司: </span>");
    var input = $("<input class='jqx-input jqx-widget-content jqx-rc-all' id='searchField' type='text' style='height: 23px; float: left; width: 300px;' />");
	var button  = $("<input style='float: center; margin-left: 10px; margin-right: 10px;' type=\"button\" id=\"searchButton\" value=\"查询\" />")
    toolbar.append(container);
    container.append(span);
    container.append(input);
    container.append(button);
    
}

function initContent(){
	$("#jqxExpander").jqxExpander({width: '1024px', toggleMode: 'dblclick'});
	url = "gettbbmsh";
	var source =
	{
		datatype: "json",
		datafields: [
		    { name: 'code', type: 'string' },         
			{ name: 'title', type: 'string' },
			{ name: 'buid', type: 'string' },
			{ name: 'flag', type: 'string' },
			{ name: 'bflag', type: 'string' }
		],
		id: 'id',
		url: url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#gg-jqxgrid").jqxGrid({
		height:"1024px", 
		width:"100%",
		source:dataAdapter, 
		selectedrowindex: -1,
		showtoolbar: true,
//        autoheight: true,
		rendertoolbar:rendertoolbar_func,
		columns: [
		  { text: '招标书编号', datafield: 'code', width: "20%", cellsalign: 'center', align: 'center' },
		  { text: '招标书名称', datafield: 'title', width: "30%", cellsalign: 'center', align: 'center' },
		  { text: '供应商', datafield: 'buid', width: "20%", cellsalign: 'center', align: 'center' },
		  { text: '投标状态', datafield: 'flag', width: "10%", cellsalign: 'center', align: 'center' },
		  { text: '审核结果', datafield: 'bflag', width: "10%", cellsalign: 'center', align: 'center' },
		  {
            text: '操作', editable: false, datafield: 'edit',cellsalign: 'center',
            cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
            var a = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="zbgg?id=">审核</a>';
            var a = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'+a+'</div>';
            return a;
            }
          }]
     });
}


$(document).ready(function () {
	initContent()
}
);