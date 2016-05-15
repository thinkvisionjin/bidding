
$(document).ready(function () {
//            $('#mainSplitter').jqxSplitter({ width: '100%', height: window.innerHeight*0.95, panels: [{ size: 200 }] });
			$('#mainSplitter').jqxSplitter({ width: '100%', height: '100%', panels: [{ size: 200 }] });
			$("#jqxNavigationBar").jqxNavigationBar({height: "100%", width: "100%", expandMode: "singleFitHeight"});
			$('#jqxTabs').jqxTabs({height: '100%', showCloseButtons: true, scrollPosition: 'both' });
//			$("#yh").jqxButton({ theme: theme });
//			$("#yh1").jqxButton({ theme: theme });
//			$('#jqxTree').jqxTree({ height: '300px', width: '300px'});
        });
		function addTabs(frameid, url)
		{
			var length = $('#jqxTabs').jqxTabs('length'); 
			for (var i = 0;i<length ;i++ )
			{
				 if ($('#jqxTabs').jqxTabs('getTitleAt', i) == frameid)
				 {
					 $('#jqxTabs').jqxTabs('select', i);
					 return ;
				 }
			}
			$('#jqxTabs').jqxTabs('addAt', 1, frameid, '<iframe id="'+frameid+'" style="border:none;padding:0;margin:0;" frameborder=no border=0 height="99%" width="100%"src="'+url+'"></iframe>' );
		}
		function printbuybid()
		{
            var newWindow = window.open('buybid.html', '');

            newWindow.print();		
		}