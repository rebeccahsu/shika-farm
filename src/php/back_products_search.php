<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$keyWord = $_POST["keyWord"];


// 檢查email存在
$sql2 = "select distinct * from PRODUCT where NAME like '%$keyWord%' or  ID like '%$keyWord%';";
$stm = $pdo->query($sql2);

// query回傳成功找到的資料筆數
$res = $stm->rowCount();
$data = $stm->fetchAll();

if($res>0){
    $resp["successful"] =  true;
    $resp["data"] = $data;
    $resp["message"] = "找到商品";
    $resp["end"] = $res;
    echo json_encode($resp);

}else{
    $resp["successful"] = false;
    $resp["message"] = "找不到商品";
    echo json_encode($resp);

}


?>