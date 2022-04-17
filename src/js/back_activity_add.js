//目前頁面
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function(page){
    if ( page.innerHTML == "活動管理"){
        page.closest("a").classList.add("-on");
    }
});

function alertAddAct(msg, icon) {
    Swal.fire({
        title: msg,
        icon: icon,
        showConfirmButton: false, // 確認按鈕（預設會顯示不用設定)
        // 使用同確認按鈕
        // showDenyButton: true, // 否定按鈕
        showCancelButton: false, // 取消按鈕
        buttonsStyling: false, // 是否使用sweetalert按鈕樣式（預設為true）
    })
}

//確認新增
new Vue({
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
                    console.log(body);
                    console.log(body.successful);
                    if (successful) {
                        alertAddAct('<strong>已成功新增活動！</strong>', 'success');
                        this.name = '';
                        this.opacity = '';
                        this.img = '';
                        this.s1_start = '';
                        this.s2_start = '';
                        this.s3_start = '';
                        this.desc = '';
                    } 
                    else {
                        alertAddAct('<strong>新增失敗，請再試一次</strong>', 'error');
                    }
                })
                .catch(function(err) {
                    alertAddAct('<strong>新增失敗，請再試一次</strong>', 'error');
                });

            }else{
                alertAddAct('<strong>請填寫完所有欄位再送出</strong>', 'error');
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

        fileSelected(e){
            let file = e.target.files.item(0); //取得File物件
            let reader = new FileReader(); //建立FileReader 監聽 Load 事件
            reader.addEventListener('load',this.imageLoader);
            reader.readAsDataURL(file);
            this.img = `./img/activity/${file.name}`;
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
                previewImg(e.dataTransfer.files[0]);
                this.img = `./img/activity/${e.dataTransfer.files[0].name}`;
                $('span.text').remove();
            }else{
                preview.innerHTML = `<span class="text">圖片拖曳至此處</span>`;
            }
       }
    },

})