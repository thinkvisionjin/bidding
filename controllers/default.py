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