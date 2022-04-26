<?php

include("connection.php");

//取得資料
//透過php取得前端資料並解譯
$input_value = json_decode(file_get_contents("php://input"), true);
// 另新變數=資料內文
$id = $input_value['ID'];

       //---------------------------------------------------

// 檢查ID存在
$sql2 = "SELECT PRODUCT_ID FROM ORDER_DETAIL where PRODUCT_ID=$id ;";
$stm = $pdo->query($sql2);
$fk_row = $stm-> rowCount();

if($fk_row == 0){
       //建立SQL語法                             
       $sql = "delete from PRODUCT where ID =:ID ;" ;

       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $pdo->prepare($sql);

              //查詢執行結果筆數
       $statement->bindValue(":ID", $id);
       $resultCount = $statement -> rowCount();
       // 執行上面的設定
       $statement->execute();

              //根據執行結果筆數判斷是否執行成功並設定回應內容   || $resultCount2 > 0
              // if ($resultCount > 0){
              $respBody['successful'] = true;
              $respBody['message'] = "刪除成功";
              $respBody['end'] = $statement -> rowCount();
              $respBody['id'] = $id;
              echo json_encode($respBody);
              
       }else{
              $respBody['successful'] = false;
              $respBody['message'] = "這個商品有訂單資料，不可以刪除";
              $respBody['id'] = $id;
              echo json_encode($respBody);
}


?>