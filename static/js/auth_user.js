
function search()
{

	if ($("#username").val()=='' && $("#chinesename").val()=='')
		{
		url = "select_auth_user";
		}
	else
		{
		url = "select_auth_user?username="+$("#username").val()+"&chinesename="+$("#chinesename").val()
		}


	var source = {					
		datatype : "json",
		datafields : [{name : 'id',type : 'string'	},
{name : 'username',type : 'string'	},
{name : 'chinesename',type : 'string'	},
{name : 'role',type : 'string'	},
{name : 'rq',type : 'date'	}],
		id : 'id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#auth_user-grid").jqxGrid({
		source : dataAdapter
	});	
}

function addselectfieldwindows()
{
	$(document.body).append('<div id="auth_userzd_popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="auth_user_zdlistbox"></div></div></div>');
	$("#auth_userzd_popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'id', checked: true },,
{ label: '用户名', value: 'username', checked: true },,
{ label: '姓名', value: 'chinesename', checked: true },,
{ label: '角色', value: 'role', checked: true },,
{ label: '日期', value: 'rq', checked: false },];
	$('#auth_user_zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#auth_user_zdlistbox").on('checkChange', function (event) {
        $("#auth_user-grid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#auth_user-grid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#auth_user-grid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#auth_user-grid").jqxGrid('endupdate');
    });	
}


function modifyauth_user(id)
{
	auth_user_popupwindow('modify', id, search);

}

function deleteauth_user(id)
{
	if (confirm('是否删除')==false)
	{
		return ;
	}	
    var selectedrowindex = $("#auth_user-grid").jqxGrid('getselectedrowindex');
    var rowscount = $("#auth_user-grid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
        var rowid = $("#auth_user-grid").jqxGrid('getrowid', selectedrowindex);
        
    }

	$.get('deleterow_auth_user?Id='+id, function(result){
		alert(result);
		if (result == 'success') {
			$("#auth_user-grid").jqxGrid('deleterow', rowid);
		}
		
	});
}

function setpasswordauth_user(id)
{
	
	authuser_password_popupwindow(id);

}

function detailauth_user(id)
{
	auth_user_popupwindow('detail', id);
//	window.location.replace ('auth_usermx?oper=modify&Id='+id);
}
function configpopupwindow()
{

	auth_user_init();
}

$(document).ready(function() {
	
					$("#auth_user-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false, 
						height : '100%'
					});
					$("#auth_user-grid")
							.jqxGrid(
									{
										enabletooltips: true,
										columnsresize: true,
										height : "80%",
										width : "98%",
										columns : [{ text: '序号', datafield: 'id', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '用户名', datafield: 'username', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '姓名', datafield: 'chinesename', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '角色', datafield: 'role', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '日期', datafield: 'rq', cellsformat:'yyyy-MM-dd HH:mm:ss', width: '10%',cellsalign: 'center', align: 'center',hidden:true },
												{
													text : '操作',
													width: '200',
													editable : false,
													datafield : 'delete',
													cellsrenderer : function(
															index, datafield,
															value,
															defaultvalue,
															column, rowdata) {
														var a = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="setpasswordauth_user('+rowdata.id+')">设置密码</a>';

														var b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="modifyauth_user('+rowdata.id+')">修改</a>';

														var c = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="deleteauth_user('+rowdata.id+')">删除</a>';
														var d = '<a style="margin-right: 5px;;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="detailauth_user('+rowdata.id+')">详细</a>';
														var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
																+ a+b+c+d + '</div>';
														return d;
													}
												} ],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);
											container.append('<input id="auth_useradd" type="button" value="新增" />');
											$("#auth_useradd").jqxButton({
												template : 'success'
											});
											container.append('<input id="selectfiled" style="float: right" type="button" value="设置" />');
											$("#selectfiled").jqxButton({
												template : 'info'
											});											
										}

									});
					//$("#auth_user-grid").('hidecolumn', 'id');
					search();
					$("#auth_useradd").click(function() {
						auth_user_popupwindow('add', '', search);
						//window.location.replace('auth_usermx');
						//$("#popupWindow").jqxWindow('open');
					});
					$("#selectfiled").click(function() {
						$("#auth_userzd_popupWindow").jqxWindow('open');
					});					
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search();
					});					

					
					addselectfieldwindows();
					configpopupwindow();
					authuser_password_init();
				});
