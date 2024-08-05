<?php
if (session_id() == '') {
    session_start();
}

try {
    if (isset($_POST['flagForDbBackUp'])) {
        $dbhost = $_SESSION["hostName"];
        $dbuser = $_SESSION["userName"];
        $dbpass = $_SESSION["dbPassWord"];
        $dbname = $_SESSION["dbName"];
        $connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

        if ($connection->connect_error) {
            echo "Server Error.Reload Page Again....Backup Error";
            exit();
        }

        $backupAlert = '';
        $tables = array();
        $result = $connection->query("SHOW TABLES");

        if (!$result) {
            $backupAlert = 'Error found.<br/>ERROR : ' . $connection->error . 'ERROR NO :' . $connection->errno;
        } else {
            while ($row = $result->fetch_row()) {
                $tables[] = $row[0];
            }
            $result->free();

            $return = '';
            foreach ($tables as $table) {
                // Validate table name
                if (!preg_match('/^[a-zA-Z0-9_]+$/', $table)) {
                    continue; // Skip invalid table names
                }

                $stmt = $connection->prepare("SELECT * FROM `$table`");
                $stmt->execute();
                $result = $stmt->get_result();

                if (!$result) {
                    $backupAlert = 'Error found.<br/>ERROR : ' . $connection->error . 'ERROR NO :' . $connection->errno;
                } else {
                    $num_fields = $result->field_count;

                    $return .= 'DROP TABLE `' . $table . '`;';
                    $stmt2 = $connection->prepare("SHOW CREATE TABLE `$table`");
                    $stmt2->execute();
                    $result2 = $stmt2->get_result();
                    $row2 = $result2->fetch_row();

                    if (!$row2) {
                        $backupAlert = 'Error found.<br/>ERROR : ' . $connection->error . 'ERROR NO :' . $connection->errno;
                    } else {
                        $return .= "\n\n" . $row2[1] . ";\n\n";
                        for ($i = 0; $i < $num_fields; $i++) {
                            while ($row = $result->fetch_row()) {
                                $return .= 'INSERT INTO `' . $table . '` VALUES(';
                                for ($j = 0; $j < $num_fields; $j++) {
                                    $row[$j] = addslashes($row[$j]);
                                    if (isset($row[$j])) {
                                        $return .= '"' . $row[$j] . '"';
                                    } else {
                                        $return .= '""';
                                    }
                                    if ($j < $num_fields - 1) {
                                        $return .= ',';
                                    }
                                }
                                $return .= ");\n";
                            }
                        }
                        $return .= "\n\n\n";
                    }

                    $stmt2->close();
                }

                $stmt->close();
            }

            $backup_file = "tempDBFile/" . $dbname . '.sql';
            if (file_exists($backup_file)) {
                unlink($backup_file);
            }
            $handle = fopen($backup_file, 'w+');
            fwrite($handle, $return);
            fclose($handle);

            $backupAlert = 'Successfully got the backup!';
        }
        echo $backupAlert;
    } elseif (isset($_POST["flagForDeleteFile"])) {
        $filePath = $_POST['filePath'];
        if (file_exists($filePath)) {
            echo 'called1 ';
            unlink($filePath);
        }
        echo 'called';
    } elseif (isset($_SESSION["dbName"])) {
        $hostName = $_SESSION["hostName"];
        $userName = $_SESSION["userName"];
        $dbPassWord = $_SESSION["dbPassWord"];
        if (isset($_POST['databaseName'])) {
            $_SESSION["dbName"] = $_POST['databaseName'];
        }
        $db = $_SESSION["dbName"];

        $conn1 = new mysqli($hostName, $userName, $dbPassWord, $db);
        if ($conn1->connect_error) {
            echo "Server Error.Reload Page Again....Db Connection Error";
            exit();
        }
    } else {
        $hostName = $_SESSION["hostName"];
        $userName = $_SESSION["userName"];
        $dbPassWord = $_SESSION["dbPassWord"];

        $conn1 = new mysqli($hostName, $userName, $dbPassWord);
        if ($conn1->connect_error) {
            echo "Error";
            die();
        }
    }
} catch (Exception $e) {
    echo "error userdb";
    header("Refresh:0");
    return;
}
?>
