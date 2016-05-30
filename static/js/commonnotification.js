function common_notification_init() {
	$(document.body).append("    <div id='successNotification'>\
        <div id='successcontext'>Your answer is success.</div>\
    </div>\
    <div id='failNotification'>\
        <div id='failcontext'>Your answer is insuccess.</div>\
    </div>");    
    $("#successNotification").jqxNotification({ position: "center", autoOpen: false, closeOnClick: true, autoClose: true, template: "success" });
    $("#failNotification").jqxNotification({ position: "center", autoOpen: false, closeOnClick: true, autoClose: true, template: "error" });
}

function success_notification(content)
{
    $('#successcontext').text(content);
    $("#successNotification").jqxNotification('open');
}

function fail_notification(content)
{
    $('#failcontext').text(content);
    $("#failNotification").jqxNotification('open');
}