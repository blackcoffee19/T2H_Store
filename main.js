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
    }).on('mouseleave',function(event){
        $(event.currentTarget).removeClass('bg-light').removeClass('text-dark');
    }).on('click',function(event){
        $(event.currentTarget).toggleClass('bg-orange');
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
    $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated " id="i${i}"><img src="" alt=""  class="card-img" style="background-color: #${col}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[i].title}</h5><p class="card-text text-danger">${arr[i].price}</p></div></div>`);
};
for(j; j< 4;j++){
    let col2 = Math.round(Math.random()*(999999-99999)+99999);
    $('#best_offer').append(`<div class="card mx-4 img_hov animate__animated " id="j${j}"><img src="" alt=""  class="card-img" style="background-color: #${col2}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
};
$('#scrRight').on('click',function(event){
    event.preventDefault();
    i++;
    if(i>arr.length){
        $('#best_budget').empty();
        i = 0;
        a= i+4;
        for(i; i< a;i++){
            let col = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="i${i}"><img src="" alt=""  class="card-img" style="background-color: #${col}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[i].title}</h5><p class="card-text text-danger">${arr[i].price}</p></div></div>`);
        }
    }else{
        $('#best_budget').empty();
        let a = i+ 3;
        i--;
        for(i; i< a;i++){
            let col = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="i${i}"><img src="" alt=""  class="card-img" style="background-color: #${col}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[i].title}</h5><p class="card-text text-danger">${arr[i].price}</p></div></div>`);
        }
    };
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
            $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInLeft" id="i${a}"><img src="" alt=""  class="card-img" style="background-color: #${col}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[a].title}</h5><p class="card-text text-danger">${arr[a].price}</p></div></div>`);
        }
    }else{
        $('#best_budget').empty();
        let a = i-3;
        for(i = 0; i< a;i++){
            let col = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_budget').append(`<div class="card mx-4 img_hov animate__animated animate__backInLeft" id="i${i}"><img src="" alt=""  class="card-img" style="background-color: #${col}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[i].title}</h5><p class="card-text text-danger">${arr[i].price}</p></div></div>`);
        }
    };
});
$('#scrRight2').on('click',function(event){
    event.preventDefault();
    j++;
    if(j>arr.length){
        $('#best_offer').empty();
        j = 0;
        a= j+4;
        for(j; j< a;j++){
            let col2 = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_offer').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="j${j}"><img src="" alt=""  class="card-img" style="background-color: #${col2}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
        }
    }else{
        $('#best_offer').empty();
        let a = j+ 3;   
        j--;
        for(j; j< a;j++){
            let col2 = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_offer').append(`<div class="card mx-4 img_hov animate__animated animate__backInRight" id="j${j}"><img src="" alt=""  class="card-img" style="background-color: #${col2}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
        }
    };
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
            $('#best_offer').append(`<div class="card mx-4  img_hov animate__animated animate__backInLeft" id="j${a}"><img src="" alt=""  class="card-img" style="background-color: #${col2}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[a].title}</h5><p class="card-text text-danger">${arr[a].price}</p></div></div>`);
        }
    }else{
        $('#best_offer').empty();
        let a = j-3;
        for(j = 0; j< a;j++){
            let col2 = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_offer').append(`<div class="card mx-4  animate__animated animate__backInLeft" id="j${j}"><img src="" alt=""  class="img_hov card-img" style="background-color: #${col2}; width: 150px; height: 220px;"><div class="card-img-overlay bg-light bg-opacity-10 h-50" style="margin-top: 70%;"><h5 class="card-title text-white">${arr[j].title}</h5><p class="card-text text-danger">${arr[j].price}</p></div></div>`);
        }
    };
    });
    $('.img_hov').on('mouseenter',function(event){
        $(event.currentTarget).addClass('card-active');
    }).on('mouseleave',function(event){
        $(event.currentTarget).removeClass('card-active');
    });
})