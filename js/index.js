
var speech = true;
var hostName, userName, dbPassWord;
// window.onbeforeunload =logOut();

//navbar function
function toggle() {
    var what = document.getElementById("navList");
    if (what.style.display === "flex") {
        what.style.display = "none";
    }
    else {
        what.style.display = "flex";
    }
}
function show() {
    var why = document.getElementById("work");
    if (why.style.display === "flex") {
        why.style.display = "none";
    }
    else {
        why.style.display = "flex";
    }
}
// navbar function end


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
        if (masterDataBase[i].Database.toUpperCase() == databaseName) {
            //console.log('Called');
            document.getElementById('database' + i).click();
            document.getElementById("convertedText").value = '';
            return;
        }
    }

}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function checkLogin() {
    var loginId = document.getElementById("loginId").value.trim();
    var loginPassword = document.getElementById("loginPassword").value.trim();
    var fSport=document.getElementById("fSport").value.trim().toUpperCase();
    var fFood=document.getElementById("fFood").value.trim().toUpperCase();



    // //console.log(emailId.value, pass.value);
    if (loginId.length == 0) {
        showBgRed('loginId', true);
        showErrorMessage("error", "Email/Login Id Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('loginId', false);
        showErrorMessage("error", "");
    }
    if (validateEmail(loginId) == false) {
        showBgRed('loginId', true);
        showErrorMessage("error", "Email/Login Id Not In Correct Format Please Correct It.");
        return 0;
    } else {
        showBgRed('loginId', false);
        showErrorMessage("error", "");
    }
    if (loginPassword.length == 0) {
        showBgRed('loginPassword', true);
        showErrorMessage("error", "Login Password Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('loginPassword', false);
        showErrorMessage("error", "");
    }
    if (fSport.length == 0) {
        showBgRed('fSport', true);
        showErrorMessage("error", "Favourite Sport Name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('fSport', false);
        showErrorMessage("error", "");
    }
    if (fFood.length == 0) {
        showBgRed('fFood', true);
        showErrorMessage("error", "Favourite Food Name Can Not Be Blank.");
        return 0;
    } else {
        showBgRed('fSport', false);
        showErrorMessage("error", "");
    }

    if (checkOnline() == false) return;


    document.getElementById("success").innerHTML = "Checking  Credential .Please Wait....";
    disabledButton("loginButton", true);
    $.post('checkConnection.php', {
        'loginId': loginId,
        'loginPassword': loginPassword,
        'fFood':fFood,
        'fSport':fSport
    }, function (data) {
        //console.log("Called")
        //console.log(data);
        if (data == 'true') {
            var audio = document.getElementById("audio");
            audio.play();
            window.location.href = "dashboard.php";
        }else if (data.includes("no match error")) {
            document.getElementById("success").innerHTML = "";
            document.getElementById("error").innerHTML = "Favourate food and sport name not natch.";
        } else if (data.includes("Server Error.Refresh the page..")) {
            document.getElementById("success").innerHTML = "";
            document.getElementById("error").innerHTML = data;
        } else {
            document.getElementById("success").innerHTML = "";
            document.getElementById("error").innerHTML = "Invalid Email/login Id or Login Password.";
        }
        disabledButton("loginButton", false);
    });
}

function logOut(logOutType) {
    if(logOutType==undefined){
        logOutType="AUTOMATIC";
    } 
    //console.log(logOutType)

    $.post('checkConnection.php', {
        'logOut': 'logOut',
        "logOutType":logOutType
    }, function (data) {
        //console.log(data);
        if (data == 'true') window.location.href = 'index.php';
    });
}

function showPassword(flag) {
    if (flag == true) {
        document.getElementById('loginPassword').setAttribute('type', 'text');
        document.getElementsByClassName("loginPassIcon")[0].hidden = true;
        document.getElementsByClassName("loginPassIcon")[1].hidden = false;
    } else {
        document.getElementsByClassName("loginPassIcon")[0].hidden = false;
        document.getElementsByClassName("loginPassIcon")[1].hidden = true;
        document.getElementById('loginPassword').setAttribute('type', 'password');
    }
}


// For temp login

function checkTempLogin() {
    disabledButton('tempLogin', true);

    hostName = document.getElementById("hostName").value.trim();
    userName = document.getElementById("userName").value.trim();
    dbPassWord = document.getElementById("dbPassWord").value.trim();

    if (validateDetails() == 0) {
        disabledButton('tempLogin', false);
        return 0;
    };

    // //console.log(hostName, userName, dbPassWord);
    // return;
    document.getElementById("success").innerHTML = "Checking  Credential .Please Wait....";

    $.post('checkConnection.php', {
        'flagForTempLogin': 'flagForTempLogin',
        'tempHostName': hostName,
        'tempUserName': userName,
        'tempDbPassWord': dbPassWord
    }, function (data) {
        //console.log(data, data == 'validTempCredential');

        if (data == 'validTempCredential') {
            // //console.log("Called");
            showBgRed('hostName', false);
            showBgRed('userName', false);
            showBgRed('dbPassWord', false);
            showErrorMessage("error", "");
            localStorage.setItem("hostName",hostName)
            window.location.href = "dashboard.php";

        } else {
            document.getElementById("success").innerHTML = "";

            showBgRed('hostName', true);
            showBgRed('userName', true);
            showBgRed('dbPassWord', true);
            showErrorMessage("error", "Invalid Database Credential.");
            disabledButton('tempLogin', false);
        }
    });
}

function validateDetails() {
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
    return 1;
}

//check after every 120000 milisec
setInterval(logOut,1800000);