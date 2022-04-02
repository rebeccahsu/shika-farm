let preview = document.querySelector(".preview");
let p_file = document.getElementById("p_file");
let previewImg = function(file){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", function () {
            let img_preview = `<img src="${reader.result}" alt="" class="preview-img">`;
            preview.innerHTML = img_preview;
        });
};

let drop_div = document.getElementById("drop_zone");
drop_div.addEventListener("dragover", function (e) {
    e.preventDefault();
    drop_div.classList.add("-on");
});
drop_div.addEventListener("dragleave", function(e){
    drop_div.classList.remove("-on");
});

drop_div.addEventListener("drop", function (e) {
    e.preventDefault();
    // console.log(e.dataTransfer.files);
    drop_div.classList.remove("-on");

    //顯示預覽圖                
    if(e.dataTransfer.files.length > 0){
        previewImg(e.dataTransfer.files[0]);
        console.log(e.dataTransfer.files[0].name);
    }else{
        preview.innerHTML = `<span class="text">圖片拖曳至此處</span>`;
    }
});

p_file.addEventListener("change", function () {
    if(this.files.length > 0){
        previewImg(this.files[0]);
    }else{
        preview.innerHTML = `<span class="text">圖片拖曳至此處</span>`;
    }
});