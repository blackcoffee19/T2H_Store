//Fetch Json data

$(document).ready(function(){
    $('.ls1').on('mouseenter',function(event){
        $(event.currentTarget).removeClass('text-bg-dark').addClass('text-bg-light');
        $(event.currentTarget).children().removeClass('text-white-50').addClass('text-dark');
    }).on('mouseleave',function(event){
        $(event.currentTarget).removeClass('text-bg-light').addClass('text-bg-dark');
        $(event.currentTarget).children().removeClass('text-dark').addClass('text-white-50');
    });
    $('.nav-link').on('mouseenter', function(event){
        $(event.currentTarget).addClass('bg-light').addClass('text-dark');
        if($('#product_list').css('display')=="block" && !$(this).hasClass('products_link')){
            $('#product_list').slideUp();
        }
    }).on('mouseleave',function(event){
        $(event.currentTarget).removeClass('bg-light').removeClass('text-dark');
    }).on('click',function(event){
        $(event.currentTarget).siblings().removeClass('bg-orange');
        $(event.currentTarget).addClass('bg-orange');
    });
    $('.products_link').hover(function(event){
        if($('#product_list').css('display') == 'none'){
            $('#product_list').slideDown();
        };
    });
    $('#product_list').on('mouseleave',function(event){
        $('#product_list').slideUp();
    });
    $('.nav-spec').on('click',function(event){
        $(event.currentTarget).parents().siblings().find('.bg-orange').removeClass('bg-orange');
    });
    $('input[name="search"]').on('focus',function(event){
        event.preventDefault();
        $('.search-bar').css({width: "300px"});
        $(this).css('backgroundColor',"#fff");
    }).on('blur',function(event){
        $('.search-bar').css({width: "200px"});
        $(this).css('backgroundColor',"#1A1A1A");
    });
    const arr = [
        {title: "Title1",price: 1000000},
        {title: "Title2",price: 1000000},
        {title: "Title3",price: 1000000},
        {title: "Title4",price: 1000000},
        {title: "Title5",price: 1000000},
        {title: "Title6",price: 1000000},
        {title: "Title7",price: 1000000},
        {title: "Title8",price: 1000000},
    ];
    $('.img_hov2').on('mouseenter',function(event){
        $(event.currentTarget).addClass('img-active');
    }).on('mouseleave',function(event){
        $(event.currentTarget).removeClass('img-active');
    });
    let i = 0;
    let j = 0;
    for(i; i< 4;i++){
        let col = Math.round(Math.random()*(999999-99999)+99999);
        $('#best_budget').append(`
        <div class="card mx-4 img_hov animate__animated " id="i${i}">
        <img src="" alt=""  class="card-img" style="background-color: #${col};">
        <div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;">
        <h5 class="card-title text-white">${arr[i].title}</h5>
        <p class="card-text text-danger">${arr[i].price}</p></div></div>`);
    };
    for(j; j< 4;j++){
        let col2 = Math.round(Math.random()*(999999-99999)+99999);
        $('#best_offer').append(`<div class="card mx-4 img_hov animate__animated " id="j${j}"><img src="" alt=""  class="card-img" style="background-color: #${col2};"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
    };
    hover_div();
    $('#scrRight').on('click',function(event){
        event.preventDefault();
        i++;
        if(i>arr.length){
            $('#best_budget').empty();
            i = 0;
            let a= i+4;
            for(i; i< a;i++){
                let col = Math.round(Math.random()*(999999-99999)+99999);
                $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="i${i}"><img src="" alt=""  class="card-img" style="background-color: #${col}; "><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title text-white">${arr[i].title}</h5><p class="card-text text-danger">${arr[i].price}</p></div></div>`);
            }
        }else{
            $('#best_budget').empty();
            let a = i+ 3;
            i--;
            for(i; i< a;i++){
                let col = Math.round(Math.random()*(999999-99999)+99999);
                $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="i${i}"><img src="" alt=""  class="card-img" style="background-color: #${col}; "><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title text-white">${arr[i].title}</h5><p class="card-text text-danger">${arr[i].price}</p></div></div>`);
            }
        };
        hover_div();
    });
    $('#scrLeft').on('click',function(event){
        event.preventDefault();
        i--;
        if(i>arr.length){
            i = arr.length;
        }else if(i<4){
            i = arr.length;
            $('#best_budget').empty();
            let a = i-4;
            for(a; a<i;a++){
                let col = Math.round(Math.random()*(999999-99999)+99999);
                $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInLeft" id="i${a}"><img src="" alt=""  class="card-img" style="background-color: #${col};"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%; display:none;"><h5 class="card-title text-white">${arr[a].title}</h5><p class="card-text text-danger">${arr[a].price}</p></div></div>`);
            }
        }else{
            $('#best_budget').empty();
            let a = i-3;
            for(i = 0; i< a;i++){
                let col = Math.round(Math.random()*(999999-99999)+99999);
                $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInLeft" id="i${i}"><img src="" alt=""  class="card-img" style="background-color: #${col};"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%; display:none;"><h5 class="card-title text-white">${arr[i].title}</h5><p class="card-text text-danger">${arr[i].price}</p></div></div>`);
            }
        }
        hover_div();
    });
    $('#scrRight2').on('click',function(event){
        event.preventDefault();
        j++;
        if(j>arr.length){
            $('#best_offer').empty();
            j = 0;
            let a= j+4;
            for(j; j< a;j++){
                let col2 = Math.round(Math.random()*(999999-99999)+99999);
                $('#best_offer').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="j${j}"><img src="" alt=""  class="card-img" style="background-color: #${col2};"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
            }
        }else{
            $('#best_offer').empty();
            let a = j+ 3;   
            j--;
            for(j; j< a;j++){
                let col2 = Math.round(Math.random()*(999999-99999)+99999);
                $('#best_offer').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="j${j}"><img src="" alt=""  class="card-img" style="background-color: #${col2};"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
            }
        };
        hover_div();
    });
    $('#scrLeft2').on('click',function(event){
    event.preventDefault();
    j--;
    if(j>arr.length){
        j = arr.length;
    }else if(j<4){
        j = arr.length;
        $('#best_offer').empty();
        let a = j-4;
        for(a; a<j;a++){
            let col2 = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_offer').append(`<div class="card mx-4  img_hov animate__animated animate__backInLeft" id="j${a}"><img src="" alt=""  class="card-img" style="background-color: #${col2};"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title text-white">${arr[a].title}</h5><p class="card-text text-danger">${arr[a].price}</p></div></div>`);
        }
    }else{
        $('#best_offer').empty();
        let a = j-3;
        for(j = 0; j< a;j++){
            let col2 = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_offer').append(`<div class="card mx-4 img_hov animate__animated animate__backInLeft" id="j${j}"><img src="" alt=""  class="card-img" style="background-color: #${col2};"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
        }
    }
    hover_div();
    });
    function hover_div(){
        $('.img_hov, .img_hov>div').hover(function(event){
            $(event.currentTarget).addClass('card-active');
            $(event.currentTarget).find('.card-img-overlay').show();
        }).on('mouseleave',function(event){
            $(event.currentTarget).removeClass('card-active');
            $(event.currentTarget).find('.card-img-overlay').hide();
    
        });
    }
    // List Item
    const rangeFil =(filer)=>{
        switch(filer){
            case "lt1mil":
                return 1000000;
                break;
            case "lt5mil":
                return 5000000;
                break;
            case "lt10mil":
                return 10000000;
                break;
            case "lt15mil":
                return 15000000;
                break;
            case "lt20mil":
                return 20000000;
                break;
            default:
                return "greater than";
                break;
        }
    }
    arr.forEach(element=>{
        let col3 = Math.round(Math.random()*(999999-99999)+99999);
        // console.log(col3);
        $('#list_product').append(`<div class="card mx-3 mb-3 p-0 shadow rounded" style="width:150px;height:200px;"><img src="" class="h-100 w-100 rounded" style='background-color: #${col3};'></div>`);
    });
    let checkSort = [];
    $('input[name="sort"]').on('click', function(){
        let checks = [];
        $('input[name="sort"]:checked').each(function(){
            checks.push($(this).val());
        });
        console.log(checks);
        checkSort = checks.copyWithin();
    });
    //Check if it save checked value
    $('.sortfilter').on('mouseenter',function(event){
        checkSort.forEach(el=>{
            console.log(el);
        })
    });
    let fill="";
    $('input[name="filter"]').on('click',function(event){
        fil = rangeFil($('input[name="filter"]:checked').val());
        console.log($('input[name="filter"]:checked').val());
    });
    //Check if it save fil value
    $('.sortfilter').on('click',function(event){
        console.log(fil);
        console.log(typeof fil);
    });

    // let data;
    // function loadDoc() {
    //     const xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function() {
    //       if (this.readyState == 4 && this.status == 200) {
    //         data = JSON.parse(this.responseText);
    //         console.log(data);
    //       }
    //     };
    //     xhttp.open("GET", "http://127.0.0.1:5500/Test/data/data.json");
    //     xhttp.send();
    // }
    // loadDoc();
    //console.log(data);

    // fetch("http://127.0.0.1:5500/Test/data/data.json").then(res=>{
    //     res.json()
    // }).then(data => {
    //     console.log(typeof data);
    // })
    var items = [];
    $.getJSON( "data/data.json", function( data ) {
        $.each( data, function( key, val ) {
            items.push(val);
            console.log(key+" "+val);
        });
    });
    console.log(items);
})