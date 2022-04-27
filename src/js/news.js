new Vue({
    el: '#app',
    data: {
        // items: [
        //     {
        //         TITLE: '1313131313',
        //         DATE: '1/13',
        //         IMG: './img/activity/deercookie.jpg',
        //     },
        // ],
        items: [],
    },
    mounted() {
        fetch('./php/news.php')
            .then(res => res.json())
            .then(res => this.items = res)
    },
    methods: {
        itemInfo(e) {
            let targetId = $(e.target).closest('div').data('id');
            console.log(targetId);
            location.href = `./news_in.html?news_id=${targetId}`;
        },
    },
});