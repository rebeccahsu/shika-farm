<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);
    
    $sql = 'SELECT m.ID AS M_ID, m.NAME, r.*, a.OPACITY
            FROM MEMBER m JOIN RESERVATION r
            ON m.ID = r.MEMBER_ID
            JOIN ACTIVITY a
            ON r.ACTIVITY_ID = a.ID
            WHERE r.ACTIVITY_ID = :actid';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":actid", $body["activityId"]);
    $stmt->execute();
    $result = $stmt->fetchAll();
    
    echo json_encode($result);
?>