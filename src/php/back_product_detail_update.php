<?php

include("./connection.php");

$_POST = json_decode(file_get_contents("php://input"), true);
$ID = $_POST["ID"];
$NAME = $_POST["NAME"];
$MAIN_PIC = $_POST["topImg"];
$COST = $_POST["COST"];
$PRICE = $_POST["PRICE"];
$STOCK = $_POST["STOCK"];
$KIND = $_POST["KIND"];
$SLOGAN = $_POST["SLOGAN"];
$DETAIL = $_POST["DETAIL"];
// $DESCRIPTION = $_POST["INTRO"];
$DESCRIPTION = json_encode($_POST["INTRO"]);

// 檢查ID存在
$sql = "update PRODUCT set 
NAME=?, COST=?, UNIT_PRICE=?, STOCK=?,
PRODUCT_CATEGORY_ID=?, MAIN_PIC=?,
SLOGAN=?, DETAIL=?, DESCRIPTION=?  
where ID = ?  ;";
$statement = $pdo->prepare($sql);
$statement->bindValue(1,"$NAME");
$statement->bindValue(2,"$COST");
$statement->bindValue(3,"$PRICE");
$statement->bindValue(4,"$STOCK");
$statement->bindValue(5, $KIND);
$statement->bindValue(6,"$MAIN_PIC");
$statement->bindValue(7,"$SLOGAN");
$statement->bindValue(8, $DETAIL);
$statement->bindValue(9,"$DESCRIPTION");
$statement->bindValue(10,"$ID");

// 執行上面封裝的sql
$statement->execute();

// 回傳成功的資料筆數
$res = $statement->rowCount();
$data = $statement->fetchAll();

if($res>0){
    $resp["successful"] = true;
    $resp["message"] = "修改商品成功";
    echo json_encode($resp);

}else{
    $resp["successful"] = false;
    $resp["message"] = "修改失敗";
    echo json_encode($resp);

}

// echo $MAIN_PIC;
// echo $SLOGAN;
// print_r( $_POST);

    

    ?>