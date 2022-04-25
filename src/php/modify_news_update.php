<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);
    
    // ==== 修改 ====

    $sql = 'UPDATE `NEWS`
    SET `TITLE` = :title, `DESCRIPTION` = :descr, `IMG` = :img
    WHERE `ID` = :id;';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $body["id"]);
    $stmt->bindValue(":title", $body["title"]);
    $stmt->bindValue(":descr", $body["desc"]);
    $stmt->bindValue(":img", $body["img"]);
    $stmt->execute();
    // $result = $stmt->fetchAll();
    
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }
    
    echo json_encode($respBody);
?>