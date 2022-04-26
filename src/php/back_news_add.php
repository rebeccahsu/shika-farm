<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);

    // ALTER TABLE `NEWS` CHANGE COLUMN `ID` `ID` INT NOT NULL AUTO_INCREMENT ;
    $sql = '
        INSERT INTO `NEWS`
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