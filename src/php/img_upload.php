<?php
    //判斷是否上傳成功
    if($_FILES["img"]["error"] > 0){
        echo "上傳失敗: 錯誤代碼".$_FILES["img"]["error"];
    }else{
        //取得上傳的檔案資訊=======================================
        $fileName = $_FILES["img"]["name"];    //檔案名稱含副檔名        
        $filePath_Temp = $_FILES["img"]["tmp_name"];   //Server上的暫存檔路徑含檔名        
        $fileType = $_FILES["img"]["type"];    //檔案種類        
        $fileSize = $_FILES["img"]["size"];    //檔案尺寸
        //=======================================================

        //Web根目錄真實路徑
        $ServerRoot = $_SERVER["DOCUMENT_ROOT"];

        // 要存放檔案的資料夾路徑
        $path = "/g6/img/upload/";
        if(!is_dir($ServerRoot.$path)){
            mkdir($ServerRoot.$path,0777,true);
        };

        // 重新命名為時間加原檔名，避免重複
        $new_name = time() . '.' .$fileName;


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
