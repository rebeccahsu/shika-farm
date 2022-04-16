<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$mail = $_POST["EMAIL"];
$pwd = $_POST["PASSWORD"];
$name = $_POST["NAME"];
$birthday = $_POST["BIRTHDAY"];
$phone = $_POST["PHONE"];
$zipcode = $_POST["ZIPCODE"];
$county = $_POST["COUNTRY"];
$district = $_POST["DISTRICT"];
$street = $_POST["STREET"];

    $sql = "INSERT into MEMBER( EMAIL, PASSWORD, NAME, BIRTHDAY, PHONE, ZIPCODE, COUNTRY, DISTRICT, STREET ) 
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ? ,? );";
    
    $statement = $pdo->prepare($sql);
    $statement->bindValue(1,"$mail");
    $statement->bindValue(2,"$pwd");
    $statement->bindValue(3,"$name");
    $statement->bindValue(4,"$birthday");
    $statement->bindValue(5,"$phone");
    $statement->bindValue(6,"$zipcode");
    $statement->bindValue(7,"$county");
    $statement->bindValue(8,"$district");
    $statement->bindValue(9,"$street");
   
    $statement->execute();
    $resultCount = $statement->rowCount();
    
    // echo json_encode($TOKEN_str);
    
    if($resultCount > 0){
        session_start();
        $sql2 = "SELECT * FROM MEMBER where EMAIL='$mail'";
        $stm = $pdo->query($sql2);
        $data = $stm->fetch();

        $_SESSION["successful"] = true;
        $_SESSION["NAME"] = $name;
        $_SESSION["ID"] = $data["ID"];
        $_SESSION["message"] = "註冊成功";
        echo json_encode($_SESSION);
    }else{
        $resp["successful"] = false;
        $resp["message"] = "註冊失敗(新增失敗)";
        $resp["post"] = $_POST;
        echo json_encode($resp);
    }

?>