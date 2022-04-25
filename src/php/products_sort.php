<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$KIND = $_POST["KIND"];
$order = $_POST["order"];

if($order == ""){
    $sql = "SELECT * FROM PRODUCT where STATE='上架中' and PRODUCT_CATEGORY_ID like ?  order by ID DESC;";
    $stm = $pdo->prepare($sql);
    $stm->bindValue(1,$KIND);

}else if($order == "DESC"){
    $sql = "SELECT * FROM PRODUCT where STATE='上架中' and PRODUCT_CATEGORY_ID like ? order by UNIT_PRICE DESC ;";
    $stm = $pdo->prepare($sql);
    $stm->bindValue(1,"$KIND");

}else if($order == "ASC"){
    $sql = "SELECT * FROM PRODUCT where STATE='上架中' and PRODUCT_CATEGORY_ID like ? order by UNIT_PRICE ASC ;";
    $stm = $pdo->prepare($sql);
    $stm->bindValue(1,"$KIND");

};


// 執行上面封裝的sql
$stm->execute();

// 回傳成功找到的資料筆數
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
    $resp["order"] = $order;
    echo json_encode($resp);
}


?>