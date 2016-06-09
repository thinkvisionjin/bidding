drop proc proc_updatePackageAndProjectStatus
Create proc proc_updatePackageAndProjectStatus
as 
declare CUR_PACKAGE cursor for 
select id,projectID,StateId,
convert(varchar, isnull(PublicDate,''), 120),
convert(varchar,  isnull(OpenDate,''), 120),
convert(varchar,  isnull(ReviewDate,''), 120), 
convert(varchar, isnull(SigningDate,''), 120) from ProjectPackage 

open CUR_PACKAGE
declare @id int,@projectID  int,@StateId int,@PublicDate nvarchar(50),@OpenDate nvarchar(50),@ReviewDate nvarchar(50),@SigningDate nvarchar(50)
declare @status int
declare @today varchar(50)
fetch next from CUR_PACKAGE into @id,@projectID,@StateId,@PublicDate,@OpenDate,@ReviewDate,@SigningDate
while @@FETCH_STATUS = 0
begin 
	set @today = convert(varchar, getdate(), 120)
	print cast(@projectID as nvarchar)+' | '+cast(@StateId as nvarchar)+' | '+ @PublicDate+' | '+@OpenDate+' | '+@ReviewDate+' | '+@SigningDate
	if @StateId <5 
		begin
			if @PublicDate = '1900-01-01 00:00:00' or @today<@PublicDate
				begin 
					set @status = 1 
				end
			if  @PublicDate <> '1900-01-01 00:00:00' and @today>@PublicDate  
				begin 
					set @status = 2 
				end
			if  @OpenDate <>'1900-01-01 00:00:00' and @today>@OpenDate  
				begin 
					set @status = 3 
				end
			if  @ReviewDate<>'1900-01-01 00:00:00'  and @today>@ReviewDate  
				begin 
					set @status = 4 
				end
			if  @SigningDate<>'1900-01-01 00:00:00'  and @today>@SigningDate
				begin 
					set @status = 5
				end
			--print @status
			update  ProjectPackage set StateId = @status where id = @id
		end
	fetch next from CUR_PACKAGE into @id,@projectID,@StateId,@PublicDate,@OpenDate,@ReviewDate,@SigningDate
end
close CUR_PACKAGE
deallocate CUR_PACKAGE

declare CUR_PROJECT cursor for 
select id from Project
open CUR_PROJECT
declare @proid int
fetch next from CUR_PROJECT into @proid
while @@FETCH_STATUS = 0
begin 
update Project set ProjectStatusId = (select max(StateId) from ProjectPackage where ProjectId = @proid) where Id = @proid
fetch next from CUR_PROJECT into @proid
end
close CUR_PROJECT
deallocate CUR_PROJECT

exec proc_updatePackageAndProjectStatus



