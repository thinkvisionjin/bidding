

/*Ͷ������Ԥ��*/

/*01.Ͷ�걨����� baomings.aspx?flag=0*/

select  code,title,a.buid,a.flag,bflag 
from [dbo].[baomings] a 
where  (select tid from user_info where uid=a.uid) = '1' 
and (bflag=0 or bflag=3 or bflag=-1) and kbtime>getdate() 
/*and (title like '%" + + "%' or code like '%" +  + "%'  or 
(select company from user_info where uid=a.buid) like '%" +  + "%')  */
order by code,[kbtime]




/*02.��������б� baomings.aspx?flag=1*/
select  code,title,a.buid,a.flag,bflag 
from [dbo].[baomings] a 
where  (select tid from user_info where uid=a.uid) = '1' 
/*and (title like '%" + + "%' or code like '%" +  + "%'  or 
(select company from user_info where uid=a.buid) like '%" +  + "%')  */
order by code,[kbtime]