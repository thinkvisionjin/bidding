
function getkh(dwmc)
{
	if (dwmc == olddwmc)
		{
		return;
		}
	$.get('getkh?dwmc='+dwmc, function(result){
		var data = result[0];
		$('#khyh').val(data['lxdz']);
		$('#yhzh').val(data['dzxx']);
		olddwmc = dwmc;
		
	}, 'json');	
}
function configpage()
{
	
    $.get('gettbzjpz', function(result){
		//需特殊处理
    	$('#dwmc').jqxInput({source:result['dwmc']});
    	$('#bsbh1').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
    	$('#bsbh2').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
    	$('#bsbh3').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
    	$('#fkfs').jqxDropDownList({ placeHolder: "", source: result['fkfs']});   	
    }, 'json');	
    $("#dwmc").blur(function(){getkh($("#dwmc").val())});  
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
	$.get('selectone_tbzj?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#rq').val(data['rq']);
$('#bsbh1').val(data['bsbh1']);
$('#bsbh2').val(data['bsbh2']);
$('#bsbh3').val(data['bsbh3']);
$('#username').val(data['username']);
$('#ly').val(data['ly']);
$('#khyh').val(data['khyh']);
$('#yhzh').val(data['yhzh']);
$('#fkfs').val(data['fkfs']);
$('#je').val(data['je']);		
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
	$.get('selectone_tbzj?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#rq').val(data['rq']);
$('#bsbh1').val(data['bsbh1']);
$('#bsbh2').val(data['bsbh2']);
$('#bsbh3').val(data['bsbh3']);
$('#username').val(data['username']);
$('#ly').val(data['ly']);
$('#khyh').val(data['khyh']);
$('#yhzh').val(data['yhzh']);
$('#fkfs').val(data['fkfs']);
$('#je').val(data['je']);			
	}, 'json');	
}


function save(state)
{
	if (state == 'add')
		{
		url = 'insertrow_tbzj';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_tbzj?Id='+$('#Id').val();
		}
	var row = {	
	dwmc:$('#dwmc').val(),
bsbh1:$('#bsbh1').val(),
bsbh2:$('#bsbh2').val(),
bsbh3:$('#bsbh3').val(),
username:$('#username').val(),
ly:$('#ly').val(),
khyh:$('#khyh').val(),
yhzh:$('#yhzh').val(),
fkfs:$('#fkfs').val(),
je:$('#je').val(),
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
            	window.location.href='tbzj';
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

	$("#tbzj-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#Id').jqxInput();
$('#dwmc').jqxInput();
$('#rq').jqxInput();
$('#bsbh1').jqxDropDownList({ placeHolder: ''});
$('#bsbh2').jqxDropDownList({ placeHolder: ''});
$('#bsbh3').jqxDropDownList({ placeHolder: ''});
$('#username').jqxInput();
$('#ly').jqxInput();
$('#khyh').jqxInput();
$('#yhzh').jqxInput();
$('#fkfs').jqxDropDownList({ placeHolder: ''});
$('#je').jqxNumberInput({inputMode: 'simple'});
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
		window.location.href="tbzj";
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
