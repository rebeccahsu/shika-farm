// ========== 結帳步驟一 ==========
new Vue({
    el:'.stepA',
    data:{
        images:{
            strawberry: '../img/porducts/strawberry.png',
            coffee: '../img/porducts/coffee.png',
            papaya: '../img/porducts/papaya.png',
            apple: '../img/porducts/apple.png',
            pannacotta: './img/porducts/panna_cotta.png',
            icecream: '../img/porducts/ice_cream.png',
            creamroll: '../img/porducts/cream_roll.jpg',
            cheesecake: '../img/porducts/cheese_cake.jpg',
            blanketg: '../img/porducts/blanket_g.jpg',
            blanketr: '../img/porducts/blanket_r.jpg',
            blankety: '../img/porducts/blanket_y.jpg',
            animalcookies: './img/porducts/animal_cookies.jpg'
        },
        products:[
            {info:'羊毛毯(綠)', price:'NT$ 499',quantity: 1, total:'NT$ 499', freight:'NT$ 0'},
        ],
    },
});
// ========== 結帳步驟二 ==========
// new Vue({
//    el:'.stepB',
//    data:{
//         images:{
//             strawberry: '../img/porducts/strawberry.png',
//             coffee: '../img/porducts/coffee.png',
//             papaya: '../img/porducts/papaya.png',
//             apple: '../img/porducts/apple.png',
//             pannacotta: './img/porducts/panna_cotta.png',
//             icecream: '../img/porducts/ice_cream.png',
//             creamroll: '../img/porducts/cream_roll.jpg',
//             cheesecake: '../img/porducts/cheese_cake.jpg',
//             blanketg: '../img/porducts/blanket_g.jpg',
//             blanketr: '../img/porducts/blanket_r.jpg',
//             blankety: '../img/porducts/blanket_y.jpg',
//             animalcookies: './img/porducts/animal_cookies.jpg'
//         },
//         products:[
//             {info:'羊毛毯(綠)', price:'NT$ 499', quantity: 1,total:'NT$ 499', freight:'NT$ 0'},
//         ],
//     },
// });