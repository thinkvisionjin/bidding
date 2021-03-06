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
str_db = u'mssql4://sa:sohunj123@localhost/BIDDING'
#03.连接需要用utf8字符集，这样返回的中文结果可直接解码

db = DAL(str_db,migrate_enabled=False)
dbu = DAL(str_db,migrate_enabled=False)
auth = Auth(dbu)
auth.settings.extra_fields['auth_user']= [Field('chinesename'), Field('code')]
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
db.define_table('ProjectProperty',Field('ProjectPropertyCode'),Field('ProjectPropertyId'),Field('ProjectPropertyName'))
db.define_table('Project',Field('Assistant'),Field('ContactorNameId'),Field('CustomerId'),Field('CreationDate',type='datetime',default=request.now),Field('EmployeeId',default=auth.user_id),Field('IsDelete'),Field('ManagementStyleId'),Field('PurchaseStyleId'),Field('Note'),Field('ProjectCode'),Field('ProjectName'),Field('ProjectSourceId'),Field('ProjectTypeId'),Field('ProtocolCodeId'),Field('FundingSourceId'),Field('ProjectStatusId'), Field('ProjectPropertyId'))
db.define_table('ProjectCode',Field('CreationTime'),Field('EmployeeId'),Field('IsDelete'),Field('Option1'),Field('Option2'),Field('Option3'),Field('ProjectNumber'),Field('ProjectTypeId'),Field('ProtocolId'))
db.define_table('ProjectPackage',Field('NoticeDate'),Field('ChargeRate'),Field('OpenDate'),Field('ReviewDate'),Field('PublicDate'),Field('CreationDate',type='datetime',default=request.now),Field('EntrustMoney'),Field('IsDelete'),Field('MakeOutDate'),Field('Note'),Field('PackageName'),Field('PackageNumber'),Field('ProjectId'),Field('SigningDate'),Field('StateId'),Field('WinningCompany'),Field('WinningMoney'), Field('SecondPublicDate'), Field('comment'), Field('WinningDollar'))
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
#db.define_table('gmbs',Field('dwmc'),Field('rq'),Field('zzszwmc'),Field('zzsywmc'),Field('zzsgb'),Field('lxdz'),Field('lxr'),Field('sj'),Field('dzxx'),Field('cz'),Field('bsbh'),Field('je'),Field('username'),Field('ly'),Field('lyId'))
db.define_table('gmbs', Field('dwmc'),Field('nsrsbh'),Field('lxdz'),Field('dh'),Field('khyh'),Field('yhzh'),Field('zzsdwmc'),Field('lxr'),Field('sj'),Field('lxrdh'),Field('lxrdz'),Field('dzxx'),Field('cz'),Field('bsbh'),Field('je'),Field('rq'),Field('username'),Field('ly'), Field('lyId'), Field('fkbz'), Field('fkrq'))
db.define_table('kh', Field('nsrsbh'),Field('dwmc'),Field('rq'),Field('khyh'),Field('yhzh'),Field('lxdz'),Field('dzxx'),Field('cz'),Field('dh'), Field('username'))
db.define_table('tbbzj', Field('dwmc'),Field('projectid'),Field('bzjlx'),Field('je'),Field('rq'),Field('username'),Field('ly'),Field('lyId'))
db.define_table('tbzj', Field('tbzjrq'), Field('dwmc'),Field('rq'),Field('projectid'),Field('username'),Field('ly'),Field('khyh'),Field('yhzh'),Field('fkfs'),Field('je'))
db.define_table('zb', Field('bsbh'),Field('zbdw1'),Field('zbdw2'),Field('zbdw3'),Field('username'),Field('rq'))#########################################################################
db.define_table('grtjb', Field('xm'),Field('gngk'),Field('gnyq'),Field('dylycg'),Field('jzxtp'),Field('xjcg'),Field('jzxcs'),Field('qt'),Field('gjzb'),Field('zj'))

db.define_table('yhlswj', Field('rq'),Field('wjm'),Field('username'))
db.define_table('yhls', Field('jysj'),Field('je'),Field('zy'),Field('dfmc'),Field('dfzh'),Field('qrje'),Field('cwqrje'),Field('wjmId'), Field('wjm'))
db.define_table('yhlsqr', Field('dwmc'),Field('bsbh'),Field('qrlx'),Field('rq'),Field('qrje'),Field('yhlsId'),Field('cwqrbz'),Field('username'))
db.define_table('lxr', Field('khId'),Field('lxr'),Field('sj'),Field('dz'),Field('dh'),Field('rq'),Field('username'),Field('cz'), Field('yx'))
db.define_table('cwls', Field('projectid'),Field('sz'),Field('je'),Field('zy'),Field('ywlx'),Field('lyId'),Field('username'),Field('rq'))
db.define_table('pbcy', Field('bsbh'),Field('zjxx'),Field('zfy'),Field('username'),Field('rq'))
db.define_table('zj', Field('xm'),Field('gzdw'),Field('username'),Field('rq'))
db.define_table('rcb', Field('description'),Field('applyuser'),Field('bsbh'),Field('subject'),Field('calendar'),Field('rcbstart'),Field('rcbend'),Field('rcbid'),Field('rq'))
db.define_table('auth_user', Field('username'),Field('chinesename'),Field('password'),Field('code'))
db.define_table('auth_membership', Field('user_id'), Field('group_id'))
db.define_table('hysgl', Field('username'),Field('hyzt'),Field('hys'),Field('kssj'),Field('jssj'),Field('rq'))
db.define_table('gdwj', Field('username'),Field('rq'),Field('type'),Field('wj'),Field('wjm'),Field('projectid'))
db.define_table('pzgdwj', Field('pzid'), Field('text'), Field('parentid'))
db.define_table('pzbh', Field('lx'), Field('nf'), Field('bh'))
db.define_table('xmbh', Field('nf'), Field('xmlx'), Field('bh'))
db.define_table('xybh', Field('nf'), Field('xylx'), Field('bh'))