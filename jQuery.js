currentmap =""

$(document).ready(function () {
    if (currentmap != "commons"){
        loadCommons()
    }




    //listen for account creation button.
    $('#userAccount').click(function () { // submit input form on submit button click
        $("#login_popup_modal").css("display", "block")
    })
    $('#svg_id').click(function () { // submit input form on submit button click
        console.log("hi")
    })

    
    
    //listen for screen resize event
    
    $(window).resize(function() {
        // This will execute whenever the window is resized
        console.log("height: ", $(window).height(), " width: ", $(window).width(), " change overmap height in handInputData@!") // New height
        //if ($(window).height() > 700){
            let newHeight = ($(window).height()-10)
            $("#map").height(newHeight)
            $("#overmap").height(newHeight)
            document.querySelector("body").style.overflow = "hidden";
            //}
        });

    console.log($('#svg_id'))
})