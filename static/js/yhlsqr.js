
function search()
{
	if ($("#dwmc").val()==''&&$("#wjm").val()=='')
		{
		url = "select_yhlsqr";
		}
	else
		{
		url = "select_yhlsqr?dwmc="+$("#dwmc").val()+"&wjm="+$("#wjm").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'dwmc',type : 'string'	},
{name : 'qrlx',type : 'string'	},
{name : 'rq',type : 'date'	},
{name : 'qrje',type : 'string'	},
{name : 'yhlsId',type : 'string'	},
{name : 'cwqrbz',type : 'string'	},
{name : 'username',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#yhlsqr-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="yhlsqrzd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="yhlsqr_zdlistbox"></div></div></div>');
	$("#yhlsqrzd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '单位名称', value: 'dwmc', checked: true },,
{ label: '确认类型', value: 'qrlx', checked: true },,
{ label: '日期', value: 'rq', checked: true },,
{ label: '确认金额', value: 'qrje', checked: true },,
{ label: '银行流水Id', value: 'yhlsId', checked: true },,
{ label: '财务确认标志', value: 'cwqrbz', checked: true },,
{ label: '操作人', value: 'username', checked: false },];
	$('#yhlsqr_zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#yhlsqr_zdlistbox").on('checkChange', function (event) {
        $("#yhlsqr-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#yhlsqr-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#yhlsqr-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#yhlsqr-grid").jqxGrid('endupdate');
    });	
}

function qr(id, index)
{
	row = $("#yhlsqr-grid").jqxGrid('getrowdata', index);
	$.get('updaterow_yhlscwqr?Id='+id+'&yhlsId='+row['yhlsId'], function(result){
		alert(result);
		if (result == 'success') {

	        
			row['cwqrbz'] = '确认'
			$('#yhlsqr-grid').jqxGrid('updaterow', index, row);			
		}
	});
}

function qxqr(id, index)
{
	row = $("#yhlsqr-grid").jqxGrid('getrowdata', index);
	$.get('updaterow_yhlscwqxqr?Id='+id+'&yhlsId='+row['yhlsId'], function(result){
		alert(result);
		if (result == 'success') {

	        
			row['cwqrbz'] = '未确认'
			$('#yhlsqr-grid').jqxGrid('updaterow', index, row);			
		}
	});
}

function modifyyhlsqr(id)
{
	yhlsqr_popupwindow('modify', id, search);

}

function deleteyhlsqr(id)
{
    var selectedrowindex = $("#yhlsqr-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#yhlsqr-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#yhlsqr-grid").jqxGrid('getrowid', selectedrowindex);
        
    }

	$.get('deleterow_yhlsqr?Id='+id, function(result){
		alert(result);
		if (result == 'success') {
			$("#yhlsqr-grid").jqxGrid('deleterow', rowid);
		}
		
	});
}

function printyhlsqr(id)
{
	window.location.href='yhlsqr_print?Id='+id;
//	window.location.replace ('yhlsqrmx?oper=modify&Id='+id);
}

function detailyhlsqr(id)
{
	yhlsqr_popupwindow('detail', id);
//	window.location.replace ('yhlsqrmx?oper=modify&Id='+id);
}
function configpopupwindow()
{
	$('#wjm').jqxComboBox({ placeHolder: "", autoComplete:true});
	$.get('getyhlsqrpz', function (result) {
		//需特殊处理
		$('#wjm').jqxComboBox({ source: result['wjm']});
		
		
	}, 'json');	
}

$(document).ready(function() {
	
					$("#yhlsqr-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#yhlsqr-grid")
							.jqxGrid(
									{
										enabletooltips: true,
										columnsresize: true,
										height : "80%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '单位名称', datafield: 'dwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '确认类型', datafield: 'qrlx', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '确认金额', datafield: 'qrje', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '银行流水Id', datafield: 'yhlsId', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '财务确认标志', datafield: 'cwqrbz', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
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
																if (rowdata['cwqrbz']=='未确认')
																{
																	var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="qr('+rowdata.Id+','+index+')">确认</a>';
																	
																}
																else
																{
																	var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="qxqr('+rowdata.Id+','+index+')">取消确认</a>';	
																}
														

														

														var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
																+ a + '</div>';
														return d;
													}
												} ],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);
											container.append('<input id="yhlsqradd" type="button" value="新增" />');
											$("#yhlsqradd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#yhlsqr-grid").('hidecolumn', 'id');
					search();
					$("#yhlsqradd").click(function() {
						yhlsqr_popupwindow('add', '', search);
						//window.location.replace('yhlsqrmx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#yhlsqrzd_popupWindow").jqxWindow('open');
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
