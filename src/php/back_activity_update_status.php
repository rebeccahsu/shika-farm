<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);

    $sql = 'UPDATE ACTIVITY SET STATE = :state WHERE ID = :id;';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $body["id"]);
    $stmt->bindValue(":state", $body["state"]);
    $stmt->execute();
    $activity_new = $stmt->fetchAll();
    
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }
    
    echo json_encode($respBody);
?>