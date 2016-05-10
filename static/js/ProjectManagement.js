
function InitProjectGrid(){
	var datafields_content = [
	                          {"name":"Id","type":"string"},
	                          {"name":"ProtocolCodeId","type":"string"},
	                          {"name":"ProjectCode","type":"string"},
	                          {"name":"ProjectName","type":"string"},
	                          {"name":"CustomerId","type":"string"},
	                          {"name":"EmployeeId","type":"string"},
	                          {"name":"Assistant","type":"string"},
	                          {"name":"ProjectSourceId","type":"string"},
	                          {"name":"FundingSourceId","type":"string"},
	                          {"name":"ProjectTypeId","type":"string"},
	                          {"name":"ManagementStyleId","type":"string"},
	                          {"name":"PurchaseStyleId","type":"string"},
	                          {"name":"ProjectStatusId","type":"string"},
	                          {"name":"Note","type":"string"},
	                          {"name":"CreationDate","type":"string"},
	                          {"name":"IsDelete","type":"string"}]
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
                           {"datafield":"ProjectCode","text":"项目编号", width: "10%", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectName","text":"项目名称", width: "10%", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectTypeId","text":"项目类型", width: "5%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		  var item =  $("#ProjectTypeId_SEARCH").jqxDropDownList('getItemByValue', value);
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"CustomerId","text":"采购单位", width: "9%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var item =  $("#BuyerId_SEARCH").jqxDropDownList('getItemByValue', value);
                    		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"EmployeeId","text":"负责人", width: "6%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var item =  $("#EmployeeId_SEARCH").jqxDropDownList('getItemByValue', value);
                       		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"Assistant","text":"协助人", width: "6%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var item =  $("#Assistant_SEARCH").jqxDropDownList('getItemByValue', value);
                          		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"ProjectSourceId","text":"项目来源", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var item =  $("#ProjectSourceId_SEARCH").jqxDropDownList('getItemByValue', value);
                         		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"FundingSourceId","text":"资金来源", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var item =  $("#SourcesOfFundingId_SEARCH").jqxDropDownList('getItemByValue', value);
                         		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"ManagementStyleId","text":"管理方式", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var item =  $("#ManagementStyleId_SEARCH").jqxDropDownList('getItemByValue', value);
                         		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"PurchaseStyleId","text":"采购方式", width: "7%", cellsalign: 'center', align: 'center',
                            	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                            		   var item =  $("#PurchaseStyleId_SEARCH").jqxDropDownList('getItemByValue', value);
                             		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                                }},
                           {"datafield":"ProjectStatusId","text":"项目状态", width: "7%", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var item =  $("#StateId_SEARCH").jqxDropDownList('getItemByValue', value);
                         		   	return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ item.label+' </div>'
                               }},
                           {"datafield":"CreationDate","text":"创建日期", width: "7%", cellsalign: 'center', align: 'center'},
                           {
                               text: '操作', editable: false, datafield: 'edit',width: "9%", cellsalign: 'center', align: 'center',
                               cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                               var a = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="http://127.0.0.1:8000/bidding/default/ViewProject?id='+rowdata.Id + '">详细</a>';
                               var b = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="http://127.0.0.1:8000/bidding/default/EditProject?id='+rowdata.Id + '">修改</a>';
//                               var c = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn">删除</a>';
                               var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+a+b+'</div>';
                               return d;
                               }
                             }]            
    var outerDataAdapter = new $.jqx.dataAdapter(source, { autoBind: true });
    projects_record = outerDataAdapter.records;
    $("#jqxgrid").jqxGrid(
    {
        width: '100%',
        height: 500,
        source: dataAdapter,
        pageable: true,
        
        rowdetails: true,
        rowsheight: 35,
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
	BindPurchaseStyle("#PurchaseStyleId_SEARCH")
	BindEmployee("#EmployeeId_SEARCH",true)//dropdownlist
	BindAssitant("#Assistant_SEARCH",false)//dropdownlist
	BindProjectStatus("#StateId_SEARCH")//dropdownlist
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
	//管理方式
	BindManagementStyle("#NewProject_ManagementStyle")
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
	//初始化创建项目的loader
	$("#Loader_CreatingNewProject").jqxLoader({ width: 100, height: 60, imagePosition: 'top' });
	//初始化整个Window
	$("#popupWindow_NewProject").jqxWindow({ showCollapseButton: true,
    	width: 750, 
    	height:450,autoOpen: false, cancelButton: $("#NewProject_Cancel"), modalOpacity: 0.01 });    
	$("#NewProject_Cancel").jqxButton({ theme: theme });
    $("#NewProject_Cance").click(function () {
    	$("#popupWindow_NewProject").jqxWindow('hide');
    });
    $("#NewProject_Save").jqxButton({ theme: theme, template:"success"  });
    $("#NewProject_Save").click(function () {
		//添加成功后弹出项目编号创建成功的界面，告知操作人员项目已添加了
		var row = {ProjectName:$("#NewProject_ProjectName").val()
		,CustomerId:$("#NewProject_Customer").val(),EmployeeId:$("#NewProject_Employee").val(),Assistant:$("#NewProject_Assistant").val(),ProjectSourceId:$("#NewProject_ProjectSource").val()
		,FundingSourceId:$("#NewProject_FundingSource").val(),ProjectTypeId:$("#NewProject_ProjectType").val(),ManagementStyleId:$("#NewProject_ManagementStyle").val(),PurchaseStyleId:$("#NewProject_PurchaseStyle").val()
		,ProjectStatusId:$("#NewProject_ProjectStatus").val(),CreationDate:$("#NewProject_CreationDate").val(),IsDelete:'0'
		}
		var datarow = row;
		$("#Loader_CreatingNewProject").jqxLoader('open');
		$.post("/bidding/default/CreateNewProject",datarow,function(result){
			$("#jqxgrid").jqxGrid('addrow', null, result, 'first');
			$('#Loader_CreatingNewProject').jqxLoader('close');
		},'json');
		
		$("#popupWindow_NewProject").jqxWindow('hide');
	});
}


$(document).ready(function () {
	InitSearchArea();
	InitProjectGrid();
	InitNewProjectWindow();
});
