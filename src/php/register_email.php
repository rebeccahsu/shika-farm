<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$mail = $_POST["EMAIL"];
$pwd = $_POST["PASSWORD"];

// 檢查email存在
$sql2 = "SELECT * FROM MEMBER where EMAIL='$mail'";
$stm = $pdo->query($sql2);

// query回傳成功找到的資料筆數
$res = $stm->rowCount();
$data = $stm->fetchAll();

if($res>0){
    $resp["successful"] = false;
    $resp["message"] = "此e-mail已註冊過";
    echo json_encode($resp);

}else{
    $resp["successful"] = true;
    $resp["message"] = "此e-mail可以使用";
    echo json_encode($resp);

}



    

    ?>