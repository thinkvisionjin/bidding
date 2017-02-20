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
import xlrd
import traceback 
T.force('zh-cn')
CONST_MANAGER=2;
CONST_ADMIN = 3;
auth.settings.actions_disabled=['register','request_reset_password']



@auth.requires_login()
def guanli():
    return dict(chinesename=auth.user.chinesename.decode('gbk'))
    
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
               "拾","佰","仟","万",
               "拾","佰","仟","亿",
               "拾","佰","仟","万",
               "拾","佰","仟","兆"]

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
    try:
        table_name = request.vars.table
        print 'inserting data into:'  +table_name +'**************'
        rowData = request.post_vars
        print rowData
        for key in rowData:
            rowData[key] = rowData[key].decode('utf-8')
        id = db[table_name].insert(**rowData)
        print id 
        
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
        db.commit()
        return result
    except Exception as e:
        print e
        db.rollback()
        result = {}
        result['result'] = u'fail'
        return json.dumps(result)


def delete():
    try:
        table_name = request.vars.table
        print 'delete data from:'  +table_name +'**************'
        id = request.post_vars['Id']
        strSQL = u"delete  from [bidding].[dbo].[" + table_name + u"] where  id = " +id;
        print strSQL
        db.executesql(strSQL)
        return u'success'
    except:
        return u'fail'
def update():
    try:
        table_name = request.vars.table
        print 'update data into:'  +table_name +'**************'
        row_data = request.post_vars
        print row_data
#     for key in row_data:
#         print unicode(key)+u":"+unicode(row_data[key].decode('utf-8'))
    
        id = row_data['Id']
        for key in row_data:
            if key!='Id' and key!='uid':
                print key, row_data[key]
                db(db[table_name]._id == id).update(**{key:unicode(row_data[key].decode('utf-8'))})

        row = db(db[table_name]._id ==id).select().first()

        dic_rows = []
        dict_row = {}

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

        print dict_row['ProjectId']
        if table_name==u'ProjectPackage':
            sql = u'update project set projectstatusid=(select min(stateid) from projectpackage where  project.id=projectpackage.projectid) where id='+dict_row['ProjectId']
            print sql
            db.executesql(sql)
        db.commit()
        return json.dumps(dic_rows,ensure_ascii=False)
    except Exception as e:
        print e
        db.rollback()
        result={}
        result['result'] = u'fail'
        return json.dumps(result)


def updaterow_project():
    try:
        print u'updaterow_gmbs'
        
        id = request.vars.Id
        rowData = request.post_vars

        table_name = u'Project'

        updaterow(table_name, id, rowData)



        

        row = sqltoarray(u'select * from Project where Id = '+unicode(request.vars.Id))
        db.commit()
        return json.dumps(row,ensure_ascii=False)
    except Exception as e:
        print e
        db.rollback()
        return u"fail" 


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
def getnewprojectpz():
    dictionaries = {}
#    strSQL = u"select  Id,ProjectCode,ProjectName from [bidding].[dbo].[Project]"
#    dictionaries["ProjectName"] = sqltojson(strSQL)
    strSQL = u"select  Id,dwmc from [bidding].[dbo].[kh]"
    dictionaries["Customer"] = sqltojson(strSQL)
    strSQL = u"select  Id,khId,lxr,sj from [bidding].[dbo].[lxr]"
    dictionaries["Contactor"] = sqltojson(strSQL)
    return json.dumps(dictionaries,ensure_ascii=False)

def getDictionaries():
    dictionaries = {}
    strSQL = u"select  Id,ProjectCode,ProjectName from [bidding].[dbo].[Project]"
    dictionaries["ProjectName"] = sqltojson(strSQL)
    strSQL = u"select  Id,dwmc from [bidding].[dbo].[kh]"
    dictionaries["Customer"] = sqltojson(strSQL)
    strSQL = u"""select dwmc from kh""";   
    dictionaries[u'dwmc'] = sqltoarraynodict(strSQL);    
    strSQL = u"select  Id,khId,lxr,sj from [bidding].[dbo].[lxr]"
    dictionaries["Contactor"] = sqltojson(strSQL)
    strSQL = u"select  Id,ProjectTypeId,ProjectTypeName from [bidding].[dbo].[ProjectType]"
    dictionaries["ProjectType"] = sqltojson(strSQL)
    strSQL = u"select  Id,PurchaseStyleId,PurchaseStyleName from [bidding].[dbo].[PurchaseStyle]"
    dictionaries["PurchaseStyle"] = sqltojson(strSQL)
    strSQL = u"select  Id,Name from [bidding].[dbo].[ProjectSource]"
    dictionaries["ProjectSource"] = sqltojson(strSQL)
    strSQL = u"select  Id,Name from [bidding].[dbo].[FundingSource]"
    dictionaries["FundingSource"] = sqltojson(strSQL)
    strSQL = u"select  Id,ProjectPropertyId,ProjectPropertyName from [bidding].[dbo].[ProjectProperty]"
    dictionaries["ProjectProperty"] = sqltojson(strSQL)
    strSQL = u"select  Id,Name from [bidding].[dbo].[ProjectStatus]"
    dictionaries["ProjectStatus"] = sqltojson(strSQL)
    strSQL = u"select  Id,chinesename as Name from [bidding].[dbo].[auth_user]"
    dictionaries["Employee"] = sqltojson(strSQL,'gbk')
    strSQL = u"select  TypeId,TypeName from [bidding].[dbo].[ProtocolCodeType] order by TypeId"
    dictionaries["ProtocolCodeType"] = sqltojson(strSQL)
    strSQL = u"select Id,ProtocolNumber from [bidding].[dbo].[ProtocolCode] order by CreationTime desc"
    dictionaries["ProtocolCode"] = sqltojson(strSQL)
    dictionaries["User"] = auth.user_id
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
    strSQL = u"select  Id,ProjectPropertyId,ProjectPropertyName from [bidding].[dbo].[ProjectProperty]"
    dictionaries["ProjectProperty"] = sqltojson(strSQL)
    strSQL = u"select  Id,Name from [bidding].[dbo].[ProjectStatus]"
    dictionaries["ProjectStatus"] = sqltojson(strSQL)
    strSQL = u"select  Id,chinesename as Name from [bidding].[dbo].[auth_user]"
    dictionaries["Employee"] = sqltojson(strSQL,'gbk')
    strSQL = u"select  TypeId,TypeName from [bidding].[dbo].[ProtocolCodeType] order by TypeId"
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

@auth.requires_login()
def xmgl():
    dictionaries = getDictionaries()
    return dict(dictionaries=dictionaries);
def xmgl_ss():
    searchkey = request.vars.searchkey
    strSQL = u'''select  a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ProjectPropertyId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete],
      count(b.Id) as PackageCount,
      count(b.Id) as DocumentBuyerCount,
      count(b.Id) as BidderCount,
      count(b.Id) as MarginCount,
      count(b.Id) as ReturnMarginCount,
      sum(isnull(b.EntrustMoney,0)) as EntrustMoney,
      sum(isnull(b.WinningMoney,0)) as WinningMoney 
      from [dbo].[Project] a left join [dbo].[ProjectPackage] b on a.id= b.ProjectId ''' + searchkey.decode(u'utf-8') + u''' group by a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,[CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ProjectPropertyId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[IsDelete]
      order by a.[Id] desc ''' 
    print  strSQL
    protocols=sqltojson(strSQL)
    return protocols

@auth.requires_login()
def xmglmx():
    id = request.vars.id
    strSQL = u"select top 1 *  from [bidding].[dbo].[Project] where  Id = " +id;
    project=sqltojson(strSQL)
    dictionaries = getDictionaries()
    viewflag = 1

    if auth.user_groups.has_key(CONST_MANAGER):
        viewflag = 0
    else:
        sql = u'select * from Project where Id = '+id
        res = sqltoarray(sql)      
        if int(u'0'+res[0]['EmployeeId']) == auth.user.id or int(u'0'+res[0]['Assistant']) == auth.user.id:
            viewflag = 0    
    return dict(project=project,dictionaries=dictionaries, viewflag=viewflag)

def xmglmxv():
    id = request.vars.id
    strSQL = u"select top 1 *  from [bidding].[dbo].[Project] where  Id = " +id;
    project=sqltojson(strSQL)
    return dict(project=project)

def SelectPackagesByProjectId():
    id = request.vars.id
    strSQL = u"select * from [bidding].[dbo].[ProjectPackage] where  ProjectId = " +id;
    return sqltojson(strSQL)


def SelectFirstPackagesByProjectId():
    id = request.vars.id
    packageid = request.vars.packageid
    if packageid==u'-1':
        strSQL = u"select top 1 * from [bidding].[dbo].[ProjectPackage] where  ProjectId = " + unicode(id) + u" order by CreationDate";
    else:
        strSQL = u"select top 1 * from [bidding].[dbo].[ProjectPackage] where  Id = " + unicode(packageid) + u" order by CreationDate";
    print strSQL
    result = sqltoarray(strSQL)
    try:
        strSQL = u"""SELECT  right('00'+cast(cast(max(right(packagenumber,2)) as int)+1 as nvarchar(2)),2) as code
    FROM [BIDDING].[dbo].[ProjectPackage]
    where ProjectId=""" + unicode(id)
        print strSQL
        r = sqltoarray(strSQL)
        result[0]['PackageNumber'] = r[0]['code']
    except:
        result[0]['PackageNumber'] = ''
    return json.dumps(result,ensure_ascii=False)

def p_getexybh(xylx):
    table_name = u'xybh'
    nf = time.localtime().tm_year
    row = db((db[table_name].xylx == xylx)&(db[table_name].nf==nf)).select().first()
    print row
    result = ''
    if row == None:
        print '...??..'
        rowData={}
        rowData[u'xylx'] = xylx
        rowData[u'nf'] = nf
        rowData[u'bh'] = 1     
        db[table_name].insert(**rowData)
        bh = 1   
    else:
        print row
        id = row[u'id']
        rowData={}
        rowData[u'xylx'] = row[u'xylx']
        rowData[u'nf'] = row[u'nf']
        rowData[u'bh'] = int(row[u'bh'])+1   
        db(db[table_name]._id == id).update(**rowData)
        bh = int(row[u'bh'])+1
    print '===>', bh
    return unicode(bh).zfill(5)


def GenerateProtocolCode(protocal_type,id):
    print '...', protocal_type
    protocol_code = "SPMCEC-"+time.strftime('%y')
    row = db(db[u'ProtocolCodeType'].TypeId == protocal_type).select().first()       
    protocol_code += row['TypeCode']
    return protocol_code+p_getexybh(protocal_type);

def GenerateProjectCode(project, id):
    nf = time.localtime().tm_year
    nf = unicode(nf)[-2:]
    bh = p_getebh(project['ProjectTypeId'])
    ygbh = auth.user.code

    ProjectCode = ''
    if project['ProjectTypeId'] == '0':
        #国内
      
        row = db(db[u'PurchaseStyle'].PurchaseStyleId == project["PurchaseStyleId"]).select().first()       
        cgfs = row['PurchaseStyleCode']
        ProjectCode = 'PCMET-' + nf + unicode(project['ProjectPropertyId']) + ygbh +cgfs + bh
    else:
        #国际
        ProjectCode = '0808-' + nf +unicode(project['FundingSourceId']) + unicode(project['ProjectPropertyId']) + \
        u'GJF' + ygbh + bh
    print "ProjectCode:" + ProjectCode
    return ProjectCode




def GenerateProjectCode1(project,id):
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
    if project["ProjectPropertyId"]==u"1":
        ProjectCode+=u"JDCP"
    if project["ProjectPropertyId"]==u"2":
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
    print uid, auth.user_groups
    tj=u''
    if auth.user_groups.has_key(CONST_MANAGER) or auth.user_groups.has_key(CONST_ADMIN):
        tj = u'where 1=1 '
    else:
        #显示所有项目
        # tj = u'where 1=1 '
        tj = u'where a.EmployeeId = ' + unicode(uid) + u' or Assistant = ' + unicode(uid)
        
    if searchkey != None:
        tj += u" and "+ searchkey.decode(u'utf-8')
    else:
        tj = u'where a.EmployeeId = ' + unicode(uid) + u' or Assistant = ' + unicode(uid)
        
    strSQL = u'''select  a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,f.dwmc as [CustomerId]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ProjectPropertyId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[ContactorNameId], a.[IsDelete],
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
      left join [dbo].[tbbzj] d on d.projectid = a.Id
      left join [dbo].[tbzj] e on e.projectid = d.projectid  
      left join [dbo].[kh] f on a.CustomerId = f.Id
      ''' + tj + u''' group by a.[Id]      ,[ProtocolCodeId]      ,[ProjectCode]      ,[ProjectName]      ,f.[dwmc]      ,[EmployeeId]      ,[Assistant]      ,[ProjectSourceId]      ,[FundingSourceId]      ,[ProjectTypeId]      ,[ProjectPropertyId]      ,[PurchaseStyleId]      ,[ProjectStatusId]      ,a.[CreationDate]      ,a.[ContactorNameId], a.[IsDelete] order by a.[Id] desc'''
    
    print strSQL
    return  sqltojson(strSQL)



@auth.requires_login()
def gmbs():
    return dict();

def p_CreateNewProject(rowData, id):
    updateProjectStr = u"update [bidding].[dbo].[Project]  set ProjectCode = '"+GenerateProjectCode(rowData,id)+u"' where id ="+unicode(id)
    print "--->", updateProjectStr
    db.executesql(updateProjectStr)
    row = db(db[u'Project']._id ==id).select().first()
    print row
    initPackage = {}
    initPackage[u"ProjectId"] = id
    initPackage[u"PackageNumber"] = unicode(row["ProjectCode"])+u'-01'
    initPackage[u"PackageName"] = row["ProjectName"].decode(u'utf-8')
    initPackage[u"StateId"] = u'1'
    initPackage[u"EntrustMoney"] = u'0'
    initPackage[u"IsDelete"] = u'0'
    initPackage[u"StateId"] = u'1'
    initPackage[u"EntrustMoney"] = u'0'
    initPackage[u"IsDelete"] = u'0'
    initPackage[u"PublicDate"] = u''
    initPackage[u"SecondPublicDate"] = u''
    initPackage[u"OpenDate"] = u''
    initPackage[u"ReviewDate"] = u''
    initPackage[u"WinningCompany"] = u''
    initPackage[u"WinningMoney"] = u'0'
    initPackage[u"MakeOutDate"] = u''
    initPackage[u"SigningDate"] = u''
    initPackage[u"ChargeRate"] = u'0'
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
    
    return dict_row

@auth.requires_login()
def ReGetProjectCode():
    print u'ReGetPorjectCode'
    try:
        id = request.vars.id
        rowData = request.post_vars
        print rowData
        for key in rowData:
            rowData[key] = rowData[key].decode(u'utf-8')
        username = auth.user.chinesename.decode('gbk')
        khrow = {}
        khrow[u'username'] = username
        khrow[u'dwmc'] = rowData[u'CustomerId']
        khrow[u'lxr'] = rowData[u'ContactorNameId']
        khrow[u'sj'] = rowData.pop(u'ContactTelId')
   
        result = p_addkh(khrow)
        rowData['CustomerId'] = result['khId']
        rowData['ContactorNameId'] = result['lxrId']            
        db(db[u'Project']._id == id).update(**rowData)
        print id 
        result = p_CreateNewProject(rowData, id)
        result['CustomerId'] = khrow[u'dwmc']
        db.commit()
        return json.dumps(result,ensure_ascii=False)
    except:
        db.rollback()
        return u'fail'

def UpdateProject():
    print u'UpdateProject'
    try:
        id = request.vars.id
        rowData = request.post_vars
        print rowData
        for key in rowData:
            rowData[key] = rowData[key].decode(u'utf-8')
        username = auth.user.chinesename.decode('gbk')
        khrow = {}
        khrow[u'username'] = username
        khrow[u'dwmc'] = rowData[u'CustomerId']
        khrow[u'lxr'] = rowData[u'ContactorNameId']
        khrow[u'sj'] = rowData.pop(u'ContactTelId')
   
        result = p_addkh(khrow)
        rowData['CustomerId'] = result['khId']
        rowData['ContactorNameId'] = result['lxrId']            
        db(db[u'Project']._id == id).update(**rowData)
        print id 
        sql = u'select * from Project where Id = '+unicode(id)
        t = sqltoarray(sql)
        result = t[0]
        result['CustomerId'] = khrow[u'dwmc']
        db.commit()
        return json.dumps(result,ensure_ascii=False)
    except:
        db.rollback()
        return u'fail'

@auth.requires_login()
def CreateNewProject():
    print u'CreateNewProject'
    try:
        rowData = request.post_vars
        print rowData
        for key in rowData:
            rowData[key] = rowData[key].decode(u'utf-8')
        username = auth.user.chinesename.decode('gbk')
        khrow = {}
        khrow[u'username'] = username
        khrow[u'dwmc'] = rowData[u'CustomerId']
        khrow[u'lxr'] = rowData[u'ContactorNameId']
        khrow[u'sj'] = rowData.pop(u'ContactTelId')
   
        result = p_addkh(khrow)
        rowData['CustomerId'] = result['khId']
        rowData['ContactorNameId'] = result['lxrId']
        id = db[u'Project'].insert(**rowData)
        print id 
        result = p_CreateNewProject(rowData, id)
        result['CustomerId'] = khrow[u'dwmc']
        db.commit()
        return json.dumps(result,ensure_ascii=False)
    except Exception as e:
        print e
        db.rollback()
        result = {}
        result['result'] = 'fail'
        return json.dumps(result)


def CreateNewPackage(rowData):
    print u'CreateNewPackage'
    print rowData
    for key in rowData:
        rowData[key] = unicode(rowData[key])
    id = db['ProjectPackage'].insert(**rowData)
    print id 

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
                    dict_row[key] = row[key].decode(u'utf-8')
                elif isinstance(row[key], datetime):
                    dict_row[key] = unicode(row[key])
                else:
                    dict_row[key] = unicode(row[key])
    result= json.dumps(dict_row,ensure_ascii=False)
    return result

def CreateNewProtocol():
    try:
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
    except:
        return u'fail'

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
        #print row
        dict_row = {}
        for key in row.keys():
            if decode!=None :
                if isinstance(row[key],int):
                    dict_row[key] = row[key]
                elif isinstance(row[key], str):
                    #print row[key]
                    dict_row[key] = row[key].decode(u'gbk')
                else:
                    dict_row[key] = row[key]#.decode(decode);
            else:
                dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return json.dumps(dic_rows).replace(u'None', u'') 

def getzbgg():
    return sqltojson(u'SELECT top 10 [id],[title],[addtime] FROM [zhaobiao].[dbo].[Zbgg] order by addtime desc')

    
def rawsqltojson(sql):
    dic_rows=[]
    rows = db.executesql(sql, as_dict=True)
    for row in rows:
        print row
        dict_row = {}
        for key in row.keys():
            dict_row[key] = unicode(row[key]).replace('None', '')
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
    where """+ tj_uid+u""" and a.Id=b.ProjectId  """+tj;  #and b.stateid=2
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
#    sql = u"""select lxr from lxr where khId="""+unicode(khId);   
#    result[u'lxr'] =  sqltoarraynodict(sql);    
#    sql = u"""select sj from lxr where khId="""+unicode(khId);   
#    result[u'sj'] =  sqltoarraynodict(sql);
#    result[u'khyh'] = row[u'khyh']
#    result[u'yhzh'] = row[u'yhzh']   
    result[u'khxx'] = sqltoarray(sql)    
    sql = u'select lxr, sj, dz lxrdz, dh lxrdh from lxr where khId='+unicode(khId);
    result['lxr'] = sqltoarray(sql)
    return json.dumps(result).replace(u'None', u'') 

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
    sql = u"""select * from gmbs where Id="""+request.vars.Id;
    rows = rawsqltojson(sql);   
    print "----------------"
    row = rows[0]

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
    row = db(db[u'ProjectPackage'].PackageNumber ==rowData['bsbh']).select().first()
    rowData[u'projectid'] = row[u'ProjectId']    
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
    
    khrow = {}
    if rowData.has_key('username'):
        khrow[u'username'] = rowData[u'username']

    if rowData.has_key('nsrsbh'):    
        khrow[u'nsrsbh'] = rowData[u'nsrsbh']
    if rowData.has_key('dwmc'):  
        khrow[u'dwmc'] = rowData[u'dwmc']
    if rowData.has_key('lxdz'): 
        khrow[u'lxdz'] = rowData[u'lxdz']
    if rowData.has_key('khyh'): 
        khrow[u'khyh'] = rowData[u'khyh']
    if rowData.has_key('yhzh'): 
        khrow[u'yhzh'] = rowData[u'yhzh']
    if rowData.has_key('dzxx'):     
        khrow[u'dzxx'] = rowData[u'dzxx']
    if rowData.has_key('dh'):    
        khrow[u'dh'] = rowData[u'dh']
    if rowData.has_key('cz'):            
        khrow[u'cz'] = rowData[u'cz']
    if row==None:
        id = db[table_name].insert(**khrow)
    else:
        id = row[u'id']
        db((db[table_name]._id == id)).update(**khrow)
    result = {}
    result['khId'] = id
    table_name = u'lxr'
    if rowData[u'lxr'] != '':
        row = db(db.lxr.lxr == rowData[u'lxr']).select().first()
        khrow = {}
        if rowData.has_key('lxr'): 
            khrow[u'lxr'] = rowData[u'lxr']
        if rowData.has_key('sj'): 
            khrow[u'sj'] = rowData[u'sj']
        if rowData.has_key('lxrdz'): 
            khrow[u'dz'] = rowData[u'lxrdz']
        if rowData.has_key('lxrdh'): 
            khrow[u'dh'] = rowData[u'lxrdh']
        if rowData.has_key('username'): 
            khrow[u'username'] = rowData[u'username']
        khrow[u'khId'] = unicode(id)        
        if row==None:
            #insertrow(table_name, khrow)   
            id = db[table_name].insert(**khrow) 
        else:
            id = row[u'id']
            db((db[table_name]._id == id)).update(**khrow)
        result['lxrId'] = id
    return result        

def p_insertcwls(ywlx, id, sz, rowData):
    table_name = u'cwls'
    row = {}
    row[u'ywlx'] = ywlx
    row[u'lyId'] = id
    row[u'sz'] = sz
    row[u'projectid'] = rowData[u'projectid']
    row[u'je'] = rowData[u'je']
    row[u'username'] = rowData[u'username']
    insertrow(table_name, row)
    
def p_updatecwls(ywlx, id, rowData):
    table_name = u'cwls'
    row = {}
    row[u'projectid'] = rowData[u'projectid']
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
    row = db(db[u'ProjectPackage'].PackageNumber ==rowData['bsbh']).select().first()
    rowData[u'projectid'] = row[u'ProjectId']
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

def qxfkqr_gmbs():
    try:
        id = request.vars.Id
        table_name = u'gmbs'
        rowData={}
        rowData[u'fkbz'] = 0
        rowData[u'fkrq'] = None     
        db(db[table_name]._id == id).update(**rowData)
        return u'success'
    except Exception as e:
        print e
        return u'fail'        

def fkqr_gmbs():
    try:
        id = request.vars.Id
        table_name = u'gmbs'
        rowData={}
        rowData[u'fkbz'] = 1
        rowData[u'fkrq'] = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))       
        db(db[table_name]._id == id).update(**rowData)
        return u'success'
    except Exception as e:
        print e
        return u'fail'  

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
            where = u"where a.username='"+username+u"'"
        where = where + u" and a.projectid=b.Id "
        if request.vars.dwmc==None:
            dwmc=u''
        else:
            dwmc = unicode(request.vars.dwmc, u'utf-8')
        where += u"and a.dwmc like '%"+dwmc+u"%' "    
        if request.vars.projectid==None:
            projectid=u''
        else:
            projectid = unicode(request.vars.projectid, u'utf-8')
        where += u"and b.ProjectCode like '%"+projectid+u"%' "
        
        order = u" order by rq desc"
        sql = u"""select a.Id, a.dwmc, a.bzjlx, a.je, a.rq, a.username, a.ly, a.lyId, b.ProjectCode as projectid from tbbzj a, Project b """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"


def select_tbbzjbyProjectId():
    try:
        username = auth.user.chinesename.decode('gbk')

        where = u"where 1=1 "

        where = where + u" and a.projectid=b.Id "

  
        if request.vars.projectid==None:
            projectid=u''
        else:
            projectid = unicode(request.vars.projectid, u'utf-8')
        where += u"and a.projectid ="+projectid
        
        order = u" order by rq desc"
        sql = u"""select a.Id, a.dwmc, a.bzjlx, a.je, a.rq, a.username, a.ly, a.lyId, b.ProjectCode as projectid from tbbzj a, Project b """ + where+order;
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

def p_getprojectcode(projectid=None):
    uid = auth.user_id
    tj = u''
    if auth.user_groups.has_key(CONST_MANAGER) or auth.user_groups.has_key(CONST_ADMIN) :
        tj_uid = u'1=1'
    else:
        tj_uid = u'''( EmployeeId='''+unicode(uid)+u''' or Assistant='''+unicode(uid)+u''')'''
    if projectid != None:
        tj = u""" and Id = """+unicode(projectid)
    sql = u"""select Id, ProjectCode FROM [Project]  
    where """+ tj_uid+tj;
    print sql
    return sqltoarray(sql);

def gettbbzjpz():
    try:
        result = {};
        sql = u"""select dwmc from kh""";   
        result[u'dwmc'] = sqltoarraynodict(sql);
    
        result[u'projectid'] = p_getprojectcode(request.vars.projectid)
        result[u'bzjlx'] = [u'现金', u'汇款', u'支票', u'其他']
        return json.dumps(result)  
    except:
        return u"fail"

def tbzj_print():
    table_name = u'tbzj'
    sql = u"""select a.*, b.ProjectCode projectcode from tbzj a, Project b  where a.projectid=b.Id and a.Id="""+request.vars.Id;
    rows = rawsqltojson(sql);    
    row = rows[0]
    row[u'bm'] = u''
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
        where = where + u' and a.projectid = b.Id '
        if request.vars.dwmc==None:
            dwmc=u''
        else:
            dwmc = unicode(request.vars.dwmc, u'utf-8')
        where += u"and dwmc like '%"+dwmc+u"%' "    
        if request.vars.projectid==None:
            projectid=u''
        else:
            projectid = unicode(request.vars.projectid, u'utf-8')
        where += u"and b.ProjectCode like '%"+projectid+u"%' "
        
        order = u" order by rq desc"
        sql = u"""select a.Id, a.tbzjrq, a.dwmc, a.khyh, a.yhzh, a.rq, a.username, a.fkfs, a.je, b.ProjectCode as projectid from tbzj a, Project b """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail"

def select_tbzjbyProjectId():
    try:
        username = auth.user.chinesename.decode('gbk')
        where = u"where 1=1 "

        where = where + u' and a.projectid = b.Id '
   
        if request.vars.projectid==None:
            projectid=u''
        else:
            projectid = unicode(request.vars.projectid, u'utf-8')
        where += u"and a.projectid ="+projectid
        
        order = u" order by rq desc"
        sql = u"""select a.Id, a.dwmc,a.tbzjrq, a.khyh, a.yhzh, a.rq, a.username, a.fkfs, a.je, b.ProjectCode as projectid from tbzj a, Project b """ + where+order;
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

    result[u'projectid'] = p_getprojectcode(request.vars.projectid)
    result[u'fkfs'] = [u'现金', u'汇款', u'支票', u'其他']
    
    tbbzjid = request.vars.tbbzjid
    if tbbzjid==None:
        bsbh=u''
    else:
        table_name = u'tbbzj'
        sql = u"""select a.*, b.khyh, b.yhzh from tbbzj a, kh b where a.dwmc=b.dwmc and a.Id="""+tbbzjid;
        result[u'tbbzjid'] = sqltoarray(sql);  
    return json.dumps(result).replace(u'None', u'') 



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
    sql = u"""select a.Id, a.dwmc, c.ProjectCode projectid, a.bzjlx, a.je, a.rq, a.username, a.ly, a.lyId ,b.rq as trq, ISNULL (b.je,0 ) as tje,b.fkfs,khyh,
CASE ISNULL (b.je,0 )
WHEN 0 THEN 0
ELSE 1 
end as returned,b.yhzh
from [dbo].[tbbzj] a left join [dbo].[tbzj] b
on a.dwmc = b.dwmc and a.projectid = b.projectid
left join [dbo].[Project] c on a.projectid=c.Id
where a.projectid  = """ + projectid ;
    return sqltojson(sql)

def getContactsByProjectID():
    uid = u''
    pid = request.vars.pid
    sql = u'(select a.dwmc,b.lxr,a.lxdz,b.sj,a.dzxx,a.cz from [dbo].[kh] a,[dbo].[lxr] b where a.id = b.khId and \
   b.Id in (select ContactorNameId from Project where Id='+pid+u')) \
   union( select dwmc, lxr,lxdz,sj,dzxx,cz from gmbs where bsbh in (select PackageNumber from ProjectPackage where ProjectId='+pid+u'))'
#     sql = u'select dwmc, lxr,lxdz,sj,dzxx,cz from gmbs where bsbh in (select PackageNumber from ProjectPackage where ProjectId ='+pid+u')';
    return sqltojson(sql)

def getFinanceByProjectID():
    print 'getFinanceByProjectID'
    uid = u''
    pid = request.vars.pid
    sql = u'select sz,ywlx,sum(je) as je from cwls where projectid = '+pid+u' group by sz,ywlx'
#     sql = u'select sz,ywlx,sum(je) as je from cwls  group by sz,ywlx '
    res = sqltoarray(sql)
    finance={}
    for row in res:
        if row['ywlx'] == u'专家评审费':
            finance["zc_pqzjf"] = unicode(row['je'])
        elif row['ywlx']  == u'退保证金':
            finance["zc_tbzj"] = unicode(row['je'])
        elif row['ywlx']  == u'项目分成':
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
        print row['ywlx']
    res.append(finance)

    sql = u'select sum(ChargeRate) as je from ProjectPackage where projectid = '+pid
#     sql = u'select sz,ywlx,sum(je) as je from cwls  group by sz,ywlx '
    res = sqltoarray(sql)   
    finance["sr_zbfwf"] = res[0]['je'] 
    return json.dumps(finance)

#主页
def grtjb():
    return dict();
#获取所有
def select_grtjb():
    print u'select_grtjb'
    try:
        username = auth.user.chinesename.decode('gbk')

        ksrq = request.vars.ksrq
        jsrq = request.vars.jsrq
   
        sql = u"""  select id, chinesename as xm,
  国内公开招标 as gngk,
  国内邀请招标 as gnyq,
  询价采购 as xjcg,
  竞争性谈判 as jzxtp,
  竞争性磋商 as jzxcs,
  单一来源采购 as dylycg, 
  其他 as qt,
  进口论证 as jklz,
  咨询 as zx,
  国际招标 as gjzb,
国内公开招标+国内邀请招标+询价采购+竞争性谈判+竞争性磋商+单一来源采购+其他+进口论证+咨询+国际招标 as zj
    from (select c.id, c.chinesename, b.PurchaseStyleName, d.packagenumber  from project a, ProjectPackage d, PurchaseStyle b, auth_user c 
   where a.PurchaseStyleId=convert(int, b.[PurchaseStyleId]) and a.EmployeeId=c.id and a.Id = d.ProjectId
   and d.[CreationDate] between '"""+ksrq+u"' and '"+jsrq+u"""') a 
   pivot (count(packagenumber) for  PurchaseStyleName
    in (国内公开招标,国内邀请招标,询价采购,竞争性谈判,竞争性磋商,单一来源采购,其他,进口论证,咨询, 国际招标))t""" ;
        print sql   
        return sqltojson(sql, 'gbk');
    except Exception as e:
        print e
        return u"fail"    

def select_grtjbfb():
    try:
        username = auth.user.chinesename.decode('gbk')
        ksrq = request.vars.ksrq
        jsrq = request.vars.jsrq     
        id = unicode(request.vars.id, u'utf-8')
        
        sql = u"""select b.PurchaseStyleName as xmlx, count(case EmployeeId when """+id+u""" then EmployeeId end) as fz, 
case when (select count(*) as c from project a, PurchaseStyle b
   where a.PurchaseStyleId=convert(int, b.[PurchaseStyleId]) 
   and [CreationDate]  between '"""+ksrq+u"' and '"+jsrq+u"""'
   and a.EmployeeId ="""+id+u""")=0 then '0' else
rtrim(convert(decimal(18,2),count(case EmployeeId when """+id+u""" then EmployeeId end)*100.00/(select count(*) as c from project a,  ProjectPackage c, PurchaseStyle b
   where a.PurchaseStyleId=convert(int, b.[PurchaseStyleId]) 
   and c.[CreationDate]  between '"""+ksrq+u"' and '"+jsrq+u"""'
   and a.EmployeeId ="""+id+u""" and a.Id = c.ProjectId))) end +'%'  as fzbfb, 
count(case assistant when """+id+u""" then assistant end) as xz,
case when (select count(*) as c from project a, PurchaseStyle b
   where a.PurchaseStyleId=convert(int, b.[PurchaseStyleId]) 
   and [CreationDate]  between '"""+ksrq+u"' and '"+jsrq+u"""'
   and a.assistant ="""+id+u""")=0 then '0' else
rtrim(convert(decimal(18,2),count(case assistant when """+id+u""" then assistant end)*100.00/(select count(*) as c from project a,  ProjectPackage c, PurchaseStyle b
   where a.PurchaseStyleId=convert(int, b.[PurchaseStyleId]) and a.Id = c.ProjectId
   and c.[CreationDate]  between '"""+ksrq+u"' and '"+jsrq+u"""'
   and a.assistant ="""+id+u"""))) end+'%' as xzbfb,
   0 as dj,
   0 as zj
  from project a,ProjectPackage c, PurchaseStyle b
   where a.PurchaseStyleId=convert(int, b.[PurchaseStyleId])  AND a.Id = c.ProjectId
   and c.[CreationDate]  between '"""+ksrq+u"' and '"+jsrq+u"""'
   and (a.EmployeeId ="""+id+u"""
   or a.assistant ="""+id+u""")
   group by b.PurchaseStyleName""" ;
        print sql   
        return sqltojson(sql);
    except Exception as e:
        print e
        return u"fail"    

def zzxmtjb():
    return dict();
 
def select_zzxmtjb():
    try:
        sql = u"""  select chinesename as xm,
  国内公开招标 as gngk,
  国内邀请招标 as gnyq,
  询价采购 as xjcg,
  竞争性谈判 as jzxtp,
  竞争性磋商 as jzxcs,
  单一来源采购 as dylycg, 
  其他 as qt,
  进口论证 as jklz,
  咨询 as zx,  
  国际招标 as gjzb,
国内公开招标+国内邀请招标+询价采购+竞争性谈判+竞争性磋商+单一来源采购+其他+进口论证+咨询+国际招标 as zj
    from (select c.chinesename, b.PurchaseStyleName, d.packagenumber  from project a, ProjectPackage d, PurchaseStyle b, auth_user c 
   where a.PurchaseStyleId=convert(int, b.[PurchaseStyleId]) and a.EmployeeId=c.id  and a.Id = d.ProjectId
   and d.[stateid] not in (7,8) ) a 
   pivot (count(packagenumber) for  PurchaseStyleName
    in (国内公开招标,国内邀请招标,询价采购,竞争性谈判,竞争性磋商,单一来源采购,其他,进口论证,咨询,国际招标))t""" ;
        print sql    
        return sqltojson(sql, 'gbk');   
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
        
        db((db.yhls.wjm == row[u'wjm'].decode('utf-8'))&(db.yhls.wjmId==id)).delete()
        deleterow(table_name, id)
        db.commit()
        return u"success"
    except Exception as e:
        traceback.print_exc()
        db.rollback()
        print e
        return u"fail"


def selectone_yhlswj():
    table_name = u'yhlswj'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
  
def fileUpload():
    try:
        f = request.vars.fileToUpload
        table_name = u'yhlswj'
        username = auth.user.chinesename.decode('gbk')
        rowData = {}
        rowData[u'username'] = username
        rowData[u'wjm'] = unicode(f.filename, u'utf-8')

        id = db[table_name].insert(**rowData)    
        
        wb = xlrd.open_workbook(file_contents=f.value)
        sh = wb.sheet_by_index(0)
    
        for i in range(2, sh.nrows-1):
            row = sh.row_values(i)
            #print type(xlrd.xldate.xldate_as_datetime(row[1], 1)) 
            rowData={}
            #rowData[u'jysj'] = xlrd.xldate.xldate_as_datetime(row[1], 1)
            rowData[u'jysj'] = row[0]
            rowData[u'zy'] = row[1]
            rowData[u'je'] = float(row[6].replace(',',''))-float(row[5].replace(',',''))
            rowData[u'dfmc'] = row[10]
            rowData[u'dfzh'] = row[9]
            rowData[u'qrje'] = 0
            rowData[u'cwqrje'] = 0
            rowData[u'wjm'] = f.filename
            rowData[u'wjmId'] = id
            insertrow(u'yhls', rowData)
        db.commit()
        return u"success"
    except Exception as e:
        traceback.print_exc()
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

        if request.vars.zy==None:
            zy=u''
        else:
            zy = unicode(request.vars.zy, u'utf-8') 
        where += u"and zy like '%"+zy+u"%'"             
             
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
        result[u'projectid'] = p_getprojectcode(request.vars.projectid)
        result[u'qrlx'] = [u'购买标书', u'投标保证金', u'中标服务费']
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
            tbbzjrow[u'projectid'] = rowData[u'bsbh']
            tbbzjrow[u'ly'] = u'交易流水确认'
            tbbzjrow[u'je'] = rowData[u'qrje']
            tbbzjrow[u'username'] = username
            p_insertrow_tbbzj(tbbzjrow)       
        if rowData[u'qrlx'] == u'中标服务费':
            zbfwf = {}
            zbfwf[u'lyId'] = id
            zbfwf[u'projectid'] = rowData[u'bsbh']
            zbfwf[u'je'] = rowData[u'qrje']
            zbfwf[u'username'] = username            
            p_insertcwls(rowData[u'qrlx'], id, '支出', zbfwf)      
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
            tbbzjrow[u'projectid'] = rowData[u'bsbh']
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
        qrlx = row[u'qrlx'].decode('utf-8')
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
        print "==>", qrlx, id
######################
        if qrlx == u'购买标书':
            trow = db(db.gmbs.lyId == id).select().first()
            p_deleterow_gmbs(trow[u'id'])
        if qrlx == u'投标保证金':
            trow = db(db.tbbzj.lyId == id).select().first()
            p_deleterow_tbbzj(trow[u'id'])   
        if qrlx == u'中标服务费':
            p_deletecwls(qrlx, id)               
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
        sql = u"""select a.Id,
        a.dwmc,
        a.qrlx,
        a.rq,
        a.qrje,
        a.yhlsId,
        a.cwqrbz,
        a.username,
        case when b.id is null then bsbh else b.projectcode end bsbh from yhlsqr a 
        left join project b on a.bsbh=convert(NVARCHAR(50), b.id)""" + where+order;
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
        where = u"where 1=1 "
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
        where = where+u' and a.projectid=b.Id '
        projectid = request.vars.projectid
        if projectid==None:
            projectid=u''
        where += u"and projectid like '%"+projectid+u"%'"
    
        order = u" order by a.rq desc"
        sql = u"""select a.Id, a.sz, a.zy, a.je, a.ywlx, a.lyId, a.username, a.rq, b.ProjectCode projectid from cwls a, Project b """ + where+order;
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
    result[u'projectid'] = p_getprojectcode(request.vars.projectid);
    result[u'sz'] = [u'收入', u'支出']
    result[u'ywlx'] = [u'购买标书', u'投标保证金', u'退保证金', u'中标服务费', u'专家评审费', u'项目分成', u'其他']
    return json.dumps(result)   




#获取所有
def select_xmzc():
    try:
        username = auth.user.chinesename.decode('gbk')
        if auth.user_groups.has_key(CONST_MANAGER):
            where = u"where 1=1 "
        else:
            where = u"where username='"+username+u"'"
        where = where+u" and a.projectid=b.Id and a.ywlx in ('专家评审费', '项目分成')"
        projectid = request.vars.projectid
        if projectid==None:
            projectid=u''
        where += u"and projectid like '%"+projectid+u"%'"
    
        order = u" order by a.rq desc"
        sql = u"""select a.Id, a.sz, a.zy, a.je, a.ywlx, a.lyId, a.username, a.rq, b.ProjectCode projectid from cwls a, Project b """ + where+order;
        print sql   
        return sqltojson(sql);
    except:
        return u"fail";

def updaterow_xmzc():
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

def insertrow_xmzc():
    try:
        table_name = u'cwls'
        username = auth.user.chinesename.decode('gbk')
        rowData = request.post_vars
        rowData[u'username'] = username
        rowData[u'lyId'] = -1
        print u"insertrow cwls"
        print rowData
        insertrow(table_name, rowData)
        db.commit()
        return u"success";
    except Exception as e:
        print e 
        db.rollback()
        return u"fail";

def deleterow_xmzc():
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
   
def selectone_xmzc():
    try:
        table_name = u'cwls'
        sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
        return sqltojson(sql);
    except:
        return u"fail"; 

def getxmzcpz():
    uid = auth.user_id;
    result = {};
    result[u'projectid'] = p_getprojectcode(request.vars.projectid);
    result[u'sz'] = [u'收入', u'支出']
    result[u'ywlx'] = [u'专家评审费', u'项目分成',u'其他']
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
@auth.requires(auth.has_membership(group_id='3'))
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
        row[u'code'] = rowData[u'code']
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
        row[u'code'] = rowData[u'code']
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
            where = u"where 1=1 and jssj>getdate() "
            username = auth.user.chinesename.decode('gbk')
            where += u"and username='"+username+u"'"
 
            if request.vars.zt==None:
                zt=u''
            else:
                zt = unicode(request.vars.zt, u'utf-8')
            where += u"and hyzt like '%"+zt+u"%'"
            print "--->", zt, where
            if request.vars.hys==None:
                hys=u''
            else:
                hys = unicode(request.vars.hys, u'utf-8')
            where += u"and hys like '%"+hys+u"%'"
            order = u" order by rq desc"
            sql = u"""select * from hysgl """ + where+order;
        elif request.vars.flag == u'3':
            where = u"where 1=1 "
            username = auth.user.chinesename.decode('gbk')
            where += u"and username='"+username+u"'"
 
            if request.vars.zt==None:
                zt=u''
            else:
                zt = unicode(request.vars.zt, u'utf-8')
            where += u"and hyzt like '%"+zt+u"%'"
            print "--->", zt, where
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
        hys = unicode(rowData[u'hys'], 'utf-8')
        sql = u"""select count(*) c from hysgl 
        where hys='"""+hys+u"""' and Id<>"""+id+u""" and (('"""+newkssj+u"""'>=kssj and '"""+newkssj+u"""'<jssj) 
        or ('"""+newjssj+u"""'<=jssj and '"""+newjssj+u"""'>kssj) 
        or ('"""+newkssj+u"""'<=kssj and '"""+newjssj+u"""'>=jssj))"""
        print sql 
        rows = db.executesql(sql, as_dict=True)
        if rows[0][u'c'] == 0:
            updaterow(table_name, id, rowData)
        else:
            return u"申请失败：时间冲突"
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
        hys = unicode(rowData[u'hys'], 'utf-8')
        sql = u"""select count(*) c from hysgl 
        where  hys='"""+hys+u"""' and( ('"""+newkssj+u"""'>=kssj and '"""+newkssj+u"""'<jssj) 
        or ('"""+newjssj+u"""'<=jssj and '"""+newjssj+u"""'>kssj) 
        or ('"""+newkssj+u"""'<=kssj and '"""+newjssj+u"""'>=jssj))"""
        print sql 
        rows = db.executesql(sql, as_dict=True)
        if rows[0][u'c'] == 0:
            print u"insertrow hysgl"
            print rowData
            insertrow(table_name, rowData)
            return u"success";
        else:
            return u"申请失败：时间冲突"
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

@auth.requires_login()
def tjzb():
    return dict();


def select_tjzb():
    print u'select_tjzb'
    try:
        ksrq = request.vars.ksrq
        jsrq = request.vars.jsrq
        result = {};
        sql2 = u"""select PurchaseStyleName as cgfs,
  机电 as jd,
  [政府采购项目(线下)] as zf,
  国债技改项目 as gj,
  [同属政府采购、国债技改项目] as ts,
  涉密 AS sm,
  [政府采购项目(二期)] as zfe,
机电+[政府采购项目(线下)]+国债技改项目+[同属政府采购、国债技改项目]+涉密+[政府采购项目(二期)] as zj from
 ( select c.PurchaseStyleName,  b.ProjectPropertyName, d.packagenumber from project a, projectpackage d,ProjectProperty b, PurchaseStyle c
  where a.projectpropertyid=convert(int, b.projectpropertyid) and a.PurchaseStyleId=convert(int, c.[PurchaseStyleId]) and a.id=d.projectid
  and d.[CreationDate] between '"""+ksrq+u"' and '"+jsrq+u"""') a
  pivot (count(packagenumber) for  ProjectPropertyName
    in (机电,[政府采购项目(线下)],国债技改项目,[同属政府采购、国债技改项目],涉密,[政府采购项目(二期)]))t
        """
#         sql2 = u""" select PurchaseStyleName as cgfs,
#   非政府采购国内一般项目 as gnzb,
#   国际项目 as gjzb,
#   政府采购 as zfcg,
#   国内涉密 as sm,
# 非政府采购国内一般项目+国际项目+政府采购+国内涉密 as zj from 
#  ( select c.PurchaseStyleName,  b.ProjectTypeName, d.packagenumber from project a, projectpackage d,projecttype b, PurchaseStyle c 
#   where a.projecttypeid=convert(int, b.projecttypeid) and a.PurchaseStyleId=convert(int, c.[PurchaseStyleId]) and a.id=d.projectid
#   and d.[CreationDate] between '"""+ksrq+u"' and '"+jsrq+u"""') a 
#   pivot (count(packagenumber) for  ProjectTypeName
#     in (非政府采购国内一般项目,国际项目,政府采购,国内涉密))t""" ;
        print sql2;
        sql3=u"""SELECT b.name as xmly, count(*) as xmsl, 0 as dwfc, 0 as yfc, 0 as sy 
  FROM project a,projectpackage d, [ProjectSource] b where a.ProjectSourceId=b.id and a.id=d.projectid
  and d.[CreationDate] between '"""+ksrq+u"' and '"+jsrq+u"""'
  group by b.name""";
        print sql3
        sql1 = u"""select PurchaseStyleName as cgfs,
购买标书 as bssr,
专家评审费 as xmcb, 
0 as dwfc,
0 as jxfc,
0 as ml,
0 as jl
 from 
(SELECT a.ywlx, a.je,  c.PurchaseStyleName
  FROM [cwls] a, project b, [PurchaseStyle] c  where a.projectid=b.id
  and b.PurchaseStyleId=convert(int, c.[PurchaseStyleId])
  and b.[CreationDate] between '"""+ksrq+u"' and '"+jsrq+u"""') a 
    pivot (sum(je) for  ywlx
    in (购买标书,投标保证金,退保证金,中标服务费,专家评审费, 其他 ))t"""
        print sql1
        result['tjzb_grid1'] = sqltoarray(sql1);
        result['tjzb_grid2'] = sqltoarray(sql2);
        result['tjzb_grid3'] = sqltoarray(sql3);
        return json.dumps(result).replace(u'None', u'') 
    except Exception as e:
        print e
        return u"fail"    


@auth.requires_login()
def gdwj():

    row={}
    row['viewflag'] = 1

    if auth.user_groups.has_key(CONST_MANAGER):
        row['viewflag'] = 0
    else:
        sql = u'select * from Project where Id = '+request.vars.projectid
        print sql 
        res = sqltoarray(sql)        
        if int(u'0'+res[0]['EmployeeId']) == auth.user.id or int(u'0'+res[0]['Assistant']) == auth.user.id:
            row['viewflag'] = 0
    row['projectid'] = request.vars.projectid
    row['projectname'] = request.vars.projectname
    print row
    return dict(**row);


def getwjglpz():
    try:
        result = {};
        sql = u"""select * from pzgdwj""";   
        return sqltojson(sql);
    except:
        return u"fail"    

#获取所有
def select_gdwj():
	try:
		projectid = request.vars.projectid
		lx = request.vars.type
		username = u'Test'
		if lx == '1':
			where = " and projectid="+projectid 
		else:
			where = u"and type="+lx+u" and projectid="+projectid 
		#print projectid, lx
		order = u" order by rq desc"
		sql = u"""select a.Id,a.rq,a.wjm,a.username,b.text as type from gdwj a, pzgdwj b where a.type=b.pzid """ +where+ order;
		#print sql   
		return sqltojson(sql);
	except:
		return u"fail";

import io,os,sys,uuid
def gdwjupload():
    try:
        f= request.vars.fileToUpload
        path = unicode(os.path.abspath('.'))
        filename = unicode(uuid.uuid1())
        dest_file = open(filename, u'wb')
        
        dest_file.write(f.value)
        dest_file.close();
        username = auth.user.chinesename.decode('gbk')
        filepath = path+'\\'+filename
        sql = "INSERT INTO gdwj(wjm, username,[type],projectid, wj)\
        SELECT '%s','%s',%s,%s,\
        * FROM OPENROWSET(BULK N'%s', SINGLE_BLOB)\
        as wj" % (unicode(f.filename, u'utf-8'), username, request.vars.type, request.vars.projectid, filepath)
        print sql
        db.executesql(sql)
        os.remove(filepath)
        db.commit()
        return 'success'
    except Exception as e:
        print e
        db.rollback()
        os.remove(filepath)
        return 'fail'
    # try:
    #     f= request.vars.fileToUpload
    #     table_name = u'gdwj'
    #     username = auth.user.chinesename.decode('gbk')
    #     rowData = {}
    #     rowData[u'username'] = username
    #     rowData[u'projectid'] = request.vars.projectid
    #     rowData[u'type'] = request.vars.type
    #     rowData[u'wjm'] = unicode(f.filename, u'utf-8')

    #     print rowData
    #     id = db[table_name].insert( **rowData)         
    #     return u'success'
    # except Exception as e:
    #     print e 
    #     return u'fail'       

import io
def downloadgdwj():
	try:
		row = db(db[u'gdwj']._id ==request.vars.gdwjid).select().first()
		response.headers["Content-Disposition"] = "attachment; filename=%s" % row[u'wjm']
        
        #output = io.StringIO()
        #output.write(row['wj'])
		b = io.BytesIO(row['wj'])
		#return response.stream(open('d:/dw.txt'))
		return response.stream(b)      
		#response.write(row[u'wj'], escape=False)
		#return HTTP(200, stream, **response.headers)
	except Exception as e:
		print e
		return 'fail'
	# if not request.args:
	# 	raise HTTP(404)
	# name = request.args[-1]
	# field = db["files"]["file"]
	# try:
	# 	(filename, file) = field.retrieve(name)
	# except IOError:
	# 	raise HTTP(404)
	# response.headers["Content-Type"] = c.contenttype(name)
	# response.headers["Content-Disposition"] = u"attachment; filename=%s" % row[u'wjm']
	# stream = response.stream(file, chunk_size=64*1024, request=request)
	# raise HTTP(200, stream, **response.headers)


def p_deleterow_gdwj(id):
    table_name = u'gdwj'
    print table_name
    deleterow(table_name, id)
        
def deleterow_gdwj():
    try:
        
        id = request.vars.Id
        p_deleterow_gdwj(id)
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail" 

def pzgl():
    return dict();

def getpzglpz():
    try:
        sql = u"""select * from pzgl""";   
        return sqltojson(sql);
    except:
        return u"fail"      

def select_pzgl():
    try:
        tablename = request.vars.tablename
        if tablename=='OperationType':
            sql = 'select Id, [OperationTypeId] as pzid, [OperationTypeCode] as code, [OperationTypeName] as text from [OperationType]'
        if tablename == 'ProtocolCodeType':
            sql = 'select [Id],[TypeId] as pzid  ,[TypeCode] as code ,[TypeName] as text from ProtocolCodeType'
        if tablename == 'ProjectType':
            sql = 'select [Id],[ProjectTypeId] as pzid  ,[ProjectTypeCode] as code ,[ProjectTypeName] as text from ProjectType'            
        if tablename == 'PurchaseStyle':
            sql = 'select [Id],[PurchaseStyleId] as pzid  ,[PurchaseStyleCode] as code ,[PurchaseStyleName] as text from PurchaseStyle'            
        if tablename == 'ProjectSource':
            sql = 'select [Id],[Id] as pzid,[Id] as code ,[Name] as text from ProjectSource'         
        if tablename == 'hys':
            sql = 'select [Id],[Id] as pzid,[Id] as code ,[hys] as text from hys'    
        if tablename == 'ProjectProperty':
            sql = 'select [Id],[ProjectPropertyId] as pzid,[ProjectPropertyCode] as code,[ProjectPropertyName] as text FROM [BIDDING].[dbo].[ProjectProperty]'                   
        if tablename == 'pzgdwj':
            sql = 'select [Id],pzid  ,\'\' as code , text from pzgdwj'            
        print sql
        return sqltojson(sql);
    except Exception as e:
        print e
        return 'fail'

def convert_pzgldata(tablename, rowData):
    row = {}
    if tablename=='OperationType':
        row['OperationTypeId'] = rowData['pzid']
        row['OperationTypeCode'] = rowData['code']
        row['OperationTypeName'] = rowData['text']
    if tablename == 'ProtocolCodeType':
        row['TypeId'] = rowData['pzid']
        row['TypeCode'] = rowData['code']
        row['TypeName'] = rowData['text']            
    if tablename == 'ProjectType':
        row['ProjectTypeId'] = rowData['pzid']
        row['ProjectTypeCode'] = rowData['code']
        row['ProjectTypeName'] = rowData['text']               
    if tablename == 'PurchaseStyle':
        row['PurchaseStyleId'] = rowData['pzid']
        row['PurchaseStyleCode'] = rowData['code']
        row['PurchaseStyleName'] = rowData['text']    
    if tablename == 'ProjectSource':
        row['Name'] = rowData['text']       
    if tablename == 'hys':
        row['hys'] = rowData['text']   
    if tablename == 'ProjectProperty':
        row['ProjectPropertyId'] = rowData['pzid']
        row['ProjectPropertyCode'] = rowData['code']
        row['ProjectPropertyName'] = rowData['text']                                        
    if tablename == 'pzgdwj':
        row['pzid'] = rowData['pzid']
        row['text'] = rowData['text']    

    return row

def insertrow_pzgl():
    try:
        rowData = request.post_vars
        tablename = request.vars.tablename
        row = convert_pzgldata(tablename, rowData)
        insertrow(tablename, row) 
        db.commit()
        return 'success'
    except Exception as e:
        print e
        db.rollback()
        return 'fail'            

def updaterow_pzgl():
    try:
        rowData = request.post_vars
        tablename = request.vars.tablename
        id = request.vars.Id
        row = convert_pzgldata(tablename, rowData)
        updaterow(tablename, id, row) 
        db.commit()
        return 'success'
    except Exception as e:
        print e
        db.rollback()
        return 'fail'   

def deleterow_pzgl():
    try:
        id = request.vars.Id
        tablename = request.vars.tablename
        deleterow(tablename, id)
        db.commit()
        return u"success"
    except Exception as e:
        print e
        db.rollback()
        return u"fail"  


def zbfwf_print():
    sql = u"""select PackageNumber as pn, b.dwmc, a.NoticeDate as rq,  b.nsrsbh, b.lxdz, b.dh, a.ChargeRate as je, b.khyh, b.yhzh   from ProjectPackage a left join kh b
on a.WinningCompany=b.dwmc where a.PackageNumber='"""+request.vars.PackageNumber+u"'";
    print sql
    rows = rawsqltojson(sql);   
    
    row = rows[0]

    row[u'rq'] = row[u'rq'][0:10]
    row[u'zje'] = Num2MoneyFormat(row[u'je'])
    return dict(**row)        

def getProjectView():
    projectid = request.vars.id
    sql = u"""
select a.dwmc, b.zje as gmbsje, c.zje as tbbzjje, d.zje as tbzjje from 
(SELECT dwmc
  FROM [BIDDING].[dbo].[gmbs]
  where bsbh in (select PackageNumber from BIDDING.dbo.ProjectPackage where projectid = """+projectid+u""")
union
select distinct dwmc from bidding.dbo.tbbzj where projectid = """+projectid+u"""
union
select distinct dwmc from bidding.dbo.tbzj where projectid = """+projectid+u""")a
left join (select dwmc, sum(je) zje from gmbs where bsbh in (select PackageNumber from BIDDING.dbo.ProjectPackage where projectid = """+projectid+u""")
group by dwmc)b
on a.dwmc =b.dwmc
left join (select dwmc, sum(je) zje from bidding.dbo.tbbzj where projectid = """+projectid+u"""
group by dwmc)c
on a.dwmc =c.dwmc
left join (select dwmc, sum(je) zje from bidding.dbo.tbzj where projectid = """+projectid+u"""
group by dwmc)d
on a.dwmc =d.dwmc
    
"""
    return sqltojson(sql)

def p_generatebh():
    table_name = u'pzbh'
    nf = time.localtime().tm_year
    row = db((db[table_name].lx == u'Project')&(db[table_name].nf==nf)).select().first()
    print row
    if row == None:
        print '.....'
        rowData={}
        rowData[u'lx'] = u'Project'
        rowData[u'nf'] = nf
        rowData[u'bh'] = 1     
        db[table_name].insert(**rowData)
        bh = 1   
    else:
        print row
        id = row[u'id']
        rowData={}
        rowData[u'lx'] = row[u'lx']
        rowData[u'nf'] = row[u'nf']
        rowData[u'bh'] = int(row[u'bh'])+1   
        db(db[table_name]._id == id).update(**rowData)
        bh = int(row[u'bh'])+1   
    return 'success'

def getprojectbh():
    return p_generatebh()







def CreateCustomer():
    try:
        username = auth.user.chinesename.decode('gbk')
#         username = auth.user.username
        rowData = request.post_vars
        rowData[u'username'] = username
        result = p_addkh(rowData)
        db.commit()
        return json.dumps(result)
    except Exception as e:
        print e
        db.rollback()
        return u"fail"


def p_getebh(xmlx):
    table_name = u'xmbh'
    nf = time.localtime().tm_year
    row = db((db[table_name].xmlx == xmlx)&(db[table_name].nf==nf)).select().first()
    print row
    result = ''
    if row == None:
        print '.....'
        rowData={}
        rowData[u'xmlx'] = xmlx
        rowData[u'nf'] = nf
        rowData[u'bh'] = 1     
        db[table_name].insert(**rowData)
        bh = 1   
    else:
        print row
        id = row[u'id']
        rowData={}
        rowData[u'xmlx'] = row[u'xmlx']
        rowData[u'nf'] = row[u'nf']
        rowData[u'bh'] = int(row[u'bh'])+1   
        db(db[table_name]._id == id).update(**rowData)
        bh = int(row[u'bh'])+1
    if xmlx == u'0':
        return unicode(bh).zfill(4)
    elif xmlx == u'1':
        return unicode(bh).zfill(3)
    else:
        return 'success'   
    

def generatesql():
    ts = ['[pzgdwj]', '[ProtocolCodeType]', '[FundingSource]','[ManagementStyle]','[OperationType]','[ProjectSource]','[ProjectStatus]','[ProjectType]','[PurchaseStyle]','[pzgl]','[ProjectProperty]','[ProjectSource]', '[hys]']
    result=''
    for t in ts:
        result += unicode('SET IDENTITY_INSERT '+t+' ON' + "<br/>")
        sql = 'proc_insert '+t
        r = sqltoarraynodict(sql)
        result+="<br/>".join(r) + "<br/>"
        result+=unicode('SET IDENTITY_INSERT '+t+' OFF' +'<br/>')
    print result
    return result