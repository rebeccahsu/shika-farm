
// 關閉按鈕和範圍end
// ============================

// 驗證信箱格式blur
const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const passwordRule = /^[\w_-]{4,16}$/;
$('#userMail').on('blur', () => {
    // console.log('object');
    if ($('#userMail').val().search(emailRule) == -1) {
        $('label[for="userMail"]').html("<h5>電子郵件<span>*e-mail格式不正確</span></h5>");
    } else {
        // console.log('c');
        $('label[for="userMail"]').html("<h5>電子郵件</h5>");
    }
})

$('.userMail').on('blur', () => {
    // console.log('object');
    if ($('.userMail').val().search(emailRule) == -1) {
        $('label[for="userMail"]').html("<h5>電子郵件<span>*e-mail格式不正確</span></h5>");
    } else {
        // console.log('c');
        $('label[for="userMail"]').html("<h5>電子郵件</h5>");
    }
})
$('#register_mail').on('blur', () => {
    if ($('#register_mail').val().search(emailRule) == -1) {
        $('label[for="register_mail"]').html("<h5>電子郵件<span>*e-mail格式不正確</span></h5>");
    } else {
        $('label[for="register_mail"]').html("<h5>電子郵件</h5>");
    }
})

// 驗證密碼格式
$('#password').on('keyup', () => {
    let psd = $('#password').val();
    // console.log(psd);
    if (psd.length < 4 || psd.length > 16) {
        $('label[for="password"]').html("<h5>密碼<span>*密碼須為4~16字以內</span></h5>");
    } else if (psd.search(passwordRule) == -1) {
        $('label[for="password"]').html("<h5>密碼<span>*請輸入半形的英文和數字</span></h5>");
    } else {
        // console.log('c');
        $('label[for="password"]').html("<h5>密碼</h5>");
    }

})
$('#register_password').on('keyup', () => {
    let psd = $('#register_password').val();
    // console.log(psd);
    if (psd.length < 4 || psd.length > 16) {
        $('label[for="register_password"]').html("<h5>密碼<span>*密碼須為4~16字以內</span></h5>");
    } else if (psd.search(passwordRule) == -1) {
        $('label[for="register_password"]').html("<h5>密碼<span>*請輸入半形的英文和數字</span></h5>");
    } else {
        // console.log('c');
        $('label[for="register_password"]').html("<h5>密碼</h5>");
    }
})


// 二次確認密碼blur
$('#repassword').on('blur', () => {
    if ($('#register_password').val() !== $('#repassword').val()) {
        $('label[for="repassword"]').html("<h5>確認密碼<span>*和密碼不一致</span></h5>");
    } else {
        $('label[for="repassword"]').html("<h5>確認密碼</h5>");
    }
})


// 註冊詳細資料驗證  ====================================
// 驗證手機號碼格式  /  正規表達式的內容{最少字元，最多字元}  /
const phoneRule = /\d{9,10}/;
$('#phoneNumber').on('blur', () => {
    if ($('#phoneNumber').val().search(phoneRule) == -1) {
        $('label[for="phoneNumber"]').html("<h5>聯絡電話<span>*電話格式不正確</span></h5>");
    } else {
        $('label[for="phoneNumber"]').html("<h5>聯絡電話</h5>");
    }
})

$('#userName').on('blur', () => {
    if ($('#userName').val() == "") {
        $('label[for="userName"]').html("<h5>姓名<span>*必填欄位</span></h5>");
    } else {
        $('label[for="userName"]').html("<h5>姓名</h5>");
    }
});

// 限制生日=======================================
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
let today = year + "-" + month + "-" + day;

$('#birthday').attr("max",today);
$('#birthday').attr("min","1822-04-27");

// 限制生日end=======================================

$('#birthday').on('blur', () => {
    if ($('#birthday').val() == "") {
        $('label[for="birthday"]').html("<h5>生日<span>*必填欄位</span></h5>");
    } else {
        $('label[for="birthday"]').html("<h5>生日</h5>");
    }
})

$('#Street').on('blur', () => {
    if ($('#Street').val() == "") {
        $('label[for="address"]').html("<h5>聯絡地址<span>*請輸入地址</span></h5>");
    } else {
        $('label[for="address"]').html("<h5>聯絡地址</h5>");
    }
})

// 詳細資料驗證end ======================================
// 驗證end ============================================

// 註冊送出帳密=================================================================
$('#next').on('click', (e) => {
    e.preventDefault();
    let newPassword = document.querySelector("#register_password");
    let userMail = document.querySelector("#register_mail");
    
    if(userMail.value.search(emailRule) != -1 && userMail.value != "" && newPassword.value.length > 3 && newPassword.value.length < 17 && newPassword.value.search(passwordRule) != -1){
        fetch('./php/register_email.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // 送出內容轉成JSON送出
            body: JSON.stringify({
                EMAIL:userMail.value,
                PASSWORD: newPassword.value,
            }),
        })
            // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
            .then(resp => resp.json())
            .then(body => {
                //body也不可以console
                const { successful, message } = body;
                if (successful == true) {
                    // console.log(successful +' 訊息' + message);
                    sessionStorage.setItem("register",JSON.stringify({mail:userMail.value,password:newPassword.value}))
                    $("#register1").addClass("form-off");
                    $("#register2").removeClass("form-off");
                    $(".shikaBlock").attr("style","display:none;");
        
                    // location.href = `./password_reset_3.html`;
                } else {
                    $('label[for="register_mail"]').html("<h5>電子郵件<span>*e-mail已註冊過</span></h5>");
                    console.log(successful + ' 訊息' + message);
                }
            })
    }else{
        console.log("XX");
    }

    
})
// 註冊送出帳密end=================================================================
// 註冊送出詳細資料===================================================
$('#send').on('click', (e) => {
    e.preventDefault();
    let obj = JSON.parse(sessionStorage.getItem("register"));
    let twcode = document.querySelector("#twzipcode").querySelector('input[name="zipcode"]');
    let country = document.querySelector("#twzipcode").querySelector('select[name="county"]');
    let district = document.querySelector("#twzipcode").querySelector('select[name="district"]');
    let userName = document.querySelector("#userName");
    let userBirthday = document.querySelector("#birthday");
    let street = document.querySelector("#Street");
    let phone = document.querySelector("#phoneNumber");

    if($('#phoneNumber').val().search(phoneRule) != -1 && $('#userName').val() != "" && $('#birthday').val() != "" && $('#Street').val() != "" && twcode.value!='' ){
        // AJAX
        fetch('./php/register_order.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // 送出內容轉成JSON送出
            body: JSON.stringify({
                EMAIL: obj.mail,
                PASSWORD: obj.password,
                NAME:userName.value,
                BIRTHDAY: userBirthday.value,
                ZIPCODE: twcode.value,
                COUNTRY: country.value,
                DISTRICT: district.value,
                STREET: street.value,
                PHONE:phone.value,

            }),
        })
            // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
            .then(resp => resp.json())
            .then(body => {
                //body也不可以console
                const { successful, message , ID , NAME} = body;
                if (successful == true) {
                    // console.log(successful +' 訊息' + message);
                    // alert('註冊成功');
                    sAlert('註冊成功', "success", "確認");
                    sessionStorage.removeItem("register");
                    sessionStorage.setItem("login",JSON.stringify({login:successful,NAME:NAME}));
                       
                    // 註冊第二步 送出，到完成
                    $("#register2").addClass("form-off");
                    $("#register3").removeClass("form-off");
                    
                } else {
                    console.log(successful + ' 訊息' + message);
                }
            })
        }else{
        sAlert("還有欄位沒有寫唷！", "warning", "確定");
        // console.log('有資料沒有寫');
    }
})

// 註冊送出詳細資料end=================================================
// 忘記密碼時，送出驗證信 ==========================================================
$('#send_mail').on('click', (e) => {
    e.preventDefault();
    // console.log(e.target);
    if ($('#userMail').val() == "") {
        $('label[for="userMail"]').html("<h5>電子郵件<span>*未輸入e-mail</span></h5>");
    } else if ($('#userMail').val().search(emailRule) == -1) {
        $('label[for="userMail"]').html("<h5>電子郵件<span>*e-mail格式不正確</span></h5>");
    } else {
        $('label[for="userMail"]').html("<h5>電子郵件</h5>");

        // AJAX 驗證EMAIL是否註冊過
        let userMail = document.querySelector("#userMail");
        fetch('./php/forget.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // 送出內容轉成JSON送出
            body: JSON.stringify({
                EMAIL: userMail.value,
            }),
        })
            // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
            .then(resp =>  resp.json())   
            .then(body => {
                //body也不可以console
                const { successful, NAME, TOKEN_str } = body;
                if (successful == true) {
                    // 當畫面上沒有紅P時，插入紅P，按鈕不可按
                    if ($('.password_reset').has($('#cdTime')).length == 0) {
                        $('#hint').after(`<p style="color:red;" id="cdTime">系統已將信件寄出，若沒有收到信件，請等待<span id="sss"></span>秒後再試，謝謝。 </p>`)
                        $('#send_mail').disabled = true;
                        mail_cd();
                        send_forgetEmail(userMail.value, NAME, TOKEN_str);
                        sAlert("重設密碼的信件已送出", "success", "確定");
                    }
                } else {
                    $('label[for="userMail"]').html("<h5>電子郵件<span>*e-mail未註冊過</span></h5>");
                }
            })
    }
})

// 設定秒數，倒數
var cd = 300;
function mail_cd() {
    if (cd > 0) {
        $('#sss').text(cd);
        // console.log(cd);
        setTimeout(mail_cd, 1000);
        cd -= 1;
    } else {
        $('#cdTime').remove();
        $('#send_mail').disabled = false;
        cd = 300;
    }
}

// EmailJS
function send_forgetEmail(forgetEmail, forgetName, TOKEN){
    emailjs.init('abHautzLicXP7SnzL');

    const serviceID = 'shikaservice105';
    const templateID = 'template_9cu1gex';
    var templateParams = {
        to_email: forgetEmail,
        from_name: "shika牧場",
        to_name: `${forgetName}`,
        url_forget: `https://tibamef2e.com/tfd105/g6/password_reset_2.html?${TOKEN}`,
    }

    emailjs.send(serviceID, templateID,templateParams ,"abHautzLicXP7SnzL")
    
        .then(() => {
        console.log("send email");
            // alert('Sent!');
        }, (err) => {
            console.log(JSON.stringify(err));
        });
}

// 忘記密碼時，送出驗證信end ==========================================================
// ============郵遞區號============
// const twzipcode = new TWzipcode(".twzipcode");

let twzip = new TWzipcode('#twzipcode');

// ==========郵遞區號END============
// AJAX 登入=========================

let login_btn = document.querySelector("#login_btn");
let msg_box = document.querySelector("#msg_box");
login_btn.addEventListener('click', function (e) {
    e.preventDefault();
    let userMail = document.querySelectorAll('.userMail')[0];
    let PWD = document.querySelector('#password');
    
    if(userMail != "" && PWD != ""){
        let url = './php/Login.php';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // 送出內容轉成JSON送出
            body: JSON.stringify({
                Mail: userMail.value,
                Password:PWD.value,
            }),
        })
       
            // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
            .then(resp =>  resp.json())   
            .then(body => {
                //body也不可以console
                const { successful, message, ID, NAME } = body;
                if (successful) {
                    sessionStorage.setItem("login",JSON.stringify({login:successful,NAME:NAME,ID:ID}));
                        sAlert(`${NAME}，歡迎回到Sìkha牧場`, "success", "確認");
                        $("#login_box").addClass("-off");
                        $("#back_bg").addClass("-off");
   
                } else {
                    sAlert(message, "error", "確認")
                }
            })
    }
    
})


// AJAX 登入 END========================
// 頁面切換 =====================================
// 登入註冊切換
$(".member-icon").on("click", function (e) {
    e.preventDefault();
    // TODO: 檢查是否有登入
    fetch('./php/check_login.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    })
        .then(resp =>  resp.json())   
        .then(body => {
            const { successful, message, ID, NAME } = body;
            if(successful){
                location.href = './member.html';
            }else{
                $("#login_box").removeClass("-off");
                $("#back_bg").removeClass("-off");
            }
        })
});

$('.loginBlock').on("click", function (e) {
    // 註冊按鈕
    if (e.target.classList.contains("register_link")) {
        $(".toggle-links").attr("style","display:none;");
        $('#login_form').addClass("form-off");
        $("#register1").removeClass("form-off");
    }

    // 忘記密碼link
    if (e.target.classList.contains("forget_link")) {
        $(".toggle-links").attr("style","display:none;");
        $('#login_form').addClass("form-off");
        $(".password_reset").removeClass("form-off");
    }

    // 註冊完成
    if (e.target.classList.contains("register_done")) {
        $("#login_box").addClass("-off");
        $('#back_bg').addClass("-off");
        $("#register3").addClass("form-off");
    }

})


//==== 彈窗關閉 ====

$('.bi-x').on('click', function (e) {
    $("#login_box").addClass("-off");
    $("#back_bg").addClass("-off");
    $("#login_form").removeClass("form-off");
    $("#login_form").removeClass("form-off");
    $("#register1").addClass("form-off");
    $("#register2").addClass("form-off");
    $("#register3").addClass("form-off");
    $(".password_reset.forget-password").addClass("form-off");
    $(".toggle-links").removeAttr("style","display:none;");
    $(".shikaBlock").removeAttr("style","display:none;");
});

$("#back_bg").on('click', function () {
    $("#login_box").addClass("-off");
    $("#back_bg").addClass("-off");
    $("#login_form").removeClass("form-off");
    $("#register1").addClass("form-off");
    $("#register2").addClass("form-off");
    $("#register3").addClass("form-off");
    $(".password_reset.forget-password").addClass("form-off");
    $(".toggle-links").removeAttr("style","display:none;");
    $(".shikaBlock").removeAttr("style","display:none;");
});
// 頁面切換 end=============================
// Sweetalert套件 ===================================
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

// Sweetalert套件 end =================================
