# # coding=utf-8

#01.当py文件中中文时一定要使用上面的一个编码注释
#02.设置字符串缺省的编码，如果不这样的话str无法使用
import sys,re
from math import ceil
from datetime import datetime

#third party libs
from gluon import DAL, Field
import pyodbc
import json
import markup
from markup import oneliner
from py2neo.ext.geoff.xmlutil import jsonify

reload(sys)
sys.setdefaultencoding('utf-8')


#03.连接需要用utf8字符集，这样返回的中文结果可直接解码



class UIGenerator:
    databbaseString = "" 
    data_db = None
    ui_db = None
    '''
    for now only support pyodbc sqlite
    '''
    def __init__(self,dbString,uiDBString):
        databbaseString = dbString
        data_db = DAL(dbString,db_codec='utf-8',migrate_enabled=False)
        ui_db = DAL('sqlite://ui.storage.sqlite')
        
    def getTableColumns(tableName): 
        #return dictionary array [{name:"column names",type="column type"},{name:"column names",type="column type"},{name:"column names",type="column type"}]
        connstr= u'driver={SQL Server};server=localhost;uid;pwd=1;DATABASE=bidding;Trusted_Connection=yes;unicode_results=True;CHARSET=UTF8'
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
            if r1[0]!='Id':
                columnNames.append(r1[0]) 
                columnTypes.append(r1[1])
                columnLabels.append(r1[2])
        d = {'table': tableName,'columns':columnNames,'types':columnTypes,'labels':columnLabels}
        print jsonify(d,ensure_ascii=False)
        return  jsonify(d,ensure_ascii=False)
    
    def generateHTMLTable(columnNames,table_type,countTD=1):
        snippet = markup.page()
        titles = columnNames['labels']
        inputids = columnNames['columns']
        snippet.table(width="100%")
        if countTD == 1:
            for i in range(len(titles)):
                snippet.tr()
                snippet.td(oneliner.p(titles[i]),align='center')
                snippet.td(oneliner.input(id=(inputids[i]+table_type)),align='center')
                snippet.tr.close()
            snippet.tr()
            snippet.td(style='padding-top: 10px;',align="center")
            snippet.td(oneliner.input(id="Cancel"+table_type,type="button",value="取消"),align='center')
            snippet.td(oneliner.input(id="Save"+table_type,type="button",value="保存"),align='center')
            snippet.tr.close()
        elif countTD == 3:
            i=0
            while (i < len(titles)):
                snippet.tr()
                snippet.td(oneliner.p(titles[i]),align='left')
                snippet.td(oneliner.input(id=(inputids[i]+table_type)),align='left')
                i=i+1
                if i < len(titles):
                    snippet.td(oneliner.p(titles[i]),align='left')
                    snippet.td(oneliner.input(id=(inputids[i]+table_type)),align='left')
                i=i+1
                if i < len(titles):
                    snippet.td(oneliner.p(titles[i]),align='left')
                    snippet.td(oneliner.input(id=(inputids[i]+table_type)),align='left')
                snippet.tr.close()
                i=i+1
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
            if re.search('{{=TABLE_NAME}}', line)!=None:
                line = line.replace('{{=TABLE_NAME}}',tableColumns['table'])
            if re.search('{{=SEARCH_AREA}}', line)!=None:
                line = line.replace('{{=SEARCH_AREA}}',generateHTMLTable(tableColumns,'_SEARCH',3))            
            if re.search('{{=POPUPWINDOW_EDIT}}', line)!=None:
                line = line.replace('{{=POPUPWINDOW_EDIT}}',generateHTMLTable(tableColumns,'_EDIT'))
            if re.search('{{=POPUPWINDOW_ADD}}', line)!=None:
                line = line.replace('{{=POPUPWINDOW_ADD}}',generateHTMLTable(tableColumns,'_ADD'))
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
            if re.search('{{=TABLE_NAME}}', line)!=None:
                line = line.replace('{{=TABLE_NAME}}',tableColumns['table'])
            if re.search('{{=DATA_FIELDS}}', line)!=None:
                datafields = []
                #为数据表增加id字段，用于删除、更新操作
                datafields.append({'name':'Id','type':'string'})
                for i in range(len(tableColumns['columns'])):
                    datafields.append({'name':tableColumns['columns'][i],'type':'string'})
                line = line.replace('{{=DATA_FIELDS}}',jsonify(datafields))
            if re.search('{{=INIT_INPUT_FIELDS}}', line)!=None:
                init_input_fields = ""
                for table_type in ['_SEARCH','_EDIT','_ADD']:
                    for i in range(len(tableColumns['columns'])):
                        init_input_fields +='$("#'+tableColumns['columns'][i]+table_type+'").addClass(\'jqx-input\')\n';
                        init_input_fields +='$("#'+tableColumns['columns'][i]+table_type+'").width(150)\n';
                        init_input_fields +='$("#'+tableColumns['columns'][i]+table_type+'").height(23)\n';
                line = line.replace('{{=INIT_INPUT_FIELDS}}',init_input_fields)
            if re.search('{{=COLUMNS_CONTENT}}', line)!=None:
                column_content = []
                #为数据表增加id字段，用于删除、更新操作
                column_content.append({'text':'序号','datafield':'Id'})
                for i in range(len(tableColumns['columns'])):
                    column_content.append({'text':tableColumns['labels'][i],'datafield':tableColumns['columns'][i]})
                line = line.replace('{{=COLUMNS_CONTENT}}',jsonify(column_content))
            if re.search('{{=GET_EDIT_ROW_DATA}}', line)!=None:
                get_row_data =""
                for i in range(len(tableColumns['columns'])):
                    get_row_data +='$("#'+tableColumns['columns'][i]+'_EDIT").val(dataRecord.'+tableColumns['columns'][i]+');\n';
                line = line.replace('{{=GET_EDIT_ROW_DATA}}',get_row_data)
            if re.search('{{=EDIT_ROW_CONTENT_SAVE}}', line)!=None:
                row_content_save = []
                for i in range(len(tableColumns['columns'])):
                    row_content_save.append(tableColumns['columns'][i]+':$("#'+tableColumns['columns'][i]+'_EDIT").val()\n')
                result_str = '{'+",".join(row_content_save) + "}"
                line = line.replace('{{=EDIT_ROW_CONTENT_SAVE}}',result_str)
            if re.search('{{=ADD_ROW_CONTENT_SAVE}}', line)!=None:
                row_content_save = []
                for i in range(len(tableColumns['columns'])):
                    row_content_save.append(tableColumns['columns'][i]+':$("#'+tableColumns['columns'][i]+'_ADD").val()\n')
                result_str = '{'+",".join(row_content_save) + "}"
                line = line.replace('{{=ADD_ROW_CONTENT_SAVE}}',result_str)
            if re.search('{{=TOOLBAR_HIGHT}}', line)!=None:
                line = line.replace('{{=TOOLBAR_HIGHT}}',str(ceil(len(tableColumns['columns'])/3.0)*60))
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
    
    
    
dataDB = u'mssql4://sa:1@localhost/BIDDING'
uiDB =  u'sqlite://ui.storage.sqlite'
tableString = u'Customer'

uig = UIGenerator(dataDB,uiDB)
# uig.createDataGrid(tableString)
