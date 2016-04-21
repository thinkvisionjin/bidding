# -*- coding: utf-8 -*-
#01.当py文件中中文时一定要使用上面的一个编码注释
from gluon import DAL, Field
import pyodbc
#02.设置字符串缺省的编码，如果不这样的话str无法使用
import sys
import json

reload(sys)
sys.setdefaultencoding('utf-8')
str_db = u'mssql4://sa:1@localhost/BIDDING'
#03.连接需要用utf8字符集，这样返回的中文结果可直接解码
db = DAL(str_db,db_codec='utf-8',migrate_enabled=False)
print db._uri
print db._dbname
db.define_table('BankRecord',Field('Account'),Field('CompanyName'),Field('CreateDate'),Field('Money'),Field('Note'),Field('TradingTime'))
db.define_table('Customer',Field('Address1'),Field('Address2'),Field('CompanyName'),Field('CompanyPhone'),Field('ContactName'),Field('CreationDate'),Field('Email'),Field('EmployeeId'),Field('Fax'),Field('IsDelete'),Field('MobilePhone'),Field('Note'),Field('PassWord'),Field('Position'),Field('Type'),Field('UserName'),Field('ZipCode'))
db.define_table('Employee',Field('Address'),Field('Age'),Field('Code'),Field('CompanyPhone'),Field('CreationDate'),Field('DateOfBirth'),Field('Department'),Field('Email'),Field('EmergencyContactName'),Field('EmergencyContactPhone'),Field('EmergencyContactRelationship'),Field('HomePhone'),Field('IsDelete'),Field('MobilePhone'),Field('Name'),Field('Note'),Field('PassWord'),Field('Position'),Field('SexId'),Field('Type'),Field('UserName'))
db.define_table('Finance',Field('Activity'),Field('CreationDate'),Field('EmployeeId'),Field('Income'),Field('IsDelete'),Field('Note'),Field('ProjectCodeId'),Field('ProtocolCodeId'),Field('Spending'),Field('TargetId'),Field('TitleId'))
db.define_table('Log',Field('Agent'),Field('CreationDate'),Field('Ip'),Field('Kind'),Field('Note'),Field('UserId'))
db.define_table('Management',Field('Code'),Field('CreationDate'),Field('IsDelete'),Field('Name'))
db.define_table('MoneyType',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('ProjectCode',Field('CreationTime'),Field('EmployeeId'),Field('IsDelete'),Field('Option1'),Field('Option2'),Field('Option3'),Field('ProjectNumber'),Field('ProjectTypeId'),Field('ProtocolId'))
db.define_table('ProjectResource',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('Projects',Field('Assistant'),Field('BuyerId'),Field('ChargeRate'),Field('CreationDate'),Field('EmployeeId'),Field('EntrustMoney'),Field('IsDelete'),Field('MakeOutDate'),Field('ManagementStyleId'),Field('Note'),Field('Package'),Field('ProjectCodeId'),Field('ProjectName'),Field('ProjectSourceId'),Field('ProjectTypeId'),Field('ProtocolCodeId'),Field('SigningDate'),Field('SourcesOfFundingId'),Field('StateId'),Field('WinningCompany'),Field('WinningMoney'))
db.define_table('ProjectStatus',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('ProtocolCode',Field('CreationTime'),Field('EmployeeId'),Field('IsDelete'),Field('ProtocolNumber'),Field('TypeId'))
db.define_table('Suggest',Field('Content'),Field('CreationTime'),Field('IsDelete'),Field('UserId'))
db.define_table('Task',Field('CreationDate'),Field('Deadline'),Field('EmployeeId'),Field('IsDelete'),Field('Note'),Field('PlaceId'),Field('ProjectId'),Field('StateId'),Field('TitleId'))
db.define_table('TaskLocation',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('TaskStatus',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('TypeOfTask',Field('CreationDate'),Field('IsDelete'),Field('Name'),Field('OrderId'))
    

def update():
    table_name = 'ProtocolCode'
    row = {'TypeId': 111121, 'EmployeeId': 700, 'CreationTime': '01/01/16 20:08', 'ProtocolNumber': '11111111111111', 'IsDelete': True, 'id': 6L}
    if table_name == 'ProtocolCode':
        id = '6'
        db(db['ProtocolCode']._id == id).update(**{'TypeId':row['TypeId']})
        db(db['ProtocolCode']._id == id).update(**{'EmployeeId':row['EmployeeId']})
        db(db['ProtocolCode']._id == id).update(**{'CreationTime':row['CreationTime']})
        db(db['ProtocolCode']._id == id).update(**{'ProtocolNumber':row['ProtocolNumber']})
        db(db['ProtocolCode']._id == id).update(**{'IsDelete':row['IsDelete']})
        row = db(db['ProtocolCode']._id ==id).select().first()
        print row
        db.commit()
        
    return dict(table=table_name)
#update()


def insert():
    table_name = 'ProtocolCode'
    rowData = {'TypeId': 1111111111,
               'EmployeeId': 700, 
               'CreationTime': '01/01/16 20:08', 
               'ProtocolNumber': 111111111, 'IsDelete': True}
    if table_name == 'ProtocolCode':
#         id = db.ProtocolCode.insert(TypeId=rowData['TypeId'],
#                                     EmployeeId=rowData['EmployeeId'],
#                                     ProtocolNumber=rowData['ProtocolNumber'],
#                                     IsDelete=rowData['IsDelete'])
        id = db.ProtocolCode.insert(**rowData)
        row = db(db['ProtocolCode']._id ==id).select().first()
        dic_row = {'Id':row.id,'ProtocolNumber':row.ProtocolNumber,'TypeId':row.TypeId,
                        'EmployeeId':row.EmployeeId,'CreationTime':row.CreationTime.strftime("%d/%m/%y %H:%M"),'IsDelete':row.IsDelete}
        result = json.dumps(dic_row,ensure_ascii=False)
        print result
        db.commit()
#     jsondata = request.
    return result

insert()