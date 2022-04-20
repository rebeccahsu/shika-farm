//目前頁面亮燈
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function(page){
    if ( page.innerHTML == "活動管理"){
        page.closest("a").classList.add("-on");
    }
});

// sweetalert
function sAlert(msg, icon, btn) {
    Swal.fire({
        title: msg,
        icon: icon,
        showConfirmButton: true, // 確認按鈕（預設會顯示不用設定)
        confirmButtonText: btn, //　按鈕顯示文字
        confirmButtonAriaLabel: btn, // 網頁無障礙用
        // showDenyButton: true, // 否定按鈕
        showCancelButton: false, // 取消按鈕
        buttonsStyling: false, // 是否使用sweetalert按鈕樣式（預設為true）
        customClass: {
                        confirmButton: 'btn-yellow margintop_15 marginleft_2 marginright_2',
                        cancelButton: 'btn-red margintop_15 marginleft_2 marginright_2'
                    },
    })
}

//TODO: 連上資料庫時改DATA
new Vue({
    el: '#a_detail',
    data: {
        activity: 
            { IMG: './img/activity/riding.jpg', 
            NAME:'我要當牛仔', 
            OPACITY: '10', 
            TIME: '90',
            S1_START: '09:30', S1_END: '11:00', 
            S2_START: '13:00', S2_END: '14:30', 
            S3_START: '16:30', S3_END: '18:00', 
            STATE: '上架中', 
            DESC: '無論你是大朋友小朋友、初學者，都可以安心做牛仔！* 身高 90 公分以下且與陪同成人體重相加總重不超過 80 公斤的兒童可以與成人一起乘坐。', 
            CATEGORY: 'horse'
            },
            stateCheck: '',
    },
    // data: {
    //     activity: {},
    //     stateCheck: '',
    // },
    created(){
        const params = new URLSearchParams(location.search);
        let id = params.get('activity_id');
        // console.log(id);
        fetch('./php/modify_activity_select.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {id: id}
            ),
        })
        .then(res => res.json())
        .then(res => this.activity = res)
        .then(() => {
            if(this.activity[0].STATE == "上架中"){
                this.stateCheck = true;
            }else{
                this.stateCheck = false;
            }
        })
    },
    methods: {
        confirmModify(){
            const params = new URLSearchParams(location.search);
            let id = params.get('activity_id');
            if (this.img != '' && this.name != '' && this.opacity != '' && this.desc != '' && this.s1_start != '' && this.s2_start != '' && this.s3_start != ''){
                // console.log(id);
                fetch('./php/modify_activity_update.php', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id,
                        name: this.activity[0].NAME,
                        img: this.activity[0].IMG,
                        opacity: this.activity[0].OPACITY,
                        state: this.stateCheck ? "上架中" : "未上架",
                        time: this.activity[0].TIME,
                        s1_start: this.activity[0].S1_START,
                        s1_end: this.activity[0].S1_END,
                        s2_start: this.activity[0].S2_START,
                        s2_end: this.activity[0].S2_END,
                        s3_start: this.activity[0].S3_START,
                        s3_end: this.activity[0].S3_END,
                        desc: this.activity[0].DESC, 
                        category: this.activity[0].CATEGORY,
                        
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    if (res.successful) {
                        // sAlert('<h5>已成功儲存修改內容！</h5>', 'success', '返回活動列表');
                        Swal.fire({
                            title: `<h5>已成功儲存修改內容！</h5>`,
                            // text: "Write something interesting:",
                            input: 'password',
                            showCancelButton: true,
                            buttonsStyling: false,
                            confirmButtonText: '繼續編輯',
                            cancelButtonText: '返回活動列表',
                            customClass: {
                                confirmButton: 'btn-green marginright_20',
                                cancelButton: 'btn-yellow'
                            },      
                        }).then((result) => {
                            if (result.value) {            
                            }else{
                                location.href="./back_activity.html";
                            }
                        });
                    } 
                    else {
                        sAlert('<strong>您沒有需儲存的變更內容</strong>', 'info', 'OK');
                    }
                })
                .catch(function(err) {
                    sAlert('<strong>儲存失敗，請再試一次</strong>', 'error', 'OK');
                });

            }else{
                sAlert('<strong>請填寫完所有欄位再按下儲存</strong>', 'warning');
            }
            
        },
        getEndTime(){
            function auto_time (el, p){
                let time = el.split(":");
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
                        if (newMin >= 60){
                            newMin = newMin - 60;
                            newHr += 1;
                        }
                        time.splice(1, 1, newMin);
                        time.splice(0, 1, newHr);
                        break;
                }
                time.splice(1, 0, ":")
                // console.log(time.toString());
                let time_str = time.toString().replace(/,/g, "");
                if (newHr < 10){
                    time_str = "0" + time_str;
                }
                if (newMin < 10){
                    time_str = time_str.slice(0, 3) + "0" + time_str.slice(3);
                }
                return time_str;
            }
            let time_arr = [this.activity[0].S1_START, this.activity[0].S2_START, this.activity[0].S3_START];
            let end_arr = [];
            for (let i = 0; i < time_arr.length; i++){
                if (this.activity[0].TIME == 30){
                    end_arr.push(auto_time(time_arr[i], 30));
                }else if(this.activity[0].TIME == 60){
                    end_arr.push(auto_time(time_arr[i], 60));
                }else if(this.activity[0].TIME == 90){
                    end_arr.push(auto_time(time_arr[i], 90));
                }
            }
            this.activity[0].S1_END = end_arr[0];
            this.activity[0].S2_END = end_arr[1];
            this.activity[0].S3_END = end_arr[2];
        },
        fileSelected(e){
            let file = e.target.files.item(0); //取得File物件
            let reader = new FileReader(); //建立FileReader 監聽 Load 事件
            reader.addEventListener('load',this.imageLoader);
            reader.readAsDataURL(file);
            this.activity[0].IMG = `./img/activity/${file.name}`;
            $('span.text').remove();
        },
        dragover(e){
                let drop_div = document.getElementById("drop_zone");
                e.preventDefault();
                drop_div.classList.add("-on");
        },
        dragleave(){
                let drop_div = document.getElementById("drop_zone");
                drop_div.classList.remove("-on");
        },
        drop(e){
                e.preventDefault();
                let preview = document.querySelector(".preview");
                $("#drop_zone").removeClass("-on");
                //顯示預覽圖                
                if(e.dataTransfer.files.length > 0){
                    // previewImg(e.dataTransfer.files[0]);
                    this.activity[0].IMG = `./img/activity/${e.dataTransfer.files[0].name}`;
                    $('span.text').remove();
                }else{
                    preview.innerHTML = `<span class="text">圖片拖曳至此處</span>`;
                }
        }
    },
});


$(function() {
    
    

    // ==== 圖片預覽 ====
    // let preview = document.querySelector(".preview");
    // let p_file = document.getElementById("p_file");
    // let previewImg = function(file){
    //         let reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.addEventListener("load", function () {
    //             let img_preview = `<img src="${reader.result}" alt="" class="preview-img">`;
    //             preview.innerHTML = img_preview;
    //         });
    // };

    // let drop_div = document.getElementById("drop_zone");
    // drop_div.addEventListener("dragover", function (e) {
    //     e.preventDefault();
    //     drop_div.classList.add("-on");
    // });
    // drop_div.addEventListener("dragleave", function(e){
    //     drop_div.classList.remove("-on");
    // });

    // drop_div.addEventListener("drop", function (e) {
    //     e.preventDefault();
    //     // console.log(e.dataTransfer.files);
    //     drop_div.classList.remove("-on");

    //     //顯示預覽圖                
    //     if(e.dataTransfer.files.length > 0){
    //         previewImg(e.dataTransfer.files[0]);
    //         console.log(e.dataTransfer.files[0]);
    //     }else{
    //         preview.innerHTML = `<span class="text">圖片拖曳至此處</span>`;
    //     }
    // });

    // p_file.addEventListener("change", function () {
    //     if(this.files.length > 0){
    //         previewImg(this.files[0]);
    //     }else{
    //         preview.innerHTML = `<span class="text">圖片拖曳至此處</span>`;
    //     }
    // });


    // //==== 場次時間自動填入 ====
    // function auto_time (el, p){
    //     let time = $(el).val().split(":");
    //     let newHr;
    //     let newMin;
    //     switch(p) {
    //         case 30:
    //             newMin = parseInt(time[1]) + 30;
    //             newHr = parseInt(time[0]);
    //             if (newMin >= 60){
    //                 newMin = newMin - 60;
    //                 newHr += 1;
    //             }
    //             time.splice(1, 1, newMin);
    //             time.splice(0, 1, newHr);
    //             break;
    //         case 60:
    //             newHr = parseInt(time[0]) + 1;
    //             time.splice(0, 1, newHr);
    //             break;
    //         case 90:
    //             newHr = parseInt(time[0]) + 1;
    //             newMin = parseInt(time[1]) + 30;
    //             if (newMin > 60){
    //                 newMin = newMin - 60;
    //                 newHr += 1;
    //             }
    //             time.splice(1, 1, newMin);
    //             time.splice(0, 1, newHr);
    //             break;
    //     }
    //     time.splice(1, 0, ":")
    //     console.log(time.toString());
    //     let time_str = time.toString().replace(/,/g, "");
    //     if (newHr < 10){
    //         time_str = "0" + time_str;
    //     }
    //     if (newMin < 10){
    //         time_str = time_str.slice(0, 3) + "0" + time_str.slice(3);
    //     }
    //     return time_str;
    // }

    // let time_start = document.querySelectorAll('.time-start');
    // let time_end = document.querySelectorAll('.time-end');

    // for( let i = 0; i < time_start.length; i++){
    //     time_start[i].addEventListener("change", function(){
    //         let periodChecked = document.querySelector('input[type="radio"]:checked');
    //         let period = parseInt(periodChecked.id);
    //         time_end[i].value = auto_time(this, period);
    //     })
    // }


    // //上下架時間限制
    // let today = new Date();
    // // let current_time = today.toLocaleTimeString();

    // function formatDate(date) {
    //     var d = new Date(date),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + d.getDate(),
    //         year = d.getFullYear();

    //     if (month.length < 2) 
    //         month = '0' + month;
    //     if (day.length < 2) 
    //         day = '0' + day;

    //     return [year, month, day].join('-');
    // }
    
    // today = formatDate(today);
    // let on_date = document.getElementById('on_date');
    // let off_date = document.getElementById('off_date');
    // on_date.min = today;
    // on_date.addEventListener("change", function(){
    //     off_date.min = on_date.value;
    // });
    // // let on_time = document.getElementById('on_time');
    // // on_time.min = current_time;

    
});

