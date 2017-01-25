
function search(flag)
{
	if ($("#username").val()=='' && $("#hys").val()=='')
	{
		url = "select_hysgl?flag="+flag;
	}
	else
	{
		url = "select_hysgl?flag="+flag+"&zt="+$("#username").val()+"&hys="+$("#hys").val()
	}

	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
		{name : 'username',type : 'string'	},
		{name : 'hyzt',type : 'string'	},
		{name : 'hys',type : 'string'	},
		{name : 'kssj',type : 'date'	},
		{name : 'jssj',type : 'date'	},
		{name : 'rq',type : 'date'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#hysgl-grid").jqxGrid({
		source : dataAdapter
	});	
	if (flag!=1)
	{

		searchtree();
	}
	
}
function searchtree()
{

	url = "select_hysgl?flag=2&hysrq="+$('#hysgldate').val();
	var source =
	{
		datatype: "json",
		datafields : [{name : 'Id',type : 'string'	},
		{name : 'username',type : 'string'	},
		{name : 'hyzt',type : 'string'	},
		{name : 'hys',type : 'string'	},
		{name : 'kssj',type : 'date'	},
		{name : 'jssj',type : 'date'	},
		{name : 'rq',type : 'date'	}],
		hierarchy:
		{
			groupingDataFields:
			[
			{
				name: "hys"
			}
			]
		},
		id : 'Id',
		url : url
	};
            // create data adapter.
    var dataAdapter = new $.jqx.dataAdapter(source)	
 	$("#hysgltree-grid").jqxTreeGrid({
		source : dataAdapter
	});	   
	$('#hysgltree-grid').on('bindingComplete', function (event) { $("#hysgltree-grid").jqxTreeGrid('expandAll'); }); 
	
}

        function addselectfieldwindows()
        {
        	$(document.body).append('<div id="hysglzd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="hysgl_zdlistbox"></div></div></div>');
        	$("#hysglzd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
        	var listSource = [{ label: '序号', value: 'Id', checked: true },,
        	{ label: '申请人', value: 'username', checked: true },,
        	{ label: '会议主题', value: 'hyzt', checked: true },,
        	{ label: '会议室', value: 'hys', checked: true },,
        	{ label: '开始时间', value: 'kssj', checked: true },,
        	{ label: '结束时间', value: 'jssj', checked: true },,
        	{ label: '申请日期', value: 'rq', checked: true },];
        	$('#hysgl_zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
        	$("#hysgl_zdlistbox").on('checkChange', function (event) {
        		$("#hysgl-grid").jqxGrid('beginupdate');
        		if (event.args.checked) {
        			$("#hysgl-grid").jqxGrid('showcolumn', event.args.value);
        		}
        		else {
        			$("#hysgl-grid").jqxGrid('hidecolumn', event.args.value);
        		}
        		$("#hysgl-grid").jqxGrid('endupdate');
        	});	
        }


        function modifyhysgl(id)
        {
        	hysgl_popupwindow('modify', id, search);

        }

        function deletehysgl(id)
        {
            if (confirm('是否删除')==false)
  {
               return ;
  }    

        	var selectedrowindex = $("#hysgl-grid").jqxGrid('getselectedrowindex');
        	var rowscount = $("#hysgl-grid").jqxGrid('getdatainformation').rowscount;
        	if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        		var rowid = $("#hysgl-grid").jqxGrid('getrowid', selectedrowindex);

        	}

        	$.get('deleterow_hysgl?Id='+id, function(result){
        		
        		if (result == 'success') {
        			confirm('成功')
        			$("#hysgl-grid").jqxGrid('deleterow', rowid);
        			searchtree();
        		}
        		else
        		{
        			alert(result);
        		}

        	});
        }

        function printhysgl(id)
        {
        	window.location.href='hysgl_print?Id='+id;
//	window.location.replace ('hysglmx?oper=modify&Id='+id);
}

function detailhysgl(id)
{
	hysgl_popupwindow('detail', id);
//	window.location.replace ('hysglmx?oper=modify&Id='+id);
}
function configpopupwindow()
{

	hysgl_init();
}
function init_treegrid()
{
	        	$("#rcb-expander").jqxExpander({height:'50%'});

            $("#hysgltree-grid").jqxTreeGrid(
            {
            	width: '98%',
            	height: '90%',
                //source: dataAdapter,
                columnsResize: true,

                	

                columns: [
                { text: '申请人', dataField: 'username', width: '10%', cellsalign: 'center', align: 'center'},
                { text: '会议主题', dataField: 'hyzt', width: '20%', cellsalign: 'center', align: 'center'},
              //  { text: '会议室', dataField: 'hys', width: '10%', cellsalign: 'center', align: 'center'},
                { text: '开始时间', dataField: 'kssj', width: '20%', cellsformat:'yyyy-MM-dd HH:mm:ss',cellsalign: 'center', align: 'center'},
                { text: '结束时间', dataField: 'jssj', width: '20%',cellsformat:'yyyy-MM-dd HH:mm:ss',cellsalign: 'center', align: 'center'},
                { text: '申请日期', dataField: 'rq', width: '10%',cellsformat:'yyyy-MM-dd',cellsalign: 'center', align: 'center' }
                ],
                showtoolbar : true,
        		rendertoolbar : function(toolbar) {
        			var me = this;
        			var container = $("<div style='margin: 5px;'></div>");
        			toolbar.append(container);
        			container.append('<div id="hysgldate" style="margin: 0 auto;"/>');
           			$('#hysgldate').jqxDateTimeInput({formatString: "yyyy-MM-dd",template: "primary",culture:'zh-CN'});
									
        		}
            });	
			$('#hysgldate').on('change', function (event) 
			{  
				searchtree();
			});            
            
        }
$(document).ready(function() {
	init_treegrid();
        	$("#hysgl-expander").jqxExpander({height:'49%'});

        	$("#hysgl-grid")
        	.jqxGrid(
        	{
        		enabletooltips: true,
        		columnsresize: true,
				enablebrowserselection: true,
        		height : "75%",
        		width : "98%",
        		columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
        		{ text: '申请人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
        		{ text: '会议主题', datafield: 'hyzt', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
        		{ text: '会议室', datafield: 'hys', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
        		{ text: '开始时间', datafield: 'kssj', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
        		{ text: '结束时间', datafield: 'jssj', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
        		{ text: '申请日期', datafield: 'rq', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
        		{
        			text : '操作',
        			width: '200',
        			editable : false,
        			datafield : 'delete',
        			cellsrenderer : function(
        				index, datafield,
        				value,
        				defaultvalue,
        				column, rowdata) {
        				//var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printhysgl('+rowdata.Id+')">打印</a>';
        				var a = '';
        				var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifyhysgl('+rowdata.Id+')">修改</a>';

        				var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletehysgl('+rowdata.Id+')">删除</a>';
        				//var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailhysgl('+rowdata.Id+')">详细</a>';
        				var d = '';
        				var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
        				+ a+b+c+d + '</div>';
        				return d;
        			}
        		} ],
        		showtoolbar : true,
        		rendertoolbar : function(toolbar) {
        			var me = this;
        			var container = $("<div style='margin: 5px;'></div>");
        			toolbar.append(container);
        			container.append('<input id="hysgladd" type="button" value="申请会议室" />');
        			$("#hysgladd").jqxButton({
        				template : 'success'
        			});
        			container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
        			$("#selectfiled").jqxButton({
        				template : 'info'
        			});											
        		}

        	});
					//$("#hysgl-grid").('hidecolumn', 'id');
					search();
					$("#hysgladd").click(function() {
						hysgl_popupwindow('add', '', search);
						//window.location.replace('hysglmx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#hysglzd_popupWindow").jqxWindow('open');
					});					
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search(1);
					});					
					$("#search_all").jqxButton({
						template : 'success'
					});	
					$("#search_all").click(function() {
						search(3);
					});	
					$('#username').jqxInput();
					$('#hys').jqxDropDownList({ placeHolder: ''});
					addselectfieldwindows();
					configpopupwindow();
					
				});
