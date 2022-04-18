<?php
    include ("./connection.php");
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    $sql = 'select * from RESERVATION where ACTIVITY_ID = :actid';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":actid", $data["actid"]);
    $stmt->execute();
    $result = $stmt->fetchAll();
    
    echo json_encode($result);
?>