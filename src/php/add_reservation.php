<?php
    include ("./connection.php");
    
    session_start();  //提取會員資料
    
    $reservation= json_decode(file_get_contents("php://input"), true);

    $SQL = '
        INSERT INTO `RESERVATION`
        (`ACTIVITY_ID`, `MEMBER_ID`, `DATE`, `SESSION`, `ATTENDANCE`, `UPDATE_TIME`)
        VALUES
        (:activity_ID, :MEMBER_ID, :date, :session, :attendance, NOW())
    ';
    $stmt = $pdo->prepare($SQL);
    //$stmt->bindValue(":ID", $reservation["ID"]); //此為預約資料表自動產生的AI 不給值
    $stmt->bindValue(":activity_ID", $reservation["ACTIVITY_ID"]);
    $stmt->bindValue(":MEMBER_ID", $_SESSION["ID"]);  //MEMBER_ID 不確定要不要放進來跟怎麼放 在html裡也沒有給他name及v-model
    $stmt->bindValue(":date", $reservation["DATE"]);
    $stmt->bindValue(":session", $reservation["SESSION"]);
    $stmt->bindValue(":attendance", $reservation["ATTENDANCE"]);
    // $stmt->bindValuue(":NOW()", $reservation["UPDATE_TIME"]); //UPDATE_TIME 不確定要不要放進來跟怎麼放 在html裡也沒有給他name及v-model
    $stmt->execute();
    
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }

    echo json_encode($respBody);
?>