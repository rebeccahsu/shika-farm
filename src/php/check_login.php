<?php

include("connection.php");   
session_start();


if($_SESSION['ID'] != null && $_SESSION['ID'] !=""){
    echo json_encode($_SESSION);
}else{
    $_SESSION['successful'] = false;
    $_SESSION['ID'] = "";
    $_SESSION['NAME'] = "";
    $_SESSION['message'] = "請登入會員";
    echo json_encode($_SESSION);
};

 
?>