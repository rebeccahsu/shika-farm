// const { json } = require("is_js")
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
  // console.log(this)
  $('.tab[data-id="' + tab_id + '"]').show()
})



//會員資料回傳
let usercity = ''

$.ajax({
  url: "./php/member.php",
  method: "GET",
  dataType: 'json',
  async: false,
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




//Tab3 詳細訂單
//詳細產品下拉按鈕
function open_detail(ID) {
  // console.log(ID);
  fetch("./php/mb_order_detail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: ID,
    })
  })
    .then((res) => res.json())
    .then((res) => {
      $('#li' + ID).children().remove()
      $('#li' + ID).slideToggle()
      // console.log(res);
      $('#li' + ID).append("<ul class='detail' style='list-style-type: none;>");
      for (let i = 0; i < res.length; i++) {
        $('#li' + ID).append("<li>" + res[i].NAME + " " + res[i].QUANTITY + '件' + " " + 'NT$' + res[i].UNIT_PRICE + "</li>");
      }
      $('#li' + ID).append("</ul>");
    });
}

function cancel_btn(ID) {
  fetch('./php/mb_orderCancel.php', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: ID,
    })
  })
    .then((res) => res)
    .then((res) => {
      $(document).on('click', function (e) {
        if ($(e.target).hasClass('cel_list_btn')) {
          let btnVal = $(e.target).val();
          $(`#sort${btnVal}`).find('td:nth-child(6)').text('已取消')
        }
      })
    });
}

// $('#op_btn').on('click', function (e) {
//   console.log("aaa");

//   console.log('1')
//   $('#li3').slideToggle()
//    console.log('2')

// })

//取消訂單

// $('.cel_list_btn').on('click', function () {
//   if (confirm("確定取消訂單?")) {
//     // $('.cl_d').hide()
//     $('#li2').hide()

//   }
// })

//會員資訊修改
// 1.先準備要送去後端的資料
// let userInfo = {
//   email: $('#mbEmail').text(),
//   city: $('#city option:selected').text(),
//   area: $('#area option:selected').text(),
//   address: $('#address').val(),
//   tel: $('#mb_tel').val(),
//   // 新密碼舊密碼
//   newpd: $('#newpd').val(),
//   // oldpd: $('#oldpd').val(),
// }


//登出按鈕

$('#logout').on('click', function () {
  sessionStorage.clear();
  $.ajax({
    url: './php/logout.php',
    method: "POST",
    success: function (data) {
      if (data == '登出成功') {
        Swal.fire({
          title: `<h5>登出成功！</h5><p>即將自動跳轉回首頁</p>`,
          icon: 'success',
          showConfirmButton: false, // 確認按鈕（預設會顯示不用設定)
          showCancelButton: false, // 取消按鈕
          buttonsStyling: false, // 是否使用sweetalert按鈕樣式（預設為true）
      })
        setTimeout(() => {
          location.href = 'index.html';
        }, 1000)
        
      }
    }

  })
});

//確認修改按鈕
// let userid = JSON.parse(sessionStorage.getItem("login")).ID;

$('#confirmBtn').on('click', function () {
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

  $.ajax({
    url: './php/memberupdate.php',
    method: "POST",
    data: JSON.stringify({
      userinfo: userInfo,
    }),
    success: function (data) {
      // console.log(data);
      if(data == 'true'){
        sAlert(`<h5>已成功修改會員資料！</h5>`, 'success', 'OK');
      }else{
        sAlert(`<h5>沒有需儲存的修改內容！</h5>`, 'info', 'OK');
      }
    }

  })
});


fetch("./php/mb_orderActive.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({
  //   memberID: JSON.parse(sessionStorage.getItem('login')).ID,
  // })
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      $('#act_list').append(`
        <div class="act_list co">
          <h3 class="act_date">${res[i].DATE}</h3>
          <h4 class="act_title">${res[i].NAME}</h4>
          <p class="act_time">預約時間 : ${res[i].SESSION} 預約人數 : ${res[i].ATTENDANCE}</p>
          <button class="cancel_btn" value="${i}">取消行程</button>
        </div>
      `)
    }
  })
//Tab2 預約欄位取消預約
$(document).on('click', ".cancel_btn", function (e) {
  let cBtnCount = $(".cancel_btn").length;
  let cArr = [];
  let flag = true;

  if ($(e.target).hasClass('cancel_btn')) {
    for (let i = 0; i < cBtnCount; i++) {
      $(e.target).closest('.act_list').find('.cancel_btn').css({ 'background-color': 'gray', 'border': 'none'});
      $(e.target).closest('.act_list').find('.cancel_btn').text("已取消");
    }
    console.log($(e.target).closest('.act_list').find('.cancel_btn').val())
  }

})



// 取得訂單資訊
// $.ajax({
//   url:"./php/mb_list.php",
//   method:"POST",
//   data:JSON.stringify({
//         memberID: JSON.parse(sessionStorage.getItem('login')).ID,
//   }),

//   success:function(res){console.log(res)},
//   error:function(err){console.log(err)},
// });

fetch("./php/mb_list.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({
  //   memberID: JSON.parse(sessionStorage.getItem('login')).ID,
  // })
})
  .then((res) => res.json())
  .then((res) => {
    // console.log(res);
    let tr_row = "";
    for (let i = 0; i < res.length; i++) {
      tr_row += "<tr class='li2' id='sort" + i + "'>";
      tr_row += "<td>" + res[i].ORDER_DATE + "</td>";
      tr_row += "<td id='orderID'>" + res[i].ID + "</td>";
      tr_row += "<td>" + res[i].quantity + "</td>";
      tr_row += "<td>" + res[i].TOTAL + "</td>";
      tr_row += "<td>" + res[i].PAYMENT + "</td>";
      tr_row += "<td>" + res[i].LOGISTICS_STATE + "</td>";
      tr_row += "<td><button class='cel_list_btn' onclick='cancel_btn(" + res[i].ID + ")' value='" + (2 * parseInt(i) + 1) + "'>取消訂單</button>";
      tr_row += "<button id='op_btn' onclick='open_detail(" + res[i].ID + ")'>+</button></td>";
      tr_row += "</tr>";
      tr_row += "<tr class='li3' id='li" + res[i].ID + "' style='display:none;'>";
      tr_row += "</tr>";
    }

    $("#li2").append(tr_row);
    // if ($('#li2').find('td:nth-child(6)').text() == '已取消') {
    //   // alert('訂單已取消');
    //   // $('#li2').find('td:nth-child(6)').closest('tr').remove();
    // }
  })
  .then((res) => {
    let tr = $("tr");
    // console.log(tr.length);
    // console.log($('#li2').find(`tr:nth-child(1) td:nth-child(6)`).text());
    // console.log($('#li2').find(`tr:nth-child(3) td:nth-child(6)`).text());
    for (let i = 1; i < tr.length; i += 2) {
      let cancel = $('#li2').find(`tr:nth-child(${i}) td:nth-child(6)`).text();
      if (cancel == '已取消' && $('.cel_list_btn').val() == i) {
        $('#li2').find(`tr:nth-child(${i}) .cel_list_btn`).css('background-color', 'gray')
      }
    }
  });



