
var w_flag;
function gettbbzjkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#tbbzj_lxdz').val(data['khxx'][0]['lxdz']);
			$('#tbbzj_dzxx').val(data['khxx'][0]['dzxx']);
			$('#tbbzj_cz').val(data['khxx'][0]['cz']);
		}
		else
		{
			$('#tbbzj_lxdz').val('');
			$('#tbbzj_dzxx').val('');
			$('#tbbzj_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function tbbzj_configpage(projectid, cb)
{
	if (projectid == undefined)
	{
		url = 'gettbbzjpz';
	}
	else
	{
		url = 'gettbbzjpz?projectid='+projectid;
	}
	
	$.get(url, function(result){
		//需特殊处理
    	$('#tbbzj_dwmc').jqxComboBox({ placeHolder: "", source: result['dwmc'], searchMode: 'contains'});
$('#tbbzj_projectid').jqxDropDownList({ placeHolder: "", source: result['projectid'], displayMember:'ProjectCode', valueMember:'Id'});
$('#tbbzj_projectid').jqxDropDownList('selectIndex', 0);
$('#tbbzj_bzjlx').jqxDropDownList({ placeHolder: "", source: result['bzjlx']});
		cb();
    }, 'json');	
    $("#tbbzj_dwmc input").blur(function(){gettbbzjkh($("#tbbzj_dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function tbbzj_setupadd()
{
	$('#tbbzj_Id').val('');
$('#tbbzj_dwmc').val('');
$('#tbbzj_projectid').jqxDropDownList('selectIndex',-1);
$('#tbbzj_bzjlx').jqxDropDownList('selectIndex',-1);
$('#tbbzj_je').val('');
$('#tbbzj_rq').val('');
$('#tbbzj_username').val('');
$('#tbbzj_ly').val('');;
	$('#tr_tbbzj_Id').hide();
$('#tr_tbbzj_rq').hide();
$('#tr_tbbzj_username').hide();
$('#tr_tbbzj_ly').hide();;
	$('#tbbzj_Save').show();
	$('#tbbzj_Cancel').val('取消');
}
function tbbzj_setupdetail()
{
	$('#tr_tbbzj_Id').show();
$('#tbbzj_Id').jqxInput({disabled:true});
$('#tr_tbbzj_rq').show();
$('#tbbzj_rq').jqxInput({disabled:true});
$('#tr_tbbzj_username').show();
$('#tbbzj_username').jqxInput({disabled:true});
$('#tr_tbbzj_ly').show();
$('#tbbzj_ly').jqxInput({disabled:true});
	$.get('selectone_tbbzj?Id='+$('#tbbzj_Id').val(), function(result){
		var data = result[0];
		$('#tbbzj_Id').val(data['Id']);
$('#tbbzj_dwmc').val(data['dwmc']);
$('#tbbzj_projectid').val(data['projectid']);
$('#tbbzj_bzjlx').val(data['bzjlx']);
$('#tbbzj_je').val(data['je']);
$('#tbbzj_rq').val(data['rq']);
$('#tbbzj_username').val(data['username']);
$('#tbbzj_ly').val(data['ly']);		
	}, 'json');	
	$('#tbbzj_Save').hide();
	$('#tbbzj_Cancel').val('关闭');
	
}
function tbbzj_setupmodify()
{
	$('#tr_tbbzj_Id').show();
$('#tbbzj_Id').jqxInput({disabled:true});
$('#tr_tbbzj_rq').show();
$('#tbbzj_rq').jqxInput({disabled:true});
$('#tr_tbbzj_username').show();
$('#tbbzj_username').jqxInput({disabled:true});
$('#tr_tbbzj_ly').show();
$('#tbbzj_ly').jqxInput({disabled:true});;
	$.get('selectone_tbbzj?Id='+$('#tbbzj_Id').val(), function(result){
		var data = result[0];
		$('#tbbzj_Id').val(data['Id']);
$('#tbbzj_dwmc').val(data['dwmc']);
$('#tbbzj_projectid').val(data['projectid']);
$('#tbbzj_bzjlx').val(data['bzjlx']);
$('#tbbzj_je').val(data['je']);
$('#tbbzj_rq').val(data['rq']);
$('#tbbzj_username').val(data['username']);
$('#tbbzj_ly').val(data['ly']);			
	}, 'json');	
		$('#tbbzj_Save').show();
	$('#tbbzj_Cancel').val('取消');
}

var gkhcallback;
function tbbzj_save()
{
	if ($('#tbbzj_Id').jqxValidator('validate')==false){return;}
	if (state == 'add')
		{
		url = 'insertrow_tbbzj';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_tbbzj?Id='+$('#tbbzj_Id').val();
		}
	var row = {	
	dwmc:$('#tbbzj_dwmc').val(),
projectid:$('#tbbzj_projectid').val(),
bzjlx:$('#tbbzj_bzjlx').val(),
je:$('#tbbzj_je').val(),
username:$('#tbbzj_username').val(),
ly:$('#tbbzj_ly').val('现场'),
	//////////来源////需特殊处理//////
	};
    $.ajax({
        url:url,
        type:'POST',
        data:row,
        success:function(response,status,xhr){
            
            if (response == 'success')
            	{
				alert('成功');
            	$('#tbbzj_popupWindow').jqxWindow('hide');
				gkhcallback();
            	}
			else
			{
				alert(response);
			}
             
        },
        error:function(xhr,errorText,errorType){
            alert("操作不成功");
        },
    })	
}

function tbbzj_init () {
	$(document.body).append("       <div id='tbbzj_popupWindow'>\
            <div>投标保证金管理</div>\
            <div style='overflow: hidden;'><div id='tbbzjmx-expander'>\
		<div id='tbbzj_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_tbbzj_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='tbbzj_Id'/></td></tr>\
<tr id='tr_tbbzj_dwmc'><td class='tbinputtitle'>单位名称:</td><td><div class='tbinput' type='text' id='tbbzj_dwmc'/></td></tr>\
<tr id='tr_tbbzj_projectid'><td class='tbinputtitle'>项目编号:</td><td><div class='tbinput' type='text' id='tbbzj_projectid'/></td></tr>\
<tr id='tr_tbbzj_bzjlx'><td class='tbinputtitle'>保证金类型:</td><td><div class='tbinput' type='text' id='tbbzj_bzjlx'/></td></tr>\
<tr id='tr_tbbzj_je'><td class='tbinputtitle'>金额(元):</td><td><input class='tbinput' type='text' id='tbbzj_je'/></td></tr>\
<tr id='tr_tbbzj_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='tbbzj_rq'/></td></tr>\
<tr id='tr_tbbzj_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='tbbzj_username'/></td></tr>\
<tr id='tr_tbbzj_ly'><td class='tbinputtitle'>来源:</td><td><input class='tbinput' type='text' id='tbbzj_ly'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='tbbzj_Save' value='保存' /><input id='tbbzj_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#tbbzj_popupWindow").jqxWindow({
		width: 600, height:600, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#tbbzj_Cancel"), modalOpacity: 0.4           
	});	
	$("#tbbzjmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#tbbzj_Id').jqxInput();
$('#tbbzj_dwmc').jqxComboBox({ placeHolder: '',autoComplete:true, searchMode: 'contains'});
$('#tbbzj_projectid').jqxDropDownList({ placeHolder: ''});
$('#tbbzj_bzjlx').jqxDropDownList({ placeHolder: ''});
$('#tbbzj_je').jqxNumberInput({inputMode: 'simple'});
$('#tbbzj_rq').jqxInput();
$('#tbbzj_username').jqxInput();
$('#tbbzj_ly').jqxInput();
	$('#tr_tbbzj_Id').hide();
$('#tr_tbbzj_rq').hide();
$('#tr_tbbzj_username').hide();
$('#tr_tbbzj_ly').hide();

    $("#tbbzj_Save").jqxButton({template:'success'});
    $("#tbbzj_Cancel").jqxButton({template:'warning'});    

	$("#tbbzj_Save").click(function () {
		tbbzj_save(state);
	});
	$("#tbbzj_Id").jqxValidator({scroll: false,
		rules: [
		{ input: "#tbbzj_dwmc", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#tbbzj_dwmc").jqxComboBox('val');
			if(val==""){return false;}	return true;
		} },
		{ input: "#tbbzj_bzjlx", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#tbbzj_bzjlx").jqxDropDownList('val');
			if(val==""){return false;}	return true;
		} },
		{ input: "#tbbzj_projectid", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#tbbzj_projectid").jqxDropDownList('val');
			if(val==""){return false;}	return true;
		} }
		], hintType: "tooltip"
	});  	
  	
}

function tbbzj_popupwindow(flag_state, id, callback, projectid)
{
	y = document.body.scrollTop;
	x = (document.body.scrollWidth -600)/2
	$('#tbbzj_popupWindow').jqxWindow({ position: { x: x, y: y }});	
	state = flag_state;
	gkhcallback = callback;

	tbbzj_configpage(projectid,function(){
	$('#tbbzj_Id').val(id);

	if (state == 'add')
	{
		tbbzj_title.innerHTML='新增';
		tbbzj_setupadd();
		$('#tbbzj_popupWindow').jqxWindow({ height:280});
	}
	if (state == 'modify')
	{
		tbbzj_title.innerHTML='修改';
		tbbzj_setupmodify();
		$('#tbbzj_popupWindow').jqxWindow({ height:380});
	}
	if (state == 'detail')
		{
			
			tbbzj_title.innerHTML='详情';
			tbbzj_setupdetail();
			$('#tbbzj_popupWindow').jqxWindow({ height:380});
		}
	$('#tbbzj_popupWindow').jqxWindow('open');

	})

}
