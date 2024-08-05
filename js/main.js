var masterDataBase = [];

// var masterTableName = [];

var hostName = '';





var speech = true;





function converText() {

    var speech = true;

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;



    const recognition = new SpeechRecognition();

    recognition.interimResults = true;

    // const words = document.querySelector('.words');

    // words.appendChild(p);



    recognition.addEventListener('result', e => {

        const transcript = Array.from(e.results)

            .map(result => result[0])

            .map(result => result.transcript)

            .join('')



        document.getElementById("convertedText").value = transcript;

        //console.log(transcript);

    });



    if (speech == true) {

        recognition.start();

        // recognition.addEventListener('end', recognition.start);

    }

}



function runCode() {

    var currentInfo = document.getElementById("convertedText").value.trim().toUpperCase().split(' ');

    var databaseName = currentInfo[1];

    //console.log(currentInfo, databaseName);

    //console.log(masterDataBase);

    for (var i = 0; i < masterDataBase.length; i++) {

        //console.log(masterDataBase[i].Database);

        if (masterDataBase[i].Database.toUpperCase() == databaseName){

            //console.log('Called');

            document.getElementById('database'+i).click();

            document.getElementById("convertedText").value ='';

            return;

        }

    }

  

}



function validateEmail(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());

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





function checkLogin() {

    var hostName = document.getElementById("hostName");

    var userName = document.getElementById("userName");

    var dbPassWord = document.getElementById("dbPassWord");



    // //console.log(emailId.value, pass.value);

    if (hostName.value == "") {

        hostName.style.backgroundColor = "#ff6666 !important";

        document.getElementById("error").innerHTML = "Host Name Can Not Be Blank.";

        return 0;

    } else {

        hostName.style.backgroundColor = "";

        document.getElementById("error").innerHTML = "";

    }

    if (userName.value == "") {

        userName.style.backgroundColor = "#ff6666 !important";

        document.getElementById("error").innerHTML = "User Name Can Not Be Blank.";

        return 0;

    } else {

        userName.style.backgroundColor = "";

        document.getElementById("error").innerHTML = "";

    }

    // if (dbPassWord.value == "") {

    //     dbPassWord.style.backgroundColor = "#ff6666 !important";

    //     document.getElementById("error").innerHTML = "Database Password Can Not Be Blank.";

    //     return 0;

    // } else {

    //     dbPassWord.style.backgroundColor = "";

    //     document.getElementById("error").innerHTML = "";

    // }



    //console.log(hostName.value, userName.value, dbPassWord.value);

    // return;



    document.getElementById("success").innerHTML = "Please Wait Checking For Credential....";

    $.post('checkConnection.php', {

        'hostName': hostName.value,

        'userName': userName.value,

        'dbPassWord': dbPassWord.value

    }, function (data) {

        //console.log(data);

        if (data == 'false') {

            document.getElementById("success").innerHTML = "";

            document.getElementById("error").innerHTML = "Invalid Credential.";

        } else {

            var audio = document.getElementById("audio");

            audio.play();

            window.location.href = "dashboard.php";

        }

    });

}





function generatePDF() {

    const element = document.getElementById('invoice');

    var opt = {

        filename: 'foodOrderBill.pdf',

        image: { type: 'jpeg', quality: 0.98 },

        html2canvas: { scale: 2 },

        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }

    };



    // New Promise-based usage:

    html2pdf(element, opt);

    // html2pdf(excess);

    //console.log('Save');

    return true;

}



function loadDatabaseName() {

    //console.log('loadDatabaseName');

    var listInstance = document.getElementById('databaseList');

    listInstance.setAttribute('class', 'list-group verticalScroll');

    //console.log(masterDataBase.length);

    for (var i = 0; i < masterDataBase.length; i++) {

        var liItem = document.createElement('button');

        //console.log(masterDataBase, masterDataBase[i].Database);

        liItem.appendChild(document.createTextNode(masterDataBase[i]['Database']));

        liItem.setAttribute('class', 'btn btn-primary text-center mLR20 mb-3');

        liItem.setAttribute('id', 'database' + i);

        liItem.setAttribute('onclick', 'getTableName(this.innerHTML)');

        listInstance.appendChild(liItem);

    }

    //console.log(listInstance);

}



function countItems(itemId, itemType) {

    var ul = document.getElementById(itemId);

    //console.log(ul);

    var i = 0, itemCount = 0;

    while (ul.getElementsByTagName(itemType)[i++]) itemCount++;

    return itemCount;

}



// function loadTableNameMasterTest(databaseName) {

//     document.getElementById('databaseList').hidden = true;

//     document.getElementById('tableList').hidden = false;

//     // <button type="button" class="list-group-item list-group-item-action">A second item</button>

//     //console.log(databaseName, 'databaseName');

//     document.getElementById('databaseHeading').innerHTML = databaseName;

//     var listInstance = document.getElementById('tableList');

//     listInstance.setAttribute('class', 'list-group verticalScroll');

//     if (hostName != 'localhost') {

//         for (var i = 0; i < masterTableName.length; i++) {

//             //console.log(masterTableName[i].table_schema == databaseName);

//             //console.log(masterTableName[i], masterTableName[i].table_schema, masterTableName[i].table_name)



//             if (masterTableName[i].table_schema == databaseName) {

//                 //console.log(masterTableName[i].table_schema, masterTableName[i].table_name);

//                 if (countItems('tableList', 'button') <= 0) {

//                     var liItem = document.createElement('button');

//                     liItem.appendChild(document.createTextNode(masterTableName[i].table_name));

//                     liItem.setAttribute('class', 'list-group-item list-group-item-action active mb-1');

//                     liItem.setAttribute('id', 'table' + i);

//                     // liItem.setAttribute('onclick','loadTableName(this.innerHTML)');

//                     listInstance.appendChild(liItem);

//                 } else {

//                     //console.log(masterTableName[i].table_schema, masterTableName[i].table_name)

//                     var liItem = document.createElement('button');

//                     liItem.appendChild(document.createTextNode(masterTableName[i].table_name));

//                     liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');

//                     liItem.setAttribute('id', 'table' + i);

//                     // liItem.setAttribute('onclick','loadTableName(this.innerHTML)');

//                     listInstance.appendChild(liItem);

//                 }



//             }

//         }

//     } else {

//         for (var i = 0; i < masterTableName.length; i++) {

//             //console.log(masterTableName[i].TABLE_SCHEMA == databaseName);

//             //console.log(masterTableName[i], masterTableName[i].TABLE_SCHEMA, masterTableName[i].TABLE_NAME)



//             if (masterTableName[i].TABLE_SCHEMA == databaseName) {

//                 //console.log(masterTableName[i].TABLE_SCHEMA, masterTableName[i].TABLE_NAME);

//                 if (countItems('tableList', 'button') <= 0) {

//                     var liItem = document.createElement('button');

//                     liItem.appendChild(document.createTextNode(masterTableName[i].TABLE_NAME));

//                     liItem.setAttribute('class', 'list-group-item list-group-item-action active mb-1');

//                     liItem.setAttribute('id', 'table' + i);

//                     // liItem.setAttribute('onclick','loadTableName(this.innerHTML)');

//                     listInstance.appendChild(liItem);

//                 } else {

//                     //console.log(masterTableName[i].TABLE_SCHEMA, masterTableName[i].TABLE_NAME)

//                     var liItem = document.createElement('button');

//                     liItem.appendChild(document.createTextNode(masterTableName[i].TABLE_NAME));

//                     liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');

//                     liItem.setAttribute('id', 'table' + i);

//                     // liItem.setAttribute('onclick','loadTableName(this.innerHTML)');

//                     listInstance.appendChild(liItem);

//                 }



//             }

//         }

//     }



// }



function getTableName(databaseName) {

    //console.log(databaseName);

    $.post('allQuery.php', {

        'databaseName': databaseName,

        'flagForTableName': 'flagForTableName'

    }, function (data) {

        var tableNameArray = JSON.parse(data);

        loadTableName(databaseName, tableNameArray);

        //console.log(tableNameArray);

    });

}



function getColumnName(tableName, tableId) {

    var databaseName = document.getElementById('databaseHeading').innerHTML;

    //console.log(databaseName);

    //console.log(tableName);

    $.post('allQuery.php', {

        'flagForColumnName': 'flagForColumnName',

        'databaseName': databaseName,

        'tableName': tableName

    }, function (data) {

        //console.log(data);

        var columnNameArray = JSON.parse(data);

        loadColoumneName(tableId, columnNameArray);

        //console.log(columnNameArray);

    });

}



function loadTableName(databaseName, masterTableName) {



    document.getElementById('databaseList').hidden = true;

    document.getElementById('tableList').hidden = false;

    //console.log(databaseName, 'databaseName');

    document.getElementById('databaseHeading').innerHTML = databaseName;

    var listInstance = document.getElementById('tableList');

    listInstance.setAttribute('class', 'list-group verticalScroll');





    if (hostName != 'localhost') {

        for (var i = 0; i < masterTableName.length; i++) {

            //console.log(masterTableName[i].table_schema == databaseName);

            //console.log(masterTableName[i], masterTableName[i].table_schema, masterTableName[i].table_name);



            //creating UL For Column Name

            var columnUl = document.createElement('ul');

            columnUl.setAttribute('id', 'columnLi' + i);

            columnUl.setAttribute('hidden', '');



            if (masterTableName[i].table_schema == databaseName) {

                //console.log(masterTableName[i].table_schema, masterTableName[i].table_name);

                //console.log(masterTableName[i].table_schema, masterTableName[i].table_name)

                var liItem = document.createElement('button');

                liItem.appendChild(document.createTextNode(masterTableName[i].table_name));

                var iconClass = 'icon' + i;

                liItem.setAttribute('onmouseover', "showIcon(this.id)");

                liItem.setAttribute('onmouseout', "hideIcon(this.id)");

                liItem.setAttribute('value', masterTableName[i].table_name);

                liItem.setAttribute('onclick', "getColumnName(this.value,this.id)");



                if (countItems('tableList', 'button') <= 0) liItem.setAttribute('class', 'list-group-item list-group-item-action active mb-1');

                else liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');

                liItem.setAttribute('id', 'table:' + i);

                // liItem.setAttribute('onclick','loadTableName(this.innerHTML)');



                //info icon

                var liIconInfo = document.createElement('i');

                liIconInfo.setAttribute('class', 'fa-solid fa-circle-info me-2  float-end' + (' icon' + i));

                liIconInfo.setAttribute('hidden', '');

                liIconInfo.setAttribute('id', 'iconInfo' + i);



                //select icon

                var liIconSelect = document.createElement('i');

                liIconSelect.setAttribute('class', 'fa-solid fa-circle-check me-2 float-end' + (' icon' + i));

                liIconSelect.setAttribute('id', 'iconSelect' + i);

                liIconSelect.setAttribute('hidden', '');



                liItem.appendChild(liIconSelect);

                liItem.appendChild(liIconInfo);

                liItem.appendChild(columnUl);

                listInstance.appendChild(liItem);

            }

        }

    } else {

        for (var i = 0; i < masterTableName.length; i++) {

            //console.log(masterTableName[i].TABLE_SCHEMA == databaseName);

            //console.log(masterTableName[i], masterTableName[i].TABLE_SCHEMA, masterTableName[i].TABLE_NAME)



            var columnUl = document.createElement('ul');

            columnUl.setAttribute('id', 'columnLi' + i);

            columnUl.setAttribute('hidden', '');





            if (masterTableName[i].TABLE_SCHEMA == databaseName) {

                //console.log(masterTableName[i].TABLE_SCHEMA, masterTableName[i].TABLE_NAME);

                //console.log(masterTableName[i].TABLE_SCHEMA, masterTableName[i].TABLE_NAME);



                var liItem = document.createElement('button');

                liItem.appendChild(document.createTextNode(masterTableName[i].TABLE_NAME));

                if (countItems('tableList', 'button') <= 0) liItem.setAttribute('class', 'list-group-item list-group-item-action active mb-1');

                else liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');

                liItem.setAttribute('id', 'table:' + i);

                var iconClass = 'icon' + i;

                liItem.setAttribute('onmouseover', "showIcon(this.id)");

                liItem.setAttribute('onmouseout', "hideIcon(this.id)");

                liItem.setAttribute('value', masterTableName[i].TABLE_NAME);

                liItem.setAttribute('onclick', "getColumnName(this.value,this.id)");



                //info icon

                var liIconInfo = document.createElement('i');

                liIconInfo.setAttribute('class', 'fa-solid fa-circle-info me-2  float-end' + (' icon' + i));

                liIconInfo.setAttribute('hidden', '');

                liIconInfo.setAttribute('id', 'iconInfo' + i);



                //select icon

                var liIconSelect = document.createElement('i');

                liIconSelect.setAttribute('class', 'fa-solid fa-circle-check me-2 float-end' + (' icon' + i));

                liIconSelect.setAttribute('hidden', '');

                liIconSelect.setAttribute('id', 'iconSelect' + i);





                liItem.appendChild(liIconSelect);

                liItem.appendChild(liIconInfo);

                liItem.appendChild(columnUl);

                listInstance.appendChild(liItem);



                //console.log(liIconSelect, listInstance, 'localhost');

            }

        }

    }

}



function loadColoumneName(tableId, columnNameArray) {

    var idInfo = tableId.split(':');

    var listInstance = document.getElementById('columnLi' + idInfo[1]);

    //console.log(listInstance);

    if (listInstance.hidden == false) {

        listInstance.hidden = true;

        return;

    }

    if (hostName != 'localhost') {

        for (var i = 0; i < columnNameArray.length; i++) {

            var liItem = document.createElement('button');

            liItem.appendChild(document.createTextNode(columnNameArray[i].column_name));

            liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');

            liItem.setAttribute('id', 'column:' + i);

            liItem.setAttribute('value', columnNameArray[i].column_name);

            liItem.setAttribute('onclick', "getColumnName(this.value,this.id)");

            listInstance.appendChild(liItem);

        }

    } else {

        for (var i = 0; i < columnNameArray.length; i++) {

            var liItem = document.createElement('button');

            liItem.appendChild(document.createTextNode(columnNameArray[i].COLUMN_NAME));

            liItem.setAttribute('class', 'list-group-item list-group-item-action mb-1');

            liItem.setAttribute('id', 'column:' + i);

            liItem.setAttribute('value', columnNameArray[i].COLUMN_NAME);

            liItem.setAttribute('onclick', "getColumnName(this.value,this.id)");

            listInstance.appendChild(liItem);

        }

    }



    listInstance.hidden = false;





}