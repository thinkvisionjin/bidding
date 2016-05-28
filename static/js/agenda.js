var gflag = 0;
var gappointment;
function appointment_save(state, appointment)
{
	if (gflag == 1)
	{
		return;
	}
	if (state == 'add')
		{
		url = 'insertrow_rcb';
		}
	else if (state == 'modify')
		{
		url = 'updaterow_rcb ';
		}
	else if (state == 'delete')
		{
		url = 'deleterow_rcb ';
		}
	var row={
		start:appointment['from'].toString(),
		end:appointment['to'].toString(),
		description:appointment['description'],
		id:appointment['id'],
		subject:appointment['subject'],
		applyuser:appointment['location'],	
		calendar:appointment['resourceId'],
		bsbh:appointment['tooltip']
	};
    $.ajax({
        url:url,
        type:'POST',
        data:row,
        success:function(response,status,xhr){
            if (response == 'success')
            {
					alert(response);
            }
			else
			{
				gflag = 1;
				if (state == 'add')
				{
					$('#scheduler').jqxScheduler('deleteAppointment', appointment.id);
				}
				else if (state == 'modify')
				{
					$('#scheduler').jqxScheduler('deleteAppointment', appointment.id);
					$('#scheduler').jqxScheduler('addAppointment', gappointment);
				}
				else if (state == 'delete')
				{
					$('#scheduler').jqxScheduler('addAppointment', appointment);
				}	
				gflag = 0;		
				alert(response);		
			}
             
        },
        error:function(xhr,errorText,errorType){
            
			gflag = 1;
			if (state == 'add')
			{
				$('#scheduler').jqxScheduler('deleteAppointment', appointment.id);
			}
			else if (state == 'modify')
			{
				$('#scheduler').jqxScheduler('deleteAppointment', appointment.id);
				$('#scheduler').jqxScheduler('addAppointment', gappointment);
			}
			else if (state == 'delete')
			{
				$('#scheduler').jqxScheduler('addAppointment', appointment);
			}	
			gflag = 0;	
			alert("操作不成功");	
        },
    })	
}


$(document).ready(function () {


            // prepare the data
            var source =
            {
            //    dataType: "array",
				dataType: "json",
                dataFields: [
                    { name: 'id', type: 'string' },
                    { name: 'description', type: 'string' },
					{ name: 'applyuser', type: 'string' },
                    { name: 'subject', type: 'string' },
                    { name: 'calendar', type: 'string' },
                    { name: 'rcbstart', type: 'date' },
                    { name: 'rcbend', type: 'date' },
					{ name: 'rq', type: 'date' },
					{ name: 'bsbh', type: 'string' }
                ],
                id: 'id',
	//		url: 'getappointment'
				url: 'select_rcb'
            //    localData: appointments
            };
            var tsource =
            {
                dataType: "json",
                dataFields: [
                    { name: 'calendar', type: 'string' }
                ],
                id: 'id',
                url: 'getmeetroom'
            };
            var adapter = new $.jqx.dataAdapter(source);

            $("#scheduler").jqxScheduler({
                date: new $.jqx.date(),
                width: '100%',
                height: '670px',
                source: adapter,
                editDialogDateFormatString:"yyyy-MM-dd",
                editDialogDateTimeFormatString:"yyyy-MM-dd HH:mm:ss",
				renderAppointment: function(data)
				{
					if (data.appointment.location == "")
					{
						data.html = data.appointment.subject + "[申请人:" + "张三" + "]";
					}
					else
					{
						data.html = data.appointment.subject + "[申请人:" + data.appointment.location + "]";
					}
					return data;
				},
                view: 'agendaView',
                showLegend: true,
                ready: function () {
                    $("#scheduler").jqxScheduler('ensureAppointmentVisible', 'id1');
                },
                resources:
                {
                    colorScheme: "scheme05",
                    dataField: "calendar",
                    source: new $.jqx.dataAdapter(tsource)
                },
                appointmentDataFields:
                {
                    from: "rcbstart",
                    to: "rcbend",
                    id: "id",
                    description: "description",
                    subject: "subject",
                    resourceId: "calendar",
					location: "applyuser",
					tooltip:"bsbh"
                },
				dayNameFormat: 'full',

				editDialogCreate: function (dialog, fields, editAppointment) {

					// hide status option
					fields.statusContainer.hide();
					// hide timeZone option
					fields.timeZoneContainer.hide();
					// hide color option
					fields.colorContainer.hide();
					// hide repeat option
					fields.repeatContainer.hide();
					fields.locationContainer.hide();

					fields.subjectLabel.html("主题");
					
					fields.fromLabel.html("开始");
					
					fields.toLabel.html("结束");
					 
					fields.resourceLabel.html("会议室");
					fields.descriptionLabel.html("描述");
					
					// add custom print button.
					fields.saveButton.html("保存");
					fields.deleteButton.html("删除");
					fields.cancelButton.html("取消");
					fields.saveButton.jqxButton({ template:'success' });
					fields.deleteButton.jqxButton({ template:'danger' });
					fields.cancelButton.jqxButton({ template:'warning' });					
				},
				localization: {
					firstDay: 1,
					days: {
						// full day names
						names: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
						// abbreviated day names
						namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
						// shortest day names
						namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
					},
                    months: {
                        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                        names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
                        // abbreviated month names
                        namesAbbr: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", ""]
                    },
					AM: ["上午", "上午", "上午"],
					PM: ["下午", "下午", "下午"],

					patterns: {
						d: "yyyy/M/d",
						D: "yyyy'年'M'月'd'日'",
						t: "H:mm",
						T: "H:mm:ss",
						f: "yyyy'年'M'月'd'日' H:mm",
						F: "yyyy'年'M'月'd'日' H:mm:ss",
						M: "M'月'd'日'",
						Y: "yyyy'年'M'月'",

						// S is a sortable format that does not vary by culture
						S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
						// formatting of dates in MySQL DataBases
						ISO: "yyyy-MM-dd hh:mm:ss",
						ISO2: "yyyy-MM-dd HH:mm:ss",
						d1: "yyyy.MM.dd",//"dd.MM.yyyy",
						d2: "yyyy-MM-dd",
						d3: "yyyy-MMMM-dd",
						d4: "yy-MM-dd",
						d5: "H:mm",
						d6: "HH:mm",
						d7: "HH:mm tt",
						d8: "yyyy/MMMM/dd",
						d9: "MMMM-dd",
						d10: "MM-dd",
						d11: "yyyy-MM-dd"
					},
					agendaDateColumn: "日期",
					agendaTimeColumn: "时间",
					agendaAppointmentColumn: "会议",
					agendaViewString: "<u>日 程</u>",
					clearString: "清除",
					todayString: "今天",
					dayViewString: "    _<u>天</u>_    ",
					weekViewString: "    _<u>周</u>_    ",
					monthViewString: "    _<u>月</u>_    ",
					editDialogCreateTitleString: "申请会议室", 
					contextMenuCreateAppointmentString: "申请会议室",
					contextMenuEditAppointmentString: "修改会议申请",
					editDialogSubjectString: "会议主题",
					editDialogTitleString: "会议申请",
					editDialogFromString: "开始",
					editDialogToString: "终止",
					editDialogAllDayString: "全天",
					editDialogExceptionsString: "Exceptions",
					editDialogResetExceptionsString: "Reset on Save",
					editDialogDescriptionString: "描述",
					editDialogLocationString: "申请人",
					editDialogResourceIdString: "Owner",
					editDialogRepeatEveryWeekString: "周",
					editDialogRepeatEveryDayString: "天",
					editDialogRepeatEveryYearString: "年",
					editDialogRepeatEveryString: "重复周期",
					editDialogRepeatNeverString: "从不",
					editDialogRepeatDailyString: "每天",
					editDialogRepeatWeeklyString: "每周",
					editDialogRepeatMonthlyString: "每月",
					editDialogRepeatYearlyString: "每年",
					editDialogRepeatEveryMonthString: "月",
					editDialogRepeatEveryMonthDayString: "天",
					editDialogRepeatFirstString: "第一",
					editDialogRepeatSecondString: "第二",
					editDialogRepeatThirdString: "第三",
					editDialogRepeatFourthString: "第四",
					editDialogRepeatLastString: "最后",
					editDialogRepeatEndString: "结束",
					editDialogRepeatAfterString: " ",
					editDialogRepeatOnString: "结束",
					editDialogRepeatOfString: "of",
					editDialogRepeatOccurrencesString: "次之后",
					editDialogRepeatSaveString: "Save Occurrence",
					editDialogRepeatSaveSeriesString: "Save Series",
					editDialogRepeatDeleteString: "Delete Occurrence",
					editDialogRepeatDeleteSeriesString: "Delete Series",
				},

                views:
                [
					{ type: 'dayView', timeRuler: { scale: 'hour', formatString: 'HH:mm' }},
					{ type: 'weekView', timeRuler: { scale: 'hour', formatString: 'HH:mm' }},
					{ type: 'monthView', timeRuler: { scale: 'hour', formatString: 'HH:mm' }},
					{ type: 'agendaView', timeRuler: { scale: 'hour', formatString: 'HH:mm' }},

                ]
            });
			$('#scheduler').on('appointmentClick', function (event) { 
				var args = event.args; gappointment = args.appointment; 
			});
			$('#scheduler').on('editDialogOpen', function (event) { 
				var args = event.args; var dialog = args.dialog; var fields = args.fields; var appointment = args.appointment;
				fields.repeatContainer.hide();
				fields.subject.value = "tt";
//				if (appointment )
//				{
//					fields.subject.value = "tt";
//					appointment.subject = "tt";
//					$("#scheduler").jqxScheduler('beginAppointmentsUpdate');
//					$('#scheduler').jqxScheduler('setAppointmentProperty', appointment.id, "subject", "tt");
//					$('#scheduler').jqxScheduler('setAppointmentProperty', appointment.id, "location", "ff");
//					$("#scheduler").jqxScheduler('endAppointmentsUpdate');
//				}
				
			});
			$('#scheduler').on('appointmentChange', function (event) { 
				var args = event.args; var appointment = args.appointment; 
				alert("change")
				appointment_save('modify', appointment);

			});
            $("#scheduler").on('appointmentDelete', function (event) {
                var args = event.args;
                var appointment = args.appointment;
                console.log("appointmentDelete is raised");
				appointment_save('delete', appointment);
				//判断是否有权限删除 userid是否一致
				//$('#jqxScheduler').jqxScheduler('addAppointment', appointment);
            });

            $("#scheduler").on('appointmentAdd', function (event) {
                var args = event.args;
                var appointment = args.appointment;
				$('#scheduler').jqxScheduler('setAppointmentProperty', appointment.id, "location", "张三");
				appointment_save('add', appointment);

            });
			$('#scheduler').on('viewChange', function (event) { var args = event.args; var date = args.date; var from = args.from; var to = args.to; var oldViewType = args.oldViewType; var newViewType = args.newViewType;
			//查询根据返回数据增加
			});
			$('#scheduler').on('dateChange', function (event) { var args = event.args; var date = args.date; var from = args.from; var to = args.to; });



        });