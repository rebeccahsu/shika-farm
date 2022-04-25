<?php
    include ("./connection.php");
    
    $body = json_decode(file_get_contents("php://input"), true);

    // $sql = 'SELECT o.*, p.ID, p.IMG, p.NAME, m.*, od.QUANTITY, od.UNIT_PRICE
    // FROM ORDER_DETAIL od JOIN `ORDER` o
    // ON od.ORDER_ID = o.ID
    // JOIN PRODUCT p
    // ON od.PRODUCT_ID = p.ID
    // JOIN MEMBER m
    // ON m.ID = o.MEMBER_ID
    // WHERE o.ID = :id;';
    
    $sql = 'SELECT o.*, p.ID, p.MAIN_PIC, p.NAME,
             m.EMAIL, m.COUNTRY, m.DISTRICT, m.STREET,
             od.QUANTITY, od.UNIT_PRICE, od.ORDER_ID, od.PRODUCT_ID
            FROM ORDER_DETAIL od JOIN `ORDER` o
            ON od.ORDER_ID = o.ID
            JOIN PRODUCT p
            ON od.PRODUCT_ID = p.ID
            JOIN MEMBER m
            ON m.ID = o.MEMBER_ID
            WHERE o.ID = :id;';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $body["id"]);
    $stmt->execute();
    $result = $stmt->fetchAll();
    
    echo json_encode($result);
?>