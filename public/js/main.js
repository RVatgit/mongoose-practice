$(document).ready(function(){
    $('.delete').on('click',(e)=>{
        var t=$(e.target);
        console.log(t);
        const id=$(t).attr('data-id');
        console.log(id);
        $.ajax({
            type:'DELETE',
            url:'/articles/'+id,
            success:res=>{
                alert('Deleting ');
                window.location.href='/';
            },
            error: err=>{
                 console.log("error ajax",err);
            }
        });
    });
});