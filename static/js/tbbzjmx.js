
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
	
    $.get('gettbbzjpz', function(result){
		//需特殊处理
    	$('#dwmc').jqxInput({source:result['dwmc']});
    	$('#bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
    	$('#bzjlx').jqxDropDownList({ placeHolder: "", source: result['bzjlx']});
    }, 'json');	

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
	$.get('selectone_tbbzj?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#bsbh').val(data['bsbh']);
$('#bzjlx').val(data['bzjlx']);
$('#je').val(data['je']);
$('#rq').val(data['rq']);
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
$('#username').jqxInput({disabled:true});;
	$.get('selectone_tbbzj?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#bsbh').val(data['bsbh']);
$('#bzjlx').val(data['bzjlx']);
$('#je').val(data['je']);
$('#rq').val(data['rq']);
$('#username').val(data['username']);			
	}, 'json');	
}


function save(state)
{
	if (state == 'add')
		{
		url = 'insertrow_tbbzj';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_tbbzj?Id='+$('#Id').val();
		}
	var row = {	
	dwmc:$('#dwmc').val(),
bsbh:$('#bsbh').val(),
bzjlx:$('#bzjlx').val(),
je:$('#je').val(),
username:$('#username').val(),
ly:'现场',
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
            	window.location.href='tbbzj';
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

	$("#tbbzj-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#Id').jqxInput();
$('#dwmc').jqxInput();
$('#bsbh').jqxDropDownList({ placeHolder: ''});
$('#bzjlx').jqxDropDownList({ placeHolder: ''});
$('#je').jqxNumberInput({inputMode: 'simple'});
$('#rq').jqxInput();
$('#username').jqxInput();
	$('#tr_Id').hide();
$('#tr_rq').hide();
$('#tr_username').hide();

	configpage();
    $("#Save").jqxButton({template:'success'});
    $("#Cancel").jqxButton({template:'warning'});    

	$("#Save").click(function () {
		save(state);
	});
	$("#Cancel").click(function () {
		window.location.href="tbbzj";
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
