var button = document.querySelector('.cancel_btn');
        var showtxt = document.querySelector('.show');
        function popup2(e) {
            window.confirm('確認取消本次預約嗎?');
            if (confirm('ConfirmBox測試成功嗎') == true) {
                showtxt.innerHTML = 'Yes，測試成功';
            } else {
                showtxt.innerHTML = '您已取消確認';
            }

        };
        button.addEventListener('click', popup2);