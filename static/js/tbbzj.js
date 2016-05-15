
function search()
{
	if ($("#dwmc").val()=='' && $("#bsbh").val()=='')
		{
		url = "select_tbbzj";
		}
	else
		{
		url = "select_tbbzj?dwmc="+$("#dwmc").val()+"&bsbh="+$("#bsbh").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'dwmc',type : 'string'	},
{name : 'bsbh',type : 'string'	},
{name : 'bzjlx',type : 'string'	},
{name : 'je',type : 'string'	},
{name : 'rq',type : 'string'	},
{name : 'username',type : 'string'	},
{name : 'ly',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#tbbzj-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '单位名称', value: 'dwmc', checked: true },,
{ label: '标书编号', value: 'bsbh', checked: true },,
{ label: '保证金类型', value: 'bzjlx', checked: true },,
{ label: '金额', value: 'je', checked: true },,
{ label: '日期', value: 'rq', checked: true },,
{ label: '操作人', value: 'username', checked: false },
{ label: '来源', value: 'ly', checked: false },];
	$('#zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#zdlistbox").on('checkChange', function (event) {
        $("#tbbzj-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#tbbzj-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#tbbzj-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#tbbzj-grid").jqxGrid('endupdate');
    });	
}


function modifytbbzj(id)
{
	window.location.href='tbbzjmx?oper=modify&Id='+id;

}

function deletetbbzj(id)
{
    var selectedrowindex = $("#tbbzj-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#tbbzj-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#tbbzj-grid").jqxGrid('getrowid', selectedrowindex);
        $("#tbbzj-grid").jqxGrid('deleterow', rowid);
    }

	$.get('deleterow_tbbzj?Id='+id, function(result){
		alert(result);
	});
}

function printtbbzj(id)
{
	window.location.href='printtbbzj?Id='+id;
//	window.location.replace ('tbbzjmx?oper=modify&Id='+id);
}

function detailtbbzj(id)
{
	window.location.href='tbbzjmx?oper=detail&Id='+id;
//	window.location.replace ('tbbzjmx?oper=modify&Id='+id);
}

$(document).ready(function() {
	
					$("#tbbzj-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#tbbzj-grid")
							.jqxGrid(
									{
										columnsresize: true,
										height : "550px",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '单位名称', datafield: 'dwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '标书编号', datafield: 'bsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '保证金类型', datafield: 'bzjlx', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '金额', datafield: 'je', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '操作人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '来源', datafield: 'ly', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
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
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printtbbzj('+rowdata.Id+')">打印</a>';

														var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifytbbzj('+rowdata.Id+')">修改</a>';

														var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletetbbzj('+rowdata.Id+')">删除</a>';
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailtbbzj('+rowdata.Id+')">详细</a>';
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
											container.append('<input id="tbbzjadd" type="button" value="新增" />');
											$("#tbbzjadd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#tbbzj-grid").('hidecolumn', 'id');
					search();
					$("#tbbzjadd").click(function() {
						window.location.href = 'tbbzjmx';
						//window.location.replace('tbbzjmx');
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

					$('#dwmc').jqxInput();
$('#bsbh').jqxInput();
					addselectfieldwindows();

				});
