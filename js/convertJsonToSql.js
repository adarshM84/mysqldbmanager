//console.log('convertToSQLInsertStatement');
var itemsFormatted = [];
// var fileTitle = 'orders'; // or 'my-unique-title'

function convertToSQLInsertStatement(objArray) {
    var str = "INSERT INTO '' VALUES ";

    for (var i = 0; i < objArray.length-1; i++) {
        var line = '(';
        if(i!=0){
            //for space
            str+="\n";
        }
        for (var index in objArray[i]) {
            // if (line != '') line += ','

            line += "'"+objArray[i][index]+"',";
        }
        // for removing , from last
        line=line.substring(0,line.length-1);

        str += line + '),';
    }

    // for removing , from last
    str=str.substring(0,str.length-1)+";";


    return str;
}

function exportoSQLFile(headers, items, fileTitle) {
    // //console.log('exportoCSVFile Called', headers, items, fileTitle);
    // if (headers) {
    //     items.unshift(headers);
    // }

    // Convert Object to JSON

    var sql = this.convertToSQLInsertStatement(items);

    var exportedFilenmae = fileTitle + '.sql' || 'export.sql';

    var blob = new Blob([sql], { type: 'text/sql;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

