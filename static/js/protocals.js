        $(document).ready(function () {
            // prepare the data
            var data = generatedata(25);
           //********AUDO-GENERATED START******************//
            var datafields_content =  
            	[
                                       { name: 'firstname', type: 'string' },
                                       { name: 'lastname', type: 'string' },
                                       { name: 'productname', type: 'string' },
                                       { name: 'quantity', type: 'number' },
                                       { name: 'price', type: 'number' }
                                   ]
          //******** AUDO-GENERATED END******************//
            var source =
            {
                localdata: data,
                datatype: "array",
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
          //********AUDO-GENERATED START******************//
            $("#firstName").addClass('jqx-input');
            $("#lastName").addClass('jqx-input');
            $("#product").addClass('jqx-input');
            $("#firstName").width(150);
            $("#firstName").height(23);
            $("#lastName").width(150);
            $("#lastName").height(23);
            $("#product").width(150);
            $("#product").height(23);
            if (theme.length > 0) {
                $("#firstName").addClass('jqx-input-' + theme);
                $("#lastName").addClass('jqx-input-' + theme);
                $("#product").addClass('jqx-input-' + theme);
            }
            $("#quantity").jqxNumberInput({ width: 150, height: 23,  decimalDigits: 0, spinButtons: true });
            $("#price").jqxNumberInput({symbol: '$', width: 150, height: 23,  spinButtons: true });
          //********AUDO-GENERATED START******************//
            var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            // initialize jqxGrid
            $("#jqxgrid").jqxGrid(
            {
                width: 850,
                source: dataAdapter,
                pageable: true,
                autoheight: true,
                columns: 
                	//******** AUDO-GENERATED START******************//
                	[
                  { text: 'First Name', datafield: 'firstname', width: 200 },
                  { text: 'Last Name', datafield: 'lastname', width: 200 },
                  { text: 'Product', datafield: 'productname', width: 190 },
                  { text: 'Quantity', datafield: 'quantity', width: 90, cellsalign: 'right' },
                  { text: 'Price', datafield: 'price', cellsalign: 'right', cellsformat: 'c2' }
                ]
                   //******** AUDO-GENERATED END******************//
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
                  //******** AUDO-GENERATED START******************//
                    $("#firstName").val(dataRecord.firstname);
                    $("#lastName").val(dataRecord.lastname);
                    $("#product").val(dataRecord.productname);
                    $("#quantity").jqxNumberInput({ decimal: dataRecord.quantity });
                    $("#price").jqxNumberInput({ decimal: dataRecord.price });
                  //******** AUDO-GENERATED END******************//
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
                	//******** AUDO-GENERATED start******************//
                    var row = { firstname: $("#firstName").val(), lastname: $("#lastName").val(), productname: $("#product").val(),
                        quantity: parseInt($("#quantity").jqxNumberInput('decimal')), price: parseFloat($("#price").jqxNumberInput('decimal'))
                    };
                  //******** AUDO-GENERATED END******************//
                    var rowid = $("#jqxgrid").jqxGrid('getrowid', editrow);
                    $('#jqxgrid').jqxGrid('updaterow', rowid, row);
                    $("#popupWindow").jqxWindow('hide');
                }
            });
        });