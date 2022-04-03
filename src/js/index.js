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
            {img: 'img/activity/alpacawalk.jpg', title: '陪草泥馬散步'},
            {img: 'img/activity/pigrun.jpg', title: '小豬賽跑'},
            {img: 'img/activity/riding.jpg', title: '我要當牛仔'},
        ],
    }  
})

gsap.to('.sun', {
    duration: 15,
    rotation: 360,
    repeat: -1,
    // repeatRefresh: true,
});

gsap.to( ['.top-cloud1', '.top-cloud3'], {
    repeat: -1,
    repeatRefresh: true,
    keyframes: [
        { duration: 2, y: 10},
        { duration: 2, y: 0},
    ]
});

gsap.to( ['.top-cloud2', '.top-cloud4'], {
    repeat: -1,
    repeatRefresh: true,
    keyframes: [
        { duration: 3, y: 15},
        { duration: 2, y: 0},
    ]
});

const t6 = gsap.timeline({
    defaults: {
      duration: .6,
    },
  });
  
t6.to('.top-horse', { x: '5%', })
    .to('.top-sheep', { x: '5%', })
    .to('.top-cow', { x: '-5%' });

t6.to('.top-deer', { x: '5%' })
    .to('.top-alpaca', { x: '-5%' });

gsap.to('.top-pig', { x: '-5%', });
