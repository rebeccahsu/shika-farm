<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);
    
    $sql = 'select * from NEWS where ID = :id';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $body["id"]);
    $stmt->execute();
    $news = $stmt->fetchAll();
    
    echo json_encode($news);
?>