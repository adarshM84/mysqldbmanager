<?php
require_once 'userDbConnection.php';

if (isset($_SESSION["login"])) {
    if ($_SESSION["login"] > 0) {
        // header("Location:loginmessage.php");
        // exit;
    } else {
        header("Location:index.php");
        exit;
    }
} else {
    header("Location:index.php");
    exit;
}


if ($conn1->connect_error) {
    echo "false";
} else {
    // echo "true";
}

$masterTableName = [];
$masterDatabaseName = [];
$sql = "show databases";
$result = mysqli_query($conn1, $sql);

if (!empty($result) && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($masterDatabaseName, $row);
    }
}
require_once 'header.php';
require_once 'navbar.php';


?>


<body class='text-white' style="background:#0f5a88 !important;" onload='querboxEditableOrNot("<?php echo $_SESSION["userType"]; ?>")'>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <div id="modalDashboard">
        <div class="row">
        <!-- fa fa-arrow-circle-left -->
            <!-- Part 1 -->
            <div class="col-md-3 rigthHr" style="background-color: #023f56;">
                <div class="col-12 text-center">
                    <i id="dbBack" class="fa fa-arrow-left headIcon" onclick="loadDatabaseName()" hidden></i>
                     <button class="btn btn-primary text-center mb-2" style="margin-right: 2px !important;" id='databaseHeading'>SCHEMAS <i class="fa-solid fa-database" style="margin-left: 10px;color: greenyellow;"></i></button>
                     <i class="fa-solid fa-arrows-rotate headIcon" id="reloadTable" title="Reload Table" onclick="getTableName(document.getElementById('databaseHeading').name)"></i>
                    <div class="borderBottom mb-3"></div>
                </div>
                <div class="list-group resizeVertical" id='databaseList'>
                </div>
                <!-- Table List Div -->
                <div id="tableListDiv" hidden>
                    <div class="list-group resizeVertical" id='tableList'>
                    </div>

                    <!-- Table Column Info Div -->
                    <div class="list-group resizeVertical" id="tableInfoDiv" hidden>
                        <p class="text-center my-3 borderTop">TABLE INFO</p>
                        <div class="row">
                            <div class="col-6">TABLE NAME :</div>
                            <div class="col-6 lightGreen" id='tableInfoHeading'></div>
                            <p class="text-left">COLUMNS</p>
                        </div>
                        <!-- Info Table -->
                        <div class="list-group verticalScroll" id="tableInfo">
                        </div>
                        <!-- Info Table End-->
                    </div>
                    <!-- Table Column Info Div -->
                </div>
                <div id="loadingTableInfoMessage" hidden>
                    <div style="display: flex;justify-content: center;">
                        <h6 class="text-white mt-5">Loading Data.Please Wait.....</h6>
                        <div class="spinner-border text-primary" role="status" style="margin-top: 12%;margin-left: 1%;">
                        </div>
                    </div>
                </div>
                <!-- Table List Div End -->

            </div>
            <!-- Par 2 -->
            <div class="col-md-9 text-white" id="part2">
                <!-- Query Box -->
                <div class="row">
                    <div class="col-11 p-3">
                        <div class="textarea-wrapper">
                            <textarea name="queryBoxName" id="queryInputBox" class="textareaBackground" spellcheck="false" cols="30" rows="10" style="width: 98%;margin: 4px;"></textarea>
                        </div>
                    </div>

                    <div class="col-1"> <i id="playButtonIcon" class="fa-solid fa-play playButton" title="Run" onclick="runQuery()"></i>
                        <div class="spinner-border text-success playButton" id="playSpinnerIcon" title="Running" role="status" hidden></div>
                    </div>

                </div>
                <!-- Query Box End -->

                <!-- Loading Message -->
                <div class="col-md-12">
                    <div style="display: flex;justify-content: center;" id="loadingMessageDiv" hidden>
                        <h4 class="text-white mt-5" id="loadingTableMessage"></h4>
                        <div class="spinner-border text-primary" role="status" style="margin-top: 45px;margin-left: 1%;">
                        </div>
                    </div>
                </div>
                <!-- loading Message End -->

                <!-- Table for view of Data -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="list-group allScroll resizeBoth" id="showTableDataDiv" style="width: 90% !important;margin: 8px !important;" hidden>
                            <div>
                                <!-- for filter and more option on table -->
                                <div class="row">
                                    <div class="col-9">
                                        <input type="text" id="filterInput" class="searchInput" onkeyup="filterTableData('showTableData','filterInput')" placeholder="Search for data.." title="Type a value">
                                    </div>
                                    <div class="col-1">
                                        <i class="fa-solid fa-file-csv" id="excelIcon" title="Click Here to Download Data In CSV Format"></i>
                                    </div>
                                    <div class="col-1"></div>
                                    <div class="col-1">
                                        <i class="fa-solid fa-file-code" id="sqlIcon" title="Click Here to Download Data In Sql Format"></i>
                                        <!-- <i class="fa-solid fa-file-pdf" id="pdfIcon" title="Click Here to Download Data In PDF Format"></i> -->
                                    </div>
                                </div>
                                <!-- for filter and more option on table End-->

                            </div>
                            <table id="showTableData" style="width: 98% !important;margin: 8px !important;" class="table table-success table-striped table-hover">
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Table for view of Data End -->

                <!-- Table for status output of query -->
                <div class="row p-2">
                    <div class="col-md-12">
                        <p class="p-2 tableParaHeading">Query Status Output</p>
                        <div class="list-group allScroll resizeBoth" id="queryStatusTableDiv" style="width: 90% !important;margin: 8px !important;">
                            <table id="queryStatusTable" class="table table-secondary table-striped table-hover">
                                <thead>
                                    <th>#</th>
                                    <th>Sr.</th>
                                    <th>Time</th>
                                    <th>Query</th>
                                    <th>Message</th>
                                </thead>
                                <tbody id="queryStatusTableBody">

                                </tbody>
                                <!-- <i class="fa-solid fa-check"></i> -->
                                <!-- <i class="fa-solid fa-x"></i> -->
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Table for status output of query end-->

            </div>
        </div>
    </div>
    <!-- <i class="fa-solid fa-file-excel"></i> -->
</body>

<!-- for html to pdf cdn -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.debug.js"></script>

<script src="js/convertJsonToCsv.js?v=<?php echo rand(); ?>"></script>
<script src="js/convertJsonToSql.js?v=<?php echo rand(); ?>"></script>
<script src="js/dashboard.js?v=<?php echo rand(); ?>"></script>
<!-- for html to pdf cdn -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js"></script> -->


<script>
    hostName = <?php echo json_encode($_SESSION['hostName']); ?>;
    masterDataBase = <?php echo json_encode($masterDatabaseName); ?>;
    masterTableName = <?php echo json_encode($masterTableName); ?>;
    $(document).ready(function() {
        document.getElementById('loadingMessage').hidden = true;
        loadDatabaseName();
    });

</script>

</html>