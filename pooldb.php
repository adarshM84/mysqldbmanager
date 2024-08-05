<?php
//Localhost
$hostName='localhost';
$userName='root';
$dbPassWord='pass';
$db='mysqleditor';

try {
  $poolConn = mysqli_connect($hostName, $userName, $dbPassWord, $db);
  if (mysqli_connect_error()) {
    // echo mysqli_connect_error();
    echo "Server Error.Refresh the page..";
    // header("Refresh:0");
    exit();
  } else {
    // echo "true";
  }
}catch( Exception $e ) {
  echo "error";
  header("Refresh:0");
  return;    
}