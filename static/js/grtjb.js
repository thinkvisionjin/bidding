
function search()
{
	if ($("#ksrq").val()=='' && $("#jsrq").val()=='')
		{
		url = "select_grtjb";
		}
	else
		{
		url = "select_grtjb?ksrq="+$("#ksrq").val()+"&jsrq="+$("#jsrq").val()
		}
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'id',type : 'string'	},
			{name : 'xm',type : 'string'	},
{name : 'gngk',type : 'string'	},
{name : 'gnyq',type : 'string'	},
{name : 'dylycg',type : 'string'	},
{name : 'jzxtp',type : 'string'	},
{name : 'xjcg',type : 'string'	},
{name : 'jzxcs',type : 'string'	},
{name : 'qt',type : 'string'	},
{name : 'gjzb',type : 'string'	},
{name : 'zj',type : 'string'	}],
		id : 'id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#grtjb-grid").jqxGrid({
		source : dataAdapter
	});	
}


function searchfb(id)
{
	url = "select_grtjbfb?id="+id+"&ksrq="+$("#ksrq").val()+"&jsrq="+$("#jsrq").val();
		
	var source = {					
		datatype : "json",
		datafields : [{name : 'xmlx',type : 'string'	},
{name : 'fz',type : 'string'	},
{name : 'fzbfb',type : 'string'	},
{name : 'xz',type : 'string'	},
{name : 'xzbfb',type : 'string'	},
{name : 'dj',type : 'string'	},
{name : 'zj',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#grtjbfb-grid").jqxGrid({
		source : dataAdapter
	});	
}

function initgrtjbfb()
{
	$("#grtjbfb-grid").jqxGrid(
			{
				altrows: true,
				enabletooltips: true,
				columnsresize: true,
				height : "35%",
				width : "98%",
				columns : [{ text: '项目类型', pinned: true, datafield: 'xmlx', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '数量（负责）', datafield: 'fz', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '%', datafield: 'fzbfb', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '数量（协助）', datafield: 'xz', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '%', datafield: 'xzbfb', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '单价', datafield: 'dj', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '总价', datafield: 'zj', width: '10%',cellsalign: 'center', align: 'center',hidden:false }],
				showtoolbar : true,
				toolbarheight: 25,
				rendertoolbar : function(toolbar) {
					var me = this;
					var container = $("<div style='margin: 5px;'></div>");
					toolbar.append(container);
					container.append('个人项目情况');
				}

			});	
}
$(document).ready(function() {
	
					$("#grtjb-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false, 
						height: '100%'
					});
					$("#grtjb-grid")
							.jqxGrid(
									{
										altrows: true,
										enabletooltips: true,
										columnsresize: true,
										height : "50%",
										width : "98%",
										showstatusbar: true,
										statusbarheight: 20,
										showaggregates: true,
										columns : [{ text: '姓名',aggregatesrenderer: function (aggregates) {return '合计';}, pinned: true, datafield: 'xm', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '国内公开', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'gngk', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '国内邀请', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'gnyq', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '单一来源采购', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'dylycg', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '竞争性谈判', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'jzxtp', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '询价采购', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'xjcg', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '竞争性磋商', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'jzxcs', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '其他', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'qt', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '国际招标', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'gjzb', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '总计', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'zj', width: '10%',cellsalign: 'center', align: 'center',hidden:false } ],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);
											container.append('<input id="grtjbprint" type="button" value="打印" />');
											$("#grtjbprint").jqxButton({
												template : 'success'
											});
											container.append('<input id="exportfile" style="float: right" type="button" value="输出" />');
											$("#exportfile").jqxButton({
												template : 'info'
											});											
										}

									});
					
					$("#grtjbprint").click(function() {
		                var gridContent = $("#grtjb-grid").jqxGrid('exportdata', 'html');
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
					$("#exportfile").click(function() {
		                var gridContent = $("#grtjb-grid").jqxGrid('exportdata', 'xls');
						window.open('data:application/vnd.ms-excel,' + encodeURIComponent(gridContent));		                

					});			
					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search();
					});			
					$("#grtjb-grid").on('rowselect', function (event) {
					    var args = event.args;
					    // row's bound index.
					    var rowBoundIndex = args.rowindex;
					    if (rowBoundIndex == -1)
					    {
					    	return;
					    }
					    var rowData = args.row;
						searchfb(rowData['id']);						
					});

					$('#ksrq').jqxDateTimeInput({formatString: "yyyy-MM-dd",culture:'zh-CN', height: '25px',culture:'zh-CN'});
					$('#jsrq').jqxDateTimeInput({formatString: "yyyy-MM-dd",culture:'zh-CN', height: '25px',culture:'zh-CN'});
					var now = new Date();
					var year = now.getFullYear();
					var ksrq = year+"-01-01";
					var jsrq = year+"-12-31";
					$('#ksrq').val(ksrq);
					$('#jsrq').val(jsrq);
					search();
					initgrtjbfb();
				});
