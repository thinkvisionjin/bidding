

var glxrxx;
function getgmbskh(dwmc)
{
	if (dwmc == olddwmc)
	{
		return;
	}
	$.get('getkh?dwmc='+dwmc, function(result){
		if (result){
			glxrxx = result['lxr'];
			var tlxr=new Array();;
			for(var i=0;i<glxrxx.length;i++)
			{
				tlxr.push(glxrxx[i]['lxr'])
			}
			$('#gmbs_lxr').jqxComboBox({ placeHolder: '', source: tlxr});
//			$('#gmbs_lxr input').val(lxr);
//			$('#gmbs_sj input').val(sj);
			$('#gmbs_nsrsbh').val(result['khxx'][0]['nsrsbh']);
			$('#gmbs_lxdz').val(result['khxx'][0]['lxdz']);
			$('#gmbs_dh').val(result['khxx'][0]['dh']);
			$('#gmbs_khyh').val(result['khxx'][0]['khyh']);
			$('#gmbs_yhzh').val(result['khxx'][0]['yhzh']);
			$('#gmbs_dzxx').val(result['khxx'][0]['dzxx']);
			$('#gmbs_cz').val(result['khxx'][0]['cz']);

		}
		else
		{

		}			
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
		$('#gmbs_dwmc').jqxComboBox({ placeHolder: '', source: result['dwmc']});
		$('#gmbs_bsbh').jqxDropDownList({ placeHolder: '', source: result['bsbh']});
		$('#gmbs_bsbh').jqxDropDownList('selectIndex', 0);

	}, 'json');	
	$('#gmbs_dwmc input').blur(function(){getgmbskh($('#gmbs_dwmc').val())});  
	
}
var olddwmc='';
var state = 'add';


function gmbs_setupadd()
{
	$('#gmbs_Id').val('');
$('#gmbs_dwmc').jqxComboBox('selectIndex',-1);
$('#gmbs_nsrsbh').val('');
$('#gmbs_lxdz').val('');
$('#gmbs_dh').val('');
$('#gmbs_khyh').val('');
$('#gmbs_yhzh').val('');
$('#gmbs_zzsdwmc').val('');
$('#gmbs_lxr').jqxComboBox('selectIndex',-1);
$('#gmbs_sj').val('');
$('#gmbs_lxrdh').val('');
$('#gmbs_lxrdz').val('');
$('#gmbs_dzxx').val('');
$('#gmbs_cz').val('');
$('#gmbs_bsbh').jqxDropDownList('selectIndex',-1);
$('#gmbs_je').val('');
$('#gmbs_rq').val('');
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
//	$('#tr_gmbs_Id').show();
$('#gmbs_Id').jqxInput({disabled:true});
//$('#tr_gmbs_rq').show();
$('#gmbs_rq').jqxInput({disabled:true});
$('#tr_gmbs_username').show();
$('#gmbs_username').jqxInput({disabled:true});
//$('#tr_gmbs_ly').show();
$('#gmbs_ly').jqxInput({disabled:true});
	$.get('selectone_gmbs?Id='+$('#gmbs_Id').val(), function(result){
		var data = result[0];
		$('#gmbs_Id').val(data['Id']);
$('#gmbs_dwmc').val(data['dwmc']);
$('#gmbs_nsrsbh').val(data['nsrsbh']);
$('#gmbs_lxdz').val(data['lxdz']);
$('#gmbs_dh').val(data['dh']);
$('#gmbs_khyh').val(data['khyh']);
$('#gmbs_yhzh').val(data['yhzh']);
$('#gmbs_zzsdwmc').val(data['zzsdwmc']);
$('#gmbs_lxr').val(data['lxr']);
$('#gmbs_sj').val(data['sj']);
$('#gmbs_lxrdh').val(data['lxrdh']);
$('#gmbs_lxrdz').val(data['lxrdz']);
$('#gmbs_dzxx').val(data['dzxx']);
$('#gmbs_cz').val(data['cz']);
$('#gmbs_bsbh').val(data['bsbh']);
$('#gmbs_je').val(data['je']);
$('#gmbs_rq').val(data['rq']);
$('#gmbs_username').val(data['username']);
$('#gmbs_ly').val(data['ly']);		
	}, 'json');	
	$('#gmbs_Save').hide();
	$('#gmbs_Cancel').val('关闭');
	
}
function gmbs_setupmodify()
{
//	$('#tr_gmbs_Id').show();
$('#gmbs_Id').jqxInput({disabled:true});
//$('#tr_gmbs_rq').show();
$('#gmbs_rq').jqxInput({disabled:true});
$('#tr_gmbs_username').show();
$('#gmbs_username').jqxInput({disabled:true});
//$('#tr_gmbs_ly').show();
$('#gmbs_ly').jqxInput({disabled:true});;
	$.get('selectone_gmbs?Id='+$('#gmbs_Id').val(), function(result){
		var data = result[0];
		$('#gmbs_Id').val(data['Id']);
$('#gmbs_dwmc').val(data['dwmc']);
$('#gmbs_nsrsbh').val(data['nsrsbh']);
$('#gmbs_lxdz').val(data['lxdz']);
$('#gmbs_dh').val(data['dh']);
$('#gmbs_khyh').val(data['khyh']);
$('#gmbs_yhzh').val(data['yhzh']);
$('#gmbs_zzsdwmc').val(data['zzsdwmc']);
$('#gmbs_lxr').val(data['lxr']);
$('#gmbs_sj').val(data['sj']);
$('#gmbs_lxrdh').val(data['lxrdh']);
$('#gmbs_lxrdz').val(data['lxrdz']);
$('#gmbs_dzxx').val(data['dzxx']);
$('#gmbs_cz').val(data['cz']);
$('#gmbs_bsbh').val(data['bsbh']);
$('#gmbs_je').val(data['je']);
$('#gmbs_rq').val(data['rq']);
$('#gmbs_username').val(data['username']);
$('#gmbs_ly').val(data['ly']);			
	}, 'json');	
	$('#gmbs_Save').show();
	$('#gmbs_Cancel').val('取消');		
}

var ggmbscallback;
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
	dwmc:$('#gmbs_dwmc').val(),
nsrsbh:$('#gmbs_nsrsbh').val(),
lxdz:$('#gmbs_lxdz').val(),
dh:$('#gmbs_dh').val(),
khyh:$('#gmbs_khyh').val(),
yhzh:$('#gmbs_yhzh').val(),
zzsdwmc:$('#gmbs_zzsdwmc').val(),
lxr:$('#gmbs_lxr').val(),
sj:$('#gmbs_sj').val(),
lxrdh:$('#gmbs_lxrdh').val(),
lxrdz:$('#gmbs_lxrdz').val(),
dzxx:$('#gmbs_dzxx').val(),
cz:$('#gmbs_cz').val(),
bsbh:$('#gmbs_bsbh').val(),
je:$('#gmbs_je').val(),
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
				ggmbscallback();
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
<tr id='tr_gmbs_nsrsbh'><td class='tbinputtitle'>纳税人识别号:</td><td><input class='tbinput' type='text' id='gmbs_nsrsbh'/></td></tr>\
<tr id='tr_gmbs_lxdz'><td class='tbinputtitle'>联系地址:</td><td><input class='tbinput' type='text' id='gmbs_lxdz'/></td></tr>\
<tr id='tr_gmbs_dh'><td class='tbinputtitle'>电话:</td><td><input class='tbinput' type='text' id='gmbs_dh'/></td></tr>\
<tr id='tr_gmbs_khyh'><td class='tbinputtitle'>开户银行:</td><td><input class='tbinput' type='text' id='gmbs_khyh'/></td></tr>\
<tr id='tr_gmbs_yhzh'><td class='tbinputtitle'>银行账号:</td><td><input class='tbinput' type='text' id='gmbs_yhzh'/></td></tr>\
<tr id='tr_gmbs_zzsdwmc'><td class='tbinputtitle'>制造商单位名称:</td><td><input class='tbinput' type='text' id='gmbs_zzsdwmc'/></td></tr>\
<tr id='tr_gmbs_lxr'><td class='tbinputtitle'>联系人:</td><td><div class='tbinput' type='text' id='gmbs_lxr'/></td></tr>\
<tr id='tr_gmbs_sj'><td class='tbinputtitle'>手机:</td><td><input class='tbinput' type='text' id='gmbs_sj'/></td></tr>\
<tr id='tr_gmbs_lxrdh'><td class='tbinputtitle'>联系人电话:</td><td><input class='tbinput' type='text' id='gmbs_lxrdh'/></td></tr>\
<tr id='tr_gmbs_lxrdz'><td class='tbinputtitle'>联系地址:</td><td><input class='tbinput' type='text' id='gmbs_lxrdz'/></td></tr>\
<tr id='tr_gmbs_dzxx'><td class='tbinputtitle'>电子信箱:</td><td><input class='tbinput' type='text' id='gmbs_dzxx'/></td></tr>\
<tr id='tr_gmbs_cz'><td class='tbinputtitle'>传真:</td><td><input class='tbinput' type='text' id='gmbs_cz'/></td></tr>\
<tr id='tr_gmbs_bsbh'><td class='tbinputtitle'>标书编号:</td><td><div class='tbinput' type='text' id='gmbs_bsbh'/></td></tr>\
<tr id='tr_gmbs_je'><td class='tbinputtitle'>金额:</td><td><input class='tbinput' type='text' id='gmbs_je'/></td></tr>\
<tr id='tr_gmbs_rq'><td class='tbinputtitle'>日期:</td><td><input class='tbinput' type='text' id='gmbs_rq'/></td></tr>\
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
		width: 600, resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#gmbs_Cancel"), modalOpacity: 0.4           
	});	
	$("#gmbsmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#gmbs_Id').jqxInput();
$('#gmbs_dwmc').jqxComboBox({ placeHolder: ''});
$('#gmbs_nsrsbh').jqxInput();
$('#gmbs_lxdz').jqxInput();
$('#gmbs_dh').jqxInput();
$('#gmbs_khyh').jqxInput();
$('#gmbs_yhzh').jqxInput();
$('#gmbs_zzsdwmc').jqxInput();
$('#gmbs_lxr').jqxComboBox({ placeHolder: ''});
$('#gmbs_sj').jqxInput();
$('#gmbs_lxrdh').jqxInput();
$('#gmbs_lxrdz').jqxInput();
$('#gmbs_dzxx').jqxInput();
$('#gmbs_cz').jqxInput();
$('#gmbs_bsbh').jqxDropDownList({ placeHolder: '',  filterable: true, filterPlaceHolder:''});
$('#gmbs_je').jqxNumberInput({inputMode: 'simple'});
$('#gmbs_rq').jqxInput();
$('#gmbs_username').jqxInput();
$('#gmbs_ly').jqxInput();
	$('#tr_gmbs_Id').hide();
$('#tr_gmbs_rq').hide();
$('#tr_gmbs_username').hide();
$('#tr_gmbs_ly').hide();

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

	    var type = args.type; // keyboard, mouse or null depending on how the item was selected.
	    lxr = $('#gmbs_lxr input').val()
		for(var i=0;i<glxrxx.length;i++)
		{
			if (glxrxx[i]['lxr'] == lxr)
			{
				$('#gmbs_sj').val(glxrxx[i]['sj']);
				$('#gmbs_lxrdh').val(glxrxx[i]['lxrdh']);
				$('#gmbs_lxrdz').val(glxrxx[i]['lxrdz']);
			}
		}	
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
			var val = $("#gmbs_sj").jqxInput('val');
			if(val==""){return false;}
			var reg = /[+|-|0-9]{2,30}$/;
			if (reg.test(val)) {return true;}else{return false;}
		} },
		{ input: '#gmbs_dzxx', message: '不是有效的电子邮箱!', action: 'keyup', rule: 'email' }
		], hintType: "tooltip"
	}); 
 	
  	
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
	ggmbscallback = search;
	if (state == 'add')
	{
		$('#gmbs_popupWindow').jqxWindow({ height:580});
		gmbs_title.innerHTML='新增';
		gmbs_setupadd();
	}
	if (state == 'modify')
	{
		$('#gmbs_popupWindow').jqxWindow({ height:800});
		gmbs_title.innerHTML='修改';
		gmbs_setupmodify();
	}
	if (state == 'detail')
	{
		$('#gmbs_popupWindow').jqxWindow({ height:800});

		gmbs_title.innerHTML='详情';
		gmbs_setupdetail();
	}
//	$('#gmbs_bsbh').val(bsbh);	

	$('#gmbs_popupWindow').jqxWindow('open');
}
