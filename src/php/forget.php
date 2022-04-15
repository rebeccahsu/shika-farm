
<?php
include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$mail = $_POST["EMAIL"];


// 找出會員
$sql = "SELECT * FROM member where EMAIL= ? ";
$statement = $pdo->prepare($sql);
$statement->bindValue( 1 ,$mail);
$statement->execute();

$resultCount = $statement -> rowCount();
$data = $statement->fetchAll();


if(($resultCount) > 0){
    $resp["TOKEN"] = creatTOKEN($pdo,$mail);
    $resp["successful"] = true;
    $resp["NAME"] = $data[0]["NAME"];

}else{
    $resp["successful"] = false;
}

echo json_encode($resp);


// 產生token
function creatTOKEN($pdo,$mail){
    $Strings = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $TOKEN = substr(str_shuffle($Strings), 0, 45);
    $sql2 = "UPDATE set MEMBER TOKEN=':TOKEN' where EMAIL=':EMAIL'";

    $statement2 = $pdo->prepare($sql2);
    $statement2->bindValue(":TOKEN",$TOKEN);
    $statement2->bindValue(":EMAIL",$mail);
    $statement2->execute();

    return $TOKEN;

}

?>
    
