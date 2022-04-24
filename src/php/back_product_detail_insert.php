<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
// $ID = $_POST["ID"];
$MAIN_PIC = $_POST["topImg"];
$NAME = $_POST["NAME"];
$COST = $_POST["COST"];
$PRICE = $_POST["PRICE"];
$STOCK = $_POST["STOCK"];
$KIND = $_POST["KIND"];
$SLOGAN = $_POST["SLOGAN"];
$DETAIL = $_POST["DETAIL"];
$DESCRIPTION = json_encode($_POST["INTRO"]);


// 檢查ID存在
$sql2 = "SELECT ID FROM PRODUCT order by ID desc limit 1 ;";
$stm = $pdo->query($sql2);
$ID = $stm->fetchColumn()+1;


// 輸入資料
$sql = "INSERT into PRODUCT( NAME, COST, UNIT_PRICE, STOCK, PRODUCT_CATEGORY_ID,
 STATE, MAIN_PIC, SLOGAN, DETAIL, DESCRIPTION ) 
 VALUES ( ?, ?, ?, ?, ?, '未上架', ?, ?, ? ,? );";
    
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1,"$NAME");
    $statement->bindValue(2,"$COST");
    $statement->bindValue(3,"$PRICE");
    $statement->bindValue(4,"$STOCK");
    $statement->bindValue(5, $KIND);
    $statement->bindValue(6, "$MAIN_PIC");
    $statement->bindValue(7,"$SLOGAN");
    $statement->bindValue(8, $DETAIL);
    $statement->bindValue(9,"$DESCRIPTION");
    
    $statement->execute();
    $res = $statement->rowCount();

if($res>0){
    $resp["successful"] = true;
    $resp["message"] = "新增成功";
    $resp["ID"] = $ID;
    echo json_encode($resp);

}else{
    $resp["successful"] = false;
    $resp["message"] = "新增失敗";
    echo json_encode($resp);

}


// echo json_encode($_POST);
//print_r($_POST);


?>