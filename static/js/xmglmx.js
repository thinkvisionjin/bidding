
function popup_gmbswindow() {
	
}


function InitEditProjectPage(dict,project){
	$("#jqxProjectBasicExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectPackagesExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectDocumentsExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	$("#jqxProjectMarginExpander").jqxExpander({width: '99%', toggleMode: 'dblclick'});
	
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
	$("#EditProject_CreationDate").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
	
	$("#EditProject_Save").jqxButton({template:'success'});
	$("#EditProject_Save").click(function () {
		var row = {Id:project.Id
				,ProtocolCodeId:''
				,ProjectCode:project.PojectCode
				,ProjectCode:project.PojectCode
				,ProjectName:$("#EditProject_ProjectName").val()
				,CustomerId:$("#EditProject_Customer").val()
				,EmployeeId:$("#EditProject_Employee").val()
				,Assistant:$("#EditProject_Assistant").val()
				,ProjectSourceId:$("#EditProject_ProjectSource").val()
				,FundingSourceId:$("#EditProject_FundingSource").val()
				,ProjectTypeId:$("#NewProject_ProjectType").val()
				,ManagementStyleId:$("#EditProject_ManagementStyle").val()
				,PurchaseStyleId:$("#EditProject_PurchaseStyle").val()
				,ProjectStatusId:$("#EditProject_ProjectStatus").val()
				,CreationDate:$("#EditProject_CreationDate").val()
				,IsDelete:'0'}
		$.post("/bidding/default/update?table=Project",row,function(result){
   		alert("操作成功！");
   });
	});
	$("#EditProject_Cancel").jqxButton({template:'warning'});
	$("#EditProject_Cancel").click(function () {
		window.location="http://127.0.0.1:8000/bidding/default/ProjectMangement.html"
	});
	$("#EditProject_Return").jqxButton({template:'danger'});
	$("#EditProject_Return").click(function () {
		window.location="http://127.0.0.1:8000/bidding/default/ProjectMangement.html"
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
		                 {"name":"SigningDate","type":"datetime"},
		                 {"name":"MakeOutDate","type":"datetime"},
		                 {"name":"EntrustMoney","type":"string"},
		                 {"name":"WinningMoney","type":"string"},
		                 {"name":"WinningCompany","type":"string"},
		                 {"name":"ChargeRate","type":"string"},
		                 {"name":"Note","type":"string"},
		                 {"name":"CreationDate","type":"string"},
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
		var projectPackage_columns_content  = 
			[{"datafield":"PackageNumber","text":"\u5305\u7f16\u53f7", editable:false, cellsalign: 'center', align: 'center',width: '18%'},
			 {"datafield":"PackageName","text":"\u5305\u540d\u79f0",  cellsalign: 'center', align: 'center',width: '17%'},
			 {"datafield":"StateId","text":"\u5305\u72b6\u6001", cellsalign: 'center', align: 'center',columntype: 'dropdownlist',width: '12%',
				 cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
          		  var label="";
           		  pt = JSON.parse(dict.ProjectStatus)
           		  for(i=0;i<pt.length;i++){
           			  if(pt[i].Id==value.toString()) {
           				  label = pt[i].Name
           			  }
           		  }
      		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                 },
				 createeditor: function (row, column, editor) {
                     // assign a new data source to the dropdownlist.
					 var source = {
								datatype: "json",
						        datafields: [
						            { name: 'Id' },
						            { name: 'Name' }
						        ],
						        localdata:dict.ProjectStatus
						}
						var dataAdapter = new $.jqx.dataAdapter(source,{
					        loadComplete: function () {}
					    });
                     editor.jqxDropDownList({ autoDropDownHeight: true, source: dataAdapter,	
                    	 displayMember: "Name", 
         				valueMember: "Id",
        				height: '27' });
                 },
                 // update the editor's value before saving it.
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {}
                 },
			 {"datafield":"SigningDate","text":"\u7b7e\u7ea6\u65e5\u671f",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '11%'},
			 {"datafield":"MakeOutDate","text":"\u5f00\u7968\u65e5\u671f",  cellsalign: 'center', align: 'center',columntype: 'datetimeinput',cellsformat: 'yyyy-MM-dd',width: '11%'},
			 {"datafield":"EntrustMoney","text":"\u59d4\u6258\u91d1\u989d",  cellsalign: 'center', align: 'center',width: '8%'},
			 {"datafield":"WinningMoney","text":"\u4e2d\u6807\u91d1\u989d",  cellsalign: 'center', align: 'center',width: '8%'},
			 {"datafield":"WinningCompany","text":"\u4e2d\u6807\u5355\u4f4d",  cellsalign: 'center', align: 'center',width: '8%'},
			 {"datafield":"ChargeRate","text":"\u670d\u52a1\u8d39\u7387",  cellsalign: 'center', align: 'center',width: '7%'}]
		
		$("#EditProject_PackageTable").jqxGrid(
		        {
		            height: 265,
		            width: "100%",
		            columnsresize: true,
		            source: projectPackageurldataAdapter,
		            pageable: true,
		            editable: true,
		            selectionmode: 'singlerow',
		            editmode: 'selectedcell',
		            autoRowHeight: false,
		            showToolbar: true,
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
		                var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
		                var updateButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>确认修改</span></div>");
		                toolBar.append(container);
		                container.append(addNewButton);
		                container.append(refreshButton);
		                container.append(deleteButton);
		                container.append(printButton);
		                container.append(exportButton);
		                container.append(columnSettingButton);
		                container.append(updateButton);
		                addNewButton.jqxButton({ template: "success" });
		                refreshButton.jqxButton({ template: "primary" });
		                printButton.jqxButton({ template: "info" });
		                exportButton.jqxButton({ template: "warning" });
		                deleteButton.jqxButton({ template: "danger" });
		                columnSettingButton.jqxButton({ template: "inverse" });
		                updateButton.jqxButton();
		                addNewButton.click(function (event) {
		                	$("#popupWindow_PackageADD").jqxWindow('show');
		                });
		                refreshButton.click(function (event) {
		                    $("#EditProject_PackageTable").jqxGrid({ source:projectPackageurldataAdapter });
		                });
		                columnSettingButton.click(function (event) {
		                	
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
}

function InitProjectDocumentGrid(dict,project){
	gmbs_init();
    var source =
    {
        url: "select_gmbs",
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
         pageable: true,
        source: dataAdapter,
        editable: true,
        selectionmode: 'singlerow',
        editmode: 'selectedrow',
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
            var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
            toolBar.append(container);
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
            	
            	gmbs_popupwindow("add", "", function(){
            		$("#EditProject_DocumentTable").jqxGrid({ source:dataAdapter });
            	});
            });
            refreshButton.click(function (event) {
                $("#EditProject_DocumentTable").jqxGrid({ source:dataAdapter });
            });
            columnSettingButton.click(function (event) {
            
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
          { text: '客户名称', columntype: 'textbox', datafield: 'dwmc', width: '20%' , align: 'center', cellsalign: 'center',},
          { text: '招标书编号', columntype: 'textbox', datafield: 'bsbh', width: '20%', align: 'center', cellsalign: 'center',},
          { text: '制造商中文名称', columntype: 'dropdownlist', datafield: 'zzszwmc', width:'20%' , align: 'center', cellsalign: 'center',},
          {
              text: '付款日期', datafield: 'rq', columntype: 'datetimeinput', width: '20%', align: 'center', cellsalign: 'center', cellsformat: 'd',
          validation: function (cell, value) {
                  if (value == "")
                     return true;
                  var year = value.getFullYear();
                  return true;
              }
          },
          { text: '金额', datafield: 'je', width: '20%' ,align: 'center', cellsalign: 'center', cellsformat: 'c2', columntype: 'numberinput',
              validation: function (cell, value) {
                  if (value < 0 || value > 15) {
                      return { result: false, message: "Price should be in the 0-15 interval" };
                  }
                  return true;
              },
              createeditor: function (row, cellvalue, editor) {
                  editor.jqxNumberInput({ digits: 3 });
              }
          }
        ]
    });
    // events
    var rowValues = "";
    $("#EditProject_DocumentTable").on('cellbeginedit', function (event) {
        var args = event.args;
        if (args.datafield === "firstname") {
            rowValues = "";
        }
        rowValues += args.value.toString() + "    ";
        if (args.datafield === "price") {
            $("#cellbegineditevent").text("Begin Row Edit: " + (1 + args.rowindex) + ", Data: " + rowValues);
        }
    });
    $("#EditProject_DocumentTable").on('cellendedit', function (event) {
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

function InitProjectMarginGrid(dict,project){
	tbzj_init ()
	var data = generatedata(7);
    var source =
    {
        url: "getttbzj_tbzj",
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
         pageable: true,
         showToolbar: true,
        source: dataAdapter,
        columnsresize: true,
        editable: true,
        selectionmode: 'singlerow',
        editmode: 'selectedrow',
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
            var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
            toolBar.append(container);
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
          { text: '客户名称', datafield: 'dwmc', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '18%' },
          { text: '招标书编号', datafield: 'bsbh', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '18%'  },
          { text: '保证金类型', datafield: 'bzjlx', columntype: 'dropdownlist',align: 'center', cellsalign: 'center',width: '18%'  },
          {
              text: '交保证金日期', datafield: 'rq', columntype: 'datetimeinput', width: '10%', align: 'center', cellsalign: 'center', cellsformat: 'd',
          validation: function (cell, value) {
                  if (value == "")
                     return true;
                  var year = value.getFullYear();
                  if (year >= 2017) {
                      return { result: false, message: "Ship Date should be before 1/1/2017" };
                  }
                  return true;
              }
          },
          { text: '金额', datafield: 'je', align: 'right', width: '10%',align: 'center', cellsalign: 'center',  cellsformat: 'c2', columntype: 'numberinput',
              validation: function (cell, value) {
                  if (value < 0 || value > 15) {
                      return { result: false, message: "Price should be in the 0-15 interval" };
                  }
                  return true;
              },
              createeditor: function (row, cellvalue, editor) {
                  editor.jqxNumberInput({ digits: 3 });
              }
          },
          { text: '已退保证金', datafield: 'returned', columntype: 'checkbox', align: 'center', cellsalign: 'center',width:'8%' },
          {
              text: '退款日期', datafield: 'trq', columntype: 'datetimeinput', width: '10%', align: 'center', cellsalign: 'center', cellsformat: 'd',
          validation: function (cell, value) {
                  if (value == "")
                     return true;
                  var year = value.getFullYear();
                  if (year >= 2017) {
                      return { result: false, message: "Ship Date should be before 1/1/2017" };
                  }
                  return true;
              }
          },
          { text: '退还金额', datafield: 'tje', align: 'right', width: '10%',align: 'center', cellsalign: 'center',  cellsformat: 'c2', columntype: 'numberinput',
              validation: function (cell, value) {
                  if (value < 0 || value > 15) {
                      return { result: false, message: "Price should be in the 0-15 interval" };
                  }
                  return true;
              },
              createeditor: function (row, cellvalue, editor) {
                  editor.jqxNumberInput({ digits: 3 });
              }
          },
          { text: '开户银行', datafield: 'khyh', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '18%'  },
          { text: '银行账号', datafield: 'yhzh', columntype: 'textbox', align: 'center', cellsalign: 'center',width: '18%'  },
          { text: '退还方式', datafield: 'fkfs', columntype: 'dropdownlist',align: 'center', cellsalign: 'center',width: '18%'  },

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
	$("#SigningDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd",  width: '200px', height: '25px' });
	$("#MakeOutDate_ADD").jqxDateTimeInput({ formatString: "yyyy-MM-dd", width: '200px', height: '25px' });
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
    	var  sd  = $("#SigningDate_ADD").val()
    	var  md =  $("#MakeOutDate_ADD").val()
    	var row=
    	  {  ProjectId:project.Id
    		,PackageNumber:$("#PackageNumber_ADD").val()
    		,PackageName:$("#PackageName_ADD").val()
    		,StateId:$("#StateIdPackage_ADD").val()
    		,SigningDate:sd
    		,MakeOutDate:md
    		,EntrustMoney:$("#EntrustMoney_ADD").val()
    		,WinningMoney:$("#WinningMoney_ADD").val()
    		,WinningCompany:$("#WinningCompany_ADD").val()
    		,ChargeRate:$("#ChargeRate_ADD").val()
    		,Note:$("#NotPackagee_ADD").val()
    		,CreationDate:''
    		,IsDelete:0
    		}
		$.post("/bidding/default/insert?table=ProjectPackage",row,function(result){
			$("#EditProject_PackageTable").jqxGrid('addrow', null, result,"first");
			$("#popupWindow_PackageADD").jqxWindow('hide');
		},'json');
	});
}

$(document).ready(function () {
	var project = JSON.parse($("#ProjectData").text())[0]
	$.get("/bidding/default/getDictionaries",function(result){
		dict = result
		InitEditProjectPage(dict,project);
		InitProjectPackageGrid(dict,project);
		InitProjectDocumentGrid(dict,project);
		InitProjectMarginGrid(dict,project);
	    InitNewPackageWindow(dict,project);
	},'json');
	
	
});