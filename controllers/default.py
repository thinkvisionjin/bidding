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
#     rowData = {'TypeId': 1111111111,
#                'EmployeeId': 700, 
#                'CreationTime': '01/01/16 20:08', 
#                'ProtocolNumber': 111111111, 'IsDelete': True}
    print rowData
    if table_name == 'ProtocolCode':
        id = db[table_name].insert(**rowData)
        row = db(db[table_name]._id ==id).select().first()
        dic_row = {'Id':row.id,'ProtocolNumber':row.ProtocolNumber,'TypeId':row.TypeId,
                        'EmployeeId':row.EmployeeId,'CreationTime':row.CreationTime.strftime("%d/%m/%y %H:%M"),'IsDelete':row.IsDelete}
        result = json.dumps(dic_row,ensure_ascii=False)
        print result
        db.commit()
    return result

def delete():
    print 'deleting row**************'
    table_name = request.vars.table
    id = request.post_vars['Id']
    if table_name == 'ProtocolCode':
        row = db(db['ProtocolCode']._id ==id).select().first()
        print row
        db(db['ProtocolCode']._id == id).delete()
        db.commit()
    return dict(table=table_name)

def update():
    print 'updating row**************'
    table_name = request.vars.table
    if table_name == 'ProtocolCode':
        print request.post_vars   
        id = request.post_vars['Id']
        print id
        db(db['ProtocolCode']._id == id).update(**{'TypeId':request.post_vars['TypeId']})
        db(db['ProtocolCode']._id == id).update(**{'EmployeeId':request.post_vars['EmployeeId']})
        db(db['ProtocolCode']._id == id).update(**{'CreationTime':request.post_vars['CreationTime']})
        db(db['ProtocolCode']._id == id).update(**{'ProtocolNumber':request.post_vars['ProtocolNumber']})
        db(db['ProtocolCode']._id == id).update(**{'IsDelete':request.post_vars['IsDelete']})
        row = db(db['ProtocolCode']._id ==id).select().first()
        print row
        db.commit()
    return dict(table=table_name)

def select():
    print 'selecting rows**************'
    table_name = request.vars.table
    if table_name == 'ProtocolCode':
        dic_rows = []
        for row in db().select(db.ProtocolCode.ALL):
            print row
            dic_row = {'Id':row.id,'ProtocolNumber':row.ProtocolNumber,'TypeId':row.TypeId,
                        'EmployeeId':row.EmployeeId,'CreationTime':row.CreationTime.strftime("%d/%m/%y %H:%M"),'IsDelete':row.IsDelete}
            dic_rows.append(dic_row)
    #AUTO-GENERATING#
    
    return json.dumps(dic_rows,ensure_ascii=False)

###############业务处理页面################################

def ProtocolCode():
    return dict();

def ProjectCode():
    return dict();
