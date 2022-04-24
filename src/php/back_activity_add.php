<?php
    include ("./connection.php");
    
    $activity = json_decode(file_get_contents("php://input"), true);
    // echo json_encode($activity);

    $SQL = '
        INSERT INTO `ACTIVITY`
        (`NAME`, `IMG`, `OPACITY`, `STATE`, `TIME`, `S1_START`, `S1_END`, `S2_START`, `S2_END`, `S3_START`, `S3_END`, `DESC`, `CATEGORY_ID`)
        VALUES
        (:name, :img, :opacity, :state, :time, :s1_start, :s1_end, :s2_start, :s2_end, :s3_start, :s3_end, :desc, :categoryId)
    ';
    $stmt = $pdo->prepare($SQL);
    $stmt->bindValue(":name", $activity["name"]);
    $stmt->bindValue(":img", $activity["img"]);
    $stmt->bindValue(":opacity", $activity["opacity"]);
    $stmt->bindValue(":state", $activity["state"]);
    $stmt->bindValue(":time", $activity["time"]);
    $stmt->bindValue(":s1_start", $activity["s1_start"]);
    $stmt->bindValue(":s1_end", $activity["s1_end"]);
    $stmt->bindValue(":s2_start", $activity["s2_start"]);
    $stmt->bindValue(":s2_end", $activity["s2_end"]);
    $stmt->bindValue(":s3_start", $activity["s3_start"]);
    $stmt->bindValue(":s3_end", $activity["s3_end"]);
    $stmt->bindValue(":desc", $activity["desc"]);
    $stmt->bindValue(":categoryId", $activity["categoryId"]);
    $stmt->execute();
    
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }
    
    echo json_encode($respBody);
?>