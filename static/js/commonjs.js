var Global_ProjectType  = new Array();

function isObjectEmpty(obj){   
	for (var name in obj){ 

		return false;
	}
		return true;
};

//绑定项目名称 //input
function BindProjectName(documentObject,project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'ProjectCodeId' },
	            { name: 'ProjectName' }
	        ],
	        url: "/bidding/default/select?table=Project",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.Id);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxInput(
			{ source: dataAdapter, 
				displayMember: "ProjectName", 
				valueMember: "Id",
				 width: '200', height: '25'});
}

//绑定项目类型 //dropdownlist
function BindProjectType(documentObject,project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'ProjectTypeName' },
	            { name: 'ProjectTypeID' },
	            { name: 'ProjectTypeCode' },
	        ],
	        url: "/bidding/default/select?table=ProjectType",
	        async: true
	}
	
	
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.ProjectTypeId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "ProjectTypeName", 
				valueMember: "ProjectTypeID",
				 width: '200', height: '25'});
	
}

//绑定管理类型//dropdownlist
function BindManagementStyle(documentObject,project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'ManagementStyleId' },
	            { name: 'ManagementStyleCode' },
	            { name: 'ManagementStyleName' },
	        ],
	        url: "/bidding/default/select?table=ManagementStyle",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.ManagementStyleId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "ManagementStyleName", 
				valueMember: "ManagementStyleId",
				 width: '200', height: '25'});
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

//绑定采购类型//dropdownlist
function BindPurchaseStyle(documentObject,project){
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
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.PurchaseStyleId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "PurchaseStyleName", 
				valueMember: "PurchaseStyleId",
				 width: '200', height: '25'});
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

//绑定采购单位//dropdownlist
function BindCustomer(documentObject,project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Type' },
	            { name: 'UserName'},
	        ],
	        url: "/bidding/default/select?table=Customer",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.BuyerId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "UserName", 
				valueMember: "Id",
				 width: '200', height: '25'});
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

//绑定项目来源//dropdownlist
function BindProjectSource(documentObject,project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Name' }
	        ],
	        url: "/bidding/default/select?table=ProjectResource",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.ProjectSourceId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				width: '200', height: '25'});
//	selectedIndex:0
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

//绑定项目资金来源//dropdownlist
function BindFundingSource(documentObject,project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Name' }
	        ],
	        url: "/bidding/default/select?table=MoneyType",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.SourcesOfFundingId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				width: '200', height: '25'});
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

//绑定员工(项目负责人和项目协助人)//dropdownlist
function BindEmployee(documentObject,project){
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
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.EmployeeId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
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
    	valueMember: "Id", width: 200, height: 25    	});
    $(documentObject).on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
}

//绑定项目状态 //dropdownlist
function BindProjectStatus(documentObject,project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Name' }
	        ],
	        url: "/bidding/default/select?table=ProjectStatus",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
        	if (project != undefined ){
        		var items = $(documentObject).jqxDropDownList('getItems'); 
             	var item = $(documentObject).jqxDropDownList('getItemByValue', project.StateId);
             	$(documentObject).jqxDropDownList('selectItem', item ); 
        	}
        	$(documentObject).on('select', function (event) {
        	    var args = event.args;
        	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
        	});
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				 width: '200', height: '25'});
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

function getAllCommonData(){
	
}

function findDataFieldContentByValue(){
	
}
