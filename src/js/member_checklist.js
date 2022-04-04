$('#op_btn').on('click',function(){
    console.log('1')
    $('#list_dt').slideToggle()
    console.log('2')

})


$('.cel_list_btn').on('click',function(){
    if(confirm("確定取消預約?")){
     $('#cl_d').hide()
    }
 })