<?php
    @include ("./connection.php");

    $sql = "SELECT * FROM NEWS;";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $news = $statement->fetchAll();

    echo json_encode($news);
?>