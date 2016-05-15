
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
	/*
    $.get('getkhpz', function(result){
		//需特殊处理
    	$('#bsbh').jqxDropDownList({ placeHolder: "", source: result['bsbh'], displayMember: "PackageNumber", valueMember: "PackageNumber"});
    }, 'json');	
    $("#dwmc").blur(function(){getkh($("#dwmc").val())});  */
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
	$.get('selectone_kh?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#rq').val(data['rq']);
$('#khyh').val(data['khyh']);
$('#yhzh').val(data['yhzh']);
$('#lxdz').val(data['lxdz']);
$('#dzxx').val(data['dzxx']);
$('#cz').val(data['cz']);
$('#lxr1').val(data['lxr1']);
$('#sj1').val(data['sj1']);
$('#lxr2').val(data['lxr2']);
$('#sj2').val(data['sj2']);
$('#lxr3').val(data['lxr3']);
$('#sj3').val(data['sj3']);
$('#username').val(data['username']);		
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
	$.get('selectone_kh?Id='+$('#Id').val(), function(result){
		var data = result[0];
		$('#Id').val(data['Id']);
$('#dwmc').val(data['dwmc']);
$('#rq').val(data['rq']);
$('#khyh').val(data['khyh']);
$('#yhzh').val(data['yhzh']);
$('#lxdz').val(data['lxdz']);
$('#dzxx').val(data['dzxx']);
$('#cz').val(data['cz']);
$('#lxr1').val(data['lxr1']);
$('#sj1').val(data['sj1']);
$('#lxr2').val(data['lxr2']);
$('#sj2').val(data['sj2']);
$('#lxr3').val(data['lxr3']);
$('#sj3').val(data['sj3']);
$('#username').val(data['username']);			
	}, 'json');	
}


function save(state)
{
	if (state == 'add')
		{
		url = 'insertrow_kh';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_kh?Id='+$('#Id').val();
		}
	var row = {	
	dwmc:$('#dwmc').val(),
khyh:$('#khyh').val(),
yhzh:$('#yhzh').val(),
lxdz:$('#lxdz').val(),
dzxx:$('#dzxx').val(),
cz:$('#cz').val(),
lxr1:$('#lxr1').val(),
sj1:$('#sj1').val(),
lxr2:$('#lxr2').val(),
sj2:$('#sj2').val(),
lxr3:$('#lxr3').val(),
sj3:$('#sj3').val(),
username:$('#username').val(),
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
            	window.location.href='kh';
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

	$("#kh-expander").jqxExpander({ toggleMode: 'none',  showArrow: false });

    // Create a jqxInput
    

    $('#Id').jqxInput();
$('#dwmc').jqxInput();
$('#rq').jqxInput();
$('#khyh').jqxInput();
$('#yhzh').jqxInput();
$('#lxdz').jqxInput();
$('#dzxx').jqxInput();
$('#cz').jqxInput();
$('#lxr1').jqxInput();
$('#sj1').jqxInput();
$('#lxr2').jqxInput();
$('#sj2').jqxInput();
$('#lxr3').jqxInput();
$('#sj3').jqxInput();
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
		window.location.href="kh";
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
