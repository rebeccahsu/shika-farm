import Splide from '@splidejs/splide';

new Splide( '#splide_01' ).mount();

        document.addEventListener('DOMContentLoaded', function () {
            var main_1 = new Splide('#splide_01', {
                type: 'loop',
                rewind: true,
                pagination: false,
                arrows: true,
                // fixedHeight: 500,
                padding: { bottom: 10 },
            });
        });