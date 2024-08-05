
var groupName = '';
var firstName = '';
var userImage = '';
var flagImageUpload = false;
var lastName = '';
var loginName = '';
var loginPassword = '';
var hostName = '';
var userName = '';
var dbPassWord = '';
var accountType = '';
var fSport='';
var fFood='';
var flagForValdCredential = false;
var masterEArray = [];


function showUsertypeSection(selectedAccountType) {
    accountType = selectedAccountType;
    document.getElementById('databseAccount').hidden = false;
    if (accountType == 'group') document.getElementById('groupSection').hidden = false;

    document.getElementById('accountType').hidden = true;
}

function createAccount() {

    disabledButton('registerButton', true);
    if (accountType == 'group') groupName = document.getElementById('groupName').value.trim();

    userImage = document.getElementById('userImage');
    firstName = document.getElementById('firstName').value.trim();
    lastName = document.getElementById('lastName').value.trim();
    loginName = document.getElementById('loginName').value.trim();
    loginPassword = document.getElementById('loginPassword').value.trim();
    fSport=document.getElementById("fSport").value.trim().toUpperCase();
    fFood=document.getElementById("fFood").value.trim().toUpperCase();

    hostName = document.getElementById("hostName").value.trim();
    userName = document.getElementById("userName").value.trim();
    dbPassWord = document.getElementById("dbPassWord").value.trim();
    
    // //console.log("fSport",fSport,"fFood",fFood);

    if (validateDetails() == 0) {
        disabledButton('registerButton', false);
        return 0;
    };

    userImage = userImage.files[0];

    // //console.log(hostName, userName, dbPassWord);
    // return;
    document.getElementById("success").innerHTML = "Creating Account Please Wait.....";

    $.post('checkConnection.php', {
        'hostName': hostName,
        'userName': userName,
        'dbPassWord': dbPassWord
    }, function (data) {
        //console.log(data);

        if (data == 'validCredential') {
            flagForValdCredential = true;
            showBgRed('hostName', false);
            showBgRed('userName', false);
            showBgRed('dbPassWord', false);
            showErrorMessage("error", "");

            formData = new FormData();
            formData.append("flagForCreateAccount", "flagForCreateAccount");
            formData.append("accountType", accountType);
            formData.append("groupName", groupName);
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("loginName", loginName);
            formData.append("loginPassword", loginPassword);
            formData.append("hostName", hostName);
            formData.append("userName", userName);
            formData.append("dbPassWord", dbPassWord);
            formData.append("userImage", userImage);
            formData.append("fFood", fFood);
            formData.append("fSport", fSport);
            formData.append("flagImageUpload", flagImageUpload);

            $.ajax({
                url: "saveCreateAccount.php",
                type: "POST",
                enctype: 'multipart/form-data',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    //console.log(data);
                    //console.log(data);
                    if (data == 'true') {
                        document.getElementById("success").innerHTML = "Account Created Successfully..";
                        location.reload();
                    }
                }
            });

            // $.post('saveCreateAccount.php', {
            //     'accountType': accountType,
            //     'groupName': groupName,
            //     'firstName': firstName,
            //     'lastName': lastName,
            //     'loginName': loginName,
            //     'loginPassword': loginPassword,
            //     'hostName': hostName,
            //     'userName': userName,
            //     'dbPassWord': dbPassWord
            // }, function (data) {
            //     //console.log(data);
            //     if (data == 'true') {
            //         document.getElementById("success").innerHTML = "Account Created Successfully..";
            //         location.reload();
            //     }
            // });
        } else {
            document.getElementById("success").innerHTML = "";

            showBgRed('hostName', true);
            showBgRed('userName', true);
            showBgRed('dbPassWord', true);
            showErrorMessage("error", "Invalid Database Credential.");
        }
    });

}

function validateDetails() {
    // //console.log(accountType, userImage, userImage.files, userImage.files == undefined, "call");


    if (userImage.files == undefined) {
        showBgRed('userImage', true);
        showErrorMessage("error", "Please Upload Image.");
        return 0;
    } else {
        if (userImage.files.length > 0) flagImageUpload = true;
        showBgRed('userImage', false);
        showErrorMessage("error", "");
    }
    if (flagImageUpload == false) {
        showBgRed('userImage', true);
        showErrorMessage("error", "Please Upload Image.");
        return 0;
    } else {
        if (userImage.files.length > 0) flagImageUpload = true;
        showBgRed('userImage', false);
        showErrorMessage("error", "");
    }

    if (accountType == 'group' && groupName.length == 0) {
        showBgRed('groupName', true);
        showErrorMessage("error", "Group Name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('groupName', false);
        showErrorMessage("error", "");
    }

    if (firstName == "") {
        showBgRed('firstName', true);
        showErrorMessage("error", "First Name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('firstName', false);
        showErrorMessage("error", "");
    }
    if (lastName == "") {
        showBgRed('lastName', true);
        showErrorMessage("error", "Last Name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('lastName', false);
        showErrorMessage("error", "");
    }

    if (loginName.length == 0 || validateEmail(loginName) == false) {
        // //console.log('Error1');
        showBgRed('loginName', true);
        showErrorMessage("error", "Email/Login Id Not In Correct Formate.Please Correct It.");
        return 0;
    } else {
        showBgRed('loginName', false);
        showErrorMessage("error", "");
    }

    if (checkDuplicateEmail(loginName) == true) {
        showBgRed('loginName', true);
        showErrorMessage("error", "Duplicate Email/Login Id Found.Please Change It");
        return 0;
    }
    else {
        showBgRed('loginName', false);
        showErrorMessage("error", "");
    }


    if (validateAndMatchEmail() == 0) return 0;

    if (loginPassword.length < 6) {
        showBgRed('loginPassword', true);
        showErrorMessage("error", "Login Password Length Should Be Atleast 6 Digit.");
        return 0;
    } else {
        showBgRed('loginPassword', false);
        showErrorMessage("error", "");
    }

    if (hostName == "") {
        showBgRed('hostName', true);
        showErrorMessage("error", "Host Name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('hostName', false);
        showErrorMessage("error", "");
    }
    if (userName == "") {
        showBgRed('userName', true);
        showErrorMessage("error", "User Name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('userName', false);
        showErrorMessage("error", "");
    }
    if (dbPassWord == "") {
        showBgRed('dbPassWord', true);
        showErrorMessage("error", "Database Password Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('dbPassWord', false);
        showErrorMessage("error", "");
    }
    if (fSport == "") {
        showBgRed('fSport', true);
        showErrorMessage("error", "Favourite sport name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('fSport', false);
        showErrorMessage("error", "");
    }
    if (fFood == "") {
        showBgRed('fFood', true);
        showErrorMessage("error", "Favourite food name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('fFood', false);
        showErrorMessage("error", "");
    }


    return 1;
}


function validateAndMatchEmail() {
    // //console.log('validateAndMatchEmail');
    var confirmEmail = document.getElementById('confirmEmail').value.trim();
    loginName = document.getElementById('loginName').value.trim();

    if (loginName.length == 0 || validateEmail(loginName) == false) {
        // //console.log('Error1');
        showBgRed('loginName', true);
        showErrorMessage("error", "Email/Login Id Not In Correct Formate.Please Correct It.");
        return 0;
    } else {
        showBgRed('loginName', false);
        showErrorMessage("error", "");
    }

    if (confirmEmail.length > 0 && validateEmail(confirmEmail) == false) {
        // //console.log('Error2')
        showBgRed('confirmEmail', true);
        showErrorMessage("error", "Confirm Email/Login Id Not In Correct Formate.Please Correct It.");
        return 0;
    } else {
        showBgRed('confirmEmail', false);
        showErrorMessage("error", "");
    }
    if (confirmEmail.length > 0 && loginName.length > 0 && confirmEmail == loginName) {
        document.getElementById('confirmEmail').setAttribute('style', "background-color: #6dd36d !important;border: 3px solid green !important;border-radius: 10px !important;")
        showErrorMessage("error", "");
    } else {
        showBgRed('confirmEmail', true);
        showErrorMessage("error", "Email/Login Id Not Matched.");
        return 0;
    }
    // //console.log('validateAndM/atchEmail End');
    return 1;
}
function checkDuplicateEmail(userEmail) {
    userEmail = userEmail.trim();
    for (var i = 0; i < masterEArray.length; i++) {
        if (userEmail == masterEArray[i].loginName) {
            return true;
        }
    }
    return false;
}