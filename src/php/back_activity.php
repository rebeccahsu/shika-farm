<?php
    @include ("./connection.php");

    $sql = "select * from ACTIVITY";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $activities = $statement->fetchAll();

    echo json_encode($activities);
?>