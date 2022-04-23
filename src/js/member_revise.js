const { json } = require("is_js")


//tab切換效果
let mb_btn = $('.mem_btn')   //先選擇BTN 三個CLASS必須一樣才能使用
mb_btn.eq(0).addClass('on')  //選到第一個BTN加上CLASS EQ0第的一個
let tab = $('.tab')           //同第一
tab.hide()                   //隱藏全部
tab.eq(0).show()             //顯示第一個內容
mb_btn.on('click', function () {  //綁定按鈕事件
  mb_btn.removeClass('on')       //先移除全部class 當點btn後 this會顯示當前的btn
  $(this).addClass('on')
  tab.hide()                   //準備換別頁面//點及後會先隱藏隱藏內容
  let tab_id = $(this).attr('id')   //為了得到那個id
  // console.log(tab_id)
  $('.tab[data-id="' + tab_id + '"]').show()
})

//會員資料回傳
let usercity = ''

$.ajax({
  url: "./php/member.php",
  method: "GET",
  dataType: 'json',
  async:false,
  success: function (data) {
    //console.log(data[0])

    $('#mbName').text(data[0].NAME)
    $('#mbEmail').text(data[0].EMAIL)
    $('#address').val(data[0].STREET)
    $('#mb_tel').val(data[0].PHONE)
    $('#area option:selected').text(data[0].DISTRICT)
    usercity = data[0].COUNTRY
  }
})


//Tab1會員修改-地址欄位

$.ajax({
  url: "./JSON/city.json",
  method: "GET",
  success: function (res) {
    // 初始畫面的縣市呈現
    $.each(res, function (index) {
      $("#city").append(
        "<option value=" + index + ">" + res[index].name + "</option>"
      );
    });

    // 改變縣市
    $("#city").on("change", function () {
      var num = $(this).children("option:selected").val();
      $("#area").find("option").remove();
      state(num); //num 是縣市的索引值  state是縣市區域的函式
    });

    $("#city").find("option:contains('" + usercity + "')").attr("selected", true);

    function state(idx) {
      for (let i = 0; i < res[idx].districts.length; i++) {
        $("#area").append(
          "<option value=" +
          res[idx].districts[i].name +
          ">" +
          res[idx].districts[i].name +
          "</option>"
        );
      }
    }
  }
});


//密碼欄位取消a連結預設
// var el = document.querySelector('.ch_pw');
// el.addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log('test');
//   $('.mb_pw').toggle()
// });

// 把修改密碼輸入框display:block

// var el = document.querySelector('.ch_pw');
// el.addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log('test');
// });


//Tab2 預約欄位取消預約



$('.cancel_btn').on('click', function () {
  if (confirm("確定取消預約?")) {
    $('.act_list').remove()
  }
})

//Tab3 詳細訂單

//詳細產品下拉按鈕
$('#op_btn').on('click', function () {
  console.log('1')
  $('#list_dt').slideToggle()
  console.log('2')

})

//取消訂單

$('.cel_list_btn').on('click', function () {
  if (confirm("確定取消訂單?")) {
    $('.cl_d').hide()
  }
})

//會員資訊修改
// 1.先準備要送去後端的資料
let userInfo = {
  email: $('#mbEmail').text(),
  city: $('#city option:selected').text(),
  area: $('#area option:selected').text(),
  address: $('#address').val(),
  tel: $('#mb_tel').val(),
  // 新密碼舊密碼
  newpd: $('#newpd').val(),
  // oldpd: $('#oldpd').val(),
}


//登出按鈕

$('#logout').on('click', function(){
  $.ajax({
    url: './php/logout.php',
    method: "POST",
    success: function (data) {
      if(data == '登出成功') {
        alert('登出成功');
        location.href = 'index.html'

      }
    }

  })
});

//確認修改按鈕
let userid = JSON.parse(sessionStorage.getItem("login")).ID;

$('#confirmBtn').on('click', function(){
  $.ajax({
    url: './php/logout.php',
    method: "POST",
    data:{
      id:userInfo,
    },
    success: function (data) {
      console.log(data);
    }

  })
});












//會員登出

// var express = require('express'),
//      router = express.Router();

// router.get('/', function(req, res) {
//   req.session.destroy();
//   res.redirect('/login');
// });

// module.exports = router;


