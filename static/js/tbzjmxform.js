
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result){
			$('#tbzj_khyh').val(result['khyh']);
			$('#tbzj_yhzh').val(result['yhzh']);
		}
		else
		{
			$('#tbzj_khyh').val('');
			$('#tbzj_yhzh').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function tbzj_configpage(tbbzjid)
{
	if (tbbzjid == undefined)
	{
		url = 'gettbzjpz';
	}
	else
	{
		if (state=='add')
		{
			url = 'gettbzjpz?tbbzjid='+tbbzjid;
		}
		else
		{
			url = 'gettbzjpz';
		}
		$('#tbzj_dwmc').jqxInput({disabled:true});
		$('#tbzj_bsbh').jqxDropDownList({disabled:true});
	}
	
	$.get(url, function(result){
		//需特殊处理
    	$('#tbzj_dwmc').jqxComboBox({ placeHolder: "", source: result['dwmc']});
$('#tbzj_bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh']});
$('#tbzj_fkfs').jqxDropDownList({ placeHolder: "", source: result['fkfs']});
		if (state == 'add' &&tbzjid!=undefined)
		{
			$('#tbzj_dwmc').val(result['tbzjid'][0]['dwmc']);
			$('#tbzj_bsbh').val(result['tbzjid'][0]['bsbh']);
			$('#tbzj_je').val(result['tbzjid'][0]['je']);
			$('#tbzj_khyh').val(result['tbzjid'][0]['khyh']);
			$('#tbzj_yhzh').val(result['tbzjid'][0]['yhzh']);
		}
    }, 'json');	
    $("#tbzj_dwmc input").blur(function(){getkh($("#tbzj_dwmc").val())});  

}
var olddwmc='';
var state = 'add';
function tbzj_setupadd(tbzjId)
{
	$('#tbzj_Id').val('');
$('#tbzj_dwmc').val('');
$('#tbzj_rq').val('');
$('#tbzj_bsbh').jqxDropDownList('selectIndex',-1);
$('#tbzj_username').val('');
$('#tbzj_ly').val('');
$('#tbzj_khyh').val('');
$('#tbzj_yhzh').val('');
$('#tbzj_fkfs').jqxDropDownList('selectIndex',-1);
$('#tbzj_je').val('');;
	$('#tr_tbzj_Id').hide();
$('#tr_tbzj_rq').hide();
$('#tr_tbzj_username').hide();
$('#tr_tbzj_ly').hide();;
	$('#tbzj_Save').show();
	$('#tbzj_Cancel').val('取消');
}
function tbzj_setupdetail()
{
	$('#tr_tbzj_Id').show();
$('#tbzj_Id').jqxInput({disabled:true});
$('#tr_tbzj_rq').show();
$('#tbzj_rq').jqxInput({disabled:true});
$('#tr_tbzj_username').show();
$('#tbzj_username').jqxInput({disabled:true});
$('#tr_tbzj_ly').show();
$('#tbzj_ly').jqxInput({disabled:true});
	$.get('selectone_tbzj?Id='+$('#tbzj_Id').val(), function(result){
		var data = result[0];
		$('#tbzj_Id').val(data['Id']);
$('#tbzj_dwmc').val(data['dwmc']);
$('#tbzj_rq').val(data['rq']);
$('#tbzj_bsbh').val(data['bsbh']);
$('#tbzj_username').val(data['username']);
$('#tbzj_ly').val(data['ly']);
$('#tbzj_khyh').val(data['khyh']);
$('#tbzj_yhzh').val(data['yhzh']);
$('#tbzj_fkfs').val(data['fkfs']);
$('#tbzj_je').val(data['je']);		
	}, 'json');	
	$('#tbzj_Save').hide();
	$('#tbzj_Cancel').val('关闭');
	
}
function tbzj_setupmodify()
{
	$('#tr_tbzj_Id').show();
$('#tbzj_Id').jqxInput({disabled:true});
$('#tr_tbzj_rq').show();
$('#tbzj_rq').jqxInput({disabled:true});
$('#tr_tbzj_username').show();
$('#tbzj_username').jqxInput({disabled:true});
$('#tr_tbzj_ly').show();
$('#tbzj_ly').jqxInput({disabled:true});;
	$.get('selectone_tbzj?Id='+$('#tbzj_Id').val(), function(result){
		var data = result[0];
		$('#tbzj_Id').val(data['Id']);
$('#tbzj_dwmc').val(data['dwmc']);
$('#tbzj_rq').val(data['rq']);
$('#tbzj_bsbh').val(data['bsbh']);
$('#tbzj_username').val(data['username']);
$('#tbzj_ly').val(data['ly']);
$('#tbzj_khyh').val(data['khyh']);
$('#tbzj_yhzh').val(data['yhzh']);
$('#tbzj_fkfs').val(data['fkfs']);
$('#tbzj_je').val(data['je']);			
	}, 'json');	
	$('#tbzj_Save').show();
	$('#tbzj_Cancel').val('取消');	
}

var gkhcallback;
function tbzj_save()
{
	if ($('#tbzj_Id').jqxValidator('validate')==false){return;}
	if (state == 'add')
		{
		url = 'insertrow_tbzj';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_tbzj?Id='+$('#tbzj_Id').val();
		}
	var row = {	
	dwmc:$('#tbzj_dwmc').val(),
bsbh:$('#tbzj_bsbh').val(),
username:$('#tbzj_username').val(),
ly:$('#tbzj_ly').val(''),
khyh:$('#tbzj_khyh').val(),
yhzh:$('#tbzj_yhzh').val(),
fkfs:$('#tbzj_fkfs').val(),
je:$('#tbzj_je').val(),
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
            	$('#tbzj_popupWindow').jqxWindow('hide');
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

function tbzj_init () {
	$(document.body).append("       <div id='tbzj_popupWindow'>\
            <div>退保证金</div>\
            <div style='overflow: hidden;'><div id='tbzjmx-expander'>\
		<div id='tbzj_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_tbzj_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='tbzj_Id'/></td></tr>\
<tr id='tr_tbzj_dwmc'><td class='tbinputtitle'>单位名称:</td><td><div class='tbinput' type='text' id='tbzj_dwmc'/></td></tr>\
<tr id='tr_tbzj_bsbh'><td class='tbinputtitle'>标书编号:</td><td><div class='tbinput' type='text' id='tbzj_bsbh'/></td></tr>\
<tr id='tr_tbzj_khyh'><td class='tbinputtitle'>开户银行:</td><td><input class='tbinput' type='text' id='tbzj_khyh'/></td></tr>\
<tr id='tr_tbzj_yhzh'><td class='tbinputtitle'>银行账号:</td><td><input class='tbinput' type='text' id='tbzj_yhzh'/></td></tr>\
<tr id='tr_tbzj_fkfs'><td class='tbinputtitle'>付款方式:</td><td><div class='tbinput' type='text' id='tbzj_fkfs'/></td></tr>\
<tr id='tr_tbzj_je'><td class='tbinputtitle'>金额:</td><td><input class='tbinput' type='text' id='tbzj_je'/></td></tr>\
<tr id='tr_tbzj_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='tbzj_rq'/></td></tr>\
<tr id='tr_tbzj_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='tbzj_username'/></td></tr>\
<tr id='tr_tbzj_ly'><td class='tbinputtitle'>来源:</td><td><input class='tbinput' type='text' id='tbzj_ly'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='tbzj_Save' value='保存' /><input id='tbzj_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#tbzj_popupWindow").jqxWindow({
		width: 600, height:600, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#tbzj_Cancel"), modalOpacity: 0.4           
	});	
	$("#tbzjmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#tbzj_Id').jqxInput();
$('#tbzj_dwmc').jqxComboBox({ placeHolder: '',autoComplete:true});
$('#tbzj_rq').jqxInput();
$('#tbzj_bsbh').jqxDropDownList({ placeHolder: ''});
$('#tbzj_username').jqxInput();
$('#tbzj_ly').jqxInput();
$('#tbzj_khyh').jqxInput();
$('#tbzj_yhzh').jqxInput();
$('#tbzj_fkfs').jqxDropDownList({ placeHolder: ''});
$('#tbzj_je').jqxNumberInput({inputMode: 'simple'});
	$('#tr_tbzj_Id').hide();
$('#tr_tbzj_rq').hide();
$('#tr_tbzj_username').hide();
$('#tr_tbzj_ly').hide();


    $("#tbzj_Save").jqxButton({template:'success'});
    $("#tbzj_Cancel").jqxButton({template:'warning'});    

	$("#tbzj_Save").click(function () {
		tbzj_save(state);
	});
 	
	$("#tbzj_Id").jqxValidator({scroll: false,
		rules: [
		{ input: "#tbzj_khyh", message: "不可为空!", action: 'keyup, blur', rule: 'required'},
		{ input: "#tbzj_yhzh", message: "不可为空!", action: 'keyup, blur', rule: 'required'},
		{ input: "#tbzj_dwmc", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#tbzj_dwmc").jqxComboBox('val');
			if(val==""){return false;}	return true;
		} },
		{ input: "#tbzj_fkfs", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#tbzj_fkfs").jqxDropDownList('val');
			if(val==""){return false;}	return true;
		} },
		{ input: "#tbzj_bsbh", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#tbzj_bsbh").jqxDropDownList('val');
			if(val==""){return false;}	return true;
		} }
		], hintType: "tooltip"
	});    	
}

function tbzj_popupwindow(flag_state, id, callback, tbbzjid, bsbh)
{
	y = document.body.scrollTop;
	x = (document.body.scrollWidth -600)/2
	$('#tbzj_popupWindow').jqxWindow({ position: { x: x, y: y }});		
	state = flag_state;
	gkhcallback = callback;
	$('#tbzj_Id').val(id);
	
	if (state == 'add')
	{
		tbzj_title.innerHTML='新增';
		tbzj_setupadd();
		$('#tbzj_popupWindow').jqxWindow({ height:300});
	}
	if (state == 'modify')
	{
		tbzj_title.innerHTML='修改';
		tbzj_setupmodify();
		$('#tbzj_popupWindow').jqxWindow({ height:430});
	}
	if (state == 'detail')
	{
			
		tbzj_title.innerHTML='详情';
		tbzj_setupdetail();
		$('#tbzj_popupWindow').jqxWindow({ height:430});
	}
	tbzj_configpage(tbbzjid);
	$('#tbzj_popupWindow').jqxWindow('open');
}
