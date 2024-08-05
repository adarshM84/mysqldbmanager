
function showBgRed(inputId, flag) {
    // //console.log(inputId,flag);
    if (flag) document.getElementById(inputId).setAttribute('style', 'background-color:#ff6666 !important');
    else document.getElementById(inputId).setAttribute('style', '');
}

function loadFile(event, imageId) {
    //console.log('loadFile')
    imageUpload = 1;
    // //console.log(event, imageId);
    var dishImage = document.getElementById("imagePreview");
    dishImage.src = URL.createObjectURL(event.target.files[0]);
    // dishImage.style.height = 200;
    // dishImage.style.width = 180;
    dishImage.onload = function () {
        URL.revokeObjectURL(dishImage.src) // free memory
    }
}

function disabledButton(buttonId, flag) {
    if (flag) document.getAnimations
    if (flag) document.getElementById(buttonId).disabled = flag;
    else document.getElementById(buttonId).disabled = flag;
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function showErrorMessage(errorId, errorMessage) {
    document.getElementById(errorId).innerHTML = errorMessage;
}
function enableHidden(elementId, flag) {
    document.getElementById(elementId).hidden = flag;
}

function enableAllInput() {
    // //console.log('enableEdit',document.getElementsByTagName('input').length);
    // //console.log('enableEdit',document.getElementsByTagName('input').disabled);
    for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
        document.getElementsByTagName('input')[i].disabled = false;
    }
}
function hideLoadingMessage(messageId, loadingMessage, flag) {
    //for div of message
    document.getElementById(messageId).parentNode.hidden = flag;
    document.getElementById(messageId).innerHTML = loadingMessage;
    document.getElementById(messageId).hidden = flag;

}

function filterTableData(tableId, searchInputId) {
    var input, filter, table, tr, td, i, cellValue, j;
    input = document.getElementById(searchInputId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            cellValue = td.innerText;
            if (td) {
                cellValue = td.innerText;
                if (cellValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function checkOnline() {
    // //console.log('checkOnline');
    if (window.navigator.onLine) { } else {
        alert("No Internet connection.Please Check :(");
        return false;
    }
}

