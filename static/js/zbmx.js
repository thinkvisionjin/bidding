
/*function getkh(dwmc)
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
}*/
function configpage()
{
	
    $.get('getzbpz', function(result){
		//需特殊处理
    	$('#bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
$('#zbdw1').jqxInput({source:result['dwmc']})
$('#zbdw2').jqxInput({source:result['dwmc']})
$('#zbdw3').jqxInput({source:result['dwmc']})
    }, 'json');	
    $("#dwmc").blur(function(){getkh($("#dwmc").val())});  
}
var olddwmc='';
var state = 'add';
function setupdetail()
{
	$('#tr_Id').show();
$('#Id').jqxInput({disabled:true});
$('#tr_username').show();
$('#username').jqxInput({disabled:true});
$('#tr_rq').show();
$('#rq').jqxInput({disabled:true});
	$.get('selectone_zb?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#bsbh').val(data['bsbh']);
$('#zbdw1').val(data['zbdw1']);
$('#zbdw2').val(data['zbdw2']);
$('#zbdw3').val(data['zbdw3']);
$('#username').val(data['username']);
$('#rq').val(data['rq']);		
	}, 'json');	
	$('#Save').hide();
	$('#Cancel').val('关闭');
	
}
function setupmodify()
{
	$('#tr_Id').show();
$('#Id').jqxInput({disabled:true});
$('#tr_username').show();
$('#username').jqxInput({disabled:true});
$('#tr_rq').show();
$('#rq').jqxInput({disabled:true});;
	$.get('selectone_zb?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#bsbh').val(data['bsbh']);
$('#zbdw1').val(data['zbdw1']);
$('#zbdw2').val(data['zbdw2']);
$('#zbdw3').val(data['zbdw3']);
$('#username').val(data['username']);
$('#rq').val(data['rq']);			
	}, 'json');	
}


function save(state)
{
	if (state == 'add')
		{
		url = 'insertrow_zb';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_zb?Id='+$('#Id').val();
		}
	var row = {	
	bsbh:$('#bsbh').val(),
zbdw1:$('#zbdw1').val(),
zbdw2:$('#zbdw2').val(),
zbdw3:$('#zbdw3').val(),
username:$('#username').val(),
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
            	window.location.href='zb';
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

	$("#zb-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#Id').jqxInput();
$('#bsbh').jqxDropDownList({ placeHolder: ''});
$('#zbdw1').jqxInput();
$('#zbdw2').jqxInput();
$('#zbdw3').jqxInput();
$('#username').jqxInput();
$('#rq').jqxInput();
	$('#tr_Id').hide();
$('#tr_username').hide();
$('#tr_rq').hide();

	configpage();
    $("#Save").jqxButton({template:'success'});
    $("#Cancel").jqxButton({template:'warning'});    

	$("#Save").click(function () {
		save(state);
	});
	$("#Cancel").click(function () {
		window.location.href="zb";
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
});
