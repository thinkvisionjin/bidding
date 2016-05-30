function authuser_password_save() {
    if ($('#authuser_confirm_password').jqxValidator('validate')==false){return;}
    url = 'updaterow_password_auth_user?Id=' + $('#authuser_password_Id').val();
    var row = {
        password: $('#authuser_password').val()
    };
    $.ajax({
        url: url,
        type: 'POST',
        data: row,
        success: function (response, status, xhr) {

            if (response == 'success') {
                alert('成功');
                $('#authusersetpassword_popupWindow').jqxWindow('hide');
            }
            else {
                alert(response);
            }

        },
        error: function (xhr, errorText, errorType) {
            alert("操作不成功");
        },
    })
}


function authuser_password_init() {
    $(document.body).append("       <div id='authusersetpassword_popupWindow'>\
            <div>初始密码设置</div>\
            <div style='overflow: hidden;'><div id='authusermxsetpassword-expander'>\
		<div id='authuser_title'></div>\
		<div id = 'authpassword_div'>\
		\
			<table align='center' id='table_password'>\
			<tr id='tr_authuser_password_Id' style='display:none'><td class='tbinputtitle'>序号:</td><td><input class='tbinput' type='text' id='authuser_password_Id'/></td></tr>\
<tr id='tr_authuser_password'><td class='tbinputtitle'>密码:</td><td><input class='tbinput' type='password' id='authuser_password'/></td></tr>\
<tr id='tr_authuser_confirm_password'><td class='tbinputtitle'>密码确认:</td><td><input class='tbinput' type='password' id='authuser_confirm_password'/></td></tr>\
\
\
                    <tr>\
                        <td align='right'></td>\
                        <td style='padding-top: 10px;' align='right'><input style='margin-right: 5px;' type='button' id='authuser_password_Save' value='保存' /><input id='authuser_password_Cancel' type='button' value='取消' /></td>\
                    </tr>\
                </table>\
		</div></div></div>");
    $("#authusersetpassword_popupWindow").jqxWindow({
        width: 600, height: 200, resizable: true, isModal: true, autoOpen: false, cancelButton: $("#authuser_password_Cancel"), modalOpacity: 0.4
    });
    $("#authusermxsetpassword-expander").jqxExpander({ toggleMode: 'none', showArrow: false });

    // Create a jqxInput


    $('#authuser_password_Id').jqxInput();

    $('#authuser_password').jqxPasswordInput({ placeHolder: "输入密码:" });
    $('#authuser_confirm_password').jqxPasswordInput({ placeHolder: "输入密码:" });


    $("#authuser_password_Save").jqxButton({ template: 'success' });
    $("#authuser_password_Cancel").jqxButton({ template: 'warning' });

    $("#authuser_password_Save").click(function () {
        authuser_password_save();
    });

    $("#authuser_confirm_password").jqxValidator({
        rules: [
            { input: "#authuser_password", message: "不可为空!", action: 'keyup, blur', rule: 'required' },
            { input: "#authuser_confirm_password", message: "不可为空!", action: 'keyup, blur', rule: 'required' },
            {
                input: "#authuser_confirm_password", message: "密码不一致!", action: 'keyup, blur', rule: function (input, commit) {
                    var firstPassword = $("#authuser_password").jqxPasswordInput('val');
                    var secondPassword = $("#authuser_confirm_password").jqxPasswordInput('val');
                    return firstPassword == secondPassword;
                }
            }
        ], hintType: "tooltip"
    });
}

function authuser_password_popupwindow(id) {

    $('#authuser_password_Id').val(id);
    $('#authuser_password').val('');
    $('#authuser_confirm_password').val('');
    $('#authusersetpassword_popupWindow').jqxWindow('open');
}