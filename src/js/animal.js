
const app = new Vue({
    el:'#wrapper',
    data:{
    activeIndex : 0,
    all_data:[
        {
        'title':'綿羊 Sheep',
        'desc': '綿羊稱為家羊或白羊，屬哺乳綱偶蹄目牛科羊亞科，是一種四足反芻哺乳動物，也是世界上數量最多的羊種，牠是最早被人類馴服為農業用途的動物之一，產物包括羊毛、羊肉和羊乳，其中羊毛是最普遍的動物纖維。',
        'image':'./img/animal/sheep_main.png',
        },
        {
        'title':'乳牛 Cow',
        'desc': '乳牛，是家牛的一個產奶品種。原產於德國荷斯登堡，現在已經遍及世界各地，身上分布著黑白斑狀花紋，它是主要的奶牛品種之一，年平均產奶量可達10,220公斤',
        'image':'./img/animal/cow_main.png',
        },
        {
        'title':'草泥馬 Alpaca',
        'desc': '草泥馬外形有點像綿羊，一般在高原生活，世界現有羊駝約300萬隻左右，90%以上生活在南美洲的祕魯及智利的高原上，其餘分佈於澳洲的維多利亞州和新南威爾斯州，以及紐西蘭。',
        'image':'./img/animal/alpaca_main.png',
        },
        {
        'title':'馬 Horse',
        'desc': '是一種草食性家畜。廣泛分布於世界各地，目前全球約有905個品種5,800萬匹馬，馬的成功馴化影響了人類的歷史進程。馬幫助人類建設城鎮、耕種土地、開拓疆域，曾是人類的主要運輸方式之一。',
        'image':'./img/animal/horse_main.png',
        },
        {
        'title':'迷你豬 Small-eared Pig',
        'desc': '盆腹豬是迷你豬的一種，是豬屆的小型豬種。他成長緩慢，最大體重50公斤左右。你們別看它50公斤已經很重了，其他品種的更重，一般普通的肉用豬能長到140~230公斤，',
        'image':'./img/animal/pig_main.png',
        },
        {
        'title':'鹿 Sika Deer',
        'desc': '梅花鹿棲地分佈於東亞，範圍從西伯利亞到韓國、中國東部吉林、台灣、越南、日本等。成鹿體長約1.5米。體重70到100公斤。毛色夏季為栗紅色，有許多白斑，狀似梅花；冬季為煙褐色，白斑不顯著。頸部有鬣毛。',
        'image':'./img/animal/deer_main.png',
        },
        
    ],
    },

    methods: {
        sheep(){
        if( $(window).innerWidth() >= 575.98 ){
            $("html, body").animate({
                scrollTop: $("#s_0").offset().top -70
            });
            }else{

            }
        },

        cow(){
        if( $(window).innerWidth() >= 575.98 ){
            $("html, body").animate({
                scrollTop: $("#s_1").offset().top -70
            });
            }else{

            }
        },

        alpaca(){
        if( $(window).innerWidth() >= 575.98 ){
            $("html, body").animate({
                scrollTop: $("#s_2").offset().top -70
            });
            }else{

            }
        },

        horse(){
        if( $(window).innerWidth() >= 575.98 ){
            $("html, body").animate({
                scrollTop: $("#s_3").offset().top-70
            });
            }else{

            }
        },

        pig(){
        if( $(window).innerWidth() >= 575.98 ){
            $("html, body").animate({
                scrollTop: $("#s_4").offset().top-70
            });
            }else{

            }
        },

        deer(){
        if( $(window).innerWidth() >= 575.98 ){
            $("html, body").animate({
                scrollTop: $("#s_5").offset().top -70
            });
            }else{

            }
        },
    }
});
