        $(document).ready(function () {
            // prepare the data
            var data = generatedata(25);
            var datafields_content =  [{"name":"Id","type":"string"},{"name":"ProtocolCodeId","type":"string"},{"name":"ProjectCodeId","type":"string"},{"name":"ProjectName","type":"string"},{"name":"BuyerId","type":"string"},{"name":"EmployeeId","type":"string"},{"name":"Assistant","type":"string"},{"name":"ProjectSourceId","type":"string"},{"name":"SourcesOfFundingId","type":"string"},{"name":"ProjectTypeId","type":"string"},{"name":"ManagementStyleId","type":"string"},{"name":"Package","type":"string"},{"name":"StateId","type":"string"},{"name":"SigningDate","type":"string"},{"name":"MakeOutDate","type":"string"},{"name":"EntrustMoney","type":"string"},{"name":"WinningMoney","type":"string"},{"name":"WinningCompany","type":"string"},{"name":"ChargeRate","type":"string"},{"name":"Note","type":"string"},{"name":"CreationDate","type":"string"},{"name":"IsDelete","type":"string"}]
            //********DATAFIELDS START******************//
//            [
//             { name: 'firstname', type: 'string' },
//             { name: 'lastname', type: 'string' },
//             { name: 'productname', type: 'string' },
//             { name: 'quantity', type: 'number' },
//             { name: 'price', type: 'number' }
//         ]
           //********DATAFIELDS END******************//
           var data_url = "/bidding/default/select?table=Projects"
            var source =
            {
                url: data_url,
                datatype: "json",
                datafields:datafields_content,
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
                    commit(true);
                }
            };
            // initialize the input fields.
            $("#Id").addClass('jqx-input')
$("#Id").width(150)
$("#Id").height(23)
$("#ProtocolCodeId").addClass('jqx-input')
$("#ProtocolCodeId").width(150)
$("#ProtocolCodeId").height(23)
$("#ProjectCodeId").addClass('jqx-input')
$("#ProjectCodeId").width(150)
$("#ProjectCodeId").height(23)
$("#ProjectName").addClass('jqx-input')
$("#ProjectName").width(150)
$("#ProjectName").height(23)
$("#BuyerId").addClass('jqx-input')
$("#BuyerId").width(150)
$("#BuyerId").height(23)
$("#EmployeeId").addClass('jqx-input')
$("#EmployeeId").width(150)
$("#EmployeeId").height(23)
$("#Assistant").addClass('jqx-input')
$("#Assistant").width(150)
$("#Assistant").height(23)
$("#ProjectSourceId").addClass('jqx-input')
$("#ProjectSourceId").width(150)
$("#ProjectSourceId").height(23)
$("#SourcesOfFundingId").addClass('jqx-input')
$("#SourcesOfFundingId").width(150)
$("#SourcesOfFundingId").height(23)
$("#ProjectTypeId").addClass('jqx-input')
$("#ProjectTypeId").width(150)
$("#ProjectTypeId").height(23)
$("#ManagementStyleId").addClass('jqx-input')
$("#ManagementStyleId").width(150)
$("#ManagementStyleId").height(23)
$("#Package").addClass('jqx-input')
$("#Package").width(150)
$("#Package").height(23)
$("#StateId").addClass('jqx-input')
$("#StateId").width(150)
$("#StateId").height(23)
$("#SigningDate").addClass('jqx-input')
$("#SigningDate").width(150)
$("#SigningDate").height(23)
$("#MakeOutDate").addClass('jqx-input')
$("#MakeOutDate").width(150)
$("#MakeOutDate").height(23)
$("#EntrustMoney").addClass('jqx-input')
$("#EntrustMoney").width(150)
$("#EntrustMoney").height(23)
$("#WinningMoney").addClass('jqx-input')
$("#WinningMoney").width(150)
$("#WinningMoney").height(23)
$("#WinningCompany").addClass('jqx-input')
$("#WinningCompany").width(150)
$("#WinningCompany").height(23)
$("#ChargeRate").addClass('jqx-input')
$("#ChargeRate").width(150)
$("#ChargeRate").height(23)
$("#Note").addClass('jqx-input')
$("#Note").width(150)
$("#Note").height(23)
$("#CreationDate").addClass('jqx-input')
$("#CreationDate").width(150)
$("#CreationDate").height(23)
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
            var columns_content  = [{"datafield":"Id","text":"Id","width":200},{"datafield":"ProtocolCodeId","text":"ProtocolCodeId","width":200},{"datafield":"ProjectCodeId","text":"ProjectCodeId","width":200},{"datafield":"ProjectName","text":"ProjectName","width":200},{"datafield":"BuyerId","text":"BuyerId","width":200},{"datafield":"EmployeeId","text":"EmployeeId","width":200},{"datafield":"Assistant","text":"Assistant","width":200},{"datafield":"ProjectSourceId","text":"ProjectSourceId","width":200},{"datafield":"SourcesOfFundingId","text":"SourcesOfFundingId","width":200},{"datafield":"ProjectTypeId","text":"ProjectTypeId","width":200},{"datafield":"ManagementStyleId","text":"ManagementStyleId","width":200},{"datafield":"Package","text":"Package","width":200},{"datafield":"StateId","text":"StateId","width":200},{"datafield":"SigningDate","text":"SigningDate","width":200},{"datafield":"MakeOutDate","text":"MakeOutDate","width":200},{"datafield":"EntrustMoney","text":"EntrustMoney","width":200},{"datafield":"WinningMoney","text":"WinningMoney","width":200},{"datafield":"WinningCompany","text":"WinningCompany","width":200},{"datafield":"ChargeRate","text":"ChargeRate","width":200},{"datafield":"Note","text":"Note","width":200},{"datafield":"CreationDate","text":"CreationDate","width":200},{"datafield":"IsDelete","text":"IsDelete","width":200}]
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
                columns: columns_content
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
                    $("#popupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60} });
                    // get the clicked row's data and initialize the input fields.
                    var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                    $("#Id").val(dataRecord.Id);
$("#ProtocolCodeId").val(dataRecord.ProtocolCodeId);
$("#ProjectCodeId").val(dataRecord.ProjectCodeId);
$("#ProjectName").val(dataRecord.ProjectName);
$("#BuyerId").val(dataRecord.BuyerId);
$("#EmployeeId").val(dataRecord.EmployeeId);
$("#Assistant").val(dataRecord.Assistant);
$("#ProjectSourceId").val(dataRecord.ProjectSourceId);
$("#SourcesOfFundingId").val(dataRecord.SourcesOfFundingId);
$("#ProjectTypeId").val(dataRecord.ProjectTypeId);
$("#ManagementStyleId").val(dataRecord.ManagementStyleId);
$("#Package").val(dataRecord.Package);
$("#StateId").val(dataRecord.StateId);
$("#SigningDate").val(dataRecord.SigningDate);
$("#MakeOutDate").val(dataRecord.MakeOutDate);
$("#EntrustMoney").val(dataRecord.EntrustMoney);
$("#WinningMoney").val(dataRecord.WinningMoney);
$("#WinningCompany").val(dataRecord.WinningCompany);
$("#ChargeRate").val(dataRecord.ChargeRate);
$("#Note").val(dataRecord.Note);
$("#CreationDate").val(dataRecord.CreationDate);
$("#IsDelete").val(dataRecord.IsDelete);

                  //********=GET_ROW_DATA START******************//
//                    $("#firstName").val(dataRecord.firstname);
//                    $("#lastName").val(dataRecord.lastname);
//                    $("#product").val(dataRecord.productname);
//                    $("#quantity").jqxNumberInput({ decimal: dataRecord.quantity });
//                    $("#price").jqxNumberInput({ decimal: dataRecord.price });
                  //********GET_ROW_DATA END******************//
                    // show the popup window.
                    $("#popupWindow").jqxWindow('show');
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
            // initialize the popup window and buttons.
            $("#popupWindow").jqxWindow({ width: 250, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01 });
            $("#Cancel").jqxButton({ theme: theme });
            $("#Save").jqxButton({ theme: theme });
            // update the edited row when the user clicks the 'Save' button.
            $("#Save").click(function () {
                if (editrow >= 0) {
                    var row = {Id:$("#Id").val()
,ProtocolCodeId:$("#ProtocolCodeId").val()
,ProjectCodeId:$("#ProjectCodeId").val()
,ProjectName:$("#ProjectName").val()
,BuyerId:$("#BuyerId").val()
,EmployeeId:$("#EmployeeId").val()
,Assistant:$("#Assistant").val()
,ProjectSourceId:$("#ProjectSourceId").val()
,SourcesOfFundingId:$("#SourcesOfFundingId").val()
,ProjectTypeId:$("#ProjectTypeId").val()
,ManagementStyleId:$("#ManagementStyleId").val()
,Package:$("#Package").val()
,StateId:$("#StateId").val()
,SigningDate:$("#SigningDate").val()
,MakeOutDate:$("#MakeOutDate").val()
,EntrustMoney:$("#EntrustMoney").val()
,WinningMoney:$("#WinningMoney").val()
,WinningCompany:$("#WinningCompany").val()
,ChargeRate:$("#ChargeRate").val()
,Note:$("#Note").val()
,CreationDate:$("#CreationDate").val()
,IsDelete:$("#IsDelete").val()
};
                  //******** ROW_CONTENT_SAVE start******************//
//                    { firstname: $("#firstName").val(), lastname: $("#lastName").val(), productname: $("#product").val(),
//                        quantity: parseInt($("#quantity").jqxNumberInput('decimal')), price: parseFloat($("#price").jqxNumberInput('decimal'))
//                    }
                  //********ROW_CONTENT_SAVEEND******************//
                    var rowid = $("#jqxgrid").jqxGrid('getrowid', editrow);
                    $('#jqxgrid').jqxGrid('updaterow', rowid, row);
                    $("#popupWindow").jqxWindow('hide');
                }
            });
        });