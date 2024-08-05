var masterDataBase = [];
// var masterTableName = [];
var hostName = '';
var flagForContinousRun = true;

var ExporttemData = [];
var exportDataHeader = [];
var ExportFileName = "";

function querboxEditableOrNot(userType) {
    //console.log(userType, 'userType');
}

function showIcon(iconInfo) {
    var iconArray = iconInfo.split(':');
    // //console.log(iconArray[1], 'Show Icon');
    document.getElementById('iconInfo' + iconArray[1]).hidden = false;
    document.getElementById('iconSelect' + iconArray[1]).hidden = false;
}

function hideIcon(iconInfo) {
    var iconArray = iconInfo.split(':');
    // //console.log(iconArray[1], 'Hide Icon');
    document.getElementById('iconInfo' + iconArray[1]).hidden = true;
    document.getElementById('iconSelect' + iconArray[1]).hidden = true;
}


function loadDatabaseName() {
    enableHidden('tableListDiv', true);
    enableHidden('reloadTable', true);
    enableHidden('dbBack', true);
    enableHidden('databaseList', false);
    enableHidden('loadingTableInfoMessage', false);

    document.getElementById("databaseHeading").innerHTML = 'SCHEMAS <i class="fa-solid fa-database" style="margin-left: 10px;color: greenyellow;"></i>';

    // //console.log('loadDatabaseName',masterDataBase);
    var listInstance = document.getElementById('databaseList');
    listInstance.innerHTML = "";
    listInstance.setAttribute('class', 'list-group verticalScroll resizeVertical');
    // //console.log(masterDataBase.length);
    for (var i = 0; i < masterDataBase.length; i++) {
        var liItem = document.createElement('button');
        // //console.log(masterDataBase, masterDataBase[i].Database);
        liItem.appendChild(document.createTextNode(masterDataBase[i]['Database']));
        liItem.setAttribute('class', 'btn btn-primary text-center mLR20 mb-3');
        liItem.setAttribute('id', 'database' + i);
        liItem.setAttribute('onclick', 'getTableName(this.innerHTML)');
        listInstance.appendChild(liItem);
    }
    enableHidden('loadingTableInfoMessage', true);

    // //console.log(listInstance);
}

function countItems(itemId, itemType) {
    var ul = document.getElementById(itemId);
    // //console.log(ul);
    var i = 0, itemCount = 0;
    while (ul.getElementsByTagName(itemType)[i++]) itemCount++;
    return itemCount;
}


function getTableName(databaseName) {
    enableHidden('loadingTableInfoMessage', false);

    // //console.log(databaseName);
    $.post('userDbConnection.php', {
        'flagForDbConnection': 'flagForDbConnection',
        'databaseName': databaseName,
    }, function (data) {
        //console.log(data);
        if (data.trim().length > 0) {
            if (confirm("Network issue please refresh the page.")) window.location.href();
        }
        // //console.log(tableNameArray);
    });

    $.post('allQuery.php', {
        'databaseName': databaseName,
        'flagForTableName': 'flagForTableName'
    }, function (data) {
        // //console.log(data);
        var tableNameArray = JSON.parse(data);
        loadTableName(databaseName, tableNameArray);
        // //console.log(tableNameArray);
    });

}
function showColumnName(tableInfo) {
    var tableNo = tableInfo.split(":::")[0].split(":")[1];
    enableHidden('loadingIcon' + tableNo, false);
    //hideing arror
    document.getElementsByClassName("fa-solid fa-play liIconMoreCss")[tableNo].hidden = true;

    // //console.log(tableNo, 'tableNo')
    // //console.log(document.getElementById(tableInfo).style.transform);
    if (document.getElementById(tableInfo).style.transform == 'rotate(90deg)') document.getElementById(tableInfo).setAttribute('style', 'transform: rotate(0deg) !important;position: static !important;');
    else document.getElementById(tableInfo).setAttribute('style', 'transform: rotate(90deg) !important;position: relative !important;top: 8px !important;');

    // //console.log(tableInfo, 'tableInfo');
    var tableName = tableInfo.split(":::")[1];
    var tableId = tableInfo.split(":::")[2];
    // //console.log(tableName,tableId);
    getColumnName(tableName, tableId);

}

function getColumnName(tableName, tableId) {
    var databaseName = document.getElementById('databaseHeading').textContent;
    // //console.log(databaseName);
    // //console.log(tableName);
    $.post('allQuery.php', {
        'flagForColumnName': 'flagForColumnName',
        'databaseName': databaseName,
        'tableName': tableName
    }, function (data) {
        // //console.log(data);
        var columnNameArray = JSON.parse(data);

        if (columnNameArray.length > 0) loadColoumneName(tableId, columnNameArray);

        //hiding loading table icon
        var selectedTableNo = tableId.split(":")[1];
        document.getElementById("loadingIcon" + selectedTableNo).hidden = true;
        document.getElementsByClassName("fa-solid fa-play liIconMoreCss")[selectedTableNo].hidden = false;

        // document.getElementsByClassName("fa-solid fa-play liIconMoreCss")[tableId.split(":")[1]].hidden=false;
        // //console.log(tableId,'tableId',tableId.split(":")[1],document.getElementsByClassName("fa-solid fa-play liIconMoreCss")[tableId.split(":")[1]]);
    });
}


function loadTableName(databaseName, masterTableName) {

    enableHidden('databaseList', true);
    enableHidden('tableListDiv', false);

    // //console.log(databaseName, 'databaseName');
    //Database Heading Appending Backup Button
    // fa - solid fa - file -export
    // fa - solid fa - download

    var dbHeadingInstance = document.getElementById('databaseHeading');
    var backupIcon = document.createElement('i');
    backupIcon.setAttribute('class', 'fa-solid fa-download');
    backupIcon.setAttribute('style', 'margin-left: 10px;color: greenyellow;');

    var tempSpinner = document.createElement('div');
    tempSpinner.setAttribute("class", "spinner-border text-primary");
    tempSpinner.setAttribute("style", "float: right !important;margin-top:0px;width: 21px;height: 21px;color: white !important;");
    tempSpinner.setAttribute("role", "status");
    tempSpinner.setAttribute("hidden", "");
    tempSpinner.setAttribute("id", "schemaHeadingLoadIcon");

    dbHeadingInstance.setAttribute('onclick', 'createBackupOfDatabase()');
    dbHeadingInstance.setAttribute('title', 'Click Here To Download Backup Of Database.');
    dbHeadingInstance.setAttribute('name', databaseName);

    dbHeadingInstance.innerHTML = databaseName;
    dbHeadingInstance.appendChild(backupIcon);
    dbHeadingInstance.appendChild(tempSpinner);


    var listInstance = document.getElementById('tableList');
    listInstance.innerHTML = '';
    listInstance.setAttribute('class', 'list-group verticalScroll resizeVertical');


    for (var i = 0; i < masterTableName.length; i++) {
        // //console.log(masterTableName[i].table_schema == databaseName);
        // //console.log(masterTableName[i], masterTableName[i].table_schema, masterTableName[i].table_name);

        var tempDatabaseName = '';
        var tempTableName = '';

        let currentObject = masterTableName[i];

        // Accessing values dynamically
        for (let key in currentObject) {
            if (currentObject.hasOwnProperty(key)) {
                if (key.toLowerCase() == "table_name") {
                    tempTableName = currentObject[key]
                } else if (key.toLowerCase() == "table_schema") {
                    tempDatabaseName = currentObject[key]
                }
            }
        }

        //creating UL For Column Name
        var columnUl = document.createElement('ul');
        columnUl.setAttribute('id', 'columnLi' + i);
        columnUl.setAttribute('hidden', '');

        if (tempDatabaseName == databaseName) {
    
            var liItem = document.createElement('button');
            liItem.appendChild(document.createTextNode(tempTableName));
            // var iconClass = 'icon' + i;
            liItem.setAttribute('id', 'table:' + i);
            liItem.setAttribute('onmouseover', "showIcon(this.id)");
            liItem.setAttribute('onmouseout', "hideIcon(this.id)");
            liItem.setAttribute('value', tempTableName);
            liItem.setAttribute('onclick', 'showBgBlue(this.id)');
            // liItem.setAttribute('onclick', "getColumnName(this.value,this.id)");

            if (countItems('tableList', 'button') <= 0) liItem.setAttribute('class', 'list-group-item list-group-item-action active mb-1');
            else liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');
            // liItem.setAttribute('onclick','loadTableName(this.innerHTML)');

            //info icon
            var liIconInfo = document.createElement('i');
            liIconInfo.setAttribute('class', 'fa-solid fa-circle-info me-2  float-end' + (' icon' + i));
            liIconInfo.setAttribute('hidden', '');
            liIconInfo.setAttribute('id', 'iconInfo' + i);
            liIconInfo.setAttribute('name', tempTableName);
            liIconInfo.setAttribute('title', 'Click Here To See Table Info.');
            liIconInfo.setAttribute('onclick', 'showTableInfo(this)');



            //select icon
            var liIconSelect = document.createElement('i');
            liIconSelect.setAttribute('class', 'fa-solid fa-circle-check me-2 float-end' + (' icon' + i));
            liIconSelect.setAttribute('id', 'iconSelect' + i);
            liIconSelect.setAttribute('name', tempTableName);
            liIconSelect.setAttribute('hidden', '');
            liIconSelect.setAttribute('title', 'Click Here To See Table Data.');
            liIconSelect.setAttribute('onclick', "showTableDataInview(this,'DEFAULT','')");


            // Detail Icon
            var liIconMore = document.createElement('i');
            liIconMore.setAttribute('class', 'fa-solid fa-play liIconMoreCss');
            liIconMore.setAttribute('id', 'iconMore:' + i + ":::" + tempTableName + ":::" + 'table:' + i);
            liIconMore.setAttribute('onclick', 'showColumnName(this.id)');

            var loadingfIcon = document.createElement("div");
            loadingfIcon.setAttribute("class", "spinner-border text-primary");
            loadingfIcon.setAttribute("style", "float: left !important;margin-top:3px;width: 21px;height: 21px;color: white !important;");
            loadingfIcon.setAttribute("role", "status");
            loadingfIcon.setAttribute("hidden", "");
            loadingfIcon.setAttribute("id", "loadingIcon" + i);



            liItem.appendChild(liIconSelect);
            liItem.appendChild(liIconInfo);
            liItem.appendChild(loadingfIcon);
            liItem.appendChild(liIconMore);

            listInstance.appendChild(liItem);
            //list of column apppend belo table name
            listInstance.appendChild(columnUl);
        }
    }
    enableHidden('loadingTableInfoMessage', true);
    enableHidden('reloadTable', false);
    enableHidden('dbBack', false);
}


function loadColoumneName(tableId, columnNameArray) {
    var idInfo = tableId.split(':');
    var listInstance = document.getElementById('columnLi' + idInfo[1]);
    // //console.log(listInstance.innerHTML, listInstance.innerHTML == '', listInstance.innerHTML != '');
    if (listInstance.hidden == false) {
        listInstance.hidden = true;
        return;
    }
    else if (listInstance.innerHTML == '') {
        for (var i = 0; i < columnNameArray.length; i++) {
            var liItem = document.createElement('button');
            let currentObject = columnNameArray[i];
            let tmpColumn=""

            // Accessing values dynamically
            for (let key in currentObject) {
                if (currentObject.hasOwnProperty(key)) {
                    if (key.toLowerCase() == "column_name") {
                        tmpColumn = currentObject[key]
                    } 
                }
            }

            liItem.appendChild(document.createTextNode(tmpColumn));
            liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');
            liItem.setAttribute('id', 'column:' + i);
            liItem.setAttribute('value', tmpColumn);
            // liItem.setAttribute('onclick', "getColumnName(this.value,this.id)");
            listInstance.appendChild(liItem);
        }
    }
    enableHidden('loadingIcon' + idInfo[1], true);
    // show arror
    document.getElementsByClassName("fa-solid fa-play liIconMoreCss")[idInfo[1]].hidden = false;


    listInstance.hidden = false;
}

function showTableDataInview(selectIconInstance, callType, selectQuery) {
    var tableName = "";
    if (callType == 'DEFAULT') {
        tableName = document.getElementById(selectIconInstance.id).attributes["name"].value;
        selectQuery = document.getElementById('queryInputBox').value = "SELECT * FROM " + tableName + " ;";

       isLoading(true)
    }



    var databaseName = document.getElementById('databaseHeading').textContent;
    // //console.log(databaseName);
    // //console.log(tableName);
    $.post('allQuery.php', {
        'flagForAllTableData': 'flagForAllTableData',
        'databaseName': databaseName,
        'tableName': tableName,
        'selectQuery': selectQuery
    }, function (data) {
        // //console.log(data);
        var masterTabledata = JSON.parse(data.split("%:%:%")[0]);
        var headerData = [];
        //since only column value is return in column_name: "taskId" this format but we require value i.e column name
        if (masterTabledata.length == 1) {
            (masterTabledata[0]).forEach(element => {
                headerData.push(Object.values(element));
            });
        }
        else headerData = Object.keys(masterTabledata[0]);

        loadTableDataInTable(masterTabledata, headerData, callType);

        if (callType == 'DEFAULT') {
            var tempQueryMessage = masterTabledata.length + " rows returned.";
            var tempQuery = document.getElementById('queryInputBox').value.trim();
            addQueryStatus(true, tempQuery, tempQueryMessage);
        }
    });

}


function loadTableDataInTable(masterTabledata, headerData, callType) {
    var tableInstance = document.getElementById('showTableData');
    tableInstance.innerHTML = '';
    var tHead = document.createElement('thead');
    var tr = document.createElement('tr');

    var tdWidth = parseInt(100 / parseInt(headerData.length));
    var widthCss = "width:" + tdWidth + "% !important;";
    // //console.log(masterTabledata,'masterTabledata',masterTabledata[masterTabledata.length - 1],'masterTabledata[masterTabledata.length - 1].length')

    for (var i = 0; i < headerData.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = headerData[i];
        th.setAttribute('style', widthCss)

        tr.appendChild(th);
    }
    tHead.appendChild(tr);


    var tBody = document.createElement('tbody');
    var tableLength = masterTabledata.length - 1;
    if (callType == 'COUSTOM') {
        tableLength = masterTabledata.length;
    }

    //it id done for select 902240354 as myNumber,23 as no; type of query since it have single row
    if (masterTabledata.length == 1) tableLength = masterTabledata.length;

    for (var i = 0; i < tableLength; i++) {
        var tr = document.createElement('tr');

        for (var j = 0; j < headerData.length; j++) {
            // //console.log(headerData.length,j)
            var td = document.createElement('td');
            td.setAttribute('style', widthCss)
            // //console.log(masterTabledata[i].userId, masterTabledata[0][j].column_name);
            //since colun name store in last row
            var columnName = columnName = headerData[j];

            td.innerHTML = masterTabledata[i][columnName];
            if (masterTabledata[i][columnName] != undefined) tr.appendChild(td);
            else {
                td.innerHTML = "";
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);

    }
    tableInstance.appendChild(tHead);
    tableInstance.appendChild(tBody);

    if (callType == 'DEFAULT') {
        enableHidden("playButtonIcon", false);
        enableHidden("playSpinnerIcon", true);

        hideLoadingMessage('loadingTableMessage', "", true);
        enableHidden('showTableDataDiv', false);
    }

    //Adding convert to csf function in icon

    ExportFileName = "Table Data -" + new Date();
    if (masterTabledata.length > 0) exportDataHeader = Object.keys(masterTabledata[0]);
    ExporttemData = masterTabledata;
    document.getElementById('excelIcon').setAttribute('onclick', 'exportCsv()');
    document.getElementById('sqlIcon').setAttribute('onclick', 'exportSql()');

    return 1;
}

function exportCsv() {
    if (ExporttemData.length < 1) {
        alert("No data available.");
        return;
    }
    if (confirm("Are You Sure Want To Download Data In CSV Format ?")) {
        exportoCSVFile(exportDataHeader, ExporttemData, ExportFileName);
    }
}
function exportSql() {
    if (ExporttemData.length < 1) {
        alert("No data available.");
        return;
    }
    if (confirm("Are You Sure Want To Download Data In SQL INSERT STATEMENT Format ?")) {
        exportoSQLFile(exportDataHeader, ExporttemData, ExportFileName);
    }
}

function showTableInfo(infoIconInstance) {
    enableHidden('tableInfoDiv', true);
    enableHidden("loadingTableInfoMessage", false);
    var tableName = document.getElementById(infoIconInstance.id).attributes["name"].value;
    var databaseName = document.getElementById('databaseHeading').textContent;
    // //console.log(databaseName);
    // //console.log(tableName);
    $.post('allQuery.php', {
        'flagForColumnInfo': 'flagForColumnInfo',
        'databaseName': databaseName,
        'tableName': tableName
    }, function (data) {
        // //console.log(data);
        var masterColumnData = JSON.parse(data);
        // //console.log(masterColumnData);
        loadColumnInfoView(tableName, masterColumnData);
    });
}

function loadColumnInfoView(tableName, masterColumnData) {
    document.getElementById('tableInfoHeading').innerHTML = tableName;
    var tableInfoListInstance = document.getElementById('tableInfo');
    tableInfoListInstance.innerHTML="";
    for (var i = 0; i < masterColumnData.length; i++) {
        // //console.log(masterColumnData,'masterColumnData');

        var row = document.createElement("div");
        row.setAttribute("class", "row");

        var columnNameDiv = document.createElement("div");
        columnNameDiv.setAttribute("class", "col-8");
        columnNameDiv.innerHTML = masterColumnData[i].column_name;

        var columnDataTypeDiv = document.createElement("div");
        columnDataTypeDiv.setAttribute("class", "col-4 lightGreen");
        columnDataTypeDiv.innerHTML = masterColumnData[i].column_type;

        row.appendChild(columnNameDiv);
        row.appendChild(columnDataTypeDiv);
        tableInfoListInstance.appendChild(row);
    }
    enableHidden("loadingTableInfoMessage", true);
    enableHidden('tableInfoDiv', false);
}



function showBgBlue(tableNameId) {
    // //console.log(document.getElementById(tableNameId),document.getElementsByClassName('list-group-item list-group-item-action active mb-1')[0]);
    document.getElementsByClassName('list-group-item list-group-item-action active mb-1')[0].setAttribute('class', 'list-group-item list-group-item-action mb-1');
    document.getElementById(tableNameId).setAttribute('class', 'list-group-item list-group-item-action active mb-1');
}

function isLoading(flag){
    enableHidden("playButtonIcon", flag);
    enableHidden("playSpinnerIcon", !flag);

    hideLoadingMessage('loadingTableMessage', "Loading Data. Please Wait...", !flag);
    enableHidden('showTableDataDiv', flag);
    enableHidden('showTableDataDiv', flag);
}

function runQuery() {

    isLoading(true);

    var databaseName = document.getElementById('databaseHeading').textContent.trim();
    // //console.log(document.getElementById('queryInputBox').value, 'queyInput');
    var queryArray = document.getElementById('queryInputBox').value.split(";");
    queryArray = formatQuery(queryArray);

    // //console.log(queryArray, queryArray.length);

    if (databaseName == 'SCHEMAS') {
        isLoading(false);
        alert("Database Not Selected.");
        // addQueryStatus(false, document.getElementById('queryInputBox').value, "Database Not Selected.");
        return;
    }

    if (queryArray.length == 0) {
        isLoading(false);
        if (document.getElementById('queryInputBox').value.trim().length > 0) alert('Invalid Query.Attach ;  if miss.')
        else alert("No Query Found.");
        return;
    }

    flagForContinousRun = true;
    if (queryArray.length > 0) {
        for (var i = 0; i < queryArray.length; i++) {
            if (flagForContinousRun == true) {
                // //console.log(queryArray[i].trim());
                if (queryArray[i].trim().length > 0) {
                    $.post('allQuery.php', {
                        'flagForRunQuery': true,
                        'currentQuery': queryArray[i].trim(),
                        'lineNo': i + 1
                    }, function (data) {
                        //we are concatinating query because loop is not wait for post all reponse so we can not get i th value in array
                        data = data.trim();
                        //console.log(data, 'data');
                        if (data.includes("SQL Exception") || data.includes("Fatal error")) {
                            //console.log("The substring was found.");
                            addQueryStatus(false, currentQuery, data);
                            isLoading(false);
                            return
                        }

                        var currentQuery = data.split('%:%:%')[0];
                        var lineNo = data.split('%:%:%')[1];
                        var noOfRowAffect = data.split('%:%:%')[4];
                        var queryMessage = data.split('%:%:%')[5].trim();
                        var queryType = getQueryType(currentQuery);
                        var columnsName = [];

                        //console.log(queryType, 'queryType','noOfRowAffect',noOfRowAffect,parseInt(noOfRowAffect)==1,typeof(parseInt(noOfRowAffect)));

                        var queryStatuseMessage = noOfRowAffect + " rows returned.";
                        //console.log("queryMessage", queryMessage);
                        if (queryMessage.length > 1) queryStatuseMessage = queryMessage;

                        if (data.split('%:%:%')[2] == 'true') {
                            if (queryType == 'SELECT' || queryType == 'SHOW' || queryType == 'DESCRIBE') {
                                var selectQueryResultData = [];
                                selectQueryResultData = JSON.parse(data.split('%:%:%')[3]);

                                if (selectQueryResultData.length > 0) {
                                    columnsName = Object.keys(selectQueryResultData[0]);
                                }
                                // //console.log(selectQueryResultData, 'selectQueryResultData',selectQueryResultData.length)
                                // //console.log(selectQueryResultData, 'selectQueryResultData', Object.keys(selectQueryResultData[0]));
                                //since one row is for column name


                                addQueryStatus(true, currentQuery, queryStatuseMessage);
                                // //console.log(Object.keys(selectQueryData[0]));
                                //object .jkey return key name of that object like myarray={fruit:'Apple',car:'tata'} so Object.keys(myarray) return fruit ,car                                
                                if (selectQueryResultData.length > 0) {
                                    if (loadTableDataInTable(selectQueryResultData, columnsName, 'COUSTOM') == 1) {
                                        //console.log("loadTableDataInTable");
                                        // exportoCSVFile(selectQueryResultData[selectQueryResultData.length-1],selectQueryResultData,"Table Data -"+new Date());

                                        if (parseInt(lineNo) == queryArray.length) {
                                            isLoading(true);
                                        }
                                    }
                                }

                            }else if (queryType == 'CREATE'){
                                addQueryStatus(true, currentQuery, "Table Created Successfully");
                            } else {
                                addQueryStatus(true, currentQuery, queryStatuseMessage);
                            }
                        } else {
                            var tempErrorMessage = data.split('%:%:%')[2];
                            // //console.log(currentQuery, 'currentQuery', tempErrorMessage, 'tempErrorMessage');

                            tempErrorMessage = formateErrorMessage(lineNo, tempErrorMessage);

                            addQueryStatus(false, currentQuery, tempErrorMessage);
                        }

                        if (parseInt(lineNo) == queryArray.length) {
                            isLoading(false);
                        }
                        // if(data.trim()!='true') flagForContinousRun=false;
                    });
                }
            }
        }
    }

}

function getQueryType(tempQuery) {
    var queryStatus = '';
    tempQuery = tempQuery.trim().toUpperCase();
    if (tempQuery.includes('SELECT')) queryStatus = 'SELECT';
    else if (tempQuery.includes('UPDATE')) queryStatus = 'UPDATE';
    else if (tempQuery.includes('INSERT')) queryStatus = 'INSERT';
    else if (tempQuery.includes('DELETE')) queryStatus = 'DELETE';
    else if (tempQuery.includes('ALTER')) queryStatus = 'ALTER';
    else if (tempQuery.includes('SHOW')) queryStatus = 'SHOW';
    else if (tempQuery.includes('DESCRIBE')) queryStatus = 'DESCRIBE';
    else if (tempQuery.includes('CREATE')) queryStatus = 'CREATE';
    else queryStatus = 'UNKNOWN';

    // //console.log(queryStatus);

    return queryStatus;
}

function formateErrorMessage(lineNo, tempErrorMessage) {
    var messageArray = tempErrorMessage.split('at line');
    tempErrorMessage = messageArray[0] + ' at line no ' + lineNo + ".";
    return tempErrorMessage;
}


function formatQuery(queryArray) {
    var formatedQuery = '';
    var tempQueryArray = [];
    for (let i = 0; i < queryArray.length - 1; i++) {
        // //console.log(queryArray[i], 'Query');
        queryArray[i] = queryArray[i].replace("\n", "");
        if (queryArray[i].length > 0) {
            formatedQuery = formatedQuery + queryArray[i].trim() + ";" + "\n";
            tempQueryArray.push(queryArray[i].trim() + ";");
        }
    }

    // //console.log(formatedQuery);
    if (formatedQuery == '' && document.getElementById('queryInputBox').value.trim().length > 0) document.getElementById('queryInputBox').value;
    else document.getElementById('queryInputBox').value = formatedQuery;
    return tempQueryArray;
}

function addQueryStatus(status, query, message) {
    // //console.log(status, query, message, 'called');
    var tableBody = document.getElementById('queryStatusTableBody');
    var tempTr = document.createElement('tr');

    var tempTdForIcon = document.createElement('td');
    var icon = document.createElement('i');
    if (status == true) icon.setAttribute('class', 'fa-solid fa-check greenCheck');
    else icon.setAttribute('class', 'fa-solid fa-x redCross');
    tempTdForIcon.appendChild(icon);

    var tempTdForSr = document.createElement('td');
    tempTdForSr.innerHTML = tableBody.rows.length + 1;

    var d = new Date(); // for now
    var tempTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var tempTdForTime = document.createElement('td');
    tempTdForTime.innerHTML = tempTime;

    var tempTdForQuery = document.createElement('td');
    tempTdForQuery.innerHTML = query;

    var tempTdForMessage = document.createElement('td');
    tempTdForMessage.innerHTML = message;

    tempTr.appendChild(tempTdForIcon);
    tempTr.appendChild(tempTdForSr);
    tempTr.appendChild(tempTdForTime);
    tempTr.appendChild(tempTdForQuery);
    tempTr.appendChild(tempTdForMessage);

    tableBody.appendChild(tempTr);

    document.getElementById('queryStatusTableDiv').scrollTo(0, parseInt(document.getElementById('queryStatusTableDiv').scrollHeight));
}
function createBackupOfDatabase() {
    if (confirm("Are you sure want to take backup of database ?")) {
        disabledButton("databaseHeading", true);
        alert("Taking Backup Please Wait...");
        enableHidden('schemaHeadingLoadIcon', false);
        var databaseName = "";
        databaseName = document.getElementById('databaseHeading').textContent;
        //console.log(databaseName, 'createBackupOfDatabase');
        $.post('userDbConnection.php', {
            'flagForDbBackUp': 'flagForDbBackUp'
        }, function (data) {
            // //console.log(data, 'data');
            if (data.trim() == 'Succesfully got the backup!') {
                var link = document.createElement("a");
                var filePath = "tempDBFile/" + databaseName + ".sql";
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute

                    link.setAttribute("href", filePath);

                    link.setAttribute("download", databaseName + " " + new Date() + ".sql");
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    alert("Backup Done.");
                    enableHidden('schemaHeadingLoadIcon', true);
                    disabledButton("databaseHeading", false);
                    $.post('userDbConnection.php', {
                        'flagForDeleteFile': 'flagForDeleteFile',
                        'filePath': filePath
                    }, function (data) {
                        // //console.log(data, 'Success');
                    });
                }
            }
        });
    }
}

function styleQuery() {
    var keywords = ["SELECT", "FROM", "WHERE", "LIKE", "BETWEEN", "NOT LIKE", "FALSE", "NULL", "FROM", "TRUE", "NOT IN"];
    // var newHTML = "";

}