<?php
    include ("./connection.php");
    session_start();
    $id = $_SESSION['ID'];

    $body = json_decode(file_get_contents("php://input"), true);

    $sql = '
      UPDATE `MEMBER` SET 
        `COUNTRY` = :COUNTRY
        , `DISTRICT` = :DISTRICT
        , `STREET` = :STREET
        , `PHONE` = :PHONE 
    ';

    if($body["userinfo"]["newpd"] != "") {
       $sql .= ', `PASSWORD` = :PASSWORD ';
       $stmt->bindValue(":PASSWORD", $body["userinfo"]["newpd"]);
    }
    $sql .= "WHERE ID = '$id' ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":COUNTRY", $body["userinfo"]["city"]);
    $stmt->bindValue(":DISTRICT", $body["userinfo"]["area"]);
    $stmt->bindValue(":STREET", $body["userinfo"]["address"]);
    $stmt->bindValue(":PHONE", $body["userinfo"]["tel"]);
   
    $stmt->execute();

    // echo "修改成功";
    // $result = $stmt->fetchAll();
    $resultCount = $stmt->rowCount();
    
    if ($resultCount > 0) {
        $respBody = true;
    } else {
        $respBody = false;
    }
    
    echo json_encode($respBody);

?>