$(document).ready(function(){
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');
});

function loginViaJs() {
    $.ajax({
        url: 'login_via_js',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify( { "username": $('#username').val(), "last-name": $('#password').val() } ),
        processData: false,
        success: function( data, textStatus, jQxhr ){
            console.log( JSON.stringify( data ) );
            window.location = data.redirectUrl
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    return true;
}

function loadAvatar() {
    $.ajax({
        url: 'get_user_image',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        processData: false,
        success: function( data, textStatus, jQxhr ){
            console.log( data );
            $("#avatar").attr("src", data.pwdImg);
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

