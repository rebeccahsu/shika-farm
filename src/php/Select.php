<?php

// include("connection.php");

$db_host = "127.0.0.1";
$db_user = "root";
$db_pass = "password";
$db_select = "TFD105_G6";

$dsn = "mysql:host=".$db_host.";dbname=".$db_select;

$pdo = new PDO($dsn, $db_user, $db_pass);

       //---------------------------------------------------

       //建立SQL語法                             // 控制印出順序
       $sql = "SELECT * FROM PRODUCT WHERE ID LIKE '%2%' ;" ;


       //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
       $statement = $pdo->query($sql);


       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();

       
       // echo json_encode($data)  //印出所有的資料
       // 用迴圈依照欄位名稱印出資料
       foreach($data as $index => $row){
	       echo $row["ID"];   //欄位名稱
	       echo " / ";
	       echo $row["NAME"];    //欄位名稱
	       echo " / ";
	       echo $row["COST"];    //欄位名稱
              echo " / ";
	       echo $row["UNIT_PRICE"];
              echo " / ";
	       echo $row["STOCK"];
              echo " / ";
	       echo $row["PRODUCT_CATEGORY_ID"];
              echo " / ";
	       echo $row["STATE"];
              echo " / ";
	       echo $row["UPDATE"];
              echo " / ";
	       echo $row["MAIN_PIC"];
              echo " / ";
	       echo $row["SLOGAN"];
              echo " / ";
	       echo $row["DETAIL"];
              echo " / ";
	       echo $row["DESCRIPTION"];
              echo "<br/>";	       
       }

/*
       //將二維陣列取出顯示其值
       foreach($data as $index => $row){
	       echo $row["Name"];   //欄位名稱
	       echo " / ";
	       echo $row["PWD"];    //欄位名稱
	       echo " / ";
	       echo $row["CreateDate"];    //欄位名稱
              echo "<br/>";	       
       }
*/

?>