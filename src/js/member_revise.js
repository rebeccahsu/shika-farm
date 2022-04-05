// $('#city')

$.ajax({
	url: "../JSON/city.json",
	method: "GET",
	success: function (res) {
		// console.log(res);
		for (let i = 0; i < res.length; i++) {
			$("#city").append(`
                <option value="${res[i].name}">${res[i].name}</option>
            `);

			$("select#city").on("change", function () {
				for (let j = 0; j < res[i].districts.length; j++) {
                    
					let city = $('#city :selected').val();
    
                   
                   
					if(city == res[i].name) {
                        console.log(res[j].districts)

					    $('#area').append(`
					    <option>${res[j].districts.name}</option>
					    `)
					}
				}
			});
		}
		// $("select#city").on("change", function () {
		// 	console.log(res);
		//     for (let i = 0; i < res.length; i++) {

		//     }

		// 	// for (let i = 0; i < res.length; i++) {
		// 	// 	for (let j = 0; j < res[i].length; j++) {
		// 	// 		$("#area").append(`
		//     //             <option>${res[i][j].name}</option>
		//     //         `);
		// 	// 	}
		// 	// }
		// });
	},
});


var el =document.querySelector('.ch_pw');
el.addEventListener('click' ,function(e){
e.preventDefault();
console.log('test');
},false);