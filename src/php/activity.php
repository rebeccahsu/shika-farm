<?php
    include ("./connection.php");

    $activity = json_decode(file_get_contents("php://input"), true);
    // $title = $_POST['title'];
    // echo $title;

    // $sql = "select * from ACTIVITY where STATE = '上架中'";

    $sql = 'SELECT a.* , ac.CATEGORY, ac.ICON
            FROM ACTIVITY a JOIN ACTIVITY_CATEGORY ac
            ON a.CATEGORY_ID = ac.ID
            WHERE a.STATE = "上架中";
            ';

    // $statement = $pdo->prepare($sql);
    // $statement->execute();
    // $all_data = $statement->fetchAll();

    $stmt = $pdo->prepare($sql);
    // $stmt->bindValue(":title", $activity["title"]);
    $stmt->execute();
    $all_data = $stmt->fetchAll();

    // $result = $all_data;

    echo json_encode($all_data);
?>