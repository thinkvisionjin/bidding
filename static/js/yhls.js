var state = 'add';
var g_rowid;
var g_row; var olddwmc = '';
var state = 'add';
var g_beforqrje;
function yhlsqr_setupadd() {
	$('#Id').val('');
	$('#dwmc').val('');
	$('#qrlx').jqxDropDownList('selectIndex', -1);
	$('#rq').val('');
	$('#qrje').val('');
	$('#yhlsId').val('');
	$('#cwqrbz').val('');
	$('#username').val('');;
	$('#tr_rq').hide();
	$('#tr_cwqrbz').hide();
	$('#tr_username').hide();;
	g_beforqrje = 0;
}
function yhlsqr_setupdetail() {
	$('#tr_rq').show();
	$('#rq').jqxInput({ disabled: true });
	$('#tr_cwqrbz').show();
	$('#cwqrbz').jqxInput({ disabled: true });
	$('#tr_username').show();
	$('#username').jqxInput({ disabled: true });
	$.get('selectone_yhlsqr?Id=' + $('#Id').val(), function (result) {
		var data = result[0];
		$('#Id').val(data['Id']);
		$('#dwmc').val(data['dwmc']);
		$('#qrlx').val(data['qrlx']);
		$('#rq').val(data['rq']);
		$('#qrje').val(data['qrje']);
		$('#yhlsId').val(data['yhlsId']);
		$('#cwqrbz').val(data['cwqrbz']);
		$('#username').val(data['username']);
	}, 'json');
	$('Save').hide();
	$('#Cancel').val('关闭');

}
function yhlsqr_setupmodify() {
	$('#tr_rq').show();
	$('#rq').jqxInput({ disabled: true });
	$('#tr_cwqrbz').show();
	$('#cwqrbz').jqxInput({ disabled: true });
	$('#tr_username').show();
	$('#username').jqxInput({ disabled: true });;
	$.get('selectone_yhlsqr?Id=' + $('#Id').val(), function (result) {
		var data = result[0];
		$('#Id').val(data['Id']);
		$('#dwmc').val(data['dwmc']);
		$('#qrlx').val(data['qrlx']);
		$('#rq').val(data['rq']);
		$('#qrje').val(data['qrje']);
		$('#yhlsId').val(data['yhlsId']);
		$('#cwqrbz').val(data['cwqrbz']);
		$('#username').val(data['username']);
		g_beforqrje = data['qrje']
	}, 'json');
}

function yhlsqr_popupwindow(flag_state, id, callback, yhlsId) {
	state = flag_state;
	gkhcallback = callback;
	$('#Id').val(id);

	if (state == 'add') {
		yhlsqr_title.innerHTML = '新增';
		yhlsqr_setupadd();
	}
	if (state == 'modify') {
		yhlsqr_title.innerHTML = '修改';
		yhlsqr_setupmodify();
	}
	if (state == 'detail') {

		yhlsqr_title.innerHTML = '详情';
		yhlsqr_setupdetail();
	}
	$('#yhlsId').val(yhlsId);
	$('#yhls_popupWindow').jqxWindow('open');
}



var g_selectedrowindex;




function search() {
	if ($("#dfmc").val() == '' && $("#dfzh").val() == '' &&$("#wjm").val()=='') {
		url = "select_yhls";
	}
	else {
		url = "select_yhls?dfmc=" + $("#dfmc").val() + "&dfzh=" + $("#dfzh").val() + "&wjm=" + $("#wjm").val()
	}

	var source = {
		datatype: "json",
		datafields: [{ name: 'Id', type: 'string' },
			{ name: 'jysj', type: 'date' },
			{ name: 'je', type: 'float' },
			{ name: 'zy', type: 'string' },
			{ name: 'dfmc', type: 'string' },
			{ name: 'dfzh', type: 'string' },
			{ name: 'qrje', type: 'float' },
			{ name: 'cwqrje', type: 'float' },
			{ name: 'wjm', type: 'string' }],
		id: 'Id',
		url: url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#yhls-grid").jqxGrid({
		source: dataAdapter
	});
}

function addselectfieldwindows() {
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200, modalOpacity: 0.5 });
	var listSource = [{ label: '序号', value: 'Id', checked: true }, ,
		{ label: '交易时间', value: 'jysj', checked: true }, ,
		{ label: '金额', value: 'je', checked: true }, ,
		{ label: '摘要', value: 'zy', checked: true }, ,
		{ label: '对方名称', value: 'dfmc', checked: true }, ,
		{ label: '对方账号', value: 'dfzh', checked: true }, ,
		{ label: '确认金额', value: 'qrje', checked: true }, ,
		{ label: '财务确认金额', value: 'cwqrje', checked: true }, ,
		{ label: '文件名', value: 'wjm', checked: false },];
	$('#zdlistbox').jqxListBox({ source: listSource, width: '100%', height: '100%', checkboxes: true });
    $("#zdlistbox").on('checkChange', function (event) {
        $("#yhls-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#yhls-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#yhls-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#yhls-grid").jqxGrid('endupdate');
    });
}

function modifyyhlsqr(id) {
	yhlsqr_popupwindow('modify', id, searchqryhls);
}

function deleteyhlsqr(id) {
    var selectedrowindex = $("#yhlsqr-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#yhlsqr-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#yhlsqr-grid").jqxGrid('getrowid', selectedrowindex);
		row = $("#yhlsqr-grid").jqxGrid('getrowdata', selectedrowindex);
		qrje = row['qrje'];
    }
	var selectedrowindex = $("#yhls-grid").jqxGrid('getselectedrowindex');
	g_row = $("#yhls-grid").jqxGrid('getrowdata', selectedrowindex);	
	$.get('deleterow_yhlsqr?Id=' + id, function (result) {
			alert(result);
			if (response == 'success') {
			$("#yhlsqr-grid").jqxGrid('deleterow', rowid);
			g_row['qrje'] -= qrje;
			$('#yhls-grid').jqxGrid('updaterow', g_selectedrowindex, g_row);
		}
		else
		{
			
		}
	});
}
function modifyyhls(id) {
	window.location.href = 'yhlsmx?oper=modify&Id=' + id;

}

function deleteyhls(id) {
    var selectedrowindex = $("#yhls-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#yhls-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#yhls-grid").jqxGrid('getrowid', selectedrowindex);
        $("#yhls-grid").jqxGrid('deleterow', rowid);
    }

	$.get('deleterow_yhls?Id=' + id, function (result) {
		alert(result);
		
	});
}

function qryhls(id) {
	state = 'add';
	g_rowid = id;
	yhlsqr_popupwindow('add', '', searchqryhls, id);
	//$("#yhls_popupWindow").jqxWindow('open');
}

function detailyhls(id) {
	g_rowid = id;
	window.location.href = 'yhlsmx?oper=detail&Id=' + id;
	//	window.location.replace ('yhlsmx?oper=modify&Id='+id);
}


function save(state) {
	var row = {};
	qrje = $('#qrje').val();
	if (state == 'add') {
		url = 'insertrow_yhlsqr';
		row = {
			dwmc: $('#dwmc').val(),
			qrje: qrje,
			yhlsId: $('#yhlsId').val(),
			cwqrbz: '未确认',
			qrlx: $('#qrlx').val(),
			//////////来源////需特殊处理//////
		};		
	}
	else if (state == 'modify') {
		url = 'updaterow_yhlsqr?Id=' + $('#Id').val();
		row = {
			dwmc: $('#dwmc').val(),
			qrje: qrje,
			yhlsId: $('#yhlsId').val(),
			cwqrbz: $('#cwqrbz').val(),
			qrlx: $('#qrlx').val(),
			//////////来源////需特殊处理//////
		};		
	}
	

	
	
    var selectedrowindex = $("#yhls-grid").jqxGrid('getselectedrowindex');
    g_selectedrowindex = selectedrowindex;
    var rowscount = $("#yhls-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        g_row = $("#yhls-grid").jqxGrid('getrowdata', selectedrowindex);
        if ((g_row['je'] - g_row['qrje']+g_beforqrje) < qrje) {
			alert('确认金额超过实际金额');
			return;
        }

    }
    $.ajax({
        url: url,
        type: 'POST',
        data: row,
        success: function (response, status, xhr) {

            if (response == 'success') {
				alert('成功');
				g_row['qrje'] += $('#qrje').val()-g_beforqrje;
				$('#yhls-grid').jqxGrid('updaterow', g_selectedrowindex, g_row);
				$("#yhls_popupWindow").jqxWindow('hide');
				searchqryhls($('#yhlsId').val());
				return;

            }
			else {
				alert(response);
			}

        },
        error: function (xhr, errorText, errorType) {
            alert("操作不成功");
        },
    })
}
function searchqryhls(id) {
	url = "select_yhlsqr?yhlsId=" + id;
	var source = {
		datatype: "json",
		datafields: [{ name: 'Id', type: 'string' },
			{ name: 'dwmc', type: 'string' },
			{ name: 'qrlx', type: 'string' },
			{ name: 'rq', type: 'date' },
			{ name: 'qrje', type: 'string' },
			{ name: 'yhlsId', type: 'string' },
			{ name: 'cwqrbz', type: 'string' },
			{ name: 'username', type: 'string' }],
		id: 'Id',
		url: url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#yhlsqr-grid").jqxGrid({ source: dataAdapter });
}
function inityhlsqr() {
	$("#yhlsqrmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });
	$("#yhlsqr-grid")
		.jqxGrid(
		{
			enabletooltips: true,
			columnsresize: true,
			height: "80%",
			width: "98%",
			columns: [{ text: '序号', datafield: 'Id', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '单位名称', datafield: 'dwmc', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '确认类型', datafield: 'qrlx', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '日期', datafield: 'rq', cellsformat: 'yyyy-MM-dd hh:mm:ss', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '确认金额', datafield: 'qrje', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '银行流水Id', datafield: 'yhlsId', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '财务确认标志', datafield: 'cwqrbz', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
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
						if (rowdata['cwqrbz']=='未确认')
						{
						var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifyyhlsqr(' + rowdata.Id + ')">修改</a>';

						var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deleteyhlsqr(' + rowdata.Id + ')">删除</a>';
						var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
							+ b + c + '</div>';
						return d;
						}
						return '';
					}
				}],
			showtoolbar: true,
			rendertoolbar: function (toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px;'></div>");
				toolbar.append(container);
				container.append('<input id="yhlsqradd" type="button" value="确认信息" />');
				$("#yhlsqradd").jqxButton({
					template: 'success'
				});
			}

		});

	$("#yhls_popupWindow").jqxWindow({
		width: 400, height: 350, resizable: false, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.4
	});
    $('#Id').jqxInput();
    $('#rq').jqxInput();
    $('#qrje').jqxNumberInput({ inputMode: 'simple' });
    $('#yhlsId').jqxInput();
    $('#cwqrbz').jqxInput();
    $('#qrlx').jqxDropDownList({ placeHolder: '' });
    $('#username').jqxInput();
	$('#tr_rq').hide();
	$('#tr_cwqrbz').hide();
	$('#tr_username').hide();
	$('#tr_yhlsId').hide();

	$("#Save").jqxButton({ template: 'success' });
	$("#Cancel").jqxButton({ template: 'warning' });

	$("#Save").click(function () {
		save(state);

	});


	$.get('getyhlsqrpz', function (result) {
		//需特殊处理
		$('#wjm').jqxComboBox({ source: result['wjm']});
		$('#dwmc').jqxInput({ source: result['dwmc'] });
		$('#qrlx').jqxDropDownList({ placeHolder: "", source: result['qrlx'], displayMember: "PackageNumber", valueMember: "PackageNumber" });
	}, 'json');

}
$(document).ready(function () {

	$("#yhls-expander").jqxExpander({
		toggleMode: 'none',
		showArrow: false
	});
	$("#yhls-grid")
		.jqxGrid(
		{
			enabletooltips: true,
			columnsresize: true,
			height: "80%",
			width: "98%",
			columns: [{ text: '序号', datafield: 'Id', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '交易时间', datafield: 'jysj', cellsformat: 'yyyy-MM-dd hh:mm:ss', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '金额', datafield: 'je', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '摘要', datafield: 'zy', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '对方名称', datafield: 'dfmc', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '对方账号', datafield: 'dfzh', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '确认金额', datafield: 'qrje', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '财务确认金额', datafield: 'cwqrje', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '文件名', datafield: 'wjm', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
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
						var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="qryhls(' + rowdata.Id + ')">确认</a>';

						var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
							+ a + '</div>';
						return d;
					}
				}],
			showtoolbar: true,
			rendertoolbar: function (toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px;'></div>");
				toolbar.append(container);
				container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
				$("#selectfiled").jqxButton({
					template: 'info'
				});
			}

		});
	//$("#yhls-grid").('hidecolumn', 'id');
	search();
	$("#yhlsadd").click(function () {
		window.location.href = 'yhlsmx';
		//window.location.replace('yhlsmx');
		//$("#popupWindow").jqxWindow('open');
	});
	$("#selectfiled").click(function () {
		$("#popupWindow").jqxWindow('open');
	});
	$("#search").jqxButton({
		template: 'primary'
	});
	$("#search").click(function () {
		search();
	});
	$('#wjm').jqxComboBox({ placeHolder: "", autoComplete:true});
	$('#dfmc').jqxInput();
	$('#dfzh').jqxInput();
	addselectfieldwindows();
	inityhlsqr();
	$("#yhls-grid").on('rowselect', function (event) {
		var args = event.args;
		// row's bound index.
		var rowBoundIndex = args.rowindex;
		if (rowBoundIndex == -1) {
							    	return;
		}
		var rowData = args.row;
		searchqryhls(rowData['Id']);


								//alert("aa");
	});
});
