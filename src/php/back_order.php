<?php
    include ("./connection.php");

    $sql = "SELECT * FROM `ORDER`;";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $orders = $statement->fetchAll();

    $result = $orders;

    echo json_encode($result);
?>