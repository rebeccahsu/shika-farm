<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);
    
    $sql = "SELECT * FROM NEWS;";

    $stmt = $pdo->prepare($sql);
    // $stmt->bindValue(":id", $body["id"]);
    $stmt->execute();
    $result = $stmt->fetchAll();
    
    
    echo json_encode($result);
?>