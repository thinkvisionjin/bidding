# -*- coding: utf-8 -*-
#########################################################################
## Define your tables below (or better in another model file) for example
from gluon import DAL, Field
import pyodbc
#02.设置字符串缺省的编码，如果不这样的话str无法使用
import sys
import json
from gluon.tools import *

# reload(sys)
# sys.setdefaultencoding('utf-8')
str_db = u'mssql4://sa:1@localhost/BIDDING'
#03.连接需要用utf8字符集，这样返回的中文结果可直接解码

db = DAL(str_db,migrate_enabled=False)
dbu = DAL('sqlite://storage.sqlite')
auth = Auth(dbu)
auth.define_tables(username=True)
crud = Crud(dbu)
print db._uri

db.define_table('BankRecord',Field('Account'),Field('CompanyName'),Field('CreateDate'),Field('Money'),Field('Note'),Field('TradingTime'))
db.define_table('BiddingCountType',Field('BiddingCountTypeCode'),Field('BiddingCountTypeId'),Field('BiddingCountTypeName'))
db.define_table('BiddingSiteStatisticType',Field('BiddingSiteStatisticTypeCode'),Field('BiddingSiteStatisticTypeId'),Field('BiddingSiteStatisticTypeName'))
db.define_table('Columns_ProtocolCode',Field('columnlabel'),Field('columnname'),Field('typename'))
db.define_table('Customer',Field('Address1'),Field('Address2'),Field('CompanyName'),Field('CompanyPhone'),Field('ContactName'),Field('CreationDate'),Field('Email'),Field('EmployeeId'),Field('Fax'),Field('IsDelete'),Field('MobilePhone'),Field('Note'),Field('PassWord'),Field('Position'),Field('Type'),Field('UserName'),Field('ZipCode'))
db.define_table('Employee',Field('Address'),Field('Age'),Field('Code'),Field('CompanyPhone'),Field('CreationDate'),Field('DateOfBirth'),Field('Department'),Field('Email'),Field('EmergencyContactName'),Field('EmergencyContactPhone'),Field('EmergencyContactRelationship'),Field('HomePhone'),Field('IsDelete'),Field('MobilePhone'),Field('Name'),Field('Note'),Field('PassWord'),Field('Position'),Field('SexId'),Field('Type'),Field('UserName'))
db.define_table('Finance',Field('Activity'),Field('CreationDate'),Field('EmployeeId'),Field('Income'),Field('IsDelete'),Field('Note'),Field('ProjectCodeId'),Field('ProtocolCodeId'),Field('Spending'),Field('TargetId'),Field('TitleId'))
db.define_table('Log',Field('Agent'),Field('CreationDate'),Field('Ip'),Field('Kind'),Field('Note'),Field('UserId'))
db.define_table('Management',Field('Code'),Field('CreationDate'),Field('IsDelete'),Field('Name'))
db.define_table('ManagementStyle',Field('ManagementStyleCode'),Field('ManagementStyleId'),Field('ManagementStyleName'))
db.define_table('FundingSource',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('OperationType',Field('OperationTypeCode'),Field('OperationTypeId'),Field('OperationTypeName'))
db.define_table('Project',Field('Assistant'),Field('CustomerId'),Field('CreationDate'),Field('EmployeeId'),Field('IsDelete'),Field('ManagementStyleId'),Field('PurchaseStyleId'),Field('Note'),Field('ProjectCode'),Field('ProjectName'),Field('ProjectSourceId'),Field('ProjectTypeId'),Field('ProtocolCodeId'),Field('FundingSourceId'),Field('ProjectStatusId'))
db.define_table('ProjectCode',Field('CreationTime'),Field('EmployeeId'),Field('IsDelete'),Field('Option1'),Field('Option2'),Field('Option3'),Field('ProjectNumber'),Field('ProjectTypeId'),Field('ProtocolId'))
db.define_table('ProjectPackage',Field('ChargeRate'),Field('CreationDate'),Field('EntrustMoney'),Field('IsDelete'),Field('MakeOutDate'),Field('Note'),Field('PackageName'),Field('PackageNumber'),Field('ProjectId'),Field('SigningDate'),Field('StateId'),Field('WinningCompany'),Field('WinningMoney'))
db.define_table('ProjectSource',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('ProjectStatus',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('ProjectType',Field('ProjectTypeCode'),Field('ProjectTypeID'),Field('ProjectTypeName'))
db.define_table('ProtocolCode',Field('CreationTime',default=request.now,type='datetime'),Field('EmployeeId',default=auth.user_id),Field('IsDelete'),Field('ProtocolNumber'),Field('TypeId'))
db.define_table('ProtocolCodeType',Field('TypeCode'),Field('TypeId'),Field('TypeName'))
db.define_table('PurchaseStyle',Field('PurchaseStyleCode'),Field('PurchaseStyleId'),Field('PurchaseStyleName'))
db.define_table('Suggest',Field('Content'),Field('CreationTime'),Field('IsDelete'),Field('UserId'))
db.define_table('Task',Field('CreationDate'),Field('Deadline'),Field('EmployeeId'),Field('IsDelete'),Field('Note'),Field('PlaceId'),Field('ProjectId'),Field('StateId'),Field('TitleId'))
db.define_table('TaskLocation',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('TaskStatus',Field('CreationTime'),Field('IsDelete'),Field('Name'))
db.define_table('TypeOfTask',Field('CreationDate'),Field('IsDelete'),Field('Name'),Field('OrderId'))
#########################################################################

## after defining tables, uncomment below to enable auditing
# auth.enable_record_versioning(db)
