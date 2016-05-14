
var gCustomer ;

function addselectfieldwindows()
{
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: false },
	                   { label: '项目编号', value: 'ProjectCode', checked: true },
	                   { label: '项目名称', value: 'ProjectName', checked: true },
	                   { label: '项目类型', value: 'ProjectTypeId', checked: true },
	                   { label: '采购单位', value: 'CustomerId', checked: true },
	                   { label: '负责人', value: 'EmployeeId', checked: true },
	                   { label: '协助人', value: 'Assistant', checked: false },
	                   { label: '项目来源', value: 'ProjectSourceId', checked: false },
	                   { label: '资金来源', value: 'FundingSourceId', checked: false },
	                   { label: '管理方式', value: 'ManagementStyleId', checked: false },
	                   { label: '采购方式', value: 'PurchaseStyleId', checked: true },
	                   { label: '项目状态', value: 'ProjectStatusId', checked: true },
                       {value:"CreationDate",label:"创建日期", checked: true},
                       {value:"PackageCount",label:"包件数量", checked: true},
                       {value:"DocumentBuyerCount",label:"已售标书数量", checked: true},
                       {value:"BidderCount",label:"投标人数量", width: "120", checked: true},
                       {value:"MarginCount",label:"已交保证金数量", checked: true},
                       {value:"ReturnMarginCount",label:"归还保证金数量", checked: true},
                       {value:"EntrustMoney",label:"委托金额合计", checked: true},
                       {value:"WinningMoney",label:"中标金额合计", checked: true},
	                   ];
	$('#zdlistbox').jqxListBox({ source: listSource, width:'100%', height:'100%', checkboxes: true });
    $("#zdlistbox").on('checkChange', function (event) {
        $("#jqxgrid").jqxGrid('beginupdate');
        if (event.args.checked) {
            $("#jqxgrid").jqxGrid('showcolumn', event.args.value);
        }
        else {
            $("#jqxgrid").jqxGrid('hidecolumn', event.args.value);
        }
        $("#jqxgrid").jqxGrid('endupdate');
    });	
}

function InitProjectGrid(dict){
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
	                          {"name":"CreationDate","type":"string"},
	                          {"name":"PackageCount","type":"string"},
	                          {"name":"DocumentBuyerCount","type":"string"},
	                          {"name":"BidderCount","type":"string"},
	                          {"name":"MarginCount","type":"string"},
	                          {"name":"ReturnMarginCount","type":"string"},
	                          {"name":"EntrustMoney","type":"string"},
	                          {"name":"WinningMoney","type":"string"}
	                          ]
    var data_url = "/bidding/default/SelectProjectsSummary"
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
    var columns_content  =[{"datafield":"Id","text":"序号",width: "80", cellsalign: 'center', align: 'center',hidden:true,},
                           {"datafield":"ProjectCode","text":"项目编号", width: "180", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectName","text":"项目名称", width: "180", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectTypeId","text":"项目类型", width: "180", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		  var label="";
                        		  pt = JSON.parse(dict.ProjectType)
                        		  for(i=0;i<pt.length;i++){
                        			  if(pt[i].ProjectTypeId==value.toString()) {
                        				  label = pt[i].ProjectTypeName
                        			  }
                        		  }
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"CustomerId","text":"采购单位", width: "180", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                         		  pt = JSON.parse(dict.Customer)
                         		  for(i=0;i<pt.length;i++){
                         			  if(pt[i].Id==value.toString()) {
                         				  label = pt[i].UserName
                         			  }
                         		  }
                    		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"EmployeeId","text":"负责人", width: "80", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                          		  pt = JSON.parse(dict.Employee)
                          		  for(i=0;i<pt.length;i++){
                          			  if(pt[i].Id==value.toString()) {
                          				  label = pt[i].Name
                          			  }
                          		  }
                     		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"Assistant","text":"协助人", width: "80", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                           		  pt = JSON.parse(dict.Employee)
                           		  for(i=0;i<pt.length;i++){
                           			  if(pt[i].Id==value.toString()) {
                           				  label = pt[i].Name
                           			  }
                           		  }
                      		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"ProjectSourceId","text":"项目来源", width: "120", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                           		  pt = JSON.parse(dict.ProjectSource)
                           		  for(i=0;i<pt.length;i++){
                           			  if(pt[i].Id==value.toString()) {
                           				  label = pt[i].Name
                           			  }
                           		  }
                      		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"FundingSourceId","text":"资金来源", width: "120", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                            		  pt = JSON.parse(dict.FundingSource)
                            		  for(i=0;i<pt.length;i++){
                            			  if(pt[i].Id==value.toString()) {
                            				  label = pt[i].Name
                            			  }
                            		  }
                       		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"ManagementStyleId","text":"管理方式", width: "120", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                         		  pt = JSON.parse(dict.ManagementStyle)
                         		  for(i=0;i<pt.length;i++){
                         			  if(pt[i].ManagementStyleId==value.toString()) {
                         				  label = pt[i].ManagementStyleName
                         			  }
                         		  }
                    		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"PurchaseStyleId","text":"采购方式", width: "120", cellsalign: 'center', align: 'center',
                            	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                            		  var label="";
                              		  pt = JSON.parse(dict.PurchaseStyle)
                              		  for(i=0;i<pt.length;i++){
                              			  if(pt[i].PurchaseStyleId==value.toString()) {
                              				  label = pt[i].PurchaseStyleName
                              			  }
                              		  }
                         		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                                }},
                           {"datafield":"ProjectStatusId","text":"项目状态", width: "120", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                          		  pt = JSON.parse(dict.ProjectStatus)
                          		  for(i=0;i<pt.length;i++){
                          			  if(pt[i].Id==value.toString()) {
                          				  label = pt[i].Name
                          			  }
                          		  }
                     		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                              {"datafield":"CreationDate","text":"创建日期", width: "120", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"PackageCount","text":"包件数量", width: "120", cellsalign: 'center', align: 'center',hidden:false},
	                          {"datafield":"DocumentBuyerCount","text":"已售标书数量", width: "120", cellsalign: 'center', align: 'center',hidden:false},
	                          {"datafield":"BidderCount","text":"投标人数量", width: "120", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"MarginCount","text":"已交保证金数量", width: "120", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"ReturnMarginCount","text":"归还保证金数量", width: "120", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"EntrustMoney","text":"委托金额合计", width: "120", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"WinningMoney","text":"中标金额合计", width: "120", cellsalign: 'center', align: 'center',hidden:true},
                           {
                               text: '操作', editable: false, datafield: 'edit',width: "250", cellsalign: 'center', align: 'center',
                               cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                               var a = '<a style="padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="/bidding/default/ViewProject?id='+rowdata.Id + '">查看</a>';
                               var b = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="/bidding/default/EditProject?id='+rowdata.Id + '">修改</a>';
                               var c = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="/bidding/default/EditProject?id='+rowdata.Id + '">购买标书</a>';
                               var d = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="/bidding/default/EditProject?id='+rowdata.Id + '">退保证金</a>';
                               var e = '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+a+b+c+d+'</div>';
                               return e;
                               }
                             }]            
    var outerDataAdapter = new $.jqx.dataAdapter(source, { autoBind: true });
    projects_record = outerDataAdapter.records;
    $("#jqxgrid").jqxGrid(
    {
        width: '100%',
        height: 560,
        source: dataAdapter,
        pageable: true,
        rowdetails: true,
        rowsheight: 35,
        columns: columns_content,
        showstatusbar: false,
        renderstatusbar: function (statusbar) {},
        showtoolbar: true,
        rendertoolbar: function (toolbar) {
        	//添加打印按钮、导出Excel按钮和其他按钮
            var me = this;
            var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
            var container = $("<div style='margin: 5px;'></div>");
            var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
            var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
            var deleteButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
            var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
            var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
            var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
            toolbar.append(container);
            container.append(addNewButton);
            container.append(refreshButton);
            container.append(deleteButton);
            container.append(printButton);
            container.append(exportButton);
            container.append(columnSettingButton);
            addNewButton.jqxButton({ template: "success" });
            refreshButton.jqxButton({ template: "primary" });
            printButton.jqxButton({ template: "info" });
            exportButton.jqxButton({ template: "warning" });
            deleteButton.jqxButton({ template: "danger" });
            columnSettingButton.jqxButton({ template: "inverse" });
            addNewButton.click(function (event) {
            	$("#popupWindow_NewProject").jqxWindow('show');
            });
            refreshButton.click(function (event) {
                $("#jqxgrid").jqxGrid({ source:dataAdapter });
            });
            columnSettingButton.click(function (event) {
            	$("#popupWindow").jqxWindow('open');
            });
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
            // delete selected row.
            deleteButton.click(function (event) {
                var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
                var id = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
                $("#jqxgrid").jqxGrid('deleterow', id);
            });
        },
    });
}

function InitSearchArea(dict){
	BindProjectName("#ProjectName_SEARCH")   //input 
	$("#ProjectName_SEARCH_Button").jqxButton({ template: "success",height: '19px'});
	$("#ProjectName_SEARCH_Button").click(function (event) {
         $("#jqxgrid").jqxGrid({ source:dataAdapter });
     });
	$("#ProjectName_ADSEARCH_Button").jqxToggleButton({template: "success", width: '100', toggled: false,height: '19px'});
	$("#ProjectName_ADSEARCH_Button").click(function (event) {
		 var toggled = $("#ProjectName_ADSEARCH_Button").jqxToggleButton('toggled');
         if (toggled) {
        	 AdvancedSearchContent("show",dict)
         }
         else {
        	 AdvancedSearchContent("hide",dict)
         }
     });
	
}

function InitNewProjectWindow(dict){	
	//填写项目名称
	$("#NewProject_ProjectName").addClass('jqx-input')
	$("#NewProject_ProjectName").width(200)
	$("#NewProject_ProjectName").height(23)
	//采购单位
    BindCustomer("#NewProject_Customer",dict.Customer)
	//项目类型
	BindProjectType("#NewProject_ProjectType",dict.ProjectType);
	//采购类型
	BindPurchaseStyle("#NewProject_PurchaseStyle",dict.PurchaseStyle)
	//管理方式
	BindManagementStyle("#NewProject_ManagementStyle",dict.ManagementStyle)
	//	项目来源
	BindProjectSource("#NewProject_ProjectSource",dict.ProjectSource)
	//项目资金来源
   BindFundingSource("#NewProject_FundingSource",dict.FundingSource)
    //项目负责人
   BindEmployee("#NewProject_Employee",dict.Employee)
   //协助人
   BindEmployee("#NewProject_Assistant",dict.Employee)
   //项目状态
   BindProjectStatus("#NewProject_ProjectStatus",dict.ProjectStatus)
	//项目创建时间
	$("#NewProject_CreationDate").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
	//初始化创建项目的loader
	$("#Loader_CreatingNewProject").jqxLoader({ width: 100, height: 60, imagePosition: 'top' });
	//初始化整个Window
	$("#popupWindow_NewProject").jqxWindow({ showCollapseButton: true,
    	width: 650, 
    	height:340,autoOpen: false, cancelButton: $("#NewProject_Cancel"), modalOpacity: 0.01 });    
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

function AdvancedSearchContent(action,dict){
	if(action=="show"){
		var searchTable = $("#searchTable"); 
		row1HTML = '<tr id="row1Search"><td align="left"><p>采购单位</p></td>	<td align="left"><div id="BuyerId_SEARCH" /></td>	\
			<td align="left"><p>项目类型</p></td> <td align="left"><div id="ProjectTypeId_SEARCH" /></td>	\
			<td align="left"><p>采购方式</p></td>	<td align="left"><div id="PurchaseStyleId_SEARCH" /></td>\
			<td align="left"><p>项目来源</p></td>	<td align="left"><div id="ProjectSourceId_SEARCH" /></td></tr>'
			row2HTML='<tr id="row2Search"><td align="left"><p>资金来源</p></td>	<td align="left"><div id="SourcesOfFundingId_SEARCH" /></td>\
			<td align="left"><p>管理方式</p></td>	<td align="left"><div id="ManagementStyleId_SEARCH" /></td>\
			<td align="left"><p>项目状态</p></td>	<td align="left"><div id="StateId_SEARCH" /></td>\
			<td align="left"><p>负责人</p></td>	<td align="left"><div id="EmployeeId_SEARCH" /></td>\
			<td align="left"><p>协助人</p></td>	<td align="left"><div id="Assistant_SEARCH" /></td></tr>'
			searchTable.append(row1HTML);
			searchTable.append(row2HTML);
			BindCustomer("#BuyerId_SEARCH",dict.Customer)  //dropdownlist
			BindProjectType("#ProjectTypeId_SEARCH",dict.ProjectType)//dropdownlist
			BindProjectSource("#ProjectSourceId_SEARCH",dict.ProjectSource)//dropdownlist
			BindFundingSource("#SourcesOfFundingId_SEARCH",dict.FundingSource)//dropdownlist
			BindManagementStyle("#ManagementStyleId_SEARCH",dict.FundingSource)//dropdownlist
			BindPurchaseStyle("#PurchaseStyleId_SEARCH",dict.PurchaseStyle)
			BindEmployee("#EmployeeId_SEARCH",dict.Employee,true)//dropdownlist
			BindAssitant("#Assistant_SEARCH",dict.Employee,false)//dropdownlist
			BindProjectStatus("#StateId_SEARCH",dict.ProjectStatus)//dropdownlist
	}else{
		$("#row1Search").remove();
		$("#row2Search").remove();
	}
	
}


$(document).ready(function () {
	
	$.get("/bidding/default/getDictionaries",function(result){
			dict = result
			InitSearchArea(dict);
		    addselectfieldwindows();
			InitProjectGrid(dict);
			InitNewProjectWindow(dict);
		},'json');
});
