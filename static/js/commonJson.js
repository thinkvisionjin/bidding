
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
	$("#ManagementStyle_SEARCH").jqxDropDownList(
			{ source: dataAdapter, 
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

//项目名称
function ProjectName_SEARCH(){
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
	$("#ProjectName_SEARCH").jqxInput(
			{ source: dataAdapter, 
				displayMember: "ProjectName", 
				valueMember: "Id",
				 width: '200', height: '25'});
	$('#ProjectName_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ProjectName_SEARCH').jqxDropDownList('getItem', args.index);
	});
}

//招标单位
function BuyerId_SEARCH(){
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
	$("#BuyerId_SEARCH").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "UserName", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#BuyerId_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#BuyerId_SEARCH').jqxDropDownList('getItem', args.index);
	});
}

//项目来源
function ProjectSourceId_SEARCH(){
	var source = {
			datatype: "json",
	        datafields: [
	            { name: 'Id' },
	            { name: 'Name' }
	        ],
	        url: "/bidding/default/select?table=ProjectResource",
	        async: true
	}
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#ProjectSourceId_SEARCH").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#ProjectSourceId_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ProjectSourceId_SEARCH').jqxDropDownList('getItem', args.index);
	});
}

//资金来源
function SourcesOfFundingId_SEARCH(){
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
	$("#SourcesOfFundingId_SEARCH").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#SourcesOfFundingId_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#SourcesOfFundingId_SEARCH').jqxDropDownList('getItem', args.index);
	});
}

//助手姓名
function Assistant_SEARCH(){
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
                
    $("#Assistant_SEARCH").jqxInput({ 
    	source: dataAdapter, 
    	displayMember: "Name", 
    	valueMember: "Id", width: 200, height: 25,
    	});
    $("#Assistant_SEARCH").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
}

//管理类型2
function ManagementStyleId_SEARCH(){
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
	$("#ManagementStyleId_SEARCH").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "ManagementStyleName", 
				valueMember: "ManagementStyleId",
				selectedIndex: 0, width: '200', height: '23'});
	$('#ManagementStyleId_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ManagementStyleId_SEARCH').jqxDropDownList('getItem', args.index);
	});
}

//项目状态
function StateId_SEARCH(){
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
	$("#StateId_SEARCH").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#StateId_SEARCH').on('select', function (event) {
	    var args = event.args;
	    var item = $('#StateId_SEARCH').jqxDropDownList('getItem', args.index);
	});
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
				selectedIndex: -1, width: '150', height: '23'});
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

//项目编号
function ProjectCodeId_ADD(){
	 var ProjectCodeId_ADDsource =
	    {
	        datatype: "json",
	        datafields: [
	            { name: 'ProjectNumber' },
	            { name: 'Id' }
	        ],
	        url: "/bidding/default/select?table=ProjectCode",
	        async: true
	    };
	    var ProjectCodeId_ADDdataAdapter = new $.jqx.dataAdapter(ProjectCodeId_ADDsource);
	                
	    $("#ProjectCodeId_ADD").jqxDropDownList({ 
	    	source: ProjectCodeId_ADDdataAdapter, 
	    	displayMember: "ProjectNumber", 
	    	selectedIndex: 0,
	    	valueMember: "Id", width: 200, height: 25});
	    $("#ProjectCodeId_ADD").on('select', function (event) {
	        if (event.args) {
	            var item = event.args.item;
	            if (item) {
	            	
	            }
	        }
	    });
}



//采购单位
function BuyerId_ADD(){
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
	$("#BuyerId_ADD").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "UserName", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#BuyerId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#BuyerId_ADD').jqxDropDownList('getItem', args.index);
	});
}

//所有者-员工姓名
function EmployeeId_ADD(){
	var EmployeeId_ADDsource =
    {
        datatype: "json",
        datafields: [
            { name: 'Name' },
            { name: 'Id' }
        ],
        url: "/bidding/default/select?table=Employee",
        async: true
    };
    var EmployeeId_ADDdataAdapter = new $.jqx.dataAdapter(EmployeeId_ADDsource);
                
    $("#EmployeeId_ADD").jqxDropDownList({ 
    	source: EmployeeId_ADDdataAdapter, 
    	displayMember: "Name", 
    	valueMember: "Id", width: 200, height: 25,
    	selectedIndex: 0});
    $("#EmployeeId_ADD").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
    });
}

//助手-员工姓名
function Assistant_ADD(){
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
                
    $("#Assistant_ADD").jqxDropDownList({ 
    	checkboxes: true,
    	source: dataAdapter, 
    	displayMember: "Name", 
    	valueMember: "Id", width: 200, height: 25,
    	selectedIndex: 0});

    $("#Assistant_ADD").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
            }
        }
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

//项目类型2
function ProjectTypeId_ADD(){
	var ProjectTypeId_ADDsource = {
			datatype: "json",
	        datafields: [
	            { name: 'ProjectTypeName' },
	            { name: 'ProjectTypeID' },
	            { name: 'ProjectTypeCode' },
	        ],
	        url: "/bidding/default/select?table=ProjectType",
	        async: true
	}
	var ProjectTypeId_ADDdataAdapter = new $.jqx.dataAdapter(ProjectTypeId_ADDsource);
	$("#ProjectTypeId_ADD").jqxDropDownList(
			{ source: ProjectTypeId_ADDdataAdapter, 
				displayMember: "ProjectTypeName", 
				valueMember: "ProjectTypeID",
				selectedIndex: 0, width: '200', height: '25'});
	$('#ProjectTypeId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ProjectTypeId_ADD').jqxDropDownList('getItem', args.index);
	    if(item.value=='0'){
	    	
	    }
	    if(item.value=='1'){
	    	
	    }
	    if(item.value=='3'){
	    	
	    }
	    if(item.value=='4'){

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

//采购类型2-需要确认，之前公司写的有问题
function ManagementStyleId_ADD(){
	var ManagementStyleIdsource = {
			datatype: "json",
	        datafields: [
	            { name: 'PurchaseStyleId' },
	            { name: 'PurchaseStyleCode' },
	            { name: 'PurchaseStyleName' },
	        ],
	        url: "/bidding/default/select?table=PurchaseStyle",
	        async: true
	}
	var ManagementStyleIddataAdapter = new $.jqx.dataAdapter(ManagementStyleIdsource);
	$("#ManagementStyleId_ADD").jqxDropDownList(
			{ source: ManagementStyleIddataAdapter, 
				displayMember: "PurchaseStyleName", 
				valueMember: "PurchaseStyleId",
				selectedIndex: 0, width: '200', height: '25'});
	$('#ManagementStyleId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ManagementStyleId_ADD').jqxDropDownList('getItem', args.index);
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

//项目来源
function ProjectSourceId_ADD(){
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
	$("#ProjectSourceId_ADD").jqxDropDownList(
			{ source: ProjectSourceIddataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#ProjectSourceId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#ProjectSourceId_ADD').jqxDropDownList('getItem', args.index);
	});
}
//资金来源
function SourcesOfFundingId_ADD(){
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
	$("#SourcesOfFundingId_ADD").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#SourcesOfFundingId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#SourcesOfFundingId_ADD').jqxDropDownList('getItem', args.index);
	});
}
//项目状态
function StateId_ADD(){
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
	$("#StateId_ADD").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#StateId_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#StateId_ADD').jqxDropDownList('getItem', args.index);
	});
}


//包状态
function StateIdPackage_ADD(){

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
	$("#StateIdPackage_ADD").jqxDropDownList(
			{ source: dataAdapter, 
				displayMember: "Name", 
				valueMember: "Id",
				selectedIndex: 0, width: '200', height: '25'});
	$('#StateIdPackage_ADD').on('select', function (event) {
	    var args = event.args;
	    var item = $('#StateIdPackage_ADD').jqxDropDownList('getItem', args.index);
	});
}


