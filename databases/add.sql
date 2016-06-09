drop table hys
create table hys([Id] [int] IDENTITY(1,1) NOT NULL,hys nvarchar(50))
insert into hys(hys) values('第一会议室')
insert into hys(hys) values('第二会议室')
insert into hys(hys) values('第三会议室')
insert into hys(hys) values('第四会议室')
insert into hys(hys) values('多媒体会议室')

	SELECT *  FROM (select employeeid, purchaseStyleId from [BIDDING].[dbo].[Project] )a
  pivot (count(employeeid) for PurchaseStyleId in ([1], [2], [3], [4],[5], [6],[7]))b
