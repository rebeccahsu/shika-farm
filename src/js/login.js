
$('#back_bg').on('click', function (e) {
    closebg(this);
})

$('.bi-x').on('click', function (e) {
    closebg(this);
});

$('#login_box').on('click', function (e) {
    e.stopPropagation();
})


function closebg(t) {
    // console.log(t);
    $('#back_bg').remove();
}

// ============郵遞區號============
// $('.twzipcode').twzipcode();
// $('#twz').twzipcode({
//     language: 'lang/zh-tw' //不需加上 .js
//   });

//   $('#twz').twzipcode('set', {
//     'county': '臺北市',
//     'district': '信義區',
//     'zipcode': 110
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

// document.addEventListener('click',function(e){
//     console.log(e.target);
// })

// document.addEventListener('click',closebg(this))