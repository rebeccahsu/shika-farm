<?php
    include ("./connection.php");

    $sql = "select * from NEWS";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $items = $statement->fetchAll();

    $result = $items;

    echo json_encode($result);
?>