# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
#########################################################################

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
    return dict(form=auth())


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
    print 'inserting data**************'
    table_name = request.vars.table
    rowData = request.post_vars
    print rowData
    id = db[table_name].insert(**rowData)
    print id 
    row = db(db[table_name]._id ==id).select().first()
    dict_row = {}
    for key in row.keys():
        if (key== 'update_record' or key== 'delete_record' or key =='PackageName'):
            print 'ignore some keys'
            if(key =='PackageName'):
                print key
                print row[key]
#                 print row[key].decode("gb2312");
                print unicode(row[key])
                print "*********"
#                 print 'encode gb2312   ',row[key].encode('gb2312')
#                 print 'decode gb2312  ',row[key].decode('gb2312')
#                 print 'encode utf-8  ',row[key].encode('utf-8')
#                 print 'decode utf-8   ',row[key].decode('utf-8')
        elif key=='id':
            dict_row['Id']  = row[key]
        else:
            if isinstance(row[key], bool):
                dict_row[key] = row[key]
            else:
                dict_row[key] = unicode(row[key])
    db.commit()
    result= json.dumps(dict_row,ensure_ascii=False)
    print result
    return result

def delete():
    print 'deleting row**************'
    table_name = request.vars.table
    print table_name
    id = request.post_vars['Id']
    print id 
    row = db(db[table_name]._id ==id).select().first()
    print row
    db(db[table_name]._id == id).delete()
    db.commit()
    return dict(table=table_name)

def update():
    print 'updating row**************'
    table_name = request.vars.table
    if table_name == 'ProtocolCode':
        print request.post_vars   
        row_data = request.post_vars
        id = row_data['Id']
        print id
        for key in row_data:
            if key!='Id':
                print key
                db(db[table_name]._id == id).update(**{key:request.post_vars[key]})
                print '****'
        row = db(db[table_name]._id ==id).select().first()
        db.commit()
    return dict(table=table_name)

def select():
    print 'selecting rows**************'
    table_name = request.vars.table
    myqueryfields =  request.post_vars
    for key in myqueryfields.keys():
        print key,myqueryfields[key]
    myquery = "";
    print myqueryfields
    if len(myqueryfields)!=0:
        myquery = 'TypeId=0'
    dic_rows = []
    print table_name
    for row in db(myquery).select(db[table_name].ALL):
        print row
        dict_row = {}
        for key in row.keys():
            if (key== 'update_record' or key== 'delete_record'):
                print 'ignore some keys:' + key
            elif key=='id':
                dict_row['Id']  = row[key]
            else:
                if isinstance(row[key], bool):
                    dict_row[key] = row[key]
                else:
                    dict_row[key] = unicode(row[key])
        dic_rows.append(dict_row)
    return json.dumps(dic_rows,ensure_ascii=False)

###############业务处理页面################################

def testdb():
    records=db().select(db['ProtocolCode'].ALL)
    return SQLTABLE(records)

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
    try:    
        id = db[table_name].insert(**rowData)
    except:
        return u"fail"
    return u"success" ; 



def updaterow():
    try:    
        db(db[table_name]._id == id).update(**rowData)
    except:
        return u"fail"
    return u"success"     




def deleterow(table_name, id):
    try:   
        db(db[table_name]._id == id).delete()
    except:
        return u"fail"
    return u"success" 

def p_getbsbh(uid):
    sql = u"""select PackageNumber from ProjectPackage""";   
    return sqltoarray(sql);

#购买标书代码
#定制代码
def getkh():
    sql = u"""select * from kh where dwmc='"""+request.vars.dwmc+u"'";
    return sqltojson(sql);

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

def print_gmbs():
    table_name = u'gmbs'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    rows = rawsqltojson(sql);    
    row = rows[0]
    print row
    row[u'rq'] = row[u'rq'][0:10]
    row[u'zje'] = Num2MoneyFormat(row[u'je'])
    return dict(**row)

def select_gmbs():
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

def updaterow_gmbs():
    table_name = u'gmbs'
    id = request.vars.id
    rowData = request.post_vars
    return updaterow(table_name, id, rowData)

def insertrow_gmbs():
    table_name = u'gmbs'
    username = u'Test'
    rowData = request.post_vars
    rowData[u'username'] = username
    print u"insertrow gmbs"
    print rowData
    return insertrow(table_name, rowData)

def deleterow_gmbs():
    table_name = u'gmbs'
    id = request.vars.Id
    print table_name
    print id
    return deleterow(table_name, id)
   

def selectone_gmbs():
    table_name = u'gmbs'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    return sqltojson(sql);

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

def updaterow_kh():
    table_name = u'kh'
    id = request.vars.id
    rowData = request.post_vars
    return updaterow(table_name, id, rowData)

def insertrow_kh():
    table_name = u'kh'
    username = u'Test'
    rowData = request.post_vars
    rowData[u'username'] = username
    print u"insertrow kh"
    print rowData
    return insertrow(table_name, rowData)

def deleterow_kh():
    table_name = u'kh'
    id = request.vars.Id
    print table_name
    print id
    return deleterow(table_name, id)
   

def selectone_kh():
    table_name = u'kh'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    return sqltojson(sql);

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

def updaterow_tbbzj():
    table_name = u'tbbzj'
    id = request.vars.id
    rowData = request.post_vars
    return updaterow(table_name, id, rowData)

def insertrow_tbbzj():
    table_name = u'tbbzj'
    username = u'Test'
    rowData = request.post_vars
    rowData[u'username'] = username
    print u"insertrow tbbzj"
    print rowData
    return insertrow(table_name, rowData)

def deleterow_tbbzj():
    table_name = u'tbbzj'
    id = request.vars.Id
    print table_name
    print id
    return deleterow(table_name, id)
   

def selectone_tbbzj():
    table_name = u'tbbzj'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    return sqltojson(sql);



def gettbbzjpz():
    uid = u''
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(uid)
    result[u'bzjlx'] = [u'现金', u'保函']
    return json.dumps(result)  

def print_tbzj():
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

def updaterow_tbzj():
    table_name = u'tbzj'
    id = request.vars.id
    rowData = request.post_vars
    return updaterow(table_name, id, rowData)

def insertrow_tbzj():
    table_name = u'tbzj'
    username = u'Test'
    rowData = request.post_vars
    rowData[u'username'] = username
    print u"insertrow tbzj"
    print rowData
    return insertrow(table_name, rowData)

def deleterow_tbzj():
    table_name = u'tbzj'
    id = request.vars.Id
    print table_name
    print id
    return deleterow(table_name, id)
   

def selectone_tbzj():
    table_name = u'tbzj'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    return sqltojson(sql);

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

def updaterow_zb():
    table_name = u'zb'
    id = request.vars.id
    rowData = request.post_vars
    return updaterow(table_name, id, rowData)

def insertrow_zb():
    table_name = u'zb'
    username = u'Test'
    rowData = request.post_vars
    rowData[u'username'] = username
    print u"insertrow zb"
    print rowData
    return insertrow(table_name, rowData)

def deleterow_zb():
    table_name = u'zb'
    id = request.vars.Id
    print table_name
    print id
    return deleterow(table_name, id)
   

def selectone_zb():
    table_name = u'zb'
    sql = u"""select * from """+table_name+u""" where Id="""+request.vars.Id;
    return sqltojson(sql);


def getzbpz():
    uid = u'';
    result = {};
    sql = u"""select dwmc from kh""";   
    result[u'dwmc'] = sqltoarraynodict(sql);

    result[u'bsbh'] = p_getbsbh(uid);
    return json.dumps(result) 