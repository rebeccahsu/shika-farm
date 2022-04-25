<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);

    $sql = '
        INSERT INTO `TFD105_G6`.`NEWS`
        (`ADMIN_ID`, `TITLE`, `DESCRIPTION`, `DATE`, `IMG`)
        VALUES
        (1, :title, :desc, curdate(), :img);
    ';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":title", $body["title"]);
    $stmt->bindValue(":img", $body["img"]);
    $stmt->bindValue(":desc", $body["desc"]);
    $stmt->execute();
    
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }
    
    echo json_encode($respBody);
?>