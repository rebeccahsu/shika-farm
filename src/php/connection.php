<?php
    //MySQL相關資訊
    // $db_host = "127.0.0.1";
    // $db_user = "root";
    // $db_pass = "password";
    // $db_select = "TFD105_G6";

    $db_host = "127.0.0.1";
    $db_user = "tibamefe_since2021";
    $db_pass = "vwRBSb.j&K#E";
    $db_select = "tibamefe_tfd105g6";

    //建立資料庫連線物件
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;

    //建立PDO物件，並放入指定的相關資料
    $pdo = new PDO($dsn, $db_user, $db_pass);
            
    // //上傳檔案的放置位置(路徑)
    // function getFilePath(){        

    //     //Apache實際的根目錄路徑
    //     $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

    //     //Apache根目錄之下的檔案存放路徑
    //     $filePath = "/img/upload/";
        
    //     return $ServerRoot.$filePath;

    // }
?>