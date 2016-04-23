$(document).ready(function () {
            // prepare the data
            var datafields_content =  
//********DATAFIELDS START******************//
[{"name":"Id","type":"string"},{"name":"ProtocolId","type":"string"},{"name":"ProjectNumber","type":"string"},{"name":"EmployeeId","type":"string"},{"name":"ProjectTypeId","type":"string"},{"name":"CreationTime","type":"string"},{"name":"Option1","type":"string"},{"name":"Option2","type":"string"},{"name":"Option3","type":"string"},{"name":"IsDelete","type":"string"}]
//********DATAFIELDS END******************//
            var data_url = "/bidding/default/select?table=ProjectCode"
            var source =
            {
                url: data_url,
                datatype: "json",
                datafields:datafields_content,
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                $.post("/bidding/default/update?table=ProjectCode",rowdata,function(result){
                		 alert("操作成功！");
                	 });
                    commit(true);
                },
                deleterow: function (rowid, commit) {
                    // synchronize with the server - send delete command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                	var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
                	$.post("/bidding/default/delete?table=ProjectCode",dataRecord,function(result){
               		 alert("操作成功！");
               	 });
                    commit(true);
                },
                addrow: function (rowid, rowdata, position, commit) {
                    // synchronize with the server - send insert command
                    // call commit with parameter true if the synchronization with the server was successful. 
                    // and with parameter false if the synchronization has failed.
                    // you can pass additional argument to the commit callback which represents the new ID if it is generated from a Database. Example: commit(true, idInDB) where "idInDB" is the row's ID in the Database.
                    commit(true);
                },
            };
            // initialize the input fields.
//********INIT_INPUT_FIELDS START******************//
$("#ProtocolId_SEARCH").addClass('jqx-input')
$("#ProtocolId_SEARCH").width(150)
$("#ProtocolId_SEARCH").height(23)
$("#ProjectNumber_SEARCH").addClass('jqx-input')
$("#ProjectNumber_SEARCH").width(150)
$("#ProjectNumber_SEARCH").height(23)
$("#EmployeeId_SEARCH").addClass('jqx-input')
$("#EmployeeId_SEARCH").width(150)
$("#EmployeeId_SEARCH").height(23)
$("#ProjectTypeId_SEARCH").addClass('jqx-input')
$("#ProjectTypeId_SEARCH").width(150)
$("#ProjectTypeId_SEARCH").height(23)
$("#CreationTime_SEARCH").addClass('jqx-input')
$("#CreationTime_SEARCH").width(150)
$("#CreationTime_SEARCH").height(23)
$("#Option1_SEARCH").addClass('jqx-input')
$("#Option1_SEARCH").width(150)
$("#Option1_SEARCH").height(23)
$("#Option2_SEARCH").addClass('jqx-input')
$("#Option2_SEARCH").width(150)
$("#Option2_SEARCH").height(23)
$("#Option3_SEARCH").addClass('jqx-input')
$("#Option3_SEARCH").width(150)
$("#Option3_SEARCH").height(23)
$("#IsDelete_SEARCH").addClass('jqx-input')
$("#IsDelete_SEARCH").width(150)
$("#IsDelete_SEARCH").height(23)
$("#ProtocolId_EDIT").addClass('jqx-input')
$("#ProtocolId_EDIT").width(150)
$("#ProtocolId_EDIT").height(23)
$("#ProjectNumber_EDIT").addClass('jqx-input')
$("#ProjectNumber_EDIT").width(150)
$("#ProjectNumber_EDIT").height(23)
$("#EmployeeId_EDIT").addClass('jqx-input')
$("#EmployeeId_EDIT").width(150)
$("#EmployeeId_EDIT").height(23)
$("#ProjectTypeId_EDIT").addClass('jqx-input')
$("#ProjectTypeId_EDIT").width(150)
$("#ProjectTypeId_EDIT").height(23)
$("#CreationTime_EDIT").addClass('jqx-input')
$("#CreationTime_EDIT").width(150)
$("#CreationTime_EDIT").height(23)
$("#Option1_EDIT").addClass('jqx-input')
$("#Option1_EDIT").width(150)
$("#Option1_EDIT").height(23)
$("#Option2_EDIT").addClass('jqx-input')
$("#Option2_EDIT").width(150)
$("#Option2_EDIT").height(23)
$("#Option3_EDIT").addClass('jqx-input')
$("#Option3_EDIT").width(150)
$("#Option3_EDIT").height(23)
$("#IsDelete_EDIT").addClass('jqx-input')
$("#IsDelete_EDIT").width(150)
$("#IsDelete_EDIT").height(23)

$("#ProjectNumber_ADD").addClass('jqx-input')
$("#ProjectNumber_ADD").width(150)
$("#ProjectNumber_ADD").height(23)

var protocolNumbersource = {
		datatype: "json",
        datafields: [
            { name: 'Id' },
            { name: 'ProtocolNumber' },
        ],
        url: "/bidding/default/select?table=ProtocolCode",
        async: true
}
var protocolNumberdataAdapter = new $.jqx.dataAdapter(protocolNumbersource);
$("#ProtocolNumber_ADD").jqxDropDownList(
		{ source: protocolNumberdataAdapter, 
			displayMember: "ProtocolNumber", 
			valueMember: "Id",
			selectedIndex: 0, width: '150', height: '23'});
$('#ProtocolNumber_ADD').on('select', function (event) {
    var args = event.args;
    var item = $('#ProtocolNumber_ADD').jqxDropDownList('getItem', args.index);
});

var projectTypesource = {
		datatype: "json",
        datafields: [
            { name: 'ProjectTypeName' },
            { name: 'ProjectTypeID' },
            { name: 'ProjectTypeCode' },
        ],
        url: "/bidding/default/select?table=ProjectType",
        async: true
}
var projectTypedataAdapter = new $.jqx.dataAdapter(projectTypesource);
$("#ProjectType_ADD").jqxDropDownList(
		{ source: projectTypedataAdapter, 
			displayMember: "ProjectTypeName", 
			valueMember: "ProjectTypeID",
			selectedIndex: 0, width: '150', height: '23'});
$('#ProjectType_ADD').on('select', function (event) {
    var args = event.args;
    var item = $('#ProjectType_ADD').jqxDropDownList('getItem', args.index);
    if(item.value=='0'){
    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
    	$(".SELCTION").hide()
    	$(".FZC").show()
    }
    if(item.value=='1'){
    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
    	$(".SELCTION").hide()
    	$(".ZC").show()
    }
    if(item.value=='3'){
    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
    	$(".SELCTION").hide()
    	$(".SM").show()
    }
    if(item.value=='4'){
    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
    	$(".SELCTION").hide()
    	$(".GJ").show()
    }
});

var managementStylesource = {
		datatype: "json",
        datafields: [
            { name: 'ManagementStyleId' },
            { name: 'ManagementStyleCode' },
            { name: 'ManagementStyleName' },
        ],
        url: "/bidding/default/select?table=ManagementStyle",
        async: true
}
var managementStyledataAdapter = new $.jqx.dataAdapter(managementStylesource);
$("#ManagementStyle_ADD").jqxDropDownList(
		{ source: managementStyledataAdapter, 
			displayMember: "ManagementStyleName", 
			valueMember: "ManagementStyleId",
			selectedIndex: 0, width: '150', height: '23'});
$('#ManagementStyle_ADD').on('select', function (event) {
    var args = event.args;
    var item = $('#ManagementStyle_ADD').jqxDropDownList('getItem', args.index);
});

var purchaseStylesource = {
		datatype: "json",
        datafields: [
            { name: 'PurchaseStyleId' },
            { name: 'PurchaseStyleCode' },
            { name: 'PurchaseStyleName' },
        ],
        url: "/bidding/default/select?table=PurchaseStyle",
        async: true
}
var purchaseStyledataAdapter = new $.jqx.dataAdapter(purchaseStylesource);
$("#PurchaseStyle_ADD").jqxDropDownList(
		{ source: purchaseStyledataAdapter, 
			displayMember: "PurchaseStyleName", 
			valueMember: "PurchaseStyleId",
			selectedIndex: 0, width: '150', height: '23'});
$('#PurchaseStyle_ADD').on('select', function (event) {
    var args = event.args;
    var item = $('#PurchaseStyle_ADD').jqxDropDownList('getItem', args.index);
});

var biddingSiteStatisticTypesource = {
		datatype: "json",
        datafields: [
            { name: 'BiddingSiteStatisticTypeName' },
            { name: 'BiddingSiteStatisticTypeCode' },
            { name: 'BiddingSiteStatisticTypeName' },
        ],
        url: "/bidding/default/select?table=BiddingSiteStatisticType",
        async: true
}
var biddingSiteStatisticTypedataAdapter = new $.jqx.dataAdapter(biddingSiteStatisticTypesource);
$("#BiddingSiteStatisticType_ADD").jqxDropDownList(
		{ source: biddingSiteStatisticTypedataAdapter, 
			displayMember: "BiddingSiteStatisticTypeName", 
			valueMember: "BiddingSiteStatisticTypeName",
			selectedIndex: 0, width: '150', height: '23'});
$('#BiddingSiteStatisticType_ADD').on('select', function (event) {
    var args = event.args;
    var item = $('#BiddingSiteStatisticType_ADD').jqxDropDownList('getItem', args.index);
});

var biddingCountTypesource = {
		datatype: "json",
        datafields: [
            { name: 'BiddingCountTypeId' },
            { name: 'BiddingCountTypeCode' },
            { name: 'BiddingCountTypeName' },
        ],
        url: "/bidding/default/select?table=BiddingCountType",
        async: true
}
var biddingCountTypedataAdapter = new $.jqx.dataAdapter(biddingCountTypesource);
$("#BiddingCountType_ADD").jqxDropDownList(
		{ source: biddingCountTypedataAdapter, 
			displayMember: "BiddingCountTypeName", 
			valueMember: "BiddingCountTypeId",
			selectedIndex: 0, width: '150', height: '23'});
$('#BiddingCountType_ADD').on('select', function (event) {
    var args = event.args;
    var item = $('#BiddingCountType_ADD').jqxDropDownList('getItem', args.index);
});

var operationTypesource = {
		datatype: "json",
        datafields: [
            { name: 'OperationTypeId' },
            { name: 'OperationTypeCode' },
            { name: 'OperationTypeName' },
        ],
        url: "/bidding/default/select?table=OperationType",
        async: true
}
var operationTypedataAdapter = new $.jqx.dataAdapter(operationTypesource);
$("#OperationType_ADD").jqxDropDownList(
		{ source: operationTypedataAdapter, 
			displayMember: "OperationTypeName", 
			valueMember: "OperationTypeId",
			selectedIndex: 0, width: '150', height: '23'});
$('#OperationType_ADD').on('select', function (event) {
    var args = event.args;
    var item = $('#OperationType_ADD').jqxDropDownList('getItem', args.index);
});
//********INIT_INPUT_FIELDS END******************//
            var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            // initialize jqxGrid
            var columns_content  = 
//********COLUMNS_CONTENT START******************//
[{"datafield":"Id","text":"\u5e8f\u53f7"},{"datafield":"ProtocolId","text":"\u534f\u8bae\u7f16\u53f7"},{"datafield":"ProjectNumber","text":"\u9879\u76ee\u7f16\u53f7"},{"datafield":"EmployeeId","text":"\u5458\u5de5\u7f16\u53f7"},{"datafield":"ProjectTypeId","text":"\u7c7b\u578b\u7f16\u53f7"},{"datafield":"CreationTime","text":"\u521b\u5efa\u65f6\u95f4"},{"datafield":"Option1","text":"\u9009\u98791"},{"datafield":"Option2","text":"\u9009\u98792"},{"datafield":"Option3","text":"\u9009\u98793"},{"datafield":"IsDelete","text":"\u662f\u5426\u5df2\u5220\u9664"}]            
//********COLUMNS_CONTENT  END******************//
            $("#jqxgrid").jqxGrid(
            {
                width: '100%',
                source: dataAdapter,
                pageable: true,
                autoheight: true,
                columns: columns_content,
                showstatusbar: true,
                renderstatusbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var addButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../bidding/static/images/add.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>新增</span></div>");
                    var deleteButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../bidding/static/images/close.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>删除</span></div>");
                    var reloadButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../bidding/static/images/refresh.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>刷新</span></div>");
                    container.append(addButton);
                    container.append(deleteButton);
                    container.append(reloadButton);
                    statusbar.append(container);
                    addButton.jqxButton({  width: 60, height: 20 });
                    deleteButton.jqxButton({  width: 65, height: 20 });
                    reloadButton.jqxButton({  width: 65, height: 20 });
                    // add new row.
                    addButton.click(function (event) {
                    	$("#popupWindow_ADD").jqxWindow('show');
                    	$(".SELCTION").hide()
                    	$(".FZC").show()
                    	$("#ProjectNumber_ADD").val('PCMET-16088888G030')
                    });
                    // delete selected row.
                    deleteButton.click(function (event) {
                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                        var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
                        var id = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
                        $("#jqxgrid").jqxGrid('deleterow', id);
                    });
                    // reload grid data.
                    reloadButton.click(function (event) {
                        $("#jqxgrid").jqxGrid({ source:dataAdapter });
                    });
                },
                showtoolbar: true,
                rendertoolbar: function (toolbar) {
                	//添加打印按钮、导出Excel按钮和其他按钮
                    var me = this;
                    var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
                    var searchArea = $("#searchArea")
                    var printButton = $("<div style='float: left; margin-left: 30%;margin-top: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
                    var exportButton = $("<div style='float: left; margin-left: 5px;margin-top: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
                    var searchButton = $("<div style='float: left; margin-left: 5px;margin-top: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>查询</span></div>");
                    toolbar.append(container);
                    container.append(searchArea);
                    container.append(printButton);
                    container.append(exportButton);
                    container.append(searchButton);
                    printButton.jqxButton({  width: 80, height: 20 });
                    exportButton.jqxButton({  width: 80, height: 20 });
                    searchButton.jqxButton({  width: 80, height: 20 });
                    if (theme != "") {
                    	exportButton.addClass('jqx-widget-content-' + theme);
                    	exportButton.addClass('jqx-rc-all-' + theme);
                    	printButton.addClass('jqx-widget-content-' + theme);
                    	printButton.addClass('jqx-rc-all-' + theme);
                    }
                    printButton.click(function (event) {
                        var gridContent = $("#jqxgrid").jqxGrid('exportdata', 'html');
                        var newWindow = window.open('', '', 'width=800, height=500'),
                        document = newWindow.document.open(),
                        pageContent =
                            '<!DOCTYPE html>\n' +
                            '<html>\n' +
                            '<head>\n' +
                            '<meta charset="utf-8" />\n' +
                            '<title>打印原始单据</title>\n' +
                            '</head>\n' +
                            '<body>\n' + gridContent + '\n</body>\n</html>';
                        document.write(pageContent);
                        document.close();
                        newWindow.print();
                    });
                    exportButton.click(function (event) {
                    	$("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid'); 
                    });
                    searchButton.click(function (event) {
                    	
                    });
                },
            });
            // create context menu
            var contextMenu = $("#Menu").jqxMenu({ width: 200, height: 58, autoOpenPopup: false, mode: 'popup'});
            $("#jqxgrid").on('contextmenu', function () {
                return false;
            });
            // handle context menu clicks.
            $("#Menu").on('itemclick', function (event) {
                var args = event.args;
                var rowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                if ($.trim($(args).text()) == "修改") {
                    editrow = rowindex;
                    var offset = $("#jqxgrid").offset();
                    $("#popupWindow_EDIT").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60} });
                    // get the clicked row's data and initialize the input fields.
                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
//********=GET_EDIT_ROW_DATA START******************//
$("#ProtocolId_EDIT").val(dataRecord.ProtocolId);
$("#ProjectNumber_EDIT").val(dataRecord.ProjectNumber);
$("#EmployeeId_EDIT").val(dataRecord.EmployeeId);
$("#ProjectTypeId_EDIT").val(dataRecord.ProjectTypeId);
$("#CreationTime_EDIT").val(dataRecord.CreationTime);
$("#Option1_EDIT").val(dataRecord.Option1);
$("#Option2_EDIT").val(dataRecord.Option2);
$("#Option3_EDIT").val(dataRecord.Option3);
$("#IsDelete_EDIT").val(dataRecord.IsDelete);

//********GET_EDIT_ROW_DATA END******************//
                    // show the popup window.
                    $("#popupWindow_EDIT").jqxWindow('show');
                }
                else if ($.trim($(args).text()) == "删除") {
                    var rowid = $("#jqxgrid").jqxGrid('getrowid', rowindex);
                    $("#jqxgrid").jqxGrid('deleterow', rowid);
                }
            });
            $("#jqxgrid").on('rowclick', function (event) {
                if (event.args.rightclick) {
                    $("#jqxgrid").jqxGrid('selectrow', event.args.rowindex);
                    var scrollTop = $(window).scrollTop();
                    var scrollLeft = $(window).scrollLeft();
                    contextMenu.jqxMenu('open', parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);
                    return false;
                }
            });
            $('#jqxgrid').jqxGrid({ toolbarheight: 
            180.0
            });
            // initialize the popup edit window and buttons.
            $("#popupWindow_EDIT").jqxWindow({ width: 350, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel_EDIT"), modalOpacity: 0.01 });
            $("#Cancel_EDIT").jqxButton({ theme: theme });
            $("#Save_EDIT").jqxButton({ theme: theme });
            // update the edited row when the user clicks the 'Save' button.
            $("#Save_EDIT").click(function () {
                if (editrow >= 0) {
                    var row = 
//******** EDIT_ROW_CONTENT_SAVE START*****************//
{ProtocolId:$("#ProtocolId_EDIT").val()
,ProjectNumber:$("#ProjectNumber_EDIT").val()
,EmployeeId:$("#EmployeeId_EDIT").val()
,ProjectTypeId:$("#ProjectTypeId_EDIT").val()
,CreationTime:$("#CreationTime_EDIT").val()
,Option1:$("#Option1_EDIT").val()
,Option2:$("#Option2_EDIT").val()
,Option3:$("#Option3_EDIT").val()
,IsDelete:$("#IsDelete_EDIT").val()
};
//********EDIT_ROW_CONTENT_SAVE END******************//
                    var rowid = $("#jqxgrid").jqxGrid('getrowid', editrow);
                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
                    row['Id'] = dataRecord['Id']
                    $('#jqxgrid').jqxGrid('updaterow', rowid, row);
                    $("#popupWindow_EDIT").jqxWindow('hide');
                }
            });
            //initialize the popup add window and buttons.
            $("#popupWindow_ADD").jqxWindow({ width: 350, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
            $("#Cancel_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").click(function () {
               var row = 
//******** ADD_ROW_CONTENT_SAVE START*****************//
{ProtocolId:$("#ProtocolNumber_ADD").val()
,ProjectNumber:$("#ProjectNumber_ADD").val()
,EmployeeId:'0001'
,ProjectTypeId:$("#ProjectTypeId_ADD").val()
,CreationTime:$("#CreationTime_ADD").val()
,Option1:$("#ManagementStyle_ADD").val()
,Option2:$("#PurchaseStyle_ADD").val()
,Option3:$("#ProjectType_ADD").val()
,IsDelete:$("#IsDelete_ADD").val()
}
//******** ADD_ROW_CONTENT_SAVE START*****************//
               var datarow = row;
               $.post("/bidding/default/insert?table=ProjectCode",datarow,function(result){
            	   $("#jqxgrid").jqxGrid('addrow', null, result, 'first');
            	},'json');
               $("#popupWindow_ADD").jqxWindow('hide');
            });
        });