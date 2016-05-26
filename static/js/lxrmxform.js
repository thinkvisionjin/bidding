
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#lxr_lxdz').val(data['lxdz']);
			$('#lxr_dzxx').val(data['dzxx']);
			$('#lxr_cz').val(data['cz']);
		}
		else
		{
			$('#lxr_lxdz').val('');
			$('#lxr_dzxx').val('');
			$('#lxr_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function lxr_configpage()
{
	

}
var olddwmc='';
var state = 'add';
function lxr_setupadd()
{
	$('#lxr_Id').val('');
$('#lxr_khId').val('');
$('#lxr_lxr').val('');
$('#lxr_sj').val('');
$('#lxr_rq').val('');
$('#lxr_username').val('');;
	$('#tr_lxr_Id').hide();
$('#tr_lxr_khId').hide();
$('#tr_lxr_rq').hide();
$('#tr_lxr_username').hide();;
}
function lxr_setupdetail()
{
	$('#tr_lxr_Id').show();
$('#lxr_Id').jqxInput({disabled:true});
$('#tr_lxr_khId').show();
$('#lxr_khId').jqxInput({disabled:true});
$('#tr_lxr_rq').show();
$('#lxr_rq').jqxInput({disabled:true});
$('#tr_lxr_username').show();
$('#lxr_username').jqxInput({disabled:true});
	$.get('selectone_lxr?Id='+$('#lxr_Id').val(), function(result){
		var data = result[0];
		$('#lxr_Id').val(data['Id']);
$('#lxr_khId').val(data['khId']);
$('#lxr_lxr').val(data['lxr']);
$('#lxr_sj').val(data['sj']);
$('#lxr_rq').val(data['rq']);
$('#lxr_username').val(data['username']);		
	}, 'json');	
	$('lxr_Save').hide();
	$('#lxr_Cancel').val('关闭');
	
}
function lxr_setupmodify()
{
	$('#tr_lxr_Id').show();
$('#lxr_Id').jqxInput({disabled:true});
$('#tr_lxr_khId').show();
$('#lxr_khId').jqxInput({disabled:true});
$('#tr_lxr_rq').show();
$('#lxr_rq').jqxInput({disabled:true});
$('#tr_lxr_username').show();
$('#lxr_username').jqxInput({disabled:true});;
	$.get('selectone_lxr?Id='+$('#lxr_Id').val(), function(result){
		var data = result[0];
		$('#lxr_Id').val(data['Id']);
$('#lxr_khId').val(data['khId']);
$('#lxr_lxr').val(data['lxr']);
$('#lxr_sj').val(data['sj']);
$('#lxr_rq').val(data['rq']);
$('#lxr_username').val(data['username']);			
	}, 'json');	
}

var gkhcallback;
function lxr_save()
{
	if (state == 'add')
		{
		url = 'insertrow_lxr';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_lxr?Id='+$('#lxr_Id').val();
		}
	var row = {	
	khId:$('#lxr_khId').val(),
lxr:$('#lxr_lxr').val(),
sj:$('#lxr_sj').val(),
username:$('#lxr_username').val(),
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
            	$('#lxr_popupWindow').jqxWindow('hide');
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

function lxr_init () {
	$(document.body).append("       <div id='lxr_popupWindow'>\
            <div>联系人</div>\
            <div style='overflow: hidden;'><div id='lxrmx-expander'>\
		<div id='lxr_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_lxr_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='lxr_Id'/></td></tr>\
<tr id='tr_lxr_khId'><td class='tbinputtitle'>客户号:</td><td><input class='tbinput' type='text' id='lxr_khId'/></td></tr>\
<tr id='tr_lxr_lxr'><td class='tbinputtitle'>联系人:</td><td><input class='tbinput' type='text' id='lxr_lxr'/></td></tr>\
<tr id='tr_lxr_sj'><td class='tbinputtitle'>手机:</td><td><input class='tbinput' type='text' id='lxr_sj'/></td></tr>\
<tr id='tr_lxr_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='lxr_rq'/></td></tr>\
<tr id='tr_lxr_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='lxr_username'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='lxr_Save' value='保存' /><input id='lxr_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#lxr_popupWindow").jqxWindow({
		width: 600, height:600, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#lxr_Cancel"), modalOpacity: 0.4           
	});	
	$("#lxrmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#lxr_Id').jqxInput();
$('#lxr_khId').jqxInput();
$('#lxr_lxr').jqxInput();
$('#lxr_sj').jqxInput();
$('#lxr_rq').jqxInput();
$('#lxr_username').jqxInput();
	$('#tr_lxr_Id').hide();
$('#tr_lxr_khId').hide();
$('#tr_lxr_rq').hide();
$('#tr_lxr_username').hide();

	lxr_configpage();
    $("#lxr_Save").jqxButton({template:'success'});
    $("#lxr_Cancel").jqxButton({template:'warning'});    

	$("#lxr_Save").click(function () {
		lxr_save(state);
	});
 	
  	
}

function lxr_popupwindow(flag_state, id, callback, khId)
{
	state = flag_state;
	gkhcallback = callback;
	$('#lxr_Id').val(id);
	if (state == 'add')
	{
		lxr_title.innerHTML='新增';
		lxr_setupadd();
	}
	if (state == 'modify')
	{
		lxr_title.innerHTML='修改';
		lxr_setupmodify();
	}
	if (state == 'detail')
		{
			
			lxr_title.innerHTML='详情';
			lxr_setupdetail();
		}
	$('#lxr_khId').val(khId);
	$('#lxr_popupWindow').jqxWindow('open');
}