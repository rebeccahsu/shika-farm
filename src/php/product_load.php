<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$ID = $_POST["ID"];

// 檢查email存在
$sql2 = "SELECT * FROM PRODUCTS where ID='$ID' and STATE='上架中'";
$stm = $pdo->query($sql2);

// query回傳成功找到的資料筆數
$res = $stm->rowCount();
$data = $stm->fetchAll();

if($res>0){
    $resp["successful"] = true;
    $resp["message"] = "找到商品";
    $resp["data"] = $data;
    echo json_encode($resp);

}else{
    $resp["successful"] = false;
    $resp["message"] = "sorry！找不到此商品！";
    echo json_encode($resp);
}

?>