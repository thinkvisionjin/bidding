


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

function InitProjectGrid(){
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
    var columns_content  =[{"datafield":"Id","text":"序号",width: "3%", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectCodeId","text":"项目编号", width: "12%", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectName","text":"项目名称", width: "12%", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectTypeId","text":"项目类型", width: "5%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="政府采购"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"BuyerId","text":"采购单位", width: "10%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="上海市民政局"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"EmployeeId","text":"负责人", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="汤姆逊"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"Assistant","text":"协助人", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="汤姆逊"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"ProjectSourceId","text":"项目来源", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="自有项目"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"SourcesOfFundingId","text":"资金来源", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="中央投资"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"ManagementStyleId","text":"管理方式", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="招标公告"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"StateId","text":"项目状态", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
//                        		   content = findDataFieldContentByValue(datafield,value);
                   		   		   content ="招标公告"
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ content+' </div>'
                               }},
                           {"datafield":"CreationDate","text":"创建日期", width: "7%", cellsalign: 'center', align: 'center'},
                           {
                               text: '操作', editable: false, datafield: 'edit',width: "9%", cellsalign: 'center', align: 'center',
                               cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                            	   
                               var a = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="http://127.0.0.1:8000/bidding/default/EditProject?id='+rowdata.Id + '">详细</a>';
                               var b = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="http://127.0.0.1:8000/bidding/default/ViewProject?id='+rowdata.Id + '">修改</a>';
                               var c = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="http://127.0.0.1:8000/bidding/default/EditProject?id='+rowdata.Id + '">删除</a>';
                               var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+a+b+c+'</div>';
                               return d;
                               }
                             }]            
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
//        initrowdetails: initrowdetails,
//        rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true },
//        ready: function () {
//            $("#jqxgrid").jqxGrid('showrowdetails', 0);
//        },
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
            	$("#popupWindow_NewProject").jqxWindow('show');
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
            var printButton = $("<div style='float: left; margin-left: 30%;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
            var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
            var searchButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>查询</span></div>");
            toolbar.append(container);
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
	BindProjectName("#ProjectName_SEARCH")   //input 
	BindCustomer("#BuyerId_SEARCH")  //dropdownlist
	BindProjectType("#ProjectTypeId_SEARCH")//dropdownlist
	BindProjectSource("#ProjectSourceId_SEARCH")//dropdownlist
	BindFundingSource("#SourcesOfFundingId_SEARCH")//dropdownlist
	BindManagementStyle("#ManagementStyleId_SEARCH")//dropdownlist
	BindEmployee("#EmployeeId_SEARCH",true)//dropdownlist
	BindEmployee("#Assistant_SEARCH",false)//dropdownlist
	BindProjectStatus("#StateId_SEARCH")//dropdownlist
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

function InitNewProjectWindow(){	
	//填写项目名称
	$("#NewProject_ProjectName").addClass('jqx-input')
	$("#NewProject_ProjectName").width(200)
	$("#NewProject_ProjectName").height(23)
	//采购单位
    BindCustomer("#NewProject_Customer")
	//项目类型
	BindProjectType("#NewProject_ProjectType");
	//采购类型
	BindPurchaseStyle("#NewProject_PurchaseStyle")
	//	项目来源
	BindProjectSource("#NewProject_ProjectSource")
	//项目资金来源
   BindFundingSource("#NewProject_FundingSource")
    //项目负责人
   BindEmployee("#NewProject_Employee")
   //协助人
   BindEmployee("#NewProject_Assistant")
   //项目状态
   BindProjectStatus("#NewProject_ProjectStatus")
	//项目创建时间
	$("#NewProject_CreationDate").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
    
	//初始化整个Window
	$("#popupWindow_NewProject").jqxWindow({ showCollapseButton: true,
    	width: 600, 
    	height:400,autoOpen: false, cancelButton: $("#NewProject_Cancel"), modalOpacity: 0.01 });    
	$("#NewProject_Cancel").jqxButton({ theme: theme });
    $("#NewProject_Cance").click(function () {
    	$("#popupWindow_NewProject").jqxWindow('hide');
    });
    $("#NewProject_Save").jqxButton({ theme: theme, template:"success"  });
    $("#NewProject_Save").click(function () {
		//添加成功后弹出项目编号创建成功的界面，告知操作人员项目已添加了
		var row = {ProjectName:$("#NewProject_ProjectName").val()
		,BuyerId:$("#NewProject_Customer").val(),EmployeeId:$("#NewProject_Employee").val(),Assistant:$("#NewProject_Assistant").val(),ProjectSourceId:$("#NewProject_ProjectSource").val()
		,SourcesOfFundingId:$("#NewProject_FundingSource").val(),ProjectTypeId:$("#NewProject_ProjectType").val(),ManagementStyleId:$("#NewProject_ManagementStyle").val()
		,StateId:$("#NewProject_ProjectStatus").val(),CreationDate:$("#NewProject_CreationDate").val(),IsDelete:'0'
		}
		var datarow = row;
		$("#popupWindow_GeneratingProjectCode").jqxWindow('show');
		$.post("/bidding/default/insert?table=Project",datarow,function(result){
			$("#jqxgrid").jqxDataTable('addrow', null, result, 'first');
			var label = "000100010001"
			$("#GeneratingProjectCode_Information").innerHTML("项目档案创建成功！你的项目编号为："+label);
		},'json');
		
		$("#popupWindow_NewProject").jqxWindow('hide');
	});
}

function InitGenerateProjectCodeWindow(){
	//初始化窗体内的组建
	//项目类型
	BindProjectType("#GenerateProjectCode_ProjectType");
	//项目管理类型
	BindManagementStyle("#GenerateProjectCode_ManagementStyle");
	//采购类型
	BindPurchaseStyle("#GenerateProjectCode_PurchaseStyle")
	//是否为流标项目再招标
	$("#GenerateProjectCode_CheckReBidding").jqxCheckBox({ width: 120, height: 25, checked: true});
    $("#GenerateProjectCode_CheckReBidding").on('change', function (event) {
        var checked = event.args.checked;
        if (checked) {      
        }
        else {
        }
    });
	$("#popupWindow_GenerateProjectCode").jqxWindow({ showCollapseButton: true,width: 800, 	height:600,autoOpen: false, cancelButton: $("#GenerateProjectCode_Cancel"), modalOpacity: 0.01 });
    $("#GenerateProjectCode_Cancel").jqxButton({ theme: theme });
    $("#GenerateProjectCode_Cance").click(function () {
    	$("#popupWindow_GenerateProjectCode").jqxWindow('hide');
    });
    $("#GenerateProjectCode_Save").jqxButton({ theme: theme, template:"success"  });
    $("#GenerateProjectCode_Save").click(function () {
//		var row = {ProtocolCodeId:$("#NewProject_ProtocolCodeId").val(),ProjectCodeId:$("#NewProject_ProjectCodeId").val(),ProjectName:$("#NewProject_ProjectName").val()
//		,BuyerId:$("#NewProject_BuyerId").val(),EmployeeId:$("#NewProject_EmployeeId").val(),Assistant:$("#NewProject_Assistant").val(),ProjectSourceId:$("#NewProject_ProjectSourceId").val()
//		,SourcesOfFundingId:$("#NewProject_SourcesOfFundingId").val(),ProjectTypeId:$("#NewProject_ProjectTypeId").val(),ManagementStyleId:$("#NewProject_ManagementStyleId").val()
//		,StateId:$("#NewProject_StateId").val(),CreationDate:$("#NewProject_CreationDate").val(),IsDelete:'0'
//		}
//		var datarow = row;
//		$.post("/bidding/default/insert?table=Project",datarow,function(result){
//			$("#jqxgrid").jqxDataTable('addrow', null, result, 'first');
//		},'json');
		$("#popupWindow_GenerateProjectCode").jqxWindow('hide');
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


function InitGeneratingProjectWindow(){
	$("#popupWindow_GeneratingProjectCode").jqxWindow({ showCollapseButton: true,	
		width: 200, height:120,autoOpen: false,
		modalOpacity: 0.01 });
}

$(document).ready(function () {
	InitSearchArea();
	InitProjectGrid();
	InitNewProjectWindow();
	InitGeneratingProjectWindow();
});
