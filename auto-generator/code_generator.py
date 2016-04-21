# # coding=utf-8

#01.当py文件中中文时一定要使用上面的一个编码注释
#02.设置字符串缺省的编码，如果不这样的话str无法使用
import sys,re
from _abcoll import Sequence
reload(sys)
sys.setdefaultencoding('utf8')
import pyodbc
import json
import types
import markup
from markup import oneliner
from py2neo.ext.geoff.xmlutil import jsonify

def getTableColumns(tableName): 
    #return dictionary array [{name:"column names",type="column type"},{name:"column names",type="column type"},{name:"column names",type="column type"}]
    connstr= u'driver={SQL Server};server=localhost;uid;pwd=1;DATABASE=master;Trusted_Connection=yes;unicode_results=True;CHARSET=UTF8'
    conn = pyodbc.connect(connstr,unicode_results=True)
    cursor=conn.cursor()
    strm= 'select a.name as columnname,c.name typename,cast(d.value as nvarchar(128)) as columnlabel\
    from sys.columns a, \
    sys.objects b,\
    sys.types c ,\
    (select * from ::fn_listextendedproperty(\'MS_Description\',\'user\',\'dbo\',\'table\',\'' +tableName+'\',\'column\',default)) d \
    where a.object_id=b.object_id \
    and a.user_type_id=c.user_type_id \
    and d.objname = a.name collate  Chinese_PRC_CI_AS \
    and b.type=\'u\' ' + 'and b.name = \''+tableName +'\''
    print strm
    cursor.execute(strm)
    rs = cursor.fetchall() 
    columnNames= []
    columnTypes=[]
    columnLabels=[]
    for r1 in rs:
        columnNames.append(r1[0]) 
        columnTypes.append(r1[1])
        print r1[2]
        columnLabels.append(r1[2])
    d = {'table': tableName,'columns':columnNames,'types':columnTypes,'labels':columnLabels}
    print jsonify(d,ensure_ascii=False)
    return  jsonify(d,ensure_ascii=False)

def generateHTMLTable(columnNames):
    snippet = markup.page()
    titles = columnNames['labels']
    inputids = columnNames['columns']
    snippet.table()
    for i in range(len(titles)):
        snippet.tr()
        snippet.td(oneliner.p(titles[i]),align='right')
        snippet.td(oneliner.input(id=inputids[i]),align='left')
        snippet.tr.close()
    snippet.tr()
    snippet.td(style='padding-top: 10px;',align="right")
    snippet.td(oneliner.input(id="Cancel",type="button",value="Cancel"),align='left')
    snippet.td(oneliner.input(id="Save",type="button",value="Save"),align='left')
    snippet.tr.close()
    snippet.table.close()
    return str(snippet)
def generateHTMLFile(tableColumns):
###########generate the html file
    styleFileStr = 'styles/protocals.grid.style'
    htmlTemplateStr='templates/Grid.ContextMenu.template.html'
    htmlStr = '../views/default/'+tableColumns['table']+'.html'
    htmlTemplateFile = open(htmlTemplateStr)
    htmlFile = open(htmlStr,"w+")
    for line in  htmlTemplateFile.readlines():
        if re.search('{{=PAGE_JS}}', line)!=None:
            line = line.replace('{{=PAGE_JS}}',tableColumns['table'])
        #process {{=PageName}} html的title显示为表名
        if re.search('{{=PageName}}', line)!=None:
            line = line.replace('{{=PageName}}',tableColumns['table'])
        #process {{=POPUPWINDOW_EDIT}}
        if re.search('{{=POPUPWINDOW_EDIT}}', line)!=None:
            line = line.replace('{{=POPUPWINDOW_EDIT}}',generateHTMLTable(tableColumns))
        htmlFile.write(line)
    htmlTemplateFile.close()
    htmlFile.close()

########## generate the js file

def generateJSFile(tableColumns):
    jsTemplateStr ='templates/Grid.ContextMenu.template.js'
    jsStr = '../static/js/'+tableColumns['table']+'.js'
    jsTemplateFile = open(jsTemplateStr)
    jsFile = open(jsStr,"w+")
    for line in  jsTemplateFile.readlines():
        if re.search('{{=DATA_URL}}', line)!=None:
            line = line.replace('{{=DATA_URL}}',tableColumns['table'])
        if re.search('{{=DATAFIELDS}}', line)!=None:
            datafields = []
            for i in range(len(tableColumns['columns'])):
                datafields.append({'name':tableColumns['columns'][i],'type':'string'})
            line = line.replace('{{=DATAFIELDS}}',jsonify(datafields))
        if re.search('{{=INIT_INPUT_FIELDS}}', line)!=None:
            init_input_fields = ""
            for i in range(len(tableColumns['columns'])):
                init_input_fields +='$("#'+tableColumns['columns'][i]+'").addClass(\'jqx-input\')\n';
                init_input_fields +='$("#'+tableColumns['columns'][i]+'").width(150)\n';
                init_input_fields +='$("#'+tableColumns['columns'][i]+'").height(23)\n';
            line = line.replace('{{=INIT_INPUT_FIELDS}}',init_input_fields)
        if re.search('{{=COLUMNS_CONTENT}}', line)!=None:
            column_content = []
            for i in range(len(tableColumns['columns'])):
                column_content.append({'text':tableColumns['labels'][i],'datafield':tableColumns['columns'][i],'width':200})
            line = line.replace('{{=COLUMNS_CONTENT}}',jsonify(column_content))
        if re.search('{{=GET_ROW_DATA}}', line)!=None:
            get_row_data =""
            for i in range(len(tableColumns['columns'])):
                get_row_data +='$("#'+tableColumns['columns'][i]+'").val(dataRecord.'+tableColumns['columns'][i]+');\n';
            line = line.replace('{{=GET_ROW_DATA}}',get_row_data)
        if re.search('{{=ROW_CONTENT_SAVE}}', line)!=None:
            row_content_save = []
            for i in range(len(tableColumns['columns'])):
                row_content_save.append(tableColumns['columns'][i]+':$("#'+tableColumns['columns'][i]+'").val()\n')
            result_str = '{'+",".join(row_content_save) + "}"
            line = line.replace('{{=ROW_CONTENT_SAVE}}',result_str)
        jsFile.write(line)
    jsTemplateFile.close()
    jsFile.close()
    
def generateFiles(tableName):
    print "Retriveing " +tableName+ " columns："
    tableColumnsJson = getTableColumns(tableName)
    tableColumns = json.JSONDecoder().decode(tableColumnsJson)
    print "Generating " +tableName+ ".html"
    generateHTMLFile(tableColumns)
    print "Generating " +tableName+ ".js"
    generateJSFile(tableColumns)

generateFiles("ProtocolCode")
#generateFiles("Projects")
# tableColumnsJson = getTableColumns('ProtocolCode')
# tableColumns = json.JSONDecoder().decode(tableColumnsJson)
# print tableColumns['columns']
# print generateHTMLTable(tableColumns)

#getTableColumns("ProtocolCode")



