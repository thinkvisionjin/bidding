
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		var data = result[0];
		$('#lxdz').val(data['lxdz']);
		$('#dzxx').val(data['dzxx']);
		$('#cz').val(data['cz']);
		if (data['lxr1']!='')
		{
			$('#lxr').val(data['lxr1']);
			$('#sj').val(data['sj1']);
		}
		else if (data['lxr2']!='')
		{
			$('#lxr').val(data['lxr2']);
			$('#sj').val(data['sj2']);			
		}
		else
		{
			$('#lxr').val(data['lxr3']);
			$('#sj').val(data['sj3']);				
		}
		olddwmc = dwmc;
		
	}, 'json');	
}
function configpage()
{
    $.get('getgmbspz', function(result){
		//需特殊处理
    	$('#dwmc').jqxInput({source:result['dwmc']})
    	$('#bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
    	$('#bsbh').val($('#bsbh')[0].getAttribute('value'));
    }, 'json');	
    $("#dwmc").blur(function(){getkh($("#dwmc").val())}); 
	getkh($("#dwmc").val()) 
}
var olddwmc='';
var state = 'add';
function setupdetail()
{
	$('#tr_Id').show();
$('#Id').jqxInput({disabled:true});
$('#tr_rq').show();
$('#rq').jqxInput({disabled:true});
$('#tr_username').show();
$('#username').jqxInput({disabled:true});
$('#tr_ly').show();
$('#ly').jqxInput({disabled:true});
	$.get('selectone_gmbs?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#rq').val(data['rq']);
$('#zzszwmc').val(data['zzszwmc']);
$('#zzsywmc').val(data['zzsywmc']);
$('#zzsgb').val(data['zzsgb']);
$('#lxdz').val(data['lxdz']);
$('#lxr').val(data['lxr']);
$('#sj').val(data['sj']);
$('#dzxx').val(data['dzxx']);
$('#cz').val(data['cz']);
$('#bsbh').val(data['bsbh']);
$('#je').val(data['je']);
$('#username').val(data['username']);
$('#ly').val(data['ly']);		
	}, 'json');	
	$('#Save').hide();
	$('#Cancel').val('关闭');
	
}
function setupmodify()
{
	$('#tr_Id').show();
$('#Id').jqxInput({disabled:true});
$('#tr_rq').show();
$('#rq').jqxInput({disabled:true});
$('#tr_username').show();
$('#username').jqxInput({disabled:true});
$('#tr_ly').show();
$('#ly').jqxInput({disabled:true});;
	$.get('selectone_gmbs?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#rq').val(data['rq']);
$('#zzszwmc').val(data['zzszwmc']);
$('#zzsywmc').val(data['zzsywmc']);
$('#zzsgb').val(data['zzsgb']);
$('#lxdz').val(data['lxdz']);
$('#lxr').val(data['lxr']);
$('#sj').val(data['sj']);
$('#dzxx').val(data['dzxx']);
$('#cz').val(data['cz']);
$('#bsbh').val(data['bsbh']);
$('#je').val(data['je']);
$('#username').val(data['username']);
$('#ly').val(data['ly']);			
	}, 'json');	
}


function save(state)
{
	if (state == 'add')
		{
		url = 'insertrow_gmbs';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_gmbs?Id='+$('#Id').val();
		}
	var row = {	
	dwmc:$('#dwmc').val(),
zzszwmc:$('#zzszwmc').val(),
zzsywmc:$('#zzsywmc').val(),
zzsgb:$('#zzsgb').val(),
lxdz:$('#lxdz').val(),
lxr:$('#lxr').val(),
sj:$('#sj').val(),
dzxx:$('#dzxx').val(),
cz:$('#cz').val(),
bsbh:$('#bsbh').val(),
je:$('#je').val(),
username:$('#username').val(),
ly:$('#ly').val(),
	//////////////需特殊处理//////
	};
    $.ajax({
        url:url,
        type:'POST',
        data:row,
        success:function(response,status,xhr){
            
            if (response == 'success')
            	{
				alert('成功');
            	window.location.href='gmbs';
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

$(document).ready(function () {

	$("#gmbsmx-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#Id').jqxInput();
$('#dwmc').jqxInput();
$('#rq').jqxInput();
$('#zzszwmc').jqxInput();
$('#zzsywmc').jqxInput();
$('#zzsgb').jqxInput();
$('#lxdz').jqxInput();
$('#lxr').jqxInput();
$('#sj').jqxInput();
$('#dzxx').jqxInput();
$('#cz').jqxInput();
//$('#bsbh').jqxDropDownList({ placeHolder: ''});
$('#je').jqxNumberInput({inputMode: 'simple'});
$('#username').jqxInput();
$('#ly').jqxInput();
	$('#tr_Id').hide();
$('#tr_rq').hide();
$('#tr_username').hide();
$('#tr_ly').hide();

	configpage();
    $("#Save").jqxButton({template:'success'});
    $("#Cancel").jqxButton({template:'warning'});    

	$("#Save").click(function () {
		save(state);
	});
	$("#Cancel").click(function () {
		window.location.href="gmbs";
	}); 	
	if (title.innerHTML=='修改')
	{
		state = 'modify';
		setupmodify();
	} 
	if (title.innerHTML=='详细')
	{
		state = 'detail';
		setupdetail();
	}  	
	if (title.innerHTML=='新增-购买标书')
		{
		state = 'add';
		
		}
});
