<?php
     include ("./connection.php");

     //取得資料
     //透過php取得前端資料並解譯
     $body = json_decode(file_get_contents("php://input"), true);
     // 另新變數=資料內文
    //  $serch_value = $input_value['input_value'];
 
     $sql = "SELECT TFD105_G6.ORDER_DETAIL.* , TFD105_G6.PRODUCT.NAME FROM TFD105_G6.ORDER_DETAIL
     left join TFD105_G6.PRODUCT on TFD105_G6.ORDER_DETAIL.PRODUCT_ID = TFD105_G6.PRODUCT.ID
     where ORDER_ID = :id;";
     $stmt = $pdo->prepare($sql);
     $stmt->bindValue(":id", $body["orderID"]);
     $stmt->execute();
     $result = $stmt->fetchAll(); //把結果放在二為陣列裡
     
     echo json_encode($result);
    //  $resultCount = $stmt->rowCount();
    
?>