$(document).ready(function () {
            // prepare the data
            var datafields_content =  
//********DATAFIELDS START******************//
[{"name":"Id","type":"string"},{"name":"ProtocolNumber","type":"string"},{"name":"TypeId","type":"string"},{"name":"EmployeeId","type":"string"},{"name":"CreationTime","type":"string"},{"name":"IsDelete","type":"string"}]
//********DATAFIELDS END******************//
            var data_url = "/bidding/default/select?table=ProtocolCode"
            var source =
            {
                url: data_url,
                datatype: "json",
                datafields:datafields_content,
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                $.post("/bidding/default/update?table=ProtocolCode",rowdata,function(result){
                		 alert("操作成功！");
                	 });
                    commit(true);
                },
                deleterow: function (rowid, commit) {
                    // synchronize with the server - send delete command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                	var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
                	$.post("/bidding/default/delete?table=ProtocolCode",dataRecord,function(result){
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

ProtocolNumber_SEARCH()

ProtocolType_SEARCH()

EmployeeId_SEARCH();

$("#CreationTime_SEARCH").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });

$("#IsDelete_SEARCH").jqxCheckBox({ width: 120, height: 25, checked: true});
            $("#IsDelete_SEARCH").on('change', function (event) {
                var checked = event.args.checked;
                if (checked) {
                   
                }
                else {
                    
                }
            });
            
$("#ProtocolNumber_EDIT").addClass('jqx-input')
$("#ProtocolNumber_EDIT").width(150)
$("#ProtocolNumber_EDIT").height(23)
$("#TypeId_EDIT").addClass('jqx-input')
$("#TypeId_EDIT").width(150)
$("#TypeId_EDIT").height(23)
$("#EmployeeId_EDIT").addClass('jqx-input')
$("#EmployeeId_EDIT").width(150)
$("#EmployeeId_EDIT").height(23)
$("#CreationTime_EDIT").addClass('jqx-input')
$("#CreationTime_EDIT").width(150)
$("#CreationTime_EDIT").height(23)
$("#IsDelete_EDIT").addClass('jqx-input')
$("#IsDelete_EDIT").width(150)
$("#IsDelete_EDIT").height(23)

ProtocolType_ADD()
$("#ProtocolNumber_ADD").addClass('jqx-input')
$("#ProtocolNumber_ADD").width(200)
$("#ProtocolNumber_ADD").height(23)
$('#ProtocolNumber_ADD').val('SPMCEC-160001')



//********INIT_INPUT_FIELDS END******************//
            var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            // initialize jqxGrid
            var columns_content  = 
//********COLUMNS_CONTENT START******************//
[{"datafield":"Id","text":"\u5e8f\u53f7"},
 {"datafield":"ProtocolNumber","text":"\u534f\u8bae\u7f16\u53f7"},
 {"datafield":"TypeId","text":"\u7c7b\u578b\u7f16\u53f7"},
 {"datafield":"EmployeeId","text":"\u5458\u5de5\u7f16\u53f7"},
 {"datafield":"CreationTime","text":"\u521b\u5efa\u65e5\u671f"}]            
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
                    	searchContent = "";
                    	$.post("/bidding/default/select?table=ProtocolCode",searchContent,function(result){
                    		source['localdata'] = result
                    		dataAdapter = new $.jqx.dataAdapter(source)
                        	$("#jqxgrid").jqxGrid({ source:dataAdapter });
                      	});
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
                    	searchContent = {'TypeId':'0'}
                    	$.post("/bidding/default/select?table=ProtocolCode",searchContent,function(result){
                    		source['url'] = ''
                    		source['localdata'] = result
                    		dataAdapter = new $.jqx.dataAdapter(source)
                        	$("#jqxgrid").jqxGrid({ source:dataAdapter });
                      	});
             
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
$("#ProtocolNumber_EDIT").val(dataRecord.ProtocolNumber);
$("#TypeId_EDIT").val(dataRecord.TypeId);
$("#EmployeeId_EDIT").val(dataRecord.EmployeeId);
$("#CreationTime_EDIT").val(dataRecord.CreationTime);
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
            125.0
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
{ProtocolNumber:$("#ProtocolNumber_EDIT").val()
,TypeId:$("#TypeId_EDIT").val()
,EmployeeId:$("#EmployeeId_EDIT").val()
,CreationTime:$("#CreationTime_EDIT").val()
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
            $("#popupWindow_ADD").jqxWindow({ width: 400, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
            $("#Cancel_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").click(function () {
               var row = 
//******** ADD_ROW_CONTENT_SAVE START*****************//
{ProtocolNumber:$("#ProtocolNumber_ADD").val()
,TypeId:$("#TypeId_ADD").val()
,EmployeeId:'0001'
}
//******** ADD_ROW_CONTENT_SAVE START*****************//
               var datarow = row;
               $.post("/bidding/default/insert?table=ProtocolCode",datarow,function(result){
            	   $("#jqxgrid").jqxGrid('addrow', null, result, 'first');
            	},'json');
               $("#popupWindow_ADD").jqxWindow('hide');
            });
        });