
function search()
{
	url = "select_tjzb?ksrq="+$("#ksrq").val()+"&jsrq="+$("#jsrq").val()
/*	var source = {					
		datatype : "json",
		datafields : [ { name: 'cgfs',type : 'string' },
			        { name: 'zfcg',type : 'string' },
			        { name: 'gnzb',type : 'string' },
			        { name: 'gjzb',type : 'string' },
			        { name: 'sm',type : 'string' },
			        { name: 'zj' ,type : 'string'}],
		id : 'Id',
		url : url
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#tjzb_grid2").jqxGrid({
		source : dataAdapter
	});	*/
	$.get(url, function(result){
		if (result){
			//$('#tjzb_grid1').jqxGrid({ source: result['tjzb_grid1']});
			//
			//
			//
			
			var source1 =
			{
			    datatype: "json",
			    datafields: [
			        { name: 'cgfs',type : 'string' },
			        { name: 'bssr',type : 'string' },
			        { name: 'xmcb',type : 'string' },
			        { name: 'dwfc',type : 'string' },
			        { name: 'jxfc',type : 'string' },
			        { name: 'ml',type : 'string' },
			        { name: 'jl',type : 'string' }
			    ],
			    localdata: result['tjzb_grid1']
			};			
			var dataAdapter1 = new $.jqx.dataAdapter(source1);
			$('#tjzb_grid1').jqxGrid({ source:dataAdapter1});	
			var source2 =
			{
			    datatype: "json",
			    datafields: [
			        { name: 'cgfs',type : 'string' },
			        { name: 'zfcg',type : 'string' },
			        { name: 'gnzb',type : 'string' },
			        { name: 'gjzb',type : 'string' },
			        { name: 'sm',type : 'string' },
			        { name: 'zj' ,type : 'string'}
			    ],
			    localdata: result['tjzb_grid2']
			};			
			var dataAdapter2 = new $.jqx.dataAdapter(source2);
			$('#tjzb_grid2').jqxGrid({ source:dataAdapter2 });

			var source3 =
			{
			    datatype: "json",
			    datafields: [
			        { name: 'xmly',type : 'string' },
			        { name: 'xmsl',type : 'string' },
			        { name: 'dwfc',type : 'string' },
			        { name: 'yfc',type : 'string' },
			        { name: 'sy',type : 'string' }
			    ],
			    localdata: result['tjzb_grid3']
			};			
			var dataAdapter3 = new $.jqx.dataAdapter(source3);
			$('#tjzb_grid3').jqxGrid({ source:dataAdapter3});			
			//$('#tjzb_grid3').jqxGrid({ source: result['tjzb_grid3']});

		}
		else
		{

		}			
		
	}, 'json');	
}
function inittjzb_grid1()
{
					$("#tjzb_grid1")
							.jqxGrid(
									{				

										altrows: true,
										enabletooltips: true,
										columnsresize: true,
										height : "30%",
										width : "98%",
										showstatusbar: true,
										statusbarheight: 20,
										showaggregates: true,
										columns : [{ text: '采购方式',aggregatesrenderer: function (aggregates) {return '合计';}, pinned: true, datafield: 'cgfs', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '标书收入', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'bssr', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '项目成本', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'xmcb', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '对外分成', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'dwfc', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '绩效分成', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'jxfc', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '毛利', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'ml', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '净利', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'jl', width: '10%',cellsalign: 'center', align: 'center' } ],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);
											container.append('<input id="tjzb_grid1print" type="button" value="打印" />');
											$("#tjzb_grid1print").jqxButton({
												template : 'success'
											});
											container.append('<input id="tjzb_grid1exportfile" style="float: right" type="button" value="输出" />');
											$("#tjzb_grid1exportfile").jqxButton({
												template : 'info'
											});											
										}

									});
					
					$("#tjzb_grid1print").click(function() {
		                var gridContent = $("#tjzb_grid1").jqxGrid('exportdata', 'html');
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
					$("#tjzb_grid1exportfile").click(function() {
		                var gridContent = $("#tjzb_grid1").jqxGrid('exportdata', 'xls');
						window.open('data:application/vnd.ms-excel,' + encodeURIComponent(gridContent));		                

					});				
}
function inittjzb_grid2()
{
					$("#tjzb_grid2")
							.jqxGrid(
									{				

										altrows: true,
										enabletooltips: true,
										columnsresize: true,
										height : "30%",
										width : "98%",
										showstatusbar: true,
										statusbarheight: 20,
										showaggregates: true,
										columns : [{ text: '采购方式',aggregatesrenderer: function (aggregates) {return '合计';}, pinned: true, datafield: 'cgfs', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '政府采购', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'zfcg', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '国内招标', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'gnzb', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '国际招标', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'gjzb', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '涉密', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'sm', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '总计', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'zj', width: '10%',cellsalign: 'center', align: 'center' } ],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);
											container.append('<input id="tjzb_grid2print" type="button" value="打印" />');
											$("#tjzb_grid2print").jqxButton({
												template : 'success'
											});
											container.append('<input id="tjzb_grid2exportfile" style="float: right" type="button" value="输出" />');
											$("#tjzb_grid2exportfile").jqxButton({
												template : 'info'
											});											
										}

									});
					
					$("#tjzb_grid2print").click(function() {
		                var gridContent = $("#tjzb_grid2").jqxGrid('exportdata', 'html');
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
					$("#tjzb_grid2exportfile").click(function() {
		                var gridContent = $("#tjzb_grid2").jqxGrid('exportdata', 'xls');
						window.open('data:application/vnd.ms-excel,' + encodeURIComponent(gridContent));		                

					});				
}

function inittjzb_grid3()
{
					$("#tjzb_grid3")
							.jqxGrid(
									{				

										altrows: true,
										enabletooltips: true,
										columnsresize: true,
										height : "30%",
										width : "98%",
										showstatusbar: true,
										statusbarheight: 20,
										showaggregates: true,
										columns : [{ text: '项目来源',aggregatesrenderer: function (aggregates) {return '合计';}, pinned: true, datafield: 'xmly', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '项目数量', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'xmsl', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '对外分成', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'dwfc', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '已分成', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'yfc', width: '10%',cellsalign: 'center', align: 'center' },
{ text: '剩余', aggregates: ['sum'],aggregatesrenderer: function (aggregates) {return aggregates['sum'];}, datafield: 'sy', width: '10%',cellsalign: 'center', align: 'center' }],
										showtoolbar : true,
										rendertoolbar : function(toolbar) {
											var me = this;
											var container = $("<div style='margin: 5px;'></div>");
											toolbar.append(container);
											container.append('<input id="tjzb_grid3print" type="button" value="打印" />');
											$("#tjzb_grid3print").jqxButton({
												template : 'success'
											});
											container.append('<input id="tjzb_grid3exportfile" style="float: right" type="button" value="输出" />');
											$("#tjzb_grid3exportfile").jqxButton({
												template : 'info'
											});											
										}

									});
					
					$("#tjzb_grid3print").click(function() {
		                var gridContent = $("#tjzb_grid3").jqxGrid('exportdata', 'html');
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
					$("#tjzb_grid3exportfile").click(function() {
		                var gridContent = $("#tjzb_grid3").jqxGrid('exportdata', 'xls');
						window.open('data:application/vnd.ms-excel,' + encodeURIComponent(gridContent));		                

					});				
}

$(document).ready(function() {
	
					$("#tjzb-expander").jqxExpander({
						toggleMode : 'none',
						showArrow : false, 
						height: '100%'
					});
					inittjzb_grid1();
					inittjzb_grid2();
					inittjzb_grid3();

					$("#search").jqxButton({
						template : 'primary'
					});	
					$("#search").click(function() {
						search();
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
				});
