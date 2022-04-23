<?php
    include ("./connection.php");
    
    session_strat();  //提取會員資料
    
    $reservation= json_decode(file_get_contents("php://input"), true);

    $SQL = '
        INSERT INTO `TFD105_G6`.`RESERVATION`
        (`ID`, `ACTIVITY_ID`, `MEMBER_ID`, `DATE`, `SESSION`, `ATTENDANCE`, `UPDATE_TIME`)
        VALUES
        (:name, :img, 0,  :opacity, :state, :time, :s1_start,)
    ';
    $stmt = $pdo->prepare($SQL);
    $stmt->bindValue(":ID", $reservation["ID"]);
    $stmt->bindValue(":ACTIVITY_ID", $reservation["ACTIVITY_ID"]);
    $stmt->bindValue(":MEMBER_ID", $reservation["$_SESSION['ID']"]);  //$_SESSION["ID"]
    $stmt->bindValue(":DATE", $reservation["DATE"]);
    $stmt->bindValue(":SESSION", $reservation["SESSION"]);
    $stmt->bindValue(":ATTENDANCE", $reservation["ATTENDANCE"]);
    $stmt->bindValue(":UPDATE_TIME", $reservation["UPDATE_TIME"]);
    $stmt->execute();
    
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }

    echo json_encode($respBody);
?>