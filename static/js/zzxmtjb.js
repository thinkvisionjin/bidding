
function search()
{
	url = "select_zzxmtjb";

		
	var source = {					
		datatype : "json",
		datafields : [{name : 'xm',type : 'string'	},
{name : 'gngk',type : 'string'	},
{name : 'gnyq',type : 'string'	},
{name : 'dylycg',type : 'string'	},
{name : 'jzxtp',type : 'string'	},
{name : 'xjcg',type : 'string'	},
{name : 'jzxcs',type : 'string'	},
{name : 'qt',type : 'string'	},
{name : 'gjzb',type : 'string'	},
{name : 'zj',type : 'string'	}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#zzxmtjb-grid").jqxGrid({
		source : dataAdapter
	});	
	

              // prepare jqxChart settings
              var settings = {
                  title: "在做项目统计表",
                  description: "",
                  enableAnimations: true,
                  showLegend: true,
                  padding: { left: 5, top: 5, right: 5, bottom: 5 },
                  titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                  source: dataAdapter,
                  xAxis:
                      {
                          dataField: 'xm',
                          displayText : '员工',
                          title: { text: '员工' },
                          unitInterval: 1,
                          axisSize: 'auto',
                          tickMarks: {
                              visible: true,
                              interval: 1,
                              color: '#BCBCBC'
                          },
                          gridLines: {
                              visible: true,
                              interval: 1,
                              color: '#BCBCBC'
                          }
                      },
                  valueAxis:
                  {
                      unitInterval: 10,
                      minValue: 0,
                      maxValue: 80,
                      title: { text: '数量' },
                      labels: { horizontalAlignment: 'right' },
                      tickMarks: { color: '#BCBCBC' }
                  },
                  colorScheme: 'scheme02',
                  seriesGroups:
                      [
                          {
                              type: 'stackedcolumn',
                              columnsGapPercent: 50,
                              seriesGapPercent: 0,
                              series: [
                                      { dataField: 'gngk', displayText: '国内公开' },
                                      { dataField: 'gnyq', displayText: '国内邀请' },
                                      { dataField: 'dylycg', displayText: '单一来源采购' },
                                      {dataField : 'jzxtp',displayText : '竞争性谈判'	},
                                      {dataField : 'xjcg',displayText : '询价采购'	},
                                      {dataField : 'jzxcs',displayText : '竞争性磋商'	},
                                      {dataField : 'qt',displayText : '其他'	},
                                      {dataField : 'gjzb',displayText : '国际招标'	}                                     
                                  ]
                          }
                      ]
              };
              // setup the chart
              $('#chartContainer').jqxChart(settings);	
	
}


$(document).ready(function() {
	
					$("#zzxmtjb-expander").jqxExpander({
						height:1000,
						toggleMode : 'none',
						showArrow : false
					});
					$("#zzxmtjb-grid")
							.jqxGrid(
									{
										altrows: true,
										enabletooltips: true,
										columnsresize: true,
										height : "300",
										width : "98%",
										columns : [{ text: '姓名', pinned: true, datafield: 'xm', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '国内公开', datafield: 'gngk', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '国内邀请', datafield: 'gnyq', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '单一来源采购', datafield: 'dylycg', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '竞争性谈判', datafield: 'jzxtp', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '询价采购', datafield: 'xjcg', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '竞争性磋商', datafield: 'jzxcs', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '其他', datafield: 'qt', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '国际招标', datafield: 'gjzb', width: '10%',cellsalign: 'center', align: 'center',hidden:false },
{ text: '总计', datafield: 'zj', width: '10%',cellsalign: 'center', align: 'center',hidden:false } ],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);
											container.append('<input id="zzxmtjbprint" type="button" value="打印" />');
											$("#zzxmtjbprint").jqxButton({
												template : 'success'
											});
											container.append('<input id="exportfile" style="float: right" type="button" value="输出" />');
											$("#exportfile").jqxButton({
												template : 'info'
											});											
										}

									});
					search();
					$("#exportfile").click(function() {
		                var gridContent = $("#zzxmtjb-grid").jqxGrid('exportdata', 'xls');
						window.open('data:application/vnd.ms-excel,' + encodeURIComponent(gridContent));		                

					});						
					$("#zzxmtjbprint").click(function() {
		                var gridContent = $("#zzxmtjb-grid").jqxGrid('exportdata', 'html');
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
	

				});
