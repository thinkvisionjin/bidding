
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#cwls_lxdz').val(data['lxdz']);
			$('#cwls_dzxx').val(data['dzxx']);
			$('#cwls_cz').val(data['cz']);
		}
		else
		{
			$('#cwls_lxdz').val('');
			$('#cwls_dzxx').val('');
			$('#cwls_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function cwls_configpage()
{
	
    $.get('getcwlspz', function(result){
		//需特殊处理
    	$('#cwls_bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh']});
$('#cwls_sz').jqxDropDownList({ placeHolder: "", source: result['sz']});
$('#cwls_ywlx').jqxDropDownList({ placeHolder: "", source: result['ywlx']});
    }, 'json');	
    $("#cwls_dwmc input").blur(function(){getkh($("#cwls_dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function cwls_setupadd()
{
	$('#cwls_Id').val('');
$('#cwls_bsbh').jqxDropDownList('selectIndex',-1);
$('#cwls_sz').jqxDropDownList('selectIndex',-1);
$('#cwls_zy').val('');
$('#cwls_je').val('');
$('#cwls_ywlx').jqxDropDownList('selectIndex',-1);
$('#cwls_lyId').val('');
$('#cwls_username').val('');
$('#cwls_rq').val('');;
	$('#tr_cwls_lyId').hide();
$('#tr_cwls_username').hide();
$('#tr_cwls_rq').hide();;
}
function cwls_setupdetail()
{
	$('#tr_cwls_lyId').show();
$('#cwls_lyId').jqxInput({disabled:true});
$('#tr_cwls_username').show();
$('#cwls_username').jqxInput({disabled:true});
$('#tr_cwls_rq').show();
$('#cwls_rq').jqxInput({disabled:true});
	$.get('selectone_cwls?Id='+$('#cwls_Id').val(), function(result){
		var data = result[0];
		$('#cwls_Id').val(data['Id']);
$('#cwls_bsbh').val(data['bsbh']);
$('#cwls_sz').val(data['sz']);
$('#cwls_zy').val(data['zy']);
$('#cwls_je').val(data['je']);
$('#cwls_ywlx').val(data['ywlx']);
$('#cwls_lyId').val(data['lyId']);
$('#cwls_username').val(data['username']);
$('#cwls_rq').val(data['rq']);		
	}, 'json');	
	$('cwls_Save').hide();
	$('#cwls_Cancel').val('关闭');
	
}
function cwls_setupmodify()
{
	$('#tr_cwls_lyId').show();
$('#cwls_lyId').jqxInput({disabled:true});
$('#tr_cwls_username').show();
$('#cwls_username').jqxInput({disabled:true});
$('#tr_cwls_rq').show();
$('#cwls_rq').jqxInput({disabled:true});;
	$.get('selectone_cwls?Id='+$('#cwls_Id').val(), function(result){
		var data = result[0];
		$('#cwls_Id').val(data['Id']);
$('#cwls_bsbh').val(data['bsbh']);
$('#cwls_sz').val(data['sz']);
$('#cwls_zy').val(data['zy']);
$('#cwls_je').val(data['je']);
$('#cwls_ywlx').val(data['ywlx']);
$('#cwls_lyId').val(data['lyId']);
$('#cwls_username').val(data['username']);
$('#cwls_rq').val(data['rq']);			
	}, 'json');	
}

var gkhcallback;
function cwls_save()
{
	if (state == 'add')
		{
		url = 'insertrow_cwls';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_cwls?Id='+$('#cwls_Id').val();
		}
	var row = {	
	bsbh:$('#cwls_bsbh').val(),
sz:$('#cwls_sz').val(),
zy:$('#cwls_zy').val(),
je:$('#cwls_je').val(),
ywlx:$('#cwls_ywlx').val(),
lyId:$('#cwls_lyId').val(),
username:$('#cwls_username').val(),
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
            	$('#cwls_popupWindow').jqxWindow('hide');
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

function cwls_init () {
	$(document.body).append("       <div id='cwls_popupWindow'>\
            <div>财务流水</div>\
            <div style='overflow: hidden;'><div id='cwlsmx-expander'>\
		<div id='cwls_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_cwls_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='cwls_Id'/></td></tr>\
<tr id='tr_cwls_bsbh'><td class='tbinputtitle'>标书编号:</td><td><div class='tbinput' type='text' id='cwls_bsbh'/></td></tr>\
<tr id='tr_cwls_sz'><td class='tbinputtitle'>收支:</td><td><div class='tbinput' type='text' id='cwls_sz'/></td></tr>\
<tr id='tr_cwls_zy'><td class='tbinputtitle'>摘要:</td><td><input class='tbinput' type='text' id='cwls_zy'/></td></tr>\
<tr id='tr_cwls_je'><td class='tbinputtitle'>金额:</td><td><input class='tbinput' type='text' id='cwls_je'/></td></tr>\
<tr id='tr_cwls_ywlx'><td class='tbinputtitle'>业务类型:</td><td><div class='tbinput' type='text' id='cwls_ywlx'/></td></tr>\
<tr id='tr_cwls_lyId'><td class='tbinputtitle'>来源序号:</td><td><input class='tbinput' type='text' id='cwls_lyId'/></td></tr>\
<tr id='tr_cwls_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='cwls_username'/></td></tr>\
<tr id='tr_cwls_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='cwls_rq'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='cwls_Save' value='保存' /><input id='cwls_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#cwls_popupWindow").jqxWindow({
		width: 600, height:600, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#cwls_Cancel"), modalOpacity: 0.4           
	});	
	$("#cwlsmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#cwls_Id').jqxInput();
$('#cwls_bsbh').jqxDropDownList({ placeHolder: ''});
$('#cwls_sz').jqxDropDownList({ placeHolder: ''});
$('#cwls_zy').jqxInput();
$('#cwls_je').jqxNumberInput({inputMode: 'simple'});
$('#cwls_ywlx').jqxDropDownList({ placeHolder: ''});
$('#cwls_lyId').jqxInput();
$('#cwls_username').jqxInput();
$('#cwls_rq').jqxInput();
	$('#tr_cwls_lyId').hide();
$('#tr_cwls_username').hide();
$('#tr_cwls_rq').hide();

	cwls_configpage();
    $("#cwls_Save").jqxButton({template:'success'});
    $("#cwls_Cancel").jqxButton({template:'warning'});    

	$("#cwls_Save").click(function () {
		cwls_save(state);
	});
 	
  	
}

function cwls_popupwindow(flag_state, id, callback, bsbh)
{
	state = flag_state;
	gkhcallback = callback;
	$('#cwls_Id').val(id);
	$('#cwls_bsbh').val(bsbh);
	if (state == 'add')
	{
		cwls_title.innerHTML='新增';
		cwls_setupadd();
	}
	if (state == 'modify')
	{
		cwls_title.innerHTML='修改';
		cwls_setupmodify();
	}
	if (state == 'detail')
		{
			
			cwls_title.innerHTML='详情';
			cwls_setupdetail();
		}
	$('#cwls_popupWindow').jqxWindow('open');
}
