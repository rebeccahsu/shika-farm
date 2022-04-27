new Vue({
    el: '#app',
    data: {
        // items: [
        //     {
        //         TITLE: '13',
        //         DATE: '1331',
        //         DESCRIPTION: '131313131313131313131313131313',
        //     },
        // ],

        items: [],
    },
    created() {
        const params = new URLSearchParams(location.search);
        let id = params.get('news_id');
        fetch('./php/news_in.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { id: id }
            ),
        })
            .then(res => res.json())
            .then(res => {
                this.items = res
                console.log(res);
            })
    },
});





