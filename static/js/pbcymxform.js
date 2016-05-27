
function getkh(dwmc) {
	if (dwmc == olddwmc) {
		return;
	}
	$.get('getkh?dwmc=' + dwmc, function (result) {
		if (result.length == 1) {
			var data = result[0];
			$('#pbcy_lxdz').val(data['lxdz']);
			$('#pbcy_dzxx').val(data['dzxx']);
			$('#pbcy_cz').val(data['cz']);
		}
		else {
			$('#pbcy_lxdz').val('');
			$('#pbcy_dzxx').val('');
			$('#pbcy_cz').val('');
		}
		olddwmc = dwmc;

	}, 'json');
}
function pbcy_configpage() {

    $.get('getpbcypz', function (result) {
		//需特殊处理
		$('#pbcy_bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh'] });
		var source =
            {
                localdata: result['zj'],
                datatype: "array",
				datafields: [{ name: 'Id', type: 'string' },
					{ name: 'xm', type: 'string' },
					{ name: 'gzdw', type: 'string' }]
            };
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#pbcy_zjgrid").jqxGrid({
			source: dataAdapter
		});
    }, 'json');
}
var olddwmc = '';
var state = 'add';
function pbcy_setupadd() {
	$('#pbcy_Id').val('');
	$('#pbcy_bsbh').jqxDropDownList('selectIndex', -1);
	$('#pbcy_zjxx').jqxGrid('clear');
	$('#pbcy_zfy').val('');
	$('#pbcy_username').val('');
	$('#pbcy_rq').val('');;
	$('#tr_pbcy_username').hide();
	$('#tr_pbcy_rq').hide();;
}
function pbcy_setupdetail() {
	$('#tr_pbcy_username').show();
	$('#pbcy_username').jqxInput({ disabled: true });
	$('#tr_pbcy_rq').show();
	$('#pbcy_rq').jqxInput({ disabled: true });
	$.get('selectone_pbcy?Id=' + $('#pbcy_Id').val(), function (result) {
		var data = result[0];
		$('#pbcy_Id').val(data['Id']);
		$('#pbcy_bsbh').val(data['bsbh']);
		$('#pbcy_zjxx').jqxGrid('clear');
		var obj = JSON.parse(data['zjxx']);
		for (i in obj)
		{
			$('#pbcy_zjxx').jqxGrid('addrow', null, obj[i]);
			
		}	
		$('#pbcy_zfy').val(data['zfy']);
		$('#pbcy_username').val(data['username']);
		$('#pbcy_rq').val(data['rq']);
	}, 'json');
	$('#pbcy_Save').hide();
	$('#pbcy_Cancel').val('关闭');

}
function pbcy_setupmodify() {
	$('#tr_pbcy_username').show();
	$('#pbcy_username').jqxInput({ disabled: true });
	$('#tr_pbcy_rq').show();
	$('#pbcy_rq').jqxInput({ disabled: true });;
	$.get('selectone_pbcy?Id=' + $('#pbcy_Id').val(), function (result) {
		var data = result[0];
		$('#pbcy_Id').val(data['Id']);
		$('#pbcy_bsbh').val(data['bsbh']);
		$('#pbcy_zjxx').jqxGrid('clear');
		var obj = JSON.parse(data['zjxx']);
		for (i in obj)
		{
			$('#pbcy_zjxx').jqxGrid('addrow', null, obj[i]);
			
		}
		$('#pbcy_zfy').val(data['zfy']);
		$('#pbcy_username').val(data['username']);
		$('#pbcy_rq').val(data['rq']);
	}, 'json');
}

var gkhcallback;
function pbcy_save() {
	if (state == 'add') {
		url = 'insertrow_pbcy';
	}
	else if (state == 'modify') {
		url = 'updaterow_pbcy?Id=' + $('#pbcy_Id').val();
	}
	
	var zjxxrows = $('#pbcy_zjxx').jqxGrid('getboundrows');
	trows=[];
	for(i in zjxxrows)
	{
		trow={};
		trow["Id"] = zjxxrows[i]["Id"];
		trow["zjxm"] = zjxxrows[i]["zjxm"];
		trow["fy"] = zjxxrows[i]["fy"];
		trows.push(trow);
	}
	var row = {
		bsbh: $('#pbcy_bsbh').val(),
		zjxx:JSON.stringify(trows),
		zfy: $('#pbcy_zfy').val(),
		username: $('#pbcy_username').val(),
		//////////来源////需特殊处理//////
	};
    $.ajax({
        url: url,
        type: 'POST',
        data: row,
        success: function (response, status, xhr) {

            if (response == 'success') {
				alert('成功');
				$('#pbcy_popupWindow').jqxWindow('hide');
				gkhcallback();
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

function addselectzjwindows() {
	$(document.body).append('<div id="pbcyzj_popupWindow" ><div>专家选择</div>\
	<div style="overflow: hidden;">\
	<div  id="pbcy_zjgrid"></div>\
	\
                    <table  align="center" ><tr>\
                        <td width="50%" align="right"></td><td align="right"></td>\
                        <td style="padding-top: 10px;float:right" align="right"><input style="margin-right: 5px;margin-left:20px" type="button" id="pbcyzj_Save" value="选择" /><input id="pbcyzj_Cancel" type="button" value="取消" /></td>\
                    </tr>\
                </table></div></div>');
	$("#pbcyzj_popupWindow").jqxWindow({ isModal: true, autoOpen: false, cancelButton: $("#pbcyzj_Cancel"),height: 400, width: 400, modalOpacity: 0.2 });
    $("#pbcyzj_Save").jqxButton({ template: 'success' });
    $("#pbcyzj_Cancel").jqxButton({ template: 'warning' });


	
		


	$("#pbcy_zjgrid").jqxGrid(
		{
			width:390,
			height:300,
			selectionmode: 'checkbox',
			enabletooltips: true,
			columnsresize: true,
			columns: [{ text: '序号',  datafield: 'Id', width: '15%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '专家姓名', datafield: 'xm', width: '30%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '工作单位', datafield: 'gzdw', width: '45%', cellsalign: 'center', align: 'center', hidden: false }],
		});

	$("#pbcyzj_Save").click(function () {
		//$('#pbcy_zjxx').jqxGrid('clear');
		var zjxxrows = $('#pbcy_zjxx').jqxGrid('getboundrows');
		var tzjxx = {};
		for (zjxxrowindex in zjxxrows)
		{
			tzjxx[zjxxrows[zjxxrowindex]['Id']] = zjxxrows[zjxxrowindex]['fy'];
		}
		$('#pbcy_zjxx').jqxGrid('clear');
		var rowindexes = $('#pbcy_zjgrid').jqxGrid('getselectedrowindexes');
		total = 0;
		for (rowindex in rowindexes)
		{
			index = rowindexes[rowindex]
			trow = $('#pbcy_zjgrid').jqxGrid('getrowdata', index);
			if (tzjxx[trow['Id']] == undefined)
			{
				tzjxx[trow['Id']] = 0;
			}
			total += tzjxx[trow['Id']];
				
					var row = { Id: trow['Id'], zjxm: trow['xm'], fy: tzjxx[trow['Id']]};
					$('#pbcy_zjxx').jqxGrid('addrow', null, row);
		}
		$('#pbcy_zfy').val(total);
		$("#pbcyzj_popupWindow").jqxWindow('close');
/*		if (typeof(event.args.rowindex)=='object')
		{
			alert("success");
		}
		else
		{
			var row = { Id: rowData['Id'], zjxm: rowData['xm']};
			$('#pbcy_zjxx').jqxGrid('addrow', null, row);
		}*/
	});
	$("#xzpbcy").click(function () {
		$("#pbcyzj_popupWindow").jqxWindow('open');
		var zjxxrows = $('#pbcy_zjxx').jqxGrid('getboundrows');
		var tzjxx = {};
		for (zjxxrowindex in zjxxrows)
		{
			tzjxx[zjxxrows[zjxxrowindex]['Id']] = zjxxrows[zjxxrowindex]['fy'];
		}
		var selectzjrows = $('#pbcy_zjgrid').jqxGrid('getboundrows');	
		for (i in selectzjrows)
		{
			if (tzjxx[selectzjrows[i]['Id']] == undefined)
			{
				$('#pbcy_zjgrid').jqxGrid('unselectrow', selectzjrows[i]['boundindex']);
			}
			else
			{
				$('#pbcy_zjgrid').jqxGrid( 'selectrow', selectzjrows[i]['boundindex']);
			}
		}
		
	});
	
	$("#pbcy_zjxx").on('cellvaluechanged', function (event) 	{
		var zjxxrows = $('#pbcy_zjxx').jqxGrid('getboundrows');
		var tzjxx = {};
		total = 0;
		for (zjxxrowindex in zjxxrows)
		{
			total += Number(zjxxrows[zjxxrowindex]['fy']);
		}
		$('#pbcy_zfy').val(total);
	});
/*    $("#pbcy_zdlistbox").on('checkChange', function (event) {
        $("#pbcy-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#pbcy-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#pbcy-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#pbcy-grid").jqxGrid('endupdate');
    });*/
}

function pbcy_init() {
	$(document.body).append("       <div id='pbcy_popupWindow'>\
            <div>评标成员</div>\
            <div style='overflow: hidden;'><div id='pbcymx-expander'>\
		<div id='pbcy_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_pbcy_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='pbcy_Id'/></td></tr>\
<tr id='tr_pbcy_bsbh'><td class='tbinputtitle'>标书编号:</td><td><div class='tbinput' type='text' id='pbcy_bsbh'/></td>\
<td align=\"right\">总费用:</td><td><input class='tbinput' type='text' id='pbcy_zfy'/></td></tr>\
<tr id='tr_pbcy_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='pbcy_username'/></td>\
<td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='pbcy_rq'/></td></tr>\
<tr id='tr_pbcy_zjxx'><td class='tbinputtitle'>专家信息:</td><td><input id='xzpbcy' type='button' value='选择专家' /></td></tr>\
<tr ><td colspan=4><div class='tbinput' type='text' id='pbcy_zjxx'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td><td align='right'></td>\
                        <td colspan=2 style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='pbcy_Save' value='保存' /><input id='pbcy_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#pbcy_popupWindow").jqxWindow({
		width: 650, height: 600, resizable: true, isModal: true, autoOpen: false, cancelButton: $("#pbcy_Cancel"), modalOpacity: 0.4
	});
	$("#pbcymx-expander").jqxExpander({ toggleMode: 'none', showArrow: false });

    // Create a jqxInput


    $('#pbcy_Id').jqxInput();
	$('#pbcy_bsbh').jqxDropDownList({ placeHolder: '' });


	$('#pbcy_zjxx').jqxGrid(
		{
			pagerheight: 20,
			editable: true,
			enabletooltips: true,
			columnsresize: true,
			columns: [{ text: '序号', pinned: true,datafield: 'Id', width: '30%', editable: false,cellsalign: 'center', align: 'center', hidden: false },
				{ text: '专家姓名', pinned: true,datafield: 'zjxm', width: '30%', editable: false,cellsalign: 'center', align: 'center', hidden: false },
				{ text: '费用', datafield: 'fy', width: '30%', cellsalign: 'center', align: 'center',  hidden: false, cellsformat :'f2' }],
		});


	$('#pbcy_zfy').jqxNumberInput({ inputMode: 'simple' });
	$('#pbcy_zfy').jqxNumberInput({ disabled: true });
	$('#pbcy_username').jqxInput();
	$('#pbcy_rq').jqxInput();
	$('#tr_pbcy_username').hide();
	$('#tr_pbcy_rq').hide();
	addselectzjwindows();
	pbcy_configpage();
    $("#pbcy_Save").jqxButton({ template: 'success' });
    $("#pbcy_Cancel").jqxButton({ template: 'warning' });
	$("#xzpbcy").jqxButton({ template: 'success' });

	$("#pbcy_Save").click(function () {
		pbcy_save(state);
	});


}

function pbcy_popupwindow(flag_state, id, callback, bsbh) {
	state = flag_state;
	gkhcallback = callback;
	$('#pbcy_Id').val(id);

	if (state == 'add') {
		pbcy_title.innerHTML = '新增';
		pbcy_setupadd();
	}
	if (state == 'modify') {
		pbcy_title.innerHTML = '修改';
		pbcy_setupmodify();
	}
	if (state == 'detail') {

		pbcy_title.innerHTML = '详情';
		pbcy_setupdetail();
	}
	$('#pbcy_bsbh').val(bsbh);
	$('#pbcy_popupWindow').jqxWindow('open');
}
