<?php
    include ("./connection.php");
    
    $checkout = json_decode(file_get_contents("php://input"), true);

    //建立SQL語法                             
    $SQL = '
        INSERT INTO `ORDER`
        (MEMBER_ID, ORDER_DATE, TOTAL, PAYMENT, PAYMENT_STATE, RECEIVER_ADDRESS, RECEIVER_NAME, RECEIVER_PHONE, LOGISTCS_STATE)
        VALUES
        (:name, :img, 0,  :opacity, :state, :time, :s1_start, :s1_end, :s2_start, :s2_end, :s3_start, :s3_end, :desc)
    ';




?>