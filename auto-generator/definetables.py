# # coding=utf-8
import pyodbc
import json
import types
 
connstr= u'driver={SQL Server};server=localhost;uid;pwd=1;DATABASE=bidding;Trusted_Connection=yes;unicode_results=True;CHARSET=UTF8'
conn = pyodbc.connect(connstr)
cursor=conn.cursor()
 
 
def defineTables():
    cursor.execute(u'use BIDDING')
    cursor.execute(u'''SELECT object_name (i.id) TableName,   
       rows as RowCnt   
FROM sysindexes i   
INNER JOIN sysObjects o   
    ON (o.id = i.id AND o.xType = 'U ')   
WHERE indid < 2   
ORDER BY TableName ''')
    rows = cursor.fetchall() 
    ts=[]
    for r in rows:
        ts.append(r[0])
        strm= 'Select Name FROM SysColumns Where id=Object_Id(\'' +r[0]+'\')';
        cursor.execute(strm)
        rs = cursor.fetchall() 
        rxa= []
        for r1 in rs:
            if r1[0] != 'Id':
                rx = u'Field(\'' + r1[0] +u'\')'
                rxa.append(rx)
        print u'db.define_table(\''+r[0]+ u'\','+u','.join(rxa)+')'
 
 
defineTables()
