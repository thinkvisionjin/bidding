select a.name as columnname,
c.name typename
--a.max_length,
--a.precision,
--a.scale
from sys.columns a,
sys.objects b,
sys.types c
where a.object_id=b.object_id 
and a.user_type_id=c.user_type_id
and b.type='u'
and b.name = 'ProtocolCode'
--and c.name in('varchar','nvarchar','char','nchar','text','ntext')
--and object_name(a.object_id)<>'t'
order by b.name