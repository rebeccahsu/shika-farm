<?php
    include ("./connection.php");
    
    $checkout = json_decode(file_get_contents("php://input"), true);

    //建立SQL語法                             
    $SQL = '
        INSERT INTO `ORDER`
        (MEMBER_ID, ORDER_DATE, TOTAL, PAYMENT, PAYMENT_STATE, RECEIVER_ADDRESS, RECEIVER_NAME, RECEIVER_PHONE, LOGISTCS_STATE)
        VALUES
        (:id, :Now(), :total, :, :state, :)
    ';




?>