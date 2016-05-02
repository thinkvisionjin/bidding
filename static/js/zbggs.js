function edit(){
	
}
$(document).ready(function () {
	$("#search").jqxButton({ theme: theme, template: "success" });
	$("#txtKeyword").jqxInput({width:200,height: 25 });
	 $("#gg-jqxgrid").jqxGrid({height:"35%", width:"100%",
		 columns: [
			  { text: '标题', datafield: 'title', width: "60%", cellsalign: 'center', align: 'center' },
			  { text: '发布日期', datafield: 'addtime', width: "20%", cellsalign: 'center', align: 'center', cellsformat:'yyyy-MM-dd' },
			  {
                  text: '操作', editable: false, datafield: 'edit',
                  cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                	  var a = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="zbgg?id=">修改</a>';
                	  var a = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'+a+'</div>';
                      return a;
                  }
              },
			  { text: '操作', datafield: 'cz', columntype: 'button', cellsrenderer: function () {
				 return "修改";
			  }, buttonclick: function (row) {
				  self.location = "zbgg";
				 // open the popup window when the user clicks a button.
	//			 editrow = row;
		//		 var offset = $("#ls-jqxgrid").offset();
		//		 $("#popupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });

				 // get the clicked row's data and initialize the input fields.
	//			 var dataRecord = $("#ls-jqxgrid").jqxGrid('getrowdata', editrow);

//				 $("#popupWindow").jqxWindow('open');
			 }
			 }
			]
		});	
	 	label = 'a';
		url = "getzbgg";
		var source =
		{
			datatype: "json",
			datafields: [
			    { name: 'id', type: 'string' },         
				{ name: 'title', type: 'string' },
				{ name: 'addtime', type: 'date' }
			],
			id: 'id',
			url: url
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#gg-jqxgrid").jqxGrid({source:dataAdapter, selectedrowindex: -1});
	 
}
);