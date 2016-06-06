
function initProtocolCodeGrid(dict) {
	var datafields_content = [
		{
			"name": "Id",
			"type": "string"
		}, {
			"name": "ProtocolNumber",
			"type": "string"
		}, {
			"name": "TypeId",
			"type": "string"
		}, {
			"name": "EmployeeId",
			"type": "string"
		}, {
			"name": "CreationTime",
			"type": "string"
		}, {
			"name": "IsDelete",
			"type": "string"
		}]
	var data_url = "/bidding/default/select?table=ProtocolCode"
	var source = {
		url: data_url,
		datatype: "json",
		datafields: datafields_content,
		updaterow: function (rowid, rowdata, commit) {
			// synchronize with the server - send update command
			// call commit with parameter true if the synchronization with the
			// server is successful
			// and with parameter false if the synchronization failed.
			$.post("/bidding/default/update?table=ProtocolCode", rowdata,
				function (result) {
					alert("操作成功！");
				});
			commit(true);
		},
		deleterow: function (rowid, commit) {
			// synchronize with the server - send delete command
			// call commit with parameter true if the synchronization with the
			// server is successful
			// and with parameter false if the synchronization failed.
			var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
			$.post("/bidding/default/delete?table=ProtocolCode", dataRecord,
				function (result) {
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
			// represents the new ID if it is generated from a Database.
			// Example: commit(true, idInDB) where "idInDB" is the row's ID in
			// the Database.
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	var editrow = -1;
	// initialize jqxGrid
	var columns_content = [{
		"datafield": "Id",
		"text": "\u5e8f\u53f7"
	}, {
			"datafield": "ProtocolNumber",
			"text": "\u534f\u8bae\u7f16\u53f7"
		}, {
			"datafield": "TypeId",
			"text": "\u7c7b\u578b\u7f16\u53f7",
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
				var label = "";
				var pt = JSON.parse(dict.ProtocolCodeType)
				for (var i = 0; i < pt.length; i++) {
					if (pt[i].TypeId == value.toString()) {
						label = pt[i].TypeName
					}
				}
				return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">' + label + ' </div>'
			}
		}, {
			"datafield": "EmployeeId",
			"text": "\u5458\u5de5\u7f16\u53f7",
			cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        		   var label="";
                        		   var pt = JSON.parse(dict.Employee)
                           		  for(var i=0;i<pt.length;i++){
                           			  if(pt[i].Id==value.toString()) {
                           				  label = pt[i].Name
                           			  }
                           		  }
                      		   		  return '<div class="jqx-grid-cell-middle-align" style="margin-top: 10px;">'+ label+' </div>'
                               }
		}, {
			"datafield": "CreationTime",
			"text": "\u521b\u5efa\u65e5\u671f"
		}]
	$("#jqxgrid").jqxGrid(
		{
			width: '100%',
			height: "90%",
			columnsresize: true,
			source: dataAdapter,
			pageable: true,
			autoheight: true,
			columns: columns_content,
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
				            var exportButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>导出</span></div>");
				            var columnSettingButton = $("<div style='float: left; margin-left: 5px;'><span style='margin-left: 4px; position: relative; top: 0px;'>设置</span></div>");
				            toolbar.append(container);
				            container.append(addNewButton);
				            container.append(refreshButton);
				            container.append(deleteButton);
				            container.append(printButton);
//				            container.append(exportButton);
//				            container.append(columnSettingButton);
				            addNewButton.jqxButton({ template: "success" });
				            refreshButton.jqxButton({ template: "primary" });
				            printButton.jqxButton({ template: "info" });
				            exportButton.jqxButton({ template: "warning" });
				            deleteButton.jqxButton({ template: "danger" });
				            columnSettingButton.jqxButton({ template: "inverse" });
				            addNewButton.click(function (event) {
					$("#popupWindow_ADD").jqxWindow('show');
				            });
				            refreshButton.click(function (event) {
					source.url = data_url
					dataAdapter = new $.jqx.dataAdapter(source);
					$("#jqxgrid").jqxGrid({ source: dataAdapter });
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

	// initialize the popup add window and buttons.
	$("#popupWindow_ADD").jqxWindow({
		width: 400,
		resizable: false,
		isModal: true,
		autoOpen: false,
		cancelButton: $("#Cancel"),
		modalOpacity: 0.40
	});
	BindProtocolType('#ProtocalTypeId_ADD',dict.ProtocolCodeType)
	$("#Cancel_ADD").jqxButton({
		theme: theme,
		template: "warning"
	});
	$("#Cancel_ADD").click(function () {
		$("#popupWindow_ADD").jqxWindow('hide');
	})
	$("#Save_ADD").jqxButton({
		theme: theme,
		template: "success"
	});
	$("#Save_ADD").click(
		function () {
			var row = { TypeId: $("#ProtocalTypeId_ADD").val() }
			var datarow = row;
			$.post("/bidding/default/CreateNewProtocol", datarow, function (result) {
				$("#jqxgrid").jqxGrid('addrow', null, result, 'first');
			}, 'json');
			$("#popupWindow_ADD").jqxWindow('hide');
		}
	);

	BindProtocolNumber('#ProtocolNumber_SEARCH')
	$("#Protocol_SEARCH_Button").jqxButton({ template: "success", height: '17px' });
	$("#Protocol_SEARCH_Button").click(function (event) {
		var searchkey = $("#ProtocolNumber_SEARCH").val();
		source.url = "xybh_ss?searchkey=" + searchkey;
		dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgrid").jqxGrid({ source: dataAdapter });
	});
}


$(document).ready(function () {
	var dict = JSON.parse($("#Dictionaries").text())
	initProtocolCodeGrid(dict)
});