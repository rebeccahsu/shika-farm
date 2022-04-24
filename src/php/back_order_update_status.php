<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);

    $sql = 'UPDATE 'ORDER' SET LOGISTICS_STATE = :LOGISTICS_STATE WHERE ID = :id;';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $body["id"]);
    $stmt->bindValue(":LOGISTICS_STATE", $body["LOGISTICS_STATE"]);
    $stmt->execute();
    $order_new = $stmt->fetchAll();
    
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }
    
    echo json_encode($respBody);
?>