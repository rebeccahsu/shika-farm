<?php
    include ("./connection.php");

    $sql = "select * from activity";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $activities = $statement->fetchAll();

    $result = $all_data;

    echo json_encode($result);
?>