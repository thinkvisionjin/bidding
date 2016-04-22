USE BIDDING
GO
/****** Object:  Table [dbo].[TypeOfTask]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeOfTask](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CreationDate] [datetime] NOT NULL,
	[OrderId] [int] NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_TypeOfTask] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaskStatus]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CreationTime] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_TaskStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaskLocation]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskLocation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CreationTime] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_TaskLocation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Task]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Task](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProjectId] [int] NULL,
	[TitleId] [int] NULL,
	[EmployeeId] [int] NULL,
	[PlaceId] [int] NULL,
	[CreationDate] [datetime] NOT NULL,
	[Deadline] [datetime] NULL,
	[Note] [ntext] NULL,
	[StateId] [int] NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suggest]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suggest](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Content] [ntext] NULL,
	[UserId] [int] NULL,
	[CreationTime] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_Suggest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProtocolCode]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProtocolCode](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProtocolNumber] [nvarchar](50) NULL,
	[TypeId] [int] NULL,
	[EmployeeId] [int] NULL,
	[CreationTime] [datetime] NOT NULL,
	[IsDelete] [bit] NOT NULL,
 CONSTRAINT [PK_ProtocolCode] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'序号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProtocolCode', @level2type=N'COLUMN',@level2name=N'Id'

EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'协议编号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProtocolCode', @level2type=N'COLUMN',@level2name=N'ProtocolNumber'

EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'类型编号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProtocolCode', @level2type=N'COLUMN',@level2name=N'TypeID'



EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'员工编号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProtocolCode', @level2type=N'COLUMN',@level2name=N'EmployeeId'

EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'创建日期' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProtocolCode', @level2type=N'COLUMN',@level2name=N'CreationTime'

EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'是否已删除' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProtocolCode', @level2type=N'COLUMN',@level2name=N'IsDelete'



SELECT   *
FROM   ::fn_listextendedproperty
('MS_Description','user','dbo','table','ProtocolCode','column',default)

GO
/****** Object:  Table [dbo].[ProjectStatus]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CreationTime] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_ProjectStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectResource]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectResource](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CreationTime] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_ProjectResource] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectCode]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectCode](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProtocolId] [int] NULL,
	[ProjectNumber] [nvarchar](50) NULL,
	[EmployeeId] [int] NULL,
	[ProjectTypeId] [int] NULL,
	[CreationTime] [datetime] NOT NULL,
	[Option1] [nvarchar](50) NULL,
	[Option2] [nvarchar](50) NULL,
	[Option3] [nvarchar](50) NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_ProjectCode] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'序号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'Id'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'协议编号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'ProtocolId'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'项目编号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'ProjectNumber'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'员工编号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'EmployeeId'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'类型编号' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'ProjectTypeId'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'创建时间' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'CreationTime'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'选项1' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'Option1'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'选项2' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'Option2'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'选项3' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'Option3'
EXEC sys.sp_addextendedproperty 
@name=N'MS_Description', @value=N'是否已删除' , 
@level0type=N'SCHEMA',@level0name=N'dbo', 
@level1type=N'TABLE',@level1name=N'ProjectCode', @level2type=N'COLUMN',@level2name=N'IsDelete'

/****** Object:  Table [dbo].[Project]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProtocolCodeId] [int] NULL,
	[ProjectCodeId] [int] NULL,
	[ProjectName] [nvarchar](50) NULL,
	[BuyerId] [nvarchar](50) NULL,
	[EmployeeId] [int] NULL,
	[Assistant] [nvarchar](50) NULL,
	[ProjectSourceId] [int] NULL,
	[SourcesOfFundingId] [int] NULL,
	[ProjectTypeId] [int] NULL,
	[ManagementStyleId] [int] NULL,
	[Package] [nvarchar](50) NULL,
	[StateId] [int] NULL,
	[SigningDate] [datetime] NULL,
	[MakeOutDate] [datetime] NULL,
	[EntrustMoney] [nvarchar](50) NULL,
	[WinningMoney] [nvarchar](50) NULL,
	[WinningCompany] [nvarchar](50) NULL,
	[ChargeRate] [nvarchar](50) NULL,
	[Note] [ntext] NULL,
	[CreationDate] [datetime] NOT NULL,
	[IsDelete] [bit] NOT NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MoneyType]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MoneyType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CreationTime] [datetime] NOT NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_MoneyType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Management]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Management](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[CreationDate] [datetime] NOT NULL,
	[Code] [nvarchar](10) NULL,
	[IsDelete] [bit] NULL,
 CONSTRAINT [PK_Management] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Log]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[Note] [ntext] NULL,
	[CreationDate] [datetime] NULL,
	[Ip] [nvarchar](50) NULL,
	[Agent] [ntext] NULL,
	[Kind] [int] NULL,
 CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'kind=-1 是用户登录 kind=0是添加kind=1是修改kind=3是添加意见' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Log', @level2type=N'COLUMN',@level2name=N'Kind'
GO
/****** Object:  Table [dbo].[Finance]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Finance](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TitleId] [int] NULL,
	[ProjectCodeId] [int] NULL,
	[ProtocolCodeId] [int] NULL,
	[TargetId] [int] NULL,
	[Activity] [nvarchar](50) NULL,
	[Income] [int] NULL,
	[Spending] [int] NULL,
	[Note] [ntext] NULL,
	[CreationDate] [datetime] NOT NULL,
	[EmployeeId] [int] NULL,
	[IsDelete] [bit] NOT NULL,
 CONSTRAINT [PK_Finance] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NULL,
	[PassWord] [nvarchar](50) NULL,
	[Type] [int] NULL,
	[Name] [nvarchar](50) NULL,
	[SexId] [int] NULL,
	[Age] [int] NULL,
	[Email] [nvarchar](50) NULL,
	[Department] [nvarchar](50) NULL,
	[Position] [nvarchar](50) NULL,
	[CompanyPhone] [nvarchar](50) NULL,
	[HomePhone] [nvarchar](50) NULL,
	[MobilePhone] [nvarchar](50) NULL,
	[DateOfBirth] [datetime] NULL,
	[Address] [nvarchar](50) NULL,
	[Note] [ntext] NULL,
	[CreationDate] [datetime] NOT NULL,
	[EmergencyContactPhone] [nvarchar](50) NULL,
	[EmergencyContactName] [nvarchar](50) NULL,
	[EmergencyContactRelationship] [nvarchar](50) NULL,
	[IsDelete] [bit] NOT NULL,
	[Code] [nvarchar](10) NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0.管理员，1.员工' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Employee', @level2type=N'COLUMN',@level2name=N'Type'
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NULL,
	[PassＷord] [nvarchar](50) NULL,
	[CompanyName] [nvarchar](50) NULL,
	[CompanyPhone] [nvarchar](50) NULL,
	[Fax] [nvarchar](50) NULL,
	[ZipCode] [nvarchar](50) NULL,
	[Address1] [nvarchar](50) NULL,
	[Address2] [nvarchar](50) NULL,
	[ContactName] [nvarchar](50) NULL,
	[MobilePhone] [nvarchar](50) NULL,
	[Position] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Note] [ntext] NULL,
	[CreationDate] [datetime] NULL,
	[Type] [int] NOT NULL,
	[IsDelete] [bit] NOT NULL,
	[EmployeeId] [int] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1.卖家，2.买家，3.专家' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Customer', @level2type=N'COLUMN',@level2name=N'Type'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'添加用户的员工id' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Customer', @level2type=N'COLUMN',@level2name=N'EmployeeId'
GO
/****** Object:  Table [dbo].[BankRecord]    Script Date: 04/15/2016 17:12:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankRecord](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Note] [ntext] NULL,
	[Money] [float] NULL,
	[CompanyName] [nchar](20) NULL,
	[CreateDate] [datetime] NULL,
	[Account] [nchar](20) NULL,
	[TradingTime] [datetime] NULL,
 CONSTRAINT [PK_BankRecord] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Default [DF_BankRecord_CreateDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[BankRecord] ADD  CONSTRAINT [DF_BankRecord_CreateDate]  DEFAULT (getdate()) FOR [CreateDate]
GO
/****** Object:  Default [DF_Customer_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Customer] ADD  CONSTRAINT [DF_Customer_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_Customer_Type]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Customer] ADD  CONSTRAINT [DF_Customer_Type]  DEFAULT ((1)) FOR [Type]
GO
/****** Object:  Default [DF_Customer_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Customer] ADD  CONSTRAINT [DF_Customer_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_Customer_Employee]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Customer] ADD  CONSTRAINT [DF_Customer_Employee]  DEFAULT ((0)) FOR [EmployeeId]
GO
/****** Object:  Default [DF_Employee_Type]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Employee] ADD  CONSTRAINT [DF_Employee_Type]  DEFAULT ((1)) FOR [Type]
GO
/****** Object:  Default [DF_Employee_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Employee] ADD  CONSTRAINT [DF_Employee_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_Employee_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Employee] ADD  CONSTRAINT [DF_Employee_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_Finance_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Finance] ADD  CONSTRAINT [DF_Finance_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_Finance_EmployeeId]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Finance] ADD  CONSTRAINT [DF_Finance_EmployeeId]  DEFAULT ((0)) FOR [EmployeeId]
GO
/****** Object:  Default [DF_Finance_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Finance] ADD  CONSTRAINT [DF_Finance_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_Log_UserId]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Log] ADD  CONSTRAINT [DF_Log_UserId]  DEFAULT ((0)) FOR [UserId]
GO
/****** Object:  Default [DF_Log_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Log] ADD  CONSTRAINT [DF_Log_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_Log_Kind]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Log] ADD  CONSTRAINT [DF_Log_Kind]  DEFAULT ((0)) FOR [Kind]
GO
/****** Object:  Default [DF_Management_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Management] ADD  CONSTRAINT [DF_Management_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_Management_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Management] ADD  CONSTRAINT [DF_Management_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_MoneyType_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[MoneyType] ADD  CONSTRAINT [DF_MoneyType_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_MoneyType_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[MoneyType] ADD  CONSTRAINT [DF_MoneyType_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_Project_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_Project_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Project] ADD  CONSTRAINT [DF_Project_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_ProjectCode_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProjectCode] ADD  CONSTRAINT [DF_ProjectCode_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_ProjectCode_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProjectCode] ADD  CONSTRAINT [DF_ProjectCode_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_ProjectResource_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProjectResource] ADD  CONSTRAINT [DF_ProjectResource_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_ProjectResource_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProjectResource] ADD  CONSTRAINT [DF_ProjectResource_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_ProjectStatus_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProjectStatus] ADD  CONSTRAINT [DF_ProjectStatus_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_ProjectStatus_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProjectStatus] ADD  CONSTRAINT [DF_ProjectStatus_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_ProtocolCode_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProtocolCode] ADD  CONSTRAINT [DF_ProtocolCode_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_ProtocolCode_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[ProtocolCode] ADD  CONSTRAINT [DF_ProtocolCode_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_Suggest_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Suggest] ADD  CONSTRAINT [DF_Suggest_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_Suggest_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Suggest] ADD  CONSTRAINT [DF_Suggest_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_Task_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Task] ADD  CONSTRAINT [DF_Task_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_Task_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[Task] ADD  CONSTRAINT [DF_Task_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_TaskLocation_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[TaskLocation] ADD  CONSTRAINT [DF_TaskLocation_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_TaskLocation_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[TaskLocation] ADD  CONSTRAINT [DF_TaskLocation_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_TaskStatus_CreationTime]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[TaskStatus] ADD  CONSTRAINT [DF_TaskStatus_CreationTime]  DEFAULT (getdate()) FOR [CreationTime]
GO
/****** Object:  Default [DF_TaskStatus_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[TaskStatus] ADD  CONSTRAINT [DF_TaskStatus_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
/****** Object:  Default [DF_TypeOfTask_CreationDate]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[TypeOfTask] ADD  CONSTRAINT [DF_TypeOfTask_CreationDate]  DEFAULT (getdate()) FOR [CreationDate]
GO
/****** Object:  Default [DF_TypeOfTask_order]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[TypeOfTask] ADD  CONSTRAINT [DF_TypeOfTask_order]  DEFAULT ((0)) FOR [OrderId]
GO
/****** Object:  Default [DF_TypeOfTask_IsDelete]    Script Date: 04/15/2016 17:12:50 ******/
ALTER TABLE [dbo].[TypeOfTask] ADD  CONSTRAINT [DF_TypeOfTask_IsDelete]  DEFAULT ((0)) FOR [IsDelete]
GO
