
function InitEditProjectPage(project){
	$("#jqxExpander").jqxExpander({width: '100%', toggleMode: 'dblclick'});
	
	$("#EditProject_ProjectCode").addClass('jqx-input')
	$("#EditProject_ProjectCode").width(200)
	$("#EditProject_ProjectCode").height(25)
	$("#EditProject_ProjectCode").val(project.ProjectCodeId)
	$("#EditProject_ProjectCode").jqxInput({disabled: true });
	//填写项目名称
	$("#EditProject_ProjectName").addClass('jqx-input')
	$("#EditProject_ProjectName").width(200)
	$("#EditProject_ProjectName").height(25)
	$("#EditProject_ProjectName").val(project.ProjectName)
	$("#EditProject_ProjectName").jqxInput({disabled: true });
	//采购单位
    BindCustomer("#EditProject_Customer",project)
	//项目类型
	BindProjectType("#EditProject_ProjectType",project);
	//采购类型
	BindPurchaseStyle("#EditProject_PurchaseStyle",project)
	//	项目来源
	BindProjectSource("#EditProject_ProjectSource",project)
	//项目资金来源
   BindFundingSource("#EditProject_FundingSource",project)
    //项目负责人
   BindEmployee("#EditProject_Employee",project)
   //协助人
   BindEmployee("#EditProject_Assistant",project)
   //项目状态
   BindProjectStatus("#EditProject_ProjectStatus",project)
	//项目创建时间
	$("#EditProject_CreationDate").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
	
	$("#EditProject_Save").jqxButton({template:'success'});
	$("#EditProject_Save").click(function () {

	});
	$("#EditProject_Cancel").jqxButton({template:'warning'});
	$("#EditProject_Cancel").click(function () {

	});
	$("#EditProject_Return").jqxButton({template:'danger'});
	$("#EditProject_Return").click(function () {
		window.location="http://127.0.0.1:8000/bidding/default/ProjectMangement.html"
	});
}

function InitProjectPackageGid(project){
	    var url = "/bidding/default/SelectPackagesByProjectId?id="+project.Id
		var source =
		{
		    dataFields: [{"name":"Id","type":"string"},{"name":"ProjectId","type":"string"},{"name":"PackageNumber","type":"string"},{"name":"PackageName","type":"string"},{"name":"StateId","type":"string"},{"name":"SigningDate","type":"string"},{"name":"MakeOutDate","type":"string"},{"name":"EntrustMoney","type":"string"},{"name":"WinningMoney","type":"string"},{"name":"WinningCompany","type":"string"},{"name":"ChargeRate","type":"string"},{"name":"Note","type":"string"},{"name":"CreationDate","type":"string"},{"name":"IsDelete","type":"string"}],
		    dataType: "json",
		    url: url,
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
		    	var dataRecord = $("#EditProject_PackageTable").jqxDataTable('getrowdata', rowid);
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
		var projectPackageurldataAdapter = new $.jqx.dataAdapter(source, {
			loadComplete: function () {
		        // data is loaded.
		    }
		});
		var projectPackage_columns_content  = 
			[ {"datafield":"PackageNumber","text":"\u5305\u7f16\u53f7", width: '14%', cellsalign: 'center', align: 'center'},
			 {"datafield":"PackageName","text":"\u5305\u540d\u79f0", width:  '11%', cellsalign: 'center', align: 'center'},
			 {"datafield":"StateId","text":"\u5305\u72b6\u6001", width:  '11%', cellsalign: 'center', align: 'center'},
			 {"datafield":"SigningDate","text":"\u7b7e\u7ea6\u65e5\u671f", width:  '11%', cellsalign: 'center', align: 'center'},
			 {"datafield":"MakeOutDate","text":"\u5f00\u7968\u65e5\u671f", width:  '11%', cellsalign: 'center', align: 'center'},
			 {"datafield":"EntrustMoney","text":"\u59d4\u6258\u91d1\u989d", width:  '11%', cellsalign: 'center', align: 'center'},
			 {"datafield":"WinningMoney","text":"\u4e2d\u6807\u91d1\u989d", width:  '11%', cellsalign: 'center', align: 'center'},
			 {"datafield":"WinningCompany","text":"\u4e2d\u6807\u5355\u4f4d", width:  '10%', cellsalign: 'center', align: 'center'},
			 {"datafield":"ChargeRate","text":"\u670d\u52a1\u8d39\u7387", width: '10%', cellsalign: 'center', align: 'center'}]
		$("#EditProject_PackageTable").jqxDataTable(
		        {
		            width: "99%",
		            height: 300,
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
		                $("#EditProject_PackageTable").on('rowSelect', function (event) {
		                    var args = event.args;
		                    rowIndex = args.index;
		                    updateButtons('Select');
		                });
		                $("#EditProject_PackageTable").on('rowUnselect', function (event) {
		                    updateButtons('Unselect');
		                });
		                $("#EditProject_PackageTable").on('rowEndEdit', function (event) {
		                    updateButtons('End Edit');
		                });
		                $("#EditProject_PackageTable").on('rowBeginEdit', function (event) {
		                    updateButtons('Edit');
		                });
		                addButton.click(function (event) {
		                    if (!addButton.jqxButton('disabled')) {
		                    	num="-01"
		                    	$("#PackageNumber_ADD").jqxInput('val',$("#EditProject_ProjectCode").jqxInput('val')+num);
		                    	$("#popupWindow_PackageADD").jqxWindow('show');
		                        updateButtons('add');
		                    }
		                });
		                cancelButton.click(function (event) {
		                    if (!cancelButton.jqxButton('disabled')) {
		                        // cancel changes.
		                        $("#EditProject_PackageTable").jqxDataTable('endRowEdit', rowIndex, true);
		                    }
		                });
		                updateButton.click(function (event) {
		                    if (!updateButton.jqxButton('disabled')) {
		                        // save changes.
		                    	
		                        $("#EditProject_PackageTable").jqxDataTable('endRowEdit', rowIndex, false);
		                    }
		                });
		                editButton.click(function () {
		                    if (!editButton.jqxButton('disabled')) {
		                        $("#EditProject_PackageTable").jqxDataTable('beginRowEdit', rowIndex);
		                        updateButtons('edit');
		                    }
		                });
		                deleteButton.click(function () {
		                    if (!deleteButton.jqxButton('disabled')) {
		                        $("#EditProject_PackageTable").jqxDataTable('deleteRow', rowIndex);
		                        updateButtons('delete');
		                    }
		                });
		            },
		            columns: projectPackage_columns_content
		        });
}

function InitNewPackageWindow(project){
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
	BindProjectStatus("#StateIdPackage_ADD")
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
    		,PackageName:$("#PackageName_ADD").val()
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
			$("#popupWindow_PackageADD").jqxGrid('addrow', null, result, 'first');
		},'json');
		$("#popupWindow_PackageADD").jqxWindow('hide');
	});
}

$(document).ready(function () {
	var project = JSON.parse($("#ProjectData").text())[0]
	InitEditProjectPage(project);
    InitProjectPackageGid(project);
    InitNewPackageWindow(project);
});