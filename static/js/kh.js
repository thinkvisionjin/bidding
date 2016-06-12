function searchlxr() {
	l_selectedindex = $('#kh-grid').jqxGrid('getselectedrowindex');
	data = $('#kh-grid').jqxGrid('getrowdata', l_selectedindex);
	l_searchlxr(data['Id']);
}
function l_searchlxr(id){
	url = "select_lxr?khId=" + id;
	var source = {
		datatype: "json",
		datafields: [{ name: 'Id', type: 'string' },
			{ name: 'lxr', type: 'string' },
			{ name: 'sj', type: 'string' },
			{ name: 'rq', type: 'date' },
			{ name: 'username', type: 'string' }],
		id: 'Id',
		url: url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#lxr-grid").jqxGrid({
		source: dataAdapter
	});
}

function modifylxr(id) {
	lxr_popupwindow('modify', id, searchlxr);

}

function deletelxr(id) {
	if (confirm('是否删除')==false)
	{
		return ;
	}	
    var selectedrowindex = $("#lxr-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#lxr-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#lxr-grid").jqxGrid('getrowid', selectedrowindex);

    }

	$.get('deleterow_lxr?Id=' + id, function (result) {
		if (result == 'success')
		{
			confirm('成功')
			$("#lxr-grid").jqxGrid('deleterow', rowid);
		}
		else
		{
			alert(result)
		}	
	});
}

function search() {
	if ($("#dwmc").val() == '') {
		url = "select_kh";
	}
	else {
		url = "select_kh?dwmc=" + $("#dwmc").val()
	}

	var source = {
		datatype: "json",
		datafields: [{ name: 'Id', type: 'string' },
			{ name: 'nsrsbh', type: 'string' },
			{ name: 'dwmc', type: 'string' },
			{ name: 'rq', type: 'date' },
			{ name: 'khyh', type: 'string' },
			{ name: 'yhzh', type: 'string' },
			{ name: 'lxdz', type: 'string' },
			{ name: 'dzxx', type: 'string' },
			{ name: 'cz', type: 'string' },
			{ name: 'username', type: 'string' }],
		id: 'Id',
		url: url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#kh-grid").jqxGrid({
		source: dataAdapter
	});
	$('#kh-grid').jqxGrid('selectrow', -1);
	$('#lxr-grid').jqxGrid('clear');
}

function addselectfieldwindows() {
	$(document.body).append('<div id="khzd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="kh_zdlistbox"></div></div></div>');
	$("#khzd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200, modalOpacity: 0.5 });
	var listSource = [{ label: '序号', value: 'Id', checked: true }, ,
		{ label: '纳税人识别号', value: 'nsrsbh', checked: true }, ,
		{ label: '单位名称', value: 'dwmc', checked: true }, ,
		{ label: '日期', value: 'rq', checked: false }, ,
		{ label: '开户银行', value: 'khyh', checked: true }, ,
		{ label: '银行账号', value: 'yhzh', checked: true }, ,
		{ label: '联系地址', value: 'lxdz', checked: true }, ,
		{ label: '电子信箱', value: 'dzxx', checked: true }, ,
		{ label: '传真', value: 'cz', checked: true }, ,
		{ label: '操作人', value: 'username', checked: false },];
	$('#kh_zdlistbox').jqxListBox({ source: listSource, width: '100%', height: '100%', checkboxes: true });
    $("#kh_zdlistbox").on('checkChange', function (event) {
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


function modifykh(id) {
	kh_popupwindow('modify', id, search);

}

function deletekh(id) {
	if (confirm('是否删除')==false)
	{
		return ;
	}	
    var selectedrowindex = $("#kh-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#kh-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#kh-grid").jqxGrid('getrowid', selectedrowindex);

    }

	$.get('deleterow_kh?Id=' + id, function (result) {
		
		if (result == 'success')
		{
			alert('成功')
			$("#kh-grid").jqxGrid('deleterow', rowid);
			$('#kh-grid').jqxGrid('selectrow', -1);
			$('#lxr-grid').jqxGrid('clear');
		}
		else
		{
			alert(result)
		}
	});
}

function printkh(id) {
	window.location.href = 'kh_print?Id=' + id;
	//	window.location.replace ('khmx?oper=modify&Id='+id);
}

function detailkh(id) {
	kh_popupwindow('detail', id);
	//	window.location.replace ('khmx?oper=modify&Id='+id);
}
function configpopupwindow() {

	kh_init();
}

function addlxr()
{
		l_selectedindex = $('#kh-grid').jqxGrid('getselectedrowindex');
		data = $('#kh-grid').jqxGrid('getrowdata', l_selectedindex);
		lxr_popupwindow('add', '', searchlxr, data['Id']);
		//window.location.replace('lxrmx');
		//$("#popupWindow").jqxWindow('open');	
}
function initlxr() {
	$("#lxr-grid")
		.jqxGrid(
		{
			enabletooltips: true,
			columnsresize: true,
			height: "40%",
			width: "98%",
			columns: [{ text: '序号', datafield: 'Id', width: '5%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '联系人', datafield: 'lxr', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '手机', datafield: 'sj', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '日期', datafield: 'rq', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '操作人', datafield: 'username', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{
					text: '操作',
					width: '200',
					editable: false,
					datafield: 'delete',
					cellsrenderer: function (
						index, datafield,
						value,
						defaultvalue,
						column, rowdata) {
//						var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="printlxr(' + rowdata.Id + ')">打印</a>';

						var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifylxr(' + rowdata.Id + ')">修改</a>';

						var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletelxr(' + rowdata.Id + ')">删除</a>';
//						var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detaillxr(' + rowdata.Id + ')">详细</a>';
						var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
							+ b + c + '</div>';
						return d;
					}
				}],
			showtoolbar: true,
			rendertoolbar: function (toolbar) {
				var me = this;
				var container = $("<div style='margin: 7px;'><b>联系人:</b></div>");
				toolbar.append(container);
				/*container.append('<b>联系人:</b><input id="lxradd" type="button" value="新增" />');
				$("#lxradd").jqxButton({
					template: 'success'
				});*/
			}

		});
	/*$("#lxradd").click(function () {
		addlxr();
	});*/
	lxr_init();

}

$(document).ready(function () {

	$("#kh-expander").jqxExpander({
		toggleMode: 'none',
		showArrow: false,
		height:'100%'
	});
	$("#kh-grid")
		.jqxGrid(
		{
			enabletooltips: true,
			columnsresize: true,
			height: "45%",
			width: "98%",
			columns: [{ text: '序号', datafield: 'Id', width: '5%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '纳税人识别号', datafield: 'nsrsbh', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '单位名称', datafield: 'dwmc', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '日期', datafield: 'rq', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{ text: '开户银行', datafield: 'khyh', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '银行账号', datafield: 'yhzh', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '联系地址', datafield: 'lxdz', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '电子信箱', datafield: 'dzxx', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '传真', datafield: 'cz', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '操作人', datafield: 'username', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{
					text: '操作',
					width: '200',
					editable: false,
					datafield: 'delete',
					cellsrenderer: function (
						index, datafield,
						value,
						defaultvalue,
						column, rowdata) {
						var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="addlxr(' + rowdata.Id + ')">新建联系人</a>';

						var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifykh(' + rowdata.Id + ')">修改</a>';

						var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deletekh(' + rowdata.Id + ')">删除</a>';
						var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
							+ a + b + c + '</div>';
						return d;
					}
				}],
			showtoolbar: true,
			rendertoolbar: function (toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px;'></div>");
				toolbar.append(container);
				container.append('<input id="khadd" type="button" value="新增" />');
				$("#khadd").jqxButton({
					template: 'success'
				});
				container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
				$("#selectfiled").jqxButton({
					template: 'info'
				});
			}

		});
	//$("#kh-grid").('hidecolumn', 'id');
	search();
	$("#khadd").click(function () {
		kh_popupwindow('add', '', search);
		//window.location.replace('khmx');
		//$("#popupWindow").jqxWindow('open');
	});
	$("#selectfiled").click(function () {
		$("#khzd_popupWindow").jqxWindow('open');
	});
	$("#search").jqxButton({
		template: 'primary'
	});
	$("#search").click(function () {
		search();
	});

	$('#dwmc').jqxInput();
	addselectfieldwindows();
	initlxr();
	configpopupwindow();
	$("#kh-grid").on('rowselect', function (event) {
		var args = event.args;
		// row's bound index.
		var rowBoundIndex = args.rowindex;
		if (rowBoundIndex == -1) {
							    	return;
		}
		var rowData = args.row;
		l_searchlxr(rowData['Id']);


								//alert("aa");
	});
});
