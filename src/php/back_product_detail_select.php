<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$id = $_POST["ID"];


// 檢查email存在
$sql2 = "SELECT * FROM PRODUCT where ID='$id'";
$stm = $pdo->query($sql2);

// query回傳成功找到的資料筆數
$res = $stm->rowCount();
$data = $stm->fetchAll();

if($res=1){
    $resp["successful"] =  true;
    $resp["data"] = $data;
    // $resp["NAME"] = $data[0]["NAME"];
    // $resp["ID"] = $data[0]["ID"];
    // $resp["COST"] = $data[0]["COST"];
    // $resp["PRICE"] = $data[0]["UNIT_PRICE"];
    // $resp["STATE"] = $data[0]["STATE"];
    // $resp["SLOGAN"] = $data[0]["SLOGAN"];
    // $resp["STOCK"] = $data[0]["STOCK"];
    // $resp["MAIN_PIC"] = $data[0]["MAIN_PIC"];
    // $resp["DESCRIPTION"] = $data[0]["DESCRIPTION"];
    // $resp["DETAIL"] = $data[0]["DETAIL"];
    // $resp["KIND"] = $data[0]["PRODUCT_CATEGORY_ID"];
    $resp["message"] = "找到商品";
    echo json_encode($resp);

}else{
    $resp["successful"] = false;
    $resp["message"] = "新增商品";
    echo json_encode($resp);

}



    

    ?>