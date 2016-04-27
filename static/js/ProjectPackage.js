$(document).ready(function () {
            // prepare the data
            var datafields_content =  
//********DATAFIELDS START******************//
[{"name":"Id","type":"string"},{"name":"ProjectId","type":"string"},{"name":"PackageNumber","type":"string"},{"name":"PackageName","type":"string"},{"name":"StateId","type":"string"},{"name":"SigningDate","type":"string"},{"name":"MakeOutDate","type":"string"},{"name":"EntrustMoney","type":"string"},{"name":"WinningMoney","type":"string"},{"name":"WinningCompany","type":"string"},{"name":"ChargeRate","type":"string"},{"name":"Note","type":"string"},{"name":"CreationDate","type":"string"},{"name":"IsDelete","type":"string"}]
//********DATAFIELDS END******************//
            var data_url = "/bidding/default/select?table=ProjectPackage"
            var source =
            {
                url: data_url,
                datatype: "json",
                datafields:datafields_content,
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
            // initialize the input fields.
//********INIT_INPUT_FIELDS START******************//
$("#ProjectId_SEARCH").addClass('jqx-input')
$("#ProjectId_SEARCH").width(150)
$("#ProjectId_SEARCH").height(23)
$("#PackageNumber_SEARCH").addClass('jqx-input')
$("#PackageNumber_SEARCH").width(150)
$("#PackageNumber_SEARCH").height(23)
$("#PackageName_SEARCH").addClass('jqx-input')
$("#PackageName_SEARCH").width(150)
$("#PackageName_SEARCH").height(23)
$("#StateId_SEARCH").addClass('jqx-input')
$("#StateId_SEARCH").width(150)
$("#StateId_SEARCH").height(23)
$("#SigningDate_SEARCH").addClass('jqx-input')
$("#SigningDate_SEARCH").width(150)
$("#SigningDate_SEARCH").height(23)
$("#MakeOutDate_SEARCH").addClass('jqx-input')
$("#MakeOutDate_SEARCH").width(150)
$("#MakeOutDate_SEARCH").height(23)
$("#EntrustMoney_SEARCH").addClass('jqx-input')
$("#EntrustMoney_SEARCH").width(150)
$("#EntrustMoney_SEARCH").height(23)
$("#WinningMoney_SEARCH").addClass('jqx-input')
$("#WinningMoney_SEARCH").width(150)
$("#WinningMoney_SEARCH").height(23)
$("#WinningCompany_SEARCH").addClass('jqx-input')
$("#WinningCompany_SEARCH").width(150)
$("#WinningCompany_SEARCH").height(23)
$("#ChargeRate_SEARCH").addClass('jqx-input')
$("#ChargeRate_SEARCH").width(150)
$("#ChargeRate_SEARCH").height(23)
$("#Note_SEARCH").addClass('jqx-input')
$("#Note_SEARCH").width(150)
$("#Note_SEARCH").height(23)
$("#CreationDate_SEARCH").addClass('jqx-input')
$("#CreationDate_SEARCH").width(150)
$("#CreationDate_SEARCH").height(23)
$("#IsDelete_SEARCH").addClass('jqx-input')
$("#IsDelete_SEARCH").width(150)
$("#IsDelete_SEARCH").height(23)
$("#ProjectId_EDIT").addClass('jqx-input')
$("#ProjectId_EDIT").width(150)
$("#ProjectId_EDIT").height(23)
$("#PackageNumber_EDIT").addClass('jqx-input')
$("#PackageNumber_EDIT").width(150)
$("#PackageNumber_EDIT").height(23)
$("#PackageName_EDIT").addClass('jqx-input')
$("#PackageName_EDIT").width(150)
$("#PackageName_EDIT").height(23)
$("#StateId_EDIT").addClass('jqx-input')
$("#StateId_EDIT").width(150)
$("#StateId_EDIT").height(23)
$("#SigningDate_EDIT").addClass('jqx-input')
$("#SigningDate_EDIT").width(150)
$("#SigningDate_EDIT").height(23)
$("#MakeOutDate_EDIT").addClass('jqx-input')
$("#MakeOutDate_EDIT").width(150)
$("#MakeOutDate_EDIT").height(23)
$("#EntrustMoney_EDIT").addClass('jqx-input')
$("#EntrustMoney_EDIT").width(150)
$("#EntrustMoney_EDIT").height(23)
$("#WinningMoney_EDIT").addClass('jqx-input')
$("#WinningMoney_EDIT").width(150)
$("#WinningMoney_EDIT").height(23)
$("#WinningCompany_EDIT").addClass('jqx-input')
$("#WinningCompany_EDIT").width(150)
$("#WinningCompany_EDIT").height(23)
$("#ChargeRate_EDIT").addClass('jqx-input')
$("#ChargeRate_EDIT").width(150)
$("#ChargeRate_EDIT").height(23)
$("#Note_EDIT").addClass('jqx-input')
$("#Note_EDIT").width(150)
$("#Note_EDIT").height(23)
$("#CreationDate_EDIT").addClass('jqx-input')
$("#CreationDate_EDIT").width(150)
$("#CreationDate_EDIT").height(23)
$("#IsDelete_EDIT").addClass('jqx-input')
$("#IsDelete_EDIT").width(150)
$("#IsDelete_EDIT").height(23)
$("#ProjectId_ADD").addClass('jqx-input')
$("#ProjectId_ADD").width(150)
$("#ProjectId_ADD").height(23)
$("#PackageNumber_ADD").addClass('jqx-input')
$("#PackageNumber_ADD").width(150)
$("#PackageNumber_ADD").height(23)
$("#PackageName_ADD").addClass('jqx-input')
$("#PackageName_ADD").width(150)
$("#PackageName_ADD").height(23)
$("#StateId_ADD").addClass('jqx-input')
$("#StateId_ADD").width(150)
$("#StateId_ADD").height(23)
$("#SigningDate_ADD").addClass('jqx-input')
$("#SigningDate_ADD").width(150)
$("#SigningDate_ADD").height(23)
$("#MakeOutDate_ADD").addClass('jqx-input')
$("#MakeOutDate_ADD").width(150)
$("#MakeOutDate_ADD").height(23)
$("#EntrustMoney_ADD").addClass('jqx-input')
$("#EntrustMoney_ADD").width(150)
$("#EntrustMoney_ADD").height(23)
$("#WinningMoney_ADD").addClass('jqx-input')
$("#WinningMoney_ADD").width(150)
$("#WinningMoney_ADD").height(23)
$("#WinningCompany_ADD").addClass('jqx-input')
$("#WinningCompany_ADD").width(150)
$("#WinningCompany_ADD").height(23)
$("#ChargeRate_ADD").addClass('jqx-input')
$("#ChargeRate_ADD").width(150)
$("#ChargeRate_ADD").height(23)
$("#Note_ADD").addClass('jqx-input')
$("#Note_ADD").width(150)
$("#Note_ADD").height(23)
$("#CreationDate_ADD").addClass('jqx-input')
$("#CreationDate_ADD").width(150)
$("#CreationDate_ADD").height(23)
$("#IsDelete_ADD").addClass('jqx-input')
$("#IsDelete_ADD").width(150)
$("#IsDelete_ADD").height(23)

//********INIT_INPUT_FIELDS END******************//
            var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            // initialize jqxGrid
            var columns_content  = 
//********COLUMNS_CONTENT START******************//
[{"datafield":"Id","text":"\u5e8f\u53f7"},{"datafield":"ProjectId","text":"\u9879\u76ee\u5e8f\u53f7"},{"datafield":"PackageNumber","text":"\u5305\u7f16\u53f7"},{"datafield":"PackageName","text":"\u5305\u540d\u79f0"},{"datafield":"StateId","text":"\u5305\u72b6\u6001"},{"datafield":"SigningDate","text":"\u7b7e\u7ea6\u65e5\u671f"},{"datafield":"MakeOutDate","text":"\u5f00\u7968\u65e5\u671f"},{"datafield":"EntrustMoney","text":"\u59d4\u6258\u91d1\u989d"},{"datafield":"WinningMoney","text":"\u4e2d\u6807\u91d1\u989d"},{"datafield":"WinningCompany","text":"\u4e2d\u6807\u5355\u4f4d"},{"datafield":"ChargeRate","text":"\u670d\u52a1\u8d39\u7387"},{"datafield":"Note","text":"\u5305\u5907\u6ce8"},{"datafield":"CreationDate","text":"\u521b\u5efa\u65e5\u671f"},{"datafield":"IsDelete","text":"\u662f\u5426\u5df2\u5220\u9664"}]            
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
                showtoolbar: false,
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
$("#ProjectId_EDIT").val(dataRecord.ProjectId);
$("#PackageNumber_EDIT").val(dataRecord.PackageNumber);
$("#PackageName_EDIT").val(dataRecord.PackageName);
$("#StateId_EDIT").val(dataRecord.StateId);
$("#SigningDate_EDIT").val(dataRecord.SigningDate);
$("#MakeOutDate_EDIT").val(dataRecord.MakeOutDate);
$("#EntrustMoney_EDIT").val(dataRecord.EntrustMoney);
$("#WinningMoney_EDIT").val(dataRecord.WinningMoney);
$("#WinningCompany_EDIT").val(dataRecord.WinningCompany);
$("#ChargeRate_EDIT").val(dataRecord.ChargeRate);
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
            300.0
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
{ProjectId:$("#ProjectId_EDIT").val()
,PackageNumber:$("#PackageNumber_EDIT").val()
,PackageName:$("#PackageName_EDIT").val()
,StateId:$("#StateId_EDIT").val()
,SigningDate:$("#SigningDate_EDIT").val()
,MakeOutDate:$("#MakeOutDate_EDIT").val()
,EntrustMoney:$("#EntrustMoney_EDIT").val()
,WinningMoney:$("#WinningMoney_EDIT").val()
,WinningCompany:$("#WinningCompany_EDIT").val()
,ChargeRate:$("#ChargeRate_EDIT").val()
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
            $("#popupWindow_ADD").jqxWindow({ width: 350, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
            $("#Cancel_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").click(function () {
               var row = 
//******** ADD_ROW_CONTENT_SAVE START*****************//
{ProjectId:$("#ProjectId_ADD").val()
,PackageNumber:$("#PackageNumber_ADD").val()
,PackageName:$("#PackageName_ADD").val()
,StateId:$("#StateId_ADD").val()
,SigningDate:$("#SigningDate_ADD").val()
,MakeOutDate:$("#MakeOutDate_ADD").val()
,EntrustMoney:$("#EntrustMoney_ADD").val()
,WinningMoney:$("#WinningMoney_ADD").val()
,WinningCompany:$("#WinningCompany_ADD").val()
,ChargeRate:$("#ChargeRate_ADD").val()
,Note:$("#Note_ADD").val()
,CreationDate:$("#CreationDate_ADD").val()
,IsDelete:$("#IsDelete_ADD").val()
}
//******** ADD_ROW_CONTENT_SAVE START*****************//
               var datarow = row;
               
//               $.ajax({
//            	   type: "POST",
//            	   contentType:"pplication/x-www-form-urlencoded; charset=utf-8",
//            	   url: "/bidding/default/insert?table=ProjectPackage",
//            	   data: datarow,
//            	   dataType:"json",
//            	   success: function(result){
//            		   $("#jqxgrid").jqxGrid('addrow', null, result, 'first');
//            	   }
//            	   });             
               $.post("/bidding/default/insert?table=ProjectPackage",datarow,function(result){
            	   $("#jqxgrid").jqxGrid('addrow', null, result, 'first');
            	},'json');
               $("#popupWindow_ADD").jqxWindow('hide');
            });
        });