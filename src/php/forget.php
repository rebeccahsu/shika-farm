
<?php
include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$mail = $_POST["EMAIL"];


// 找出會員
$sql = "SELECT * FROM member where EMAIL= ? ";
$statement = $pdo->prepare($sql);
$statement->bindValue( 1 ,$mail);
$statement->execute();

$data = $statement->fetchAll();

if(count($data) > 0){
    $resp["TOKEN"] = creatTOKEN();
    $resp["successful"] = true;
    $resp["NAME"] = $data[0]["NAME"];

}else{
    $resp["successful"] = true;
}

echo json_encode($resp);


// 產生token
function creatTOKEN(){
    $Strings = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $TOKEN = substr(str_shuffle($Strings), 0, 45);
    $sql2 = "UPDATE set MEMBER TOKEN='?' where EMAIL='?'";

    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue( 1 ,$TOKEN);
    $statement2->bindValue( 2 ,$mail);
    $statement2->execute();

    return $TOKEN;

}

?>
    
