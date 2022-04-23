<?php
    //Web根目錄真實路徑, ex: C:/XAMPP/htdocs
    $ServerRoot = $_SERVER["DOCUMENT_ROOT"];
    $ID = $_POST['ID'];

    //取得上傳的檔案資訊(陣列型態)=============================
    $fileName_arr = $_FILES["file"]["name"];    //檔案名稱含副檔名    
    $fileTmpName_arr = $_FILES["file"]["tmp_name"]; //Server上的暫存檔路徑含檔名    
    $fileType_arr = $_FILES["file"]["type"];    //檔案種類        
    $fileSize_arr = $_FILES["file"]["size"];    //檔案尺寸
    $error_arr = $_FILES["file"]["error"];  //錯誤代碼
    //=======================================================
    $path = "/tfd_105/g6/img/products/$ID/";
    if(!is_dir($ServerRoot.$path)){
        mkdir($ServerRoot.$path,0777,true);
    };

    $img_arr=[];

    //依上傳檔案的數量跑迴圈一一處理
    for ($i = 0; $i < count($fileName_arr); $i++) {        

        //Server上的暫存檔路徑含檔名
        $filePath_Temp = $fileTmpName_arr[$i];
        
        $new_name = time() . '_' .$fileName_arr[$i];

        //檔案最終存放位置
        $filePath = $ServerRoot.$path.$new_name;


        //判斷是否上傳成功
        if($error_arr[$i] > 0){
            echo "上傳失敗: 錯誤代碼".$error_arr[$i];
        }else{
            //將暫存檔搬移到正確位置
            move_uploaded_file($filePath_Temp, $filePath);

            // array_push($img_arr,$path.$new_name);
            $img_arr[$i] = $path.$new_name;
        }
    }    


    $resp["img_url"] = $img_arr;

echo json_encode($resp["img_url"]);
// echo json_encode($_FILES["file"]);


    //取得檔案副檔名
    function getExtensionName($filePath){
        $path_parts = pathinfo($filePath);
        return $path_parts["extension"];
    }
?>
