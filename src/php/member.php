<?php
     include ("./connection.php");

     //取得資料
     //透過php取得前端資料並解譯
    //  $body = json_decode(file_get_contents("php://input"), true);
     // 另新變數=資料內文
    //  $serch_value = $input_value['input_value'];
    
    $id=$_POST['id'];

     $sql = "SELECT * FROM TFD105_G6.MEMBER where EMAIL='$id'";
    //  $stmt = $pdo->prepare($sql);
    //  $stmt->bindValue(":id", $body["id"]);
    $stmt = $pdo->query($sql);
    //  $stmt->execute();
     $result = $stmt->fetchAll(); //把結果放在二為陣列裡
     
     echo json_encode($result);
    //  $resultCount = $stmt->rowCount();
?>
