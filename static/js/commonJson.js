
//协议编号
function  ProtocolNumber_SEARCH(){
	var ProtocolNumber_SEARCHsource =
    {
        datatype: "json",
        datafields: [
            { name: 'ProtocolNumber' },
            { name: 'Id' }
        ],
        url: "/bidding/default/select?table=ProtocolCode",
        async: true
    };
    var ProtocolNumber_SEARCHdataAdapter = new $.jqx.dataAdapter(ProtocolNumber_SEARCHsource);
                
    $("#ProtocolNumber_SEARCH").jqxInput({ 
    	source: ProtocolNumber_SEARCHdataAdapter, 
    	displayMember: "ProtocolNumber", 
    	valueMember: "Id", width: 200, height: 25});
    $("#ProtocolNumber_SEARCH").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
}

//项目编号
function ProjectNumber_SEARCH(){
    var ProjectNumber_SEARCHsource =
    {
        datatype: "json",
        datafields: [
            { name: 'ProjectNumber' },
            { name: 'Id' }
        ],
        url: "/bidding/default/select?table=ProjectCode",
        async: true
    };
    var ProjectNumber_SEARCHdataAdapter = new $.jqx.dataAdapter(ProjectNumber_SEARCHsource);
                
    $("#ProjectNumber_SEARCH").jqxInput({ 
    	source: ProjectNumber_SEARCHdataAdapter, 
    	displayMember: "ProjectNumber", 
    	valueMember: "Id", width: 200, height: 25});
    $("#ProjectNumber_SEARCH").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
}

//协议类型
function ProtocolType_SEARCH(){
	var protocolCodeTypesource = {
			datatype: "json",
	        datafields: [
	            { name: 'TypeId' },
	            { name: 'TypeName' },
	            { name: 'TypeCode' }
	        ],
	        url: "/bidding/default/select?table=ProtocolCodeType",
	        async: true
	}
	var protocolCodeTypedataAdapter = new $.jqx.dataAdapter(protocolCodeTypesource);
	$("#TypeId_SEARCH").jqxDropDownList(
			{ source: protocolCodeTypedataAdapter, 
				displayMember: "TypeName", 
				valueMember: "TypeId",
				selectedIndex: 0, width: '200', height: '25'});
	$('#TypeId_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#TypeId_SEARCH').jqxDropDownList('getItem', args.index);
	});
}

//员工姓名
function EmployeeId_SEARCH(){
	 var EmployeeId_SEARCHsource =
     {
         datatype: "json",
         datafields: [
             { name: 'Name' },
             { name: 'Id' }
         ],
         url: "/bidding/default/select?table=Employee",
         async: true
     };
     var EmployeeId_SEARCHdataAdapter = new $.jqx.dataAdapter(EmployeeId_SEARCHsource);
                 
     $("#EmployeeId_SEARCH").jqxInput({ 
     	source: EmployeeId_SEARCHdataAdapter, 
     	displayMember: "Name", 
     	valueMember: "Id", width: 200, height: 25});
     $("#EmployeeId_SEARCH").on('select', function (event) {
         if (event.args) {
             var item = event.args.item;
             if (item) {
             }
         }
     });
}

//项目类型
function ProjectTypeId_SEARCH(){
	var ProjectTypeId_SEARCHsource =
    {
        datatype: "json",
        datafields: [
            { name: 'Id' },
            { name: 'ProjectTypeID' },
            { name: 'ProjectTypeCode' },
            { name: 'ProjectTypeName' }
        ],
        url: "/bidding/default/select?table=ProjectType",
        async: true
    };
    var ProjectTypeId_SEARCHdataAdapter = new $.jqx.dataAdapter(ProjectTypeId_SEARCHsource);
                
    $("#ProjectTypeId_SEARCH").jqxDropDownList({ 
    	source: ProjectTypeId_SEARCHdataAdapter, 
    	displayMember: "ProjectTypeName", 
    	valueMember: "ProjectTypeId", 
    	selectedIndex: 0, width: '200', height: '25'});
    $("#ProjectTypeId_SEARCH").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
}

//Option1 管理类型
function ManagementStyle_SEARCH(){
	var managementStylesource = {
			datatype: "json",
	        datafields: [
	            { name: 'ManagementStyleId' },
	            { name: 'ManagementStyleCode' },
	            { name: 'ManagementStyleName' },
	        ],
	        url: "/bidding/default/select?table=ManagementStyle",
	        async: true
	}
	var managementStyledataAdapter = new $.jqx.dataAdapter(managementStylesource);
	$("#ManagementStyle_SEARCH").jqxDropDownList(
			{ source: managementStyledataAdapter, 
				displayMember: "ManagementStyleName", 
				valueMember: "ManagementStyleId",
				selectedIndex: 0, width: '200', height: '23'});
	$('#ManagementStyle_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ManagementStyle_SEARCH').jqxDropDownList('getItem', args.index);
	});
}
//Option2 采购类型
function PurchaseStyle_SEARCH(){
	var purchaseStylesource = {
			datatype: "json",
	        datafields: [
	            { name: 'PurchaseStyleId' },
	            { name: 'PurchaseStyleCode' },
	            { name: 'PurchaseStyleName' },
	        ],
	        url: "/bidding/default/select?table=PurchaseStyle",
	        async: true
	}
	var purchaseStyledataAdapter = new $.jqx.dataAdapter(purchaseStylesource);
	$("#PurchaseStyle_SEARCH").jqxDropDownList(
			{ source: purchaseStyledataAdapter, 
				displayMember: "PurchaseStyleName", 
				valueMember: "PurchaseStyleId",
				selectedIndex: 0, width: '200', height: '23'});
	$('#PurchaseStyle_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#PurchaseStyle_SEARCH').jqxDropDownList('getItem', args.index);
	});
}
//Option3 操作类型
function OperationType_SEARCH(){
	var operationTypesource = {
			datatype: "json",
	        datafields: [
	            { name: 'OperationTypeId' },
	            { name: 'OperationTypeCode' },
	            { name: 'OperationTypeName' },
	        ],
	        url: "/bidding/default/select?table=OperationType",
	        async: true
	}
	var operationTypedataAdapter = new $.jqx.dataAdapter(operationTypesource);
	$("#OperationType_SEARCH").jqxDropDownList(
			{ source: operationTypedataAdapter, 
				displayMember: "OperationTypeName", 
				valueMember: "OperationTypeId",
				selectedIndex: 0, width: '200', height: '23'});
	$('#OperationType_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#OperationType_SEARCH').jqxDropDownList('getItem', args.index);
	});
}


function ProjectName_SEARCH(){
	
}


/**********For 新增************/
//协议类型
function ProtocolType_ADD(){
	var protocolCodeTypesource = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'TypeName' },
	            { name: 'TypeId' }
	        ],
	        url: "/bidding/default/select?table=ProtocolCodeType",
	        async: true
	}
	var protocolCodeTypedataAdapter = new $.jqx.dataAdapter(protocolCodeTypesource);
	$("#TypeId_ADD").jqxDropDownList(
			{ source: protocolCodeTypedataAdapter, 
				displayMember: "TypeName", 
				valueMember: "TypeId",
				selectedIndex: 0, width: '200', height: '23'});
	$('#TypeId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#TypeId_ADD').jqxDropDownList('getItem', args.index);
	    if (item != null) {
	    	var prefix = 'SPMCEC-16'
	    	prefix = prefix+item.value+'0001'
	    	$('#ProtocolNumber_ADD').val(prefix)
	    }
	});
}

//协议编号
function ProtocolNumber_ADD(){
	var protocolNumbersource = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'ProtocolNumber' },
	        ],
	        url: "/bidding/default/select?table=ProtocolCode",
	        async: true
	}
	var protocolNumberdataAdapter = new $.jqx.dataAdapter(protocolNumbersource);
	$("#ProtocolNumber_ADD").jqxDropDownList(
			{ source: protocolNumberdataAdapter, 
				displayMember: "ProtocolNumber", 
				valueMember: "Id",
				selectedIndex: 0, width: '150', height: '23'});
	$('#ProtocolNumber_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ProtocolNumber_ADD').jqxDropDownList('getItem', args.index);
	});
}
//协议编号2
function ProtocolCodeId_ADD(){
	var protocolNumbersource = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'ProtocolNumber' },
	        ],
	        url: "/bidding/default/select?table=ProtocolCode",
	        async: true
	}
	var protocolNumberdataAdapter = new $.jqx.dataAdapter(protocolNumbersource);
	$("#ProtocolCodeId_ADD").jqxDropDownList(
			{ source: protocolNumberdataAdapter, 
				displayMember: "ProtocolNumber", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '23'});
	$('#ProtocolCodeId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ProtocolCodeId_ADD').jqxDropDownList('getItem', args.index);
	});
}

//项目类型
function ProjectType_ADD(){
	var projectTypesource = {
			datatype: "json",
	        datafields: [
	            { name: 'ProjectTypeName' },
	            { name: 'ProjectTypeID' },
	            { name: 'ProjectTypeCode' },
	        ],
	        url: "/bidding/default/select?table=ProjectType",
	        async: true
	}
	var projectTypedataAdapter = new $.jqx.dataAdapter(projectTypesource);
	$("#ProjectType_ADD").jqxDropDownList(
			{ source: projectTypedataAdapter, 
				displayMember: "ProjectTypeName", 
				valueMember: "ProjectTypeID",
				selectedIndex: 0, width: '150', height: '23'});
	$('#ProjectType_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ProjectType_ADD').jqxDropDownList('getItem', args.index);
	    if(item.value=='0'){
	    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
	    	$(".SELCTION").hide()
	    	$(".FZC").show()
	    }
	    if(item.value=='1'){
	    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
	    	$(".SELCTION").hide()
	    	$(".ZC").show()
	    }
	    if(item.value=='3'){
	    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
	    	$(".SELCTION").hide()
	    	$(".SM").show()
	    }
	    if(item.value=='4'){
	    	$('#BiddingSiteStatisticType_ADD').jqxDropDownList('ensureVisible', 0)
	    	$(".SELCTION").hide()
	    	$(".GJ").show()
	    }
	});
}

// 管理类型
function ManagementStyle_ADD(){
	var managementStylesource = {
			datatype: "json",
	        datafields: [
	            { name: 'ManagementStyleId' },
	            { name: 'ManagementStyleCode' },
	            { name: 'ManagementStyleName' },
	        ],
	        url: "/bidding/default/select?table=ManagementStyle",
	        async: true
	}
	var managementStyledataAdapter = new $.jqx.dataAdapter(managementStylesource);
	$("#ManagementStyle_ADD").jqxDropDownList(
			{ source: managementStyledataAdapter, 
				displayMember: "ManagementStyleName", 
				valueMember: "ManagementStyleId",
				selectedIndex: 0, width: '150', height: '23'});
	$('#ManagementStyle_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ManagementStyle_ADD').jqxDropDownList('getItem', args.index);
	});
}

// 采购类型
function PurchaseStyle_ADD(){
	var purchaseStylesource = {
			datatype: "json",
	        datafields: [
	            { name: 'PurchaseStyleId' },
	            { name: 'PurchaseStyleCode' },
	            { name: 'PurchaseStyleName' },
	        ],
	        url: "/bidding/default/select?table=PurchaseStyle",
	        async: true
	}
	var purchaseStyledataAdapter = new $.jqx.dataAdapter(purchaseStylesource);
	$("#PurchaseStyle_ADD").jqxDropDownList(
			{ source: purchaseStyledataAdapter, 
				displayMember: "PurchaseStyleName", 
				valueMember: "PurchaseStyleId",
				selectedIndex: 0, width: '150', height: '23'});
	$('#PurchaseStyle_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#PurchaseStyle_ADD').jqxDropDownList('getItem', args.index);
	});
}

//招标网统计类型
function BiddingSiteStatisticType_ADD(){
	var biddingSiteStatisticTypesource = {
			datatype: "json",
	        datafields: [
	            { name: 'BiddingSiteStatisticTypeName' },
	            { name: 'BiddingSiteStatisticTypeCode' },
	            { name: 'BiddingSiteStatisticTypeName' },
	        ],
	        url: "/bidding/default/select?table=BiddingSiteStatisticType",
	        async: true
	}
	var biddingSiteStatisticTypedataAdapter = new $.jqx.dataAdapter(biddingSiteStatisticTypesource);
	$("#BiddingSiteStatisticType_ADD").jqxDropDownList(
			{ source: biddingSiteStatisticTypedataAdapter, 
				displayMember: "BiddingSiteStatisticTypeName", 
				valueMember: "BiddingSiteStatisticTypeName",
				selectedIndex: 0, width: '150', height: '23'});
	$('#BiddingSiteStatisticType_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#BiddingSiteStatisticType_ADD').jqxDropDownList('getItem', args.index);
	});
}

//招标次数
function BiddingCountType_ADD(){
	var biddingCountTypesource = {
			datatype: "json",
	        datafields: [
	            { name: 'BiddingCountTypeId' },
	            { name: 'BiddingCountTypeCode' },
	            { name: 'BiddingCountTypeName' },
	        ],
	        url: "/bidding/default/select?table=BiddingCountType",
	        async: true
	}
	var biddingCountTypedataAdapter = new $.jqx.dataAdapter(biddingCountTypesource);
	$("#BiddingCountType_ADD").jqxDropDownList(
			{ source: biddingCountTypedataAdapter, 
				displayMember: "BiddingCountTypeName", 
				valueMember: "BiddingCountTypeId",
				selectedIndex: 0, width: '150', height: '23'});
	$('#BiddingCountType_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#BiddingCountType_ADD').jqxDropDownList('getItem', args.index);
	});
}

//操作类型
function OperationType_ADD(){
	var operationTypesource = {
			datatype: "json",
	        datafields: [
	            { name: 'OperationTypeId' },
	            { name: 'OperationTypeCode' },
	            { name: 'OperationTypeName' },
	        ],
	        url: "/bidding/default/select?table=OperationType",
	        async: true
	}
	var operationTypedataAdapter = new $.jqx.dataAdapter(operationTypesource);
	$("#OperationType_ADD").jqxDropDownList(
			{ source: operationTypedataAdapter, 
				displayMember: "OperationTypeName", 
				valueMember: "OperationTypeId",
				selectedIndex: 0, width: '150', height: '23'});
	$('#OperationType_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#OperationType_ADD').jqxDropDownList('getItem', args.index);
	});
}