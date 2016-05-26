
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		$('#gmbs_lxr').jqxComboBox({ placeHolder: "", source: result['lxr']});
		$('#gmbs_sj').jqxComboBox({ placeHolder: "", source: result['sj']});		
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
function gmbs_configpage()
{
	
    $.get('getgmbspz', function(result){
		//需特殊处理
    	$('#gmbs_dwmc').jqxComboBox({ placeHolder: "", source: result['dwmc']});
		$('#gmbs_bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh']});

    }, 'json');	
    $("#gmbs_dwmc input").blur(function(){getkh($("#gmbs_dwmc").val())});  
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
	$('gmbs_Save').hide();
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
	}, 'json');	
}

var ggmbscallbak;
function gmbs_save()
{
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
zzszwmc:$('#gmbs_zzszwmc').val(),
zzsywmc:$('#gmbs_zzsywmc').val(),
zzsgb:$('#gmbs_zzsgb').val(),
lxdz:$('#gmbs_lxdz').val(),
lxr:$('#gmbs_lxr').val(),
sj:$('#gmbs_sj').val(),
dzxx:$('#gmbs_dzxx').val(),
cz:$('#gmbs_cz').val(),
je:$('#gmbs_je').val(),
bsbh:$('#gmbs_bsbh').val(),
username:$('#gmbs_username').val(),
ly:$('#gmbs_ly').val(),
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

	gmbs_configpage();
    $("#gmbs_Save").jqxButton({template:'success'});
    $("#gmbs_Cancel").jqxButton({template:'warning'});    

	$("#gmbs_Save").click(function () {
		gmbs_save(state);
	});
 	
  	
}

function gmbs_popupwindow(flag_state, id, search, bsbh)
{
	state = flag_state;
	$('#gmbs_Id').val(id);
	ggmbscallbak = search;
	
	if (state == 'add')
	{
		gmbs_title.innerHTML='新增';
		gmbs_setupadd();
	}
	if (state == 'modify')
	{
		gmbs_title.innerHTML='修改';
		gmbs_setupmodify();
	}
	if (state == 'detail')
		{
			
			gmbs_title.innerHTML='详情';
			gmbs_setupdetail();
		}
	$('#gmbs_bsbh').val(bsbh);	
	$('#gmbs_popupWindow').jqxWindow('open');
	
}
