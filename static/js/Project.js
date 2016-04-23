$(document).ready(function () {
            // prepare the data
            var datafields_content =  
//********DATAFIELDS START******************//
[{"name":"Id","type":"string"},{"name":"ProtocolCodeId","type":"string"},{"name":"ProjectCodeId","type":"string"},{"name":"ProjectName","type":"string"},{"name":"BuyerId","type":"string"},{"name":"EmployeeId","type":"string"},{"name":"Assistant","type":"string"},{"name":"ProjectSourceId","type":"string"},{"name":"SourcesOfFundingId","type":"string"},{"name":"ProjectTypeId","type":"string"},{"name":"ManagementStyleId","type":"string"},{"name":"StateId","type":"string"},{"name":"Note","type":"string"},{"name":"CreationDate","type":"string"},{"name":"IsDelete","type":"string"}]
//********DATAFIELDS END******************//
            var data_url = "/bidding/default/select?table=Project"
            var source =
            {
                url: data_url,
                datatype: "json",
                datafields:datafields_content,
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                $.post("/bidding/default/update?table=Project",rowdata,function(result){
                		 alert("操作成功！");
                	 });
                    commit(true);
                },
                deleterow: function (rowid, commit) {
                    // synchronize with the server - send delete command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                	var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
                	$.post("/bidding/default/delete?table=Project",dataRecord,function(result){
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
$("#ProtocolCodeId_SEARCH").addClass('jqx-input')
$("#ProtocolCodeId_SEARCH").width(150)
$("#ProtocolCodeId_SEARCH").height(23)
$("#ProjectCodeId_SEARCH").addClass('jqx-input')
$("#ProjectCodeId_SEARCH").width(150)
$("#ProjectCodeId_SEARCH").height(23)
$("#ProjectName_SEARCH").addClass('jqx-input')
$("#ProjectName_SEARCH").width(150)
$("#ProjectName_SEARCH").height(23)
$("#BuyerId_SEARCH").addClass('jqx-input')
$("#BuyerId_SEARCH").width(150)
$("#BuyerId_SEARCH").height(23)
$("#EmployeeId_SEARCH").addClass('jqx-input')
$("#EmployeeId_SEARCH").width(150)
$("#EmployeeId_SEARCH").height(23)
$("#Assistant_SEARCH").addClass('jqx-input')
$("#Assistant_SEARCH").width(150)
$("#Assistant_SEARCH").height(23)
$("#ProjectSourceId_SEARCH").addClass('jqx-input')
$("#ProjectSourceId_SEARCH").width(150)
$("#ProjectSourceId_SEARCH").height(23)
$("#SourcesOfFundingId_SEARCH").addClass('jqx-input')
$("#SourcesOfFundingId_SEARCH").width(150)
$("#SourcesOfFundingId_SEARCH").height(23)
$("#ProjectTypeId_SEARCH").addClass('jqx-input')
$("#ProjectTypeId_SEARCH").width(150)
$("#ProjectTypeId_SEARCH").height(23)
$("#ManagementStyleId_SEARCH").addClass('jqx-input')
$("#ManagementStyleId_SEARCH").width(150)
$("#ManagementStyleId_SEARCH").height(23)
$("#StateId_SEARCH").addClass('jqx-input')
$("#StateId_SEARCH").width(150)
$("#StateId_SEARCH").height(23)
$("#Note_SEARCH").addClass('jqx-input')
$("#Note_SEARCH").width(150)
$("#Note_SEARCH").height(23)
$("#CreationDate_SEARCH").addClass('jqx-input')
$("#CreationDate_SEARCH").width(150)
$("#CreationDate_SEARCH").height(23)
$("#IsDelete_SEARCH").addClass('jqx-input')
$("#IsDelete_SEARCH").width(150)
$("#IsDelete_SEARCH").height(23)


$("#ProtocolCodeId_EDIT").addClass('jqx-input')
$("#ProtocolCodeId_EDIT").width(150)
$("#ProtocolCodeId_EDIT").height(23)
$("#ProjectCodeId_EDIT").addClass('jqx-input')
$("#ProjectCodeId_EDIT").width(150)
$("#ProjectCodeId_EDIT").height(23)
$("#ProjectName_EDIT").addClass('jqx-input')
$("#ProjectName_EDIT").width(150)
$("#ProjectName_EDIT").height(23)
$("#BuyerId_EDIT").addClass('jqx-input')
$("#BuyerId_EDIT").width(150)
$("#BuyerId_EDIT").height(23)
$("#EmployeeId_EDIT").addClass('jqx-input')
$("#EmployeeId_EDIT").width(150)
$("#EmployeeId_EDIT").height(23)
$("#Assistant_EDIT").addClass('jqx-input')
$("#Assistant_EDIT").width(150)
$("#Assistant_EDIT").height(23)
$("#ProjectSourceId_EDIT").addClass('jqx-input')
$("#ProjectSourceId_EDIT").width(150)
$("#ProjectSourceId_EDIT").height(23)
$("#SourcesOfFundingId_EDIT").addClass('jqx-input')
$("#SourcesOfFundingId_EDIT").width(150)
$("#SourcesOfFundingId_EDIT").height(23)
$("#ProjectTypeId_EDIT").addClass('jqx-input')
$("#ProjectTypeId_EDIT").width(150)
$("#ProjectTypeId_EDIT").height(23)
$("#ManagementStyleId_EDIT").addClass('jqx-input')
$("#ManagementStyleId_EDIT").width(150)
$("#ManagementStyleId_EDIT").height(23)
$("#StateId_EDIT").addClass('jqx-input')
$("#StateId_EDIT").width(150)
$("#StateId_EDIT").height(23)
$("#Note_EDIT").addClass('jqx-input')
$("#Note_EDIT").width(150)
$("#Note_EDIT").height(23)
$("#CreationDate_EDIT").addClass('jqx-input')
$("#CreationDate_EDIT").width(200)
$("#CreationDate_EDIT").height(23)
$("#IsDelete_EDIT").addClass('jqx-input')
$("#IsDelete_EDIT").width(150)
$("#IsDelete_EDIT").height(23)



ProtocolCodeId_ADD()


$("#ProjectCodeId_ADD").addClass('jqx-input')
$("#ProjectCodeId_ADD").width(200)
$("#ProjectCodeId_ADD").height(23)
$("#ProjectName_ADD").addClass('jqx-input')
$("#ProjectName_ADD").width(200)
$("#ProjectName_ADD").height(23)
$("#BuyerId_ADD").addClass('jqx-input')
$("#BuyerId_ADD").width(200)
$("#BuyerId_ADD").height(23)
$("#EmployeeId_ADD").addClass('jqx-input')
$("#EmployeeId_ADD").width(200)
$("#EmployeeId_ADD").height(23)
$("#Assistant_ADD").addClass('jqx-input')
$("#Assistant_ADD").width(200)
$("#Assistant_ADD").height(23)
$("#ProjectSourceId_ADD").addClass('jqx-input')
$("#ProjectSourceId_ADD").width(200)
$("#ProjectSourceId_ADD").height(23)
$("#SourcesOfFundingId_ADD").addClass('jqx-input')
$("#SourcesOfFundingId_ADD").width(200)
$("#SourcesOfFundingId_ADD").height(23)
$("#ProjectTypeId_ADD").addClass('jqx-input')
$("#ProjectTypeId_ADD").width(200)
$("#ProjectTypeId_ADD").height(23)
$("#ManagementStyleId_ADD").addClass('jqx-input')
$("#ManagementStyleId_ADD").width(200)
$("#ManagementStyleId_ADD").height(23)
$("#StateId_ADD").addClass('jqx-input')
$("#StateId_ADD").width(200)
$("#StateId_ADD").height(23)
$("#CreationDate_ADD").addClass('jqx-input')
$("#CreationDate_ADD").width(200)
$("#CreationDate_ADD").height(23)
$('#Note_ADD').jqxEditor({height: "200px", width: '780px'});

var projectPackageurl = "/bidding/default/select?table=ProjectPackage"
var projectPackageSource =
{
    dataFields: [{"name":"Id","type":"string"},{"name":"ProjectId","type":"string"},{"name":"PackageNumber","type":"string"},{"name":"PackageName","type":"string"},{"name":"StateId","type":"string"},{"name":"SigningDate","type":"string"},{"name":"MakeOutDate","type":"string"},{"name":"EntrustMoney","type":"string"},{"name":"WinningMoney","type":"string"},{"name":"WinningCompany","type":"string"},{"name":"ChargeRate","type":"string"},{"name":"Note","type":"string"},{"name":"CreationDate","type":"string"},{"name":"IsDelete","type":"string"}],
    dataType: "json",
    url: projectPackageurl,
    updaterow: function (rowid, rowdata, commit) {
        // synchronize with the server - send update command
        // call commit with parameter true if the synchronization with the server is successful 
        // and with parameter false if the synchronization failed.
    $.post("/bidding/default/update?table=ProjectPackage",rowdata,function(result){
    		 alert("操作成功！");
    	 });
        commit(true);
    },
    deleterow: function (rowid, commit) {
        // synchronize with the server - send delete command
        // call commit with parameter true if the synchronization with the server is successful 
        // and with parameter false if the synchronization failed.
    	var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
    	$.post("/bidding/default/delete?table=ProjectPackage",dataRecord,function(result){
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

var projectPackageurldataAdapter = new $.jqx.dataAdapter(projectPackageSource, {
	loadComplete: function () {
        // data is loaded.
    }
});


var projectPackage_columns_content  = 
	[{"datafield":"Id","text":"\u5e8f\u53f7"},
	 {"datafield":"PackageNumber","text":"\u5305\u7f16\u53f7"},
	 {"datafield":"PackageName","text":"\u5305\u540d\u79f0"},
	 {"datafield":"StateId","text":"\u5305\u72b6\u6001"},
	 {"datafield":"SigningDate","text":"\u7b7e\u7ea6\u65e5\u671f"},
	 {"datafield":"MakeOutDate","text":"\u5f00\u7968\u65e5\u671f"},
	 {"datafield":"EntrustMoney","text":"\u59d4\u6258\u91d1\u989d"},
	 {"datafield":"WinningMoney","text":"\u4e2d\u6807\u91d1\u989d"},
	 {"datafield":"WinningCompany","text":"\u4e2d\u6807\u5355\u4f4d"},
	 {"datafield":"ChargeRate","text":"\u670d\u52a1\u8d39\u7387"}]
$("#Package_ADD").jqxDataTable(
        {
            width: 780,
            height: 200,
            source: projectPackageurldataAdapter,
            pageable: true,
            editable: true,
            showToolbar: true,
            altRows: true,
            ready: function()
            {
                // called when the DataTable is loaded.         
            },
            pagerButtonsCount: 8,
            toolbarHeight: 35,
            renderToolbar: function(toolBar)
            {
                var toTheme = function (className) {
                    if (theme == "") return className;
                    return className + " " + className + "-" + theme;
                }
                // appends buttons to the status bar.
                var container = $("<div style='overflow: hidden; position: relative; height: 100%; width: 100%;'></div>");
                var buttonTemplate = "<div style='float: left; padding: 3px; margin: 2px;'><div style='margin: 4px; width: 16px; height: 16px;'></div></div>";
                var addButton = $(buttonTemplate);
                var editButton = $(buttonTemplate);
                var deleteButton = $(buttonTemplate);
                var cancelButton = $(buttonTemplate);
                var updateButton = $(buttonTemplate);
                container.append(addButton);
                container.append(editButton);
                container.append(deleteButton);
                container.append(cancelButton);
                container.append(updateButton);
                toolBar.append(container);
                addButton.jqxButton({cursor: "pointer", enableDefault: false,  height: 25, width: 25 });
                addButton.find('div:first').addClass(toTheme('jqx-icon-plus'));
                addButton.jqxTooltip({ position: 'bottom', content: "Add"});
                editButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
                editButton.find('div:first').addClass(toTheme('jqx-icon-edit'));
                editButton.jqxTooltip({ position: 'bottom', content: "Edit"});
                deleteButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
                deleteButton.find('div:first').addClass(toTheme('jqx-icon-delete'));
                deleteButton.jqxTooltip({ position: 'bottom', content: "Delete"});
                updateButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
                updateButton.find('div:first').addClass(toTheme('jqx-icon-save'));
                updateButton.jqxTooltip({ position: 'bottom', content: "Save Changes"});
                cancelButton.jqxButton({ cursor: "pointer", disabled: true, enableDefault: false,  height: 25, width: 25 });
                cancelButton.find('div:first').addClass(toTheme('jqx-icon-cancel'));
                cancelButton.jqxTooltip({ position: 'bottom', content: "Cancel"});
                var updateButtons = function (action) {
                    switch (action) {
                        case "Select":
                            addButton.jqxButton({ disabled: false });
                            deleteButton.jqxButton({ disabled: false });
                            editButton.jqxButton({ disabled: false });
                            cancelButton.jqxButton({ disabled: true });
                            updateButton.jqxButton({ disabled: true });
                            break;
                        case "Unselect":
                            addButton.jqxButton({ disabled: false });
                            deleteButton.jqxButton({ disabled: true });
                            editButton.jqxButton({ disabled: true });
                            cancelButton.jqxButton({ disabled: true });
                            updateButton.jqxButton({ disabled: true });
                            break;
                        case "Edit":
                            addButton.jqxButton({ disabled: true });
                            deleteButton.jqxButton({ disabled: true });
                            editButton.jqxButton({ disabled: true });
                            cancelButton.jqxButton({ disabled: false });
                            updateButton.jqxButton({ disabled: false });
                            break;
                        case "End Edit":
                            addButton.jqxButton({ disabled: false });
                            deleteButton.jqxButton({ disabled: false });
                            editButton.jqxButton({ disabled: false });
                            cancelButton.jqxButton({ disabled: true });
                            updateButton.jqxButton({ disabled: true });
                            break;
                    }
                }
                var rowIndex = null;
                $("#Package_ADD").on('rowSelect', function (event) {
                    var args = event.args;
                    rowIndex = args.index;
                    updateButtons('Select');
                });
                $("#Package_ADD").on('rowUnselect', function (event) {
                    updateButtons('Unselect');
                });
                $("#Package_ADD").on('rowEndEdit', function (event) {
                    updateButtons('End Edit');
                });
                $("#Package_ADD").on('rowBeginEdit', function (event) {
                    updateButtons('Edit');
                });
                addButton.click(function (event) {
                    if (!addButton.jqxButton('disabled')) {
                        // add new empty row.
                        $("#Package_ADD").jqxDataTable('addRow', null, {}, 'first');
                        // select the first row and clear the selection.
                        $("#Package_ADD").jqxDataTable('clearSelection');
                        $("#Package_ADD").jqxDataTable('selectRow', 0);
                        // edit the new row.
                        $("#Package_ADD").jqxDataTable('beginRowEdit', 0);
                        updateButtons('add');
                    }
                });
                cancelButton.click(function (event) {
                    if (!cancelButton.jqxButton('disabled')) {
                        // cancel changes.
                        $("#Package_ADD").jqxDataTable('endRowEdit', rowIndex, true);
                    }
                });
                updateButton.click(function (event) {
                    if (!updateButton.jqxButton('disabled')) {
                        // save changes.
                        $("#Package_ADD").jqxDataTable('endRowEdit', rowIndex, false);
                    }
                });
                editButton.click(function () {
                    if (!editButton.jqxButton('disabled')) {
                        $("#Package_ADD").jqxDataTable('beginRowEdit', rowIndex);
                        updateButtons('edit');
                    }
                });
                deleteButton.click(function () {
                    if (!deleteButton.jqxButton('disabled')) {
                        $("#Package_ADD").jqxDataTable('deleteRow', rowIndex);
                        updateButtons('delete');
                    }
                });
            },
            columns: projectPackage_columns_content
        });

//********INIT_INPUT_FIELDS END******************//
            var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            // initialize jqxGrid
            var columns_content  = 
//********COLUMNS_CONTENT START******************//
[{"datafield":"Id","text":"\u5e8f\u53f7"},
 {"datafield":"ProtocolCodeId","text":"\u534f\u8bae\u5e8f\u53f7"},
 {"datafield":"ProjectCodeId","text":"\u9879\u76ee\u5e8f\u53f7"},
 {"datafield":"ProjectName","text":"\u9879\u76ee\u540d\u79f0"},
 {"datafield":"BuyerId","text":"\u91c7\u8d2d\u5355\u4f4d"},
 {"datafield":"EmployeeId","text":"\u6240\u6709\u8005"},
 {"datafield":"Assistant","text":"\u534f\u52a9\u4eba"},
 {"datafield":"ProjectSourceId","text":"\u9879\u76ee\u6765\u6e90"},
 {"datafield":"SourcesOfFundingId","text":"\u8d44\u91d1\u6765\u6e90"},
 {"datafield":"ProjectTypeId","text":"\u9879\u76ee\u7c7b\u578b"},
 {"datafield":"ManagementStyleId","text":"\u7ba1\u7406\u65b9\u5f0f"},
 {"datafield":"StateId","text":"\u9879\u76ee\u72b6\u6001"},
 {"datafield":"CreationDate","text":"\u521b\u5efa\u65e5\u671f"}]            
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
$("#ProtocolCodeId_EDIT").val(dataRecord.ProtocolCodeId);
$("#ProjectCodeId_EDIT").val(dataRecord.ProjectCodeId);
$("#ProjectName_EDIT").val(dataRecord.ProjectName);
$("#BuyerId_EDIT").val(dataRecord.BuyerId);
$("#EmployeeId_EDIT").val(dataRecord.EmployeeId);
$("#Assistant_EDIT").val(dataRecord.Assistant);
$("#ProjectSourceId_EDIT").val(dataRecord.ProjectSourceId);
$("#SourcesOfFundingId_EDIT").val(dataRecord.SourcesOfFundingId);
$("#ProjectTypeId_EDIT").val(dataRecord.ProjectTypeId);
$("#ManagementStyleId_EDIT").val(dataRecord.ManagementStyleId);
$("#StateId_EDIT").val(dataRecord.StateId);
$("#Note_EDIT").val(dataRecord.Note);
$("#CreationDate_EDIT").val(dataRecord.CreationDate);
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
            170.0
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
{ProtocolCodeId:$("#ProtocolCodeId_EDIT").val()
,ProjectCodeId:$("#ProjectCodeId_EDIT").val()
,ProjectName:$("#ProjectName_EDIT").val()
,BuyerId:$("#BuyerId_EDIT").val()
,EmployeeId:$("#EmployeeId_EDIT").val()
,Assistant:$("#Assistant_EDIT").val()
,ProjectSourceId:$("#ProjectSourceId_EDIT").val()
,SourcesOfFundingId:$("#SourcesOfFundingId_EDIT").val()
,ProjectTypeId:$("#ProjectTypeId_EDIT").val()
,ManagementStyleId:$("#ManagementStyleId_EDIT").val()
,StateId:$("#StateId_EDIT").val()
,Note:$("#Note_EDIT").val()
,CreationDate:$("#CreationDate_EDIT").val()
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
            $("#popupWindow_ADD").jqxWindow({ width: 800, maxHeight: 850,resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
            $("#Cancel_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").click(function () {
               var row = 
//******** ADD_ROW_CONTENT_SAVE START*****************//
{ProtocolCodeId:$("#ProtocolCodeId_ADD").val()
,ProjectCodeId:$("#ProjectCodeId_ADD").val()
,ProjectName:$("#ProjectName_ADD").val()
,BuyerId:$("#BuyerId_ADD").val()
,EmployeeId:$("#EmployeeId_ADD").val()
,Assistant:$("#Assistant_ADD").val()
,ProjectSourceId:$("#ProjectSourceId_ADD").val()
,SourcesOfFundingId:$("#SourcesOfFundingId_ADD").val()
,ProjectTypeId:$("#ProjectTypeId_ADD").val()
,ManagementStyleId:$("#ManagementStyleId_ADD").val()
,StateId:$("#StateId_ADD").val()
,Note:$("#Note_ADD").val()
,CreationDate:$("#CreationDate_ADD").val()
,IsDelete:$("#IsDelete_ADD").val()
}
//******** ADD_ROW_CONTENT_SAVE START*****************//
               var datarow = row;
               $.post("/bidding/default/insert?table=Project",datarow,function(result){
            	   $("#jqxgrid").jqxGrid('addrow', null, result, 'first');
            	},'json');
               $("#popupWindow_ADD").jqxWindow('hide');
            });
        });