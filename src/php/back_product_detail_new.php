<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);

// 檢查ID
$sql2 = "SELECT ID FROM PRODUCT order by ID desc limit 1 ;";
$stm = $pdo->query($sql2);
$ID = $stm->fetchColumn()+1;

if($ID){
    $resp["successful"] = true;
    $resp["message"] = "成功";
    $resp["ID"] = $ID;

}else{
    $resp["successful"] = false;
    $resp["message"] = "失敗";
}

echo json_encode($resp);

?>