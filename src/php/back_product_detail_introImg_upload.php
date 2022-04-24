<?php

    $ID = $_POST['ID'];
    //判斷是否上傳成功
    if($_FILES["file"]["error"] > 0){
        echo "上傳失敗: 錯誤代碼".$_FILES["file"]["error"];
    }else{
        //取得上傳的檔案資訊=======================================
        $fileName = $_FILES["file"]["name"];    //檔案名稱含副檔名        
        $filePath_Temp = $_FILES["file"]["tmp_name"];   //Server上的暫存檔路徑含檔名        
        $fileType = $_FILES["file"]["type"];    //檔案種類        
        $fileSize = $_FILES["file"]["size"];    //檔案尺寸
        //=======================================================

        //Web根目錄真實路徑
        $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

        // 檢查路徑
        $path = "/tfd_105/g6/img/products/$ID/";
        if(!is_dir($ServerRoot.$path)){
            mkdir($ServerRoot.$path,0777,true);
        };
        
        // 檔案改名
        $new_name = time() . '_' .$fileName;

        //檔案最終存放位置
        $filePath = $ServerRoot.$path.$new_name;

        //將暫存檔搬移到正確位置
        move_uploaded_file($filePath_Temp, $filePath);

        $resp["succ"] = true;
        $resp["img_url"] = $path.$new_name;
        
        // echo $filePath;
        echo json_encode($resp);
        
    };

    //取得檔案副檔名
    function getExtensionName($filePath){
        $path_parts = pathinfo($filePath);
        return $path_parts["extension"];
    };
?>
