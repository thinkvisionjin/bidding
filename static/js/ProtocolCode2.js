        $(document).ready(function () {
            // prepare the data
            var data = generatedata(25);
            var datafields_content =  [{"name":"Id","type":"string"},{"name":"ProtocolNumber","type":"string"},{"name":"TypeId","type":"string"},{"name":"EmployeeId","type":"string"},{"name":"CreationTime","type":"string"},{"name":"IsDelete","type":"string"}]
            //********DATAFIELDS START******************//
//            [
//             { name: 'firstname', type: 'string' },
//             { name: 'lastname', type: 'string' },
//             { name: 'productname', type: 'string' },
//             { name: 'quantity', type: 'number' },
//             { name: 'price', type: 'number' }
//         ]
           //********DATAFIELDS END******************//
           var data_url = "/bidding/default/select?table=ProtocolCode"
            var source =
            {
                url: data_url,
                datatype: "json",
                datafields:datafields_content,
                updaterow: function (rowid, rowdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                	 $.post("/bidding/default/update?table=ProtocolCode",rowdata,function(result){
                		 alert("success");
                	 });
                    commit(true);
                },
                deleterow: function (rowid, commit) {
                    // synchronize with the server - send delete command
                    // call commit with parameter true if the synchronization with the server is successful 
                    // and with parameter false if the synchronization failed.
                	var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowid);
                	$.post("/bidding/default/delete?table=ProtocolCode",dataRecord,function(result){
               		 alert("success");
               	 });
                    commit(true);
                }
            };
            // initialize the input fields.
            $("#Id").addClass('jqx-input')
$("#Id").width(150)
$("#Id").height(23)
$("#ProtocolNumber").addClass('jqx-input')
$("#ProtocolNumber").width(150)
$("#ProtocolNumber").height(23)
$("#TypeId").addClass('jqx-input')
$("#TypeId").width(150)
$("#TypeId").height(23)
$("#EmployeeId").addClass('jqx-input')
$("#EmployeeId").width(150)
$("#EmployeeId").height(23)
$("#CreationTime").addClass('jqx-input')
$("#CreationTime").width(150)
$("#CreationTime").height(23)
$("#IsDelete").addClass('jqx-input')
$("#IsDelete").width(150)
$("#IsDelete").height(23)

          //********INIT_INPUT_FIELDS START******************//
//            $("#firstName").addClass('jqx-input');
//            $("#lastName").addClass('jqx-input');
//            $("#product").addClass('jqx-input');
//            $("#firstName").width(150);
//            $("#firstName").height(23);
//            $("#lastName").width(150);
//            $("#lastName").height(23);
//            $("#product").width(150);
//            $("#product").height(23);
//            if (theme.length > 0) {
//                $("#firstName").addClass('jqx-input-' + theme);
//                $("#lastName").addClass('jqx-input-' + theme);
//                $("#product").addClass('jqx-input-' + theme);
//            }
//            $("#quantity").jqxNumberInput({ width: 150, height: 23,  decimalDigits: 0, spinButtons: true });
//            $("#price").jqxNumberInput({symbol: '$', width: 150, height: 23,  spinButtons: true });
          //********INIT_INPUT_FIELDS START******************//
            
          
            var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            // initialize jqxGrid
            var columns_content  = [{"datafield":"Id","text":"\u5e8f\u53f7","width":200},{"datafield":"ProtocolNumber","text":"\u534f\u8bae\u7f16\u53f7","width":200},{"datafield":"TypeId","text":"\u7c7b\u578b\u7f16\u53f7","width":200},{"datafield":"EmployeeId","text":"\u5458\u5de5\u7f16\u53f7","width":200},{"datafield":"CreationTime","text":"\u521b\u5efa\u65e5\u671f","width":200},{"datafield":"IsDelete","text":"\u662f\u5426\u5df2\u5220\u9664","width":200}]
        	//********COLUMNS_CONTENT START ******************//
//        	[
//          { text: 'First Name', datafield: 'firstname', width: 200 },
//          { text: 'Last Name', datafield: 'lastname', width: 200 },
//          { text: 'Product', datafield: 'productname', width: 190 },
//          { text: 'Quantity', datafield: 'quantity', width: 90, cellsalign: 'right' },
//          { text: 'Price', datafield: 'price', cellsalign: 'right', cellsformat: 'c2' }
//        ]
           //********COLUMNS_CONTENT  END******************//
            $("#jqxgrid").jqxGrid(
            {
                width: 850,
                source: dataAdapter,
                pageable: true,
                autoheight: true,
                columns: columns_content,
                showstatusbar: true,
                renderstatusbar: function (statusbar) {
                    // appends buttons to the status bar.
                    var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
                    var addButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../bidding/static/images/add.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Add</span></div>");
                    var deleteButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../bidding/static/images/close.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Delete</span></div>");
                    var reloadButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../bidding/static/images/refresh.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Reload</span></div>");
                    var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='../../bidding/static/images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
                    container.append(addButton);
                    container.append(deleteButton);
                    container.append(reloadButton);
                    container.append(searchButton);
                    statusbar.append(container);
                    addButton.jqxButton({  width: 60, height: 20 });
                    deleteButton.jqxButton({  width: 65, height: 20 });
                    reloadButton.jqxButton({  width: 65, height: 20 });
                    searchButton.jqxButton({  width: 50, height: 20 });
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
                    // search for a record.
                    searchButton.click(function (event) {
                        var offset = $("#jqxgrid").offset();
                        $("#jqxwindow").jqxWindow('open');
                        $("#jqxwindow").jqxWindow('move', offset.left + 30, offset.top + 30);
                    });
                },
            });
         // create jqxWindow.
            $("#jqxwindow").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
            // create find and clear buttons.
            $("#findButton").jqxButton({ width: 70});
            $("#clearButton").jqxButton({ width: 70});
            // create dropdownlist.
            $("#dropdownlist").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
                source: [
                    'First Name', 'Last Name', 'Product', 'Quantity', 'Price'
                ]
            });
            if (theme != "") {
                $("#inputField").addClass('jqx-input-' + theme);
            }
            // clear filters.
            $("#clearButton").click(function () {
                $("#jqxgrid").jqxGrid('clearfilters');
            });
            // find records that match a criteria.
            $("#findButton").click(function () {
                $("#jqxgrid").jqxGrid('clearfilters');
                var searchColumnIndex = $("#dropdownlist").jqxDropDownList('selectedIndex');
                var datafield = "";
                switch (searchColumnIndex) {
                    case 0:
                        datafield = "firstname";
                        break;
                    case 1:
                        datafield = "lastname";
                        break;
                    case 2:
                        datafield = "productname";
                        break;
                    case 3:
                        datafield = "quantity";
                        break;
                    case 4:
                        datafield = "price";
                        break;
                }
                var searchText = $("#inputField").val();
                var filtergroup = new $.jqx.filter();
                var filter_or_operator = 1;
                var filtervalue = searchText;
                var filtercondition = 'contains';
                var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
                filtergroup.addfilter(filter_or_operator, filter);
                $("#jqxgrid").jqxGrid('addfilter', datafield, filtergroup);
                // apply the filters.
                $("#jqxgrid").jqxGrid('applyfilters');
            });
            // create context menu
            var contextMenu = $("#Menu").jqxMenu({ width: 200, height: 58, autoOpenPopup: false, mode: 'popup'});
            $("#jqxgrid").on('contextmenu', function () {
                return false;
            });
            // handle context menu clicks.
            $("#Menu").on('itemclick', function (event) {
                var args = event.args;
                var rowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
                if ($.trim($(args).text()) == "Edit Selected Row") {
                    editrow = rowindex;
                    var offset = $("#jqxgrid").offset();
                    $("#popupWindowEdit").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60} });
                    // get the clicked row's data and initialize the input fields.
                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                    $("#Id").val(dataRecord.Id);
$("#ProtocolNumber").val(dataRecord.ProtocolNumber);
$("#TypeId").val(dataRecord.TypeId);
$("#EmployeeId").val(dataRecord.EmployeeId);
$("#CreationTime").val(dataRecord.CreationTime);
$("#IsDelete").val(dataRecord.IsDelete);

                  //********=GET_ROW_DATA START******************//
//                    $("#firstName").val(dataRecord.firstname);
//                    $("#lastName").val(dataRecord.lastname);
//                    $("#product").val(dataRecord.productname);
//                    $("#quantity").jqxNumberInput({ decimal: dataRecord.quantity });
//                    $("#price").jqxNumberInput({ decimal: dataRecord.price });
                  //********GET_ROW_DATA END******************//
                    // show the popup window.
                    $("#popupWindowEdit").jqxWindow('show');
                }
                else {
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
            // initialize the popup edit window and buttons.
            $("#popupWindowEdit").jqxWindow({ width: 250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
            $("#Cancel").jqxButton({ theme: theme });
            $("#Save").jqxButton({ theme: theme });
            // update the edited row when the user clicks the 'Save' button.
            $("#Save").click(function () {
                if (editrow >= 0) {
                    var row = {Id:$("#Id").val()
,ProtocolNumber:$("#ProtocolNumber").val()
,TypeId:$("#TypeId").val()
,EmployeeId:$("#EmployeeId").val()
,CreationTime:$("#CreationTime").val()
,IsDelete:$("#IsDelete").val()
};
                  //******** ROW_CONTENT_SAVE START*****************//
//                    { firstname: $("#firstName").val(), lastname: $("#lastName").val(), productname: $("#product").val(),
//                        quantity: parseInt($("#quantity").jqxNumberInput('decimal')), price: parseFloat($("#price").jqxNumberInput('decimal'))
//                    }
                  //********ROW_CONTENT_SAVE END******************//
                    var rowid = $("#jqxgrid").jqxGrid('getrowid', editrow);
                    $('#jqxgrid').jqxGrid('updaterow', rowid, row);
                    $("#popupWindowEdit").jqxWindow('hide');
                }
            });
            //initialize the popup add window and buttons.
            $("#popupWindow_ADD").jqxWindow({ width: 250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
            $("#Cancel_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").jqxButton({ theme: theme });
            $("#Save_ADD").click(function () {
            	var row = {
						 ProtocolNumber:$("#ProtocolNumber_ADD").val()
						,TypeId:$("#TypeId_ADD").val()
						,EmployeeId:$("#EmployeeId_ADD").val()
						,CreationTime:$("#CreationTime_ADD").val()
						,IsDelete:$("#IsDelete_ADD").val()
						};
           	   var datarow = row;
               $.post("/bidding/default/insert?table=ProtocolCode",datarow,function(result){
            	   //result = {"TypeId": 333, "EmployeeId": 33, "CreationTime": "21/04/16 14:44", "ProtocolNumber": "333", "IsDelete": true, "Id": 45}
            	   $("#jqxgrid").jqxGrid('addrow', null, result, 'first');
             	 },'json');
               $("#popupWindow_ADD").jqxWindow('hide');
            });
            
            $("#excelExport").jqxButton();
            $("#xmlExport").jqxButton();
            $("#csvExport").jqxButton();
            $("#tsvExport").jqxButton();
            $("#htmlExport").jqxButton();
            $("#jsonExport").jqxButton();
            $("#pdfExport").jqxButton();
            $("#excelExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');           
            });
            $("#xmlExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'xml', 'jqxGrid');
            });
            $("#csvExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'csv', 'jqxGrid');
            });
            $("#tsvExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'tsv', 'jqxGrid');
            });
            $("#htmlExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'html', 'jqxGrid');
            });
            $("#jsonExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'json', 'jqxGrid');
            });
            $("#pdfExport").click(function () {
                $("#jqxgrid").jqxGrid('exportdata', 'pdf', 'jqxGrid');
            });
            $("#print").jqxButton();
            $("#print").click(function () {
                var gridContent = $("#jqxgrid").jqxGrid('exportdata', 'html');
                var newWindow = window.open('', '', 'width=800, height=500'),
                document = newWindow.document.open(),
                pageContent =
                    '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '<head>\n' +
                    '<meta charset="utf-8" />\n' +
                    '<title>jQWidgets Grid</title>\n' +
                    '</head>\n' +
                    '<body>\n' + gridContent + '\n</body>\n</html>';
                document.write(pageContent);
                document.close();
                newWindow.print();
            });
            
            
            $("#inputName").jqxInput({ placeHolder: "Enter a Name", height: 25, width: 200, 
                source: function (query, response) {
                    var dataAdapter = new $.jqx.dataAdapter
                    (
                        {
                            datatype: "jsonp",
                            datafields:
                            [
                                { name: 'countryName' }, { name: 'name' },
                                { name: 'population', type: 'float' },
                                { name: 'continentCode' },
                                { name: 'adminName1' }
                            ],
                            url: "http://api.geonames.org/searchJSON",
                            data:
                            {
                                featureClass: "P",
                                style: "full",
                                maxRows: 12,
                                username: "jqwidgets"
                            }
                        },
                        {
                            autoBind: true,
                            formatData: function (data) {
                                data.name_startsWith = query;
                                return data;
                            },
                            loadComplete: function (data) {
                                if (data.geonames.length > 0) {
                                    response($.map(data.geonames, function (item) {
                                        return {
                                            label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
                                            value: item.name
                                        }
                                    }));
                                }
                            }
                        }
                    );
                }
            });
        });