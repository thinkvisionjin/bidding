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
CONST_MANAGER=2;
CONST_ADMIN = 1;
auth.settings.actions_disabled=['register','request_reset_password']
@auth.requires_login()
def index():
    """
    example action using the internationalization operator T and flash
    rendered by views/default/index.html or views/generic.html

    if you need a simple wiki simply replace the two lines below with:
    return auth.wiki()
    """
    response.flash = T("Hello World")
    return dict(chinesename=auth.user.chinesename.decode('gbk'))

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
    print row_data
#     for key in row_data:
#         print unicode(key)+u":"+unicode(row_data[key].decode('utf-8'))
    
    id = row_data['Id']
    try:
        for key in row_data:
            if key!='Id' and key!='uid':
                db(db[table_name]._id == id).update(**{key:unicode(row_data[key].decode('utf-8'))})
    except Exception as e:
        print e
    row = db(db[table_name]._id ==id).select().first()
    db.commit()
    dic_rows = []
    dict_row = {}
    try:
        print "get the updated record"
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
                    dict_row[key] = unicode(row[key])
           
        dic_rows.append(dict_row)
    except Exception as e:
        print e
    return json.dumps(dic_rows,ensure_ascii=False)

@auth.requires_login()
def select():
    table_name = request.vars.table
    print u'select data from:'  +table_name +'**************'
    dic_rows = []
    uid = auth.user_id
    if auth.user_groups.has_key(CONST_MANAGER) or auth.user_groups.has_key(CONST_ADMIN) :
        rows = db().select(db[table_name].ALL,orderby=~db[table_name].id)
    else:
        rows = db(db[table_name].EmployeeId==uid).select(db[table_name].ALL,orderby=~db[table_name].id)
    for row in rows:
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
    strSQL = u"select  Id,dwmc from [bidding].[dbo].[kh]"
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
    strSQL = u"select Id,ProtocolNumber from [bidding].[dbo].[ProtocolCode]"
    dictionaries["ProtocolCode"] = sqltojson(strSQL)
    return json.dumps(dictionaries,ensure_ascii=False)


def getDictionariesArray():
    dict=[]
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
    strSQL = u"select Id,ProtocolNumber from [bidding].[dbo].[ProtocolCode]"
    dictionaries["ProtocolCode"] = sqltojson(strSQL)
    dict.append(dictionaries)
    return dict

def mainframe():
    return dict();

def scheduler():
    return dict();

def upload():
    return dict();

def xybh():
    dictionaries = getDictionaries()
    return dict(dictionaries=dictionaries);
def xybh_ss():
    searchkey = request.vars.searchkey
    strSQL = u"select *  from [bidding].[dbo].[ProtocolCode] where  ProtocolNumber like '%" +unicode(searchkey)+u"%' order by Id desc";
    print  strSQL
    protocols=sqltojson(strSQL)
    return protocols

def xmbh():
    return dict();
def xmgl():
    dictionaries = getDictionaries()
    return dict(dictionaries=dictionaries);
def xmgl_ss():
    searchkey = request.vars.searchkey
    strSQL = u'''select  a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ManagementStyleId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete],
      count(b.Id) as PackageCount,
      count(b.Id) as DocumentBuyerCount,
      count(b.Id) as BidderCount,
      count(b.Id) as MarginCount,
      count(b.Id) as ReturnMarginCount,
      sum(isnull(b.EntrustMoney,0)) as EntrustMoney,
      sum(isnull(b.WinningMoney,0)) as WinningMoney 
      from [dbo].[Project] a left join [dbo].[ProjectPackage] b on a.id= b.ProjectId ''' + searchkey.decode(u'utf-8') + u''' group by a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ManagementStyleId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete]
      order by a.[Id] desc ''' 
    print  strSQL
    protocols=sqltojson(strSQL)
    return protocols


def xmglmx():
    id = request.vars.id
    strSQL = u"select top 1 *  from [bidding].[dbo].[Project] where  Id = " +id;
    project=sqltojson(strSQL)
    dictionaries = getDictionaries()
    return dict(project=project,dictionaries=dictionaries)

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

@auth.requires_login()
def SelectProjectsSummary():
    uid = auth.user_id
    searchkey = request.vars.searchkey
    tj=u''
    if auth.user_groups.has_key(CONST_MANAGER) or auth.user_groups.has_key(CONST_ADMIN):
        tj = u'where 1=1 '
    else:
        tj = u'where a.EmployeeId = ' + unicode(uid) + u' or Assistant = ' + unicode(uid)
        
    if searchkey != None:
        tj += u" and "+ searchkey.decode(u'utf-8')
        
    strSQL = u'''select  a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ManagementStyleId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete],
      count(distinct b.Id) as PackageCount,
      count(distinct c.Id) as DocumentBuyerCount,
      count(distinct d.Id) as BidderCount,
      count(distinct d.Id) as MarginCount,
      count(distinct e.Id) as ReturnMarginCount,
      sum(isnull(b.EntrustMoney,0)) as EntrustMoney,
      sum(isnull(b.WinningMoney,0)) as WinningMoney 
      from [dbo].[Project] a 
      left join [dbo].[ProjectPackage] b on a.id= b.ProjectId 
      left join [dbo].[GMBS] c on b.PackageNumber = c.bsbh
      left join [dbo].[tbbzj] d on d.bsbh = c.bsbh
      left join [dbo].[tbzj] e on e.bsbh = d.bsbh  ''' + tj + u''' group by a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ManagementStyleId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete] order by a.[Id] desc'''
    
    print strSQL
    return  sqltojson(strSQL)

@auth.requires_login()
def gmbs():
    return dict();

def CreateNewProject():
    print u'CreateNewPackage'
    rowData = request.post_vars
    print rowData
    for key in rowData:
        rowData[key] = rowData[key].decode(u'utf-8')
    id = db[u'Project'].insert(**rowData)
    print id 
    db.commit()
    updateProjectStr = u"update [bidding].[dbo].[Project]  set ProjectCode = '"+GenerateProjectCode(rowData,id)+u"' where id ="+unicode(id)
    print updateProjectStr
    db.executesql(updateProjectStr)
    db.commit()
    row = db(db[u'Project']._id ==id).select().first()
    print row
    initPackage = {}
    initPackage[u"ProjectId"] = id
    initPackage[u"PackageNumber"] = unicode(row["ProjectCode"])+u'-01'
    initPackage[u"PackageName"] = row["ProjectName"].decode(u'utf-8')
    initPackage[u"StateId"] = row["ProjectStatusId"]
    initPackage[u"IsDelete"] = '0'
    CreateNewPackage(initPackage)
    dict_row = {}
    for key in row.keys():
        if (key!= u'update_record' and key!= u'delete_record'):
                if key==u'id':
                    dict_row[u'Id']  = row[key]
                elif isinstance(row[key], bool):
                    dict_row[key] = row[key]
                elif isinstance(row[key], str):
                    dict_row[key] = row[key].decode(u'utf-8')
                elif isinstance(row[key], datetime):
                    dict_row[key] = unicode(row[key])
                else:
                    dict_row[key] = row[key]
    result= json.dumps(dict_row,ensure_ascii=False)
    return result

def CreateNewPackage(rowData):
    print u'CreateNewPackage'
    print rowData
    for key in rowData:
        rowData[key] = rowData[key]
    id = db['ProjectPackage'].insert(**rowData)
    print id 
    db.commit()
#     updateProjectStr = u"update [bidding].[dbo].[Project]  set ProjectCode = '"+GenerateProjectCode(rowData,id)+u"' where id ="+unicode(id)
#     print updateProjectStr
#     db.executesql(updateProjectStr)
#     db.commit()
    row = db(db['ProjectPackage']._id ==id).select().first()
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
                elif isinstance(row[key], str):
                    print row[key]
                    dict_row[key] = row[key].decode(u'gbk')
                else:
                    dict_row[key] = row[key]#.decode(decode);
            else:
                dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return json.dumps(dic_rows).replace(u'None', u'') 

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
            if isinstance(row[key], str):
                dict_row[key] = row[key].decode('gbk')
            else:
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

   


def deleterow(table_name, id):
    db(db[table_name]._id == id).delete()


def p_getbsbh(projectid=None):
    uid = auth.user_id
    tj = u''
    if auth.user_groups.has_key(CONST_MANAGER) or auth.user_groups.has_key(CONST_ADMIN) :
        tj_uid = u'1=1'
    else:
        tj_uid = u'''( EmployeeId='''+unicode(uid)+u''' or Assistant='''+unicode(uid)+u''')'''
    if projectid != None:
        tj = u""" and b.ProjectId = """+unicode(projectid)
    sql = u"""select b.PackageNumber FROM [Project] a, ProjectPackage b   
    where """+ tj_uid+u""" and a.Id=b.ProjectId and b.stateid=1 """+tj;
    print sql
    return sqltoarraynodict(sql);

#购买标书代码
#定制代码
def getkh():
    dwmc = unicode(request.vars.dwmc, u'utf-8')
    sql = u"""select * from kh where dwmc='"""+dwmc+u"'";
    
    row = db(db[u'kh'].dwmc == dwmc).select().first()
    
    khId = row[u'id']
    result = {};
    sql = u"""select lxr from lxr where khId="""+unicode(khId);   
    result[u'lxr'] =  sqltoarraynodict(sql);    
    sql = u"""select sj from lxr where khId="""+unicode(khId);   
    result[u'sj'] =  sqltoarraynodict(sql);
    result[u'khyh'] = row[u'khyh']
    result[u'yhzh'] = row[u'yhzh']       
    return json.dumps(result)

#购买标书配置信息需定制
def getgmbspz():
    uid = auth.user_id;
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(request.vars.projectid);
    return json.dumps(result)   

#主页
@auth.requires_login()
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
    
    
    if request.vars.dwmc==None:
        dwmc=u''
    else:
        dwmc = unicode(request.vars.dwmc, u'utf-8')
    if request.vars.bsbh==None:
        bsbh=u''
    else:
        bsbh = unicode(request.vars.bsbh, u'utf-8')
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
        username = auth.user.chinesename.decode('gbk')
  
        if request.vars.dwmc==None:
            dwmc=u''
        else:
            dwmc = unicode(request.vars.dwmc, u'utf-8')
        if request.vars.bsbh==None:
            bsbh=u''
        else:
            bsbh = unicode(request.vars.bsbh, u'utf-8')
        if auth.user_groups.has_key(CONST_MANAGER):
            where = u"where 1=1 "
        else:
            where = u"where username='"+username+u"'"
        where += u"and dwmc like '%"+dwmc+u"%'"
        where += u"and bsbh like '%"+bsbh+u"%'"
        order = u" order by rq desc"
        sql = u"""select * from gmbs """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"    
    
def select_gmbsbyProjectId():
    try:
        projectid  = request.vars.id
        strsql = u'select * from GMBS where bsbh in (select PackageNumber from ProjectPackage where ProjectId ='+ projectid+u') order by rq desc' 
        return sqltojson(strsql);
    except:
        return u"fail"   

def p_updaterow_gmbs(id, rowData):
    table_name = u'gmbs'
    updaterow(table_name, id, rowData)
    p_updatecwls(u'购买标书', id,  rowData)   
    p_addkh(rowData) 

def updaterow_gmbs():
    try:
        print u'updaterow_gmbs'
        
        id = request.vars.Id
        rowData = request.post_vars
        print rowData
        p_updaterow_gmbs(id,rowData)
        db.commit()
        return u"success"
    except:
        db.rollback()
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
    
def p_updatecwls(ywlx, id, rowData):
    table_name = u'cwls'
    row = {}
    row[u'bsbh'] = rowData[u'bsbh']
    row[u'je'] = rowData[u'je']
    row[u'username'] = rowData[u'username']
    db((db[table_name].lyId == id)&(db[table_name].ywlx==ywlx)).update(**row)

def p_deletecwls(ywlx, id):
    table_name = u'cwls'
    db((db[table_name].lyId == id)&(db[table_name].ywlx==ywlx)).delete()

def p_insertrow_gmbs(rowData):
    table_name = u'gmbs'
    print u"insertrow gmbs"
    print rowData
    id = insertrow(table_name, rowData)
    p_addkh(rowData)
    p_insertcwls(u'购买标书', id, u'收入',  rowData)

def insertrow_gmbs():
    try:
        username = auth.user.chinesename.decode('gbk')
#         username = auth.user.username
        rowData = request.post_vars
        rowData[u'username'] = username
        p_insertrow_gmbs(rowData)
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"

def p_deleterow_gmbs(id):
    table_name = u'gmbs'
    print table_name
    deleterow(table_name, id)
    p_deletecwls(u'购买标书',id)
        
def deleterow_gmbs():
    try:
        
        id = request.vars.Id
        p_deleterow_gmbs(id)
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
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
@auth.requires_login()
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
        #username = auth.user.chinesename.decode('gbk')
        #where = u"where username='"+username+u"'"
        where = u'where 1=1 '
        if request.vars.dwmc==None:
            dwmc=u''
        else:
            dwmc = unicode(request.vars.dwmc, u'utf-8')

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
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"

def insertrow_kh():
    try:
        table_name = u'kh'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow kh"
        print rowData
        insertrow(table_name, rowData)
        db.commit()
        return u"success"
    
    except:
        db.rollback()
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
        db.commit()
        return u"success"
    except:
        db.rollback()
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
        username = auth.user.chinesename.decode('gbk')
        if auth.user_groups.has_key(CONST_MANAGER):
            where = u"where 1=1 "
        else:
            where = u"where username='"+username+u"'"
        
        if request.vars.dwmc==None:
            dwmc=u''
        else:
            dwmc = unicode(request.vars.dwmc, u'utf-8')
        where += u"and dwmc like '%"+dwmc+u"%' "    
        if request.vars.bsbh==None:
            bsbh=u''
        else:
            bsbh = unicode(request.vars.bsbh, u'utf-8')
        where += u"and bsbh like '%"+bsbh+u"%' "
        
        order = u" order by rq desc"
        sql = u"""select * from tbbzj """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"
def p_updaterow_tbbzj(id, rowData):
    table_name = u'tbbzj'
    updaterow(table_name, id, rowData)
    p_updatecwls(u'投标保证金', id, rowData)    
    
def updaterow_tbbzj():
    try:
        id = request.vars.Id
        rowData = request.post_vars
        p_updaterow_tbbzj(id, rowData)
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"    
def p_insertrow_tbbzj(rowData):
    table_name = u'tbbzj'
    print u"insertrow tbbzj"
    print rowData
    id = insertrow(table_name, rowData)
    p_insertcwls(u'投标保证金', id, u'收入',  rowData)    
    
def insertrow_tbbzj():
    try:
        
        username = auth.user.chinesename.decode('gbk')
#         username = auth.user.username
        rowData = request.post_vars
        rowData[u'username'] = username
        p_insertrow_tbbzj(rowData)
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"
    
def p_deleterow_tbbzj(id):
    table_name = u'tbbzj'
    deleterow(table_name, id)
    p_deletecwls(u'投标保证金', id)
    
def deleterow_tbbzj():
    try:
        id = request.vars.Id
        print id
        p_deleterow_tbbzj(id)
        db.commit()
        return u"success"
    except:
        db.rollback()
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
        result = {};
        sql = u"""select dwmc from kh""";   
        result[u'dwmc'] = sqltoarraynodict(sql);
    
        result[u'bsbh'] = p_getbsbh(request.vars.projectid)
        result[u'bzjlx'] = [u'现金', u'汇款', u'支票', u'其他']
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
        username = auth.user.chinesename.decode('gbk')
        if auth.user_groups.has_key(CONST_MANAGER):
            where = u"where 1=1 "
        else:
            where = u"where username='"+username+u"'"
        
        if request.vars.dwmc==None:
            dwmc=u''
        else:
            dwmc = unicode(request.vars.dwmc, u'utf-8')
        where += u"and dwmc like '%"+dwmc+u"%' "    
        if request.vars.bsbh==None:
            bsbh=u''
        else:
            bsbh = unicode(request.vars.bsbh, u'utf-8')
        where += u"and bsbh like '%"+bsbh+u"%' "
        
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
        p_updatecwls(u'退保证金', id, rowData)
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"
    
def insertrow_tbzj():
    try:
        table_name = u'tbzj'
        username = auth.user.chinesename.decode('gbk')
#         username = auth.user.username
        rowData = request.post_vars
        
        rowData[u'username'] = username
        print u"insertrow tbzj"
        print rowData
        id = insertrow(table_name, rowData)
        p_insertcwls(u'退保证金', id, u'支出',  rowData)
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"    

def deleterow_tbzj():
    try:
        table_name = u'tbzj'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        p_deletecwls(u'退保证金', id)
        db.commit()
        return u"success"
    except:
        db.rollback()
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
    uid = auth.user_id;
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(request.vars.projectid)
    result[u'fkfs'] = [u'现金', u'汇款', u'支票', u'其他']
    
    tbbzjid = request.vars.tbbzjid
    if tbbzjid==None:
        bsbh=u''
    else:
        table_name = u'tbbzj'
        sql = u"""select a.*, b.khyh, b.yhzh from tbbzj a, kh b where a.dwmc=b.dwmc and a.Id="""+tbbzjid;
        result[u'tbbzjid'] = sqltoarray(sql);  
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
        username = auth.user.chinesename.decode('gbk')
        where = u"where username='"+username+u"'"
        
        bsbh = request.vars.bsbh
        if bsbh==None:
            bsbh=u''
        where += u"and bsbh like '%"+bsbh+u"%'"
        
    
        zbdw1 = unicode(request.vars.zbdw1, u'utf-8')
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
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"
    
def insertrow_zb():
    try:
        table_name = u'zb'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow zb"
        print rowData
        insertrow(table_name, rowData)
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"    

def deleterow_zb():
    try:
        table_name = u'zb'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"

def selectone_zb():
    try:
        table_name = u'zb'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail"

def getzbpz():
    uid = auth.user_id;
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(request.vars.projectid)
    return json.dumps(result) 

def getttbzj_tbzjByProjectId():
    projectid = request.vars.id
    uid = u''
    sql = u"""select a.*,b.rq as trq, ISNULL (b.je,0 ) as tje,b.fkfs,khyh,
CASE ISNULL (b.je,0 )
WHEN 0 THEN 0
ELSE 1 
end as returned,b.yhzh
from [dbo].[tbbzj] a left join [dbo].[tbzj] b
on a.dwmc = b.dwmc and a.bsbh = b.bsbh
where a.bsbh in (select PackageNumber from ProjectPackage where ProjectId = """ + projectid + u")";
    return sqltojson(sql)

def getContactsByProjectID():
    uid = u''
    pid = request.vars.pid
    sql = u'select dwmc, lxr,lxdz,sj,dzxx,cz from gmbs where bsbh in (select PackageNumber from ProjectPackage where ProjectId ='+pid+u')';
    return sqltojson(sql)

def getFinanceByProjectID():
    uid = u''
    pid = request.vars.pid
    sql = u'select sz,ywlx,sum(je) as je from cwls where bsbh in (select PackageNumber from ProjectPackage where ProjectId = '+pid+u') group by sz,ywlx'
#     sql = u'select sz,ywlx,sum(je) as je from cwls  group by sz,ywlx '
    res = sqltoarray(sql)
    finance={}
    for row in res:
        if row['ywlx'] == u'专家评审费':
            finance["zc_pqzjf"] = unicode(row['je'])
        elif row['ywlx']  == u'退保证金':
            finance["zc_tbzj"] = unicode(row['je'])
        elif row['ywlx']  == u'项目分成费':
            finance["zc_xmfc"] = unicode(row['je'])
        elif row['sz'] ==u'支出' and row['ywlx']  == u'其他':
            finance["zc_qt"] = unicode(row['je'])
        elif row['ywlx'] == u'购买标书':
            finance["sr_bssr"] = unicode(row['je'])
        elif row['sz'] ==u'收入' and row['ywlx']  == u'其他':
            finance["sr_qt"] = unicode(row['je'])
        elif row['ywlx'] == u'投标保证金':
            finance["sr_tbbzj"] = unicode(row['je'])
        elif row['ywlx']  == u'委托协议':
            finance["sr_wtxy"] = unicode(row['je'])
        elif row['ywlx']  == u'中标服务费':
            finance["sr_zbfwf"] = unicode(row['je'])
    res.append(finance)
    return json.dumps(finance)

#主页
def grtjb():
    return dict();
#获取所有
def select_grtjb():
    try:
        username = auth.user.chinesename.decode('gbk')
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
@auth.requires_login()    
def yhlswj():
    return dict()

def select_yhlswj():
    try:
        username = auth.user.chinesename.decode('gbk')
        if auth.user_groups.has_key(CONST_MANAGER):
            where = u"where 1=1 "
        else:
            where = u"where username='"+username+u"'"
        
        
        if request.vars.wjm==None:
            wjm=u''
        else:
            wjm = unicode(request.vars.wjm, u'utf-8')
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
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow yhlswj"
        print rowData
        insertrow(table_name, rowData)
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"        

def deleterow_yhlswj():

    try:    
        table_name = u'yhlswj'
        id = request.vars.Id
        row = db(db[table_name]._id ==id).select().first()
        print row[u'wjm']
        
        db((db.yhls.wjm == row[u'wjm'])&(db.yhls.wjmId==id)).delete()
        deleterow(table_name, id)
        db.commit()
        return u"success"
    except Exception as e:
        db.rollback()
        print e
        return u"fail"


def selectone_yhlswj():
    table_name = u'yhlswj'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;

def fileUpload():
    try:
        f= request.vars.fileToUpload
        table_name = u'yhlswj'
        username = auth.user.chinesename.decode('gbk')
        rowData = {}
        rowData[u'username'] = username
        rowData[u'wjm'] = unicode(f.filename, u'utf-8')
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
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"
@auth.requires_login()    
def yhls():
    return dict()
@auth.requires_login()
def yhlsqr():
    return dict()
#获取所有
#获取所有
def select_yhls():
    try:
        username = auth.user.chinesename.decode('gbk')
        where = u"where "
        
        
        if request.vars.dfmc==None:
            dfmc=u''
        else:
            dfmc = unicode(request.vars.dfmc, u'utf-8')
        where += u" dfmc like '%"+dfmc+u"%'"
        
    
        if request.vars.dfzh==None:
            dfzh=u''
        else:
            dfzh=unicode(request.vars.dfzh, u'utf-8')
        where += u"and dfzh like '%"+dfzh+u"%'"

        
        if request.vars.wjm==None:
            wjm=u''
        else:
            wjm = unicode(request.vars.wjm, u'utf-8')
        where += u"and wjm like '%"+wjm+u"%'"        
        order = u" order by jysj desc"
        sql = u"""select * from yhls """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"
    
def getyhlsqrpz():
    try:
        result = {};
        uid = auth.user_id;
        sql = u"""select dwmc from kh""";   
        result[u'dwmc'] = sqltoarraynodict(sql);    
        sql = u"""select distinct wjm from yhls""";   
        result[u'wjm'] = sqltoarraynodict(sql);          
        result[u'bsbh'] = p_getbsbh(request.vars.projectid);
        result[u'qrlx'] = [u'购买标书', u'投标保证金']
        return json.dumps(result)  
    except:
        return u"fail"    

def insertrow_yhlsqr():
    try:
        username = auth.user.chinesename.decode('gbk')
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
        id = insertrow(table_name, rowData)
##########gmbs###############
        if rowData[u'qrlx'] == u'购买标书':
            gmbsrow = {}
            gmbsrow[u'lyId'] = id
            gmbsrow[u'dwmc'] = rowData[u'dwmc']
            gmbsrow[u'bsbh'] = rowData[u'bsbh']
            gmbsrow[u'je'] = rowData[u'qrje']
            gmbsrow[u'username'] = username
            gmbsrow[u'ly'] = u'交易流水确认'
            gmbsrow[u'lxr'] = u''
            gmbsrow[u'sj'] = u''
            p_insertrow_gmbs(gmbsrow)
        if rowData[u'qrlx'] == u'投标保证金':
            tbbzjrow = {}
            tbbzjrow[u'lyId'] = id
            tbbzjrow[u'dwmc'] = rowData[u'dwmc']
            tbbzjrow[u'bsbh'] = rowData[u'bsbh']
            tbbzjrow[u'ly'] = u'交易流水确认'
            tbbzjrow[u'je'] = rowData[u'qrje']
            tbbzjrow[u'username'] = username
            p_insertrow_tbbzj(tbbzjrow)             
#########################

        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"

def updaterow_yhlscwqr():
    try:
        id = request.vars.Id
        table_name = u'yhlsqr'
        row = {}
        row[u'cwqrbz'] = u'确认'
        updaterow(table_name, id, row)

        row = db(db[table_name]._id ==id).select().first()   
        qrje = row[u'qrje']     
        
        table_name = u'yhls'
        yhlsId = request.vars.yhlsId
        row = db(db[table_name]._id ==yhlsId).select().first()
        print row
        row[u'cwqrje']+=int(qrje)
        yhlsrow = {}
        yhlsrow[u'cwqrje'] = row[u'cwqrje']
        updaterow(table_name, yhlsId, yhlsrow)
#########################

#########################
        db.commit()   
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"

def updaterow_yhlscwqxqr():
    try:
        id = request.vars.Id
        table_name = u'yhlsqr'
        row = {}
        row[u'cwqrbz'] = u'未确认'
        updaterow(table_name, id, row)
        
        row = db(db[table_name]._id ==id).select().first()   
        qrje = row[u'qrje']     
        
        table_name = u'yhls'
        yhlsId = request.vars.yhlsId
        row = db(db[table_name]._id ==yhlsId).select().first()
        print row
        row[u'cwqrje']-=int(qrje)
        yhlsrow = {}
        yhlsrow[u'cwqrje'] = row[u'cwqrje']
        updaterow(table_name, yhlsId, yhlsrow)  
        db.commit()         
        return u"success"
    except Exception as e:
        db.rollback()
        print e
        return u"fail"

def updaterow_yhlsqr():
    try:
        username = auth.user.chinesename.decode('gbk')
        id = request.vars.Id
        rowData = request.post_vars
        table_name = u'yhlsqr'
        row = db(db[table_name]._id ==id).select().first()
        qrlx = row[u'qrlx']
        before_qrje = row[u'qrje']
          
        table_name = u'yhls'
        yhlsId = rowData[u'yhlsId']
        print yhlsId
        row = db(db[table_name]._id ==yhlsId).select().first()
        print row
        if row[u'je']-row[u'qrje']+before_qrje<int(rowData[u'qrje']):
            return u"fail"
        row[u'qrje']+=int(rowData[u'qrje'])-before_qrje
        yhlsrow = {}
        yhlsrow[u'qrje'] = row[u'qrje']
        updaterow(table_name, yhlsId, yhlsrow)
       
        table_name = u'yhlsqr'
        print u"update yhlsqr"
        print rowData
        updaterow(table_name, id, rowData)
        print u'............'
############################
        if rowData[u'qrlx'] == u'购买标书':
            gmbsrow = {}
            gmbsrow[u'lyId'] = id
            gmbsrow[u'dwmc'] = rowData[u'dwmc']
            gmbsrow[u'bsbh'] = rowData[u'bsbh']
            gmbsrow[u'je'] = rowData[u'qrje']
            gmbsrow[u'username'] = username
            gmbsrow[u'ly'] = u'交易流水确认'
            gmbsrow[u'lxr'] = u''
            gmbsrow[u'sj'] = u''            
            
            if rowData[u'qrlx']==unicode(qrlx, u'utf-8'):
                row = db(db.gmbs.lyId == id).select().first()
                p_updaterow_gmbs(row[u'id'], gmbsrow)
            else:
                row = db(db.tbbzj.lyId == id).select().first()
                p_deleterow_tbbzj(row[u'id'])
                p_insertrow_gmbs(gmbsrow)
        if rowData[u'qrlx'] == u'投标保证金':
            tbbzjrow = {}
            tbbzjrow[u'lyId'] = id
            tbbzjrow[u'dwmc'] = rowData[u'dwmc']
            tbbzjrow[u'bsbh'] = rowData[u'bsbh']
            tbbzjrow[u'ly'] = u'交易流水确认'
            tbbzjrow[u'je'] = rowData[u'qrje']
            tbbzjrow[u'username'] = username
            if rowData[u'qrlx']==unicode(qrlx, u'utf-8'):
                row = db(db.tbbzj.lyId == id).select().first()
                p_updaterow_tbbzj(row[u'id'], tbbzjrow) 
            else:
                row = db(db.gmbs.lyId == id).select().first()
                p_deleterow_gmbs(row[u'id'])
                p_insertrow_tbbzj(tbbzjrow)            
  
############################        
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"

def deleterow_yhlsqr():
    try:
        table_name = u'yhlsqr'
        id = request.vars.Id
        row = db(db[table_name]._id ==id).select().first()
        qrlx = row[u'qrlx']
        qrje = row[u'qrje']
        table_name = u'yhls'
        yhlsId = row[u'yhlsId']
        row = db(db[table_name]._id ==yhlsId).select().first()
        row[u'qrje']-=qrje
        print row[u'qrje']
        yhlsrow = {}
        yhlsrow[u'qrje'] = row[u'qrje']
        updaterow(table_name, yhlsId, yhlsrow)        
        print table_name
        print id
        table_name = u'yhlsqr'
        deleterow(table_name, id)
######################
        if qrlx == u'购买标书':
            trow = db(db.gmbs.lyId == id).select().first()
            p_deleterow_gmbs(trow[u'id'], gmbsrow)
        if qrlx == u'投标保证金':
            trow = db(db.tbbzj.lyId == id).select().first()
            p_deleterow_tbbzj(trow[u'id'], tbbzjrow)   
######################        
        db.commit()
        return u"success";
    except Exception as e:
        print e
        db.rollback()
        return u"fail";
    
#获取所有
def select_yhlsqr():
    try:
        print u'select_yhlsqr'
        username = auth.user.chinesename.decode('gbk')
        if auth.user_groups.has_key(CONST_MANAGER):
            where = u"where 1=1 "
        else:
            where = u"where username='"+username+u"'"        
        


        if request.vars.yhlsId==None:
            yhlsId=u''
        else:
            yhlsId = unicode(request.vars.yhlsId, u'utf-8')
            where += u"and yhlsId ="+yhlsId + u" "       
        
        if request.vars.dwmc==None:
            dwmc=u''
        else:
            dwmc = unicode(request.vars.dwmc, u'utf-8')
            where += u"and dwmc like '%"+dwmc + u"%' "

        if request.vars.wjm==None:
            wjm=u''
        else:
            wjm = unicode(request.vars.wjm, u'utf-8')
            where += u"and yhlsId in (select Id from yhls where wjm='"+wjm+u"')"        
        order = u" order by rq desc"
        sql = u"""select * from yhlsqr """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"

def selectone_yhlsqr():
    try:
        table_name = u'yhlsqr'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail";
    
def select_lxr():
    try:
        username = auth.user.chinesename.decode('gbk')
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
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"
    
def insertrow_lxr():
    try:
        table_name = u'lxr'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow lxr"
        print rowData
        insertrow(table_name, rowData)
        db.commit()
        return u"success"
    except:
        db.rollback()
        return u"fail"
    
def deleterow_lxr():
    try:
        table_name = u'lxr'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        db.commit()
        return u"success"
    except:
        db.rollback()
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
        username = auth.user.chinesename.decode('gbk')
        if auth.user_groups.has_key(CONST_MANAGER):
            where = u"where 1=1 "
        else:
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
        id = request.vars.Id
        rowData = request.post_vars
        updaterow(table_name, id, rowData)
        db.commit()
        return u"success";
    except:
        db.rollback()
        return u"fail";

def insertrow_cwls():
    try:
        table_name = u'cwls'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow cwls"
        print rowData
        insertrow(table_name, rowData)
        db.commit()
        return u"success";
    except Exception as e:
        print e 
        db.rollback()
        return u"fail";

def deleterow_cwls():
    try:
        table_name = u'cwls'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        db.commit()
        return u"success";
    except:
        db.rollback()
        return u"fail";
   

def selectone_cwls():
    try:
        table_name = u'cwls'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail";    

def getcwlspz():
    uid = auth.user_id;
    result = {};
    result[u'bsbh'] = p_getbsbh(request.vars.projectid);
    result[u'sz'] = [u'收入', u'支出']
    result[u'ywlx'] = [u'购买标书', u'投标保证金', u'退保证金', u'中标服务费', u'专家评审费', u'其他']
    return json.dumps(result)   



############
def pbcy():
    return dict();
#操作
def pbcymx():
    if request.vars.oper == u'modify':
        return dict(title=u"修改", Id=request.vars.Id)
    if request.vars.oper == u'detail':
        return dict(title=u"详细", Id=request.vars.Id)    
    return dict(title=u"新增", Id=request.vars.Id)

#获取所有
def select_pbcy():
    try:
        username = auth.user.chinesename.decode('gbk')
        where = u"where username='"+username+u"'"
        
        bsbh = request.vars.bsbh
        if bsbh==None:
            bsbh=u''
        where += u"and bsbh like '%"+bsbh+u"%'"
    
        order = u" order by rq desc"
        sql = u"""select * from pbcy """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail";

def updaterow_pbcy():
    try:
        table_name = u'pbcy'
        id = request.vars.Id
        rowData = request.post_vars
        
        updaterow(table_name, id, rowData)
        rowData[u'je'] = rowData[u'zfy']
        p_updatecwls(u'专家评审费',id, rowData)
        db.commit()
        return u"success";
    except:
        db.rollback()
        return u"fail";

def insertrow_pbcy():
    try:
        table_name = u'pbcy'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        print u"insertrow pbcy"
        print rowData
        id = insertrow(table_name, rowData)
        rowData[u'je'] = rowData[u'zfy']
        p_insertcwls(u'专家评审费', id, u'支出',  rowData)
        db.commit()
        return u"success";
    except:
        db.rollback()
        return u"fail";

def deleterow_pbcy():
    try:
        table_name = u'pbcy'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        p_deletecwls(u'专家评审费',id)
        db.commit()
        return u"success";
    except:
        db.rollback()
        return u"fail";
   

def selectone_pbcy():
    try:
        table_name = u'pbcy'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail";

def getpbcypz():
    uid = auth.user_id;
    result = {};
    sql = u"""select * from zj""";   
    result[u'zj'] = sqltoarray(sql);

    result[u'bsbh'] = p_getbsbh(request.vars.projectid);
    return json.dumps(result)  


############################
#获取所有
def select_rcb():
    try:
        username = auth.user.chinesename.decode('gbk')

        
        order = u" order by rq desc"
        sql = u"""select * from rcb """ + order;
        print sql   
        return sqltojson(sql).replace(u'"rcbid"', u'"id"');
    except:
        return u"fail";
    
def insertrow_rcb():
    try:
        table_name = u'rcb'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        row = {}
        row[u'rcbid'] = rowData[u'id']
        row[u'applyuser'] = username
        row[u'rcbstart'] = rowData[u'start']
        row[u'rcbend'] = rowData[u'end']
        row[u'subject'] = rowData[u'subject']
        row[u'description'] = rowData[u'description']
        row[u'calendar'] = rowData[u'calendar']
        row[u'bsbh'] = rowData[u'bsbh']
        print u"insertrow rcb"
        print row
        insertrow(table_name, row)
        db.commit()
        return u"success";
    except Exception as e:
        print e
        db.rollback()
        return u"fail";    
    
def updaterow_rcb():
    try:
        table_name = u'rcb'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        row = {}
        id = rowData[u'id']
        row[u'applyuser'] = username
        row[u'rcbstart'] = rowData[u'start']
        row[u'rcbend'] = rowData[u'end']
        row[u'subject'] = rowData[u'subject']
        row[u'description'] = rowData[u'description']
        row[u'calendar'] = rowData[u'calendar']
        row[u'bsbh'] = rowData[u'bsbh']
        print u"updaterow rcb"
        print row
        for k in row.keys():
            if isinstance(row[k], str):
                row[k] = unicode(row[k], u'utf-8')        
        db(db[table_name].rcbid == id).update(**row)
        db.commit()
        return u"success";
    except Exception as e:
        print e
        db.rollback()
        return u"fail";        
    
    
def deleterow_rcb():
    try:
        table_name = u'rcb'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars

        id = unicode(rowData[u'id']);
        db(db[table_name].rcbid == id).delete()
        return u"success";
    except Exception as e:
        print e
        db.rollback()
        return u"fail";            
    
    
#主页
@auth.requires(auth.has_membership(group_id='2'))
def auth_user():
    return dict();

def select_auth_user():
    try:
        
        if request.vars.username==None:
            username=u''
        else:
            username = unicode(request.vars.username, u'utf-8')    
        where = u"and username like '%"+username+u"%'"
    


        if request.vars.chinesename==None:
            chinesename=u''
        else:
            chinesename = unicode(request.vars.chinesename, u'utf-8')
        where += u"and chinesename like '%"+chinesename+u"%'"        
        sql = u"""select a.*, b.role as role from auth_user a, auth_group b, auth_membership c
         where a.id=c.user_id and c.group_id = b.id """ +where ;
        print sql   
        return sqltojson(sql, u'utf-8');
    except Exception as e:
        print e
        return u"fail";
def getauth_userpz():
    result = {};
    sql = u"""select id,role from auth_group""";   
    result[u'role'] = sqltoarray(sql);    
    return json.dumps(result)

def testcypt():
    crypt = CRYPT()(u'public')[0]
    str = 'pbkdf2(1000,20,sha512)$834ee4458f59522a$9dce6b33f65c5b548b444b64c3cc3547bf29a19a'
    if crypt == str:
        return u'success'
    else:
        return u'fail'
    return unicode(str(CRYPT(salt=u'834ee4458f59522a')(u'public')[0]), u'utf-8')


def insertrow_auth_user():
    try:
        table_name = u'auth_user'
        row={}
        rowData = request.post_vars
        row[u'username'] = rowData[u'username']
        row[u'chinesename'] = rowData[u'chinesename']

#        row[u'password'] = str(CRYPT()(rowData[u'password'])[0])
        print u"insertrow auth_user"
        print row
        id = insertrow(table_name, row)
        table_name = u'auth_membership'
        row={}
        row[u'user_id'] = id
        row[u'group_id'] = rowData[u'role']
        insertrow(table_name, row)
        db.commit()
        return u"success";
    except Exception as e:
        db.rollback()
        print e
        return u"fail";
    
def selectone_auth_user():
    try:
        table_name = u'auth_user'
        sql = u"""select a.*, b.id as role from auth_user a, auth_group b, auth_membership c
         where a.id=c.user_id and c.group_id = b.id and a.Id="""+request.vars.Id;
        return sqltojson(sql, u'utf-8');
    except:
        return u"fail";

def updaterow_auth_user():
    try:
        table_name = u'auth_user'
        id = request.vars.Id
        row={}
        rowData = request.post_vars
        row[u'username'] = rowData[u'username']
        row[u'chinesename'] = rowData[u'chinesename']
        updaterow(table_name, id, row)
        table_name = u'auth_membership'
        row={}
        row[u'group_id'] = rowData[u'role']
        db(db[table_name].user_id == id).update(**row)
        db.commit()
        return u"success";
    except:
        db.rollback()
        return u"fail";
    
def updaterow_password_auth_user():
    try:
        table_name = u'auth_user'
        id = request.vars.Id
        rowData = request.post_vars
        row={}
        row[u'password'] = str(CRYPT()(rowData[u'password'])[0])
        updaterow(table_name, id, row)
        return u"success";
    except:
        return u"fail";    

def deleterow_auth_user():
    try:
        table_name = u'auth_user'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        table_name = u'auth_membership'
        db(db[table_name].user_id == id).delete()
        db.commit()
        return u"success";
    except:
        db.rollback()
        return u"fail";
    
def updaterow_resetpassword_auth_user():
    try:
        table_name = u'auth_user'
        id = auth.user.id
        rowData = request.post_vars
        old = rowData[u'originpassword']
        new = rowData[u'password']
        #判断老密码是否正确
        row = db(db[table_name]._id ==id).select().first()
        row[u'password']
        crypt = CRYPT()(old)[0] 
        if crypt == row[u'password']:
            id = id
        else:
            return u'密码错误'        
        #更新密码
        table_name = u'auth_user'
        
        rowData = request.post_vars
        row={}
        row[u'password'] = str(CRYPT()(new)[0])
        updaterow(table_name, id, row)        
        db.commit()
    except Exception as e:
        print e
        db.rollback()
        return u'fail'
    
    
#主页
@auth.requires_login()
def hysgl():
    return dict();

#获取所有
def select_hysgl():
    try:
        
        if request.vars.flag == u'1':
            where = u"where 1=1 "
            username = auth.user.chinesename.decode('gbk')
            where += u"and username='"+username+u"'"
 
            if request.vars.hys==None:
                hys=u''
            else:
                hys = unicode(request.vars.hys, u'utf-8')
            where += u"and hys like '%"+hys+u"%'"
            order = u" order by rq desc"
            sql = u"""select * from hysgl """ + where+order;
        else:
            if request.vars.hysrq != None:
                hysrq = unicode(request.vars.hysrq, u'utf-8')
                where = u"and (CONVERT(varchar(100), kssj, 23)= '"+hysrq +u"' or CONVERT(varchar(100), jssj, 23)= '"+hysrq+u"') "
            order = u" order by b.Id, a.kssj "    
            sql = u"""select a.* from hysgl a, hys b where a.hys=b.hys """ + where+order;  
                
        
        print sql   
        return sqltojson(sql);
    except:
        return u"fail";
    
    
def gethysglpz():
    try:
        print u'gethysglpz'
        result={}
        sql = u"""select hys from hys""";   
        result[u'hys'] = sqltoarraynodict(sql);
        print result
        return json.dumps(result)  
    except Exception as e:
        print e
        return u'fail'   



def updaterow_hysgl():
    try:
        table_name = u'hysgl'
        id = request.vars.Id
        rowData = request.post_vars
        
        
        newkssj = rowData[u'kssj']
        newjssj = rowData[u'jssj']
        sql = u"""select count(*) c from hysgl 
        where Id<>"""+id+u"""(('"""+newkssj+u"""'>=kssj and '"""+newkssj+u"""'<jssj) 
        or ('"""+newjssj+u"""'<=jssj and '"""+newjssj+u"""'>kssj) 
        or ('"""+newkssj+u"""'<=kssj and '"""+newjssj+u"""'>=jssj))"""
        print sql 
        rows = db.executesql(sql, as_dict=True)
        if rows[0][u'c'] == 0:
            updaterow(table_name, id, rowData)
        else:
            return u"fail:time conflict"
        return u"success";
    except:
        return u"fail";

def insertrow_hysgl():
    try:
        table_name = u'hysgl'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        
        newkssj = rowData[u'kssj']
        newjssj = rowData[u'jssj']
        sql = u"""select count(*) c from hysgl 
        where ('"""+newkssj+u"""'>=kssj and '"""+newkssj+u"""'<jssj) 
        or ('"""+newjssj+u"""'<=jssj and '"""+newjssj+u"""'>kssj) 
        or ('"""+newkssj+u"""'<=kssj and '"""+newjssj+u"""'>=jssj)"""
        print sql 
        rows = db.executesql(sql, as_dict=True)
        if rows[0][u'c'] == 0:
            print u"insertrow hysgl"
            print rowData
            insertrow(table_name, rowData)
            return u"success";
        else:
            return u"fail:time conflict"
    except:
        return u"fail";

def deleterow_hysgl():
    try:
        table_name = u'hysgl'
        id = request.vars.Id
        print table_name
        print id
        deleterow(table_name, id)
        return u"success";
    except:
        return u"fail";
    
    
def selectone_hysgl():
    try:
        table_name = u'hysgl'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail";    
