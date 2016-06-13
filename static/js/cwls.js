
function search()
{
	if ($("#bsbh").val()=='')
		{
		url = "select_cwls";
		}
	else
		{
		url = "select_cwls?bsbh="+$("#bsbh").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'bsbh',type : 'string'	},
{name : 'sz',type : 'string'	},
{name : 'zy',type : 'string'	},
{name : 'je',type : 'string'	},
{name : 'ywlx',type : 'string'	},
{name : 'lyId',type : 'string'	},
{name : 'username',type : 'string'	},
{name : 'rq',type : 'date'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#cwls-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="cwlszd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="cwls_zdlistbox"></div></div></div>');
	$("#cwlszd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '标书编号', value: 'bsbh', checked: true },,
{ label: '收支', value: 'sz', checked: true },,
{ label: '摘要', value: 'zy', checked: true },,
{ label: '金额', value: 'je', checked: true },,
{ label: '业务类型', value: 'ywlx', checked: true },,
{ label: '来源序号', value: 'lyId', checked: true },,
{ label: '操作人', value: 'username', checked: false },,
{ label: '日期', value: 'rq', checked: false },];
	$('#cwls_zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#cwls_zdlistbox").on('checkChange', function (event) {
        $("#cwls-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#cwls-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#cwls-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#cwls-grid").jqxGrid('endupdate');
    });	
}


function modifycwls(id)
{
	cwls_popupwindow('modify', id, search);

}

function deletecwls(id)
{
    var selectedrowindex = $("#cwls-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#cwls-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#cwls-grid").jqxGrid('getrowid', selectedrowindex);
        
    }

	$.get('deleterow_cwls?Id='+id, function(result){
		alert(result);
		if (result == 'success') {
			$("#cwls-grid").jqxGrid('deleterow', rowid);
		}
		
	});
}

function printcwls(id)
{
	window.location.href='cwls_print?Id='+id;
//	window.location.replace ('cwlsmx?oper=modify&Id='+id);
}

function detailcwls(id)
{
	cwls_popupwindow('detail', id);
//	window.location.replace ('cwlsmx?oper=modify&Id='+id);
}
function configpopupwindow()
{

	cwls_init();
}

$(document).ready(function() {
	
					$("#cwls-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false,
						height:'100%'
					});
					$("#cwls-grid")
							.jqxGrid(
									{
										enabletooltips: true,
										columnsresize: true,
										height : "90%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '标书编号', datafield: 'bsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '收支', datafield: 'sz', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '摘要', datafield: 'zy', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '金额', datafield: 'je', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '业务类型', datafield: 'ywlx', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '来源序号', datafield: 'lyId', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '操作人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '日期', datafield: 'rq', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
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
														//var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printcwls('+rowdata.Id+')">打印</a>';
														var a = '';
														var b = '';
														var c = '';
														if (rowdata['lyId']=='0')
														{
															b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifycwls('+rowdata.Id+')">修改</a>';

															c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletecwls('+rowdata.Id+')">删除</a>';
														}
														else
														{
															
														}
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailcwls('+rowdata.Id+')">详细</a>';
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
											container.append('<input id="cwlsadd" type="button" value="新增" />');
											$("#cwlsadd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#cwls-grid").('hidecolumn', 'id');
					search();
					$("#cwlsadd").click(function() {
						cwls_popupwindow('add', '', search);
						//window.location.replace('cwlsmx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#cwlszd_popupWindow").jqxWindow('open');
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
