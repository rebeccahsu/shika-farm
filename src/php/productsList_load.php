<?php

include("./connection.php");

$sql = "SELECT * FROM PRODUCT where STATE='上架中'";

$stm = $pdo->query($sql);

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
    $resp["message"] = "sorry！好像有點怪怪的！";
    echo json_encode($resp);
}


?>