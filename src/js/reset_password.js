// const passwordRule = /^[\w_-]{4,16}$/;

// 驗證密碼格式
$('#reset_password').on('keyup', () => {
    let psd = $('#reset_password').val();
    // console.log(psd);
    if (psd.length < 4 || psd.length > 16) {
        $('label[for="reset_password"]').html("<h5>密碼<span>*密碼須為4~16字以內</span></h5>");
    } else if (psd.search(passwordRule) == -1) {
        $('label[for="reset_password"]').html("<h5>密碼<span>*請輸入半形的英文和數字</span></h5>");
    } else {
        // console.log('c');
        $('label[for="reset_password"]').html("<h5>密碼</h5>");
    }

})

$('#reset_repassword').on('blur', () => {
    if ($('#reset_password').val() !== $('#reset_repassword').val()) {
        $('label[for="reset_repassword"]').html("<h5>密碼確認<span>*和密碼不一致</span></h5>");
    } else {
        $('label[for="reset_repassword"]').html("<h5>密碼確認</h5>");
    }
})

// 重設密碼==========================================================================
$('#send_psd').on('click', (e) => {
    e.preventDefault();
    // console.log(e.target);
    // 驗證密碼
    let psd = $('#reset_password').val();
    let repsd = $('#reset_repassword').val()
    let reset_pwd = document.getElementsByClassName("password_reset_sendPWD")[0];
    let reset_comple = document.getElementsByClassName("reset_comple_form")[0];
    // console.log(psd);
    if (psd == "") {
        $('label[for="reset_password"]').html("<h5>密碼<span>*密碼須為4~16字以內</span></h5>");
    } else if (psd.search(passwordRule) == -1) {
        $('label[for="reset_password"]').html("<h5>密碼<span>*請輸入半形的英文和數字</span></h5>");
    } else if (repsd == "") {
        console.log('object');
        $('label[for="reset_repassword"]').html("<h5>密碼確認<span>*和密碼不一致</span></h5>");
    } else if (psd != repsd) {
        $('label[for="reset_repassword"]').html("<h5>密碼確認<span>*和密碼不一致</span></h5>");
    } else {
        // AJAX
        let newPassword = document.querySelector("#reset_repassword");
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
                    reset_pwd.remove();

                    // location.href = `./password_reset_3.html`;
                } else {
                    console.log(successful+' 訊息'+message);
                }
            })
            .then(reset_comple.classList.remove('form-off'))
    }
})
// 重設密碼end==========================================================================


// 關閉視窗轉跳頁面===============================

// 重設密碼完成
$('#psdReset_complete').on('click', (e) => {
    e.preventDefault();
    // console.log(e.target);
    // {前一步送出成功之後，維持登入狀態?}}
    gotoIndex();
    
})

// 黑背景
$('#back_bg').on('click', function (e) {
    gotoIndex();
})

// X按鈕
$('.bi-x').on('click', function (e) {
    gotoIndex();
});

function gotoIndex(){
    location.href = "./index.html";
}
