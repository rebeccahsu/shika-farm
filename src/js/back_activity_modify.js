new Vue({
    el: '#a_detail',
    data: {
        activity: 
            { img: './img/activity/riding.jpg', 
            name:'我要當牛仔', 
            capacity: '10', 
            time: '90',
            s1_start: '09:30', s1_end: '11:00', 
            s2_start: '13:00', s2_end: '14:30', 
            s3_start: '16:30', s3_end: '18:00', 
            state: '上架中', 
            description: '無論你是大朋友小朋友、初學者，都可以安心做牛仔！* 身高 90 公分以下且與陪同成人體重相加總重不超過 80 公斤的兒童可以與成人一起乘坐。', 
            on_date: '2022-04-05', on_time: '23:59', 
            off_date: '2023-12-05', off_time:'23:59'},
            // { img: './img/activity/pigrun.jpg', name:'小豬賽跑', timeI: '10:00~10:30', timeII: '13:00~13:30', timeIII: '15:00~15:30', state: '上架中' },
            // { img: './img/activity/fur.jpg', name:'剃羊毛秀', timeI: '09:30~10:30', timeII: '14:00~15:00', timeIII: '17:00~18:00', state: '上架中' },
            // { img: './img/activity/horseshow.jpg', name:'馬術秀', timeI: '11:00~12:00', timeII: '13:00~14:00', timeIII: '16:00~17:00', state: '已下架', stateClass: '-off' },
            // { img: './img/activity/alpacawalk.jpg', name:'草泥馬散步秀', timeI: '10:30~11:30', timeII: '13:30~14:30', timeIII: '15:30~16:30', state: '上架中' },
        selected: '90',
    },
});


$(function() {
    //目前頁面
    let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
    pages.forEach(function(page){
        if ( page.innerHTML == "活動管理"){
            page.closest("a").classList.add("-on");
        }
    });
    

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
            console.log(e.dataTransfer.files[0]);
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

    
});

