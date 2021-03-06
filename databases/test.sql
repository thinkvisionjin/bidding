select a.name as columnname,
c.name typename
--a.max_length,
--a.precision,
--a.scale
from sys.columns a,
sys.objects b,
sys.types c,
 ::fn_listextendedproperty('MS_Description','user','dbo','table','ProtocolCode','column',default) d
where a.object_id=b.object_id 
and a.user_type_id=c.user_type_id
and b.type='u'
and b.name = 'ProtocolCode'
--and c.name in('varchar','nvarchar','char','nchar','text','ntext')
--and object_name(a.object_id)<>'t'
order by b.name

use master
SELECT   *
FROM   ::fn_listextendedproperty('MS_Description','user','dbo','table','ProtocolCode','column',default)

select a.name as columnname,c.name typename,cast(d.value as nvarchar(128)) as columnlabel
from sys.columns a,     sys.objects b,    sys.types c,   (select * from ::fn_listextendedproperty('MS_Description','user','dbo','table','ProtocolCode','column',default)) d
where a.object_id=b.object_id and d.objname = a.name collate  Chinese_PRC_CI_AS
and a.user_type_id=c.user_type_id   and b.type='u' and b.name = 'ProtocolCode'


select a.name as columnname,c.name typename,cast(d.value as nvarchar(128)) as columnlabel  
into  BIDDING.dbo.Columns_ProtocolCode  from sys.columns a,     sys.objects b,    sys.types c,    
(select * from ::fn_listextendedproperty('MS_Description','user','dbo','table','ProtocolCode','column',default)) d   
where a.object_id=b.object_id     and a.user_type_id=c.user_type_id     and d.objname = a.name collate  Chinese_PRC_CI_AS     and b.type='u' and b.name = 'ProtocolCode'

select * from Columns_ProtocolCode

use bidding

insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('AVCDDSAFDASFDSA','10','90','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('fdsafdsafdsafdsa','10','70','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('AVCDDSfdasfdasfd','10','40','2016-01-01 20:08:08',0)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('fdasffdsafdasda','10','90','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('AVCDDSAFDASFDSA','10','90','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('fdsafdsafdsafdsa','10','70','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('AVCDDSfdasfdasfd','10','40','2016-01-01 20:08:08',0)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('fdasffdsafdasda','10','90','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('AVCDDSAFDASFDSA','10','90','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('fdsafdsafdsafdsa','10','70','2016-01-01 20:08:08',1)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('AVCDDSfdasfdasfd','10','40','2016-01-01 20:08:08',0)
insert into ProtocolCode(ProtocolNumber,TypeId,EmployeeId,CreationTime,IsDelete) values('fdasffdsafdasda','10','90','2016-01-01 20:08:08',1)


insert into Projects(
		 [ProtocolCodeId]      ,[ProjectCodeId]      ,[ProjectName]      ,[BuyerId]      ,[EmployeeId]
		,[Assistant]      ,[ProjectSourceId]      ,[SourcesOfFundingId]      ,[ProjectTypeId]      ,[ManagementStyleId]
		,[Package]      ,[StateId]      ,[SigningDate]      ,[MakeOutDate]      ,[EntrustMoney]
		,[WinningMoney]      ,[WinningCompany]      ,[ChargeRate]      ,[Note]      ,[CreationDate]
		,[IsDelete]) 
values('10001','100000002','服务器采购项目',1,2,
'丽芬','3','4','5','6',
'包1','7','2016-01-01 20:08:08','2016-01-01 20:08:08',
10000,10000,'A公司','5%','备注','2016-01-01 20:08:08',
1)

select * from Projects

