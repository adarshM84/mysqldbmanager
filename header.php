<?php
// print_r($currentPage);
$clientName = "MYSQL QUERY EDITOR - MADE BY ADARSH SIDDHARTHSHANKAR MISHRA";
$desc = "This Website is Made by ADARSH SIDDHARTHSHANKAR MISHRA.";

$currentPage = htmlspecialchars(basename($_SERVER['PHP_SELF']));

logoutDetetection($currentPage);

switch ($currentPage) {
  case 'index.php':
    $keywords = 'MYSQL QUERY EDITOR';
    $title = 'Login - ' . $clientName;
    $description = $desc;
    break;

  case 'tempLogin.php':
    $keywords = 'MYSQL QUERY EDITOR';
    $title = 'Temp Login - ' . $clientName;
    $description = $desc;
    break;

  case 'dashboard.php':
    $keywords = 'MYSQL QUERY EDITOR';
    $title = 'Home - ' . $clientName;
    $description = $desc;
    break;


  default:
    if (strpos(htmlspecialchars($_SERVER['PHP_SELF']), 'about.php')) {
      $keywords = 'MYSQL QUERY EDITOR';
      $title = 'DASHBOARD';
      $description = $desc;
      break;
    }
    break;
}

function logoutDetetection($pageName)
{
  if (strcmp($pageName, "createDatabaseAccount.php") == 0 || strcmp($pageName, "tempLogin.php") == 0) {
    // echo "Not check return;";
    //if page is not that then update LAST_ACTIVITY time
    return;
  } else
    $_SESSION['LAST_ACTIVITY'] = time();
  if (session_id() == '') {
    session_start();
  }

  if (isset($_SESSION['login']) && isset($_SESSION['LAST_ACTIVITY'])) {

    if (time() - $_SESSION['LAST_ACTIVITY'] > 1800) {
      // last request was more than 30 minutes ago since diff is 1800
      session_unset(); // unset $_SESSION variable for the run-time 
      session_destroy(); // destroy session data in storage
      // echo"<script>alert('Your session is expired login again')</script>";
      header("Location:index.php");
      // echo "log out";
    } else {
      $_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp
    }

  }
}
?>


<!doctype html>
<html lang="en">

<head>

  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
    crossorigin="anonymous"></script>

  <!-- jquery link -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <!-- font awesom -->
  <script src="https://use.fontawesome.com/ed481f8158.js"></script>
  <script src="https://kit.fontawesome.com/f19617ca8d.js" crossorigin="anonymous"></script>

  <title>
    <?php echo $title ?>
  </title>
  <meta name="keywords" content="<?php echo $keywords ?>" />
  <meta name="description" content="<?php echo $description ?>">
  <link rel="stylesheet" href="css/style.css?v=<?php echo rand(); ?>">
  <link rel="shortcut icon" href="images/logo.png" type="image/x-icon">


  <!-- we can call another function of another js file but we have to load tha file before  -->
  <script src="js/commonCode.js?v=<?php echo rand(); ?>"></script>
  <script src="js/index.js?v=<?php echo rand(); ?>"></script>

  <!-- <link rel="shortcut icon" href="../images/fevicon.ico" type="image/x-icon"> -->
</head>
<div id="loadingMessage">
  <div class="row">
    <div class="col-12 text-center">
      <h1 class="text-white mt-5">Loading.Please Wait.....
        <span>
          <div class="spinner-border text-primary" role="status">
        </span>
      </h1>
    </div>
  </div>
</div>
</div>