<?php
require_once 'userDbConnection.php';

$conn1->begin_transaction();

// Use to see server errors
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

function getSqlStatementType($sqlQuery)
{
    $sqlType = '';
    $sqlQuery = trim($sqlQuery); // Remove any leading/trailing spaces
    $sqlStart = substr($sqlQuery, 0, 6); // Extract the first 6 characters of the query
    $sqlStart = strtoupper($sqlStart); // Convert to uppercase for case-insensitive comparison
    switch ($sqlStart) {
        case 'SELECT':
            $sqlType = 'SELECT';
            break;
        case 'INSERT':
            $sqlType = 'INSERT';
            break;
        case 'UPDATE':
            $sqlType = 'UPDATE';
            break;
        case 'DELETE':
            $sqlType = 'DELETE';
            break;
        case 'CREATE':
            $sqlType = 'CREATE';
            break;
        case 'ALTER':
            $sqlType = 'ALTER';
            break;
        case 'DROP T':
            $sqlType = 'DROP'; // DROP TABLE or DROP TRIGGER
            break;
        case 'TRUNCA':
            $sqlType = 'TRUNCATE';
            break;
        case 'GRANT ':
            $sqlType = 'GRANT';
            break;
        case 'REVOKE':
            $sqlType = 'REVOKE';
            break;
        default:
            $sqlType = 'UNKNOWN';
            break;
    }
    return $sqlType;
}

if (!function_exists('str_contains')) {
    function str_contains(string $haystack, string $needle): bool
    {
        return '' === $needle || false !== strpos($haystack, $needle);
    }
}

try {
    $masterTableName = [];
    $masterColumnName = [];
    $masterTableData = [];

    if (isset($_POST['flagForTableName'])) {
        $databaseName = $_POST['databaseName'];
        $_SESSION["dbName"] = $databaseName;

        $sql = "SELECT table_name, table_schema FROM information_schema.tables WHERE table_schema = ? ORDER BY table_name ASC;";
        $stmt = $conn1->prepare($sql);
        $stmt->bind_param('s', $databaseName);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($masterTableName, $row);
            }
        }
        echo json_encode($masterTableName);
    } elseif (isset($_POST['flagForColumnName'])) {
        $databaseName = $_POST['databaseName'];
        $tableName = $_POST['tableName'];

        $sql = "SELECT column_name FROM information_schema.columns WHERE table_schema = ? AND table_name = ?;";
        $stmt = $conn1->prepare($sql);
        $stmt->bind_param('ss', $databaseName, $tableName);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($masterColumnName, $row);
            }
        }
        echo json_encode($masterColumnName);
    } elseif (isset($_POST['flagForAllTableData'])) {
        $databaseName = $_POST['databaseName'];
        $tableName = $_POST['tableName'];
        $selectQuery = $_POST['selectQuery'];
        $tempQuery = $selectQuery;
        $tempArray = [];

        $stmt = $conn1->prepare($selectQuery);
        $stmt->execute();
        $result1 = $stmt->get_result();

        if ($result1 && $result1->num_rows > 0) {
            while ($row1 = $result1->fetch_assoc()) {
                array_push($masterTableData, $row1);
            }
        }

        if ($result1) {
            $sql = "SELECT column_name FROM information_schema.columns WHERE table_schema = ? AND table_name = ?;";
            $stmt = $conn1->prepare($sql);
            $stmt->bind_param('ss', $databaseName, $tableName);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($masterColumnName, $row);
                }
            }
            array_push($masterTableData, $masterColumnName);
            echo json_encode($masterTableData) . "%:%:%" . "";
        } else {
            echo json_encode($masterTableData) . "%:%:%" . $conn1->error;
        }
    } elseif (isset($_POST['flagForColumnInfo'])) {
        $databaseName = $_POST['databaseName'];
        $tableName = $_POST['tableName'];

        $sql = "SELECT column_name, column_type FROM information_schema.columns WHERE table_schema = ? AND table_name = ?;";
        $stmt = $conn1->prepare($sql);
        $stmt->bind_param('ss', $databaseName, $tableName);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                array_push($masterColumnName, $row);
            }
        }
        echo json_encode($masterColumnName);
    } elseif (isset($_POST['flagForRunQuery'])) {
        $sql = $_POST['currentQuery'];
        $lineNo = $_POST['lineNo'];
        $selectData = [];
        $columnName = [];
        $queryType = getSqlStatementType($sql);

        $queryInfo = $sql . '%:%:%' . $lineNo . '%:%:%';

        $stmt = $conn1->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $affectedRow = $conn1->affected_rows;
        error_log("================== This =======" . print_r($result, 1));

        $isError = false;

        if ($affectedRow) {
            $queryInfo = $queryInfo . 'true';
            //For Select and describe
            if ($result) {
                if (str_contains(strtoupper($sql), 'SELECT') || str_contains(strtoupper($sql), 'SHOW') || str_contains(strtoupper($sql), 'DESCRIBE')) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($selectData, $row);
                    }
                }
                $queryInfo = $queryInfo . "%:%:%" . json_encode($selectData);
            }else{
                $queryInfo = $queryInfo . "%:%:%" . $queryType;
            }
            
        } else {
            $isError = true;
            $queryInfo = $queryInfo . $conn1->error . "%:%:%";
        }
        $queryStatus = mysqli_info($conn1); // mysqli_info rerurns the status of the executed query

        $queryInfo = $queryInfo . ' %:%:%' . $affectedRow . ' %:%:%' . $queryStatus;

        $conn1->commit();
        echo $queryInfo;
    }
} catch (mysqli_sql_exception $exception) {
    $conn1->rollback();
    error_log("SQL Exception: " . $exception->getMessage());
    echo("SQL Exception: " . $exception->getMessage());
    // Optionally, include more specific error handling or user feedback here.
}

$conn1 = null;
