<?php
     include ("./connection.php");

     //取得資料
     
     // 另新變數=資料內文
    //  $serch_value = $input_value['input_value'];
 
     $sql = "select * from MEMBER";
     $stmt = $pdo->prepare($sql);
     $stmt->execute();
     $result = $stmt->fetchAll(); //把結果放在二為陣列裡
     
     echo json_encode($result);
    //  $resultCount = $stmt->rowCount();
?>