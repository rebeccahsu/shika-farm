<?php

include("connection.php"); 

$_POST = json_decode(file_get_contents("php://input"), true);

$pwd = $_POST["PASSWORD"];
$TOKEN_str = $_POST["TOKEN_str"];

$sql = "SELECT * FROM MEMBER where TOKEN= '$TOKEN_str' ";
$stm = $pdo->query($sql);
$stm->execute();
// query回傳成功找到的資料筆數
$res = $stm->rowCount();
$data = $stm->fetchAll();

if($res >0 ){

    $sql2 = "UPDATE MEMBER set PASSWORD=:PASSWORD where TOKEN=:TOKEN_str";
    
    $statement = $pdo->prepare($sql2);
    $statement->bindValue(":TOKEN_str","$TOKEN_str");
    $statement->bindValue(":PASSWORD","$pwd");

    $statement->execute();
    $resultCount = $statement->rowCount();
    
    if(($resultCount) > 0){
        // $resp["PASSWORD"] = $pwd;
        $resp["successful"] = true;
        $resp["NAME"] = $data[0]["NAME"];
        $resp["message"] = "修改成功！";
        echo json_encode($resp);
    
    }else{
        // $resp["PASSWORD"] = $pwd;
        $resp["successful"] = false;
        $resp["message"] = "哦哦！好像出了點問題！(修改失敗)";
        echo json_encode($resp);
    }

}else{
    $resp["successful"] = false;
    $resp["message"] = "哦哦！好像出了點問題！(驗證錯誤)";
    echo json_encode($resp);
}



?>