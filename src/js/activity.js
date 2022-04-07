
new Vue({
    el: '#app',
    data() {
        return {
            modal_open: null,
            activeIndex: 0,
            period: null,
            all_data:

                [
                    {
                        title: 'sheep',
                        button_bg: '#FF8671',
                        list: [
                            {
                                name: '0',
                                title: '餵羊喝ㄋㄟㄋㄟ',
                                image: './img/activity/drink.jpg',
                                desc: '每日限量100罐營養好喝的ㄋㄟㄋㄟ，憑門票可兌換一罐，每張門票限兌換一罐，喜歡綿羊的大朋友小朋友請把握機會，跟綿羊更親近。',
                                data: ['3/11', '3/13'],

                            },
                            {
                                name: '0',
                                title: '剃羊毛秀',
                                image: './img/activity/fur.jpg',
                                icon_img: './img/activity/sheep1.png',
                                desc: '想知道服裝織品中常見的羊毛，最開始的原型是什麼樣子嗎？讓我們專業的剃羊毛技師為你們揭開這層面紗，攜手一探究竟吧。',
                                data: ['3/11', '3/13'],
                                time_period: ["09:00-10:00", "14:00-15:00"],
                                remain: '8',
                            },
                            {
                                name: '0',
                                title: 'DIY ㄋㄟㄋㄟ 肥皂 ',
                                image: './img/activity/soap.jpg',
                                icon_img: './img/activity/soap_icon.png',
                                desc: '喜歡洗澡嗎 ? 簡單三步驟就能讓你完成屬於自己的肥皂 ，讓Sìkha肥皂滲透你的肌膚，享受肌膚絲緞般的觸感，自用送禮兩相宜，還不快來體驗！ ',
                                data: ['3/11', '3/13'],
                                time_period: ["9:00-10:30", "13:00-14:30", "15:00-16:30"],
                                remain: '2',
                                reserve: '點我預約'
                            }
                        ]
                    },
                    {
                        title: 'deer',
                        button_bg: '#16B1AA',
                        list: [
                            {
                                name: '1',
                                title: '餵食吃仙貝',
                                image: './img/activity/deercookie.jpg',
                                desc: '到Sìkha牧場憑門票即可兌換鹿仙貝一包，請可愛的小鹿們吃仙貝小點心，留下美好的回憶！',
                                data: ['3/11', '3/13']
                            },
                            {
                                name: '1',
                                title: '小鹿相見歡',
                                image: './img/activity/playwithdeer.jpg',
                                desc: '大朋友小朋友趕快來Sìkha牧場與可愛親人的梅花鹿近距離互動，並拍照留下紀念吧!',
                                data: ['3/11', '3/13'],
                            },

                        ]
                    },
                    {
                        title: 'alpaca',
                        button_bg: '#FECC55',
                        list: [
                            {
                                name: '2',
                                title: '草泥馬散步秀',
                                image: './img/activity/alpacawalk.jpg',
                                icon_img: './img/activity/alpaca1.png',
                                desc: '跟著草泥馬在遼闊的草原，與和煦陽光的陪伴下，踏著慵懶的步伐，一同遠離塵囂，享受著屬於你我間的怡然時光吧。',
                                data: ['3/11', '3/13'],
                                time_period: ["9:00-10:00", "11:00-12:00", "14:00-15:00"],
                                remain: '5',
                                reserve: '點我預約'
                            },
                            {
                                name: '2',
                                title: '餵草泥馬',
                                image: './img/activity/alpacaeat.jpg',
                                icon_img: '',
                                desc: '想與草泥馬近距離接觸嗎？這就是你最好的機會，趕快一起來Sìkha牧場餵可愛的草泥馬吃草吧！',
                                data: ['3/11', '3/13']
                            }

                        ]
                    },
                    {
                        title: 'cow',
                        button_bg: '#FF8671',
                        icon_image: '',
                        list: [
                            {
                                name: '3',
                                title: '乳牛吃飽飽',
                                image: './img/activity/eatfresh.jpg',
                                icon_img: '',
                                desc: '來到Sìkha牧場，就可以憑門票兌換一把草，可以更近一步的跟可愛的乳牛互動餵牠吃草吃到飽！！',
                                data: ['3/11', '3/13']
                            },
                            {
                                name: '3',
                                title: '擠ㄋㄟㄋㄟ',
                                image: './img/activity/milkmaker.jpg',
                                icon_img: './img/activity/cow1.png',
                                desc: '幫乳牛媽媽擠ㄋㄟㄋㄟ，讓小朋友們知道，原來牛奶是從這裡來的呢！。透過工作人員教學說明後，我們可以親手擠出白色的牛奶，配合乳牛媽媽的生理時間，提供每日３個場次可以體驗喔！',
                                data: ['3/11', '3/13'],
                                time_period: ["9:00-9:30", "10:00-10:30", "14:00-14:30"],
                                remain: '3',
                                reserve: '點我預約'
                            },
                            {
                                name: '3',
                                title: 'DIY ㄋㄟㄋㄟ 餅乾',
                                image: './img/activity/makecookie.jpg',
                                icon_img: './img/activity/cookie_icon.png',
                                desc: '奶味香濃的餅乾大人小孩都喜歡！但有親手做過餅乾嗎？Sìkha牧場提供新鮮牛奶讓各位大朋友小朋友來這親手製作出香濃可口的ㄋㄟㄋㄟ餅乾 ! ? 簡單三步驟就能讓你完成屬於自己的肥皂 ，讓Sìkha肥皂滲透你的肌膚，享受肌膚絲緞般的觸感，自用送禮兩相宜，還不快來體驗！ ',
                                data: ['3/11', '3/13'],
                                time_period: ["9:00-10:30", "13:00-14:30", "15:00-16:30"],
                                remain: '9',
                                reserve: '點我預約'
                            }
                        ]
                    },
                    {
                        title: 'pig',
                        button_bg: '#16B1AA',
                        icon_image: '',
                        list: [
                            {
                                name: '4',
                                title: '小豬賽跑',
                                image: './img/activity/pigrun.jpg',
                                icon_img: './img/activity/pig1.png',
                                desc: '看穿著號碼衣的小豬們，翹著屁股碰碰跳跳的向前賽跑，觀賽前可以先將自己神聖的一票投給喜歡的小豬，比賽結束後，若您投的小豬是冠軍，就可獲得牧場的驚喜小禮物呦！',
                                data: ['3/11', '3/13'],
                                time_period: ["9:00-9:30", "10:00-10:30", "11:00-11:30"],
                                remain: '6',
                                reserve: '按我預約'
                            },
                            {
                                name: '4',
                                title: '小豬相見歡',
                                image: './img/activity/playwithpig.jpg',
                                icon_img: '',
                                desc: '想和可愛的小豬們成為朋友嗎？快來和牠們一起無憂無慮地拍照玩耍，感受小豬們歡樂的氣氛吧！',
                                data: ['3/11', '3/13'],
                            },
                        ]
                    },
                    {
                        title: 'horse',
                        button_bg: '#FECC55',
                        icon_image: '',
                        list: [
                            {
                                name: '5',
                                title: '我要當牛仔',
                                image: './img/activity/riding.jpg',
                                icon_img: './img/activity/horse1.png',
                                desc: '無論你是大朋友小朋友、初學者，都可以安心做牛仔！* 身高 90 公分以下且與陪同成人體重相加總重不超過 80 公斤的兒童可以與成人一起乘坐。',
                                data: ['3/11', '3/13'],
                                time_period: ["9:00-10:00", "11:00-12:00", "15:00-16:00"],
                                remain: '5',
                                reserve: '按我預約'
                            },
                            {
                                name: '5',
                                title: '馬術秀',
                                image: './img/activity/horseshow.jpg',
                                icon_img: './img/activity/horse1.png',
                                desc: '由專業的騎士親自演出，在駿馬馬背上站立、翻騰、跳躍，甚至是高難度的射箭。精彩的馬術秀絕對不容錯過，快來一睹馬兒們的神勇風采吧。',
                                data: ['3/11', '3/13'],
                                time_period: ["13:00-14:00", "15:00-16:00"],
                                remain: '2',
                                reserve: '按我預約'
                            },
                        ]
                    },
                ]
        }
    },
    mounted() {
        //ajax
    },
    methods: {
        open(data) {
            //console.log(data);
            this.modal_open = data
        },
        close() {
            this.modal_open = null
        },

        //game
        gameEntrance() {
            if ($(window).scrollTop() > 50) {
                $(".game").addClass('show');
            } else {
                $(".game").removeClass('show');
            }
        }
    }
});

window.addEventListener("scroll", function () {
    app.gameEntrance();
});