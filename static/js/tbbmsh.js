function edit(){
	
}
$(document).ready(function () {
	$("#search").jqxButton({ theme: theme, template: "success" });
	$("#txtKeyword").jqxInput({width:200,height: 25 });
	 $("#gg-jqxgrid").jqxGrid({height:"35%", width:"100%",
		 columns: [
			  { text: '招标书编号', datafield: 'code', width: "20%", cellsalign: 'center', align: 'center' },
			  { text: '招标书名称', datafield: 'title', width: "20%", cellsalign: 'center', align: 'center' },
			  { text: '供应商', datafield: 'buid', width: "20%", cellsalign: 'center', align: 'center' },
			  { text: '投标状态', datafield: 'flag', width: "15%", cellsalign: 'center', align: 'center' },
			  { text: '审核结果', datafield: 'bflag', width: "15%", cellsalign: 'center', align: 'center' },
			  {
                  text: '操作', editable: false, datafield: 'edit',
                  cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                	  var a = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="zbgg?id=">审核</a>';
                	  var a = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'+a+'</div>';
                      return a;
                  }
              }
			]
		});	
	 	label = 'a';
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
		$("#gg-jqxgrid").jqxGrid({source:dataAdapter, selectedrowindex: -1});
	 
}
);