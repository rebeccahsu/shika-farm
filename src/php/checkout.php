<?php
    include ("./connection.php");
    
    $checkout = json_decode(file_get_contents("php://input"), true);
    // print_r($checkout);
    //建立SQL語法                             
     $SQL = "
         INSERT INTO `ORDER`
           (MEMBER_ID, ORDER_DATE, TOTAL, PAYMENT, PAYMENT_STATE, RECEIVER_ADDRESS, RECEIVER_NAME, RECEIVER_PHONE, LOGISTICS_STATE)
         VALUES
           (
               :id
               , DATE(NOW())
               , :total
               , CASE :payment WHEN 'card' THEN '信用卡' WHEN 'arrival' THEN '貨到付款' END
               , CASE :payment WHEN 'card' THEN '已付款' WHEN 'arrival' THEN '未付款' END
               , :address
               , :name
               , :phone
               , '未送達'
            )
    ";

    $stmt = $pdo->prepare($SQL);
    $stmt->bindValue(":id", $checkout["memberid"]);
    $stmt->bindValue(":total", $checkout["total"]);
    $stmt->bindValue(":payment", $checkout["payment"]);
    $stmt->bindValue(":address", $checkout["address"]);
    $stmt->bindValue(":name", $checkout["name"]);
    $stmt->bindValue(":phone", $checkout["phone"]);
    $stmt->execute();
    $orderId = $pdo->lastInsertId();

    // print_r($orderId);

    $detail = $checkout['detail'];
    $SQL = "
    INSERT INTO `ORDER_DETAIL`
        (PRODUCT_ID, ORDER_ID, QUANTITY, UNIT_PRICE)
    VALUES
    ";
    for($x = 0; $x < count($detail); $x++){
        // print_r($detail);
        if($x > 0){
            $SQL .= ",";
        }
        $SQL .= " ('". $detail[$x]["id"] ."', '". $orderId ."', '". $detail[$x]["count"] ."', '". $detail[$x]["price"] ."')";
    }

    $stmt = $pdo->prepare($SQL);
    $stmt->execute();
    echo json_encode($orderId);
?>