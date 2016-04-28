# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations
from datetime import datetime

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
#########################################################################

# @auth.requires_login()
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
    print rowData['ProjectName'].decode('utf-8')
    data = rowData['ProjectName'].decode('utf-8')
    rowData['ProjectName'] = data
    print  rowData['ProjectName']
    id = db[table_name].insert(**rowData)
    db.commit()
    row = db(db[table_name]._id ==id).select().first()
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

def delete():
    table_name = request.vars.table
    print 'delete data from:'  +table_name +'**************'
    id = request.post_vars['Id']
    row = db(db[table_name]._id ==id).select().first()
    db(db[table_name]._id == id).delete()
    db.commit()
    return dict(table=table_name)

def update():
    table_name = request.vars.table
    print 'update data into:'  +table_name +'**************'
    row_data = request.post_vars
    id = row_data['Id']
    for key in row_data:
        if key!='Id':
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


def manage_transactions():
    grid = SQLFORM.smartgrid(db.Project,linked_tables=['Package','ProtocolCode'],
                             user_signature=False)
    return dict(grid=grid)
