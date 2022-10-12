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
    
    const sortLowest=(arr,arr1, obj,arr2,i)=>{
        if(arr2.length==i){
            return arr2;
        }else{
            if(arr1.length == 1){
                if(arr1[0].storage[0][0][1]<obj.storage[0][0][1]){
                    obj = arr1[0];
                };
                arr2.push(obj);
                let index = arr.indexOf(obj);
                arr.splice(index,1);
                return sortLowest(arr,arr,arr[0],arr2,i);
            }else{
                if(arr1[0].storage[0][0][1]<obj.storage[0][0][1]){
                    obj=arr1[0];
                };
                return sortLowest(arr,arr1.slice(1),obj,arr2,i);
            }
        };
    };
    const sortOffer = (arr,arr1,obj,arr2,i)=>{
        if(arr2.length == i){
            return arr2;
        }else{
            if(arr1.length == 1){
                if(arr1[0].rating>obj.rating){
                    obj = arr1[0];
                };
                arr2.push(obj);
                let index = arr.indexOf(obj);
                arr.splice(index,1);
                return sortOffer(arr,arr,arr[0],arr2,i);
            }else{
                if(arr1[0].rating>obj.rating){
                    obj = arr1[0];
                };
                return sortOffer(arr,arr1.slice(1),obj,arr2,i);
            }
        }
    };
    const hotCel=(arr,arr1,obj,arr2,i)=>{
        if(arr2.length == i){
            return arr2;
        }else{
            if(arr1.length == 1){
                if(arr1[0].soled > obj.soled){
                    obj = arr1[0];
                };
                arr2.push(obj);
                let index = arr.indexOf(obj);
                arr.splice(index,1);
                return hotCel(arr,arr,arr[0],arr2,i);
            }else{
                if(arr1[0].soled>obj.soled){
                    obj=arr1[0];
                };
                return hotCel(arr,arr1.slice(1),obj,arr2,i);
            }
        }
    };
    
    
    //Hot Celling
    $.getJSON("data/data.json",function(data){
        const showTop =(obj)=>{
            $('#top').attr('src',obj.image[0]);
            $('#top').attr('alt',arrSelling.indexOf(obj));
            $('#top-title').text(obj.title);
            $('#top-size').text(obj.display_size);
            $('#storage').empty();
            obj.storage.forEach(element=>{
                for(let key in element){
                    $('#storage').append(`<p class="h5 fw-bold btn btn-outline-primary" style="width: 100px;">${element[key][0]}</p>`)
                }
            });
            $('#top-extra').text((obj.storage[0][0][1]*1.1).toLocaleString());
            $('#top-price').text("VND "+obj.storage[0][0][1].toLocaleString());
            $('#top-rating').empty();
            for(let i =0; i< obj.rating;i++){
                $('#top-rating').append(`<i class="fa-sharp fa-solid fa-star" style="color: #FFC700; font-size: 2.3rem;"></i>`);
            };
            $('#top-rating').append(`<span class="ms-3 fw-bold">${obj.soled}</span>`);
        };
        const img_change=()=>{
            let img_top= $('#top').attr('src');
            // let img_alt = $('#top').attr('alt');
            $('.img_hov2').on('mouseenter',function(event){
                    $(event.currentTarget).addClass('img-active');
                }).on('mouseleave',function(event){
                        $(event.currentTarget).removeClass('img-active');
                }).on('click',function(event){
                    $(event.currentTarget).attr('src',img_top);
                    // $(event.currentTarget).attr('alt',img_alt);
                    let index = $(this).attr('alt');
                    showTop(arrSelling[index]);
            });
        };
        let data_phone = [];
        $.each(data,function(key,val){
             data_phone=data[key];
        });
        let arrSelling=[];
        hotCel(data_phone,data_phone,data_phone[0],arrSelling,5);
        showTop(arrSelling[0]);
        for(let i= 1; i< arrSelling.length;i++){
            $('#top-list').append(`<img src="${arrSelling[i].image[0]}" alt="${i}" class="img_hov2" style="height: 120px; width: 100px;">`);
        };
        img_change();
    });
    //Best Budget
    $.getJSON( "data/data.json", function( data ) {
        let data_phone = [];
            $.each( data, function( key, val ) {
                data_phone = data[key];
            });

        let arrBestBudget=[];
        sortLowest(data_phone,data_phone,data_phone[0],arrBestBudget,8);
        
        let i = 0;
        for(i;i< 4;i++){
            $('#best_budget').append(`<div class="card mx-4 border-light img_hov animate__animated " id="i${i}"><img src="${arrBestBudget[i].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title ">${arrBestBudget[i].title}</h5><p class="card-text text-danger fs-5">VND ${arrBestBudget[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
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
                    $('#best_budget').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInRight" id="i${i}"><img src="${arrBestBudget[i].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestBudget[i].title}</h5><p class="card-text text-danger fs-5">${arrBestBudget[i].storage[0][0][1]}</p></div></div>`);
                }
            }else{
                $('#best_budget').empty();
                let a = i+ 3;
                i--;
                for(i; i< a;i++){
                    $('#best_budget').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInRight" id="i${i}"><img src="${arrBestBudget[i].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestBudget[i].title}</h5><p class="card-text text-dange fs-5r">${arrBestBudget[i].storage[0][0][1]}</p></div></div>`);
                }
            };
            hover_div();
        });
        $('#scrLeft').on('click',function(event){
            event.preventDefault();
            i--;
            if(i<4){
                i = arr.length;
                $('#best_budget').empty();
                let a = i-4;
                for(a; a<i;a++){
                    $('#best_budget').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInLeft" id="i${a}"><img src="${arrBestBudget[a].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestBudget[a].title}</h5><p class="card-text text-danger fs-5">${arrBestBudget[a].storage[0][0][1]}</p></div></div>`);
                }
            }else{
                $('#best_budget').empty();
                let a = i-3;
                for(i = 0; i< a;i++){
                    $('#best_budget').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInLeft" id="i${i}"><img src="${arrBestBudget[i].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestBudget[i].title}</h5><p class="card-text text-danger fs-5">${arrBestBudget[i].storage[0][0][1]}</p></div></div>`);
                }
            }
            hover_div();
        });
    });
    //Best Offer
    $.getJSON( "data/data.json", function( data ) {
        let data_phone = [];
            $.each( data, function( key, val ) {
                data_phone = data[key];
            });
        let arrBestOffer =[];
        sortOffer(data_phone,data_phone,data_phone[0],arrBestOffer,8);
        let j = 0;
        for(j; j< 4;j++){
            // let col2 = Math.round(Math.random()*(999999-99999)+99999);
            $('#best_offer').append(`<div class="card mx-4 border-light img_hov animate__animated " id="j${j}"><img src="${arrBestOffer[j].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestOffer[j].title}</h5><p class="card-text text-danger fs-5">VND ${arrBestOffer[j].storage[0][0][1].toLocaleString()}</p></div></div>`);
        };
        hover_div();
        $('#scrRight2').on('click',function(event){
            event.preventDefault();
            j++;
            if(j>arr.length){
                $('#best_offer').empty();
                j = 0;
                let a= j+4;
                for(j; j< a;j++){
                    $('#best_offer').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInRight" id="j${j}"><img src="${arrBestOffer[j].image[0]}" alt=""  class="card-img" ><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestOffer[j].title}</h5><p class="card-text text-danger fs-5">VND ${arrBestOffer[j].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }else{
                $('#best_offer').empty();
                let a = j+ 3;   
                j--;
                for(j; j< a;j++){
                    $('#best_offer').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInRight" id="j${j}"><img src="${arrBestOffer[j].image[0]}" alt=""  class="card-img" ><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestOffer[j].title}</h5><p class="card-text text-danger fs-5">VND ${arrBestOffer[j].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            };
            hover_div();
        });
        $('#scrLeft2').on('click',function(event){
            event.preventDefault();
            j--;
            if(j<4){
                j = arr.length;
                $('#best_offer').empty();
                let a = j-4;
                for(a; a<j;a++){
                    $('#best_offer').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInLeft" id="j${a}"><img src="${arrBestOffer[a].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestOffer[a].title}</h5><p class="card-text text-danger fs-5">VND ${arrBestOffer[a].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }else{
                $('#best_offer').empty();
                let a = j-3;
                for(j = 0; j< a;j++){
                    $('#best_offer').append(`<div class="card mx-4 border-light img_hov animate__animated animate__backInLeft" id="j${a}"><img src="${arrBestOffer[a].image[0]}" alt=""  class="card-img"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 70%;display:none;"><h5 class="card-title">${arrBestOffer[a].title}</h5><p class="card-text text-danger fs-5">VND ${arrBestOffer[a].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }
            hover_div();
        });
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
        let x;
        switch(filer){
            case "lt1mil":
                x = 1000000;
                break;
            case "lt5mil":
                x= 5000000;
                break;
            case "lt10mil":
                x= 10000000;
                break;
            case "lt15mil":
                x= 15000000;
                break;
            case "lt20mil":
                x= 20000000;
                break;
            default:
                x= "greater than";
                break;
        };
        return x;
    }
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
        fill = rangeFil($('input[name="filter"]:checked').val());
        console.log($('input[name="filter"]:checked').val());
    });
    //Check if it save fil value
    $('.sortfilter').on('click',function(event){
        console.log(fil);
        console.log(typeof fil);
    });

})