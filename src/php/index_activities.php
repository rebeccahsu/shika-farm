<?php
    include ("./connection.php");

    $sql = "select * from ACTIVITY where STATE = '上架中' limit 5";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $activities = $statement->fetchAll();

    $result = $activities;

    echo json_encode($result);
?>