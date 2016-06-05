
function InitEditProjectPage(dict,project){
	$("#jqxProjectBasicExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectPackagesExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectDocumentsExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectMarginExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectContactsExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectFinanceExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#EditProject_ProjectCode").addClass('jqx-input')
	$("#EditProject_ProjectCode").width(200)
	$("#EditProject_ProjectCode").height(25)
	$("#EditProject_ProjectCode").val(project.ProjectCode)
	$("#EditProject_ProjectCode").jqxInput({disabled: true });
	//填写项目名称
	$("#EditProject_ProjectName").addClass('jqx-input')
	$("#EditProject_ProjectName").width(200)
	$("#EditProject_ProjectName").height(25)
	$("#EditProject_ProjectName").val(project.ProjectName)
	$("#EditProject_ProjectName").jqxInput({disabled: true });
	//采购单位
    BindCustomer("#EditProject_Customer",dict.Customer,project)
    $("#EditProject_Customer").jqxComboBox({disabled: true });
	//项目类型
	BindProjectType("#EditProject_ProjectType",dict.ProjectType,project);
	//采购类型
	BindPurchaseStyle("#EditProject_PurchaseStyle",dict.PurchaseStyle,project)
	//	项目来源
	BindProjectSource("#EditProject_ProjectSource",dict.ProjectSource,project)
	//项目资金来源
   BindFundingSource("#EditProject_FundingSource",dict.FundingSource,project)
    //项目负责人
   BindEmployee("#EditProject_Employee",dict.Employee,project)
   //协助人
   BindAssitant("#EditProject_Assistant",dict.Employee,project)
   //项目状态
   BindProjectStatus("#EditProject_ProjectStatus",dict.ProjectStatus,project)
	//项目创建时间
	$("#EditProject_CreationDate").jqxDateTimeInput({ formatString: "yyyy-MM-dd", showTimeButton: false, width: '200px', height: '25px' ,disabled:true});
	
	$("#EditProject_Save").jqxButton({template:'success'});
	$("#EditProject_Save").click(function () {
		var row = {Id:project.Id
				,EmployeeId:$("#EditProject_Employee").val()
				,Assistant:$("#EditProject_Assistant").val()
				,ProjectSourceId:$("#EditProject_ProjectSource").val()
				,FundingSourceId:$("#EditProject_FundingSource").val()
				,ProjectTypeId:$("#NewProject_ProjectType").val()
				,ManagementStyleId:$("#EditProject_ManagementStyle").val()
				,PurchaseStyleId:$("#EditProject_PurchaseStyle").val()
				,ProjectStatusId:$("#EditProject_ProjectStatus").val()
				,CreationDate:$("#EditProject_CreationDate").val()}
		$.post("/bidding/default/update?table=Project",row,function(result){
   		alert("操作成功！");
   		project  = JSON.parse(result)[0];
   		//采购单位
   	    BindCustomer("#EditProject_Customer",dict.Customer,project)
   	    $("#EditProject_Customer").jqxComboBox({disabled: true });
   		//项目类型
   		BindProjectType("#EditProject_ProjectType",dict.ProjectType,project);
   		//采购类型
   		BindPurchaseStyle("#EditProject_PurchaseStyle",dict.PurchaseStyle,project)
   		//项目来源
   		BindProjectSource("#EditProject_ProjectSource",dict.ProjectSource,project)
   		//项目资金来源
   	   BindFundingSource("#EditProject_FundingSource",dict.FundingSource,project)
   	    //项目负责人
   	   BindEmployee("#EditProject_Employee",dict.Employee,project)
   	   //协助人
   	   BindAssitant("#EditProject_Assistant",dict.Employee,project)
   	   //项目状态
   	   BindProjectStatus("#EditProject_ProjectStatus",dict.ProjectStatus,project)
   });
	});
	$("#EditProject_Cancel").jqxButton({template:'warning'});
	$("#EditProject_Cancel").click(function () {
		BindCustomer("#EditProject_Customer",dict.Customer,project)
	    $("#EditProject_Customer").jqxComboBox({disabled: true });
		//项目类型
		BindProjectType("#EditProject_ProjectType",dict.ProjectType,project);
		//采购类型
		BindPurchaseStyle("#EditProject_PurchaseStyle",dict.PurchaseStyle,project)
		//	项目来源
		BindProjectSource("#EditProject_ProjectSource",dict.ProjectSource,project)
		//项目资金来源
	   BindFundingSource("#EditProject_FundingSource",dict.FundingSource,project)
	    //项目负责人
	   BindEmployee("#EditProject_Employee",dict.Employee,project)
	   //协助人
	   BindAssitant("#EditProject_Assistant",dict.Employee,project)
	   //项目状态
	   BindProjectStatus("#EditProject_ProjectStatus",dict.ProjectStatus,project)
	});
	$("#EditProject_Return").jqxButton({template:'danger'});
	$("#EditProject_Return").click(function () {
		window.location="/bidding/default/xmgl.html"
	});
}

function InitProjectPackageGrid(dict,project){
	    var url = "/bidding/default/SelectPackagesByProjectId?id="+project.Id
		var source =
		{
		    dataFields: [{"name":"Id","type":"string"},
		                 {"name":"ProjectId","type":"string"},
		                 {"name":"PackageNumber","type":"string"},
		                 {"name":"PackageName","type":"string"},
		                 {"name":"StateId","type":"string"},
		                 {"name":"CreationDate","type":"datetime"},
		                 {"name":"PublicDate","type":"datetime"},
		                 {"name":"OpenDate","type":"datetime"},
		                 {"name":"ReviewDate","type":"datetime"},
		                 {"name":"SigningDate","type":"datetime"},
		                 {"name":"MakeOutDate","type":"datetime"},
		                 {"name":"EntrustMoney","type":"string"},
		                 {"name":"WinningMoney","type":"string"},
		                 {"name":"WinningCompany","type":"string"},
		                 {"name":"ChargeRate","type":"string"},
		                 {"name":"Note","type":"string"},
		                 {"name":"IsDelete","type":"string"}],
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
		var projectPackage_columns_content  = 
			[{"datafield":"PackageNumber","text":"包件编号", editable:false, cellsalign: 'center', align: 'center',width: '14%'},
			 {"datafield":"PackageName","text":"包件名称",  cellsalign: 'center', align: 'center',width: '15%'},
			 {"datafield":"StateId","text":"包件状态", cellsalign: 'center', align: 'center',columntype: 'dropdownlist',width: '7%',
				 cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
          		  var label="";
           		  var pt = JSON.parse(dict.ProjectStatus);
           		  for(var i=0;i<pt.length;i++){
           			  if(pt[i].Id==value.toString()) {
           				  label = pt[i].Name
           			  }
           		  }
      		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 5px;">'+ label+' </div>'
                 },
				 createeditor: function (row, column, editor) {},
                 // update the editor's value before saving it.
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {}
                 },
             {"datafield":"CreationDate","text":"创建时间",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '10%'},
             {"datafield":"PublicDate","text":"公告时间",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '6%',
            	 filtertype: 'custom',createfilterpanel: function (datafield, filterPanel) {
             	    buildFilterPanel(filterPanel, datafield);
                 },
            	 cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
	          		 var label=value;
	           		 if (label=="1900-01-01 00:00:00"||label=="None" ){
	           			label = ""
	           		 }
	           		 	return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >'+ label+' </div>'
	                 }},
             {"datafield":"OpenDate","text":"开标时间",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '6%',
				 cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
	          		 var label=value;
	           		 if (label=="1900-01-01 00:00:00"||label=="None" ){
	           			label = ""
	           		 }
	           		 	return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >'+ label+' </div>'
	                 }},
             {"datafield":"ReviewDate","text":"评标时间",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '6%',
				 cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
	          		 var label=value;
	           		 if (label=="1900-01-01 00:00:00"||label=="None" ){
	           			label = ""
	           		 }
	           		 	return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >'+ label+' </div>'
	                 }},
             {"datafield":"SigningDate","text":"签约时间",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '6%',
				 cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
	          		 var label=value;
	           		 if (label=="1900-01-01 00:00:00"||label=="None" ){
	           			label = ""
	           		 }
	           		 	return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >'+ label+' </div>'
	                 }},
		     {"datafield":"MakeOutDate","text":"开票时间",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '6%',
				 cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
	          		 var label=value;
	           		 if (label=="1900-01-01 00:00:00"||label=="None" ){
	           			label = ""
	           		 }
	           		 	return '<div class="jqx-grid-cell-middle-align" style="margin: 5px;" >'+ label+' </div>'
	                 }},
			 {"datafield":"EntrustMoney","text":"委托金额",  cellsalign: 'center', align: 'center',width: '6%'},
			 {"datafield":"WinningMoney","text":"中标金额",  cellsalign: 'center', align: 'center',width: '6%'},
			 {"datafield":"WinningCompany","text":"中标单位",  cellsalign: 'center', align: 'center',width: '6%'},
			 {"datafield":"ChargeRate","text":"服务费率",  cellsalign: 'center', align: 'center',width: '6%'}]
		
		$("#EditProject_PackageTable").jqxGrid(
		        {
		            height: 265,
		            width: "100%",
		            columnsresize: true,
		            filterable: true,
		            source: projectPackageurldataAdapter,
		            selectionmode: 'singlerow',
		            autoRowHeight: false,
		            showToolbar: true,
		            columnsautoresize: true,
		            ready: function()
		            {
		                // called when the DataTable is loaded.         
		            },
		            toolbarHeight: 35,
		            renderToolbar: function(toolBar) {
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
		                toolBar.append(container);
		                container.append(addNewButton);
		                container.append(edittingButton);
		                container.append(refreshButton);
		                container.append(deleteButton);
		                container.append(printButton);
		                container.append(exportButton);
		                
		                //container.append(updateButton);
		                addNewButton.jqxButton({ template: "success" });
		                refreshButton.jqxButton({ template: "inverse" });
		                printButton.jqxButton({ template: "info" });
		                exportButton.jqxButton({ template: "warning" });
		                deleteButton.jqxButton({ template: "danger" });
		                edittingButton.jqxButton({ disabled: true});
		                edittingButton.jqxButton({ template: "primary" });
		                updateButton.jqxButton();
		                addNewButton.click(function (event) {
		                	$("#popupWindow_PackageADD").jqxWindow('show');
		                	var rows  = $("#EditProject_PackageTable").jqxGrid('getboundrows');
		                	$("#PackageNumber_ADD").jqxInput().val(project.ProjectCode+"-0"+(rows.length+1))
		                	$("#PackageNumber_ADD").jqxInput({disabled:true})
		                });
		                refreshButton.click(function (event) {
		                	var source = $("#EditProject_PackageTable").jqxGrid('source');
		                    $("#EditProject_PackageTable").jqxGrid({ source:source });
		                });
		                edittingButton.click(function (event) {
		                	var disabled = edittingButton.jqxButton('disabled')
		                	if(disabled==false){
		                		$("#popupWindow_PackageManage").jqxWindow('show');
		                	}
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
		                    var selectedrowindex = $("#EditProject_PackageTable").jqxGrid('getselectedrowindex');
		                    var rowscount = $("#EditProject_PackageTable").jqxGrid('getdatainformation').rowscount;
		                    var id = $("#EditProject_PackageTable").jqxGrid('getrowid', selectedrowindex);
		                    $("#EditProject_PackageTable").jqxGrid('deleterow', id);
		                });
		                updateButton.click(function(event){
		                	//update all the data in the grid
		                	alert("修改成功!")
		                })
		            },
		            columns: projectPackage_columns_content
		        });
		$('#EditProject_PackageTable').jqxGrid('autoresizecolumns'); 
		$('#EditProject_PackageTable').on('rowclick', function (event) 
				{
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
				    
				    $("#packageEditButton").jqxButton({ disabled: false});
				    var projectPackage = $("#EditProject_PackageTable").jqxGrid('getrowdata', rowindex);
				    $("#EditProject_PackageTable").jqxGrid('selectrow', rowindex);
				    $("#packageID").text(projectPackage.Id);
				    $("#PackageNumber_Manage").jqxInput('val',projectPackage.PackageNumber);
					$("#PackageNumber_Manage").jqxInput({disabled:true});
					$("#PackageName_Manage").jqxInput('val',projectPackage.PackageName);
					$("#PackageName_Manage").jqxInput({disabled:true});
					
					$("#PublicDate_Manage").jqxDateTimeInput('val',projectPackage.PublicDate)
					if(projectPackage.PublicDate=="None"){
						$("#PublicDate_Manage").jqxDateTimeInput('val',"")		
					}
					
					$("#OpenDate_Manage").jqxDateTimeInput('val',projectPackage.OpenDate);
					if(projectPackage.OpenDate=="None"){
						$("#OpenDate_Manage").jqxDateTimeInput('val',"")		
					}
					$("#ReviewDate_Manage").jqxDateTimeInput('val',projectPackage.ReviewDate);
					if(projectPackage.ReviewDate=="None"){
						$("#ReviewDate_Manage").jqxDateTimeInput('val',"")		
					}
					$("#SigningDate_Manage").jqxDateTimeInput('val',projectPackage.SigningDate);
					if(projectPackage.SigningDate=="None"){
						$("#SigningDate_Manage").jqxDateTimeInput('val',"")		
					}
					$("#MakeOutDate_Manage").jqxDateTimeInput('val',projectPackage.MakeOutDate);
					if(projectPackage.MakeOutDate=="None"){
						$("#MakeOutDate_Manage").jqxDateTimeInput('val',"")		
					}
					$("#EntrustMoney_Manage").jqxNumberInput('val',projectPackage.EntrustMoney);
					$("#WinningMoney_Manage").jqxNumberInput('val',projectPackage.WinningMoney);
					$("#WinningCompany_Manage").jqxInput('val',projectPackage.WinningCompany);
					$("#ChargeRate_Manage").jqxNumberInput('val',projectPackage.ChargeRate);
					BindPackageStatus("#StateIdPackage_Manage",dict.ProjectStatus,projectPackage)
				}); 
}

function InitProjectDocumentGrid(dict,project){
	gmbs_init();
    var source =
    {
        url: "select_gmbsbyProjectId?id="+project.Id,
        datatype: "json",
        updaterow: function (rowid, rowdata, commit) {
            // synchronize with the server - send update command
            // call commit with parameter true if the synchronization with the server is successful 
            // and with parameter false if the synchronization failder.
            commit(true);
        },
        datafields:
        [
            {name : 'Id',type : 'string'	},
			{name : 'dwmc',type : 'string'	},
			{name : 'rq',type : 'string'	},
			{name : 'zzszwmc',type : 'string'	},
			{name : 'zzsywmc',type : 'string'	},
			{name : 'zzsgb',type : 'string'	},
			{name : 'lxdz',type : 'string'	},
			{name : 'lxr',type : 'string'	},
			{name : 'sj',type : 'string'	},
			{name : 'dzxx',type : 'string'	},
			{name : 'cz',type : 'string'	},
			{name : 'bsbh',type : 'string'	},
			{name : 'je',type : 'string'	},
			{name : 'username',type : 'string'	},
			{name : 'ly',type : 'string'	}
        ]
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#EditProject_DocumentTable").jqxGrid(
    {
    	 height: 265,
         width: "100%",
         pageable: false,
        source: dataAdapter,
//        editable: true,
        selectionmode: 'singlerow',

//        editmode: 'selectedcell',
        columnsresize: true,
        showToolbar: true,
        renderToolbar: function(toolBar) {
        	//添加打印按钮、导出Excel按钮和其他按钮
            var me = this;
            var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
            var container = $("<div style='margin: 5px;'></div>");
            var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
            var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
            var deleteButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
            var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
            var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
            var editButton = $("<div style='float: left; margin-left: 5px;' id ='documentEditButton'><span style='margin-left: 4px; position: relative; top: 0px;'>修改</span></div>");
            toolBar.append(container);
            container.append(addNewButton);
            container.append(editButton);
            container.append(refreshButton);
            container.append(deleteButton);
            container.append(printButton);
            container.append(exportButton);
            
            addNewButton.jqxButton({ template: "success" });
            editButton.jqxButton({ template: "primary" });
            editButton.jqxButton({ disabled: true });
            refreshButton.jqxButton({ template: "inverse" });
            printButton.jqxButton({ template: "info" });
            exportButton.jqxButton({ template: "warning" });
            deleteButton.jqxButton({ template: "danger" });
            
            addNewButton.click(function (event) {
            	gmbs_popupwindow("add", "", function(){
            		$("#EditProject_DocumentTable").jqxGrid({ source:dataAdapter });
            	}, project.Id);
            });
            refreshButton.click(function (event) {
                $("#EditProject_DocumentTable").jqxGrid({ source:dataAdapter });
            });
            editButton.click(function (event) {
            	var gmbsid = $("#documentEditButton").val();
            	gmbs_popupwindow("modify", gmbsid, function(){
            		$("#EditProject_DocumentTable").jqxGrid({ source:dataAdapter });
            	}, project.Id);
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
                var selectedrowindex = $("#EditProject_DocumentTable").jqxGrid('getselectedrowindex');
                var rowscount = $("#EditProject_DocumentTable").jqxGrid('getdatainformation').rowscount;
                var id = $("#EditProject_DocumentTable").jqxGrid('getrowid', selectedrowindex);
                $("#EditProject_DocumentTable").jqxGrid('deleterow', id);
            });
        
        },
        columns: [
          { text: '招标书编号', columntype: 'dropdownlist', datafield: 'bsbh', width: '14%', align: 'center', cellsalign: 'center',},
          { text: '客户名称', columntype: 'textbox', datafield: 'dwmc', width: '23%' , align: 'center', cellsalign: 'center',},
          { text: '制造商中文名称', columntype: 'dropdownlist', datafield: 'zzszwmc', width:'21%' , align: 'center', cellsalign: 'center',},
          {
              text: '付款日期', datafield: 'rq', columntype: 'datetimeinput', width: '22%', align: 'center', cellsalign: 'center', cellsformat: 'yyyy-MM-dd',
          validation: function (cell, value) {
                  if (value == "")
                     return true;
                  var year = value.getFullYear();
                  return true;
              }
          },
          { text: '金额', datafield: 'je', width: '20%' ,align: 'center', cellsalign: 'center', cellsformat: 'c2', columntype: 'numberinput',
              createeditor: function (row, cellvalue, editor) {
                  editor.jqxNumberInput({ digits: 3 });
              }
          }
        ]
    });
    // events
    var rowValues = "";
    $("#EditProject_DocumentTable").on('cellbeginedit', function (event) {});
    $("#EditProject_DocumentTable").on('cellendedit', function (event) {});
    $('#EditProject_DocumentTable').on('rowclick', function (event) 
			{
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
			    
			    $("#documentEditButton").jqxButton({ disabled: false});
			    var gmbs_data = $("#EditProject_DocumentTable").jqxGrid('getrowdata', rowindex);
			    $("#documentEditButton").val(gmbs_data.Id)
			    $("#EditProject_DocumentTable").jqxGrid('selectrow', rowindex);
			}); 
}

function InitProjectMarginGrid(dict,project){
	tbzj_init ()
    tbbzj_init ()
	var data = generatedata(7);
    var source =
    {
        url: "getttbzj_tbzjByProjectId?id="+project.Id,
        datatype: "json",
        updaterow: function (rowid, rowdata, commit) {
            // synchronize with the server - send update command
            // call commit with parameter true if the synchronization with the server is successful 
            // and with parameter false if the synchronization failder.
            commit(true);
        },
        datafields:
        	[{name : 'bzjlx',type : 'string'	},
        	 {name : 'tje',type : 'string'	},
        	 {name : 'rq',type : 'string'	},
        	 {name : 'khyh',type : 'string'	},
        	 {name : 'fkfs',type : 'string'	},
        	 {name : 'dwmc',type : 'string'	},
        	 {name : 'trq',type : 'string'	},
        	 {name : 'je',type : 'string'	},
        	 {name : 'bsbh',type : 'string'	},
        	 {name : 'Id',type : 'string'	},
        	 {name : 'returned',type : 'string'	},
        	 {name : 'yhzh',type : 'string'	},
        	 {name : 'ly',type : 'string'	}
        	
        	 ]
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
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
        selectionmode: 'singlerow',
//        editmode: 'selectedcell',
        renderToolbar: function(toolBar) {
        	//添加打印按钮、导出Excel按钮和其他按钮
            var me = this;
            var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
            var container = $("<div style='margin: 5px;'></div>");
            var addNewButton1 = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>缴保证金</span></div>");
            var addNewButton2 = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>退保证金</span></div>");
       
            var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
            var deleteButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
            var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
            var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
            var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
            toolBar.append(container);
            container.append(addNewButton1);
            container.append(addNewButton2);
            container.append(refreshButton);
            //container.append(deleteButton);
            container.append(printButton);
            container.append(exportButton);
//            container.append(columnSettingButton);
            addNewButton1.jqxButton({ template: "success" });
            addNewButton2.jqxButton({ template: "success" });
            refreshButton.jqxButton({ template: "inverse" });
            printButton.jqxButton({ template: "info" });
            exportButton.jqxButton({ template: "warning" });
            deleteButton.jqxButton({ template: "danger" });
            columnSettingButton.jqxButton({ template: "inverse" });
            addNewButton1.click(function (event) {
            	tbbzj_popupwindow('add', '', function(){
            		//refresh the grid when load completed
            		$("#EditProject_MarginTable").jqxGrid({ source:dataAdapter });
            	},project.Id)
            });
            addNewButton2.click(function (event) {
            	
            	tbzj_popupwindow('add', '', function(){
            		//refresh the grid when load completed
            		$("#EditProject_MarginTable").jqxGrid({ source:dataAdapter });
            	})
            });
            refreshButton.click(function (event) {
                $("#EditProject_MarginTable").jqxGrid({ source:dataAdapter });
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
                var selectedrowindex = $("#EditProject_MarginTable").jqxGrid('getselectedrowindex');
                var rowscount = $("#EditProject_MarginTable").jqxGrid('getdatainformation').rowscount;
                var id = $("#EditProject_MarginTable").jqxGrid('getrowid', selectedrowindex);
                $("#EditProject_MarginTable").jqxGrid('deleterow', id);
            });
        
        },
        columns: [
          { text: '招标书编号', datafield: 'bsbh', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '14%'  },
          { text: '客户名称', datafield: 'dwmc', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '12%' },
         
          { text: '保证金类型', datafield: 'bzjlx', columntype: 'dropdownlist',align: 'center', cellsalign: 'center',width: '10%'  },
          {
              text: '交保证金日期', datafield: 'rq', columntype: 'datetimeinput', width: '10%', align: 'center', cellsalign: 'center', cellsformat: 'd',
          validation: function (cell, value) {
                  
              }
          },
          { text: '金额', datafield: 'je',  width: '6%',align: 'center', cellsalign: 'center',  cellsformat: 'c2', columntype: 'numberinput',
              validation: function (cell, value) {
                  
              },
              createeditor: function (row, cellvalue, editor) {
                  editor.jqxNumberInput({ digits: 3 });
              }
          },
          { text: '已退保证金', datafield: 'returned', columntype: 'checkbox', align: 'center', cellsalign: 'center',width:'6%' },
          {
              text: '退款日期', datafield: 'trq', columntype: 'datetimeinput', width: '10%', align: 'center', cellsalign: 'center', cellsformat: 'd',
          validation: function (cell, value) {
                 
              }
          },
          { text: '退还金额', datafield: 'tje',  width: '6%',align: 'center', cellsalign: 'center',  cellsformat: 'c2', columntype: 'numberinput',
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
          { text: '开户银行', datafield: 'khyh', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '8%'  },
          { text: '银行账号', datafield: 'yhzh', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '10%'  },
          { text: '退还方式', datafield: 'fkfs', columntype: 'dropdownlist',align: 'center', cellsalign: 'center',width: '8%'  },

        ]
    });
    // events
    var rowValues = "";
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
}

function InitNewPackageWindow(dict,project){
	$("#PackageNumber_ADD").jqxInput({width: '200px',height: "25px"});
	$("#PackageName_ADD").jqxInput({width: '200px',height: "25px"});
	$("#PublicDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true,width: '200px', height: '25px',allowNullDate: true});
	$("#PublicDate_ADD").jqxDateTimeInput('val',null)
	$("#OpenDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss",  showTimeButton: true,width: '200px', height: '25px' ,allowNullDate: true});
	$("#OpenDate_ADD").jqxDateTimeInput('val',null)
	$("#ReviewDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true,width: '200px', height: '25px' ,allowNullDate: true});
	$("#ReviewDate_ADD").jqxDateTimeInput('val',null)
	$("#SigningDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss",  showTimeButton: true,width: '200px', height: '25px' ,allowNullDate: true});
	$("#SigningDate_ADD").jqxDateTimeInput('val',null)
	$("#MakeOutDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true,width: '200px', height: '25px' ,allowNullDate: true});
	$("#MakeOutDate_ADD").jqxDateTimeInput('val',null)
	$("#EntrustMoney_ADD").jqxNumberInput({ width: '200px', height: '25px', inputMode: 'simple'});
	$("#WinningMoney_ADD").jqxNumberInput({ width: '200px', height: '25px',inputMode: 'simple'});
	$("#WinningCompany_ADD").jqxInput({width: '200px',height: "25px"});
	$("#ChargeRate_ADD").jqxInput({width: '200px',height: "25px"});
	$("#ChargeRate_ADD").jqxNumberInput({ width: '200px', height: '25px', digits: 3, symbolPosition: 'right', symbol: '%', spinButtons: true });
	/*$('#NotePackage_ADD').jqxEditor({height: "200px", width: '492px'});*/
	BindPackageStatus("#StateIdPackage_ADD",dict.ProjectStatus,undefined,0) //初始化:项目建档
	$("#StateIdPackage_ADD").jqxDropDownList({disabled:true})
	//initialize the popup add window and buttons.
    $("#popupWindow_PackageADD").jqxWindow({ width:300, maxHeight: 850,resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.40 });
    $("#CancelPackage_ADD").jqxButton({ theme: theme });
    $("#CancelPackage_ADD").click(function () {
    	$("#popupWindow_PackageADD").jqxWindow('hide');
    });
    $("#SavePackage_ADD").jqxButton({ theme: theme, template:"success"  });
    $("#SavePackage_ADD").click(function () {
    	var row=
    	  {  ProjectId:project.Id
    		,PackageNumber:$("#PackageNumber_ADD").val()
    		,PackageName:$("#PackageName_ADD").val()
    		,StateId:$("#StateIdPackage_ADD").val()
    		,PublicDate:$("#PublicDate_ADD").val()
    		,OpenDate:$("#OpenDate_ADD").val()
    		,ReviewDate:$("#ReviewDate_ADD").val()
    		,SigningDate:$("#SigningDate_ADD").val()
    		,MakeOutDate:$("#MakeOutDate_ADD").val()
    		,EntrustMoney:$("#EntrustMoney_ADD").val()
    		,WinningMoney:$("#WinningMoney_ADD").val()
    		,WinningCompany:$("#WinningCompany_ADD").val()
    		,ChargeRate:$("#ChargeRate_ADD").val()
    		,Note:$("#NotPackagee_ADD").val()
    		,IsDelete:0
    		}
		$.post("/bidding/default/insert?table=ProjectPackage",row,function(result){
			$("#EditProject_PackageTable").jqxGrid('addrow', null, result,"first");
			$("#popupWindow_PackageADD").jqxWindow('hide');
		},'json');
	});
}


function InitEditPackageWindow(dict,projectpackage){
	
	$("#PackageNumber_Manage").jqxInput({width: '200px',height: "25px"});
	$("#PackageName_Manage").jqxInput({width: '200px',height: "25px"});
	$("#PublicDate_Manage").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true,width: '200px', height: '25px',allowNullDate: true});
	$("#PublicDate_Manage").jqxDateTimeInput('val','')
	$("#OpenDate_Manage").jqxDateTimeInput({formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' ,allowNullDate: true});
	$("#OpenDate_Manage").jqxDateTimeInput('val','')
	$("#ReviewDate_Manage").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' ,allowNullDate: true});
	$("#ReviewDate_Manage").jqxDateTimeInput('val','')
	$("#SigningDate_Manage").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true,  width: '200px', height: '25px' ,allowNullDate: true});
	$("#SigningDate_Manage").jqxDateTimeInput('val','')
	$("#MakeOutDate_Manage").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' ,allowNullDate: true});
	$("#MakeOutDate_Manage").jqxDateTimeInput('val','')
	$("#EntrustMoney_Manage").jqxNumberInput({ width: '200px', height: '25px', inputMode: 'simple'});
	$("#WinningMoney_Manage").jqxNumberInput({ width: '200px', height: '25px',inputMode: 'simple'});
	$("#WinningCompany_Manage").jqxInput({width: '200px',height: "25px"});
	$("#ChargeRate_Manage").jqxNumberInput({ width: '200px', height: '25px', digits: 3, symbolPosition: 'right', symbol: '%', spinButtons: true });
	/*$('#NotePackage_Manage').jqxEditor({height: "200px", width: '492px'});*/
	BindPackageStatus("#StateIdPackage_Manage",dict.ProjectStatus)
	$("#StateIdPackage_Manage").jqxDropDownList({disabled:true})
	$("#popupWindow_PackageManage").jqxWindow({ width:300, maxHeight: 850,resizable: true,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.40 });
    $("#CancelPackage_Manage").jqxButton({ theme: theme });
    $("#CancelPackage_Manage").click(function () {
    	$("#popupWindow_PackageManage").jqxWindow('hide');
    });
    $("#SavePackage_Manage").jqxButton({ theme: theme, template:"success"  });
    $("#SavePackage_Manage").click(function () {
    	
    	var row=
  	  {  Id:$("#packageID").text()
    	,PublicDate:$("#PublicDate_Manage").val()
  		,OpenDate:$("#OpenDate_Manage").val()
  		,ReviewDate:$("#ReviewDate_Manage").val()
  		,SigningDate:$("#SigningDate_Manage").val()
  		,MakeOutDate:$("#MakeOutDate_Manage").val()
  		,EntrustMoney:$("#EntrustMoney_Manage").val()
  		,WinningMoney:$("#WinningMoney_Manage").val()
  		,WinningCompany:$("#WinningCompany_Manage").val()
  		,ChargeRate:$("#ChargeRate_Manage").val()
  		}
		$.post("/bidding/default/update?table=ProjectPackage",row,function(result){
			var source = $("#EditProject_PackageTable").jqxGrid("source")
			$("#EditProject_PackageTable").jqxGrid({ source:source });
			$("#popupWindow_PackageManage").jqxWindow('hide');
		},'json');
    	
    });
}

function InitPackageDateSetting(){
	$('#mainSplitter').jqxSplitter({ width: '99%', height: '99%', panels: [{ size: 300 }] });
	 $('#jqxTree').jqxTree({ height: '100%', hasThreeStates: true, checkboxes: true, width: '120px'});
    $('#jqxTree').css('visibility', 'visible');
}

function InitProjectContactsGrid(dict,project){
	// var data = generatedata(7);
    var exampleTheme = theme;
    var source =
    {
        url: 'getContactsByProjectID?pid='+project.Id,
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
        height:200,
        source: adapter,
        filterable: true,
//        pageable: true,
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
              text: '联系人', datafield: 'lxr',width: '17%',align: 'center',
              filtertype: "custom",
              cellsalign: 'center',
              createfilterpanel: function (datafield, filterPanel) {
            	    buildFilterPanel(filterPanel, datafield);
              }
          },
          {
              text: '公司名称', datafield: 'dwmc',align: 'center',
              filtertype: "custom",
              cellsalign: 'center',
              createfilterpanel: function (datafield, filterPanel) {
            	     buildFilterPanel(filterPanel, datafield );
              },
              width: '17%',
          },
          { text: '联系地址', datafield: 'lxdz', createfilterpanel: function (datafield, filterPanel) {
        	  //      buildFilterPanel(filterPanel, datafield );
              }, width: '17%',align: 'center', cellsalign: 'center' },
          { text: '手机', createfilterpanel: function (datafield, filterPanel) {
        	//                  buildFilterPanel(filterPanel, datafield );
              },datafield: 'sj', width: '16%', cellsalign: 'center',align: 'center',cellsformat: 'yyyy-MM-dd' },
          { text: '传真', createfilterpanel: function (datafield, filterPanel) {
        	//                buildFilterPanel(filterPanel, datafield );
              },datafield: 'cz', width: '16%', calign: 'center',cellsalign: 'center',align: 'center'},
          { text: '电子邮件', createfilterpanel: function (datafield, filterPanel) {
        	//               buildFilterPanel(filterPanel, datafield );
              },datafield: 'dzxx', width: '17%',align: 'center',cellsalign: 'center', cellsformat: 'c2' }
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

function InitProjectFinanceGrid(dict,project){

    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'bssr', type: 'float' },
            { name: 'zbfwf', type: 'float' },
            { name: 'wtxy', type: 'float' },
            { name: 'pqzjf', type: 'float' },
            { name: 'xmfc', type: 'float' }
        ],
        url: "getFinanceByProjectID?pid="+project.Id
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
    // initialize jqxGrid
    $("#EditProject_FinanceTable").jqxGrid(
    {
        width: '100%',
        height:200,
        source: dataAdapter,                
        pageable: false,
        autoheight: true,
//        sortable: true,
        altrows: true,
        enabletooltips: true,
        editable: false,
        selectionmode: 'singlerow',
        columns: [
          { text: '销售标书', columngroup: '收入', datafield: 'bssr', cellsalign: 'center', align: 'center',width: '20%' },
          { text: '中标服务费', columngroup: '收入', datafield: 'zbfwf', cellsalign: 'center', align: 'center', width: '20%' },
          { text: '委托协议', columngroup: '收入', datafield: 'wtxy', align: 'center', cellsalign: 'center',  width: '20%' },
          { text: '聘请专家费用', columngroup: '支出',datafield: 'pqzjf', cellsalign: 'center', align: 'center', width: '20%' },
          { text: '项目分成费用', columngroup: '支出',datafield: 'xmfc', cellsalign: 'center', align: 'center',width: '20%' }
        ],
        columngroups: [
            { text: '收入', align: 'center', name: '收入' },
            { text: '支出', align: 'center', name: '支出' }
        ]
    });
}


$(document).ready(function () {
	var project = JSON.parse($("#ProjectData").text())[0]
	var dict = JSON.parse($("#Dictionaries").text())
	$("#navBar4").jqxNavBar({
        height: 30, selectedItem: 1
    });
	InitEditProjectPage(dict,project);
	InitProjectPackageGrid(dict,project);
	InitProjectDocumentGrid(dict,project);
	InitProjectMarginGrid(dict,project);
    InitNewPackageWindow(dict,project);
    InitEditPackageWindow(dict,project);
    InitProjectContactsGrid(dict,project);
    InitProjectFinanceGrid(dict,project);
	
	
});