<?php

    include ("./connection.php");

    //取得資料
    //透過php取得前端資料並解譯
    $body = json_decode(file_get_contents("php://input"), true);
    // 另新變數=資料內文
    // $serch_value = $input_value['input_value'];

    $sql = "UPDATE TFD105_G6.order
    set LOGISTICS_STATE = '已取消'
    WHERE ID = :id;";

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $body["orderID"]);
    $stmt->execute();

?>