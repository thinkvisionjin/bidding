
var gFinancedataAdapter;
var gtbbzjdataAdapter;
var gtbzjdataAdapter;
var gProjectMargindataAdapter;
var gContactAdapter;
var gProjectViewdataAdapter;
var gdocumentdataAdapter
var gViewFlag = 1;

function InitEditProjectPage(dict, project) {
	$("#jqxProjectBasicExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxProjectPackagesExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxProjectDocumentsExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	//$("#jqxProjectMarginExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxProjectViewExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxProjectContactsExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxProjectExpanse").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxProjectFinanceExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxtbbzjExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#jqxtbzjExpander").jqxExpander({ width: '99%', toggleMode: 'dblclick' });
	$("#EditProject_ProjectCode").addClass('jqx-input')
	$("#EditProject_ProjectCode").width(200)
	$("#EditProject_ProjectCode").height(25)
	$("#EditProject_ProjectCode").val(project.ProjectCode)
	$("#EditProject_ProjectCode").jqxInput({ disabled: true });
	//填写项目名称
	$("#EditProject_ProjectName").addClass('jqx-input')
	$("#EditProject_ProjectName").width(200)
	$("#EditProject_ProjectName").height(25)
	$("#EditProject_ProjectName").val(project.ProjectName)
	$("#EditProject_ProjectName").jqxInput({ disabled: true });
	//采购单位
    BindCustomer("#EditProject_Customer", dict.Customer, project)
    $("#EditProject_Customer").jqxComboBox({ disabled: true });
	//项目类型
	BindProjectType("#EditProject_ProjectType", dict.ProjectType, project);
	//采购类型
	BindPurchaseStyle("#EditProject_PurchaseStyle", dict.PurchaseStyle, project)
	//	项目来源
	BindProjectSource("#EditProject_ProjectSource", dict.ProjectSource, project)
	//项目资金来源
	BindFundingSource("#EditProject_FundingSource", dict.FundingSource, project)
    //项目负责人
	BindEmployee("#EditProject_Employee", dict.Employee, project)
	//协助人
	BindAssitant("#EditProject_Assistant", dict.Employee, project)
	//项目状态
	BindProjectStatus("#EditProject_ProjectStatus", dict.ProjectStatus, project)
	$("#EditProject_ProjectStatus").jqxDropDownList({ disabled: true });
	//项目创建时间
	$("#EditProject_CreationDate").jqxDateTimeInput({ formatString: "yyyy-MM-dd", showTimeButton: false, width: '200px', height: '25px', disabled: true });


	$("#EditProject_ProjectType").jqxDropDownList({ disabled: true });
	$("#EditProject_PurchaseStyle").jqxDropDownList({ disabled: true });
	$("#EditProject_ProjectSource").jqxDropDownList({ disabled: true });
	$("#EditProject_FundingSource").jqxDropDownList({ disabled: true });
	$("#EditProject_Employee").jqxDropDownList({ disabled: true });
	$("#EditProject_Assistant").jqxDropDownList({ disabled: true });	
	$("#EditProject_Modify").jqxButton({ template: 'primary' });
	$("#EditProject_Save").jqxButton({ template: 'success' });
	if (gViewFlag == 1) {
		$("#EditProject_Modify").hide()
		$("#EditProject_Save").hide()
	}
	$("#EditProject_Modify").click(function () {
		$("#EditProject_Modify").hide()
		$("#EditProject_Save").show()
		$("#EditProject_Cancel").show()
		$("#EditProject_ProjectName").jqxInput({ disabled: false });
		$("#EditProject_Customer").jqxComboBox({ disabled: false });
		$("#EditProject_ProjectSource").jqxDropDownList({ disabled: false });
		$("#EditProject_Assistant").jqxDropDownList({ disabled: false });
		$("#EditProject_ProjectStatus").jqxDropDownList({ disabled: false });	
	});
	$("#EditProject_Save").click(function () {
		var row = {
			 EmployeeId: $("#EditProject_Employee").val()
			, ProjectName: $("#EditProject_ProjectName").val()
			, CustomerId: $("#EditProject_Customer").val()
			, Assistant: $("#EditProject_Assistant").val()
			, ProjectSourceId: $("#EditProject_ProjectSource").val()
			, FundingSourceId: $("#EditProject_FundingSource").val()
			, ProjectTypeId: $("#NewProject_ProjectType").val()
			, ManagementStyleId: $("#EditProject_ManagementStyle").val()
			, PurchaseStyleId: $("#EditProject_PurchaseStyle").val()
			, ProjectStatusId: $("#EditProject_ProjectStatus").val()
			, CreationDate: $("#EditProject_CreationDate").val()
		}
		$.post("/bidding/default/updaterow_project?Id="+project.Id, row, function (result) {
			if (result=='fail')
			{
				alert('操作失败')
			}
			else
			{
				alert("操作成功！");
				project = JSON.parse(result)[0];
				//采购单位
				
	//			$("#EditProject_Customer").jqxComboBox({ disabled: true });
				BindCustomer("#EditProject_Customer", dict.Customer, project)
	//			$("#EditProject_Customer").jqxComboBox({ disabled: true });
				//项目类型
				BindProjectType("#EditProject_ProjectType", dict.ProjectType, project);
				//采购类型
				BindPurchaseStyle("#EditProject_PurchaseStyle", dict.PurchaseStyle, project)
				//项目来源
				BindProjectSource("#EditProject_ProjectSource", dict.ProjectSource, project)
				//项目资金来源
				BindFundingSource("#EditProject_FundingSource", dict.FundingSource, project)
				//项目负责人
				BindEmployee("#EditProject_Employee", dict.Employee, project)
				//协助人
				BindAssitant("#EditProject_Assistant", dict.Employee, project)
				//项目状态
				BindProjectStatus("#EditProject_ProjectStatus", dict.ProjectStatus, project)
			}
			$("#EditProject_Save").hide()
			$("#EditProject_Cancel").hide()	
			$("#EditProject_Modify").show()	
			$("#EditProject_ProjectName").jqxInput({ disabled: true });
			$("#EditProject_Customer").jqxComboBox({ disabled: true });
			$("#EditProject_ProjectSource").jqxDropDownList({ disabled: true });
			$("#EditProject_Assistant").jqxDropDownList({ disabled: true });
			$("#EditProject_ProjectStatus").jqxDropDownList({ disabled: true });								
		});
	});
	$("#EditProject_Cancel").jqxButton({ template: 'warning' });
	$("#EditProject_Save").hide()
	$("#EditProject_Cancel").hide()	
	$("#EditProject_Cancel").click(function () {
		BindCustomer("#EditProject_Customer", dict.Customer, project)
		$("#EditProject_Customer").jqxComboBox({ disabled: true });
		//项目类型
		BindProjectType("#EditProject_ProjectType", dict.ProjectType, project);
		//采购类型
		BindPurchaseStyle("#EditProject_PurchaseStyle", dict.PurchaseStyle, project)
		//	项目来源
		BindProjectSource("#EditProject_ProjectSource", dict.ProjectSource, project)
		//项目资金来源
		BindFundingSource("#EditProject_FundingSource", dict.FundingSource, project)
		//项目负责人
		BindEmployee("#EditProject_Employee", dict.Employee, project)
		//协助人
		BindAssitant("#EditProject_Assistant", dict.Employee, project)
		//项目状态
		BindProjectStatus("#EditProject_ProjectStatus", dict.ProjectStatus, project)
		$("#EditProject_Save").hide()
		$("#EditProject_Cancel").hide()	
		$("#EditProject_Modify").show()		
		$("#EditProject_ProjectName").jqxInput({ disabled: true });
		$("#EditProject_Customer").jqxComboBox({ disabled: true });
		$("#EditProject_ProjectSource").jqxDropDownList({ disabled: true });
		$("#EditProject_Assistant").jqxDropDownList({ disabled: true });
		$("#EditProject_ProjectStatus").jqxDropDownList({ disabled: true });			
	});
	$("#EditProject_Return").jqxButton({ template: 'danger' });
	$("#EditProject_Return").click(function () {
		window.location = "/bidding/default/xmgl.html"
	});
}

function InitProjectPackageGrid(dict, project) {
	var url = "/bidding/default/SelectPackagesByProjectId?id=" + project.Id
	var source =
		{
			dataFields: [{ "name": "Id", "type": "string" },
				{ "name": "ProjectId", "type": "string" },
				{ "name": "PackageNumber", "type": "string" },
				{ "name": "PackageName", "type": "string" },
				{ "name": "StateId", "type": "string" },
				{ "name": "CreationDate", "type": "datetime" },
				{ "name": "PublicDate", "type": "datetime" },
				{ "name": "OpenDate", "type": "datetime" },
				{ "name": "ReviewDate", "type": "datetime" },
				{ "name": "SigningDate", "type": "datetime" },
				{ "name": "MakeOutDate", "type": "datetime" },
				{ "name": "EntrustMoney", "type": "float" },
				{ "name": "WinningMoney", "type": "float" },
				{ "name": "WinningDollar", "type": "float" },
				{ "name": "WinningCompany", "type": "string" },
				{ "name": "ChargeRate", "type": "float" },
				{ "name": "Note", "type": "string" },
				{ "name": "IsDelete", "type": "string" },
				{ "name": "SecondPublicDate", "type": "datetime" },
				{ "name": "comment", "type": "string" }],
			dataType: "json",
			url: url,
			updaterow: function (rowid, rowdata, commit) {
				// synchronize with the server - send update command
				// call commit with parameter true if the synchronization with the server is successful 
				// and with parameter false if the synchronization failed.

				commit(true);
			},
			deleterow: function (rowid, commit) {
				// synchronize with the server - send delete command
				// call commit with parameter true if the synchronization with the server is successful 
				// and with parameter false if the synchronization failed.
				var dataRecord = $("#EditProject_PackageTable").jqxGrid('getrowdata', rowid);
				$.post("/bidding/default/delete?table=ProjectPackage", dataRecord, function (result) {
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
	var buildFilterPanel = function (filterPanel, datafield) {
		var textInput = $("<div style='margin:5px;'/>");
		textInput.jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
		var applyinput = $("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>");
		var filterbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 2px;">设置</span>');
		applyinput.append(filterbutton);
		var filterclearbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 5px;">取消</span>');
		applyinput.append(filterclearbutton);
		filterPanel.append(textInput);
		filterPanel.append(applyinput);
		filterbutton.jqxButton({ template: 'sucess', height: 20 });
		filterclearbutton.jqxButton({ template: 'warnning', height: 20 });
		var dataSource =
			{
				localdata: adapter.records,
				datatype: "array",
				async: false
			}
		var dataadapter = new $.jqx.dataAdapter(dataSource,
			{
				autoBind: false,
				autoSort: true,
				autoSortField: datafield,
				async: false,
				uniqueDataFields: [datafield]
			});
		var column = $("#EditProject_PackageTable").jqxGrid('getcolumn', datafield);

		//	        textInput.jqxDatetimeInput({ theme: exampleTheme, placeHolder: "输入 " + column.text, popupZIndex: 9999999, displayMember: datafield, source: dataadapter, height: 23, width: 175 });
		//	        textInput.keyup(function (event) {
		//	            if (event.keyCode === 13) {
		//	                filterbutton.trigger('click');
		//	            }
		//	        });
		filterbutton.click(function () {
			var filtergroup = new $.jqx.filter();
			var filter_or_operator = 1;
			var filtervalue = textInput.val();
			var filtercondition = 'contains';
			var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
			filtergroup.addfilter(filter_or_operator, filter1);
			// add the filters.
			$("#EditProject_PackageTable").jqxGrid('addfilter', datafield, filtergroup);
			// apply the filters.
			$("#EditProject_PackageTable").jqxGrid('applyfilters');
			$("#EditProject_PackageTable").jqxGrid('closemenu');
		});
		filterbutton.keydown(function (event) {
			if (event.keyCode === 13) {
				filterbutton.trigger('click');
			}
		});
		filterclearbutton.click(function () {
			$("#EditProject_PackageTable").jqxGrid('removefilter', datafield);
			// apply the filters.
			$("#EditProject_PackageTable").jqxGrid('applyfilters');
			$("#EditProject_PackageTable").jqxGrid('closemenu');
		});
		filterclearbutton.keydown(function (event) {
			if (event.keyCode === 13) {
				filterclearbutton.trigger('click');
			}
			textInput.val("");
		});
	}
	var projectPackage_columns_content = [{ "datafield": "PackageNumber", "text": "包件编号", editable: false, cellsalign: 'center', align: 'center', width: '14%' },
		{ "datafield": "PackageName", "text": "包件名称", cellsalign: 'center', align: 'center', width: '9%' },
		{ "datafield": "EntrustMoney", "text": "委托金额(万元)", cellsalign: 'center', cellsformat:'f2', align: 'center', width: '6%' },
		{
			"datafield": "StateId", "text": "包件状态", cellsalign: 'center', align: 'center', columntype: 'dropdownlist', width: '7%',
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = "";
				var pt = JSON.parse(dict.ProjectStatus);
				for (var i = 0; i < pt.length; i++) {
					if (pt[i].Id == value.toString()) {
						label = pt[i].Name
					}
				}
				if (value == 1) {
					color = 'color: #FF0000;'
				}
				else if (value == 2) {
					color = 'color: #00FF00;'
				}
				else if (value == 3) {
					color = 'color: #0000FF;'
				}
				else if (value == 4) {
					color = 'color: #00FFFF;'
				}
				else if (value == 5) {
					color = 'color: #FFFF00;'
				}
				else if (value == 6) {
					color = 'color: #FF00FF;'
				}
				else if (value == 7) {
					color = 'color: #FFFFFF;'
				}
				else if (value == 8) {
					color = 'color: #008000;'
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin-top: 5px; ' + color + '"><b>' + label + '</b> </div>'
			},
			createeditor: function (row, column, editor) { },
			// update the editor's value before saving it.
			cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) { }
		},
		{ "datafield": "CreationDate", "text": "创建时间", cellsalign: 'center', align: 'center', columntype: 'datetimeinput', cellsformat: 'yyyy-MM-dd', width: '10%' },
		{
			"datafield": "PublicDate", "text": "公告时间", cellsalign: 'center', align: 'center', columntype: 'datetimeinput', cellsformat: 'yyyy-MM-dd', width: '6%',
			filtertype: 'custom', createfilterpanel: function (datafield, filterPanel) {
				buildFilterPanel(filterPanel, datafield);
			},
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = value;
				if (label == "1900-01-01 00:00:00" || label == "None") {
					label = ""
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >' + label + ' </div>'
			}
		},
		{
			"datafield": "SecondPublicDate", "text": "第二轮公告时间", cellsalign: 'center', align: 'center', columntype: 'datetimeinput', cellsformat: 'yyyy-MM-dd', width: '6%',
			filtertype: 'custom', createfilterpanel: function (datafield, filterPanel) {
				buildFilterPanel(filterPanel, datafield);
			},
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = value;
				if (label == "1900-01-01 00:00:00" || label == "None") {
					label = ""
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >' + label + ' </div>'
			}
		},
		{
			"datafield": "OpenDate", "text": "开标时间", cellsalign: 'center', align: 'center', columntype: 'datetimeinput', cellsformat: 'yyyy-MM-dd', width: '6%',
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = value;
				if (label == "1900-01-01 00:00:00" || label == "None") {
					label = ""
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >' + label + ' </div>'
			}
		},
		{
			"datafield": "ReviewDate", "text": "评标时间", cellsalign: 'center', align: 'center', columntype: 'datetimeinput', cellsformat: 'yyyy-MM-dd', width: '6%',
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = value;
				if (label == "1900-01-01 00:00:00" || label == "None") {
					label = ""
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >' + label + ' </div>'
			}
		},
		{
			"datafield": "SigningDate", "text": "签约时间", cellsalign: 'center', align: 'center', columntype: 'datetimeinput', cellsformat: 'yyyy-MM-dd', width: '6%',
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = value;
				if (label == "1900-01-01 00:00:00" || label == "None") {
					label = ""
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >' + label + ' </div>'
			}
		},
		{
			"datafield": "MakeOutDate", "text": "开票时间", cellsalign: 'center', align: 'center', columntype: 'datetimeinput', cellsformat: 'yyyy-MM-dd', width: '6%',
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = value;
				if (label == "1900-01-01 00:00:00" || label == "None") {
					label = ""
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >' + label + ' </div>'
			}
		},

		{ "datafield": "WinningMoney", "text": "中标本币金额(万元)", cellsalign: 'center', cellsformat:'f2',align: 'center', width: '10%' },
		{ "datafield": "WinningDollar", "text": "中标外币金额(万元)", cellsalign: 'center', cellsformat:'f2',align: 'center', width: '10%' },
		{ "datafield": "WinningCompany", "text": "中标单位", cellsalign: 'center', align: 'center', width: '10%' },
		{ "datafield": "ChargeRate", "text": "服务费(元)", cellsformat:'f2', cellsalign: 'center', align: 'center', width: '10%' }]
	$("#EditProject_PackageTable").jqxGrid({
		height: 265,
		width: "100%",
		columnsresize: true,
		filterable: false,
		source: projectPackageurldataAdapter,
		enablebrowserselection: true,
		autoRowHeight: false,
		showToolbar: true,
		columnsautoresize: true,
		ready: function () {
			// called when the DataTable is loaded.         
		},
		toolbarHeight: 35,
		renderToolbar: function (toolBar) {
			//添加打印按钮、导出Excel按钮和其他按钮
			var me = this;
			var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
			var container = $("<div style='margin: 5px;'></div>");
			var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
			var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
			var deleteButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
			var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
			var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
			var edittingButton = $("<div style='float: left; margin-left: 5px;' id='packageEditButton'><span style='margin-left: 4px; position: relative; top: 0px;'>修改</span></div>");
			var updateButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>确认修改</span></div>");
			var zbfwfprintButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印中标服务费</span></div>");
			if (gViewFlag != 1)
			{ toolBar.append(container); }

			container.append(addNewButton);
			container.append(edittingButton);
			container.append(refreshButton);
			container.append(deleteButton);
			container.append(printButton);
			container.append(zbfwfprintButton);
			//container.append(exportButton);

			//container.append(updateButton);
			addNewButton.jqxButton({ template: "success" });
			refreshButton.jqxButton({ template: "inverse" });
			printButton.jqxButton({ template: "info" });
			exportButton.jqxButton({ template: "warning" });
			deleteButton.jqxButton({ template: "danger" });
			//edittingButton.jqxButton({ disabled: true });
			edittingButton.jqxButton({ template: "primary" });
			zbfwfprintButton.jqxButton({ template: "success" });
			updateButton.jqxButton();
			zbfwfprintButton.click(function (event) {
				var selectedrowindex = getselectindex("#EditProject_PackageTable");//.jqxGrid('getselectedrowindex');
				if (selectedrowindex==-1)
				{
					return;
				}
				var rowid = $("#EditProject_PackageTable").jqxGrid('getrowid', selectedrowindex);
				var data = $('#EditProject_PackageTable').jqxGrid('getrowdata', rowid);
				pn = data['PackageNumber'];
				var newWindow = window.open('zbfwf_print?PackageNumber=' + pn, '');
				newWindow.print();
			});
			addNewButton.click(function (event) {
				$.get('SelectFirstPackagesByProjectId?id=' + project.Id, function (result) {

					y = document.body.scrollTop;
					x = (document.body.scrollWidth -600)/2
					$('#popupWindow_PackageADD').jqxWindow({ position: { x: x, y: y }});	
					$("#popupWindow_PackageADD").jqxWindow('show');
					if (result){
						
//						var rows = $("#EditProject_PackageTable").jqxGrid('getboundrows');
						$("#PackageNumber_ADD").jqxInput().val(project.ProjectCode + "-" + result[0].PackageNumber)
						$("#PackageNumber_ADD").jqxInput({ disabled: false })
						$("#PackageName_ADD").jqxInput('val', result[0].PackageName);
						$("#EntrustMoney_ADD").jqxNumberInput('val', result[0].EntrustMoney);

						if (result[0].PublicDate == "None" || result[0].PublicDate == "1900-01-01 00:00:00") {
							$("#PublicDate_ADD").jqxDateTimeInput('val', "")
						}		
						else
						{
							$("#PublicDate_ADD").jqxDateTimeInput('val', result[0].PublicDate)
						}				
						if (result[0].OpenDate == "None" || result[0].OpenDate == "1900-01-01 00:00:00") {
							$("#OpenDate_ADD").jqxDateTimeInput('val', "")
						}		
						else
						{
							$("#OpenDate_ADD").jqxDateTimeInput('val', result[0].OpenDate)
						}							
						if (result[0].ReviewDate == "None" || result[0].ReviewDate == "1900-01-01 00:00:00") {
							$("#ReviewDate_ADD").jqxDateTimeInput('val', "")
						}		
						else
						{
							$("#ReviewDate_ADD").jqxDateTimeInput('val', result[0].ReviewDate)
						}	
						if (result[0].SecondPublicDate == "None" || result[0].SecondPublicDate == "1900-01-01 00:00:00") {
							$("#SecondPublicDate_ADD").jqxDateTimeInput('val', "")
						}		
						else
						{
							$("#SecondPublicDate_ADD").jqxDateTimeInput('val', result[0].SecondPublicDate)
						}
						$("#comment_ADD").jqxTextArea('val', result[0].comment)
					}
					else {
	/*					$("#popupWindow_PackageADD").jqxWindow('show');
//						var rows = $("#EditProject_PackageTable").jqxGrid('getboundrows');
//						$("#PackageNumber_ADD").jqxInput().val(project.ProjectCode + "-0" + (rows.length + 1))
						$("#PackageNumber_ADD").jqxInput({ disabled: true })
						$("#PackageName_ADD").jqxInput('val', null);
						$("#EntrustMoney_ADD").jqxInput('val', null);
						$("#PublicDate_ADD").jqxDateTimeInput('val', null)
						$("#OpenDate_ADD").jqxDateTimeInput('val', null)
						$("#ReviewDate_ADD").jqxDateTimeInput('val', null)
						$("#SecondPublicDate_ADD").jqxDateTimeInput('val', null)
						$("#comment_ADD").jqxTextArea('val', null)*/
					}

				}, 'json');
				

			});
			refreshButton.click(function (event) {
				var source = $("#EditProject_PackageTable").jqxGrid('source');
				$("#EditProject_PackageTable").jqxGrid({ source: source });
			});
			edittingButton.click(function (event) {

				var selectedrowindex = getselectindex("#EditProject_PackageTable");
				if (selectedrowindex == -1) {
					return;
				}			

					y = document.body.scrollTop;
					x = (document.body.scrollWidth -600)/2
					var projectpackage = $("#EditProject_PackageTable").jqxGrid('getrowdata', selectedrowindex);
					InitEditPackageWindow(dict, projectpackage);
					$('#popupWindow_PackageManage').jqxWindow({ position: { x: x, y: y }});					
					$("#popupWindow_PackageManage").jqxWindow('show');

			});
			printButton.click(function (event) {
				var gridContent = $("#EditProject_PackageTable").jqxGrid('exportdata', 'html');
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
				$("#EditProject_PackageTable").jqxGrid('exportdata', 'xls', 'jqxGrid');
			});
			// delete selected row.
			deleteButton.click(function (event) {
				var selectedrowindex = getselectindex("#EditProject_PackageTable");
				if (selectedrowindex == -1) {
					return;
				}				
				if (confirm('是否删除') == false) {
					return;
				}				
				var id = $("#EditProject_PackageTable").jqxGrid('getrowid', selectedrowindex);
				$("#EditProject_PackageTable").jqxGrid('deleterow', id);		
			});
			updateButton.click(function (event) {
				//update all the data in the grid
				alert("修改成功!")
			})
		},
		columns: projectPackage_columns_content
	});
	//$('#EditProject_PackageTable').jqxGrid('autoresizecolumns');
	$('#EditProject_PackageTable').on('rowclick', function (event) {
		var args = event.args;
		// row's bound index.
		var boundIndex = args.rowindex;
		// row's visible index.
		var visibleIndex = args.visibleindex;
		// right click.
		var rightclick = args.rightclick;
		// original event.
		var ev = args.originalEvent;
		var rowindex = event.args.rowindex;
		$("#packageEditButton").jqxButton({ disabled: false });
		var projectpackage = $("#EditProject_PackageTable").jqxGrid('getrowdata', rowindex);
		InitEditPackageWindow(dict, projectpackage);
		$("#EditProject_PackageTable").jqxGrid('selectrow', rowindex);
		showMoreRows(projectpackage);
	});
}


function fkgmbs(id) {
	if (confirm('确认付款')==false)
	{
		return ;
	}
	$.get('fkqr_gmbs?Id='+id, function(result){
		if (result == 'success')
		{
			alert('成功')
			$("#EditProject_DocumentTable").jqxGrid({ source: gdocumentdataAdapter });
			//$('#gmbs-grid').jqxGrid('deleterow', rowid);
		}
		else
		{
			alert(result)
		}
		
	});		
}

function qxfkgmbs(id) {
	if (confirm('取消确认付款')==false)
	{
		return ;
	}	
	$.get('qxfkqr_gmbs?Id='+id, function(result){
		if (result == 'success')
		{
			alert('成功')
			$("#EditProject_DocumentTable").jqxGrid({ source: gdocumentdataAdapter });
			//$('#gmbs-grid').jqxGrid('deleterow', rowid);
		}
		else
		{
			alert(result)
		}
		
	});		
}

function InitProjectDocumentGrid(dict, project) {

	gmbs_init();
    var source =
		{
			url: "select_gmbsbyProjectId?id=" + project.Id,
			datatype: "json",
			updaterow: function (rowid, rowdata, commit) {
				// synchronize with the server - send update command
				// call commit with parameter true if the synchronization with the server is successful 
				// and with parameter false if the synchronization failder.
				commit(true);
			},
			datafields:
			[
				{ name: 'Id', type: 'string' },
				{ name: 'dwmc', type: 'string' },
				{ name: 'rq', type: 'date' },
				{ name: 'zzsdwmc', type: 'string' },
				{ name: 'lxdz', type: 'string' },
				{ name: 'lxr', type: 'string' },
				{ name: 'sj', type: 'string' },
				{ name: 'dzxx', type: 'string' },
				{ name: 'cz', type: 'string' },
				{ name: 'bsbh', type: 'string' },
				{ name: 'je', type: 'float' },
				{ name: 'username', type: 'string' },
				{ name: 'ly', type: 'string' },
				{ name: 'fkbz', type: 'string'},
				{ name: 'fkrq', type: 'date'}
			]
		};
    var dataAdapter = new $.jqx.dataAdapter(source);
	gdocumentdataAdapter = dataAdapter;
    // initialize jqxGrid
    $("#EditProject_DocumentTable").jqxGrid(
		{
			height: 265,
			width: "100%",
			pageable: false,
			source: dataAdapter,
			//        editable: true,
			enablebrowserselection: true,
			//        editmode: 'selectedcell',
			columnsresize: true,
			showToolbar: true,
			renderToolbar: function (toolBar) {
				//添加打印按钮、导出Excel按钮和其他按钮
				var me = this;
				var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
				var container = $("<div style='margin: 5px;'></div>");
				var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
				var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
				var deleteButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
				var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
				var printgmbsButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印购买标书登记表</span></div>");
				var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
				var editButton = $("<div style='float: left; margin-left: 5px;' id ='documentEditButton'><span style='margin-left: 4px; position: relative; top: 0px;'>修改</span></div>");
				if (gViewFlag != 1)
				{ toolBar.append(container); }
				container.append(addNewButton);
				container.append(editButton);
				container.append(refreshButton);
				container.append(deleteButton);
				container.append(printButton);

				container.append(printgmbsButton);

				addNewButton.jqxButton({ template: "success" });
				printgmbsButton.jqxButton({ template: "success" });
				editButton.jqxButton({ template: "primary" });
				editButton.jqxButton({ disabled: true });
				refreshButton.jqxButton({ template: "inverse" });
				printButton.jqxButton({ template: "info" });
				exportButton.jqxButton({ template: "warning" });
				deleteButton.jqxButton({ template: "danger" });
				printgmbsButton.click(function (event) {
					var selectedrowindex = $("#EditProject_DocumentTable").jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}


					var rowscount = $("#EditProject_DocumentTable").jqxGrid('getdatainformation').rowscount;
					if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
						var rowid = $("#EditProject_DocumentTable").jqxGrid('getrowid', selectedrowindex);

					}
					data = $('#EditProject_DocumentTable').jqxGrid('getrowdata', selectedrowindex);
					var newWindow = window.open('gmbs_print?Id=' + data['Id'], '');
					newWindow.print();
				});
				addNewButton.click(function (event) {
					gmbs_popupwindow("add", "", function () {
						$("#EditProject_DocumentTable").jqxGrid({ source: dataAdapter });
						$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
						$("#EditProject_ContactsTable").jqxGrid({ source: gContactAdapter })
						$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
					}, project.Id);
				});
				refreshButton.click(function (event) {
					$("#EditProject_DocumentTable").jqxGrid({ source: dataAdapter });
				});
				editButton.click(function (event) {
					// var disabled = editButton.jqxButton('disabled')
					// if (disabled == false) {
					// 	var gmbsid = $("#documentEditButton").val();
					// 	gmbs_popupwindow("modify", gmbsid, function () {
					// 		$("#EditProject_DocumentTable").jqxGrid({ source: dataAdapter });
					// 		$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
					// 		$("#EditProject_ContactsTable").jqxGrid({ source: gContactAdapter })
					// 		$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
					// 	}, project.Id);
					// }



					var selectedrowindex = getselectindex("#EditProject_DocumentTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}
					var disabled = editButton.jqxButton('disabled')
					if (disabled == false) {
						data = $('#EditProject_DocumentTable').jqxGrid('getrowdata', selectedrowindex);
						if (data['ly']=='交易流水确认')
						{
							alert('该记录来源于交易流水确认，不能修改')
						}
						else
						{
							gmbs_popupwindow("modify", data['Id'], function () {
								$("#EditProject_DocumentTable").jqxGrid({ source: dataAdapter });
								$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
								$("#EditProject_ContactsTable").jqxGrid({ source: gContactAdapter })
								$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
							}, project.Id);							
						}
					}


				});
				printButton.click(function (event) {
					var gridContent = $("#EditProject_DocumentTable").jqxGrid('exportdata', 'html');
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
					$("#EditProject_DocumentTable").jqxGrid('exportdata', 'xls', 'jqxGrid');
				});
				// delete selected row.
				deleteButton.click(function (event) {

					var selectedrowindex = getselectindex("#EditProject_DocumentTable");//.jqxGrid('getselectedcells')[0].rowindex;//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}
					if (confirm('是否删除') == false) {
						return;
					}

					var rowscount = $("#EditProject_DocumentTable").jqxGrid('getdatainformation').rowscount;
					if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
						var rowid = $("#EditProject_DocumentTable").jqxGrid('getrowid', selectedrowindex);

					}
					data = $('#EditProject_DocumentTable').jqxGrid('getrowdata', selectedrowindex);
					if (data['ly']=='交易流水确认')
					{
						alert('该记录来源于交易流水确认，不能修改')
					}
					else
					{
						$.get('deleterow_gmbs?Id=' + data['Id'], function (result) {
							if (result == 'success') {
								alert('成功')
								$("#EditProject_DocumentTable").jqxGrid('deleterow', rowid);
								$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
								$("#EditProject_ContactsTable").jqxGrid({ source: gContactAdapter })
								$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
							}
							else {
								alert(result);
							}

						});
					}

				});

			},
			columns: [
				{ text: '招标书编号',  datafield: 'bsbh', width: '14%', align: 'center', cellsalign: 'center', },
				{
					text : '付款确认',
					align: 'center', cellsalign: 'center',
					width: '13%',
					editable : false,
					cellsrenderer : function(index, datafield,value,defaultvalue,column, rowdata) {
						if(rowdata['fkbz']=='1')
							{
								a= '<FONT color=#00FF00><b>已付款</b> </FONT>'
											
								b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="qxfkgmbs('+rowdata.Id+')">取消付款</a>';
							}
						else
							{
								a= '<FONT color=#FF0000><b>未付款</b> </FONT>'
								b = '<a style="margin-right: 5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" onclick="fkgmbs('+rowdata.Id+')">付款确认</a>';
							}
						var d = '<div class="jqx-grid-cell-middle-align" style="margin-top: 6px;">'
								+ a + b + '</div>';
						return d;
					}
				},				
				{ text: '客户名称',  datafield: 'dwmc', width: '31%', align: 'center', cellsalign: 'center', },
								{
					text: '付款日期', datafield: 'fkrq',   width: '22%', align: 'center', cellsalign: 'center', cellsformat: 'yyyy-MM-dd'
				},
				{
					text: '金额(元)', datafield: 'je', width: '20%', align: 'center', cellsalign: 'center', cellsformat: 'f2'
				}
			]
		});
    // events
    var rowValues = "";
    $("#EditProject_DocumentTable").on('cellbeginedit', function (event) { });
    $("#EditProject_DocumentTable").on('cellendedit', function (event) { });
    $('#EditProject_DocumentTable').on('rowclick', function (event) {
		var args = event.args;
		// row's bound index.
		var boundIndex = args.rowindex;
		// row's visible index.
		var visibleIndex = args.visibleindex;
		// right click.
		var rightclick = args.rightclick;
		// original event.
		var ev = args.originalEvent;
		var rowindex = event.args.rowindex;

		$("#documentEditButton").jqxButton({ disabled: false });
		var gmbs_data = $("#EditProject_DocumentTable").jqxGrid('getrowdata', rowindex);
		$("#documentEditButton").val(gmbs_data.Id)
		$("#EditProject_DocumentTable").jqxGrid('selectrow', rowindex);
	});
}

function InitProjectMarginGrid(dict, project) {

	var data = generatedata(7);
    var source =
		{
			url: "getttbzj_tbzjByProjectId?id=" + project.Id,
			datatype: "json",
			updaterow: function (rowid, rowdata, commit) {
				// synchronize with the server - send update command
				// call commit with parameter true if the synchronization with the server is successful 
				// and with parameter false if the synchronization failder.
				commit(true);
			},
			datafields:
			[{ name: 'bzjlx', type: 'string' },
				{ name: 'tje', type: 'float' },
				{ name: 'rq', type: 'string' },
				{ name: 'khyh', type: 'string' },
				{ name: 'fkfs', type: 'string' },
				{ name: 'dwmc', type: 'string' },
				{ name: 'trq', type: 'string' },
				{ name: 'je', type: 'float' },
				{ name: 'projectid', type: 'string' },
				{ name: 'Id', type: 'string' },
				{ name: 'returned', type: 'string' },
				{ name: 'yhzh', type: 'string' },
				{ name: 'ly', type: 'string' }

			]
		};
    var dataAdapter = new $.jqx.dataAdapter(source);
	gProjectMargindataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#EditProject_MarginTable").jqxGrid(
		{
			height: 265,
			width: "100%",
			pageable: false,
			showToolbar: true,
			source: dataAdapter,
			columnsresize: true,
			editable: false,
			enablebrowserselection: true,
			//        editmode: 'selectedcell',
			renderToolbar: function (toolBar) {
				//添加打印按钮、导出Excel按钮和其他按钮
				var me = this;
				var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
				var container = $("<div style='margin: 5px;'></div>");
				var addNewButton1 = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>缴保证金</span></div>");
				var addNewButton2 = $("<div style='float: left; margin-left: 5px;' id='tbzjButton'><span style='margin-left: 4px; position: relative; top: 0px;'>退保证金</span></div>");

				var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
				var deleteButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
				var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
				var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
				var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
				var tbzjprintButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印退款申请单</span></div>");
				if (gViewFlag != 1)
				{ toolBar.append(container); }
				container.append(addNewButton1);
				container.append(addNewButton2);
				container.append(refreshButton);
				//container.append(deleteButton);
				container.append(printButton);
				container.append(tbzjprintButton);
				//            container.append(columnSettingButton);
				addNewButton1.jqxButton({ template: "success" });
				addNewButton2.jqxButton({ template: "success" });
				addNewButton2.jqxButton({ disabled: true });
				refreshButton.jqxButton({ template: "inverse" });
				printButton.jqxButton({ template: "info" });
				exportButton.jqxButton({ template: "warning" });
				deleteButton.jqxButton({ template: "danger" });
				tbzjprintButton.jqxButton({ template: "success" });
				columnSettingButton.jqxButton({ template: "inverse" });
				addNewButton1.click(function (event) {
					tbbzj_popupwindow('add', '', function () {
						//refresh the grid when load completed
						$("#EditProject_MarginTable").jqxGrid({ source: dataAdapter });
					}, project.Id)
				});
				tbzjprintButton.click(function (event) {
					var selectedrowindex = $("#EditProject_MarginTable").jqxGrid('getselectedrowindex');
					var rowid = $("#EditProject_MarginTable").jqxGrid('getrowid', selectedrowindex);
					var data = $('#EditProject_MarginTable').jqxGrid('getrowdata', rowid);
					pn = data['Id'];
					if (pn != '') {
						var newWindow = window.open('tbzj_print?Id=' + pn, '');
						newWindow.print();
					}
				});
				addNewButton2.click(function (event) {
					var selectedrowindex = getselectindex("#EditProject_MarginTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}	
					data = $('#EditProject_MarginTable').jqxGrid('getrowdata', selectedrowindex);
					var disabled = addNewButton2.jqxButton('disabled')
					if (disabled == false) {
						var tbbzjid = data['Id'];
						tbzj_popupwindow('add', '', function () {
							//refresh the grid when load completed
							$("#EditProject_MarginTable").jqxGrid({ source: dataAdapter });
						}, tbbzjid)
					}

				});
				refreshButton.click(function (event) {
					$("#EditProject_MarginTable").jqxGrid({ source: dataAdapter });
				});
				columnSettingButton.click(function (event) {

				});
				printButton.click(function (event) {
					var gridContent = $("#EditProject_MarginTable").jqxGrid('exportdata', 'html');
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
					$("#EditProject_MarginTable").jqxGrid('exportdata', 'xls', 'jqxGrid');
				});
				// delete selected row.
				deleteButton.click(function (event) {
					var selectedrowindex = getselectindex("#EditProject_MarginTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}					
					if (confirm('是否删除') == false) {
						return;
					}
					var id = $("#EditProject_MarginTable").jqxGrid('getrowid', selectedrowindex);
					$("#EditProject_MarginTable").jqxGrid('deleterow', id);
				});

			},
			columns: [
				{ text: '项目编号', datafield: 'projectid', columntype: 'textbox', align: 'center', cellsalign: 'center', width: '14%' },
				{ text: '客户名称', datafield: 'dwmc', columntype: 'textbox', align: 'center', cellsalign: 'center', width: '12%' },

				{ text: '保证金类型', datafield: 'bzjlx', columntype: 'dropdownlist', align: 'center', cellsalign: 'center', width: '10%' },
				{
					text: '交保证金日期', datafield: 'rq', columntype: 'datetimeinput', width: '10%', align: 'center', cellsalign: 'center', cellsformat: 'd',
					validation: function (cell, value) {

					}
				},
				{
					text: '金额(元)', datafield: 'je', width: '6%', align: 'center', cellsalign: 'center', cellsformat: 'f2', columntype: 'numberinput',
					validation: function (cell, value) {

					},
					createeditor: function (row, cellvalue, editor) {
						editor.jqxNumberInput({ digits: 3 });
					}
				},
				{ text: '已退保证金', datafield: 'returned', columntype: 'checkbox', align: 'center', cellsalign: 'center', width: '6%' },
				{
					text: '退款日期', datafield: 'trq', columntype: 'datetimeinput', width: '10%', align: 'center', cellsalign: 'center', cellsformat: 'd',
					validation: function (cell, value) {

					}
				},
				{
					text: '退还金额(元)', datafield: 'tje', width: '6%', align: 'center', cellsalign: 'center', cellsformat: 'f2', columntype: 'numberinput',
					validation: function (cell, value) {
						//   if (value < 0 || value > 15) {
						//       return { result: false, message: "Price should be in the 0-15 interval" };
						//   }
						//   return true;
					},
					createeditor: function (row, cellvalue, editor) {
						editor.jqxNumberInput({ digits: 3 });
					}
				},
				{ text: '开户银行', datafield: 'khyh', columntype: 'textbox', align: 'center', cellsalign: 'center', width: '8%' },
				{ text: '银行账号', datafield: 'yhzh', columntype: 'textbox', align: 'center', cellsalign: 'center', width: '10%' },
				{ text: '退还方式', datafield: 'fkfs', columntype: 'dropdownlist', align: 'center', cellsalign: 'center', width: '8%' },

			]
		});
    // events
/*    var rowValues = "";
    $("#EditProject_MarginTable").on('cellbeginedit', function (event) {
        var args = event.args;
        if (args.datafield === "firstname") {
            rowValues = "";
        }
        rowValues += args.value.toString() + "    ";
        if (args.datafield === "price") {
            $("#cellbegineditevent").text("Begin Row Edit: " + (1 + args.rowindex) + ", Data: " + rowValues);
        }
    });
    $("#EditProject_MarginTable").on('cellendedit', function (event) {
        var args = event.args;
        if (args.datafield === "firstname") {
            rowValues = "";
        }
        rowValues += args.value.toString() + "    ";
        if (args.datafield === "price") {
            $("#cellbegineditevent").text("End Row Edit: " + (1 + args.rowindex) + ", Data: " + rowValues);
        }
    });
    $('#EditProject_MarginTable').on('rowclick', function (event) {
		var args = event.args;
		// row's bound index.
		var boundIndex = args.rowindex;
		// row's visible index.
		var visibleIndex = args.visibleindex;
		// right click.
		var rightclick = args.rightclick;
		// original event.
		var ev = args.originalEvent;
		var rowindex = event.args.rowindex;

		$("#tbzjButton").jqxButton({ disabled: false });
		var tbbzj = $("#EditProject_MarginTable").jqxGrid('getrowdata', rowindex);
		$("#tbzjButton").val(tbbzj.Id)
		$("#EditProject_MarginTable").jqxGrid('selectrow', rowindex);
	});*/
}

function InitNewPackageWindow(dict, project) {
	InitNewPackageWindowValidator();
	$("#PackageNumber_ADD").jqxInput({ width: '200px', height: "25px" });
	$("#PackageName_ADD").jqxInput({ width: '200px', height: "25px" });
	$("#EntrustMoney_ADD").jqxNumberInput({ width: '200px', height: '25px', inputMode: 'simple' });
	BindPackageStatus("#StateIdPackage_ADD", dict.ProjectStatus, undefined, 0) //初始化:项目建档
	$("#PublicDate_ADD").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
	$("#PublicDate_ADD").jqxDateTimeInput('val', null)
	$("#OpenDate_ADD").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
	$("#OpenDate_ADD").jqxDateTimeInput('val', null)
	$("#ReviewDate_ADD").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
	$("#ReviewDate_ADD").jqxDateTimeInput('val', null)
	$("#SecondPublicDate_ADD").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
	$("#SecondPublicDate_ADD").jqxDateTimeInput('val', null)
	$("#comment_ADD").jqxTextArea({ height: 60 , placeHolder:''});
	/*#########comment############## */
	// $("#SigningDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss",  showTimeButton: true,width: '200px', height: '25px' ,allowNullDate: true});
	// $("#SigningDate_ADD").jqxDateTimeInput('val',null)
	// $("#MakeOutDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true,width: '200px', height: '25px' ,allowNullDate: true});
	// $("#MakeOutDate_ADD").jqxDateTimeInput('val',null)

	// $("#WinningMoney_ADD").jqxNumberInput({ width: '200px', height: '25px',inputMode: 'simple'});
	// $("#WinningCompany_ADD").jqxInput({width: '200px',height: "25px"});
	// $("#ChargeRate_ADD").jqxInput({width: '200px',height: "25px"});
	// $("#ChargeRate_ADD").jqxNumberInput({ width: '200px', height: '25px', digits: 3, symbolPosition: 'right', symbol: '%', spinButtons: true });
	/*$('#NotePackage_ADD').jqxEditor({height: "200px", width: '492px'});*/
	$("#StateIdPackage_ADD").jqxDropDownList({ disabled: true })
	//initialize the popup add window and buttons.
    $("#popupWindow_PackageADD").jqxWindow({ width: 650, maxHeight: 850, resizable: true, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.40 });
    $("#CancelPackage_ADD").jqxButton({ theme: theme , template: "warning"});
    $("#CancelPackage_ADD").click(function () {
		$("#popupWindow_PackageADD").jqxWindow('hide');
    });
    $("#SavePackage_ADD").jqxButton({ theme: theme, template: "success" });

    $("#SavePackage_ADD").click(function () {
		if ($('#PackageADD_Validator').jqxValidator('validate') == false) { return; }
		var row =
			{
				ProjectId: project.Id
				, PackageNumber: $("#PackageNumber_ADD").val()
				, PackageName: $("#PackageName_ADD").val()
				, EntrustMoney: $("#EntrustMoney_ADD").val()
				, StateId: $("#StateIdPackage_ADD").val()
				, PublicDate: $("#PublicDate_ADD").val()
				, OpenDate: $("#OpenDate_ADD").val()
				, ReviewDate: $("#ReviewDate_ADD").val()
				, SigningDate: ''
				, MakeOutDate: ''
				, WinningMoney: 0
				, WinningDollar: 0
				, WinningCompany: ''
				, ChargeRate: 0
				// ,Note:$("#NotPackagee_ADD").val()
				, IsDelete: 0
				, SecondPublicDate: $("#SecondPublicDate_ADD").val()
				, comment: $("#comment_ADD").val()
			}
		$.post("/bidding/default/insert?table=ProjectPackage", row, function (result) {
			$("#EditProject_PackageTable").jqxGrid('addrow', null, result, "first");
			$("#popupWindow_PackageADD").jqxWindow('hide');
		}, 'json');
	});
}

function InitNewPackageWindowValidator() {

	$("#PackageADD_Validator").jqxValidator({scroll: false,
        rules: [
			{
				input: '#PackageName_ADD', message: '包件名称不得为空!', action: 'keyup, blur', rule: function (input) {
					var val = $("#PackageName_ADD").val();
					if (val == "") { return false; } return true;
				}
			},
			/*                { input: '#EntrustMoney_ADD', message: '委托金额(万元)(万元)必须为数字!', action: 'keyup, blur', rule: function(input){
								var val = $("#EntrustMoney_ADD").jqxInput('val');
								if(val==""){return false;}
								var reg = /[+|-|0-9]{2,30}$/;
								if (reg.test(val)) {return true;}else{return false;}
							} },*/
			{
				input: '#PublicDate_ADD', message: '公告日期必须在今天以后！', action: 'keyup, blur', rule: function (input, commit) {
                    var date = $('#PublicDate_ADD').jqxDateTimeInput('value');
                    if (date != undefined) {
						var today = new Date();
						var result = date > today
						return result;
                    } else {
						return true;
                    }
                    // call commit with false, when you are doing server validation and you want to display a validation error on this field. 
                }
			},
			{
				input: '#SecondPublicDate_ADD', message: '公告日期必须在今天以后！', action: 'keyup, blur', rule: function (input, commit) {
                    var date = $('#SecondPublicDate_ADD').jqxDateTimeInput('value');
                    if (date != undefined) {
						var today = new Date();
						var result = date > today
						return result;
                    } else {
						return true;
                    }
                    // call commit with false, when you are doing server validation and you want to display a validation error on this field. 
                }
			},
			{
				input: '#OpenDate_ADD', message: '开标日期必须在公告日期以后！', action: 'keyup, blur', rule: function (input) {
					var date = $('#OpenDate_ADD').jqxDateTimeInput('value');
					var public_date = $('#PublicDate_ADD').jqxDateTimeInput('value');
					if (date != undefined && public_date != undefined) {
						var result = date > public_date
						return result;
					} else {
						return true;
					}
				}
			},
			{
				input: '#ReviewDate_ADD', message: '评标日期必须在开标日期以后！', action: 'keyup, blur', rule: function (input) {
					var date = $('#ReviewDate_ADD').jqxDateTimeInput('value');
					var open_date = $('#OpenDate_ADD').jqxDateTimeInput('value');
					var public_date = $('#PublicDate_ADD').jqxDateTimeInput('value');
					if (date != undefined && open_date != undefined) {
						var result = date >= open_date
						return result;
					} else {
						return true;
					}
				}
			}
		]
	});
}



function showMoreRows(projectpackage) {
	//	if (projectpackage.StateId >= '4') {
	$("#tr_WinningCompany").show()
	$("#tr_WinningDollar").show()
	$("#tr_SigningDate").show()
	//$("#tr_MakeOutDate").show()
	$("#tr_ChargeRate").show()
	$("#popupWindow_PackageManage").jqxWindow({ height: "550" });
	$("#StateIdPackage_Manage").jqxDropDownList({ disabled: false })
	// }else{
	// 	$("#tr_WinningCompany").hide()
	// 	$("#tr_WinningMoney").hide()
	// 	$("#tr_SigningDate").hide()
	// 	$("#tr_MakeOutDate").hide()
	// 	$("#tr_ChargeRate").hide()
	// 	$("#popupWindow_PackageManage").jqxWindow({height: "400" });
	// 	$("#StateIdPackage_Manage").jqxDropDownList({disabled:true})
	// }
}

function InitEditPackageWindow(dict, projectpackage) {
	InitEditPackageWindowValidator();

	if (projectpackage != undefined) {
		$("#packageID").text(projectpackage.Id);
		//$("#comment_Manage").jqxTextArea({  height: 60, width:400 });
		$("#comment_Manage").jqxTextArea('val', projectpackage.comment);
		$("#PackageNumber_Manage").jqxInput('val', projectpackage.PackageNumber);
		$("#PackageNumber_Manage").jqxInput({ disabled: false });
		$("#PackageName_Manage").jqxInput('val', projectpackage.PackageName);
		//$("#PackageName_Manage").jqxInput({disabled:true});
		$("#PublicDate_Manage").jqxDateTimeInput('val', projectpackage.PublicDate)
		if (projectpackage.PublicDate == "None" || projectpackage.PublicDate == "1900-01-01 00:00:00") {
			$("#PublicDate_Manage").jqxDateTimeInput('val', "")
		}
		$("#SecondPublicDate_Manage").jqxDateTimeInput('val', projectpackage.PublicDate)
		if (projectpackage.SecondPublicDate == "None" || projectpackage.SecondPublicDate == "1900-01-01 00:00:00") {
			$("#SecondPublicDate_Manage").jqxDateTimeInput('val', "")
		}
		$("#OpenDate_Manage").jqxDateTimeInput('val', projectpackage.OpenDate);
		if (projectpackage.OpenDate == "None" || projectpackage.OpenDate == "1900-01-01 00:00:00") {
			$("#OpenDate_Manage").jqxDateTimeInput('val', "")
		}
		$("#ReviewDate_Manage").jqxDateTimeInput('val', projectpackage.ReviewDate);
		if (projectpackage.ReviewDate == "None" || projectpackage.ReviewDate == "1900-01-01 00:00:00") {
			$("#ReviewDate_Manage").jqxDateTimeInput('val', "")
		}
		$("#SigningDate_Manage").jqxDateTimeInput('val', projectpackage.SigningDate);
		if (projectpackage.SigningDate == "None" || projectpackage.SigningDate == "1900-01-01 00:00:00") {
			$("#SigningDate_Manage").jqxDateTimeInput('val', "")
		}
		$("#MakeOutDate_Manage").jqxDateTimeInput('val', projectpackage.MakeOutDate);
		if (projectpackage.MakeOutDate == "None" || projectpackage.MakeOutDate == "1900-01-01 00:00:00") {
			$("#MakeOutDate_Manage").jqxDateTimeInput('val', "")
		}
		$("#EntrustMoney_Manage").jqxNumberInput('val', projectpackage.EntrustMoney);
		$("#WinningMoney_Manage").jqxNumberInput('val', projectpackage.WinningMoney);
		$("#WinningDollar_Manage").jqxNumberInput('val', projectpackage.WinningDollar);
		//$("#WinningCompany_Manage").jqxInput('val', projectpackage.WinningCompany);
		$('#WinningCompany_Manage').val(projectpackage.WinningCompany);
		$("#ChargeRate_Manage").jqxNumberInput('val', projectpackage.ChargeRate);
		BindPackageStatus("#StateIdPackage_Manage", dict.ProjectStatus, projectpackage)
	}
	else {
		$("#comment_Manage").jqxTextArea({ height: 60, width: 450 });
		$("#PackageNumber_Manage").jqxInput({ width: '200px', height: "25px" });
		$("#PackageNumber_Manage").jqxInput({ disabled: true })
		$("#PackageName_Manage").jqxInput({ width: '200px', height: "25px" });
		$("#PublicDate_Manage").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
		$("#PublicDate_Manage").jqxDateTimeInput('val', '')
		$("#SecondPublicDate_Manage").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
		$("#SecondPublicDate_Manage").jqxDateTimeInput('val', '')
		$("#OpenDate_Manage").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
		$("#OpenDate_Manage").jqxDateTimeInput('val', '')
		$("#ReviewDate_Manage").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
		$("#ReviewDate_Manage").jqxDateTimeInput('val', '')
		$("#SigningDate_Manage").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
		$("#SigningDate_Manage").jqxDateTimeInput('val', '')
		$("#MakeOutDate_Manage").jqxDateTimeInput({ culture: 'zh-CN', formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px', allowNullDate: true });
		$("#MakeOutDate_Manage").jqxDateTimeInput('val', '')
		$("#EntrustMoney_Manage").jqxNumberInput({ width: '200px', height: '25px', inputMode: 'simple' });
		$("#WinningMoney_Manage").jqxNumberInput({ width: '200px', height: '25px', inputMode: 'simple' });
		$("#WinningDollar_Manage").jqxNumberInput({ width: '200px', height: '25px', inputMode: 'simple' });
		//$("#WinningCompany_Manage").jqxInput({ width: '200px', height: "25px" });
		//$("#WinningCompany_Manage").jqxComboBox({ width: '200px', height: "25px" });
		$('#WinningCompany_Manage').jqxComboBox({ width: '200px', height: "25px", placeHolder: "", source: dict.dwmc, searchMode: 'contains', autoComplete: true});
		$("#ChargeRate_Manage").jqxNumberInput({ width: '200px', height: '25px', inputMode: 'simple' });
		/*$('#NotePackage_Manage').jqxEditor({height: "200px", width: '492px'});*/
		BindPackageStatus("#StateIdPackage_Manage", dict.ProjectStatus);
		//$("#StateIdPackage_Manage").jqxDropDownList({disabled:true})
		$("#popupWindow_PackageManage").jqxWindow({ width: 650, maxHeight: 950, resizable: true, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.40 });
		$("#CancelPackage_Manage").jqxButton({ theme: theme , template: "warning"});
		$("#CancelPackage_Manage").click(function () {
			$("#popupWindow_PackageManage").jqxWindow('hide');
		});
		$("#SavePackage_Manage").jqxButton({ theme: theme, template: "success" });
		$("#SavePackage_Manage").click(function () {
			if ($('#PackageManage_Validator').jqxValidator('validate') == false) { return; }
			var row = {
				Id: $("#packageID").text()
				
				, PackageNumber: $("#PackageNumber_Manage").val()
				, PackageName: $("#PackageName_Manage").val()
				, EntrustMoney: $("#EntrustMoney_Manage").val()
				, StateId: $("#StateIdPackage_Manage").val()
				, PublicDate: $("#PublicDate_Manage").val()
				, OpenDate: $("#OpenDate_Manage").val()
				, ReviewDate: $("#ReviewDate_Manage").val()
				, WinningCompany: $("#WinningCompany_Manage").val()
				, WinningMoney: $("#WinningMoney_Manage").val()
				, WinningDollar: $("#WinningDollar_Manage").val()
				, SigningDate: $("#SigningDate_Manage").val()
				, MakeOutDate: $("#MakeOutDate_Manage").val()
				, ChargeRate: $("#ChargeRate_Manage").val()
				, SecondPublicDate: $("#SecondPublicDate_Manage").val()
				, comment: $("#comment_Manage").val()
			}
			$.post("/bidding/default/update?table=ProjectPackage", row, function (result) {
				var source = $("#EditProject_PackageTable").jqxGrid("source")
				$("#EditProject_PackageTable").jqxGrid({ source: source });
				$("#popupWindow_PackageManage").jqxWindow('hide');
			}, 'json');
			$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter });
		});
	}


}

function InitEditPackageWindowValidator() {
	$("#PackageManage_Validator").jqxValidator({
		scroll: false,
        rules: [
			{
				input: '#PackageName_Manage', message: '包件名称不得为空!', action: 'keyup, blur', rule: function (input) {
					var val = $("#PackageName_Manage").val();
					if (val == "") { return false; } return true;
				}
			},/*
                { input: '#EntrustMoney_Manage', message: '委托金额(万元)(万元)必须为数字!', action: 'keyup, blur', rule: function(input){
        			var val = $("#EntrustMoney_Manage").jqxInput('val');
        			if(val==""){return false;}
        			var reg = /[+|-|0-9]{2,30}$/;
        			if (reg.test(val)) {return true;}else{return false;}
        		} },*/
			/*          { input: '#PublicDate_Manage', message: '公告日期必须在今天以后！', action: 'keyup, blur', rule: function (input, commit) {
						  var date = $('#PublicDate_Manage').jqxDateTimeInput('value');
						  if(date!=undefined){
							  var today = new Date();
							   var result = date > today
							   return result;
						  }else{
							  return true;
						  }
						  // call commit with false, when you are doing server validation and you want to display a validation error on this field. 
					  } },
					  { input: '#SecondPublicDate_Manage', message: '公告日期必须在今天以后！', action: 'keyup, blur', rule: function (input, commit) {
						  var date = $('#SecondPublicDate_Manage').jqxDateTimeInput('value');
						  if(date!=undefined){
							  var today = new Date();
							   var result = date > today
							   return result;
						  }else{
							  return true;
						  }
						  // call commit with false, when you are doing server validation and you want to display a validation error on this field. 
					  } },	*/
			{
				input: '#OpenDate_Manage', message: '开标日期必须在公告日期以后！', action: 'keyup, blur', rule: function (input) {
					var date = $('#OpenDate_Manage').jqxDateTimeInput('value');
					var public_date = $('#PublicDate_Manage').jqxDateTimeInput('value');
					if (date != undefined && public_date != undefined) {
						var result = date > public_date
						return result;
					} else {
						return true;
					}
				}
			},
			{
				input: '#ReviewDate_Manage', message: '评标日期必须在开标日期以后！', action: 'keyup, blur', rule: function (input) {
					var date = $('#ReviewDate_Manage').jqxDateTimeInput('value');
					var open_date = $('#OpenDate_Manage').jqxDateTimeInput('value');
					var public_date = $('#PublicDate_Manage').jqxDateTimeInput('value');
					if (date != undefined && open_date != undefined ) {
						var result = date > open_date
						return result;
					} else {
						return true;
					}
				}
			}
		]
	});
}


function InitPackageDateSetting() {
	$('#mainSplitter').jqxSplitter({ width: '99%', height: '99%', panels: [{ size: 300 }] });
	$('#jqxTree').jqxTree({ height: '100%', hasThreeStates: true, checkboxes: true, width: '120px' });
    $('#jqxTree').css('visibility', 'visible');
}

function InitProjectContactsGrid(dict, project) {
	// var data = generatedata(7);
    var exampleTheme = theme;
    var source =
		{
			url: 'getContactsByProjectID?pid=' + project.Id,
			datafields:
			[
				{ name: 'dwmc', type: 'string' },
				{ name: 'lxr', type: 'string' },
				{ name: 'sj', type: 'string' },
				{ name: 'lxdz', type: 'string' },
				{ name: 'cz', type: 'number' },
				{ name: 'dzxx', type: 'string' }
			],
			datatype: "json"
		};
    var adapter = new $.jqx.dataAdapter(source);
	gContactAdapter = new $.jqx.dataAdapter(source);
    var buildFilterPanel = function (filterPanel, datafield) {
        var textInput = $("<input style='margin:5px;'/>");
        var applyinput = $("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>");
        var filterbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 2px;">筛选</span>');
        applyinput.append(filterbutton);
        var filterclearbutton = $('<span tabindex="0" style="padding: 4px 12px; margin-left: 5px;">清除</span>');
        applyinput.append(filterclearbutton);
        filterPanel.append(textInput);
        filterPanel.append(applyinput);
        filterbutton.jqxButton({ theme: exampleTheme, height: 20 });
        filterclearbutton.jqxButton({ theme: exampleTheme, height: 20 });
        var dataSource =
			{
				localdata: adapter.records,
				datatype: "array",
				async: false
			}
        var dataadapter = new $.jqx.dataAdapter(dataSource,
			{
				autoBind: false,
				autoSort: true,
				autoSortField: datafield,
				async: false,
				uniqueDataFields: [datafield]
			});
        var column = $("#EditProject_ContactsTable").jqxGrid('getcolumn', datafield);
        textInput.jqxInput({ theme: exampleTheme, placeHolder: "输入 " + column.text, popupZIndex: 9999999, displayMember: datafield, source: dataadapter, height: 23, width: 175 });
        textInput.keyup(function (event) {
            if (event.keyCode === 13) {
                filterbutton.trigger('click');
            }
        });
        filterbutton.click(function () {
            var filtergroup = new $.jqx.filter();
            var filter_or_operator = 1;
            var filtervalue = textInput.val();
            var filtercondition = 'contains';
            var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
            filtergroup.addfilter(filter_or_operator, filter1);
            // add the filters.
            $("#EditProject_ContactsTable").jqxGrid('addfilter', datafield, filtergroup);
            // apply the filters.
            $("#EditProject_ContactsTable").jqxGrid('applyfilters');
            $("#EditProject_ContactsTable").jqxGrid('closemenu');
        });
        filterbutton.keydown(function (event) {
            if (event.keyCode === 13) {
                filterbutton.trigger('click');
            }
        });
        filterclearbutton.click(function () {
            $("#EditProject_ContactsTable").jqxGrid('removefilter', datafield);
            // apply the filters.
            $("#EditProject_ContactsTable").jqxGrid('applyfilters');
            $("#EditProject_ContactsTable").jqxGrid('closemenu');
        });
        filterclearbutton.keydown(function (event) {
            if (event.keyCode === 13) {
                filterclearbutton.trigger('click');
            }
            textInput.val("");
        });
    }
    $("#EditProject_ContactsTable").jqxGrid(
		{
			width: '100%',
			height: 200,
			source: adapter,
			//        pageable: true,
			enablebrowserselection: true,
			sortable: true,
			ready: function () {
			},
			autoshowfiltericon: true,
			columnmenuopening: function (menu, datafield, height) {
				var column = $("#EditProject_ContactsTable").jqxGrid('getcolumn', datafield);
				if (column.filtertype === "custom") {
					menu.height(155);
					setTimeout(function () {
						menu.find('input').focus();
					}, 25);
				}
				else menu.height(height);
			},
			columns: [
				{
					text: '联系人', datafield: 'lxr', width: '17%', align: 'center',
					filtertype: "custom",
					cellsalign: 'center',
					createfilterpanel: function (datafield, filterPanel) {
						buildFilterPanel(filterPanel, datafield);
					}
				},
				{
					text: '公司名称', datafield: 'dwmc', align: 'center',
					filtertype: "custom",
					cellsalign: 'center',
					createfilterpanel: function (datafield, filterPanel) {
						buildFilterPanel(filterPanel, datafield);
					},
					width: '17%',
				},
				{
					text: '联系地址', datafield: 'lxdz', createfilterpanel: function (datafield, filterPanel) {
						//      buildFilterPanel(filterPanel, datafield );
					}, width: '17%', align: 'center', cellsalign: 'center'
				},
				{
					text: '手机', createfilterpanel: function (datafield, filterPanel) {
						//                  buildFilterPanel(filterPanel, datafield );
					}, datafield: 'sj', width: '16%', cellsalign: 'center', align: 'center', cellsformat: 'yyyy-MM-dd'
				},
				{
					text: '传真', createfilterpanel: function (datafield, filterPanel) {
						//                buildFilterPanel(filterPanel, datafield );
					}, datafield: 'cz', width: '16%', calign: 'center', cellsalign: 'center', align: 'center'
				},
				{
					text: '电子邮件', createfilterpanel: function (datafield, filterPanel) {
						//               buildFilterPanel(filterPanel, datafield );
					}, datafield: 'dzxx', width: '17%', align: 'center', cellsalign: 'center', cellsformat: 'c2'
				}
			]
		});

    $("#EditProject_ContactsTable").on("filter", function (event) {

        var filterinfo = $("#EditProject_ContactsTable").jqxGrid('getfilterinformation');
        var eventData = "Triggered 'filter' event";
        for (var i = 0; i < filterinfo.length; i++) {
            var eventData = "Filter Column: " + filterinfo[i].filtercolumntext;

        }
    });
}

function InitProjectFinanceGrid(dict, project) {

    // prepare the data
    var source =
		{
			datatype: "json",
			datafields: [
				{ name: 'sr_bssr', type: 'float' },
				{ name: 'sr_zbfwf', type: 'float' },
				{ name: 'sr_wtxy', type: 'float' },
				{ name: 'zc_pqzjf', type: 'float' },
				{ name: 'zc_xmfc', type: 'float' }
			],
			url: "getFinanceByProjectID?pid=" + project.Id
		};
    var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
        if (value < 20) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
        }
    }
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
	gFinancedataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#EditProject_FinanceTable").jqxGrid(
		{
			width: '100%',
			height: 300,
			source: dataAdapter,
			pageable: false,
			autoheight: true,
			//        sortable: true,
			altrows: true,
			enabletooltips: true,
			editable: false,
			enablebrowserselection: true,
			columns: [
				{ text: '销售标书', columngroup: '收入', datafield: 'sr_bssr', cellsalign: 'center', align: 'center', width: '20%' },
				{ text: '中标服务费', columngroup: '收入', datafield: 'sr_zbfwf', cellsalign: 'center', align: 'center', width: '20%' },
				{ text: '委托协议', columngroup: '收入', datafield: 'sr_wtxy', align: 'center', cellsalign: 'center', width: '20%' },
				{ text: '聘请专家费用', columngroup: '支出', datafield: 'zc_pqzjf', cellsalign: 'center', align: 'center', width: '20%' },
				{ text: '项目分成费用', columngroup: '支出', datafield: 'zc_xmfc', cellsalign: 'center', align: 'center', width: '20%' }
			],
			columngroups: [
				{ text: '收入', align: 'center', name: '收入' },
				{ text: '支出', align: 'center', name: '支出' }
			]
		});
}



function autosetStatusBar(ProjectStatus) {
	var index = 0;
	if (ProjectStatus == 1) {
		index = 0
	} else if (ProjectStatus == 2) {
		index = 1
	} else if (ProjectStatus == 3) {
		index = 2
	} else if (ProjectStatus == 4) {
		index = 3
	} else if (ProjectStatus == 5) {
		index = 4
	} else if (ProjectStatus == 6) {
		index = 4
	} else if (ProjectStatus == 7) {
		index = 4
	} else if (ProjectStatus == 8) {
		index = 4
	}
	$("#navBar4").jqxNavBar({
		height: 30, selectedItem: index
   	});
	$("#navBar4").jqxNavBar({ disabled: true })

}

//项目支出管理
function InitProjectExpansenGrid(dict, project) {
	xmzc_init()

    var source =
		{
			url: "select_xmzc?projectid=" + project.Id,
			datatype: "json",
			updaterow: function (rowid, rowdata, commit) {
				// synchronize with the server - send update command
				// call commit with parameter true if the synchronization with the server is successful 
				// and with parameter false if the synchronization failder.
				commit(true);
			},
			datafields:
			[{ name: 'Id', type: 'string' },
				{ name: 'projectid', type: 'string' },
				{ name: 'sz', type: 'string' },
				{ name: 'zy', type: 'string' },
				{ name: 'je', type: 'float' },
				{ name: 'ywlx', type: 'string' },
				{ name: 'lyId', type: 'string' },
				{ name: 'username', type: 'string' },
				{ name: 'rq', type: 'date' }
			]
		};
    var dataAdapter = new $.jqx.dataAdapter(source);

    // initialize jqxGrid
    $("#EditProject_ExpanseTable").jqxGrid(
		{
			height: 265,
			width: "100%",
			pageable: false,
			showToolbar: true,
			source: dataAdapter,
			columnsresize: true,
			editable: false,
			enablebrowserselection: true,
			//        editmode: 'selectedcell',
			renderToolbar: function (toolBar) {
				//添加打印按钮、导出Excel按钮和其他按钮
				var me = this;
				var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
				var container = $("<div style='margin: 5px;'></div>");
				var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
				var modifyButton = $("<div style='float: left; margin-left: 5px;' id='xmzc_modify_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>修改</span></div>");

				var refreshButton = $("<div style='float: left; margin-left: 5px;'  id='xmzc_refresh_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
				var deleteButton = $("<div style='float: left; margin-left: 5px;'  id='xmzc_delete_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
				var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
				var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
				var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
				if (gViewFlag != 1)
				{ toolBar.append(container); }
				container.append(addNewButton);
				container.append(modifyButton);
				container.append(refreshButton);
				container.append(deleteButton);
				container.append(printButton);
				//container.append(tbzjprintButton);
				//            container.append(columnSettingButton);
				addNewButton.jqxButton({ template: "success" });
				modifyButton.jqxButton({ template: "primary" });
				modifyButton.jqxButton({ disabled: true });
				refreshButton.jqxButton({ template: "inverse" });
				printButton.jqxButton({ template: "info" });
				//exportButton.jqxButton({ template: "warning" });
				deleteButton.jqxButton({ template: "danger" });
				deleteButton.jqxButton({ disabled: true });
				//tbzjprintButton.jqxButton({ template: "success" });
				columnSettingButton.jqxButton({ template: "inverse" });
				addNewButton.click(function (event) {
					xmzc_popupwindow('add', '', function () {
						//refresh the grid when load completed
						$("#EditProject_ExpanseTable").jqxGrid({ source: dataAdapter });
						$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
					}, project.Id)
				});
				/*tbzjprintButton.click(function (event) {
					var selectedrowindex = $("#EditProject_MarginTable").jqxGrid('getselectedrowindex');
					var rowid = $("#EditProject_MarginTable").jqxGrid('getrowid', selectedrowindex);
					var data = $('#EditProject_MarginTable').jqxGrid('getrowdata', rowid);
					pn = data['Id'];
					if (pn!='')
					{
						var newWindow = window.open('tbzj_print?Id='+pn, '');
						newWindow.print();
					}	
				});	*/
				modifyButton.click(function (event) {
					var selectedrowindex = getselectindex("#EditProject_ExpanseTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}

					data = $('#EditProject_ExpanseTable').jqxGrid('getrowdata', selectedrowindex);


					if (data['lyId'] != -1)
					{
						alert('该记录来源于交易流水确认，不能修改')
						return;
					}
					xmzc_popupwindow('modify', data['Id'], function () {
						//refresh the grid when load completed
						$("#EditProject_ExpanseTable").jqxGrid({ source: dataAdapter });
						$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
					}, project.Id)


				});
				refreshButton.click(function (event) {
					$("#EditProject_ExpanseTable").jqxGrid({ source: dataAdapter });

				});
				columnSettingButton.click(function (event) {

				});
				printButton.click(function (event) {
					var gridContent = $("#EditProject_ExpanseTable").jqxGrid('exportdata', 'html');
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
				/*exportButton.click(function (event) {
					$("#EditProject_MarginTable").jqxGrid('exportdata', 'xls', 'jqxGrid');
				});*/
				// delete selected row.
				deleteButton.click(function (event) {
					var selectedrowindex = getselectindex("#EditProject_ExpanseTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}
					if (confirm('是否删除') == false) {
						return;
					}

					var rowscount = $("#EditProject_ExpanseTable").jqxGrid('getdatainformation').rowscount;
					if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
						var rowid = $("#EditProject_ExpanseTable").jqxGrid('getrowid', selectedrowindex);

					}
					data = $('#EditProject_ExpanseTable').jqxGrid('getrowdata', selectedrowindex);
					if (data['lyId'] != -1)
					{
						alert('该记录来源于交易流水确认，不能删除')
						return;
					}
					$.get('deleterow_xmzc?Id=' + data['Id'], function (result) {
						if (result == 'success') {
							alert('成功')
							$("#EditProject_ExpanseTable").jqxGrid('deleterow', rowid);
							$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
						}
						else {
							alert(result);
						}

					});
				});

			},
			columns: [
				{ text: '序号', datafield: 'Id', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '项目编号', datafield: 'projectid', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '收支', datafield: 'sz', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '摘要', datafield: 'zy', width: '20%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '金额(元)', datafield: 'je', width: '10%', cellsalign: 'center', cellsformat: 'f2',align: 'center', hidden: false },
				{ text: '业务类型', datafield: 'ywlx', width: '20%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '来源序号', datafield: 'lyId', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{ text: '操作人', datafield: 'username', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{ text: '日期', datafield: 'rq', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: '10%', cellsalign: 'center', align: 'center', hidden: false }

			]
		});
    // events
    var rowValues = "";

    $('#EditProject_ExpanseTable').on('rowclick', function (event) {
		var args = event.args;
		// row's bound index.
		var boundIndex = args.rowindex;
		// row's visible index.
		var visibleIndex = args.visibleindex;
		// right click.
		var rightclick = args.rightclick;
		// original event.
		var ev = args.originalEvent;
		var rowindex = event.args.rowindex;

		$("#xmzc_modify_Button").jqxButton({ disabled: false });
		$("#xmzc_delete_Button").jqxButton({ disabled: false });
		//var tbbzj = $("#EditProject_MarginTable").jqxGrid('getrowdata', rowindex);
		//$("#tbzjButton").val(tbbzj.Id)
		$("#EditProject_ExpanseTable").jqxGrid('selectrow', rowindex);
	});
}


//投标保证金管理
function InittbbzjGrid(dict, project) {

	tbbzj_init();
    var source =
		{
			url: "select_tbbzjbyProjectId?projectid=" + project.Id,
			datatype: "json",
			updaterow: function (rowid, rowdata, commit) {
				// synchronize with the server - send update command
				// call commit with parameter true if the synchronization with the server is successful 
				// and with parameter false if the synchronization failder.
				commit(true);
			},
			datafields:
			[{ name: 'Id', type: 'string' },
				{ name: 'dwmc', type: 'string' },
				{ name: 'projectid', type: 'string' },
				{ name: 'bzjlx', type: 'string' },
				{ name: 'je', type: 'float' },
				{ name: 'rq', type: 'date' },
				{ name: 'username', type: 'string' },
				{ name: 'ly', type: 'string' }
			]
		};
    var dataAdapter = new $.jqx.dataAdapter(source);

    // initialize jqxGrid
    $("#EdittbbzjTable").jqxGrid(
		{
			height: 265,
			width: "100%",
			pageable: false,
			showToolbar: true,
			source: dataAdapter,
			columnsresize: true,
			editable: false,
			enablebrowserselection: true,
			//        editmode: 'selectedcell',
			renderToolbar: function (toolBar) {
				//添加打印按钮、导出Excel按钮和其他按钮
				var me = this;
				var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
				var container = $("<div style='margin: 5px;'></div>");
				var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
				var modifyButton = $("<div style='float: left; margin-left: 5px;' id='tbbzj_modify_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>修改</span></div>");
				var addNewButton2 = $("<div style='float: left; margin-left: 5px;' ><span style='margin-left: 4px; position: relative; top: 0px;'>退保证金</span></div>");

				var refreshButton = $("<div style='float: left; margin-left: 5px;'  id='tbbzj_refresh_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
				var deleteButton = $("<div style='float: left; margin-left: 5px;'  id='tbbzj_delete_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
				var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
				var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
				var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
				if (gViewFlag != 1)
				{ toolBar.append(container); }
				container.append(addNewButton);
				container.append(addNewButton2);
				container.append(modifyButton);
				container.append(refreshButton);
				container.append(deleteButton);
				container.append(printButton);
				//container.append(tbzjprintButton);
				//            container.append(columnSettingButton);
				addNewButton.jqxButton({ template: "success" });
				addNewButton2.jqxButton({ template: "success" });
				modifyButton.jqxButton({ template: "primary" });
				modifyButton.jqxButton({ disabled: true });
				refreshButton.jqxButton({ template: "inverse" });
				printButton.jqxButton({ template: "info" });
				//exportButton.jqxButton({ template: "warning" });
				deleteButton.jqxButton({ template: "danger" });
				deleteButton.jqxButton({ disabled: true });
				//tbzjprintButton.jqxButton({ template: "success" });
				columnSettingButton.jqxButton({ template: "inverse" });

				addNewButton2.click(function (event) {

					var selectedrowindex = $("#EdittbbzjTable").jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}
					data = $('#EdittbbzjTable').jqxGrid('getrowdata', selectedrowindex);
					var tbbzjid = data['Id'];
					tbzj_popupwindow('add', '', function () {
						//refresh the grid when load completed
						//$("#EdittbbzjTable").jqxGrid({ source: dataAdapter });
						$("#EdittbzjTable").jqxGrid({ source: gtbzjdataAdapter });
						$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
					}, tbbzjid)
				});
				addNewButton.click(function (event) {
					tbbzj_popupwindow('add', '', function () {
						//refresh the grid when load completed
						$("#EdittbbzjTable").jqxGrid({ source: dataAdapter });
						$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
						$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
					}, project.Id)
				});

				modifyButton.click(function (event) {
					var selectedrowindex = $("#EdittbbzjTable").jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}
					var disabled = modifyButton.jqxButton('disabled')
					if (disabled == false) {
						var selectedrowindex = $("#EdittbbzjTable").jqxGrid('getselectedrowindex');
						data = $('#EdittbbzjTable').jqxGrid('getrowdata', selectedrowindex);
						if (data['ly']=='交易流水确认')
						{
							alert('该记录来源于交易流水确认，不能修改')
						}
						else
						{
							tbbzj_popupwindow('modify', data['Id'], function () {
								//refresh the grid when load completed
								$("#EdittbbzjTable").jqxGrid({ source: dataAdapter });
								$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
								$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
							}, project.Id)
						}
					}

				});
				refreshButton.click(function (event) {
					$("#EdittbbzjTable").jqxGrid({ source: dataAdapter });

				});
				columnSettingButton.click(function (event) {

				});
				printButton.click(function (event) {
					var gridContent = $("#EdittbbzjTable").jqxGrid('exportdata', 'html');
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

				// delete selected row.
				deleteButton.click(function (event) {
					var selectedrowindex = getselectindex("#EdittbbzjTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}
					if (confirm('是否删除') == false) {
						return;
					}

					var rowscount = $("#EdittbbzjTable").jqxGrid('getdatainformation').rowscount;
					if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
						var rowid = $("#EdittbbzjTable").jqxGrid('getrowid', selectedrowindex);

					}
					data = $('#EdittbbzjTable').jqxGrid('getrowdata', selectedrowindex);
					if (data['ly']=='交易流水确认')
					{
						alert('该记录来源于交易流水确认，不能删除');
						return;
					}
				
					$.get('deleterow_tbbzj?Id=' + data['Id'], function (result) {
						if (result == 'success') {
							alert('成功')
							$("#EdittbbzjTable").jqxGrid('deleterow', rowid);
							$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
							$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
						}
						else {
							alert(result);
						}

					});
				});

			},
			columns: [
				{ text: '序号', datafield: 'Id', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '单位名称', datafield: 'dwmc', width: '25%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '项目编号', datafield: 'projectid', width: '25%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '保证金类型', datafield: 'bzjlx', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '金额(元)', datafield: 'je', width: '10%', cellsalign: 'center', cellsformat: 'f2',align: 'center', hidden: false },
				{ text: '日期', datafield: 'rq', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: '20%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '操作人', datafield: 'username', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{ text: '来源', datafield: 'ly', width: '10%', cellsalign: 'center', align: 'center', hidden: true }
			]
		});
    // events
    var rowValues = "";

    $('#EdittbbzjTable').on('rowclick', function (event) {
		var args = event.args;
		// row's bound index.
		var boundIndex = args.rowindex;
		// row's visible index.
		var visibleIndex = args.visibleindex;
		// right click.
		var rightclick = args.rightclick;
		// original event.
		var ev = args.originalEvent;
		var rowindex = event.args.rowindex;

		$("#tbbzj_modify_Button").jqxButton({ disabled: false });
		$("#tbbzj_delete_Button").jqxButton({ disabled: false });
		$("#EdittbbzjTable").jqxGrid('selectrow', rowindex);
	});
}

//退保证金
function InittbzjGrid(dict, project) {
	tbzj_init()

    var source =
		{
			url: "select_tbzjbyProjectId?projectid=" + project.Id,
			datatype: "json",
			updaterow: function (rowid, rowdata, commit) {
				// synchronize with the server - send update command
				// call commit with parameter true if the synchronization with the server is successful 
				// and with parameter false if the synchronization failder.
				commit(true);
			},
			datafields:
			[{ name: 'Id', type: 'string' },
				{ name: 'dwmc', type: 'string' },
				{ name: 'rq', type: 'date' },
				{ name: 'projectid', type: 'string' },
				{ name: 'username', type: 'string' },
				{ name: 'ly', type: 'string' },
				{ name: 'khyh', type: 'string' },
				{ name: 'yhzh', type: 'string' },
				{ name: 'fkfs', type: 'string' },
				{ name: 'je', type: 'float' }
			]
		};
    var dataAdapter = new $.jqx.dataAdapter(source);
	gtbzjdataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#EdittbzjTable").jqxGrid(
		{
			height: 265,
			width: "100%",
			pageable: false,
			showToolbar: true,
			source: dataAdapter,
			columnsresize: true,
			editable: false,
			enablebrowserselection: true,
			//        editmode: 'selectedcell',
			renderToolbar: function (toolBar) {
				//添加打印按钮、导出Excel按钮和其他按钮
				var me = this;
				var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
				var container = $("<div style='margin: 5px;'></div>");
				var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
				var modifyButton = $("<div style='float: left; margin-left: 5px;' id='tbzj_modify_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>修改</span></div>");

				var refreshButton = $("<div style='float: left; margin-left: 5px;'  id='tbzj_refresh_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
				var deleteButton = $("<div style='float: left; margin-left: 5px;'  id='tbzj_delete_Button'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
				var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
				var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
				var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
				var tbzjprintButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印退款申请单</span></div>");
				if (gViewFlag != 1)
				{ toolBar.append(container); }
				container.append(addNewButton);
				container.append(modifyButton);
				container.append(refreshButton);
				container.append(deleteButton);
				container.append(printButton);
				container.append(tbzjprintButton);
				//            container.append(columnSettingButton);
				addNewButton.jqxButton({ template: "success" });
				modifyButton.jqxButton({ template: "primary" });
				modifyButton.jqxButton({ disabled: true });
				refreshButton.jqxButton({ template: "inverse" });
				printButton.jqxButton({ template: "info" });
				//exportButton.jqxButton({ template: "warning" });
				deleteButton.jqxButton({ template: "danger" });
				deleteButton.jqxButton({ disabled: true });
				tbzjprintButton.jqxButton({ template: "success" });
				columnSettingButton.jqxButton({ template: "inverse" });

				tbzjprintButton.click(function (event) {
					var selectedrowindex = getselectindex("#EdittbzjTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex==-1)
					{
						return;
					}
					var rowid = $("#EdittbzjTable").jqxGrid('getrowid', selectedrowindex);
					var data = $('#EdittbzjTable').jqxGrid('getrowdata', rowid);
					pn = data['Id'];
					if (pn != '') {
						var newWindow = window.open('tbzj_print?Id=' + pn, '');
						newWindow.print();
					}
				});
				addNewButton.click(function (event) {
					tbzj_popupwindow1('add', '', function () {
						//refresh the grid when load completed
						$("#EdittbzjTable").jqxGrid({ source: dataAdapter });
						$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
						$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
					}, project.Id)
				});

				modifyButton.click(function (event) {
					var disabled = modifyButton.jqxButton('disabled')
					if (disabled == false) {
						var selectedrowindex = getselectindex("#EdittbzjTable");//.jqxGrid('getselectedrowindex');
						data = $('#EdittbzjTable').jqxGrid('getrowdata', selectedrowindex);
						tbzj_popupwindow1('modify', data['Id'], function () {
							//refresh the grid when load completed
							$("#EdittbzjTable").jqxGrid({ source: dataAdapter });
							$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter })
							$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
						}, project.Id)
					}

				});
				refreshButton.click(function (event) {
					$("#EdittbzjTable").jqxGrid({ source: dataAdapter });

				});
				columnSettingButton.click(function (event) {

				});
				printButton.click(function (event) {
					var gridContent = $("#EdittbzjTable").jqxGrid('exportdata', 'html');
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

				// delete selected row.
				deleteButton.click(function (event) {
					var selectedrowindex = getselectindex("#EdittbzjTable");//.jqxGrid('getselectedrowindex');
					if (selectedrowindex == -1) {
						return;
					}
					if (confirm('是否删除') == false) {
						return;
					}

					var rowscount = $("#EdittbzjTable").jqxGrid('getdatainformation').rowscount;
					if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
						var rowid = $("#EdittbzjTable").jqxGrid('getrowid', selectedrowindex);

					}
					data = $('#EdittbzjTable').jqxGrid('getrowdata', selectedrowindex);
					$.get('deleterow_tbzj?Id=' + data['Id'], function (result) {
						if (result == 'success') {
							alert('成功')
							$("#EdittbzjTable").jqxGrid('deleterow', rowid);
							$("#EditProject_FinanceTable").jqxGrid({ source: gFinancedataAdapter });
							$("#EditProject_ViewTable").jqxGrid({ source: gProjectViewdataAdapter });
						}
						else {
							alert(result);
						}

					});
				});

			},
			columns: [
				{ text: '序号', datafield: 'Id', width: '5%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '单位名称', datafield: 'dwmc', width: '20%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '日期', datafield: 'rq', cellsformat: 'yyyy-MM-dd HH:mm:ss', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '项目编号', datafield: 'projectid', width: '15%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '操作人', datafield: 'username', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{ text: '来源', datafield: 'ly', width: '10%', cellsalign: 'center', align: 'center', hidden: true },
				{ text: '开户银行', datafield: 'khyh', width: '15%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '银行账号', datafield: 'yhzh', width: '15%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '付款方式', datafield: 'fkfs', width: '10%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '金额(元)', datafield: 'je', width: '10%', cellsalign: 'center', cellsformat: 'f2',align: 'center', hidden: false }
			]
		});
    // events
    var rowValues = "";

    $('#EdittbzjTable').on('rowclick', function (event) {
		var args = event.args;
		// row's bound index.
		var boundIndex = args.rowindex;
		// row's visible index.
		var visibleIndex = args.visibleindex;
		// right click.
		var rightclick = args.rightclick;
		// original event.
		var ev = args.originalEvent;
		var rowindex = event.args.rowindex;

		$("#tbzj_modify_Button").jqxButton({ disabled: false });
		$("#tbzj_delete_Button").jqxButton({ disabled: false });
		$("#EdittbzjTable").jqxGrid('selectrow', rowindex);
	});
}



function InitProjectViewGrid(dict, project) {

    var source =
		{
			url: "getProjectView?id=" + project.Id,
			datatype: "json",
			datafields:
			[{ name: 'dwmc', type: 'string' },
				{ name: 'gmbsje', type: 'float' },
				{ name: 'tbbzjje', type: 'float' },
				{ name: 'tbzjje', type: 'float' }
			]
		};

	gProjectViewdataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#EditProject_ViewTable").jqxGrid(
		{
			height: 265,
			width: "100%",
			pageable: false,
			showToolbar: false,
			source: gProjectViewdataAdapter,
			enablebrowserselection: true,
			columnsresize: true,
			editable: false,

			/*			renderToolbar: function (toolBar) {
							//添加打印按钮、导出Excel按钮和其他按钮
							var me = this;
							var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
							var container = $("<div style='margin: 5px;'></div>");
			
							var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
							var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
							var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
							var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
							if (gViewFlag != 1)
							{toolBar.append(container);}
							container.append(refreshButton);
							container.append(printButton);
							container.append(columnSettingButton);
			
							refreshButton.jqxButton({ template: "inverse" });
							printButton.jqxButton({ template: "info" });
							exportButton.jqxButton({ template: "warning" });
			
							columnSettingButton.jqxButton({ template: "inverse" });
			
							refreshButton.click(function (event) {
								$("#EditProject_MarginTable").jqxGrid({ source: dataAdapter });
							});
			
							printButton.click(function (event) {
								var gridContent = $("#EditProject_MarginTable").jqxGrid('exportdata', 'html');
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
								$("#EditProject_MarginTable").jqxGrid('exportdata', 'xls', 'jqxGrid');
							});
							// delete selected row.
							deleteButton.click(function (event) {
								var selectedrowindex = $("#EditProject_MarginTable").jqxGrid('getselectedrowindex');
								var rowscount = $("#EditProject_MarginTable").jqxGrid('getdatainformation').rowscount;
								var id = $("#EditProject_MarginTable").jqxGrid('getrowid', selectedrowindex);
								$("#EditProject_MarginTable").jqxGrid('deleterow', id);
							});
			
						},*/
			columns: [
				{ text: '单位名称', datafield: 'dwmc', width: '30%', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '购买标书金额(元)', datafield: 'gmbsje', width: '20%', cellsformat:'f2', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '缴纳保证金金额(元)', datafield: 'tbbzjje', width: '20%', cellsformat:'f2', cellsalign: 'center', align: 'center', hidden: false },
				{ text: '退保证金金额(元)', datafield: 'tbzjje', width: '20%', cellsformat:'f2', cellsalign: 'center', align: 'center', hidden: false }
			]
		});
    // events

}


$(document).ready(function () {
	var project = JSON.parse($("#ProjectData").text())[0]
	var dict = JSON.parse($("#Dictionaries").text())
	gViewFlag = $("#viewflag").text()
	autosetStatusBar(project.ProjectStatusId)
	InitEditProjectPage(dict, project);
	InitProjectPackageGrid(dict, project);
	InitProjectDocumentGrid(dict, project);
	InitProjectViewGrid(dict, project);
	InitNewPackageWindow(dict, project);
	InitEditPackageWindow(dict);
	InitProjectContactsGrid(dict, project);
	InitProjectExpansenGrid(dict, project);
	InitProjectFinanceGrid(dict, project);
	InittbbzjGrid(dict, project);
	InittbzjGrid(dict, project);


});