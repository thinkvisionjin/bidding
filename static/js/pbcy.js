
function search()
{
	if ($("#bsbh").val()=='')
		{
		url = "select_pbcy";
		}
	else
		{
		url = "select_pbcy?bsbh="+$("#bsbh").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'bsbh',type : 'string'	},
{name : 'zjxx',type : 'string'	},
{name : 'zfy',type : 'string'	},
{name : 'username',type : 'string'	},
{name : 'rq',type : 'date'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#pbcy-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="pbcyzd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="pbcy_zdlistbox"></div></div></div>');
	$("#pbcyzd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '标书编号', value: 'bsbh', checked: true },,
{ label: '专家信息', value: 'zjxx', checked: false },,
{ label: '总费用', value: 'zfy', checked: true },,
{ label: '操作人', value: 'username', checked: false },,
{ label: '日期', value: 'rq', checked: false },];
	$('#pbcy_zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#pbcy_zdlistbox").on('checkChange', function (event) {
        $("#pbcy-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#pbcy-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#pbcy-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#pbcy-grid").jqxGrid('endupdate');
    });	
}


function modifypbcy(id)
{
	pbcy_popupwindow('modify', id, search);

}

function deletepbcy(id)
{
    var selectedrowindex = $("#pbcy-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#pbcy-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#pbcy-grid").jqxGrid('getrowid', selectedrowindex);
        
    }

	$.get('deleterow_pbcy?Id='+id, function(result){
		alert(result);
		if (result == 'success') {
			$("#pbcy-grid").jqxGrid('deleterow', rowid);
		}
		
	});
}

function printpbcy(id)
{
	window.location.href='pbcy_print?Id='+id;
//	window.location.replace ('pbcymx?oper=modify&Id='+id);
}

function detailpbcy(id)
{
	pbcy_popupwindow('detail', id);
//	window.location.replace ('pbcymx?oper=modify&Id='+id);
}
function configpopupwindow()
{

	pbcy_init();
}

$(document).ready(function() {
	
					$("#pbcy-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#pbcy-grid")
							.jqxGrid(
									{
										enabletooltips: true,
										columnsresize: true,
										height : "80%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '标书编号', datafield: 'bsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '专家信息', datafield: 'zjxx', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '总费用', datafield: 'zfy', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '操作人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '日期', datafield: 'rq', cellsformat:'yyyy-MM-dd hh:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
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
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printpbcy('+rowdata.Id+')">打印</a>';

														var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifypbcy('+rowdata.Id+')">修改</a>';

														var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletepbcy('+rowdata.Id+')">删除</a>';
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailpbcy('+rowdata.Id+')">详细</a>';
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
											container.append('<input id="pbcyadd" type="button" value="新增" />');
											$("#pbcyadd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#pbcy-grid").('hidecolumn', 'id');
					search();
					$("#pbcyadd").click(function() {
						pbcy_popupwindow('add', '', search);
						//window.location.replace('pbcymx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#pbcyzd_popupWindow").jqxWindow('open');
					});					
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search();
					});					

					$('#bsbh').jqxInput();
					addselectfieldwindows();
					configpopupwindow();

				});
