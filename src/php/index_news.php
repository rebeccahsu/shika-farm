<?php
    include ("./connection.php");

    $sql = "select * from NEWS limit 3";
    $stm = $pdo->prepare($sql);
    $stm->execute();
    $news = $stm->fetchAll();

    echo json_encode($news);

?>