new Vue ({
    el: '#indexNewsApp',
    data: {
        newslist: [
            {date: '2022.03.15', title: '4.2 - 4.5 歡慶兒童節 帶小孩來牧場放電囉'},
            {date: '2022.03.12', title: '你我一起防疫大作戰'},
            {date: '2022.01.27', title: '2022春節營運時間及票價優惠'},
        ],
    }  
})

new Vue ({
    el: '#indexActivity',
    data: {
            activities: [
                    {IMG: './img/activity/alpacawalk.jpg', NAME: '陪草泥馬散步'},
                    {IMG: './img/activity/pigrun.jpg', NAME: '小豬賽跑'},
                    {IMG: './img/activity/riding.jpg', NAME: '我要當牛仔'},
                ],
    },
    // data: {
    //     activities: [], //準備一個陣列來抓資料 (如果資料是物件這裡就寫物件)
    // },
    // mounted() {
    //     fetch('./php/index.php')
    //     .then(res => res.json())
    //     .then(res => this.activities = res)
    //     //   .then(res => console.log(res))
    // },  
})

gsap.to('.sun', {
    duration: 15,
    rotation: 360,
    repeat: -1,
    // repeatRefresh: true,
});

gsap.to( ['.top-cloud1', '.top-cloud3', '.cloud5', '.cloud7'], {
    repeat: -1,
    repeatRefresh: true,
    keyframes: [
        { duration: 2, x: 10, y: 12},
        { duration: 2, x: 0, y: 0},
    ]
});

gsap.to( ['.top-cloud2', '.top-cloud4', '.cloud6'], {
    repeat: -1,
    repeatRefresh: true,
    keyframes: [
        { duration: 3, x: -10, y: 18},
        { duration: 2, x: 0, y: 0},
    ]
});

// const t6 = gsap.timeline({
//     defaults: {
//       duration: .6,
//     },
//   });
  
// t6.to('.top-horse', { x: '5%', })
//     .to('.top-sheep', { x: '5%', })
//     .to('.top-cow', { x: '-5%' });

// t6.to('.top-deer', { x: '5%' })
//     .to('.top-alpaca', { x: '-5%' });

// gsap.to('.top-pig', { x: '-5%', });

// --------- Carousel ------------
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });

//==== parrallax.js ====

let scenes = [];
let scenesSelector = document.querySelectorAll('.p_scene');
for( let i = 0; i < scenesSelector.length; i++ ){
    scenes[i] = new Parallax(scenesSelector[i]);
};