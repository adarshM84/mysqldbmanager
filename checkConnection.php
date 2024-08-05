<?php
if (session_id() == '') {
  session_start();
}

require_once 'pooldb.php';
error_log("=============== Test");

if (isset($_POST['hostName'])) {
  $hostName = $_POST['hostName'];
  $userName = $_POST['userName'];
  $dbPassWord = $_POST['dbPassWord'];

  $conn = new mysqli($hostName, $userName, $dbPassWord);
  if ($conn->connect_error) {
    echo "false";
  } else {
    echo "validCredential";
  }
} elseif (isset($_POST['flagForTempLogin'])) {

  date_default_timezone_set('Asia/Kolkata');
  $currentTime = date('d-m-Y::h:i:sa');

  $_SESSION['hostName'] = $hostName = $_POST['tempHostName'];
  $_SESSION['userName'] = $userName = $_POST['tempUserName'];
  $_SESSION['dbPassWord'] = $dbPassWord = $_POST['tempDbPassWord'];

  $conn = new mysqli($hostName, $userName, $dbPassWord);
  if ($conn->connect_error) {
    echo "false";
  } else {
    $_SESSION['accountInfo'] = "tempLogin";
    $_SESSION['userId'] = "";
    $_SESSION['accountType'] = "OWNER";
    $_SESSION['groupName'] = "G";
    $_SESSION['userType'] = 'TEMP LOGIN';
    $_SESSION['login'] = 1;
    $_SESSION['fullName'] = "USER";
    $_SESSION['lastLoginTime'] = $currentTime;
    echo "validTempCredential";
  }
} elseif (isset($_POST['logOut'])) {
  if (!isset($_SESSION['LAST_ACTIVITY'])) return;
  $logOutType = $_POST['logOutType'];

  if (strcmp($logOutType, "NATURAL") == 0) {
    // $sql = "UPDATE logindetails SET userStatus='Offline' WHERE userId=?";
    // $stmt = $poolConn->prepare($sql);
    // $stmt->bind_param('s', $_SESSION['userId']);
    // $stmt->execute();

    session_unset();
    session_destroy();

    echo 'true';
  } elseif (strcmp($logOutType, "AUTOMATIC") == 0) {
    if (time() - $_SESSION['LAST_ACTIVITY'] > 1800) {
      // $sql = "UPDATE logindetails SET userStatus='Offline' WHERE userId=?";
      // $stmt = $poolConn->prepare($sql);
      // $stmt->bind_param('s', $_SESSION['userId']);
      // $stmt->execute();

      session_unset();
      session_destroy();
      echo 'true';
    }
  }
}
