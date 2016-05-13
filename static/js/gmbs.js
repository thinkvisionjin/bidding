function search()
{
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'id', checked: true },
	                   { label: '购标书单位名称', value: 'dwmc', checked: true },
	                   { label: '日期', value: 'rq', checked: true },
	                   { label: '制造商单位中文名称', value: 'zzszwmc', checked: true },
	                   { label: '制造商单位英文名称', value: 'zzsywmc', checked: false },
	                   { label: '制造商国别', value: 'zzsgb', checked: false },
	                   { label: '联系地址', value: 'lxdz', checked: false },
	                   { label: '联系人', value: 'lxr', checked: true },
	                   { label: '手机', value: 'sj', checked: true },
	                   { label: '电子信箱', value: 'dzxx', checked: false },
	                   { label: '传真', value: 'cz', checked: false },
	                   { label: '标书编号', value: 'bsbh', checked: true },
	                   { label: '金额', value: 'je', checked: true }];
	$('#zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#zdlistbox").on('checkChange', function (event) {
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
	window.location.href='gmbsmx?oper=modify&id='+id;
//	window.location.replace ('gmbsmx?oper=modify&id='+id);
}

function deletegmbs(id)
{
/*	var selectedrowindex = $("#gmbs-grid").jqxGrid('getrowid', selectedrowindex);
	alert(selectedrowindex+" "+id);
	$("#gmbs-grid").jqxGrid('deleterow', selectedrowindex);*/
    var selectedrowindex = $("#gmbs-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#gmbs-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var id = $("#gmbs-grid").jqxGrid('getrowid', selectedrowindex);
        $("#gmbs-grid").jqxGrid('deleterow', id);
    }

	$.get('deleterow?table=gmbs&id='+id, function(result){
		alert(result);
	});
//	window.location.href='gmbsmx?oper=delete&id='+id;
//	window.location.replace ('gmbsmx?oper=modify&id='+id);
}

function printgmbs(id)
{
	window.location.href='printgmbs?id='+id;
//	window.location.replace ('gmbsmx?oper=modify&id='+id);
}

function detailgmbs(id)
{
	window.location.href='gmbsmx?oper=detail&id='+id;
//	window.location.replace ('gmbsmx?oper=modify&id='+id);
}

$(document).ready(function() {
	
					$("#gmbs-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false
					});
					$("#gmbs-grid")
							.jqxGrid(
									{
										columnsresize: true,
										height : "80%",
										width : "98%",
										columns : [
{ text: '序号', datafield: 'Id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '购标书单位名称', datafield: 'dwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '制造商单位中文名称', datafield: 'zzszwmc', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '制造商单位英文名称', datafield: 'zzsywmc', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '制造商国别', datafield: 'zzsgb', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '联系地址', datafield: 'lxdz', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '联系人', datafield: 'lxr', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '手机', datafield: 'sj', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '电子信箱', datafield: 'dzxx', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '传真', datafield: 'cz', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
{ text: '标书编号', datafield: 'bsbh', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
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
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printgmbs('+rowdata.Id+')">打印</a>';

														var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifygmbs('+rowdata.Id+')">修改</a>';

														var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletegmbs('+rowdata.Id+')">删除</a>';
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
					//$("#gmbs-grid").('hidecolumn', 'id');
					url = "getgmbs";
					var source = {					
						datatype : "json",
						datafields : [ {
							name : 'Id',
							type : 'string'
						}, {
							name : 'dwmc',
							type : 'string'
						}, {
							name : 'rq',
							type : 'string'
						}, {
							name : 'zzszwmc',
							type : 'string'
						}, {
							name : 'zzsywmc',
							type : 'string'
						}, {
							name : 'zzsgb',
							type : 'string'
						}, {
							name : 'lxdz',
							type : 'string'
						}, {
							name : 'lxr',
							type : 'string'
						}, {
							name : 'sj',
							type : 'string'
						}, {
							name : 'dzxx',
							type : 'string'
						}, {
							name : 'cz',
							type : 'string'
						}, {
							name : 'bsbh',
							type : 'string'
						}, {
							name : 'je',
							type : 'string'
						}

						],
						id : 'id',
						url : url
					};
					var dataAdapter = new $.jqx.dataAdapter(source);
					$("#gmbs-grid").jqxGrid({
						source : dataAdapter
					});
					$("#gmbsadd").click(function() {
						window.location.href = 'gmbsmx';
						//window.location.replace('gmbsmx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#popupWindow").jqxWindow('open');
					});					
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						$("#popupWindow").jqxWindow('open');
					});					
					$('#dwmc').jqxInput();
					$('#bsbh').jqxInput();
					addselectfieldwindows();

				});