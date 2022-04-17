
// 關閉按鈕和範圍==============

// $('#back_bg').on('click', function (e) {
//     closebg();
// })

// $('.bi-x').on('click', function (e) {
//     closebg();
// });

// $('#login_box').on('click', function (e) {
//     e.stopPropagation(e);
// })

// function closebg(t) {
//     // console.log(t);
//     $('#back_bg').remove();
// }

// 註冊完成、重設密碼完成
// $('#register_complete').on('click', (e) => {
//     e.preventDefault();
    // console.log(e.target);
    // {前一步送出成功之後，維持登入狀態?}}
//     closebg();
// })

// 關閉按鈕和範圍end
// ============================

// 驗證信箱格式
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

// 二次確認密碼
$('#repassword').on('blur', () => {
    if ($('#password').val() !== $('#repassword').val()) {
        $('label[for="repassword"]').html("<h5>密碼確認<span>*和密碼不一致</span></h5>");
    } else {
        $('label[for="repassword"]').html("<h5>密碼確認</h5>");
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


// 停止預設行為，切換內容
$('.forget').on('click', (e) => {
    e.preventDefault();
    console.log(e.target);
})

/*
$('#login_btn').on('click', (e) => {
    e.preventDefault();
    console.log(e.target);
})
*/

$('#FBlogin_btn').on('click', (e) => {
    e.preventDefault();
    console.log(e.target);
})

// 註冊會員連結
$('.register').on('click', (e) => {
    e.preventDefault();
    console.log(e.target);
})

// 註冊送出帳密=================================================================
$('#next').on('click', (e) => {
    e.preventDefault();
    let newPassword = document.querySelector("#register_password");
    let userMail = document.querySelector("#register_mail");
    
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
                console.log(successful +' 訊息' + message);
                sessionStorage.setItem("register",JSON.stringify({mail:userMail,password:newPassword}))

                // location.href = `./password_reset_3.html`;
            } else {
                $('label[for="register_mail"]').html("<h5>電子郵件<span>*e-mail已註冊過</span></h5>");
                console.log(successful + ' 訊息' + message);
            }
        })
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
                    console.log(successful +' 訊息' + message);
                    sessionStorage.removeItem("register");

                } else {
                    console.log(successful + ' 訊息' + message);
                }
            })
        }else{
        alert("還有欄位沒有寫唷！")
        console.log('有資料沒有寫');
    }
})

// 註冊送出詳細資料end=================================================
// 重設密碼==========================================================================
$('#send_psd').on('click', (e) => {
    e.preventDefault();
    // console.log(e.target);
    // 驗證密碼
    let psd = $('#password').val();
    let repsd = $('#repassword').val()
    // console.log(psd);
    if (psd == "") {
        $('label[for="password"]').html("<h5>密碼<span>*密碼須為4~16字以內</span></h5>");
    } else if (psd.search(passwordRule) == -1) {
        $('label[for="password"]').html("<h5>密碼<span>*請輸入半形的英文和數字</span></h5>");
    } else if (repsd == "") {
        console.log('object');
        $('label[for="repassword"]').html("<h5>密碼確認<span>*和密碼不一致</span></h5>");
    } else if (psd != repsd) {
        $('label[for="repassword"]').html("<h5>密碼確認<span>*和密碼不一致</span></h5>");
    } else {
        // AJAX
        let newPassword = document.querySelector("#repassword");
        let TOKEN_str = location.search.slice(1, 46);
        fetch('./php/password_reset.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // 送出內容轉成JSON送出
            body: JSON.stringify({
                PASSWORD: newPassword.value,
                TOKEN_str:TOKEN_str,
            }),
        })
            // 回應用json()轉回成JS物件   resp這行不可以{}換行,換行要記得return
            .then(resp =>  resp.json())   
            .then(body => {
                //body也不可以console
                const { successful, NAME, message } = body;
                if (successful == true) {
                    console.log(successful +'會員'+NAME +' 訊息'+message);
                    // location.href = `./password_reset_3.html`;
                } else {
                    console.log(successful+' 訊息'+message);
                }
            })
    }
})
// 重設密碼end==========================================================================

// 重設密碼完成
$('#psdReset_complete').on('click', (e) => {
    e.preventDefault();
    // console.log(e.target);
    // {前一步送出成功之後，維持登入狀態?}}
    location.href = "./index.html";
})

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
                    if ($('#password_reset').has($('#cdTime')).length == 0) {
                        $('#hint').after(`<p style="color:red;" id="cdTime">系統已將信件寄出，若沒有收到信件，請等待<span id="sss"></span>秒後再試，謝謝。 </p>`)
                        $('#send_mail').disabled = true;
                        mail_cd();
                        send_forgetEmail(userMail.value, NAME, TOKEN_str)
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
            testBtn.value = '送出';
            alert('Sent!');
        }, (err) => {
            testBtn.value = '送出';
            alert(JSON.stringify(err));
        });
}

// 忘記密碼時，送出驗證信end ==========================================================

// ============郵遞區號============
// const twzipcode = new TWzipcode(".twzipcode");
// twzipcode.destroy();
let twzip = new TWzipcode('#twzipcode');

// $('#twzipcode').twzipcode({
//     countyName: 'county', // 設定取得縣市的name
//     districtName: 'district', // 設定取得鄉鎮市區的name
//     zipcodeName: 'zipcode', // 設定取得郵遞區號的name
//     // onDistrictSelect: function () { console.log($('.zipcode').val()); },  //  選擇鄉鎮市區後執行
// });

/*
// Initialize
$(document).ready(function () {
    const twzipcode = new TWzipcode(".twzipcode");
    var county = $("select[name='county']").val();  // 取縣市的值
    var district = $("select[name='district']").val();  // 取鄉鎮市區的值
    var zipcode = $("select[name='zipcode']").val();  // 取郵遞區號的值

    let get = twzipcode.get();

    $('#twz').TWzipcode({
        //   css: ['', '', ''], // 套用自訂樣式，順序為縣市 / 鄉鎮市區 / 郵遞區號
        countyName: 'county', // 設定取得縣市的name
        districtName: 'district', // 設定取得鄉鎮市區的name
        zipcodeName: 'zipcode', // 設定取得郵遞區號的name
        countySel: '台北市', // 縣市預設值
        districtSel: '信義區', // 鄉鎮市區預設值
        zipcodeSel: '110', // 郵遞區號預設值
        hideCounty: [], // 隱藏縣市
        hideDistrict: [], // 隱藏鄉鎮市區
        detect: function (coords) { },  //  偵測用戶位置(需支援Google Geo Location API)
        onCountySelect: function () { },  //  選擇縣市後執行
        onDistrictSelect: function () { },  //  選擇鄉鎮市區後執行
        onZipcodeKeyUp: function () { }  //  輸入郵遞區號後執行
    });
});

*/

// ==========郵遞區號END============
// AJAX 登入=========================

let login_btn = document.querySelector("#login_btn");
let msg_box = document.querySelector("#msg_box");
login_btn.addEventListener('click', function (e) {
    e.preventDefault();
    let userMail = document.querySelectorAll('.userMail')[0];
    let PWD = document.querySelector('#password');
    console.log(userMail.value +' / '+ PWD.value);  //上線之前一定要刪掉
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
                    msg_box.innerHTML = `<p>${ID}</p><p>${NAME}</p><p>${message}</p>`;
                    
                } else {
                    alert(message);
                }
            })
    }
    
})


// AJAX 登入 END========================

