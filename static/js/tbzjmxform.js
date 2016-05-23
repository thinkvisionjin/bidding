
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#tbzj_khyh').val(data['khyh']);
			$('#tbzj_yhzh').val(data['yhzh']);
		}
		else
		{
			$('#tbzj_khyh').val('');
			$('#tbzj_yhzh').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function tbzj_configpage()
{
	
    $.get('gettbzjpz', function(result){
		//需特殊处理
    	$('#tbzj_dwmc').jqxInput({source:result['dwmc']})
$('#tbzj_bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh']});
$('#tbzj_fkfs').jqxDropDownList({ placeHolder: "", source: result['fkfs']});
    }, 'json');	
    $("#tbzj_dwmc").blur(function(){getkh($("#tbzj_dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function tbzj_setupadd()
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
	$('tbzj_Save').hide();
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
}

var gkhcallback;
function tbzj_save()
{
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
ly:$('#tbzj_ly').val(),
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
<tr id='tr_tbzj_dwmc'><td class='tbinputtitle'>单位名称:</td><td><input class='tbinput' type='text' id='tbzj_dwmc'/></td></tr>\
<tr id='tr_tbzj_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='tbzj_rq'/></td></tr>\
<tr id='tr_tbzj_bsbh'><td class='tbinputtitle'>标书编号:</td><td><div class='tbinput' type='text' id='tbzj_bsbh'/></td></tr>\
<tr id='tr_tbzj_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='tbzj_username'/></td></tr>\
<tr id='tr_tbzj_ly'><td class='tbinputtitle'>来源:</td><td><input class='tbinput' type='text' id='tbzj_ly'/></td></tr>\
<tr id='tr_tbzj_khyh'><td class='tbinputtitle'>开户银行:</td><td><input class='tbinput' type='text' id='tbzj_khyh'/></td></tr>\
<tr id='tr_tbzj_yhzh'><td class='tbinputtitle'>银行账号:</td><td><input class='tbinput' type='text' id='tbzj_yhzh'/></td></tr>\
<tr id='tr_tbzj_fkfs'><td class='tbinputtitle'>付款方式:</td><td><div class='tbinput' type='text' id='tbzj_fkfs'/></td></tr>\
<tr id='tr_tbzj_je'><td class='tbinputtitle'>金额:</td><td><input class='tbinput' type='text' id='tbzj_je'/></td></tr>\
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
$('#tbzj_dwmc').jqxInput();
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

	tbzj_configpage();
    $("#tbzj_Save").jqxButton({template:'success'});
    $("#tbzj_Cancel").jqxButton({template:'warning'});    

	$("#tbzj_Save").click(function () {
		tbzj_save(state);
	});
 	
  	
}

function tbzj_popupwindow(flag_state, id, callback, bsbh)
{
	state = flag_state;
	gkhcallback = callback;
	$('#tbzj_Id').val(id);
	$('#tbzj_bsbh').val(bsbh);
	if (state == 'add')
	{
		tbzj_title.innerHTML='新增';
		tbzj_setupadd();
	}
	if (state == 'modify')
	{
		tbzj_title.innerHTML='修改';
		tbzj_setupmodify();
	}
	if (state == 'detail')
		{
			
			tbzj_title.innerHTML='详情';
			tbzj_setupdetail();
		}
	$('#tbzj_popupWindow').jqxWindow('open');
}
