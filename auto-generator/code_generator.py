# # coding=utf-8

#01.当py文件中中文时一定要使用上面的一个编码注释
#02.设置字符串缺省的编码，如果不这样的话str无法使用
import sys,re
reload(sys)
sys.setdefaultencoding('utf8')
import pyodbc
import json
import types
from py2neo.ext.geoff.xmlutil import jsonify
 
 
def generateHtmlTable(columnNames):
   tableStr = ''' <table>
                   <tr>
                       <td align="right">First Name:</td>
                       <td align="left"><input id="firstName" /></td>
                   </tr>
                   <tr>
                       <td align="right">Last Name:</td>
                       <td align="left"><input id="lastName" /></td>
                   </tr>
                   <tr>
                       <td align="right">Product:</td>
                       <td align="left"><input id="product" /></td>
                   </tr>
                   <tr>
                       <td align="right">Quantity:</td>
                       <td align="left"><div id="quantity"></div></td>
                   </tr>
                   <tr>
                       <td align="right">Price:</td>
                       <td align="left"><div id="price"></div></td>
                   </tr>
                   <tr>
                       <td align="right"></td>
                       <td style="padding-top: 10px;" align="right"><input style="margin-right: 5px;" type="button" id="Save" value="Save" /><input id="Cancel" type="button" value="Cancel" /></td>
                   </tr>
               </table>'''
   return tableStr
 
 
connstr= u'driver={SQL Server};server=localhost;uid;pwd=1;DATABASE=master;Trusted_Connection=yes;unicode_results=True;CHARSET=UTF8'
conn = pyodbc.connect(connstr)
cursor=conn.cursor()
# tableName= raw_input("请输入数据表名称：")
tableName = 'ProtocolCode'
strm= 'select a.name as columnname,c.name typename,\
a.max_length,\
a.precision,\
a.scale \
from sys.columns a, \
sys.objects b,\
sys.types c \
where a.object_id=b.object_id \
and a.user_type_id=c.user_type_id \
and b.type=\'u\' ' + 'and b.name = \''+tableName +'\''
print strm
cursor.execute(strm)
rs = cursor.fetchall() 
rxa= []
for r1 in rs:
    cname = r1[0]
    ctype = r1[1]
    d={'name':cname,'type':ctype}
    rxa.append(d)
print jsonify(rxa)

###########generate the html file
styleFileStr = 'styles/protocals.grid.style'
jsTemplateStr ='templates/Grid.ContextMenu.template.js'
htmlTemplateStr='templates/Grid.ContextMenu.template.html'
htmlStr = 'protocals.html'
jsStr = 'protocals.js'

htmlTemplateFile = open(htmlTemplateStr)
htmlFile = open(htmlStr,"w+")
for line in  htmlTemplateFile.readlines():
    #process {{=PageName}} html的title显示为表名
    if re.search('{{=PageName}}', line)!=None:
        line = line.replace('{{=PageName}}',tableName)
    #process {{=POPUPWINDOW_EDIT}}
    if re.search('{{=POPUPWINDOW_EDIT}}', line)!=None:
        line = line.replace('{{=POPUPWINDOW_EDIT}}',generateHtmlTable(rxa))
    htmlFile.write(line)
htmlTemplateFile.close()
htmlFile.close()

########## generate the js file
#process {{=DATAFIELDS}}

#process {{=INIT_INPUT_FIELDS}}

#process {{=COLUMNS_CONTENT}}

#process {{=GET_ROW_DATA}}

#process {{=ROW_CONTENT_SAVE}}



