
function search()
{
	if ($("#dwmc").val()=='' && $("#bsbh").val()=='')
		{
		url = "select_gmbs";
		}
	else
		{
		url = "select_gmbs?dwmc="+$("#dwmc").val()+"&bsbh="+$("#bsbh").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'dwmc',type : 'string'	},
{name : 'nsrsbh',type : 'string'	},
{name : 'lxdz',type : 'string'	},
{name : 'dh',type : 'string'	},
{name : 'khyh',type : 'string'	},
{name : 'yhzh',type : 'string'	},
{name : 'zzsdwmc',type : 'string'	},
{name : 'lxr',type : 'string'	},
{name : 'sj',type : 'string'	},
{name : 'lxrdh',type : 'string'	},
{name : 'lxrdz',type : 'string'	},
{name : 'dzxx',type : 'string'	},
{name : 'cz',type : 'string'	},
{name : 'bsbh',type : 'string'	},
{name : 'je',type : 'string'	},
{name : 'rq',type : 'date'	},
{name : 'username',type : 'string'	},
{name : 'ly',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#gmbs-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="gmbszd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="gmbs_zdlistbox"></div></div></div>');
	$("#gmbszd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '购标书单位名称', value: 'dwmc', checked: true },,
{ label: '纳税人识别号', value: 'nsrsbh', checked: true },,
{ label: '联系地址', value: 'lxdz', checked: false },,
{ label: '电话', value: 'dh', checked: false },,
{ label: '开户银行', value: 'khyh', checked: false },,
{ label: '银行账号', value: 'yhzh', checked: false },,
{ label: '制造商单位名称', value: 'zzsdwmc', checked: false },,
{ label: '联系人', value: 'lxr', checked: true },,
{ label: '手机', value: 'sj', checked: true },,
{ label: '联系人电话', value: 'lxrdh', checked: false },,
{ label: '联系地址', value: 'lxrdz', checked: false },,
{ label: '电子信箱', value: 'dzxx', checked: false },,
{ label: '传真', value: 'cz', checked: false },,
{ label: '标书编号', value: 'bsbh', checked: true },,
{ label: '金额', value: 'je', checked: true },,
{ label: '日期', value: 'rq', checked: true },,
{ label: '操作人', value: 'username', checked: false },,
{ label: '来源', value: 'ly', checked: false },];
	$('#gmbs_zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#gmbs_zdlistbox").on('checkChange', function (event) {
        $("#gmbs-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#gmbs-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#gmbs-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#gmbs-grid").jqxGrid('endupdate');
    });	
}


function modifygmbs(id)
{
	gmbs_popupwindow('modify', id, search);

}

function deletegmbs(id)
{
	if (confirm('是否删除')==false)
	{
		return ;
	}	
    var selectedrowindex = $("#gmbs-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#gmbs-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#gmbs-grid").jqxGrid('getrowid', selectedrowindex);
    }

	$.get('deleterow_gmbs?Id='+id, function(result){
		if (result == 'success')
		{
			confirm('成功')
			$('#gmbs-grid').jqxGrid('deleterow', rowid);
		}
		else
		{
			alert(result)
		}
		
	});
}

function printgmbs(id)
{
    var newWindow = window.open('gmbs_print?Id='+id, '');
    newWindow.print();	
}

function detailgmbs(id)
{
	gmbs_popupwindow('detail', id);
//	window.location.replace ('gmbsmx?oper=modify&Id='+id);
}
function configpopupwindow()
{

	gmbs_init();
}

$(document).ready(function() {
	
					$('#gmbs-expander').jqxExpander({
						toggleMode : 'none',
						showArrow : false,
						height: '100%'
					});
					$("#gmbs-grid")
							.jqxGrid(
									{
										enabletooltips: true,
										columnsresize: true,
										height : "90%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '购标书单位名称', datafield: 'dwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '纳税人识别号', datafield: 'nsrsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '联系地址', datafield: 'lxdz', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '电话', datafield: 'dh', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '开户银行', datafield: 'khyh', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '银行账号', datafield: 'yhzh', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '制造商单位名称', datafield: 'zzsdwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '联系人', datafield: 'lxr', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '手机', datafield: 'sj', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '联系人电话', datafield: 'lxrdh', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '联系地址', datafield: 'lxrdz', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '电子信箱', datafield: 'dzxx', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '传真', datafield: 'cz', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '标书编号', datafield: 'bsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '金额', datafield: 'je', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
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
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printgmbs('+rowdata.Id+')">打印</a>';
														if(rowdata['ly']=='交易流水确认')
															{
															b = '';
															c = '';
											
															}
														else
															{
																b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifygmbs('+rowdata.Id+')">修改</a>';

																c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletegmbs('+rowdata.Id+')">删除</a>';
															}
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailgmbs('+rowdata.Id+')">详细</a>';
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
											container.append('<input id="gmbsadd" type="button" value="新增" />');
											$("#gmbsadd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});

					search();
					$("#gmbsadd").click(function() {
						gmbs_popupwindow('add', '', search);
					});
					$("#selectfiled").click(function() {
						$("#gmbszd_popupWindow").jqxWindow('open');
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
					configpopupwindow();

				});
