function uploadsetup()

{
	$('#yhlswj-upload').jqxFileUpload({width:300,   uploadUrl: 'fileUpload', fileInputName: 'fileToUpload',
		localization:{browseButton: '上传流水', uploadButton : '上传', cancelButton: '取消', uploadFileTooltip: '上传', cancelFileTooltip: '取消'}});
		$('#yhlswj-upload').on('uploadEnd', function (event) {
			var args = event.args;
			var fileName = args.file;
			var serverResponce = args.response;
			confirm(serverResponce);
			search()
			//$("#jqxDropDownList").jqxDropDownList('insertAt', fileName,  0); 
			// Your code here.
		});	
}
function search()
{
	if ($("#wjm").val()=='')
		{
		url = "select_yhlswj";
		}
	else
		{
		url = "select_yhlswj?wjm="+$("#wjm").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'Id',type : 'string'	},
{name : 'rq',type : 'date'	},
{name : 'wjm',type : 'string'	},
{name : 'username',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#yhlswj-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: true },,
{ label: '日期', value: 'rq', checked: true },,
{ label: '文件名', value: 'wjm', checked: true },,
{ label: '操作人', value: 'username', checked: true },];
	$('#zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#zdlistbox").on('checkChange', function (event) {
        $("#yhlswj-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#yhlswj-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#yhlswj-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#yhlswj-grid").jqxGrid('endupdate');
    });	
}


function modifyyhlswj(id)
{
	window.location.href='yhlswjmx?oper=modify&Id='+id;

}

function deleteyhlswj(id)
{
    var selectedrowindex = $("#yhlswj-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#yhlswj-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#yhlswj-grid").jqxGrid('getrowid', selectedrowindex);
        $("#yhlswj-grid").jqxGrid('deleterow', rowid);
    }

	$.get('deleterow_yhlswj?Id='+id, function(result){
		alert(result);
	});
}

function printyhlswj(id)
{
	window.location.href='yhlswj_print?Id='+id;
//	window.location.replace ('yhlswjmx?oper=modify&Id='+id);
}

function detailyhlswj(id)
{
	window.location.href='yhlswjmx?oper=detail&Id='+id;
//	window.location.replace ('yhlswjmx?oper=modify&Id='+id);
}

$(document).ready(function() {
	
					$("#yhlswj-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#yhlswj-grid")
							.jqxGrid(
									{
										enabletooltips: true,
										columnsresize: true,
										height : "80%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '文件名', datafield: 'wjm', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '操作人', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
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

														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deleteyhlswj('+rowdata.Id+')">删除</a>';

														var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
																+ d + '</div>';
														return d;
													}
												} ],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);

											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#yhlswj-grid").('hidecolumn', 'id');
					search();

					$("#selectfiled").click(function() {
						$("#popupWindow").jqxWindow('open');
					});					
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search();
					});					

					$('#wjm').jqxInput();
					addselectfieldwindows();
					uploadsetup();

				});
