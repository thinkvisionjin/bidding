
function search()
{
	if ($("#dwmc").val()=='')
		{
		url = "select_kh";
		}
	else
		{
		url = "select_kh?dwmc="+$("#dwmc").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'dwmc',type : 'string'	},
{name : 'rq',type : 'string'	},
{name : 'khyh',type : 'string'	},
{name : 'yhzh',type : 'string'	},
{name : 'lxdz',type : 'string'	},
{name : 'dzxx',type : 'string'	},
{name : 'cz',type : 'string'	},
{name : 'lxr1',type : 'string'	},
{name : 'sj1',type : 'string'	},
{name : 'lxr2',type : 'string'	},
{name : 'sj2',type : 'string'	},
{name : 'lxr3',type : 'string'	},
{name : 'sj3',type : 'string'	},
{name : 'username',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#kh-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '单位名称', value: 'dwmc', checked: true },,
{ label: '日期', value: 'rq', checked: true },,
{ label: '开户银行', value: 'khyh', checked: true },,
{ label: '银行账号', value: 'yhzh', checked: true },,
{ label: '联系地址', value: 'lxdz', checked: true },,
{ label: '电子信箱', value: 'dzxx', checked: true },,
{ label: '传真', value: 'cz', checked: true },,
{ label: '联系人1', value: 'lxr1', checked: true },,
{ label: '手机1', value: 'sj1', checked: true },,
{ label: '联系人2', value: 'lxr2', checked: false },,
{ label: '手机2', value: 'sj2', checked: false },,
{ label: '联系人3', value: 'lxr3', checked: false },,
{ label: '手机3', value: 'sj3', checked: false },,
{ label: '操作人', value: 'username', checked: false },];
	$('#zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#zdlistbox").on('checkChange', function (event) {
        $("#kh-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#kh-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#kh-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#kh-grid").jqxGrid('endupdate');
    });	
}


function modifykh(id)
{
	window.location.href='khmx?oper=modify&Id='+id;

}

function deletekh(id)
{
    var selectedrowindex = $("#kh-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#kh-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#kh-grid").jqxGrid('getrowid', selectedrowindex);
        $("#kh-grid").jqxGrid('deleterow', rowid);
    }

	$.get('deleterow_kh?Id='+id, function(result){
		alert(result);
	});
}

function printkh(id)
{
	window.location.href='printkh?Id='+id;
//	window.location.replace ('khmx?oper=modify&Id='+id);
}

function detailkh(id)
{
	window.location.href='khmx?oper=detail&Id='+id;
//	window.location.replace ('khmx?oper=modify&Id='+id);
}

$(document).ready(function() {
	
					$("#kh-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#kh-grid")
							.jqxGrid(
									{
										columnsresize: true,
										height : "80%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '单位名称', datafield: 'dwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '开户银行', datafield: 'khyh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '银行账号', datafield: 'yhzh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '联系地址', datafield: 'lxdz', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '电子信箱', datafield: 'dzxx', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '传真', datafield: 'cz', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '联系人1', datafield: 'lxr1', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '手机1', datafield: 'sj1', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '联系人2', datafield: 'lxr2', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '手机2', datafield: 'sj2', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '联系人3', datafield: 'lxr3', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '手机3', datafield: 'sj3', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '操作人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
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
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printkh('+rowdata.Id+')">打印</a>';

														var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifykh('+rowdata.Id+')">修改</a>';

														var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletekh('+rowdata.Id+')">删除</a>';
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailkh('+rowdata.Id+')">详细</a>';
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
											container.append('<input id="khadd" type="button" value="新增" />');
											$("#khadd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#kh-grid").('hidecolumn', 'id');
					search();
					$("#khadd").click(function() {
						window.location.href = 'khmx';
						//window.location.replace('khmx');
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
					addselectfieldwindows();

				});
