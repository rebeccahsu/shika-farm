// ==== 圖片預覽 ====
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


//==== 場次時間自動填入 ====
function auto_time (el, p){
    let time = $(el).val().split(":");
    let newHr;
    let newMin;
    switch(p) {
        case 30:
            newMin = parseInt(time[1]) + 30;
            newHr = parseInt(time[0]);
            if (newMin >= 60){
                newMin = newMin - 60;
                newHr += 1;
            }
            time.splice(1, 1, newMin);
            time.splice(0, 1, newHr);
            break;
        case 60:
            newHr = parseInt(time[0]) + 1;
            time.splice(0, 1, newHr);
            break;
        case 90:
            newHr = parseInt(time[0]) + 1;
            newMin = parseInt(time[1]) + 30;
            if (newMin > 60){
                newMin = newMin - 60;
                newHr += 1;
            }
            time.splice(1, 1, newMin);
            time.splice(0, 1, newHr);
            break;
    }
    time.splice(1, 0, ":")
    console.log(time.toString());
    let time_str = time.toString().replace(/,/g, "");
    if (newHr < 10){
        time_str = "0" + time_str;
    }
    if (newMin < 10){
        time_str = time_str.slice(0, 3) + "0" + time_str.slice(3);
    }
    return time_str;
}

let time_start = document.querySelectorAll('.time-start');
let time_end = document.querySelectorAll('.time-end');

for( let i = 0; i < time_start.length; i++){
    time_start[i].addEventListener("change", function(){
        let periodChecked = document.querySelector('input[type="radio"]:checked');
        let period = parseInt(periodChecked.id);
        time_end[i].value = auto_time(this, period);
    })
}


//上下架時間限制
let today = new Date();
// let current_time = today.toLocaleTimeString();

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
today = formatDate(today);
let on_date = document.getElementById('on_date');
let off_date = document.getElementById('off_date');
on_date.min = today;
on_date.addEventListener("change", function(){
    off_date.min = on_date.value;
});
// let on_time = document.getElementById('on_time');
// on_time.min = current_time;


//目前頁面
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function(page){
    if ( page.innerHTML == "活動管理"){
        page.closest("a").classList.add("-on");
    }
});