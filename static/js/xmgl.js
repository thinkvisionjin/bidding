
var greGetCodeFlag = 0;
var gdict;
var gdictcontactor;
function addselectfieldwindows()
{
	$(document.body).append('<div id="popupWindow" ><div>字段选择</div><div style="overflow: hidden;"><div  id="zdlistbox"></div></div></div>');
	$("#popupWindow").jqxWindow({ isModal: true, autoOpen: false, height: 300, width: 200 , modalOpacity: 0.5});
	 var listSource = [{ label: '序号', value: 'Id', checked: false },
	                   { label: '项目编号', value: 'ProjectCode', checked: true },
	                   { label: '项目名称', value: 'ProjectName', checked: true },
	                   { label: '协议编号', value: 'ProtocolCodeId', checked: false },
	                   { label: '项目类型', value: 'ProjectTypeId', checked: true },
	                   { label: '采购单位', value: 'CustomerId', checked: true },
	                   { label: '负责人', value: 'EmployeeId', checked: true },
	                   { label: '协助人', value: 'Assistant', checked: true },
	                   { label: '项目来源', value: 'ProjectSourceId', checked: false },
	                   { label: '资金来源', value: 'FundingSourceId', checked: false },
	                   { label: '项目性质', value: 'ProjectPropertyId', checked: false },
	                   { label: '采购方式', value: 'PurchaseStyleId', checked: true },
	                   { label: '项目状态', value: 'ProjectStatusId', checked: true },
                       {value:"CreationDate",label:"创建日期", checked: false},
                       {value:"PackageCount",label:"包件数量", checked: true},
                       {value:"DocumentBuyerCount",label:"已售标书数量", checked: true},
                       {value:"BidderCount",label:"投标人数量", width: "120", checked: false},
                       {value:"MarginCount",label:"已交保证金数量", checked: false},
                       {value:"ReturnMarginCount",label:"归还保证金数量", checked: false},
                       {value:"EntrustMoney",label:"委托金额合计", checked: false},
                       {value:"WinningMoney",label:"中标金额合计", checked: false},
					   { label: '项目联系人', value: 'ContactorNameId', checked: false },
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


var data_url = "/bidding/default/SelectProjectsSummary"

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
	                          {"name":"ProjectPropertyId","type":"string"},
	                          {"name":"PurchaseStyleId","type":"string"},
	                          {"name":"ProjectStatusId","type":"string"},
	                          {"name":"CreationDate","type":"string"},
	                          {"name":"PackageCount","type":"string"},
	                          {"name":"DocumentBuyerCount","type":"string"},
	                          {"name":"BidderCount","type":"string"},
	                          {"name":"MarginCount","type":"string"},
	                          {"name":"ReturnMarginCount","type":"string"},
	                          {"name":"EntrustMoney","type":"string"},
	                          {"name":"WinningMoney","type":"string"},
							  { "name": 'ContactorNameId',"type":"string"},
	                          ]
var source =
{
    url: data_url,
    datatype: "json",
    datafields:datafields_content,
    updaterow: function (rowid, rowdata, commit) {
        // synchronize with the server - send update command
        // call commit with parameter true if the synchronization with the
		// server is successful
        // and with parameter false if the synchronization failed.
/*    $.post("/bidding/default/update?table=Project",rowdata,function(result){
    		 alert("操作成功！");
    	 });*/
        commit(true);
    },
    deleterow: function (rowid, commit) {
        // synchronize with the server - send delete command
        // call commit with parameter true if the synchronization with the
		// server is successful
        // and with parameter false if the synchronization failed.
    	var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
    	$.post("/bidding/default/delete?table=Project",dataRecord,function(result){
   		 alert("操作成功！");
   	 });
        commit(true);
    },
    addrow: function (rowid, rowdata, position, commit) {
        // synchronize with the server - send insert command
        // call commit with parameter true if the synchronization with the
		// server was successful.
        // and with parameter false if the synchronization has failed.
        // you can pass additional argument to the commit callback which
		// represents the new ID if it is generated from a Database. Example:
		// commit(true, idInDB) where "idInDB" is the row's ID in the Database.
        commit(true);
    },
};

function InitProjectGrid(dict){
	
   
    
    var dataAdapter = new $.jqx.dataAdapter(source);
    var editrow = -1;
    var columns_content  =[{
    text: '操作', editable: false, datafield: 'edit',width: "150", cellsalign: 'center', align: 'center',
    cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
    var a = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="/bidding/default/xmglmx?id='+rowdata.Id + '">查看详情</a>';
    var b = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="gmbs.html">购买标书</a>';
    var c = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="tbbzj.html">缴保证金</a>';
    var d = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="zb.html">中标管理</a>';
    var e = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="tbzj.html">退保证金</a>';
    var g = '<a style="margin-left:5px;padding-top:3px;height:15px;text-decoration:none;" class="MdyBtn" href="/bidding/default/gdwj?projectid='+rowdata.Id + '&projectname='+rowdata['ProjectName']+'">归档管理</a>';
    
	var f = '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+a+g+'</div>';
    return f;
    }
    },
                           {"datafield":"Id","text":"序号",width: "80", cellsalign: 'center', align: 'center',hidden:true},
                           {"datafield":"ProjectCode","text":"项目编号", width: "185", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProjectName","text":"项目名称", width: "210", cellsalign: 'center', align: 'center'},
                           {"datafield":"ProtocolCodeId","text":"协议编号", width: "190", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                     		  var label="";
                    		  var pt = JSON.parse(dict.ProtocolCode)
                    		  for( var  i=0;i<pt.length;i++){
                    			  if(pt[i].Id==value.toString()) {
                    				  label = pt[i].ProtocolNumber
                    			  }
                    		  }
               		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                           }},             
                           {"datafield":"ProjectTypeId","text":"项目类型", width: "180", cellsalign: 'center', align: 'center',hidden:false,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		  var label="";
                        		  var  pt = JSON.parse(dict.ProjectType)
                        		  for(var i=0;i<pt.length;i++){
                        			  if(pt[i].ProjectTypeId==value.toString()) {
                        				  label = pt[i].ProjectTypeName
                        			  }
                        		  }
                   		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"CustomerId","text":"采购单位", width: "180", cellsalign: 'center', align: 'center',hidden:false/*,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var pt = JSON.parse(dict.Customer)
                         		  for(var i=0;i<pt.length;i++){
                         			  if(pt[i].Id==value.toString()) {
                         				  label = pt[i].dwmc
                         			  }
                         		  }
                    		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }*/},
                           {"datafield":"EmployeeId","text":"负责人", width: "80", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var pt = JSON.parse(dict.Employee)
                          		  for(var i=0;i<pt.length;i++){
                          			  if(pt[i].Id==value.toString()) {
                          				  label = pt[i].Name
                          			  }
                          		  }
                     		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"Assistant","text":"协助人", width: "80", cellsalign: 'center', align: 'center',hidden:false,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var pt = JSON.parse(dict.Employee)
                           		  for(var i=0;i<pt.length;i++){
                           			  if(pt[i].Id==value.toString()) {
                           				  label = pt[i].Name
                           			  }
                           		  }
                      		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"ProjectSourceId","text":"项目来源", width: "120", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var pt = JSON.parse(dict.ProjectSource)
                           		  for(var i=0;i<pt.length;i++){
                           			  if(pt[i].Id==value.toString()) {
                           				  label = pt[i].Name
                           			  }
                           		  }
                      		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"FundingSourceId","text":"资金来源", width: "120", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var pt = JSON.parse(dict.FundingSource)
                            		  for(var i=0;i<pt.length;i++){
                            			  if(pt[i].Id==value.toString()) {
                            				  label = pt[i].Name
                            			  }
                            		  }
                       		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"ProjectPropertyId","text":"项目性质", width: "120", cellsalign: 'center', align: 'center',hidden:true,
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var pt = JSON.parse(dict.ProjectProperty)
                         		  for(var i=0;i<pt.length;i++){
                         			  if(pt[i].ProjectPropertyId==value.toString()) {
                         				  label = pt[i].ProjectPropertyName
                         			  }
                         		  }
                    		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                           {"datafield":"PurchaseStyleId","text":"采购方式", width: "160", cellsalign: 'center', align: 'center',
                            	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                            		  var label="";
                            		  var  pt = JSON.parse(dict.PurchaseStyle)
                              		  for(var i=0;i<pt.length;i++){
                              			  if(pt[i].PurchaseStyleId==value.toString()) {
                              				  label = pt[i].PurchaseStyleName
                              			  }
                              		  }
                         		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                                }},
                           {"datafield":"ProjectStatusId","text":"项目状态", width: "120", cellsalign: 'center', align: 'center',
                        	   cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var  pt = JSON.parse(dict.ProjectStatus)
                          		  for(var i=0;i<pt.length;i++){
                          			  if(pt[i].Id==value.toString()) {
                          				  label = pt[i].Name
                          			  }
                          		  }
                     		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }},
                              {"datafield":"CreationDate","text":"创建日期", width: "120", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"PackageCount","text":"包件数量", width: "90", cellsalign: 'center', align: 'center',hidden:false},
	                          {"datafield":"DocumentBuyerCount","text":"已售标书数量", width: "90", cellsalign: 'center', align: 'center',hidden:false},
	                          {"datafield":"BidderCount","text":"投标人数量", width: "100", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"MarginCount","text":"已交保证金数量", width: "100", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"ReturnMarginCount","text":"归还保证金数量", width: "100", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"EntrustMoney","text":"委托金额合计", width: "100", cellsalign: 'center', align: 'center',hidden:true},
	                          {"datafield":"WinningMoney","text":"中标金额合计", width: "100", cellsalign: 'center', align: 'center',hidden:true}
                           ]            
    var outerDataAdapter = new $.jqx.dataAdapter(source, { autoBind: true });
    var  projects_record = outerDataAdapter.records;
    $("#jqxgrid").jqxGrid(
    {
        width: '99%',
        height: '90%',
        source: dataAdapter,
        columnsresize: true,
        //pageable: true,
        rowdetails: true,
        rowsheight: 35,
        columns: columns_content,
        showstatusbar: false,
        renderstatusbar: function (statusbar) {},
        showtoolbar: true,
        rendertoolbar: function (toolbar) {
        	// 添加打印按钮、导出Excel按钮和其他按钮
            var me = this;
            var container = $("<div style='margin-left: auto; margin-right: auto; '></div>");
            var container = $("<div style='margin: 5px;'></div>");
            var addNewButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>新增</span></div>");
            var refreshButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>刷新</span></div>");
            var deleteButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>删除</span></div>");
            var printButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>打印</span></div>");
            var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>重新获取项目编码</span></div>");
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
				greGetCodeFlag = 0;
				$.get('getnewprojectpz', function(result){
					//需特殊处理
					BindCustomer("#NewProject_Customer",result.Customer)

					gdictcontactor = result.Contactor;
					BindContactor("#NewProject_ContactName","#NewProject_ContactTel","#NewProject_Customer",result.Contactor)
					$("#NewProject_Employee").val(gdict.User)
					$("#popupWindow_NewProject").jqxWindow('show');
				}, 'json');	

            	
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
				greGetCodeFlag = 1;
				var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
				if (selectedrowindex == -1)
				{
					alert('请选择项目')
					return;
				}
				var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var rowid = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
				}				
				row = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex)
				$("#NewProject_ProtocolCode").val(row['ProtocolCodeId'])
				$("#NewProject_ProjectName").val(row['ProjectName'])
				$("#NewProject_Customer").val(row['CustomerId'])
				$("#NewProject_Employee").val(row['EmployeeId'])
				$("#NewProject_Assistant").val(row['Assistant'])
				$("#NewProject_ProjectSource").val(row['ProjectSourceId'])
				$("#NewProject_FundingSource").val(row['FundingSourceId'])
				$("#NewProject_ProjectType").val(row['ProjectTypeId'])
				$("#NewProject_ProjectProperty").val(row['ProjectPropertyId'])
				$("#NewProject_PurchaseStyle").val(row['PurchaseStyleId'])
				$("#NewProject_ContactName").val(row['ContactorNameId'])

				$("#popupWindow_NewProject").jqxWindow('show');
            	//$("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid'); 
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
	BindProjectNameOnly("#ProjectName_SEARCH")   // input
	$("#ProjectName_SEARCH_Button").jqxButton({ template: "success",height: '19px'});
	$("#ProjectName_SEARCH_Button").click(function (event) {
		var searchkey = " "
		if($("#ProjectName_SEARCH").val()!='' && $("#ProjectName_SEARCH").val()!= undefined){
			searchkey += "[ProjectName] like '\%"+$("#ProjectName_SEARCH").val()+"\%'";
		}else{
			searchkey +=' [ProjectName] is not null '
		}
		if($("#BuyerId_SEARCH").val()!='' && $("#BuyerId_SEARCH").val()!= undefined){
			searchkey += " and [CustomerId] = " +$("#BuyerId_SEARCH").val();
		}
		if($("#ProjectTypeId_SEARCH").val()!='' && $("#ProjectTypeId_SEARCH").val()!= undefined){
			searchkey += " and [ProjectTypeId] = " +$("#ProjectTypeId_SEARCH").val();
		}
		if($("#PurchaseStyleId_SEARCH").val()!=''&& $("#PurchaseStyleId_SEARCH").val()!= undefined){
			searchkey += " and [PurchaseStyleId] = " +$("#PurchaseStyleId_SEARCH").val();
		}
		if($("#ProjectSourceId_SEARCH").val()!=''&& $("#ProjectSourceId_SEARCH").val()!= undefined){
			searchkey += " and [ProjectSourceId] = " +$("#ProjectSourceId_SEARCH").val();
		}
		if($("#SourcesOfFundingId_SEARCH").val()!=''&& $("#SourcesOfFundingId_SEARCH").val()!= undefined){
			searchkey += " and [FundingSourceId] = " +$("#SourcesOfFundingId_SEARCH").val();
		}
		if($("#ProjectPropertyId_SEARCH").val()!=''&& $("#ProjectPropertyId_SEARCH").val()!= undefined){
			searchkey += " and [ProjectPropertyId] = "&& +$("#ProjectPropertyId_SEARCH").val();
		}
		if($("#StateId_SEARCH").val()!='' && $("#StateId_SEARCH").val()!= undefined){
			searchkey += " and [ProjectStatusId] = " +$("#StateId_SEARCH").val();
		}
		if($("#EmployeeId_SEARCH").val()!='' && $("#EmployeeId_SEARCH").val()!= undefined){
			searchkey += " and [EmployeeId] = " +$("#EmployeeId_SEARCH").val();
		}
		if($("#Assistant_SEARCH").val()!='' && $("#Assistant_SEARCH").val()!= undefined){
			searchkey += " and [Assistant] = " +$("#Assistant_SEARCH").val();
		}
		source.url = "SelectProjectsSummary?searchkey=" + searchkey;
		dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgrid").jqxGrid({ source: dataAdapter });
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

function InitNewCustomerWindow(dict){
	$("#popupWindow_NewCustomer").jqxWindow({ showCollapseButton: true,isModal: true,
    	width: 300, 
    	height:300,autoOpen: false, cancelButton: $("#NewCustomer_Cancel"), modalOpacity: 0.40 });   


	$('#NewCustomer_Customer').jqxInput({height: 23, width: 200}); 
	$('#NewCustomer_ContactName').jqxInput({height: 23, width: 200}); 
	$('#NewCustomer_ContactTel').jqxInput({height: 23, width: 200}); 
	$("#NewCustomer_Cancel").jqxButton({ theme: theme });
    $("#NewCustomer_Save").jqxButton({ theme: theme, template:"success"  });
	$("#NewCustomer_Cancel").jqxButton({ theme: theme, template:"warning"  });

    $("#NewCustomer_Cancel").click(function () {
    	$("#popupWindow_NewCustomer").jqxWindow('hide');
    });


    $("#NewCustomer_Save").click(function () {
		var row = {	
			dwmc:$('#NewCustomer_Customer').val(),
			lxr:$('#NewCustomer_ContactName').val(),
			sj:$('#NewCustomer_ContactTel').val()
		};
		$.post('CreateCustomer', row, function(result){
			/*var data = result[0];
			$('#lxdz').val(data['lxdz']);
			$('#dzxx').val(data['dzxx']);
			$('#cz').val(data['cz']);
			if (data['lxr1']!='')
			{
				$('#lxr').val(data['lxr1']);
				$('#sj').val(data['sj1']);
			}
			else if (data['lxr2']!='')
			{
				$('#lxr').val(data['lxr2']);
				$('#sj').val(data['sj2']);			
			}
			else
			{
				$('#lxr').val(data['lxr3']);
				$('#sj').val(data['sj3']);				
			}
			olddwmc = dwmc;*/
//			alert(result['khId'])
//			alert(result['lxrId'])
			$("#popupWindow_NewCustomer").jqxWindow('hide');
		}, 'json');	



    	
    });	

    $('#NewCustomer_Validator').jqxValidator({
        rules: [
               { input: '#NewCustomer_Customer', message: '不可为空', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewCustomer_Customer").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewCustomer_ContactName', message: '不可为空', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewCustomer_ContactName").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewCustomer_ContactTel', message: '不可为空', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewCustomer_ContactTel").val();
        			if(val==""){return false;}	return true;
        		} }
               ]
    });	
}
function InitNewProjectWindow(dict){	
	// 填写项目名称
	$("#NewProject_ProjectName").addClass('jqx-input')
	$("#NewProject_ProjectName").width(200)
	$("#NewProject_ProjectName").height(23)
	// 采购单位
    BindCustomer("#NewProject_Customer",dict.Customer)
   //采购单位联系人
    $("#NewProject_Customer").on('select', function (event) {
    	var args = event.args;
		if (args) {
			var item = $("#NewProject_Customer").jqxComboBox('getItem', args.index);
	//    	var dict = JSON.parse($("#Dictionaries").text())
			var args = event.args;
			var contactor  = JSON.parse(gdictcontactor)
	//		var contactor = gdictcontactor;
			var selectedContractor=[]
			for (var i=0;i<contactor.length;i++){
				if(contactor[i]["khId"]==item.value){
					selectedContractor.push(contactor[i]);
				}
			}
			var selectedContractorStr = JSON.stringify(selectedContractor)
			BindContactor("#NewProject_ContactName","#NewProject_ContactTel","#NewProject_Customer",selectedContractor)
		}
	});
	BindContactor("#NewProject_ContactName","#NewProject_ContactTel","#NewProject_Customer",dict.Contactor)
	// 项目类型
	BindProjectType("#NewProject_ProjectType",dict.ProjectType);
	// 采购类型
	BindPurchaseStyle("#NewProject_PurchaseStyle",dict.PurchaseStyle)
	// 项目性质
	BindProjectProperty("#NewProject_ProjectProperty",dict.ProjectProperty)
	// 项目来源
	BindProjectSource("#NewProject_ProjectSource",dict.ProjectSource)
	// 项目资金来源
   BindFundingSource("#NewProject_FundingSource",dict.FundingSource)
    // 项目负责人
   BindEmployee("#NewProject_Employee",dict.Employee)
   // 协助人
   BindEmployee("#NewProject_Assistant",dict.Employee)
   // 项目状态
//   BindProjectStatus("#NewProject_ProjectStatus",dict.ProjectStatus)
   // 协议编号
   BindProtocolNumberWithID("#NewProject_ProtocolCode",dict.ProtocolCode)

	$("#NewProject_FundingSource").jqxDropDownList({ disabled: true }); 
	$("#NewProject_PurchaseStyle").jqxDropDownList({ disabled: true }); 
	$("#NewProject_ProjectProperty").jqxDropDownList({ disabled: true }); 

	$('#NewProject_ProjectType').on('select', function (event)
	{
//		alert($('#NewProject_ProjectType').val())
		if ($('#NewProject_ProjectType').val() == '0')
		{//国内项目
			$("#NewProject_FundingSource").jqxDropDownList({ disabled: true }); 
			$("#NewProject_PurchaseStyle").jqxDropDownList({ disabled: false }); 
			$("#NewProject_ProjectProperty").jqxDropDownList({ disabled: false }); 
			$("#NewProject_ProjectProperty").jqxDropDownList('enableAt', 4 ); 
		}
		else
		{//国际项目
			$("#NewProject_FundingSource").jqxDropDownList({ disabled: false }); 
			$("#NewProject_PurchaseStyle").jqxDropDownList({ disabled: true }); 
			$("#NewProject_ProjectProperty").jqxDropDownList({ disabled: false }); 
			$("#NewProject_ProjectProperty").jqxDropDownList('disableAt', 4 ); 
		}
	}                        
	);   
   
	// 项目创建时间
    //	$("#NewProject_CreationDate").jqxDateTimeInput({ formatString: "yyyy-MM-dd HH:mm:ss", showTimeButton: true, width: '200px', height: '25px' });
	// 初始化创建项目的loader
	$("#Loader_CreatingNewProject").jqxLoader({ width: 100, height: 60, imagePosition: 'top' });
	// 初始化整个Window
	$("#popupWindow_NewProject").jqxWindow({ showCollapseButton: true,isModal: true,
    	width: 650, 
    	height:350,autoOpen: false, cancelButton: $("#NewProject_Cancel"), modalOpacity: 0.40 });    
	$("#NewProject_Cancel").jqxButton({ theme: theme });
    $("#NewProject_Cancel").click(function () {
    	$("#popupWindow_NewProject").jqxWindow('hide');
    });
    $("#NewProject_Save").jqxButton({ theme: theme, template:"success"  });
/*	$("#NewCustomer_Create").jqxButton({ theme: theme, template:"primary"  });
	$("#NewProject_Cancel").jqxButton({ theme: theme, template:"warning"  });
	$("#NewCustomer_Create").click(function () {
		$("#popupWindow_NewCustomer").jqxWindow('show');
	});*/

    $('#NewProject_Validator').jqxValidator({
        rules: [
 { input: '#NewProject_ProjectName', message: '项目名称不得为空!', action: 'keyup, blur', rule: function(input){
       			var val = $("#NewProject_ProjectName").val();
    			if(val==""){return false;}	return true;
    		} },
               { input: '#NewProject_Customer', message: '必须选择采购单位!', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewProject_Customer").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewProject_ContactName', message: '必须选择采购单位联系人!', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewProject_ContactName").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewProject_ContactTel', message: '必须选择采购单位联系人方式', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewProject_ContactTel").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewProject_ProjectType', message: '必须选择项目类型!', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewProject_ProjectType").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewProject_PurchaseStyle', message: '必须选择项目采购方式!', action: 'keyup, blur', rule: function(input){
					if ($("#NewProject_ProjectType").val() == '0' )
					{          			
						var val = $("#NewProject_PurchaseStyle").val();
						if(val==""){return false;}	return true;
					}
					return true;
        		} },
               { input: '#NewProject_ProjectProperty', message: '必须选择项目性质!', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewProject_ProjectProperty").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewProject_ProjectSource', message: '必须选择项目来源', action: 'keyup, blur', rule:function(input){
          			var val = $("#NewProject_ProjectSource").val();
        			if(val==""){return false;}	return true;
        		} },
               { input: '#NewProject_FundingSource', message: '必须选择项目资金来源', action: 'keyup, blur', rule: function(input){
          			
					if ($("#NewProject_ProjectType").val() == '1' )
					{
						var val = $("#NewProject_FundingSource").val();
						if(val==""){return false;}	return true;
					}
					return true;
        		}},
               { input: '#NewProject_Employee', message: '必须选择项目负责人', action: 'keyup, blur', rule: function(input){
          			var val = $("#NewProject_Employee").val();
        			if(val==""){return false;}	return true;
        		} },
            //    { input: '#NewProject_Assistant', message: '必须选择项目协助人', action: 'valuechanged, blur', rule: function(input){
          	// 		var val = $("#NewProject_Assistant").val();
        	// 		if(val==""){return false;}	return true;
        	// 	} }
//               { input: '#NewProject_ProtocolCode', message: '必须选择项目协助人!', action: 'valuechanged, blur', rule: function(input){
//          			var val = $("#NewProject_ProtocolCode").val();
//        			if(val==""){return false;}	return true;
//        		} }
               ]
    });	
    $("#NewProject_Save").click(function () {
    	if ($('#NewProject_Validator').jqxValidator('validate')==false){
			
			return;
		}
    	
		// 添加成功后弹出项目编号创建成功的界面，告知操作人员项目已添加了
		var row = {  ProtocolCodeId:$("#NewProject_ProtocolCode").val()
		,ProjectName:$("#NewProject_ProjectName").val()
		,CustomerId:$("#NewProject_Customer input").val(),EmployeeId:$("#NewProject_Employee").val(),Assistant:$("#NewProject_Assistant").val(),ProjectSourceId:$("#NewProject_ProjectSource").val()
		,FundingSourceId:$("#NewProject_FundingSource").val(),ProjectTypeId:$("#NewProject_ProjectType").val(),ProjectPropertyId:$("#NewProject_ProjectProperty").val(),PurchaseStyleId:$("#NewProject_PurchaseStyle").val()
		,ProjectStatusId:'1',IsDelete:'0',ContactorNameId:$("#NewProject_ContactName input").val(),ContactTelId:$("#NewProject_ContactTel input").val()
		}
		var datarow = row;
		$("#Loader_CreatingNewProject").jqxLoader('open');
		if (greGetCodeFlag == 0)
		{
			$.post("/bidding/default/CreateNewProject",datarow,function(result){
				if (result['result'] == 'fail')
				{
					alert('操作不成功')
					$('#Loader_CreatingNewProject').jqxLoader('close');
					return
				}				
				$("#jqxgrid").jqxGrid('addrow', null, result, 'first');
				$('#Loader_CreatingNewProject').jqxLoader('close');
			},'json');
		}
		else
		{
			var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
			var rowid = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
			row = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex)
			$.post("/bidding/default/ReGetProjectCode?id="+row['Id'],datarow,function(result){
				if (result['result'] == 'fail')
				{
					alert('操作不成功')
					$('#Loader_CreatingNewProject').jqxLoader('close');
					return
				}
				var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
				var rowid = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
				$("#jqxgrid").jqxGrid('updaterow', rowid, result);
				$('#Loader_CreatingNewProject').jqxLoader('close');
			},'json');
		}
		
		$("#popupWindow_NewProject").jqxWindow('hide');
	});

}

function AdvancedSearchContent(action,dict){
	if(action=="show"){
		var searchTable = $("#searchTable"); 
		var row1HTML = '<tr id="row1Search"><td align="left"><p>采购单位</p></td>	<td align="left"><div id="BuyerId_SEARCH" /></td>	\
			<td align="left"><p>项目类型</p></td> <td align="left"><div id="ProjectTypeId_SEARCH" /></td>	\
			<td align="left"><p>采购方式</p></td>	<td align="left"><div id="PurchaseStyleId_SEARCH" /></td>\
			</tr>'
			var row2HTML='<tr id="row2Search"><td align="left"><p>项目来源</p></td>	<td align="left"><div id="ProjectSourceId_SEARCH" /></td> \
			<td align="left"><p>资金来源</p></td>	<td align="left"><div id="SourcesOfFundingId_SEARCH" /></td>\
			<td align="left"><p>项目性质</p></td>	<td align="left"><div id="ProjectPropertyId_SEARCH" /></td>\
			</tr>'
			var row3HTML = '<tr id="row3Search"><td align="left"><p>项目状态</p></td>	<td align="left"><div id="StateId_SEARCH" /></td>\
				<td align="left"><p>负责人</p></td>	<td align="left"><div id="EmployeeId_SEARCH" /></td>\
				<td align="left"><p>协助人</p></td>	<td align="left"><div id="Assistant_SEARCH" /></td>\
				</tr>'
			searchTable.append(row1HTML);
			searchTable.append(row2HTML);
			searchTable.append(row3HTML);
			BindCustomer("#BuyerId_SEARCH",dict.Customer)  // dropdownlist
			BindProjectType("#ProjectTypeId_SEARCH",dict.ProjectType)// dropdownlist
			BindProjectSource("#ProjectSourceId_SEARCH",dict.ProjectSource)// dropdownlist
			BindFundingSource("#SourcesOfFundingId_SEARCH",dict.FundingSource)// dropdownlist
			BindProjectProperty("#ProjectPropertyId_SEARCH",dict.ProjectProperty)// dropdownlist
			BindPurchaseStyle("#PurchaseStyleId_SEARCH",dict.PurchaseStyle)
			BindEmployee("#EmployeeId_SEARCH",dict.Employee,true)// dropdownlist
			BindAssitant("#Assistant_SEARCH",dict.Employee,false)// dropdownlist
			BindProjectStatus("#StateId_SEARCH",dict.ProjectStatus)// dropdownlist
	}else{
		$("#row1Search").remove();
		$("#row2Search").remove();
		$("#row3Search").remove();
	}
	
}


$(document).ready(function () {
	var dict = JSON.parse($("#Dictionaries").text())
	gdict = dict;
	InitSearchArea(dict);
    addselectfieldwindows();
	InitProjectGrid(dict);
	InitNewProjectWindow(dict);
	InitNewCustomerWindow(dict);
});
