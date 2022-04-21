//目前頁面
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
                        confirmButton: 'btn-yellow margintop_15',
                        cancelButton: 'btn-red margintop_15'
                    },
    })
}
function sConfirm(title, text, url) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn-green',
            cancelButton: 'btn-red'
        },
    }).then(function(result) {
       if (result.value) {
            location.href = url;
       }
       else {
           
       }
    });
}

//確認新增
const addActivity = new Vue({
    el: '#activity-add-app',
    data(){
        return {
            name: '',
            img: '',
            opacity: '',
            state: 'true',
            time: '30',
            s1_start: '',
            s1_end: '',
            s2_start: '',
            s2_end: '',
            s3_start: '',
            s3_end: '',
            desc: '',
            category: 'cow',

        }
    },
    methods: {
        addActivity(){
            if (this.img != '' && this.name != '' && this.opacity != '' && this.desc != '' && this.s1_start != '' && this.s2_start != '' && this.s3_start != ''){
                fetch("./php/add_activity.php", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        // "Accept": 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.name,
                        img: this.img,
                        opacity: this.opacity,
                        state: this.state ? "上架中" : "未上架",
                        time: this.time,
                        s1_start: this.s1_start,
                        s1_end: this.s1_end,
                        s2_start: this.s2_start,
                        s2_end: this.s2_end,
                        s3_start: this.s3_start,
                        s3_end: this.s3_end,
                        desc: this.desc, 
                        category: this.category,
                        }),

                })
                .then((resp) => resp.json())
                .then((body) => {
                    const { successful } = body;
                    // console.log(body);
                    // console.log(body.successful);
                    if (successful) {
                        // sAlert('<h5>已成功新增活動！</h5>', 'success', 'OK');
                        Swal.fire({
                            title: '<h5>已成功新增活動！</h5>',
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonText: '返回活動列表',
                            cancelButtonText: '繼續新增活動',
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: 'btn-green marginright_20',
                                cancelButton: 'btn-yellow'
                            },
                        }).then(function(result) {
                           if (result.value) {
                                location.href = './back_activity.html';
                           }
                           else {
                               
                           }
                        });
                        this.name = '';
                        this.opacity = '';
                        this.img = '';
                        this.s1_start = '';
                        this.s1_end = '';
                        this.s2_start = '';
                        this.s2_end = '';
                        this.s3_start = '';
                        this.s3_end = '';
                        this.desc = '';
                    } 
                    else {
                        sAlert('<h5>新增失敗，請再試一次</h5>', 'error', 'OK');
                    }
                })
                .catch(function(err) {
                    sAlert('<h5>新增失敗，請再試一次</h5>', 'error', 'OK');
                });

            }else{
                sAlert('<h5>請填寫完所有欄位再送出</h5>', 'warning', 'OK');
            }
        },

        getEndTime(){
            // console.log(this.s1_start);
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
            let time_arr = [this.s1_start, this.s2_start, this.s3_start];
            let end_arr = [];
            for (let i = 0; i < time_arr.length; i++){
                if (this.time == 30){
                    end_arr.push(auto_time(time_arr[i], 30));
                }else if(this.time == 60){
                    end_arr.push(auto_time(time_arr[i], 60));
                }else if(this.time == 90){
                    end_arr.push(auto_time(time_arr[i], 90));
                }
            }
            this.s1_end = end_arr[0];
            this.s2_end = end_arr[1];
            this.s3_end = end_arr[2];
        },

        uploadImg(file){
            let form_data = new FormData();
            form_data.append('img',file);
            // fetchAPI
            fetch('./php/activity_img_upload.php', {
            method: 'POST',
            body: form_data,
            })
            .then(resp =>resp.json())
            .then(body =>{
                // const { succ, img_url } = body;
                console.log(body);
                addActivity.img = body.img_url;
                // console.log(.img);
                console.log(body.img_url);
            })
        },
        
        fileSelected(e){
            // let file = e.target.files.item(0); //取得File物件
            let file = $('#p_file')[0].files[0];
            if ( $('#p_file')[0].files.length > 0 ){
                let reader = new FileReader(); //建立FileReader 監聽 Load 事件
                reader.addEventListener('load',this.imageLoader);
                reader.readAsDataURL(file);
                addActivity.uploadImg(file);
                $('span.text').remove();
                $('.filename').html(file.name);
            }else{
                addActivity.noSelectAnyFile();
            }
            
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
            $("#drop_zone").removeClass("-on");
            //顯示預覽圖                
            if(e.dataTransfer.files.length > 0){
                // previewImg(e.dataTransfer.files[0]);
                addActivity.uploadImg(e.dataTransfer.files[0]);
                $('.filename').html(e.dataTransfer.files[0].name);
                // this.img = `./img/activity/${e.dataTransfer.files[0].name}`;
                $('span.text').remove();
            }else{
                addActivity.noSelectAnyFile();
            }
        },
        noSelectAnyFile(){
            $('.filename').html('尚未選擇檔案');
            $('.preview').append(`<span class="text">圖片拖曳至此處</span>`);
            this.img = '';
        },
        cancel(){
            sConfirm('內容尚未儲存', '您確定要返回活動列表嗎？', "./back_activity.html");
        },
    },

})