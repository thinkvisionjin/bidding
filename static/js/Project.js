
function InitProjectPackageGid(){
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
			[ {"datafield":"PackageNumber","text":"\u5305\u7f16\u53f7", width: 100, cellsalign: 'center', align: 'center'},
			 {"datafield":"PackageName","text":"\u5305\u540d\u79f0", width: 100, cellsalign: 'center', align: 'center'},
			 {"datafield":"StateId","text":"\u5305\u72b6\u6001", width: 60, cellsalign: 'center', align: 'center'},
			 {"datafield":"SigningDate","text":"\u7b7e\u7ea6\u65e5\u671f", width: 100, cellsalign: 'center', align: 'center'},
			 {"datafield":"MakeOutDate","text":"\u5f00\u7968\u65e5\u671f", width: 80, cellsalign: 'center', align: 'center'},
			 {"datafield":"EntrustMoney","text":"\u59d4\u6258\u91d1\u989d", width: 80, cellsalign: 'center', align: 'center'},
			 {"datafield":"WinningMoney","text":"\u4e2d\u6807\u91d1\u989d", width: 80, cellsalign: 'center', align: 'center'},
			 {"datafield":"WinningCompany","text":"\u4e2d\u6807\u5355\u4f4d", width: 100, cellsalign: 'center', align: 'center'},
			 {"datafield":"ChargeRate","text":"\u670d\u52a1\u8d39\u7387", width: 60, cellsalign: 'center', align: 'center'}]
		$("#Package_ADD").jqxDataTable(
		        {
		            width: 780,
		            height: 200,
		            source: projectPackageurldataAdapter,
		           // pageable: true,
		            editable: true,
		            autoRowHeight: false,
		            showToolbar: true,
		           // altRows: true,
		            ready: function()
		            {
		                // called when the DataTable is loaded.         
		            },
		          //  pagerButtonsCount: 8,
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
//		                        // add new empty row.
//		                        $("#Package_ADD").jqxDataTable('addRow', null, {}, 'first');
//		                        // select the first row and clear the selection.
//		                        $("#Package_ADD").jqxDataTable('clearSelection');
//		                        $("#Package_ADD").jqxDataTable('selectRow', 0);
//		                        // edit the new row.
//		                        $("#Package_ADD").jqxDataTable('beginRowEdit', 0);
		                    	//自动设置PackageNumber_ADD编号
		                    	var num ='01';
		                    	$("#PackageNumber_ADD").jqxInput('val',$("#ProjectCodeId_ADD").jqxDropDownList('getSelectedItem').label+'-'+num);
		                    	$("#popupWindow_PackageADD").jqxWindow('show');
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
}

function initrowdetails (index, parentElement, gridElement, record) {
	var nestedGrids = new Array();
    var id = record.uid.toString();
    var grid = $($(parentElement).children()[0]);
    nestedGrids[index] = grid;
    var filtergroup = new $.jqx.filter();
    var filter_or_operator = 1;
    var filtervalue = id;
    var filtercondition = 'equal';
    var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
    // fill the orders depending on the id.
    var ordersbyid = [];
    for (var m = 0; m < projects_record.length; m++) {
        var result = filter.evaluate(projects_record[m]["Id"]);
        if (result)
            ordersbyid.push(projects_record[m]);
    }
    var source = { 
    	id: 'Id',
        dataFields: [{"name":"Id","type":"string"},{"name":"ProjectId","type":"string"},{"name":"PackageNumber","type":"string"},{"name":"PackageName","type":"string"},{"name":"StateId","type":"string"},{"name":"SigningDate","type":"string"},{"name":"MakeOutDate","type":"string"},{"name":"EntrustMoney","type":"string"},{"name":"WinningMoney","type":"string"},{"name":"WinningCompany","type":"string"},{"name":"ChargeRate","type":"string"},{"name":"Note","type":"string"},{"name":"CreationDate","type":"string"},{"name":"IsDelete","type":"string"}],
        dataType: "json",
        url: "/bidding/default/select?table=ProjectPackage",
    }
    var nestedGridAdapter = new $.jqx.dataAdapter(source, {
		loadComplete: function () {
	        // data is loaded.
//			$($('#jqxGrid').children()[0]).jqxGrid('autoresizecolumns'); 
	    }
	});
    var columns_content  = [ {"datafield":"PackageNumber","text":"\u5305\u7f16\u53f7", width: 180, cellsalign: 'center', align: 'center'},
                			 {"datafield":"PackageName","text":"\u5305\u540d\u79f0", width: 100, cellsalign: 'center', align: 'center'},
                			 {"datafield":"StateId","text":"\u5305\u72b6\u6001", width: 60, cellsalign: 'center', align: 'center'},
                			 {"datafield":"SigningDate","text":"\u7b7e\u7ea6\u65e5\u671f", width: 150, cellsalign: 'center', align: 'center'},
                			 {"datafield":"MakeOutDate","text":"\u5f00\u7968\u65e5\u671f", width: 150, cellsalign: 'center', align: 'center'},
                			 {"datafield":"EntrustMoney","text":"\u59d4\u6258\u91d1\u989d", width: 60, cellsalign: 'center', align: 'center'},
                			 {"datafield":"WinningMoney","text":"\u4e2d\u6807\u91d1\u989d", width: 60, cellsalign: 'center', align: 'center'},
                			 {"datafield":"WinningCompany","text":"\u4e2d\u6807\u5355\u4f4d", width: 100, cellsalign: 'center', align: 'center'},
                			 {"datafield":"ChargeRate","text":"\u670d\u52a1\u8d39\u7387", width: 60, cellsalign: 'center', align: 'center'}]
    if (grid != null) {
        grid.jqxGrid({
            source: nestedGridAdapter, width: 920, height: 171,
            columns:columns_content,
            columnsautoresize: true
        });
    }
}

function InitMainGrid(){
	var datafields_content = [{"name":"Id","type":"string"},{"name":"ProtocolCodeId","type":"string"},{"name":"ProjectCodeId","type":"string"},{"name":"ProjectName","type":"string"},{"name":"BuyerId","type":"string"},{"name":"EmployeeId","type":"string"},{"name":"Assistant","type":"string"},{"name":"ProjectSourceId","type":"string"},{"name":"SourcesOfFundingId","type":"string"},{"name":"ProjectTypeId","type":"string"},{"name":"ManagementStyleId","type":"string"},{"name":"StateId","type":"string"},{"name":"Note","type":"string"},{"name":"CreationDate","type":"string"},{"name":"IsDelete","type":"string"}]
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
    var dataAdapter = new $.jqx.dataAdapter(source);
    var editrow = -1;
    var columns_content  =[{"datafield":"Id","text":"\u5e8f\u53f7",width: 40, cellsalign: 'center', align: 'center'},
                           {"datafield":"ProtocolCodeId","text":"\u534f\u8bae\u5e8f\u53f7", width: 60, cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectCodeId","text":"\u9879\u76ee\u5e8f\u53f7", width: 60, cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectName","text":"\u9879\u76ee\u540d\u79f0", width: 220, cellsalign: 'center', align: 'center'},
                           {"datafield":"BuyerId","text":"\u91c7\u8d2d\u5355\u4f4d", width: 60, cellsalign: 'center', align: 'center'},
                           {"datafield":"EmployeeId","text":"\u6240\u6709\u8005", width: 60, cellsalign: 'center', align: 'center'},
                           {"datafield":"Assistant","text":"\u534f\u52a9\u4eba", width: 60, cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectSourceId","text":"\u9879\u76ee\u6765\u6e90", width: 70, cellsalign: 'center', align: 'center'},
                           {"datafield":"SourcesOfFundingId","text":"\u8d44\u91d1\u6765\u6e90", width: 70, cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectTypeId","text":"\u9879\u76ee\u7c7b\u578b", width: 80, cellsalign: 'center', align: 'center'},
                           {"datafield":"ManagementStyleId","text":"\u7ba1\u7406\u65b9\u5f0f", width: 80, cellsalign: 'center', align: 'center'},
                           {"datafield":"StateId","text":"\u9879\u76ee\u72b6\u6001", width: 70, cellsalign: 'center', align: 'center'},
                           {"datafield":"CreationDate","text":"\u521b\u5efa\u65e5\u671f", width: 150, cellsalign: 'center', align: 'center'}]            
    var outerDataAdapter = new $.jqx.dataAdapter(source, { autoBind: true });
    projects_record = outerDataAdapter.records;
    $("#jqxgrid").jqxGrid(
    {
        width: '100%',
        source: dataAdapter,
        pageable: true,
        autoheight: true,
        rowdetails: true,
        rowsheight: 35,
        initrowdetails: initrowdetails,
        rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true },
        ready: function () {
            $("#jqxgrid").jqxGrid('showrowdetails', 0);
        },
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
            var container = $("<div style='margin: 5px;'></div>");
//            var searchArea = $("#searchArea")
            var printButton = $("<div style='float: left; margin-left: 30%;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
            var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
            var searchButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>查询</span></div>");

//            var printButton = $('<input style="margin-left: 5px;" id="addrowbutton" type="button" value="新增" />');
//            var exportButton = $('<input style="margin-left: 5px;" id="deleterowbutton" type="button" value="删除" />');
//            var searchButton = $('<input style="margin-left: 5px;" id="updaterowbutton" type="button" value="修改" />');
            
            toolbar.append(container);
//            container.append(searchArea);
            container.append(printButton);
            container.append(exportButton);
            container.append(searchButton);
            
            printButton.jqxButton({   });
            exportButton.jqxButton({   });
            searchButton.jqxButton({   });
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
}

function InitSearchArea(){
	ProjectName_SEARCH()
	BuyerId_SEARCH()
	ProjectSourceId_SEARCH()
	SourcesOfFundingId_SEARCH()
	ManagementStyleId_SEARCH()
	ProjectTypeId_SEARCH()
	EmployeeId_SEARCH()
	Assistant_SEARCH()
	StateId_SEARCH()
}


function InitEditWindow(){
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
}


function InitADDNewPackageWindow(){
	$("#PackageNumber_ADD").jqxInput({width: '200px',height: "25px"});
	$("#PackageName_ADD").jqxInput({width: '200px',height: "25px"});
	$("#SigningDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
	$("#MakeOutDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
	$("#EntrustMoney_ADD").jqxNumberInput({ width: '200px', height: '25px', spinButtons: true });
	$("#WinningMoney_ADD").jqxNumberInput({ width: '200px', height: '25px', spinButtons: true });
	$("#WinningCompany_ADD").jqxInput({width: '200px',height: "25px"});
	$("#ChargeRate_ADD").jqxInput({width: '200px',height: "25px"});
	$("#ChargeRate_ADD").jqxNumberInput({ width: '200px', height: '25px', digits: 3, symbolPosition: 'right', symbol: '%', spinButtons: true });
	$('#NotePackage_ADD').jqxEditor({height: "200px", width: '492px'});
	StateIdPackage_ADD()
	//initialize the popup add window and buttons.
    $("#popupWindow_PackageADD").jqxWindow({ width:595, maxHeight: 850,resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
    $("#CancelPackage_ADD").jqxButton({ theme: theme });
    $("#CancelPackage_ADD").click(function () {
    	$("#popupWindow_PackageADD").jqxWindow('hide');
    });
    $("#SavePackage_ADD").jqxButton({ theme: theme, template:"success"  });
    $("#SavePackage_ADD").click(function () {
    	var row=
    	  {  ProjectId:$("#ProjectId_ADD").val()
    		,PackageNumber:$("#PackageNumber_ADD").val()
    		,PackageName:encodeURIComponent(encodeURIComponent($("#PackageName_ADD").val()))
    		,StateId:$("#StateIdPackage_ADD").val()
    		,SigningDate:$("#SigningDate_ADD").val()
    		,MakeOutDate:$("#MakeOutDate_ADD").val()
    		,EntrustMoney:$("#EntrustMoney_ADD").val()
    		,WinningMoney:$("#WinningMoney_ADD").val()
    		,WinningCompany:$("#WinningCompany_ADD").val()
    		,ChargeRate:$("#ChargeRate_ADD").val()
    		,Note:$("#NotPackagee_ADD").val()
    		,CreationDate:''
    		,IsDelete:0
    		}
		var datarow = row;
		$.post("/bidding/default/insert?table=ProjectPackage",datarow,function(result){
			$("#Package_ADD").jqxGrid('addrow', null, result, 'first');
		},'json');
		$("#popupWindow_PackageADD").jqxWindow('hide');
	});
}

function InitAddNewProjectWindow(){
	//协议编号
	ProtocolCodeId_ADD()
	//项目编号
	ProjectCodeId_ADD()
	//项目名称
	$("#ProjectName_ADD").addClass('jqx-input')
	$("#ProjectName_ADD").width(200)
	$("#ProjectName_ADD").height(23)
	//采购单位
	BuyerId_ADD()
	//项目负责人
	EmployeeId_ADD()
	//协助人
	Assistant_ADD()
	//项目来源
	ProjectSourceId_ADD()
	//资金来源
	SourcesOfFundingId_ADD()
	//项目类型
	ProjectTypeId_ADD()
	//采购方式
	ManagementStyleId_ADD()
	//项目状态
	StateId_ADD()
	//项目创建时间
	$("#CreationDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
	//项目备注
//	$('#Note_ADD').jqxEditor({height: "200px", width: '780px'});
	//initialize the popup add window and buttons.
    $("#popupWindow_ADD").jqxWindow({ showCollapseButton: true,
    	width: 800, 
    	height:600,autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
    $("#Cancel_ADD").jqxButton({ theme: theme });
    $("#Cancel_ADD").click(function () {
    	$("#popupWindow_ADD").jqxWindow('hide');
    });
    $("#Save_ADD").jqxButton({ theme: theme, template:"success"  });
    $("#Save_ADD").click(function () {
		var row = {ProtocolCodeId:$("#ProtocolCodeId_ADD").val(),ProjectCodeId:$("#ProjectCodeId_ADD").val(),ProjectName:$("#ProjectName_ADD").val()
		,BuyerId:$("#BuyerId_ADD").val(),EmployeeId:$("#EmployeeId_ADD").val(),Assistant:$("#Assistant_ADD").val(),ProjectSourceId:$("#ProjectSourceId_ADD").val()
		,SourcesOfFundingId:$("#SourcesOfFundingId_ADD").val(),ProjectTypeId:$("#ProjectTypeId_ADD").val(),ManagementStyleId:$("#ManagementStyleId_ADD").val()
		,StateId:$("#StateId_ADD").val(),Note:$("#Note_ADD").val(),CreationDate:$("#CreationDate_ADD").val(),IsDelete:'0'
		}
		var datarow = row;
		$.post("/bidding/default/insert?table=Project",datarow,function(result){
			$("#jqxgrid").jqxDataTable('addrow', null, result, 'first');
		},'json');
		
		$("#popupWindow_ADD").jqxWindow('hide');
	});
}



function InitRightClickMenu(){
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
    $('#jqxgrid').jqxGrid({ });
    // initialize the popup edit window and buttons.
    $("#popupWindow_EDIT").jqxWindow({ width: 350, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel_EDIT"), modalOpacity: 0.01 });
    $("#Cancel_EDIT").jqxButton({ theme: theme });
    $("#Save_EDIT").jqxButton({ theme: theme, template:"success" });
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
}


$(document).ready(function () {
	InitSearchArea();
	InitEditWindow();
	InitMainGrid();
	InitAddNewProjectWindow();
    InitProjectPackageGid();
    InitADDNewPackageWindow();
    InitRightClickMenu();
});