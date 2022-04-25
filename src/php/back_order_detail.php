<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);
    
    $sql = 'SELECT od.QUANTITY, od.ORDER_ID , o.ID as o.ORDER_ID, o.RECEIVER_NAME, m.*, p.*
            FROM ORDER_DETAIL od JOIN ORDER o
            ON od.ORDER_ID = o.ID
            JOIN PRODUCT p
            ON od.PRODUCT_ID = p.ID
            JOIN MEMBER m
            ON m.NAME = o.RECEIVER_NAME
            ;

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $body["id"]);
    $stmt->execute();
    $result = $stmt->fetchAll();
    
    echo json_encode($result);
?>