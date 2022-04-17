<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);
    
    // ==== 修改 ====

    $sql_modify = 'update ACTIVITY 
    set `NAME` = :name, `IMG` = :img, `OPACITY` = :opacity, `STATE` = :state, 
    `TIME` = :time, `S1_START` = :s1_start, `S1_END` = :s1_end, `S2_START`= :s2_start, `S2_END`= :s2_end, 
    `S3_START`= :s3_start, `S3_END`= :s3_end, `DESC`= :desc, `CATEGORY`= :category where ID = :id;';

    $stmt_modify = $pdo->prepare($sql_modify);
    $stmt_modify->bindValue(":id", $body["id"]);
    $stmt_modify->bindValue(":name", $body["name"]);
    $stmt_modify->bindValue(":img", $body["img"]);
    $stmt_modify->bindValue(":opacity", $body["opacity"]);
    $stmt_modify->bindValue(":state", $body["state"]);
    $stmt_modify->bindValue(":time", $body["time"]);
    $stmt_modify->bindValue(":s1_start", $body["s1_start"]);
    $stmt_modify->bindValue(":s1_end", $body["s1_end"]);
    $stmt_modify->bindValue(":s2_start", $body["s2_start"]);
    $stmt_modify->bindValue(":s2_end", $body["s2_end"]);
    $stmt_modify->bindValue(":s3_start", $body["s3_start"]);
    $stmt_modify->bindValue(":s3_end", $body["s3_end"]);
    $stmt_modify->bindValue(":desc", $body["desc"]);
    $stmt_modify->bindValue(":category", $body["category"]);
    $stmt_modify->execute();
    $activity_new = $stmt_modify->fetchAll();
    
    $resultCount = $stmt_modify->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }
    
    echo json_encode($respBody);
?>