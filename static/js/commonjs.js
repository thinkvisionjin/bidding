var Global_ProjectType  = new Array();

function isObjectEmpty(obj){   
	for (var name in obj){ 

		return false;
	}
		return true;
};

//绑定项目名称 //input
function BindProjectName(documentObject){
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
	var dataAdapter = new $.jqx.dataAdapter(source);
	$(documentObject).jqxInput(
			{ source: dataAdapter, 
				displayMember: "ProjectName", 
				valueMember: "Id",
				 width: '200', height: '25'});
}

//绑定项目类型 //dropdownlist
function BindProjectType(documentObject){
	if(Global_ProjectType.length==0){
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
	}else{
		var source = {
				datatype: "json",
		        datafields: [
		            { name: 'ProjectTypeName' },
		            { name: 'ProjectTypeID' },
		            { name: 'ProjectTypeCode' },
		        ],
		        localdata:Global_ProjectType
		}
	}
	
	
	var dataAdapter = new $.jqx.dataAdapter(source,{
        loadComplete: function () {
            // get data records.
            var records = dataAdapter.records;
            var length = records.length;
            for(i=0;i<length;i++){
            	Global_ProjectType.push( records[i])
            }
        }
    });
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "ProjectTypeName", 
				valueMember: "ProjectTypeID",
				 width: '200', height: '25'});
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

//绑定管理类型//dropdownlist
function BindManagementStyle(documentObject){
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
	var dataAdapter = new $.jqx.dataAdapter(source);
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "ManagementStyleName", 
				valueMember: "ManagementStyleId",
				 width: '150', height: '23'});
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

//绑定采购类型//dropdownlist
function BindPurchaseStyle(documentObject){
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
	var dataAdapter = new $.jqx.dataAdapter(source);
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
function BindCustomer(documentObject){
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
	var dataAdapter = new $.jqx.dataAdapter(source);
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
function BindProjectSource(documentObject){
	var ProjectSourceIdsource = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Name' }
	        ],
	        url: "/bidding/default/select?table=ProjectResource",
	        async: true
	}
	var ProjectSourceIddataAdapter = new $.jqx.dataAdapter(ProjectSourceIdsource);
	$(documentObject).jqxDropDownList(
			{ source: ProjectSourceIddataAdapter, 
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
function BindFundingSource(documentObject){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Name' }
	        ],
	        url: "/bidding/default/select?table=MoneyType",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
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
function BindEmployee(documentObject,multiSelect){
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
    var dataAdapter = new $.jqx.dataAdapter(source);
                
    $(documentObject).jqxDropDownList({ 
    	checkboxes: multiSelect,
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
function BindProjectStatus(documentObject,global_project){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Name' }
	        ],
	        url: "/bidding/default/select?table=ProjectStatus",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	$(documentObject).jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				 width: '200', height: '25'});
	if (global_project != undefined ){
		var v1 = $(documentObject).jqxDropDownList('val')
		$(documentObject).jqxDropDownList('val',global_project.StateId);
		var v2 = $(documentObject).jqxDropDownList('val')
		var v3 = global_project.StateId
	}
	$(documentObject).on('select', function (event) {
	    var args = event.args;
	    var item = $(documentObject).jqxDropDownList('getItem', args.index);
	});
}

function getAllCommonData(){
	
}

function findDataFieldContentByValue(){
	
}
