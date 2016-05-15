
function search()
{
	if ($("#bsbh").val()=='' && $("#zbdw1").val()=='')
		{
		url = "select_zb";
		}
	else
		{
		url = "select_zb?bsbh="+$("#bsbh").val()+"&zbdw1="+$("#zbdw1").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'bsbh',type : 'string'	},
{name : 'zbdw1',type : 'string'	},
{name : 'zbdw2',type : 'string'	},
{name : 'zbdw3',type : 'string'	},
{name : 'username',type : 'string'	},
{name : 'rq',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#zb-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '标书编号', value: 'bsbh', checked: true },,
{ label: '中标备选一', value: 'zbdw1', checked: true },,
{ label: '中标备选二', value: 'zbdw2', checked: true },,
{ label: '中标备选三', value: 'zbdw3', checked: true },,
{ label: '操作人', value: 'username', checked: false },,
{ label: '日期', value: 'rq', checked: true },];
	$('#zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#zdlistbox").on('checkChange', function (event) {
        $("#zb-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#zb-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#zb-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#zb-grid").jqxGrid('endupdate');
    });	
}


function modifyzb(id)
{
	window.location.href='zbmx?oper=modify&Id='+id;

}

function deletezb(id)
{
    var selectedrowindex = $("#zb-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#zb-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#zb-grid").jqxGrid('getrowid', selectedrowindex);
        $("#zb-grid").jqxGrid('deleterow', rowid);
    }

	$.get('deleterow_zb?Id='+id, function(result){
		alert(result);
	});
}

function printzb(id)
{
	window.location.href='printzb?Id='+id;
//	window.location.replace ('zbmx?oper=modify&Id='+id);
}

function detailzb(id)
{
	window.location.href='zbmx?oper=detail&Id='+id;
//	window.location.replace ('zbmx?oper=modify&Id='+id);
}

$(document).ready(function() {
	
					$("#zb-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#zb-grid")
							.jqxGrid(
									{
										columnsresize: true,
										height : "550",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '标书编号', datafield: 'bsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '中标备选一', datafield: 'zbdw1', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '中标备选二', datafield: 'zbdw2', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '中标备选三', datafield: 'zbdw3', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '操作人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '日期', datafield: 'rq', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
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
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printzb('+rowdata.Id+')">打印</a>';

														var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifyzb('+rowdata.Id+')">修改</a>';

														var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletezb('+rowdata.Id+')">删除</a>';
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailzb('+rowdata.Id+')">详细</a>';
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
											container.append('<input id="zbadd" type="button" value="新增" />');
											$("#zbadd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#zb-grid").('hidecolumn', 'id');
					search();
					$("#zbadd").click(function() {
						window.location.href = 'zbmx';
						//window.location.replace('zbmx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#popupWindow").jqxWindow('open');
					});					
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search();
					});					

					$('#bsbh').jqxInput();
$('#zbdw1').jqxInput();
					addselectfieldwindows();

				});
