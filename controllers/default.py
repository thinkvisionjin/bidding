# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
#########################################################################
from datetime import datetime
from decimal import *
from _sqlite3 import Row
import time

T.force('zh-cn')

@auth.requires_login()
def index():
    """
    example action using the internationalization operator T and flash
    rendered by views/default/index.html or views/generic.html

    if you need a simple wiki simply replace the two lines below with:
    return auth.wiki()
    """
    response.flash = T("Hello World")
    return dict(message=T('Welcome to web2py!'))

def Num2MoneyFormat( change_number ):
    """
    .转换数字为大写货币格式( format_word.__len__() - 3 + 2位小数 )
    change_number 支持 float, int, long, string
    """
    format_word = ["分", "角", "元",
               "拾","百","千","万",
               "拾","百","千","亿",
               "拾","百","千","万",
               "拾","百","千","兆"]

    format_num = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]
    if type( change_number ) == unicode:
        # - 如果是字符串,先尝试转换成float或int.
        if '.' in change_number:
            try:    change_number = float( change_number )
            except: raise ValueError, '%s   can\'t change'%change_number
        else:
            try:    change_number = int( change_number )
            except: raise ValueError, '%s   can\'t change'%change_number

    if type( change_number ) == float:
        real_numbers = []
        for i in range( len( format_word ) - 3, -3, -1 ):
            if change_number >= 10 ** i or i < 1:
                real_numbers.append( int( round( change_number/( 10**i ), 2)%10 ) )

    elif isinstance( change_number, (int, long) ):
        real_numbers = [ int( i ) for i in str( change_number ) + '00' ]

    else:
        raise ValueError, '%s   can\'t change'%change_number

    zflag = 0                       #标记连续0次数，以删除万字，或适时插入零字
    start = len(real_numbers) - 3
    change_words = []
    for i in range(start, -3, -1):  #使i对应实际位数，负数为角分
        if 0 <> real_numbers[start-i] or len(change_words) == 0:
            if zflag:
                change_words.append(format_num[0])
                zflag = 0
            change_words.append( format_num[ real_numbers[ start - i ] ] )
            change_words.append(format_word[i+2])

        elif 0 == i or (0 == i%4 and zflag < 3):    #控制 万/元
            change_words.append(format_word[i+2])
            zflag = 0
        else:
            zflag += 1

    if change_words[-1] not in ( format_word[0], format_word[1]):
        # - 最后两位非"角,分"则补"整"
        change_words.append("整")

    return ''.join(change_words)

def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    form=auth()
    return dict(form = form)


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()

##################通用的表处理接口#############################

def insert():
    table_name = request.vars.table
    print 'inserting data into:'  +table_name +'**************'
    rowData = request.post_vars
    print rowData
    for key in rowData:
        rowData[key] = rowData[key].decode('utf-8')
    id = db[table_name].insert(**rowData)
    print id 
    db.commit()
    row = db(db[table_name]._id ==id).select().first()
    print row
    dict_row = {}
    for key in row.keys():
        if (key!= u'update_record' and key!= u'delete_record'):
            try:
                if key==u'id':
                    dict_row[u'Id']  = row[key]
                elif isinstance(row[key], bool):
                    dict_row[key] = row[key]
                elif isinstance(row[key], str):
                    dict_row[key] = row[key].decode('utf-8')
                elif isinstance(row[key], datetime):
                    dict_row[key] = unicode(row[key])
                elif isinstance(row[key], Decimal):
                    dict_row[key] = unicode(row[key])
                else:
                    dict_row[key] = row[key]
            except:
                print sys.exc_info()
    print id 
    result= json.dumps(dict_row,ensure_ascii=False)
    return result

def delete():
    table_name = request.vars.table
    print 'delete data from:'  +table_name +'**************'
    id = request.post_vars['Id']
    strSQL = u"delete  from [bidding].[dbo].[" + table_name + u"] where  id = " +id;
    print strSQL
    db.executesql(strSQL)
    return dict(table=table_name)

def update():
    table_name = request.vars.table
    print 'update data into:'  +table_name +'**************'
    row_data = request.post_vars
    id = row_data['Id']
    for key in row_data:
        if key!='Id' and key!='uid':
            db(db[table_name]._id == id).update(**{key:request.post_vars[key]})
    row = db(db[table_name]._id ==id).select().first()
    db.commit()
    return dict(table=table_name)

@auth.requires_login()
def select():
    table_name = request.vars.table
    print u'select data from:'  +table_name +'**************'
    dic_rows = []
    for row in db().select(db[table_name].ALL,orderby=~db[table_name].id):
        dict_row = {}
        for key in row.keys():
            if (key!= u'update_record' and key!= u'delete_record'):
                if key==u'id':
                    dict_row[u'Id']  = row[key]
                elif isinstance(row[key], bool):
                    dict_row[key] = row[key]
                elif isinstance(row[key], str):
                    dict_row[key] = row[key].decode('utf-8')
                elif isinstance(row[key], datetime):
                    dict_row[key] = unicode(row[key])
                else:
                    dict_row[key] = row[key]
        dic_rows.append(dict_row)
    return json.dumps(dic_rows,ensure_ascii=False)

###############业务处理页面################################


def getDictionaries():
    dictionaries = {}
    strSQL = u"select  Id,ProjectCode,ProjectName from [bidding].[dbo].[Project]"
    dictionaries["ProjectName"] = sqltojson(strSQL)
    strSQL = u"select  Id,UserName from [bidding].[dbo].[Customer]"
    dictionaries["Customer"] = sqltojson(strSQL)
    strSQL = u"select  Id,ProjectTypeId,ProjectTypeName from [bidding].[dbo].[ProjectType]"
    dictionaries["ProjectType"] = sqltojson(strSQL)
    strSQL = u"select  Id,PurchaseStyleId,PurchaseStyleName from [bidding].[dbo].[PurchaseStyle]"
    dictionaries["PurchaseStyle"] = sqltojson(strSQL)
    strSQL = u"select  Id,Name from [bidding].[dbo].[ProjectSource]"
    dictionaries["ProjectSource"] = sqltojson(strSQL)
    strSQL = u"select  Id,Name from [bidding].[dbo].[FundingSource]"
    dictionaries["FundingSource"] = sqltojson(strSQL)
    strSQL = u"select  Id,ManagementStyleId,ManagementStyleName from [bidding].[dbo].[ManagementStyle]"
    dictionaries["ManagementStyle"] = sqltojson(strSQL)
    strSQL = u"select  Id,Name from [bidding].[dbo].[ProjectStatus]"
    dictionaries["ProjectStatus"] = sqltojson(strSQL)
    strSQL = u"select  Id,chinesename as Name from [bidding].[dbo].[auth_user]"
    dictionaries["Employee"] = sqltojson(strSQL,'gbk')
    strSQL = u"select  TypeId,TypeName from [bidding].[dbo].[ProtocolCodeType]"
    dictionaries["ProtocolCodeType"] = sqltojson(strSQL)
    return json.dumps(dictionaries,ensure_ascii=False)

def mainframe():
    return dict();

def scheduler():
    return dict();

def upload():
    return dict();

def xybh():
    return dict();
def xybh_ss():
    searchkey = request.vars.searchkey
    strSQL = u"select *  from [bidding].[dbo].[ProtocolCode] where  ProtocolNumber like '%" +unicode(searchkey)+u"%' order by Id desc";
    print  strSQL
    protocols=sqltojson(strSQL)
    return protocols

def xmbh():
    return dict();
def xmgl():
    return dict();
def xmglmx():
    id = request.vars.id
    strSQL = u"select top 1 *  from [bidding].[dbo].[Project] where  Id = " +id;
    project=sqltojson(strSQL)
    return dict(project=project)
def xmglmxv():
    id = request.vars.id
    strSQL = u"select top 1 *  from [bidding].[dbo].[Project] where  Id = " +id;
    project=sqltojson(strSQL)
    return dict(project=project)

def SelectPackagesByProjectId():
    id = request.vars.id
    strSQL = u"select * from [bidding].[dbo].[ProjectPackage] where  ProjectId = " +id;
    return sqltojson(strSQL)

def GenerateProtocolCode(protocal_type,id):
    protocol_code = "SPMCEC-"+time.strftime('%y')
    if protocal_type == u'0':
        protocol_code += 'ZC'
    if protocal_type == u'1':
        protocol_code += 'SM'
    if protocal_type == u'2':
        protocol_code += 'ND'
    if protocal_type == u'3':
        protocol_code += 'QT'
    return protocol_code+unicode(id).zfill(5);

def GenerateProjectCode(project,id):
    ProjectCode = u"2016" 
    if project["ProjectTypeId"]==u"0":
        ProjectCode+="YB"
    if project["ProjectTypeId"]==u"1":
        ProjectCode+=u"GJ"
    if project["ProjectTypeId"]==u"2":
        ProjectCode+=u"ZC"
    if project["ProjectTypeId"]==u"3":
        ProjectCode+=u"SM"
    ProjectCode+="-"
    if project["PurchaseStyleId"]==u"1":
        ProjectCode+=u"GK"
    if project["PurchaseStyleId"]==u"2":
        ProjectCode+=u"YQ"
    if project["PurchaseStyleId"]==u"3":
        ProjectCode+=u"XJ"
    if project["PurchaseStyleId"]==u"4":
        ProjectCode+=u"JT"
    if project["PurchaseStyleId"]==u"5":
        ProjectCode+=u"JC"
    if project["PurchaseStyleId"]==u"6":
        ProjectCode+=u"DY"
    if project["PurchaseStyleId"]==u"7":
        ProjectCode+=u"QT"
    ProjectCode+="-"
    if project["ManagementStyleId"]==u"1":
        ProjectCode+=u"JDCP"
    if project["ManagementStyleId"]==u"2":
        ProjectCode+=u"ZYTZ"
    ProjectCode+="-" 
    if project["ProjectSourceId"]==u"1":
        ProjectCode+=u"ZY" 
    if project["ProjectSourceId"]==u"2":
        ProjectCode+=u"JX"
    if project["ProjectSourceId"]==u"3":
        ProjectCode+=u"HX"
    if project["ProjectSourceId"]==u"4":
        ProjectCode+=u"JG"
    if project["ProjectSourceId"]==u"5":
        ProjectCode+=u"JC"
    if project["ProjectSourceId"]==u"6":
        ProjectCode+=u"QT"
    return ProjectCode+unicode(id);

def SelectProjectsSummary():
    strSQL = u'''select  a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ManagementStyleId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete],
      count(b.Id) as PackageCount,
      count(b.Id) as DocumentBuyerCount,
      count(b.Id) as BidderCount,
      count(b.Id) as MarginCount,
      count(b.Id) as ReturnMarginCount,
      sum(isnull(b.EntrustMoney,0)) as EntrustMoney,
      sum(isnull(b.WinningMoney,0)) as WinningMoney 
      from [dbo].[Project] a left join [dbo].[ProjectPackage] b on a.id= b.ProjectId
group by a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ManagementStyleId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete]
      order by a.[Id] desc'''
    return  sqltojson(strSQL)

def gmbs():
    return dict();

def CreateNewProject():
    print 'CreateNewProject'
    rowData = request.post_vars
    print rowData
    for key in rowData:
        rowData[key] = rowData[key].decode('utf-8')
    id = db['Project'].insert(**rowData)
    print id 
    db.commit()
    updateProjectStr = u"update [bidding].[dbo].[Project]  set ProjectCode = '"+GenerateProjectCode(rowData,id)+u"' where id ="+unicode(id)
    print updateProjectStr
    db.executesql(updateProjectStr)
    db.commit()
    row = db(db['Project']._id ==id).select().first()
    print row
    dict_row = {}
    for key in row.keys():
        if (key!= u'update_record' and key!= u'delete_record'):
                if key==u'id':
                    dict_row[u'Id']  = row[key]
                elif isinstance(row[key], bool):
                    dict_row[key] = row[key]
                elif isinstance(row[key], str):
                    dict_row[key] = row[key].decode('utf-8')
                elif isinstance(row[key], datetime):
                    dict_row[key] = unicode(row[key])
                else:
                    dict_row[key] = row[key]
    result= json.dumps(dict_row,ensure_ascii=False)
    return result

def CreateNewProtocol():
    print 'CreateNewProtocal'
    rowData = request.post_vars
    print rowData
    for key in rowData:
        rowData[key] = rowData[key].decode('utf-8')
    id = db['ProtocolCode'].insert(**rowData)
    print id 
    db.commit()
    updateProtocolStr = u"update [bidding].[dbo].[ProtocolCode]  set ProtocolNumber = '"+GenerateProtocolCode(rowData['TypeId'],id)+u"' where id ="+unicode(id)
    print updateProtocolStr
    db.executesql(updateProtocolStr)
    db.commit()
    row = db(db['ProtocolCode']._id ==id).select().first()
    print row
    dict_row = {}
    for key in row.keys():
        if (key!= u'update_record' and key!= u'delete_record'):
                if key==u'id':
                    dict_row[u'Id']  = row[key]
                elif isinstance(row[key], bool):
                    dict_row[key] = row[key]
                elif isinstance(row[key], str):
                    dict_row[key] = row[key].decode('utf-8')
                elif isinstance(row[key], datetime):
                    dict_row[key] = unicode(row[key])
                else:
                    dict_row[key] = row[key]
    result= json.dumps(dict_row,ensure_ascii=False)
    return result


def getyhls():
    print "getyhls"
    redirect(URL('../../static/data/yhls.txt'))

def getqrls():
    redirect(URL('../../static/data/qrls.txt'))

def agenda():
    return dict();

def buybid():
    return dict();

def getappointment():
    redirect(URL('../../static/data/appointment.txt'))
def getmeetroom():
    redirect(URL('../../static/data/appointment.txt'))

def sqltojson(sql,decode=None):
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        print row
        dict_row = {}
        for key in row.keys():
            if decode!=None :
                if isinstance(row[key],int):
                    dict_row[key] = row[key]
                else:
                    dict_row[key] = row[key].decode(decode);
            else:
                dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return json.dumps(dic_rows) 

def getzbgg():
    return sqltojson(u'SELECT top 10 [id],[title],[addtime] FROM [zhaobiao].[dbo].[Zbgg] order by addtime desc')


    
def zbgg():
    content = """<p style="text-indent:21pt;margin:0cm 0cm 0pt;mso-char-indent-count:2.0;" class="MsoNormal"><span style="font-size:small;"><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">兰州军区医疗设备网上招标采购兰州评标中心受军区卫生部委托，就以下项目组织公开招标采购，欢迎国内合格的供应商前来投标。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">1. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">项目名称：</span><span lang="EN-US"><a href="http://www.sohunj.com/member/caigou/moban_view.aspx?id=4851"><span style="font-family:宋体;color:windowtext;text-decoration:none;mso-hansi-font-family:Calibri;text-underline:none;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;" lang="EN-US"><span lang="EN-US">临床诊断听力计</span></span><span style="color:windowtext;text-decoration:none;text-underline:none;"><span style="font-family:Calibri;">+</span></span><span style="font-family:宋体;color:windowtext;text-decoration:none;mso-hansi-font-family:Calibri;text-underline:none;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;" lang="EN-US"><span lang="EN-US">中耳分析仪</span></span></a></span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">2. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">项目编号：</span><span lang="EN-US"><span style="font-family:Calibri;">2012-LQC-5-22-3-1 </span></span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">3. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">项目内容：本项目采购</span><span lang="EN-US"><a href="http://www.sohunj.com/member/caigou/moban_view.aspx?id=4851"><span style="font-family:宋体;color:windowtext;text-decoration:none;mso-hansi-font-family:Calibri;text-underline:none;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;" lang="EN-US"><span lang="EN-US">临床诊断听力计<span lang="EN-US">、<span lang="EN-US">中耳分析仪</span></span></span></span></a></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">各</span><span lang="EN-US"><span style="font-family:Calibri;">1</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">台</span><span lang="EN-US"><span style="font-family:Calibri;">,</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">设备的具体要求见“<span style="mso-bidi-font-weight:bold;">设备招标需求参数列表</span>”</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">4. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">采购人：宝鸡三医院</span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">5. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">开标时间：</span><span lang="EN-US"><span style="font-family:Calibri;">2012</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">年</span><span lang="EN-US"><span style="font-family:Calibri;">5</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">月</span><span lang="EN-US"><span style="font-family:Calibri;">22</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">日</span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">6. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">本次项目不接受联合体投标。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">7. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">招标采购文件的获取</span><span style="font-family:Calibri;"> </span></span></p>
<p style="text-indent:21pt;margin:0cm 0cm 0pt;mso-char-indent-count:2.0;" class="MsoNormal"><span style="font-size:small;"><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">本项目招标采购文件包括“招标采购公告”、“投标人须知”、“<span style="mso-bidi-font-weight:bold;">设备招标需求参数列表</span>”，其中“招标采购公告”、“投标人须知”不需登记注册即可任意浏览，而“<span style="mso-bidi-font-weight:bold;">设备招标需求参数列表</span>”需在登记注册后方可浏览，登记注册由南京久赢网络科技有限公司负责受理。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">8. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">投标文件的递交</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">8.1 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">投标函的递交截止时间为</span><span lang="EN-US"><span style="font-family:Calibri;">2012</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">年</span><span lang="EN-US"><span style="font-family:Calibri;">5</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">月</span><span lang="EN-US"><span style="font-family:Calibri;">18</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">日上午</span><span lang="EN-US"><span style="font-family:Calibri;">11:30</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">，超过截止时间递交的投标函将不予受理，同时请供应商在递交投标函之前详阅所有招标采购文件。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">8.2 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">资质文件的递交截至时间为</span><span lang="EN-US"><span style="font-family:Calibri;">2012</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">年</span><span lang="EN-US"><span style="font-family:Calibri;">5</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">月</span><span lang="EN-US"><span style="font-family:Calibri;">18</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">日下午</span><span lang="EN-US"><span style="font-family:Calibri;">18:00</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">，超过截止时间递交的资质文件将不予受理，资质文件的内容及要求详见“投标人须知”。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">9. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">网络视频会议要求</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">9.1 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">项目采购会议在久赢网兰州评标室举行，请报名的供应商于</span><span lang="EN-US"><span style="font-family:Calibri;">2012</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">年</span><span lang="EN-US"><span style="font-family:Calibri;">5</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">月</span><span lang="EN-US"><span style="font-family:Calibri;">18</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">日下午</span><span lang="EN-US"><span style="font-family:Calibri;">14</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">：</span><span lang="EN-US"><span style="font-family:Calibri;">30</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">—</span><span lang="EN-US"><span style="font-family:Calibri;">17</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">：</span><span lang="EN-US"><span style="font-family:Calibri;">00</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">与南京久赢网络科技有限公司进行视频测试。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">9.2 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">投标人在视频测试前，请准备好连接互联网计算机、麦克风、音响（耳机）等设备，在久赢网兰州评标室的“投标人视频自测”会议中完成自行测试，自测要求画面、语音通畅，其他技术问题请与南京久赢网络科技有限公司联系。</span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">9.3 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">投标人应在本公司营业场所或办公地点参加网络视频会议，并保证该地点在招标采购会议中不受干扰，如不能在本公司营业场所或办公地点参加，则应由法人代表以书面形式向评标中心递交情况说明，否则将被取消投标资格。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">9.4 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">投标人应保证参加会议的代表双手以上的身体能够出现在视频会议画面中，同时在画面中还应有公司标志铭牌、营业执照等。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">9.5 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">未进行视频测试，或在视频测试中画面、语音不通畅的投标人将被取消投标资格。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">10. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">问题咨询</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">10.1 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">供应商关于久赢网操作、产品注册、资料上传等技术问题的疑问，请与南京久赢网络科技有限公司联系。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">10.2 </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">供应商关于对投标流程、资质文件、设备需求参数等的疑问，应在认真阅读招标采购文件后仍然无法解决的情况下，再与评标中心联系。</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span lang="EN-US"><span style="font-family:Calibri;">11. </span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">兰州评标中心联系方式</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">电话：</span><span lang="EN-US"><span style="font-family:Calibri;">0931-8976111</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">；</span><span lang="EN-US"><span style="font-family:Calibri;"> 0931-2332278 </span></span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">传真：</span><span lang="EN-US"><span style="font-family:Calibri;">0931-8976111 </span></span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">电子邮箱：</span><span lang="EN-US"><span style="font-family:Calibri;">LZPBZX@163.COM</span></span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">地址：兰州市七里河区吴家园</span><span lang="EN-US"><span style="font-family:Calibri;">22</span></span><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">号</span><span style="font-family:Calibri;"> </span></span></p>
<p style="margin:0cm 0cm 0pt;" class="MsoNormal"><span style="font-size:small;"><span style="font-family:宋体;mso-hansi-font-family:Calibri;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;">邮编：</span><span lang="EN-US"><span style="font-family:Calibri;">730050</span></span></span></p>""" 
#    content = cgi.escape(content) 
    return dict(content=content);
    
def rawsqltojson(sql):
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        print row
        dict_row = {}
        for key in row.keys():
            dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return dic_rows 

def sqltoarraynodict(sql):
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        for key in row.keys():
            dic_rows.append(row[key])
    return dic_rows 

def sqltoarray(sql):
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        print row
        dict_row = {}
        for key in row.keys():
            dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return dic_rows 

def getzbgg():
    keyword = request.vars.title
    print keyword
    if keyword == None:
        where = u''
    else:
        where = u" where title like '%" + keyword + u"%' "
    print u"==>", where   
    sql = u'SELECT top 10 [id],[title],[addtime] FROM [zhaobiao].[dbo].[Zbgg]' + where + u'order by addtime desc'
    return sqltojson(sql)

def getstatus(flag):
    if flag==0:
        return u'草稿'
    if flag==1:
        return u'提交' 
    if flag==2:
        return u'预招'       
    if flag==3:
        return u'正式'
    if flag==9:
        return u'结束' 
    if flag==8:
        return u'流标' 
    if flag==4:
        return u'置疑' 
    
def getggmx():
    id = request.vars.id
    sql = """select code, title, yzbtime, flag from [zhaobiao].[dbo].[zbgg_mx] a, [zhaobiao].[dbo].[zhaobiao] b 
where a.ggid=""" + id + """ and a.zid=b.id and a.isdel=0 and b.isdel=0
order by a.id""";
    print sql
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        print row
        dict_row = {}
        for key in row.keys():
            
            if key=='flag':
                dict_row['status'] = getstatus(row[key])
            else:
                dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return json.dumps(dic_rows) 

def getwggzb():
    sql = u'''select uid, code, title,flag, yzbtime from zhaobiao.dbo.zhaobiao
where flag>=8 and enddate > '2009-5-1'   and  not exists  
(select id from zhaobiao.dbo.ZhaobiaoGgs where  kind=1 and isdel=0 and ggisdel=0 and mxisdel=0 and id=  zhaobiao.id)'''
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        print row
        dict_row = {}
        for key in row.keys():
            
            if key=='flag':
                dict_row['status'] = getstatus(row[key])
            else:
                dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return json.dumps(dic_rows)      
    
def zbgg():
    id = request.vars.id
    sql = u'select [id], [title], [addtime], [content] from [zhaobiao].[dbo].[Zbgg] where id=' + id
    rows = db.executesql(sql, as_dict=True)
    row = rows[0]
    return dict(id=row['id'], title=row['title'], addtime=row['addtime'], content=row['content']);
    
def zbggs():
    return dict();

def insertrow(table_name, rowData):
    for k in rowData.keys():
        if isinstance(rowData[k], str):
            rowData[k] = rowData[k].decode(u'utf-8')
    return db[table_name].insert(**rowData)

def updaterow(table_name, id, rowData):
    for k in rowData.keys():
        if isinstance(rowData[k], str):
            rowData[k] = unicode(rowData[k], u'utf-8')

    db(db[table_name]._id == id).update(**rowData)
    db.commit()
   


def deleterow(table_name, id):
    db(db[table_name]._id == id).delete()


def p_getbsbh(uid):
    sql = u"""select PackageNumber from ProjectPackage""";   
    return sqltoarraynodict(sql);

#购买标书代码
#定制代码
def getkh():
    sql = u"""select * from kh where dwmc='"""+request.vars.dwmc+u"'";
    
    row = db(db[u'kh'].dwmc ==request.vars.dwmc).select().first()
    khId = row[u'id']
    result = {};
    sql = u"""select lxr from lxr where khId="""+unicode(khId);   
    result[u'lxr'] =  sqltoarraynodict(sql);    
    sql = u"""select sj from lxr where khId="""+unicode(khId);   
    result[u'sj'] =  sqltoarraynodict(sql);        
    return json.dumps(result)

#购买标书配置信息需定制
def getgmbspz():
    uid = u'';
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(uid);
    return json.dumps(result)   

#主页

def gmbs():
    return dict();
#操作
def gmbsmx():
    if request.vars.oper == u'modify':
        return dict(title=u"修改", Id=request.vars.Id)
    if request.vars.oper == u'detail':
        return dict(title=u"详细", Id=request.vars.Id)    
    return dict(title=u"新增", Id=request.vars.Id)

#获取所有

def getgmbs():
    dwmc = request.vars.dwmc
    bsbh = request.vars.bsbh
    if dwmc==None:
        dwmc=u''
    if bsbh==None:
        bsbh=u''
    where = u'where '
    where += u"dwmc like '%"+dwmc+u"%'"
    where += u"and bsbh like '%"+bsbh+u"%'"
    sql = u"""select * from gmbs """ + where;
    print sql   
    return sqltojson(sql);

def gmbs_print():
    table_name = u'gmbs'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    rows = rawsqltojson(sql);    
    row = rows[0]
    print row
    row[u'rq'] = row[u'rq'][0:10]
    row[u'zje'] = Num2MoneyFormat(row[u'je'])
    return dict(**row)

def select_gmbs():
    try:
        dwmc = request.vars.dwmc
        bsbh = request.vars.bsbh
        username = u'Test'
        if dwmc==None:
            dwmc=u''
        if bsbh==None:
            bsbh=u''
        where = u"where username='"+username+u"'"
        where += u"and dwmc like '%"+dwmc+u"%'"
        where += u"and bsbh like '%"+bsbh+u"%'"
        order = u" order by rq desc"
        sql = u"""select * from gmbs """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"    

def updaterow_gmbs():
    try:
        table_name = u'gmbs'
        id = request.vars.Id
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        return u"success"
    except:
        return u"fail"        

def p_addkh(rowData):
    table_name = u'kh'
    row = db(db[table_name].dwmc ==rowData[u'dwmc']).select().first()
    if row==None:
        khrow = {}
        khrow[u'username'] = rowData[u'username']
        khrow[u'dwmc'] = rowData[u'dwmc']
        id = db[table_name].insert(**khrow)
    else:
        id = row[u'id']
        
    table_name = u'lxr'
    row = db((db.lxr.lxr == rowData[u'lxr'])&(db.lxr.sj==rowData[u'sj'])).select().first()
    if row==None:
        khrow = {}
        khrow[u'lxr'] = rowData[u'lxr']
        khrow[u'sj'] = rowData[u'sj']
        khrow[u'username'] = rowData[u'username']
        khrow[u'khId'] = unicode(id)
        insertrow(table_name, khrow)    

def p_insertcwls(ywlx, id, sz, rowData):
    table_name = u'cwls'
    row = {}
    row[u'ywlx'] = ywlx
    row[u'lyId'] = id
    row[u'sz'] = sz
    row[u'bsbh'] = rowData[u'bsbh']
    row[u'je'] = rowData[u'je']
    row[u'username'] = rowData[u'username']
    insertrow(table_name, row)
    
def p_updatecwls(ywlx, id, sz, rowData):
    table_name = u'cwls'
    row = {}
    row[u'ywlx'] = ywlx
    row[u'lyId'] = id
    row[u'sz'] = sz
    row[u'bsbh'] = rowData[u'bsbh']
    row[u'je'] = rowData[u'je']
    row[u'username'] = rowData[u'username']
    db(db[table_name].lyId == id).update(**row)

def insertrow_gmbs():
    try:
        table_name = u'gmbs'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow gmbs"
        print rowData
        id = insertrow(table_name, rowData)
        p_addkh(rowData)
        p_insertcwls(u'购买标书', id, u'收入',  rowData)
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"
    

def deleterow_gmbs():
    try:
        table_name = u'gmbs'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        return u"success"
    except:
        return u"fail"    
    
def selectone_gmbs():
    try:
        table_name = u'gmbs'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail"    

#################################################3
#主页

def kh():
    return dict();
#操作

def khmx():
    if request.vars.oper == u'modify':
        return dict(title=u"修改", Id=request.vars.Id)
    if request.vars.oper == u'detail':
        return dict(title=u"详细", Id=request.vars.Id)    
    return dict(title=u"新增", Id=request.vars.Id)

#获取所有

def select_kh():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        dwmc = request.vars.dwmc
        if dwmc==None:
            dwmc=u''
        where += u"and dwmc like '%"+dwmc+u"%'"
        
        order = u" order by rq desc"
        sql = u"""select * from kh """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"    

def updaterow_kh():
    try:
        table_name = u'kh'
        id = request.vars.Id
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        return u"success"
    except:
        return u"fail"

def insertrow_kh():
    try:
        table_name = u'kh'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow kh"
        print rowData
        insertrow(table_name, rowData)
        return u"success"
    except:
        return u"fail"

def deleterow_kh():
    try:
        table_name = u'kh'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        table_name = u'lxr'
        db(db[table_name].khId == id).delete()
        return u"success"
    except:
        return u"fail"
   
def selectone_kh():
    try:       
        table_name = u'kh'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail"
    
##########################################################33
#主页

def tbbzj():
    return dict();
#操作

def tbbzjmx():
    if request.vars.oper == u'modify':
        return dict(title=u"修改", Id=request.vars.Id)
    if request.vars.oper == u'detail':
        return dict(title=u"详细", Id=request.vars.Id)    
    return dict(title=u"新增", Id=request.vars.Id)

#获取所有

def select_tbbzj():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        
        dwmc = request.vars.dwmc
        if dwmc==None:
            dwmc=u''
        where += u"and dwmc like '%"+dwmc+u"%'"
        
    
        bsbh = request.vars.bsbh
        if bsbh==None:
            bsbh=u''
        where += u"and bsbh like '%"+bsbh+u"%'"
        
        order = u" order by rq desc"
        sql = u"""select * from tbbzj """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"
    
def updaterow_tbbzj():
    try:
        table_name = u'tbbzj'
        id = request.vars.Id
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        return u"success"
    except:
        return u"fail"    

def insertrow_tbbzj():
    try:
        table_name = u'tbbzj'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow tbbzj"
        print rowData
        insertrow(table_name, rowData)
        p_insertcwls(u'投标保证金', id, u'收入',  rowData)
        return u"success"
    except:
        return u"fail"

def deleterow_tbbzj():
    try:
        table_name = u'tbbzj'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        return u"success"
    except:
        return u"fail"

def selectone_tbbzj():
    try:
        table_name = u'tbbzj'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail"


def gettbbzjpz():
    try:
        uid = u''
        result = {};
        sql = u"""select dwmc from kh""";   
        result[u'dwmc'] = sqltoarraynodict(sql);
    
        result[u'bsbh'] = p_getbsbh(uid)
        result[u'bzjlx'] = [u'现金', u'保函']
        return json.dumps(result)  
    except:
        return u"fail"

def tbzj_print():
    table_name = u'tbzj'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    rows = rawsqltojson(sql);    
    row = rows[0]
    row[u'bm'] = u'业务一部'
    row[u'rq'] = row[u'rq'][0:10]
    row[u'hjje'] = Num2MoneyFormat(row[u'je'])
    
    a = row[u'je']
    if a.find(u".")==-1:
        c = a+u'00'
    else:
        c = a.replace(u'.', u'')
    print c
    b = []
    for i in range(1,10):
        b.append(u'')
    b[10-len(c):10] = c[:]
    if len(a)<=9:
        b[10-len(c)-1] = u'￥'
    for i in range(1,11):
        print i
        row[u'je'+unicode(i)] = b[i-1]
        row[u'hjje'+unicode(i)] = b[i-1] 
    row[u'xj'] = u''    
    row[u'hk'] = u''  
    row[u'zp'] = u''  
    row[u'qt'] = u''              
    if row[u'fkfs'] == u'现金':
        row[u'xj'] = u'√'
    if row[u'fkfs'] == u'汇款':
        row[u'hk'] = u'√'
    if row[u'fkfs'] == u'支票':
        row[u'zp'] = u'√'
    if row[u'fkfs'] == u'其他':
        row[u'qt'] = u'√'                        
    print row   
    print row[u'fkfs']
    return dict(**row)

#########################
#主页
def tbzj():
    return dict();
#操作
def tbzjmx():
    if request.vars.oper == u'modify':
        return dict(title=u"修改", Id=request.vars.Id)
    if request.vars.oper == u'detail':
        return dict(title=u"详细", Id=request.vars.Id)    
    return dict(title=u"新增", Id=request.vars.Id)

#获取所有
def select_tbzj():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        
        dwmc = request.vars.dwmc
        if dwmc==None:
            dwmc=u''
        where += u"and dwmc like '%"+dwmc+u"%'"
        
        order = u" order by rq desc"
        sql = u"""select * from tbzj """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"
    
def updaterow_tbzj():
    try:
        table_name = u'tbzj'
        id = request.vars.Id
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        return u"success"
    except:
        return u"fail"
    
def insertrow_tbzj():
    try:
        table_name = u'tbzj'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow tbzj"
        print rowData
        insertrow(table_name, rowData)
        p_insertcwls(u'退保证金', id, u'支出',  rowData)
        return u"success"
    except:
        return u"fail"    

def deleterow_tbzj():
    try:
        table_name = u'tbzj'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        return u"success"
    except:
        return u"fail"   

def selectone_tbzj():
    try:
        table_name = u'tbzj'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);

    except:
        return u"fail"

#购买标书配置信息需定制
def gettbzjpz():
    uid = u'';
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(uid);
    result[u'fkfs'] = [u'现金', u'汇款', u'支票', u'其他']
    return json.dumps(result) 



########################################
#主页
def zb():
    return dict();
#操作
def zbmx():
    if request.vars.oper == u'modify':
        return dict(title=u"修改", Id=request.vars.Id)
    if request.vars.oper == u'detail':
        return dict(title=u"详细", Id=request.vars.Id)    
    return dict(title=u"新增", Id=request.vars.Id)

#获取所有
def select_zb():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        
        bsbh = request.vars.bsbh
        if bsbh==None:
            bsbh=u''
        where += u"and bsbh like '%"+bsbh+u"%'"
        
    
        zbdw1 = request.vars.zbdw1
        if zbdw1==None:
            zbdw1=u''
        where += u"and (zbdw1 like '%"+zbdw1+u"%'"
        where += u"or zbdw2 like '%"+zbdw1+u"%'"
        where += u"or zbdw3 like '%"+zbdw1+u"%')"
        
        order = u" order by rq desc"
        sql = u"""select * from zb """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"
    
def updaterow_zb():
    try:
        table_name = u'zb'
        id = request.vars.Id
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        return u"success"
    except:
        return u"fail"
    
def insertrow_zb():
    try:
        table_name = u'zb'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow zb"
        print rowData
        insertrow(table_name, rowData)
        return u"success"
    except:
        return u"fail"    

def deleterow_zb():
    try:
        table_name = u'zb'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        return u"success"
    except:
        return u"fail"

def selectone_zb():
    try:
        table_name = u'zb'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail"

def getzbpz():
    uid = u'';
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(uid);
    return json.dumps(result) 

def getttbzj_tbzj():
    uid = u''
    sql = u"""select a.*,b.rq as trq, ISNULL (b.je,0 ) as tje,b.fkfs,khyh,
CASE ISNULL (b.je,0 )
WHEN 0 THEN 0
ELSE 1 
end as returned,b.yhzh
from [dbo].[tbbzj] a left join [dbo].[tbzj] b
on a.dwmc = b.dwmc and a.bsbh = b.bsbh1 """;
    return sqltojson(sql)

#主页
def grtjb():
    return dict();
#获取所有
def select_grtjb():
    try:
        username = u'Test'
    #    where = u"where username='"+username+u"'"
        
    #    xm = request.vars.xm
    #    if xm==None:
    #        xm=u''
    #    where += u"and xm like '%"+xm+u"%'"
        
    
    #    gngk = request.vars.gngk
    #    if gngk==None:
    #        gngk=u''
    #    where += u"and gngk like '%"+gngk+u"%'"
        
    #    order = u" order by rq desc"
        ksrq = request.vars.ksrq
        jsrq = request.vars.jsrq
        if ksrq <> None:
            ksrq = ksrq[6:10]+u'-'+ksrq[3:5]+u'-'+ksrq[0:2]
        if jsrq <> None:
            jsrq = jsrq[6:10]+u'-'+jsrq[3:5]+u'-'+jsrq[0:2]
    
        sql = u"""select * from grtjb """ ;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"    

def select_grtjbfb():
    try:
        sql = u"""select * from grtjbfb """ ;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"    

def zzxmtjb():
    return dict();
 
def select_zzxmtjb():
    try:
        sql = u"""select * from grtjb """ ;
        print sql   
        return sqltojson(sql);   
    except:
        return u"fail"
    
def yhlswj():
    return dict()

def select_yhlswj():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        
        wjm = request.vars.wjm
        if wjm==None:
            wjm=u''
        where += u"and wjm like '%"+wjm+u"%'"
        
        order = u" order by rq desc"
        sql = u"""select * from yhlswj """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"    

def insertrow_yhlswj():
    try:
        table_name = u'yhlswj'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow yhlswj"
        print rowData
        insertrow(table_name, rowData)
        return u"success"
    except:
        return u"fail"        

def deleterow_yhlswj():

    try:    
        table_name = u'yhlswj'
        id = request.vars.Id
        row = db(db[table_name]._id ==id).select().first()
        print row[u'wjm']

        db((db.yhls.wjm == row[u'wjm'])&(db.yhls.wjmId==id)).delete()
    except Exception as e:
        print e

    return deleterow(table_name, id)
   

def selectone_yhlswj():
    table_name = u'yhlswj'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;


def fileUpload():
    f= request.vars.fileToUpload
    
    table_name = u'yhlswj'
    username = u'Test'
    rowData = {}
    rowData[u'username'] = username
    rowData[u'wjm'] = unicode(f.filename)
    print rowData
    id = db[table_name].insert(**rowData)    
    
    wb = xlrd.open_workbook(file_contents=f.value)
    sh = wb.sheet_by_index(0)

    for i in range(1, sh.nrows):
        row = sh.row_values(i)
        print row
        print type(xlrd.xldate.xldate_as_datetime(row[1], 1)) 
        rowData={}
        rowData[u'jysj'] = xlrd.xldate.xldate_as_datetime(row[1], 1)
        rowData[u'je'] = row[2]
        rowData[u'zy'] = row[3]
        rowData[u'dfmc'] = row[4]
        rowData[u'dfzh'] = row[5]
        rowData[u'qrje'] = 0
        rowData[u'cwqrje'] = 0
        rowData[u'wjm'] = unicode(f.filename)
        rowData[u'wjmId'] = id
        insertrow(u'yhls', rowData)
    print f.filename

    return u"success"

def yhls():
    return dict()

#获取所有
#获取所有
def select_yhls():
    try:
        username = u'Test'
        where = u"where "
        
        dfmc = request.vars.dfmc
        if dfmc==None:
            dfmc=u''
        where += u" dfmc like '%"+dfmc+u"%'"
        
    
        dfzh = request.vars.dfzh
        if dfzh==None:
            dfzh=u''
        where += u"and dfzh like '%"+dfzh+u"%'"
        
        order = u" order by jysj desc"
        sql = u"""select * from yhls """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"
    
def getyhlsqrpz():
    try:
        result = {};
        sql = u"""select dwmc from kh""";   
        result[u'dwmc'] = sqltoarraynodict(sql);    
        result[u'qrlx'] = [u'购买标书', u'保证金']
        return json.dumps(result)  
    except:
        return u"fail"    

def insertrow_yhlsqr():
    try:
        username = u'Test'
        rowData = request.post_vars
        table_name = u'yhls'
        yhlsId = rowData[u'yhlsId']
        print yhlsId
        row = db(db[table_name]._id ==yhlsId).select().first()
        print row
        if row[u'je']-row[u'qrje']<int(rowData[u'qrje']):
            return u"fail"
        row[u'qrje']+=int(rowData[u'qrje'])
        yhlsrow = {}
        yhlsrow[u'qrje'] = row[u'qrje']
        updaterow(table_name, yhlsId, yhlsrow)
        
        
        table_name = u'yhlsqr'
        rowData[u'username'] = username
        print u"insertrow yhlsqr"
        print rowData
        insertrow(table_name, rowData)
        return u"success"
    except Exception as e:
        print e
        return u"fail"
    
#获取所有
def select_yhlsqr():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        
        yhlsId = request.vars.yhlsId
        if yhlsId==None:
            yhlsId=u''
        where += u"and yhlsId = "+yhlsId
        
        order = u" order by rq desc"
        sql = u"""select * from yhlsqr """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"


def select_lxr():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        khId = request.vars.khId   
        where += u"and khId = "+khId 
        order = u" order by rq desc"
        sql = u"""select * from lxr """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"

def updaterow_lxr():
    try:
        table_name = u'lxr'
        id = request.vars.Id
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        return u"success"
    except:
        return u"fail"
    
def insertrow_lxr():
    try:
        table_name = u'lxr'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow lxr"
        print rowData
        insertrow(table_name, rowData)
        return u"success"
    except:
        return u"fail"
    
def deleterow_lxr():
    try:
        table_name = u'lxr'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        return u"success"
    except:
        return u"fail"   

def selectone_lxr():
    try:
        table_name = u'lxr'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail"


#主页
def cwls():
    return dict();
#操作
def cwlsmx():
    if request.vars.oper == u'modify':
        return dict(title=u"修改", Id=request.vars.Id)
    if request.vars.oper == u'detail':
        return dict(title=u"详细", Id=request.vars.Id)    
    return dict(title=u"新增", Id=request.vars.Id)

#获取所有
def select_cwls():
    try:
        username = u'Test'
        where = u"where username='"+username+u"'"
        
        bsbh = request.vars.bsbh
        if bsbh==None:
            bsbh=u''
        where += u"and bsbh like '%"+bsbh+u"%'"
    
        order = u" order by rq desc"
        sql = u"""select * from cwls """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail";

def updaterow_cwls():
    try:
        table_name = u'cwls'
        id = request.vars.d
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        return u"success";
    except:
        return u"fail";

def insertrow_cwls():
    try:
        table_name = u'cwls'
        username = u'Test'
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow cwls"
        print rowData
        insertrow(table_name, rowData)
        return u"success";
    except:
        return u"fail";

def deleterow_cwls():
    try:
        table_name = u'cwls'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        return u"success";
    except:
        return u"fail";
   

def selectone_cwls():
    try:
        table_name = u'cwls'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail";    

def getcwlspz():
    uid = u'';
    result = {};
    result[u'bsbh'] = p_getbsbh(uid);
    result[u'sz'] = [u'收入', u'支出']
    result[u'ywlx'] = [u'购买标书', u'投标保证金', u'退保证金', u'中标服务费', u'专家评审费', u'其他']
    return json.dumps(result)   
