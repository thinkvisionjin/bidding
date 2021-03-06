


function BindProtocolNumber(documentObject,localdata,project){
	
	if (localdata == undefined) {
		var source = {
			datatype: "json",
	        datafields: [
	            { name: 'ProtocolNumber' },
	        ],
	        url: "/bidding/default/select?table=ProtocolCode",
	        async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
	            { name: 'ProtocolNumber' },
	        ],
			localdata: localdata
		}
	}
	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
			if (project != undefined) {
				
			}
			$(documentObject).on('select', function (event) {
				var args = event.args;
			});
        }
    });
	$(documentObject).jqxInput(
		{
			source: dataAdapter, 
			displayMember: "ProtocolNumber", 
			width: '200', height: '23'
		});
}


function BindProtocolNumberWithID(documentObject,localdata,project){
	
	if (localdata == undefined) {
		var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },    
	            { name: 'ProtocolNumber' },
	        ],
	        url: "/bidding/default/select?table=ProtocolCode",
	        async: true
		}
	} else {
		
		var source = {
			datatype: "json",
			datafields: [
			    {name: 'Id' }, 
	            {name: 'ProtocolNumber' },
	        ],
			localdata: localdata
		}
	}
	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
            if (project != undefined) {
				var items = $(documentObject).jqxDropDownList('getItems');
				var item = $(documentObject).jqxDropDownList('getItemByValue', project.Id);
				$(documentObject).jqxDropDownList('selectItem', item);
			}
			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter, 
			valueMember: "Id",
			displayMember: "ProtocolNumber", 
			width: '200', height: '23',
			filterable: true, filterPlaceHolder:'', searchMode:'containsignorecase'
		});
}


function BindProtocolType(documentObject,localdata,project){
	
	if (localdata == undefined) {
		var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'TypeName' },
	            { name: 'TypeId' }
	        ],
	        url: "/bidding/default/select?table=ProtocolCodeType",
	        async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
	            { name: 'Id' },
	            { name: 'TypeName' },
	            { name: 'TypeId' }
	        ],
			localdata: localdata
		}
	}
	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
			if (project != undefined) {
				var items = $(documentObject).jqxDropDownList('getItems');
				var item = $(documentObject).jqxDropDownList('getItemByValue', project.Id);
				$(documentObject).jqxDropDownList('selectItem', item);
			}
			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "TypeName",
			valueMember: "TypeId",
			width: '200', height: '25'
		});
}


function BindProjectNameOnly(documentObject, localdata, project){
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'ProjectName' }
			],
			url: "/bidding/default/select?table=Project",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'ProjectName' }
			],
			localdata: localdata
		}
	}
	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
			if (project != undefined) {
				var items = $(documentObject).jqxDropDownList('getItems');
				var item = $(documentObject).jqxDropDownList('getItemByValue', project.Id);
				$(documentObject).jqxDropDownList('selectItem', item);
			}
			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxInput(
		{
			source: dataAdapter,
			displayMember: "ProjectName",
			width: '200', height: '25'
		});
}

function BindProjectName(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'ProjectCode' },
				{ name: 'ProjectName' }
			],
			url: "/bidding/default/select?table=Project",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'ProjectCode' },
				{ name: 'ProjectName' }
			],
			localdata: localdata
		}
	}
	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
			if (project != undefined) {
				var items = $(documentObject).jqxDropDownList('getItems');
				var item = $(documentObject).jqxDropDownList('getItemByValue', project.Id);
				$(documentObject).jqxDropDownList('selectItem', item);
			}
			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxInput(
		{
			source: dataAdapter,
			displayMember: "ProjectName",
			valueMember: "Id",
			width: '200', height: '25'
		});
}

//绑定项目类型 //dropdownlist
function BindProjectType(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'ProjectTypeName' },
				{ name: 'ProjectTypeId' },
				{ name: 'Id' },
			],
			url: "/bidding/default/select?table=ProjectType",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'ProjectTypeName' },
				{ name: 'ProjectTypeId' },
			],
			localdata: localdata
		}
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "ProjectTypeName",
			valueMember: "ProjectTypeId",
			width: '200', height: '25'
		});
	if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.ProjectTypeId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

//绑定管理类型//dropdownlist
function BindProjectProperty(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'ProjectPropertyId' },
				{ name: 'ProjectPropertyCode' },
				{ name: 'ProjectPropertyName' },
			],
			url: "/bidding/default/select?table=ProjectProperty",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'ProjectPropertyId' },
				{ name: 'ProjectPropertyCode' },
				{ name: 'ProjectPropertyName' },
			],
			localdata: localdata
		}
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "ProjectPropertyName",
			valueMember: "ProjectPropertyId",
			width: '200', height: '25'
		});
	$(documentObject).on('select', function (event) {
		var args = event.args;
		var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
	if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.ProjectPropertyId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

//绑定采购类型//dropdownlist
function BindPurchaseStyle(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'PurchaseStyleId' },
				{ name: 'PurchaseStyleCode' },
				{ name: 'PurchaseStyleName' },
			],
			url: "/bidding/default/select?table=PurchaseStyle",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'PurchaseStyleId' },
				{ name: 'PurchaseStyleCode' },
				{ name: 'PurchaseStyleName' },
			],
			localdata: localdata
		}
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "PurchaseStyleName",
			valueMember: "PurchaseStyleId",
			width: '200', height: '25'
		});
	$(documentObject).on('select', function (event) {
		var args = event.args;
		var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
	if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.PurchaseStyleId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

//绑定采购单位//dropdownlist
function BindCustomer(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'dwmc' },
			],
			url: "/bidding/default/select?table=kh",
			async: false
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'dwmc' },
			],
			localdata: localdata
		}
	}
	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				
			});
        }
    });
	/*$(documentObject).jqxComboBox(
		{
			searchMode: 'contains',
			source: dataAdapter,
			displayMember: "dwmc",
			valueMember: "Id",
			width: '200', height: '25'
		});*/
	$(documentObject).jqxComboBox(
		{
			source: dataAdapter,
			displayMember: "dwmc",
			valueMember: "Id",
			width: '200', height: '25',
			searchMode: 'contains',
			autoComplete: true
		});	
	$(documentObject).on('select', function (event) {
		// var args = event.args;
		// var item = $(documentObject).jqxComboBox('getItem', args.index);
	});
	if (project != undefined) {
		var items = $(documentObject).jqxComboBox('getItems');
		var item = $(documentObject).jqxComboBox('getItemByValue', project.CustomerId);
		$(documentObject).jqxComboBox('selectItem', item);
	}
}


//绑定项目来源//dropdownlist
function BindProjectSource(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			url: "/bidding/default/select?table=ProjectSource",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			localdata: localdata
		}
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "Name",
			valueMember: "Id",
			width: '200', height: '25'
		});
	//	selectedIndex:0
	$(documentObject).on('select', function (event) {
		var args = event.args;
		var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
	if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.ProjectSourceId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

//绑定项目资金来源//dropdownlist
function BindFundingSource(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			url: "/bidding/default/select?table=FundingSource",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			localdata: localdata
		}
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "Name",
			valueMember: "Id",
			width: '200', height: '25'
		});
	$(documentObject).on('select', function (event) {
		var args = event.args;
		var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
	if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.FundingSourceId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

//绑定员工(项目负责人和项目协助人)//dropdownlist
function BindEmployee(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source =
			{
				datatype: "json",
				datafields: [
					{ name: 'Name' },
					{ name: 'Id' }
				],
				url: "/bidding/default/select?table=Employee",
				async: true
			};
	} else {
		var source =
			{
				datatype: "json",
				datafields: [
					{ name: 'Name' },
					{ name: 'Id' }
				],
				localdata: localdata
			};
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });

    $(documentObject).jqxDropDownList({
		//    	checkboxes: multiSelect,
		source: dataAdapter,
		displayMember: "Name",
		valueMember: "Id", width: 200, height: 25
	});
    $(documentObject).on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
    if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.EmployeeId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

function BindAssitant(documentObject, localdata, project) {
	if (localdata == undefined) {
		var source =
			{
				datatype: "json",
				datafields: [
					{ name: 'Name' },
					{ name: 'Id' }
				],
				url: "/bidding/default/select?table=Employee",
				async: true
			};
	} else {
		var source =
			{
				datatype: "json",
				datafields: [
					{ name: 'Name' },
					{ name: 'Id' }
				],
				localdata: localdata
			};
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });

    $(documentObject).jqxDropDownList({
		//    	checkboxes: multiSelect,
		source: dataAdapter,
		displayMember: "Name",
		valueMember: "Id", width: 200, height: 25
	});
    $(documentObject).on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
    if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.Assistant);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

//绑定项目状态 //dropdownlist
function BindProjectStatus(documentObject, localdata, project,defaultIndex) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			url: "/bidding/default/select?table=ProjectStatus",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			localdata: localdata
		}
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "Name",
			valueMember: "Id",
			width: '200', height: '25',
		});
	
	if(defaultIndex!=undefined){
		$(documentObject).jqxDropDownList({selectedIndex: defaultIndex})
	}
	
	
	$(documentObject).on('select', function (event) {
		var args = event.args;
		var item = $(documentObject).jqxDropDownList('getItem', args.index);
		if($("#navBar4")!=undefined){
			autosetStatusBar(item.value)
		}
	});
	if (project != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', project.ProjectStatusId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

//绑定包件状态
function BindPackageStatus(documentObject, localdata, projectpackage,defaultIndex) {
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			url: "/bidding/default/select?table=ProjectStatus",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'Name' }
			],
			localdata: localdata
		}
	}

	var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;

			$(documentObject).on('select', function (event) {
				var args = event.args;
				var item = $(documentObject).jqxDropDownList('getItem', args.index);
			});
        }
    });
	$(documentObject).jqxDropDownList(
		{
			source: dataAdapter,
			displayMember: "Name",
			valueMember: "Id",
			width: '200', height: '25',
		});
	
	if(defaultIndex!=undefined){
		$(documentObject).jqxDropDownList({selectedIndex: defaultIndex})
	}
	
	
	$(documentObject).on('select', function (event) {
		var args = event.args;
		var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
	if (projectpackage != undefined) {
		var items = $(documentObject).jqxDropDownList('getItems');
		var item = $(documentObject).jqxDropDownList('getItemByValue', projectpackage.StateId);
		$(documentObject).jqxDropDownList('selectItem', item);
	}
}

function BindContactor(documentObjectName, documentObjectTel,documentObjectCustomer,localdata){
	
	if (localdata == undefined) {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'khId' },
				{ name: 'lxr' },
				{ name: 'sj' }
			],
			url: "/bidding/default/select?table=lxr",
			async: true
		}
	} else {
		var source = {
			datatype: "json",
			datafields: [
				{ name: 'Id' },
				{ name: 'khId' },
				{ name: 'lxr' },
				{ name: 'sj' }
			],
			localdata: localdata
		}
	}
	var dataAdapterName = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapterName.records;
            var length = records.length;
			$(documentObjectName).on('select', function (event) {
				var args = event.args;
				var item = $(documentObjectName).jqxDropDownList('getItem', args.index);
			});
        }
    });
	var dataAdapterTel= new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            // get data records.
            var records = dataAdapterTel.records;
            var length = records.length;
			$(documentObjectTel).on('select', function (event) {
				var args = event.args;
				var item = $(documentObjectTel).jqxDropDownList('getItem', args.index);
			});
        }
    });
	
	$(documentObjectName).jqxComboBox(
		{
			source: dataAdapterName,
			displayMember: "lxr",
			valueMember: "Id",
			width: '200', height: '25',
			searchMode: 'contains',
			autoComplete: true
		});
	$(documentObjectTel).jqxComboBox(
			{
				source: dataAdapterTel,
				displayMember: "sj",
				valueMember: "Id",
				width: '200', height: '25',
				searchMode: 'contains',
				autoComplete: true				
			});
	$(documentObjectName).on('select', function (event) {
		var args = event.args;
		var item = $(documentObjectName).jqxDropDownList('getItem', args.index);
		$(documentObjectTel).jqxComboBox('selectIndex', args.index);
	});
	$(documentObjectTel).on('select', function (event) {
		var args = event.args;
		var item = $(documentObjectTel).jqxDropDownList('getItem', args.index);
		$(documentObjectName).jqxComboBox('selectIndex', args.index);
	});
}


// function getselectindex(documentObjectName){
// 	return $(documentObjectName).jqxGrid('getselectedcell')==null?-1:$('#jqxgrid').jqxGrid('getselectedcell').rowindex
// }

function getselectindex(documentObjectName){
	// var cells = $(documentObjectName).jqxGrid('getselectedcells')
	// if (cells.length != 1)
	// {
	// 	return -1
	// }
	// else
	// {
	// 	return cells[0].rowindex
	// }
	return $(documentObjectName).jqxGrid('getselectedrowindex');
}