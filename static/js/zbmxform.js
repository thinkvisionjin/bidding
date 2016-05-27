
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#zb_lxdz').val(data['lxdz']);
			$('#zb_dzxx').val(data['dzxx']);
			$('#zb_cz').val(data['cz']);
		}
		else
		{
			$('#zb_lxdz').val('');
			$('#zb_dzxx').val('');
			$('#zb_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function zb_configpage()
{
	
    $.get('getzbpz', function(result){
		//需特殊处理
    	$('#zb_bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh']});
$('#zb_zbdw1').jqxInput({source:result['dwmc']})
$('#zb_zbdw2').jqxInput({source:result['dwmc']})
$('#zb_zbdw3').jqxInput({source:result['dwmc']})
    }, 'json');	
    $("#zb_dwmc input").blur(function(){getkh($("#zb_dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function zb_setupadd()
{
	$('#zb_Id').val('');
$('#zb_bsbh').jqxDropDownList('selectIndex',-1);
$('#zb_zbdw1').val('');
$('#zb_zbdw2').val('');
$('#zb_zbdw3').val('');
$('#zb_username').val('');
$('#zb_rq').val('');;
	$('#tr_zb_Id').hide();
$('#tr_zb_username').hide();
$('#tr_zb_rq').hide();;
}
function zb_setupdetail()
{
	$('#tr_zb_Id').show();
$('#zb_Id').jqxInput({disabled:true});
$('#tr_zb_username').show();
$('#zb_username').jqxInput({disabled:true});
$('#tr_zb_rq').show();
$('#zb_rq').jqxInput({disabled:true});
	$.get('selectone_zb?Id='+$('#zb_Id').val(), function(result){
		var data = result[0];
		$('#zb_Id').val(data['Id']);
$('#zb_bsbh').val(data['bsbh']);
$('#zb_zbdw1').val(data['zbdw1']);
$('#zb_zbdw2').val(data['zbdw2']);
$('#zb_zbdw3').val(data['zbdw3']);
$('#zb_username').val(data['username']);
$('#zb_rq').val(data['rq']);		
	}, 'json');	
	$('#zb_Save').hide();
	$('#zb_Cancel').val('关闭');
	
}
function zb_setupmodify()
{
	$('#tr_zb_Id').show();
$('#zb_Id').jqxInput({disabled:true});
$('#tr_zb_username').show();
$('#zb_username').jqxInput({disabled:true});
$('#tr_zb_rq').show();
$('#zb_rq').jqxInput({disabled:true});;
	$.get('selectone_zb?Id='+$('#zb_Id').val(), function(result){
		var data = result[0];
		$('#zb_Id').val(data['Id']);
$('#zb_bsbh').val(data['bsbh']);
$('#zb_zbdw1').val(data['zbdw1']);
$('#zb_zbdw2').val(data['zbdw2']);
$('#zb_zbdw3').val(data['zbdw3']);
$('#zb_username').val(data['username']);
$('#zb_rq').val(data['rq']);			
	}, 'json');	
}

var gkhcallback;
function zb_save()
{
	if (state == 'add')
		{
		url = 'insertrow_zb';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_zb?Id='+$('#zb_Id').val();
		}
	var row = {	
	bsbh:$('#zb_bsbh').val(),
zbdw1:$('#zb_zbdw1').val(),
zbdw2:$('#zb_zbdw2').val(),
zbdw3:$('#zb_zbdw3').val(),
username:$('#zb_username').val(),
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
            	$('#zb_popupWindow').jqxWindow('hide');
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

function zb_init () {
	$(document.body).append("       <div id='zb_popupWindow'>\
            <div>中标</div>\
            <div style='overflow: hidden;'><div id='zbmx-expander'>\
		<div id='zb_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_zb_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='zb_Id'/></td></tr>\
<tr id='tr_zb_bsbh'><td class='tbinputtitle'>标书编号:</td><td><div class='tbinput' type='text' id='zb_bsbh'/></td></tr>\
<tr id='tr_zb_zbdw1'><td class='tbinputtitle'>中标备选一:</td><td><input class='tbinput' type='text' id='zb_zbdw1'/></td></tr>\
<tr id='tr_zb_zbdw2'><td class='tbinputtitle'>中标备选二:</td><td><input class='tbinput' type='text' id='zb_zbdw2'/></td></tr>\
<tr id='tr_zb_zbdw3'><td class='tbinputtitle'>中标备选三:</td><td><input class='tbinput' type='text' id='zb_zbdw3'/></td></tr>\
<tr id='tr_zb_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='zb_username'/></td></tr>\
<tr id='tr_zb_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='zb_rq'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='zb_Save' value='保存' /><input id='zb_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#zb_popupWindow").jqxWindow({
		width: 600, height:600, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#zb_Cancel"), modalOpacity: 0.4           
	});	
	$("#zbmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#zb_Id').jqxInput();
$('#zb_bsbh').jqxDropDownList({ placeHolder: ''});
$('#zb_zbdw1').jqxInput();
$('#zb_zbdw2').jqxInput();
$('#zb_zbdw3').jqxInput();
$('#zb_username').jqxInput();
$('#zb_rq').jqxInput();
	$('#tr_zb_Id').hide();
$('#tr_zb_username').hide();
$('#tr_zb_rq').hide();

	zb_configpage();
    $("#zb_Save").jqxButton({template:'success'});
    $("#zb_Cancel").jqxButton({template:'warning'});    

	$("#zb_Save").click(function () {
		zb_save(state);
	});
 	
  	
}

function zb_popupwindow(flag_state, id, callback, bsbh)
{
	state = flag_state;
	gkhcallback = callback;
	$('#zb_Id').val(id);
	
	if (state == 'add')
	{
		zb_title.innerHTML='新增';
		zb_setupadd();
	}
	if (state == 'modify')
	{
		zb_title.innerHTML='修改';
		zb_setupmodify();
	}
	if (state == 'detail')
		{
			
			zb_title.innerHTML='详情';
			zb_setupdetail();
		}
		$('#zb_bsbh').val(bsbh);
	$('#zb_popupWindow').jqxWindow('open');
}
