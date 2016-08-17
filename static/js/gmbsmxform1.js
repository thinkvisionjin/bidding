
function getgmbskh(dwmc)
{
	if (dwmc == olddwmc)
	{
		return;
	}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result){
//			lxr = $('#gmbs_lxr').val();
//			sj = $('#gmbs_sj').val();
//			$('#gmbs_lxr').jqxComboBox({ placeHolder: "", source: result['lxr']});
//			$('#gmbs_sj').jqxComboBox({ placeHolder: "", source: result['sj']});
			$('#gmbs_lxr').jqxComboBox({ placeHolder: "", source: result['lxr'], displayMember:'lxr', valueMember:'sj'});
			$('#gmbs_lxr').jqxComboBox('selectIndex', 0)	
//			$('#gmbs_lxr input').val(lxr);
//			$('#gmbs_sj input').val(sj);
//			$('#gmbs_khyh').val(result['khyh']);
//			$('#gmbs_yhzh').val(result['yhzh']);
		}
		else
		{
//			$('#gmbs_khyh').val('');
//			$('#gmbs_yhzh').val('');
		}			
		/*if (result.length==1) {
			var data = result[0];
			$('#gmbs_lxdz').val(data['lxdz']);
			$('#gmbs_dzxx').val(data['dzxx']);
			$('#gmbs_cz').val(data['cz']);
		}
		else
		{
			$('#gmbs_lxdz').val('');
			$('#gmbs_dzxx').val('');
			$('#gmbs_cz').val('');
		}*/
		
		
	}, 'json');	
	olddwmc = dwmc;
}
function gmbs_configpage(projectid)
{
	if (projectid == undefined)
	{
		url = 'getgmbspz';
	}
	else
	{
		url = 'getgmbspz?projectid='+projectid;
	}
	
	$.get(url, function(result){
		//需特殊处理
		$('#gmbs_dwmc').jqxComboBox({ placeHolder: "", source: result['dwmc']});
		$('#gmbs_bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh']});
		$('#gmbs_bsbh').jqxDropDownList('selectIndex', 0);

	}, 'json');	
	$("#gmbs_dwmc input").blur(function(){getgmbskh($("#gmbs_dwmc").val())});  
	
}
var olddwmc='';
var state = 'add';
function gmbs_setupadd()
{
	$('#gmbs_Id').val('');
	$('#gmbs_dwmc').jqxComboBox('selectIndex',-1);
	$('#gmbs_rq').val('');
	$('#gmbs_zzszwmc').val('');
	$('#gmbs_zzsywmc').val('');
	$('#gmbs_zzsgb').val('');
	$('#gmbs_lxdz').val('');
	$('#gmbs_lxr').val('');
	$('#gmbs_sj').val('');
	$('#gmbs_dzxx').val('');
	$('#gmbs_cz').val('');
	$('#gmbs_je').val('');
	$('#gmbs_bsbh').jqxDropDownList('selectIndex',-1);
	$('#gmbs_username').val('');
	$('#gmbs_ly').val('');;
	$('#tr_gmbs_Id').hide();
	$('#tr_gmbs_rq').hide();
	$('#tr_gmbs_username').hide();
	$('#tr_gmbs_ly').hide();;
			$('#gmbs_Save').show();
	$('#gmbs_Cancel').val('取消');	
	
}
function gmbs_setupdetail()
{
	$('#tr_gmbs_Id').show();
	$('#gmbs_Id').jqxInput({disabled:true});
	$('#tr_gmbs_rq').show();
	$('#gmbs_rq').jqxInput({disabled:true});
	$('#tr_gmbs_username').show();
	$('#gmbs_username').jqxInput({disabled:true});
	$('#tr_gmbs_ly').show();
	$('#gmbs_ly').jqxInput({disabled:true});
	$.get('selectone_gmbs?Id='+$('#gmbs_Id').val(), function(result){
		var data = result[0];
		$('#gmbs_Id').val(data['Id']);
		$('#gmbs_dwmc').val(data['dwmc']);
		$('#gmbs_rq').val(data['rq']);
		$('#gmbs_zzszwmc').val(data['zzszwmc']);
		$('#gmbs_zzsywmc').val(data['zzsywmc']);
		$('#gmbs_zzsgb').val(data['zzsgb']);
		$('#gmbs_lxdz').val(data['lxdz']);
		$('#gmbs_lxr').val(data['lxr']);
		$('#gmbs_sj').val(data['sj']);
		$('#gmbs_dzxx').val(data['dzxx']);
		$('#gmbs_cz').val(data['cz']);
		$('#gmbs_je').val(data['je']);
		$('#gmbs_bsbh').val(data['bsbh']);
		$('#gmbs_username').val(data['username']);
		$('#gmbs_ly').val(data['ly']);		
		
	}, 'json');	
	$('#gmbs_Save').hide();
	$('#gmbs_Cancel').val('关闭');
	
}
function gmbs_setupmodify()
{
	$('#tr_gmbs_Id').show();
	$('#gmbs_Id').jqxInput({disabled:true});
	$('#tr_gmbs_rq').show();
	$('#gmbs_rq').jqxInput({disabled:true});
	$('#tr_gmbs_username').show();
	$('#gmbs_username').jqxInput({disabled:true});
	$('#tr_gmbs_ly').show();
	$('#gmbs_ly').jqxInput({disabled:true});;
	$.get('selectone_gmbs?Id='+$('#gmbs_Id').val(), function(result){
		var data = result[0];
		$('#gmbs_Id').val(data['Id']);
		$('#gmbs_dwmc').val(data['dwmc']);
		$('#gmbs_rq').val(data['rq']);
		$('#gmbs_zzszwmc').val(data['zzszwmc']);
		$('#gmbs_zzsywmc').val(data['zzsywmc']);
		$('#gmbs_zzsgb').val(data['zzsgb']);
		$('#gmbs_lxdz').val(data['lxdz']);
		$('#gmbs_lxr').val(data['lxr']);
		$('#gmbs_sj').val(data['sj']);
		$('#gmbs_dzxx').val(data['dzxx']);
		$('#gmbs_cz').val(data['cz']);
		$('#gmbs_je').val(data['je']);
		$('#gmbs_bsbh').val(data['bsbh']);
		$('#gmbs_username').val(data['username']);
		$('#gmbs_ly').val(data['ly']);		
		getgmbskh($("#gmbs_dwmc").val());
	}, 'json');
		$('#gmbs_Save').show();
	$('#gmbs_Cancel').val('取消');	
}

var ggmbscallbak;
function gmbs_save()
{
	if ($('#gmbs_Id').jqxValidator('validate')==false){return;}
	if (state == 'add')
	{
		url = 'insertrow_gmbs';
	}
	else if (state == 'modify')
	{
		url = 'updaterow_gmbs?Id='+$('#gmbs_Id').val();
	}
	var row = {	
		dwmc:$('#gmbs_dwmc input').val(),
		zzszwmc:$('#gmbs_zzszwmc').val(),
		zzsywmc:$('#gmbs_zzsywmc').val(),
		zzsgb:$('#gmbs_zzsgb').val(),
		lxdz:$('#gmbs_lxdz').val(),
		lxr:$('#gmbs_lxr input').val(),
		sj:$('#gmbs_sj input').val(),
		dzxx:$('#gmbs_dzxx').val(),
		cz:$('#gmbs_cz').val(),
		je:$('#gmbs_je').val(),
		bsbh:$('#gmbs_bsbh').val(),
		username:$('#gmbs_username').val(),
		ly:'现场',
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

			$('#gmbs_popupWindow').jqxWindow('hide');
			ggmbscallbak();
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

String.prototype.Trim = function() { 
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/); 
	return (m == null) ? "" : m[1]; 
} 
String.prototype.isMobile = function() { 
	return (/^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/.test(this.Trim())); 
} 
String.prototype.isTel = function() 
{ 
//"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)" 
//return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(this.Trim())); 
return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{4,8})(-(\d{2,6}))?$/.test(this.Trim())); 
} 

function gmbs_init () {
	$(document.body).append("       <div id='gmbs_popupWindow'>\
		<div>购买标书</div>\
		<div style='overflow: hidden;'><div id='gmbsmx-expander'>\
		<div id='gmbs_title'>新增</div>\
		<div>\
		\
		<table align='center' >\
		<tr id='tr_gmbs_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='gmbs_Id'/></td></tr>\
		<tr id='tr_gmbs_dwmc'><td class='tbinputtitle'>购标书单位名称:</td><td><div class='tbinput' type='text' id='gmbs_dwmc'/></td></tr>\
		<tr id='tr_gmbs_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='gmbs_rq'/></td></tr>\
		<tr id='tr_gmbs_zzszwmc'><td class='tbinputtitle'>制造商单位中文名称:</td><td><input class='tbinput' type='text' id='gmbs_zzszwmc'/></td></tr>\
		<tr id='tr_gmbs_zzsywmc'><td class='tbinputtitle'>制造商单位英文名称:</td><td><input class='tbinput' type='text' id='gmbs_zzsywmc'/></td></tr>\
		<tr id='tr_gmbs_zzsgb'><td class='tbinputtitle'>制造商国别:</td><td><input class='tbinput' type='text' id='gmbs_zzsgb'/></td></tr>\
		<tr id='tr_gmbs_lxdz'><td class='tbinputtitle'>联系地址:</td><td><input class='tbinput' type='text' id='gmbs_lxdz'/></td></tr>\
		<tr id='tr_gmbs_lxr'><td class='tbinputtitle'>联系人:</td><td><div class='tbinput' type='text' id='gmbs_lxr'/></td></tr>\
		<tr id='tr_gmbs_sj'><td class='tbinputtitle'>手机:</td><td><div class='tbinput' type='text' id='gmbs_sj'/></td></tr>\
		<tr id='tr_gmbs_dzxx'><td class='tbinputtitle'>电子信箱:</td><td><input class='tbinput' type='text' id='gmbs_dzxx'/></td></tr>\
		<tr id='tr_gmbs_cz'><td class='tbinputtitle'>传真:</td><td><input class='tbinput' type='text' id='gmbs_cz'/></td></tr>\
		<tr id='tr_gmbs_bsbh'><td class='tbinputtitle'>标书编号:</td><td><div class='tbinput' type='text' id='gmbs_bsbh'/></td></tr>\
		<tr id='tr_gmbs_je'><td class='tbinputtitle'>金额:</td><td><input class='tbinput' type='text' id='gmbs_je'/></td></tr>\
		<tr id='tr_gmbs_username'><td class='tbinputtitle'>操作人:</td><td><input class='tbinput' type='text' id='gmbs_username'/></td></tr>\
		<tr id='tr_gmbs_ly'><td class='tbinputtitle'>来源:</td><td><input class='tbinput' type='text' id='gmbs_ly'/></td></tr>\
		\
		\
		<tr>\
		<td align='right'></td>\
		<td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='gmbs_Save' value='保存' /><input id='gmbs_Cancel' type='button' value='取消' /></td>\
		</tr>\
		</table>\
		</div>");
	$("#gmbs_popupWindow").jqxWindow({
		width: 600,  resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#gmbs_Cancel"), modalOpacity: 0.4           
	});	
	$("#gmbsmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#gmbs_Id').jqxInput();
    $('#gmbs_dwmc').jqxComboBox({ placeHolder: '',autoComplete:true});
    $('#gmbs_rq').jqxInput();
    $('#gmbs_zzszwmc').jqxInput();
    $('#gmbs_zzsywmc').jqxInput();
    $('#gmbs_zzsgb').jqxInput();
    $('#gmbs_lxdz').jqxInput();
    $('#gmbs_lxr').jqxComboBox({ placeHolder: '',autoComplete:true});
    $('#gmbs_sj').jqxComboBox({ placeHolder: '',autoComplete:true});
    $('#gmbs_dzxx').jqxInput();
    $('#gmbs_cz').jqxInput();
    $('#gmbs_je').jqxNumberInput({inputMode: 'simple'});
    $('#gmbs_bsbh').jqxDropDownList({ placeHolder: ''});
    $('#gmbs_username').jqxInput();
    $('#gmbs_ly').jqxInput();
    $('#tr_gmbs_Id').hide();
    $('#tr_gmbs_rq').hide();
    $('#tr_gmbs_username').hide();
    $('#tr_gmbs_ly').hide();

	//
	$("#gmbs_Save").jqxButton({template:'success'});
	$("#gmbs_Cancel").jqxButton({template:'warning'});    

	$("#gmbs_Save").click(function () {
		gmbs_save(state);
	});

	$('#gmbs_lxr').on('change', function (event) 
	{
	    var args = event.args;
	    if (args) {
	    // index represents the item's index.                          
	    var index = args.index;
	    var item = args.item;
	    // get item's label and value.
	    var label = item.label;
	    var value = item.value;
	    var type = args.type; // keyboard, mouse or null depending on how the item was selected.
	    $('#gmbs_sj').val(value);
	}
	}); 	
	$("#gmbs_Id").jqxValidator({scroll: false,
		rules: [
		{ input: "#gmbs_dwmc", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#gmbs_dwmc").jqxComboBox('val');
			if(val==""){return false;}	return true;
		} },
		{ input: "#gmbs_lxr", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#gmbs_lxr").jqxComboBox('val');
			if(val==""){return false;}	return true;
		} },
		{ input: "#gmbs_bsbh", message: "不可为空!", action: 'keyup, blur', rule: function(input){
			var val = $("#gmbs_bsbh").jqxDropDownList('val');
			if(val==""){return false;}	return true;
		} },		
		{ input: "#gmbs_sj", message: "不是有效的电话号码!", action: 'keyup, blur', rule: function(input){
			var val = $("#gmbs_sj").jqxComboBox('val');
			if(val==""){return false;}
			var reg = /[+|-|0-9]{2,30}$/;
			if (reg.test(val)) {return true;}else{return false;}
		} },
		{ input: '#gmbs_dzxx', message: '不是有效的电子邮箱!', action: 'keyup', rule: 'email' }
		], hintType: "tooltip"
	}); 

}
function getInfo() 
{ 
	var s = ""; 
	s += " 网页可见区域宽："+ document.body.clientWidth; 
	s += " 网页可见区域高："+ document.body.clientHeight; 
	s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"; 
	s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"; 
	s += " 网页正文全文宽："+ document.body.scrollWidth; 
	s += " 网页正文全文高："+ document.body.scrollHeight; 
	s += " 网页被卷去的高(ff)："+ document.body.scrollTop; 
	s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop; 
	s += " 网页被卷去的左："+ document.body.scrollLeft; 
	s += " 网页正文部分上："+ window.screenTop; 
	s += " 网页正文部分左："+ window.screenLeft; 
	s += " 屏幕分辨率的高："+ window.screen.height; 
	s += " 屏幕分辨率的宽："+ window.screen.width; 
	s += " 屏幕可用工作区高度："+ window.screen.availHeight; 
	s += " 屏幕可用工作区宽度："+ window.screen.availWidth; 
	s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"; 
	s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"; 
	alert (s); 
} 
function gmbs_popupwindow(flag_state, id, search, projectid, bsbh)
{
	olddwmc = '';
	y = document.body.scrollTop;
	x = (document.body.scrollWidth -600)/2
	$('#gmbs_popupWindow').jqxWindow({ position: { x: x, y: y }});
	state = flag_state;
	gmbs_configpage(projectid);
	$('#gmbs_Id').val(id);
	ggmbscallbak = search;
	
	if (state == 'add')
	{
		$('#gmbs_popupWindow').jqxWindow({ height:480});
		gmbs_title.innerHTML='新增';
		gmbs_setupadd();
	}
	if (state == 'modify')
	{
		$('#gmbs_popupWindow').jqxWindow({ height:600});
		gmbs_title.innerHTML='修改';
		gmbs_setupmodify();
	}
	if (state == 'detail')
	{
		$('#gmbs_popupWindow').jqxWindow({ height:600});

		gmbs_title.innerHTML='详情';
		gmbs_setupdetail();
	}
//	$('#gmbs_bsbh').val(bsbh);	

$('#gmbs_popupWindow').jqxWindow('open');

}
