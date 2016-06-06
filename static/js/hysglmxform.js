
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result.length==1) {
			var data = result[0];
			$('#hysgl_lxdz').val(data['lxdz']);
			$('#hysgl_dzxx').val(data['dzxx']);
			$('#hysgl_cz').val(data['cz']);
		}
		else
		{
			$('#hysgl_lxdz').val('');
			$('#hysgl_dzxx').val('');
			$('#hysgl_cz').val('');
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function hysgl_configpage()
{
	
    $.get('gethysglpz', function(result){
		//需特殊处理
    	$('#hysgl_hys').jqxDropDownList({ placeHolder: "", source: result['hys']});
    	$('#hys').jqxDropDownList({ placeHolder: "", source: result['hys']});
    }, 'json');	
    $("#hysgl_dwmc input").blur(function(){getkh($("#hysgl_dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function hysgl_setupadd()
{
	$('#hysgl_Id').val('');
$('#hysgl_username').val('');
$('#hysgl_hyzt').val('');
$('#hysgl_hys').jqxDropDownList('selectIndex',-1);
$('#hysgl_kssj').jqxDropDownList('selectIndex',-1);
$('#hysgl_jssj').jqxDropDownList('selectIndex',-1);
$('#hysgl_rq').val('');;
	$('#tr_hysgl_username').hide();
$('#tr_hysgl_rq').hide();;
	$('#hysgl_Save').show();
	$('#hysgl_Cancel').val('取消');
}
function hysgl_setupdetail()
{
	$('#tr_hysgl_username').show();
$('#hysgl_username').jqxInput({disabled:true});
$('#tr_hysgl_rq').show();
$('#hysgl_rq').jqxInput({disabled:true});
	$.get('selectone_hysgl?Id='+$('#hysgl_Id').val(), function(result){
		var data = result[0];
		$('#hysgl_Id').val(data['Id']);
$('#hysgl_username').val(data['username']);
$('#hysgl_hyzt').val(data['hyzt']);
$('#hysgl_hys').val(data['hys']);
$('#hysgl_kssj').val(data['kssj']);
$('#hysgl_jssj').val(data['jssj']);
$('#hysgl_rq').val(data['rq']);		
	}, 'json');	
	$('#hysgl_Save').hide();
	$('#hysgl_Cancel').val('关闭');
	
}
function hysgl_setupmodify()
{
	$('#tr_hysgl_username').show();
$('#hysgl_username').jqxInput({disabled:true});
$('#tr_hysgl_rq').show();
$('#hysgl_rq').jqxInput({disabled:true});;
	$.get('selectone_hysgl?Id='+$('#hysgl_Id').val(), function(result){
		var data = result[0];
		$('#hysgl_Id').val(data['Id']);
$('#hysgl_username').val(data['username']);
$('#hysgl_hyzt').val(data['hyzt']);
$('#hysgl_hys').val(data['hys']);
$('#hysgl_kssj').val(data['kssj']);
$('#hysgl_jssj').val(data['jssj']);
$('#hysgl_rq').val(data['rq']);			
	}, 'json');	
	$('#hysgl_Save').show();
	$('#hysgl_Cancel').val('取消');	
}

var gkhcallback;
function hysgl_save()
{
	if ($('#hysgl_Id').jqxValidator('validate')==false){return;}
	if (state == 'add')
		{
		url = 'insertrow_hysgl';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_hysgl?Id='+$('#hysgl_Id').val();
		}
	var row = {	
	username:$('#hysgl_username').val(),
hyzt:$('#hysgl_hyzt').val(),
hys:$('#hysgl_hys').val(),
kssj:$('#hysgl_kssj').val(),
jssj:$('#hysgl_jssj').val(),
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
            	$('#hysgl_popupWindow').jqxWindow('hide');
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

function hysgl_init () {
	$(document.body).append("       <div id='hysgl_popupWindow'>\
            <div>会议室管理</div>\
            <div style='overflow: hidden;'><div id='hysglmx-expander'>\
		<div id='hysgl_title'>新增</div>\
		<div>\
		\
			<table align='center' >\
			<tr id='tr_hysgl_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='hysgl_Id'/></td></tr>\
<tr id='tr_hysgl_username'><td class='tbinputtitle'>申请人:</td><td><input class='tbinput' type='text' id='hysgl_username'/></td></tr>\
<tr id='tr_hysgl_hyzt'><td class='tbinputtitle'>会议主题:</td><td><input class='tbinput' type='text' id='hysgl_hyzt'/></td></tr>\
<tr id='tr_hysgl_hys'><td class='tbinputtitle'>会议室:</td><td><div class='tbinput' type='text' id='hysgl_hys'/></td></tr>\
<tr id='tr_hysgl_kssj'><td class='tbinputtitle'>开始时间:</td><td><div class='tbinput' type='text' id='hysgl_kssj'/></td></tr>\
<tr id='tr_hysgl_jssj'><td class='tbinputtitle'>结束时间:</td><td><div class='tbinput' type='text' id='hysgl_jssj'/></td></tr>\
<tr id='tr_hysgl_rq'><td class='tbinputtitle'>申请日期:</td><td><input class='tbinput' type='text' id='hysgl_rq'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='hysgl_Save' value='保存' /><input id='hysgl_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div>");
	$("#hysgl_popupWindow").jqxWindow({
		width: 600, height:300, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#hysgl_Cancel"), modalOpacity: 0.4           
	});	
	$("#hysglmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#hysgl_Id').jqxInput();
$('#hysgl_username').jqxInput();
$('#hysgl_hyzt').jqxInput();
$('#hysgl_hys').jqxDropDownList({ placeHolder: ''});
$('#hysgl_kssj').jqxDateTimeInput({formatString: "yyyy-MM-dd HH:mm:ss",showTimeButton: true, culture:'zh-CN', height: '25px'});
$('#hysgl_jssj').jqxDateTimeInput({formatString: "yyyy-MM-dd HH:mm:ss",showTimeButton: true, culture:'zh-CN', height: '25px'});
$('#hysgl_rq').jqxInput();
	$('#tr_hysgl_username').hide();
$('#tr_hysgl_rq').hide();

	hysgl_configpage();
    $("#hysgl_Save").jqxButton({template:'success'});
    $("#hysgl_Cancel").jqxButton({template:'warning'});    

	$("#hysgl_Save").click(function () {
		hysgl_save(state);
	});
 	$("#hysgl_Id").jqxValidator({scroll: false,
		rules: [
		{ input: "#hysgl_kssj", message: "开始时间不能早于当前时间!", action: 'keyup, blur', rule: function(input){
			var d = new Date();
			if ($("#hysgl_kssj").jqxDateTimeInput('getDate') <=d)
			{
				return false;
			}
			return true;
		} },
		{ input: "#hysgl_jssj", message: "结束时间要大于开始时间!", action: 'keyup, blur', rule: function(input){
			if ($("#hysgl_jssj").val()<=$("#hysgl_kssj").val())
			{
				return false;
			}
			return true;
		} },
		{ input: "#hysgl_hys", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#hysgl_hys").jqxDropDownList('val');
			if(val==""){return false;}	return true;
		} }
		], hintType: "tooltip"
	}); 	
  	
}

function hysgl_popupwindow(flag_state, id, callback, bsbh)
{
	state = flag_state;
	gkhcallback = callback;
	y = document.body.scrollTop;
	x = (document.body.scrollWidth -600)/2;
	$('#hysgl_Id').val(id);
	
	if (state == 'add')
	{
		hysgl_title.innerHTML='新增';
		hysgl_setupadd();
	}
	if (state == 'modify')
	{
		hysgl_title.innerHTML='修改';
		hysgl_setupmodify();
	}
	if (state == 'detail')
		{
			
			hysgl_title.innerHTML='详情';
			hysgl_setupdetail();
		}
	$('#hysgl_bsbh').val(bsbh);
//	$('#hysgl_popupWindow').jqxWindow({ position: { x: x, y: y }});
	$('#hysgl_popupWindow').jqxWindow('open');
}
