<?php

// include("connection.php");

//取得資料
//透過php取得前端資料並解譯
$input_value = json_decode(file_get_contents("php://input"), true);
// 另新變數=資料內文
$serch_value = $input_value['input_value'];
$serch_value2 = $input_value['input_value'];//多寫的



$db_host = "127.0.0.1";
$db_user = "root";
$db_pass = "password";
$db_select = "TFD105_G6";

$dsn = "mysql:host=".$db_host.";dbname=".$db_select;

$pdo = new PDO($dsn, $db_user, $db_pass);

       //---------------------------------------------------

       //建立SQL語法                             
       $sql = "SELECT * FROM PRODUCT WHERE ID LIKE '%$serch_value%' ;" ;

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
              $respBody['message'] = "T";
              $respBody['prd'] = (array) $data;
              echo json_encode($respBody);

       }else{
              $respBody['successful'] = false;
              $respBody['message'] = "unfinded data";
       }


?>