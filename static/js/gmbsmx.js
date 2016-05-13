var olddwmc='';
var state = 'add';
function setupmodify()
{
	$('#tr_rq').show();
	$('#rq').jqxInput({disabled:true});
	$.get('selectone?table=gmbs&id='+$('#id').val(), function(result){
		var data = result[0];
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
		
	}, 'json');	
}
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

function save(state)
{
	if (state == 'add')
		{
		url = 'insertrow?table=gmbs';
		}
	else if (state == 'modify')
		{
		url = 'updaterow?table=gmbs&id='+$('#id').val();
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
	je:$('#je').val()
	};
    $.ajax({
        url:url,
        type:'POST',
        data:row,
        success:function(response,status,xhr){
            alert(response);
            if (response == 'success')
            	{
            	window.location.href='gmbs';
            	}
             
        },
        error:function(xhr,errorText,errorType){
            alert("操作不成功");
        },
    })	
}

$(document).ready(function () {

	$("#gmbs-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    
    $.get('getgmbspz', function(result){
    	$('#bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
    }, 'json');	
    $("#dwmc").jqxInput();
    $('#rq').jqxInput();
    $('#zzszwmc').jqxInput();
    $('#zzsywmc').jqxInput();
    $('#zzsgb').jqxInput();
    $('#lxdz').jqxInput();
    $('#lxr').jqxInput();
    $('#sj').jqxInput();
    $('#dzxx').jqxInput();
    $('#cz').jqxInput();
    $('#je').jqxNumberInput({inputMode: 'simple'});
    $('#tr_rq').hide();

    $("#Save").jqxButton({template:'success'});
    $("#Cancel").jqxButton({template:'warning'});    
    $("#dwmc").blur(function(){getkh($("#dwmc").val())});  
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
});