
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#xmzc_lxdz').val(data['lxdz']);
			$('#xmzc_dzxx').val(data['dzxx']);
			$('#xmzc_cz').val(data['cz']);
		}
		else
		{
			$('#xmzc_lxdz').val('');
			$('#xmzc_dzxx').val('');
			$('#xmzc_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function xmzc_configpage(projectid, cb)
{
	if (projectid == undefined)
	{
		url = 'getxmzcpz';
	}
	else
	{
		url = 'getxmzcpz?projectid='+projectid;
	}
	
	$.get(url, function(result){
		//需特殊处理
    	$('#xmzc_projectid').jqxDropDownList({ placeHolder: "", source: result['projectid'], displayMember:'ProjectCode', valueMember:'Id'});
$('#xmzc_sz').jqxDropDownList({ placeHolder: "", source: result['sz']});
$('#xmzc_projectid').jqxDropDownList('selectIndex', 0);
$('#xmzc_ywlx').jqxDropDownList({ placeHolder: "", source: result['ywlx']});
cb();
    }, 'json');	
    $("#xmzc_dwmc input").blur(function(){getkh($("#xmzc_dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function xmzc_setupadd()
{
	$('#xmzc_Id').val('');
$('#xmzc_projectid').jqxDropDownList('selectIndex',-1);
$('#xmzc_sz').jqxDropDownList('selectIndex',-1);
$('#xmzc_zy').val('');
$('#xmzc_je').val('');
$('#xmzc_ywlx').jqxDropDownList('selectIndex',-1);
$('#xmzc_lyId').val('');
$('#xmzc_username').val('');
$('#xmzc_rq').val('');;
	$('#tr_xmzc_lyId').hide();
$('#tr_xmzc_username').hide();
$('#tr_xmzc_rq').hide();;
	$('#xmzc_Save').show();
	$('#xmzc_Cancel').val('取消');
}
function xmzc_setupdetail()
{
	$('#tr_xmzc_lyId').show();
$('#xmzc_lyId').jqxInput({disabled:true});
$('#tr_xmzc_username').show();
$('#xmzc_username').jqxInput({disabled:true});
$('#tr_xmzc_rq').show();
$('#xmzc_rq').jqxInput({disabled:true});
	$.get('selectone_xmzc?Id='+$('#xmzc_Id').val(), function(result){
		var data = result[0];
		$('#xmzc_Id').val(data['Id']);
$('#xmzc_projectid').val(data['projectid']);
$('#xmzc_sz').val(data['sz']);
$('#xmzc_zy').val(data['zy']);
$('#xmzc_je').val(data['je']);
$('#xmzc_ywlx').val(data['ywlx']);
$('#xmzc_lyId').val(data['lyId']);
$('#xmzc_username').val(data['username']);
$('#xmzc_rq').val(data['rq']);		
	}, 'json');	
	$('#xmzc_Save').hide();
	$('#xmzc_Cancel').val('关闭');
	
}
function xmzc_setupmodify()
{
	$('#tr_xmzc_lyId').show();
$('#xmzc_lyId').jqxInput({disabled:true});
$('#tr_xmzc_username').show();
$('#xmzc_username').jqxInput({disabled:true});
$('#tr_xmzc_rq').show();
$('#xmzc_rq').jqxInput({disabled:true});;
	$.get('selectone_xmzc?Id='+$('#xmzc_Id').val(), function(result){
		var data = result[0];
		$('#xmzc_Id').val(data['Id']);
$('#xmzc_projectid').val(data['projectid']);
$('#xmzc_sz').val(data['sz']);
$('#xmzc_zy').val(data['zy']);
$('#xmzc_je').val(data['je']);
$('#xmzc_ywlx').val(data['ywlx']);
$('#xmzc_lyId').val(data['lyId']);
$('#xmzc_username').val(data['username']);
$('#xmzc_rq').val(data['rq']);			
	}, 'json');	
	$('#xmzc_Save').show();
	$('#xmzc_Cancel').val('取消');	
}

var gkhcallback;
function xmzc_save()
{
	if (state == 'add')
		{
		url = 'insertrow_xmzc';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_xmzc?Id='+$('#xmzc_Id').val();
		}
	var row = {	
	projectid:$('#xmzc_projectid').val(),
sz:$('#xmzc_sz').val(),
zy:$('#xmzc_zy').val(),
je:$('#xmzc_je').val(),
ywlx:$('#xmzc_ywlx').val(),
lyId:$('#xmzc_lyId').val(),
username:$('#xmzc_username').val(),
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
            	$('#xmzc_popupWindow').jqxWindow('hide');
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

function xmzc_init () {
	$(document.body).append("       <div id='xmzc_popupWindow'>\
            <div>项目支出</div>\
            <div style='overflow: hidden;'><div id='xmzcmx-expander'>\
		<div id='xmzc_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_xmzc_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='xmzc_Id'/></td></tr>\
<tr id='tr_xmzc_projectid'><td class='tbinputtitle'>项目编号:</td><td><div class='tbinput' type='text' id='xmzc_projectid'/></td></tr>\
<tr id='tr_xmzc_sz'><td class='tbinputtitle'>收支:</td><td><div class='tbinput' type='text' id='xmzc_sz'/></td></tr>\
<tr id='tr_xmzc_zy'><td class='tbinputtitle'>摘要:</td><td><input class='tbinput' type='text' id='xmzc_zy'/></td></tr>\
<tr id='tr_xmzc_je'><td class='tbinputtitle'>金额(元):</td><td><input class='tbinput' type='text' id='xmzc_je'/></td></tr>\
<tr id='tr_xmzc_ywlx'><td class='tbinputtitle'>业务类型:</td><td><div class='tbinput' type='text' id='xmzc_ywlx'/></td></tr>\
<tr id='tr_xmzc_lyId'><td class='tbinputtitle'>来源序号:</td><td><input class='tbinput' type='text' id='xmzc_lyId'/></td></tr>\
<tr id='tr_xmzc_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='xmzc_username'/></td></tr>\
<tr id='tr_xmzc_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='xmzc_rq'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='xmzc_Save' value='保存' /><input id='xmzc_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#xmzc_popupWindow").jqxWindow({
		width: 600, height:360, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#xmzc_Cancel"), modalOpacity: 0.4           
	});	
	$("#xmzcmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#xmzc_Id').jqxInput();
$('#xmzc_projectid').jqxDropDownList({ placeHolder: ''});
$('#xmzc_sz').jqxDropDownList({ placeHolder: ''});
	$('#xmzc_sz').on('select', function (event)
	{
		if ($('#xmzc_sz').val() == '支出')
		{

			$("#xmzc_ywlx").jqxDropDownList({ disabled: false }); 
		}
		else
		{
			$("#xmzc_ywlx").jqxDropDownList({ disabled: true }); 
		}

	}                        
	); 

$('#xmzc_zy').jqxInput();
$('#xmzc_je').jqxNumberInput({inputMode: 'simple'});
$('#xmzc_ywlx').jqxDropDownList({ placeHolder: '', disabled:true});
$('#xmzc_lyId').jqxInput();
$('#xmzc_username').jqxInput();
$('#xmzc_rq').jqxInput();
	$('#tr_xmzc_lyId').hide();
$('#tr_xmzc_username').hide();
$('#tr_xmzc_rq').hide();

	
    $("#xmzc_Save").jqxButton({template:'success'});
    $("#xmzc_Cancel").jqxButton({template:'warning'});    

	$("#xmzc_Save").click(function () {
		xmzc_save(state);
	});
 	
  	
}

function xmzc_popupwindow(flag_state, id, callback, projectid)
{
	y = document.body.scrollTop;
	x = (document.body.scrollWidth -600)/2
	$('#xmzc_popupWindow').jqxWindow({ position: { x: x, y: y }});		
	state = flag_state;
	gkhcallback = callback;
	$('#xmzc_Id').val(id);
	$('#xmzc_projectid').val(projectid);
	xmzc_configpage(projectid, function(){
		if (state == 'add')
		{
			xmzc_title.innerHTML='新增';
			xmzc_setupadd();
		}
		if (state == 'modify')
		{
			xmzc_title.innerHTML='修改';
			xmzc_setupmodify();
		}
		if (state == 'detail')
			{
				
				xmzc_title.innerHTML='详情';
				xmzc_setupdetail();
			}
		$('#xmzc_popupWindow').jqxWindow('open');
	});

}
