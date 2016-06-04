
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#kh_lxdz').val(data['lxdz']);
			$('#kh_dzxx').val(data['dzxx']);
			$('#kh_cz').val(data['cz']);
		}
		else
		{
			$('#kh_lxdz').val('');
			$('#kh_dzxx').val('');
			$('#kh_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function kh_configpage()
{
	

}
var olddwmc='';
var state = 'add';
function kh_setupadd()
{
	$('#kh_Id').val('');
$('#kh_nsrsbh').val('');	
$('#kh_dwmc').val('');
$('#kh_rq').val('');
$('#kh_khyh').val('');
$('#kh_yhzh').val('');
$('#kh_lxdz').val('');
$('#kh_dzxx').val('');
$('#kh_cz').val('');
$('#kh_username').val('');;
	$('#tr_kh_Id').hide();
$('#tr_kh_rq').hide();
$('#tr_kh_username').hide();;
}
function kh_setupdetail()
{
	$('#tr_kh_Id').show();
$('#kh_Id').jqxInput({disabled:true});
$('#tr_kh_rq').show();
$('#kh_rq').jqxInput({disabled:true});
$('#tr_kh_username').show();
$('#kh_username').jqxInput({disabled:true});
	$.get('selectone_kh?Id='+$('#kh_Id').val(), function(result){
		var data = result[0];
		$('#kh_Id').val(data['Id']);
$('#kh_nsrsbh').val(data['nsrsbh']);
$('#kh_dwmc').val(data['dwmc']);
$('#kh_rq').val(data['rq']);
$('#kh_khyh').val(data['khyh']);
$('#kh_yhzh').val(data['yhzh']);
$('#kh_lxdz').val(data['lxdz']);
$('#kh_dzxx').val(data['dzxx']);
$('#kh_cz').val(data['cz']);
$('#kh_username').val(data['username']);		
	}, 'json');	
	$('#kh_Save').hide();
	$('#kh_Cancel').val('关闭');
	
}
function kh_setupmodify()
{
	$('#tr_kh_Id').show();
$('#kh_Id').jqxInput({disabled:true});
$('#tr_kh_rq').show();
$('#kh_rq').jqxInput({disabled:true});
$('#tr_kh_username').show();
$('#kh_username').jqxInput({disabled:true});;
	$.get('selectone_kh?Id='+$('#kh_Id').val(), function(result){
		var data = result[0];
		$('#kh_Id').val(data['Id']);
$('#kh_nsrsbh').val(data['nsrsbh']);		
$('#kh_dwmc').val(data['dwmc']);
$('#kh_rq').val(data['rq']);
$('#kh_khyh').val(data['khyh']);
$('#kh_yhzh').val(data['yhzh']);
$('#kh_lxdz').val(data['lxdz']);
$('#kh_dzxx').val(data['dzxx']);
$('#kh_cz').val(data['cz']);
$('#kh_username').val(data['username']);			
	}, 'json');	
}

var gkhcallback;
function kh_save()
{
	if ($('#kh_Id').jqxValidator('validate')==false)
		{
			$('#kh_Id').jqxValidator('updatePosition');
			return;
		}
	if (state == 'add')
		{
		url = 'insertrow_kh';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_kh?Id='+$('#kh_Id').val();
		}
	var row = {	
	nsrsbh:$('#kh_nsrsbh').val(),
	dwmc:$('#kh_dwmc').val(),
khyh:$('#kh_khyh').val(),
yhzh:$('#kh_yhzh').val(),
lxdz:$('#kh_lxdz').val(),
dzxx:$('#kh_dzxx').val(),
cz:$('#kh_cz').val(),
username:$('#kh_username').val(),
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
            	$('#kh_popupWindow').jqxWindow('hide');
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

function kh_init () {
	$(document.body).append("       <div id='kh_popupWindow'>\
            <div>客户</div>\
            <div style='overflow: hidden;'><div id='khmx-expander'>\
		<div id='kh_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_kh_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='kh_Id'/></td></tr>\
<tr id='tr_kh_nsrsbh'><td class='tbinputtitle'>纳税人识别号:</td><td><input class='tbinput' type='text' id='kh_nsrsbh'/></td></tr>\
<tr id='tr_kh_dwmc'><td class='tbinputtitle'>单位名称:</td><td><input class='tbinput' type='text' id='kh_dwmc'/></td></tr>\
<tr id='tr_kh_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='kh_rq'/></td></tr>\
<tr id='tr_kh_khyh'><td class='tbinputtitle'>开户银行:</td><td><input class='tbinput' type='text' id='kh_khyh'/></td></tr>\
<tr id='tr_kh_yhzh'><td class='tbinputtitle'>银行账号:</td><td><input class='tbinput' type='text' id='kh_yhzh'/></td></tr>\
<tr id='tr_kh_lxdz'><td class='tbinputtitle'>联系地址:</td><td><input class='tbinput' type='text' id='kh_lxdz'/></td></tr>\
<tr id='tr_kh_dzxx'><td class='tbinputtitle'>电子信箱:</td><td><input class='tbinput' type='text' id='kh_dzxx'/></td></tr>\
<tr id='tr_kh_cz'><td class='tbinputtitle'>传真:</td><td><input class='tbinput' type='text' id='kh_cz'/></td></tr>\
<tr id='tr_kh_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='kh_username'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='kh_Save' value='保存' /><input id='kh_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#kh_popupWindow").jqxWindow({
		width: 600,  resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#kh_Cancel"), modalOpacity: 0.4           
	});	
	$("#khmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#kh_Id').jqxInput();
$('#kh_nsrsbh').jqxInput();
$('#kh_dwmc').jqxInput();
$('#kh_rq').jqxInput();
$('#kh_khyh').jqxInput();
$('#kh_yhzh').jqxInput();
$('#kh_lxdz').jqxInput();
$('#kh_dzxx').jqxInput();
$('#kh_cz').jqxInput();
$('#kh_username').jqxInput();
	$('#tr_kh_Id').hide();
$('#tr_kh_rq').hide();
$('#tr_kh_username').hide();

	kh_configpage();
    $("#kh_Save").jqxButton({template:'success'});
    $("#kh_Cancel").jqxButton({template:'warning'});    

	$("#kh_Save").click(function () {
		kh_save(state);
	});
	$("#kh_Id").jqxValidator({scroll: false,
		rules: [
		{ input: "#kh_dwmc", message: "不可为空!", action: 'keyup, blur', rule: 'required' },
		{ input: "#kh_khyh", message: "不可为空!", action: 'keyup, blur', rule: 'required' },
		{ input: "#kh_yhzh", message: "不可为空!", action: 'keyup, blur', rule: 'required' },
		{ input: "#kh_yhzh", message: "不是有效的银行账号!", action: 'keyup, blur', rule: function(input){
			var val = $("#kh_yhzh").val();
			if(val==""){return false;}
			var reg = /[+|-|0-9]{2,30}$/;
			if (reg.test(val)) {return true;}else{return false;}
		} },	
		{ input: "#kh_cz", message: "不是有效的传真号码!", action: 'keyup, blur', rule: function(input){
			var val = $("#kh_cz").val();
			if(val==""){return false;}
			var reg = /[+|-|0-9]{2,30}$/;
			if (reg.test(val)) {return true;}else{return false;}
		} },
		{ input: '#kh_dzxx', message: '不是有效的电子邮箱!', action: 'keyup', rule: 'email' }
		], hintType: "tooltip"
	}); 	

        
	
}

function kh_popupwindow(flag_state, id, callback, bsbh)
{
	y = document.body.scrollTop;
	x = (document.body.scrollWidth -600)/2
	$('#kh_popupWindow').jqxWindow({ position: { x: x, y: y }});	
	gkhcallback = callback;
	state = flag_state;
	$('#kh_Id').val(id);
	$('#kh_popupWindow').jqxWindow({ height:450});
	if (state == 'add')
	{
		kh_title.innerHTML='新增';
		kh_setupadd();
		$('#kh_popupWindow').jqxWindow({ height:350});
	}
	if (state == 'modify')
	{
		kh_title.innerHTML='修改';
		kh_setupmodify();
	}
	if (state == 'detail')
		{
			
			kh_title.innerHTML='详情';
			kh_setupdetail();
		}
	$('#kh_popupWindow').jqxWindow('open');
}
