
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#auth_user_lxdz').val(data['lxdz']);
			$('#auth_user_dzxx').val(data['dzxx']);
			$('#auth_user_cz').val(data['cz']);
		}
		else
		{
			$('#auth_user_lxdz').val('');
			$('#auth_user_dzxx').val('');
			$('#auth_user_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function auth_user_configpage()
{
	
    $.get('getauth_userpz', function(result){
		//需特殊处理
    	$('#auth_user_role').jqxDropDownList({ placeHolder: "", source: result['role'],displayMember: "role", valueMember: "id"});
    }, 'json');	
    $("#auth_user_dwmc input").blur(function(){getkh($("#auth_user_dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function auth_user_setupadd()
{
	$('#auth_user_Id').val('');
$('#auth_user_username').val('');
$('#auth_user_chinesename').val('');
$('#auth_user_role').jqxDropDownList('selectIndex',-1);
$('#auth_user_rq').val('');;
	$('#tr_auth_user_rq').hide();;
		$('#auth_user_Save').show();
	$('#auth_user_Cancel').val('取消');
}
function auth_user_setupdetail()
{
//	$('#tr_auth_user_rq').show();
$('#auth_user_rq').jqxInput({disabled:true});
	$.get('selectone_auth_user?Id='+$('#auth_user_Id').val(), function(result){
		var data = result[0];
		$('#auth_user_Id').val(data['Id']);
$('#auth_user_username').val(data['username']);
$('#auth_user_chinesename').val(data['chinesename']);
$('#auth_user_role').val(data['role']);
$('#auth_user_rq').val(data['rq']);		
	}, 'json');	
	$('#auth_user_Save').hide();
	$('#auth_user_Cancel').val('关闭');
	
}
function auth_user_setupmodify()
{
//	$('#tr_auth_user_rq').show();
$('#auth_user_rq').jqxInput({disabled:true});;
	$.get('selectone_auth_user?Id='+$('#auth_user_Id').val(), function(result){
		var data = result[0];
		$('#auth_user_Id').val(data['Id']);
$('#auth_user_username').val(data['username']);
$('#auth_user_chinesename').val(data['chinesename']);
$('#auth_user_role').val(data['role']);
$('#auth_user_rq').val(data['rq']);			
	}, 'json');	
		$('#auth_user_Save').show();
	$('#auth_user_Cancel').val('取消');	
}

var gkhcallback;
function auth_user_save()
{
	if (state == 'add')
		{
		url = 'insertrow_auth_user';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_auth_user?Id='+$('#auth_user_Id').val();
		}
	var row = {	
	username:$('#auth_user_username').val(),
chinesename:$('#auth_user_chinesename').val(),
role:$('#auth_user_role').val(),
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
            	$('#auth_user_popupWindow').jqxWindow('hide');
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



function auth_user_init () {
	$(document.body).append("       <div id='auth_user_popupWindow'>\
            <div>系统用户管理</div>\
            <div style='overflow: hidden;'><div id='auth_usermx-expander'>\
		<div id='auth_user_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_auth_user_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='auth_user_Id'/></td></tr>\
<tr id='tr_auth_user_username'><td class='tbinputtitle'>用户名:</td><td><input class='tbinput' type='text' id='auth_user_username'/></td></tr>\
<tr id='tr_auth_user_chinesename'><td class='tbinputtitle'>姓名:</td><td><input class='tbinput' type='text' id='auth_user_chinesename'/></td></tr>\
<tr id='tr_auth_user_role'><td class='tbinputtitle'>角色:</td><td><div class='tbinput' type='text' id='auth_user_role'/></td></tr>\
<tr id='tr_auth_user_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='auth_user_rq'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='auth_user_Save' value='保存' /><input id='auth_user_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#auth_user_popupWindow").jqxWindow({
		width: 600, height:250, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#auth_user_Cancel"), modalOpacity: 0.4           
	});	
	$("#auth_usermx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#auth_user_Id').jqxInput();
$('#auth_user_username').jqxInput();
$('#auth_user_chinesename').jqxInput();
$('#auth_user_role').jqxDropDownList({ placeHolder: ''});
$('#auth_user_rq').jqxInput();
	$('#tr_auth_user_rq').hide();

	auth_user_configpage();
    $("#auth_user_Save").jqxButton({template:'success'});
    $("#auth_user_Cancel").jqxButton({template:'warning'});    

	$("#auth_user_Save").click(function () {
		auth_user_save(state);
	});
 	
  	
}

function auth_user_popupwindow(flag_state, id, callback, bsbh)
{
	state = flag_state;
	gkhcallback = callback;
	$('#auth_user_Id').val(id);
	
	if (state == 'add')
	{
		auth_user_title.innerHTML='新增';
		auth_user_setupadd();
	}
	if (state == 'modify')
	{
		auth_user_title.innerHTML='修改';
		auth_user_setupmodify();
	}
	if (state == 'detail')
		{
			
			auth_user_title.innerHTML='详情';
			auth_user_setupdetail();
		}
	$('#auth_user_bsbh').val(bsbh);
	$('#auth_user_popupWindow').jqxWindow('open');
}
