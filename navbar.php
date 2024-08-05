<section id="nav">
    <div class="navLeft">
        <a href="dashboard.php" class="navIconcss">
            <h1>Dashboard</h1>
        </a>
    </div>
    <div class="search">
        <div class="alert alert-white alert-dismissible fade show" role="alert" style="margin:0px !important;color:black !important;">
            <strong><i>WELCOME </strong><?php echo "<i>".strtoupper($_SESSION['fullName'])."</i>"; ?> </i></strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <div class="navRight">
        <div class="menu" onclick="toggle()">
            <span class="bar b1"></span>
            <span class="bar b2"></span>
            <span class="bar b3"></span>
        </div>

        <ul id="navList">
            <?php
            if ($_SESSION['accountInfo'] != "tempLogin"){
                echo '<li><a href="myProfile.php" class="navIconcss" title="My Account"><i class="fa-solid fa-user"></i><span>My Account</span></a></li>';
            }
            ?>
            <li><a href="#" class="navIconcss" title="Log Out" onclick="logOut('NATURAL')"><i class="fa-solid fa-right-from-bracket"></i><span>LOG OUT</span></a></li>
        </ul>
    </div>
</section>