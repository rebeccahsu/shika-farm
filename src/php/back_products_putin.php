<?php

include("connection.php");

//取得資料
//透過php取得前端資料並解譯
$input_value = json_decode(file_get_contents("php://input"), true);
// 另新變數=資料內文
$state = $input_value['ID'];

       //---------------------------------------------------

       //建立SQL語法                             
       $sql = "SELECT * FROM PRODUCT ;" ;

       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $pdo->query($sql);

        //查詢執行結果筆數
       $resultCount = $statement -> rowCount();

       // 執行上面的設定
       $statement->execute();
       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();

           //根據執行結果筆數判斷是否執行成功並設定回應內容   || $resultCount2 > 0
       if ($resultCount > 0){
              $respBody['successful'] = true;
              $respBody['message'] = "成功載入";
              $respBody['data'] = (array) $data;
              echo json_encode($respBody);

       }else{
              $respBody['successful'] = false;
              $respBody['message'] = "unfinded data";
       }


?>