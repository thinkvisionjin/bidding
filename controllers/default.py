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

def select():
    table_name = request.vars.table
    print u'select data from:'  +table_name +'**************'
    dic_rows = []
    for row in db().select(db[table_name].ALL):
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
    strSQL = u"select  Id,Name from [bidding].[dbo].[Employee]"
    dictionaries["Employee"] = sqltojson(strSQL)
    return json.dumps(dictionaries,ensure_ascii=False)

def mainframe():
    return dict();

def scheduler():
    return dict();

def upload():
    return dict();

def ProtocolCode():
    return dict();
def ProjectCode():
    return dict();
def Project():
    return dict();
def ProjectPackage():
    return dict();
def ProjectMangement():
    return dict();

def EditProject():
    id = request.vars.id
    strSQL = u"select top 1 *  from [bidding].[dbo].[Project] where  Id = " +id;
    project=sqltojson(strSQL)
    return dict(project=project)

def ViewProject():
    id = request.vars.id
    strSQL = u"select top 1 *  from [bidding].[dbo].[Project] where  Id = " +id;
    project=sqltojson(strSQL)
    return dict(project=project)

def SelectPackagesByProjectId():
    id = request.vars.id
    strSQL = u"select * from [bidding].[dbo].[ProjectPackage] where  ProjectId = " +id;
    return sqltojson(strSQL)

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

def fileUpload():
    f= request.vars.fileToUpload
    print f.filename
    return '上传成功' 

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

def sqltojson(sql):
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        print row
        dict_row = {}
        for key in row.keys():
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
    
def zbggs():
    return dict();

def gettbbmsh():
    sqlstr = u'''select  top 100 id,code,title,a.buid,a.flag,bflag 
from [zhaobiao].[dbo].[baomings] a 
where  (select tid from [zhaobiao].[dbo].[user_info] where uid=a.uid) = '1' 
order by code,[kbtime] '''
    flag =  request.vars.flag 
    if flag ==0:
        sqlstr += u'''and (bflag=0 or bflag=3 or bflag=-1) and kbtime>getdate() '''
    if request.post_vars[u'seachKey'] is not None:
        searchContent = request.post_vars[u'seachKey']
        sqlstr += u'''and (title like '%" + + "%' or code like '%" '''+ searchContent + u'''"%'  or (select company from [zhaobiao].[dbo].[user_info] where uid=a.buid) like '%" '''+ searchContent + u''' "%') '''
    return sqltojson(sqlstr);

def tbbmsh():
    flag =  request.vars.flag 
    reValue=u'待审核'
    if flag == 1:
         reValue=u'已审核'
    return dict(returnValue = reValue)

def insertTable(table,post_vars):
    print 'inserting data into:'  +table +'**************'
    rowData = post_vars
    print rowData
    for key in rowData:
        rowData[key] = rowData[key].decode('utf-8')
    id = db[table].insert(**rowData)
    print id 
    db.commit()
    row = db(db[table]._id ==id).select().first()
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

def deleteTable(table,post_vars):
    table = table
    print 'delete data from:'  +table +'**************'
    id = post_vars['Id']
    strSQL = u"delete  from [bidding].[dbo].[" + table + u"] where  id = " +id;
    print strSQL
    db.executesql(strSQL)
    return dict(table=table)

def updateTable(table,post_vars):
    print 'update data into:'  +table +'**************'
    row_data = post_vars
    id = row_data['Id']
    for key in row_data:
        if key!='Id' and key!='uid':
            db(db[table]._id == id).update(**{key:request.post_vars[key]})
    row = db(db[table]._id ==id).select().first()
    db.commit()
    return dict(table=table)

def selectTable(table):
        print u'select data from:'  +table +'**************'
        dic_rows = []
        for row in db().select(db[table].ALL):
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
