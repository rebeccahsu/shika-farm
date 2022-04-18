<?php

include("connection.php");

//取得資料
//透過php取得前端資料並解譯
$input_value = json_decode(file_get_contents("php://input"), true);
// 另新變數=資料內文
$id = $input_value['ID'];

       //---------------------------------------------------

       //建立SQL語法                             
       $sql = "UPDATE PRODUCT set STATE='上架中' where ID =:ID ;" ;

       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $pdo->prepare($sql);

        //查詢執行結果筆數
       $resultCount = $statement -> rowCount();
       $statement->bindValue(":ID", $id);
       // 執行上面的設定
       $statement->execute();

           //根據執行結果筆數判斷是否執行成功並設定回應內容   || $resultCount2 > 0
       if ($resultCount=1){
              $respBody['successful'] = true;
              $respBody['message'] = "修改成功";
              $respBody['end'] = $statement->rowCount();
              $respBody['id'] = $id;
              echo json_encode($respBody);

       }else{
              $respBody['successful'] = false;
              $respBody['message'] = "修改失敗";
              $respBody['end'] = $statement->rowCount();
              $respBody['id'] = $id;
              echo json_encode($respBody);
       }


?>