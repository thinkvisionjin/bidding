
function search()
{
	if ($("#dwmc").val()=='')
		{
		url = "select_tbzj";
		}
	else
		{
		url = "select_tbzj?dwmc="+$("#dwmc").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'dwmc',type : 'string'	},
{name : 'rq',type : 'date'	},
{name : 'bsbh',type : 'string'	},
{name : 'username',type : 'string'	},
{name : 'ly',type : 'string'	},
{name : 'khyh',type : 'string'	},
{name : 'yhzh',type : 'string'	},
{name : 'fkfs',type : 'string'	},
{name : 'je',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#tbzj-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="tbzjzd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="tbzj_zdlistbox"></div></div></div>');
	$("#tbzjzd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '单位名称', value: 'dwmc', checked: true },,
{ label: '日期', value: 'rq', checked: true },,
{ label: '标书编号', value: 'bsbh', checked: true },,
{ label: '操作人', value: 'username', checked: false },,
{ label: '来源', value: 'ly', checked: false },,
{ label: '开户银行', value: 'khyh', checked: true },,
{ label: '银行账号', value: 'yhzh', checked: true },,
{ label: '付款方式', value: 'fkfs', checked: true },,
{ label: '金额', value: 'je', checked: true },];
	$('#tbzj_zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#tbzj_zdlistbox").on('checkChange', function (event) {
        $("#tbzj-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#tbzj-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#tbzj-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#tbzj-grid").jqxGrid('endupdate');
    });	
}


function modifytbzj(id)
{
	tbzj_popupwindow('modify', id, search);

}

function deletetbzj(id)
{
    var selectedrowindex = $("#tbzj-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#tbzj-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#tbzj-grid").jqxGrid('getrowid', selectedrowindex);
        
    }

	$.get('deleterow_tbzj?Id='+id, function(result){
		alert(result);
		$("#tbzj-grid").jqxGrid('deleterow', rowid);
	});
}

function printtbzj(id)
{
	window.location.href='tbzj_print?Id='+id;
//	window.location.replace ('tbzjmx?oper=modify&Id='+id);
}

function detailtbzj(id)
{
	tbzj_popupwindow('detail', id);
//	window.location.replace ('tbzjmx?oper=modify&Id='+id);
}
function configpopupwindow()
{

	tbzj_init();
}

$(document).ready(function() {
	
					$("#tbzj-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#tbzj-grid")
							.jqxGrid(
									{
										enabletooltips: true,
										columnsresize: true,
										height : "80%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '单位名称', datafield: 'dwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', cellsformat:'yyyy-MM-dd hh:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '标书编号', datafield: 'bsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '操作人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '来源', datafield: 'ly', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '开户银行', datafield: 'khyh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '银行账号', datafield: 'yhzh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '付款方式', datafield: 'fkfs', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '金额', datafield: 'je', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
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
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printtbzj('+rowdata.Id+')">打印</a>';

														var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifytbzj('+rowdata.Id+')">修改</a>';

														var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletetbzj('+rowdata.Id+')">删除</a>';
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailtbzj('+rowdata.Id+')">详细</a>';
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
											container.append('<input id="tbzjadd" type="button" value="新增" />');
											$("#tbzjadd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#tbzj-grid").('hidecolumn', 'id');
					search();
					$("#tbzjadd").click(function() {
						tbzj_popupwindow('add', '', search);
						//window.location.replace('tbzjmx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#tbzjzd_popupWindow").jqxWindow('open');
					});					
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search();
					});					

					$('#dwmc').jqxInput();
					addselectfieldwindows();
					configpopupwindow();

				});
