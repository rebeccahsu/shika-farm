<?php

    include("connection.php");

    //取得資料
    //透過php取得前端資料並解譯
    $body = json_decode(file_get_contents("php://input"), true);

    //建立SQL語法                             
    $sql = "delete from ACTIVITY where ID =:ID;" ;

    //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    $statement = $pdo->prepare($sql);

    //查詢執行結果筆數
    $resultCount = $statement -> rowCount();
    $statement->bindValue(":ID", $body['ID']);
    // 執行上面的設定
    $statement->execute();

    $resultCount = $statement -> rowCount();
    
    if ($resultCount > 0) {
        $respBody["successful"] = true;
    } else {
        $respBody["successful"] = false;
    }
    
    echo json_encode($respBody);


?>