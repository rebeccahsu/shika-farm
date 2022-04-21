<?php

 include("connection.php");   


//取得資料
//透過php取得前端資料並解譯
$_POST = json_decode(file_get_contents("php://input"), true);
// 另新變數=資料內文
$Mail = $_POST["Mail"];
$PWD = $_POST["Password"];


//---------------------------------------------------
// select 資料 where name=輸入的帳號  and 串接條件  PWD=輸入的密碼
$sql = "SELECT * FROM member where EMAIL= ? and PASSWORD = ? " ;
       //執行 -> 就是PHP 的.       exec執行鍵入$sql內的文字
    
               // 準備  封裝好先不執行
$statement = $pdo->prepare($sql);
// 過濾輸入的值   有幾的欄位就會濾幾次
$statement->bindValue( 1 ,$Mail);
$statement->bindValue( 2 ,$PWD);

// 執行
$statement->execute();

//抓出全部且依照順序封裝成一個二維陣列
$data = $statement->fetchAll();


// 實作中 不會讓使用者看到所有資料，而資料庫有PK，不會有重複，可以找資料>0筆
if(count($data) > 0){
   // 啟用Session  Session是在伺服器端建立，預設存在時間是30分鐘
   session_start();
   // 當同個瀏覽器有舊的PHPSESSID，就更新PHPSESSID等資料
   if ($_SESSION != null) {
      session_regenerate_id();
  }
   $_SESSION['ID'] = $data[0]["ID"];
   $_SESSION['NAME'] = $data[0]["NAME"];
   // $_SESSION['member'] = (array) $data;
   $_SESSION['successful'] = true;
   $_SESSION['message'] = '登入成功，歡迎回來';
   echo json_encode($_SESSION);  
   
}else{
   $_SESSION['ID'] = "";
   $_SESSION['NAME'] = "";
   // $_SESSION['member'] = "";
   $_SESSION['successful'] = false;
   $_SESSION['message'] = "帳號或密碼錯誤！";
   echo json_encode($_SESSION);

}


?>