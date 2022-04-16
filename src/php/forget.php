<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$mail = $_POST["EMAIL"];

// 檢查email存在
$sql2 = "SELECT * FROM member where EMAIL= '$mail' ";
$stm = $pdo->query($sql2);
$stm->execute();
// query回傳成功找到的資料筆數
$res = $stm->rowCount();
$data = $stm->fetchAll();

if($res >0 ){
    // echo "pwq";
    // 產生45字的亂碼
    $Strings = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $TOKEN_str = substr(str_shuffle($Strings), 0, 45);
    $sql = "UPDATE MEMBER set TOKEN=:TOKEN_str where EMAIL=:EMAIL";
    
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":TOKEN_str","$TOKEN_str");
    $statement->bindValue(":EMAIL","$mail");

    $statement->execute();
    $resultCount = $statement->rowCount();
    
    
    // echo json_encode($TOKEN_str);
    
    if(($resultCount) > 0){
        $resp["TOKEN_str"] = $TOKEN_str;
        $resp["successful"] = true;
        $resp["NAME"] = $data[0]["NAME"];
        echo json_encode($resp);
    
    }else{
        $resp["TOKEN_str"] = $TOKEN_str;
        $resp["successful"] = false;
        echo json_encode($resp);
    }

}else{
    $resp["successful"] = false;
    $resp["message"] = "此e-mail未註冊";
    echo json_encode($resp);
}



    

    ?>