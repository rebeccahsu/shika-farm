//目前頁面亮燈
let pages = document.querySelector(".aside_ul").querySelectorAll("h5");
pages.forEach(function (page) {
    if (page.innerHTML == "訂單管理") {
        page.closest("a").classList.add("-on");
    }
});

new Vue({
    el: '#app',
    data: {
        // orderDetils: [
        //     {
        //         ORDER_ID: '13',
        //         UNIT_PRICE: '1331',
        //         QUANTITY: '13',
        //     },
        // ],

        orderDetails: [],
    },
    created() {
        const params = new URLSearchParams(location.search);
        let id = params.get('id');
        fetch('./php/back_order_detail.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { id: id }
            ),
        })
            .then(res => res.json())
            .then(res => this.orderDetails = res)
    },

});





