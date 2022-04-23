

//tab切換效果
let mb_btn = $('.mem_btn')   //先選擇BTN 三個CLASS必須一樣才能使用
mb_btn.eq(0).addClass('on')  //選到第一個BTN加上CLASS EQ0第的一個
let tab =$('.tab')           //同第一
tab.hide()                   //隱藏全部
tab.eq(0).show()             //顯示第一個內容
mb_btn.on('click',function(){  //綁定按鈕事件
  mb_btn.removeClass('on')       //先移除全部class 當點btn後 this會顯示當前的btn
  $(this).addClass('on')
  tab.hide()                   //準備換別頁面//點及後會先隱藏隱藏內容
  let tab_id =$(this).attr('id')   //為了得到那個id
  // console.log(tab_id)
  $('.tab[data-id="'+ tab_id+ '"]').show()
})




//Tab1會員修改-地址欄位
 
$.ajax({
  url: "JSON/city.json",
	method: "GET",
    success: function (res) {
      function state(a) {
        for (let i = 0; i < res[a].districts.length; i++) {
          //console.log(res[a].districts[i].name)
          $("#area").append(
            "<option value=" +
              res[a].districts[i].name +
              ">" +
              res[a].districts[i].name +
              "</option>"
          );
        }
      }
      // 初始畫面的縣市呈現
      $.each(res, function (index, ele) {
        // console.log(index);
        $("#city").append(
          "<option value=" + res[index].name + ">" + res[index].name + "</option>"
        );
      });
      // 改變縣市
      $("#city").on("change", function () {
        //console.log($(this).children("option:selected").val());
        var num = $(this).children("option:selected").val();
        $("#area").find("option").remove();
        state(num); //num 是縣市的索引值  state是縣市區域的函式
      });
    }
});




//會員資料回傳

let userid = 'wang_mien@gmail.com' 

$.ajax({
  url: "./php/member.php",
  method: "POST",
  dataType: 'json', 
  data: {
    id: userid
  },
  success: function(data){
    $('#mbName').text(data[0].NAME)
    $('#mbEmail').text(data[0].EMAIL)
    if($('#city option:selected').val() == 000) {
      $('#city option:selected').text(data[0].COUNTRY)
    }
    if($('#area option:selected').val() == 000) {
      $('#area option:selected').text(data[0].DISTRICT)
    }

    $('#address').val(data[0].STREET)

    $('#mb_tel').val(data[0].PHONE)
  }

})




//密碼欄位取消a連結預設
var el = document.querySelector('.ch_pw');
el.addEventListener('click', function (e) {
	e.preventDefault();
	console.log('test');
	$('.mb_pw').show()
});

// 把修改密碼輸入框display:block

var el =document.querySelector('.ch_pw');
el.addEventListener('click' ,function(e){
e.preventDefault();
console.log('test');
});


//Tab2 預約欄位取消預約



$('.cancel_btn').on('click',function(){
  if(confirm("確定取消預約?")){
   $('.act_list').remove()
  }
})

//Tab3 詳細訂單

//詳細產品下拉按鈕
$('#op_btn').on('click',function(){
  console.log('1')
  $('#list_dt').slideToggle()
  console.log('2')

})

//取消訂單

$('.cel_list_btn').on('click',function(){
  if(confirm("確定取消訂單?")){
   $('.cl_d').hide()
  }
})



