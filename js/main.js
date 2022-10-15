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
    
    const showTopInfo =(obj,arr,arr_origanize)=>{
        $('#top').attr('src',obj.image[0]);
        $('#top').attr('alt',arr_origanize.indexOf(obj));
        $('#top-title').text(obj.title);
        $('#top-size').text(obj.display_size);
        $('#storage').empty();
        obj.storage.forEach(element=>{
            for(let key in element){
                $('#storage').append(`<p class="h5 fw-bold btn btn-outline-primary" style="width: 100px;">${element[key][0]}</p>`)
            }
        });
        let price = (obj.sales != 0)?$('#top-extra').text((obj.storage[0][0][1]*(1+obj.sales)).toLocaleString()):$('#top-extra').text("");
        let sale = (obj.sales != 0)? $('#top-sales').text(obj.sales*100+"%"):$('#top-sales').text("");
        $('#top-price').text("VND "+obj.storage[0][0][1].toLocaleString());
        $('#top-rating').empty();
        for(let i =0; i< obj.rating;i++){
            $('#top-rating').append(`<i class="fa-sharp fa-solid fa-star" style="color: #FFC700; font-size: 2.3rem;"></i>`);
        };
        $('#top-rating').append(`<span class="ms-3">${obj.soled}</span>`);
        $('#top-link').attr('href',`#!detail/:id=${arr_origanize.indexOf(obj)}`);
    };
    const showImg = (arr,arr_origanize,index = 0)=>{
        let arr_clone = [...arr];
        showTopInfo(arr_clone[index],arr,arr_origanize);
        arr_clone.splice(index,1);
        $('#top-list').empty();
        for(let i =0; i< arr_clone.length;i++){
            let ind = arr.indexOf(arr_clone[i]);
            $('#top-list').append(`<img src="${arr_clone[i].image[0]}" alt="${ind}" class="img_hov2" style=";">`);
        };
        $('.img_hov2').on('mouseenter',function(event){
                $(event.currentTarget).addClass('img-active');
            }).on('mouseleave',function(event){
                    $(event.currentTarget).removeClass('img-active');
            }).on('click',function(event){
                let index = $(this).attr('alt');
                showImg(arr,arr_origanize,index);
        });
    };
    const loadAndMoveList = (arr,content)=>{
        let place,btnRight,btnLeft;
        switch(content){
            case "best_budget":
                place = $('#best_budget');
                btnLeft = $('#scrLeft');
                btnRight = $('#scrRight');
                break;
            case "best_offer":
                place =$('#best_offer');
                btnLeft = $('#scrLeft2');
                btnRight = $('#scrRight2');
                break;
        };
        let i = 0;
        for(i;i< 4;i++){
            place.append(`<div class="card mx-auto border-light img_hov animate__animated" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
        };
        hover_div();
        btnRight.on('click',function(event){
            event.preventDefault();
            i++;
            if(i>=arr.length){
                place.empty();
                i = 0;
                let a= i+4;
                for(i; i< a;i++){
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInRight" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }else{
                place.empty();
                i--;
                let a = i+ 4;
                for(i; i<a;i++){
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInRight" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            };
            hover_div();
        });
        btnLeft.on('click',function(event){
            event.preventDefault();
            i--;
            if(i<=3){
                place.empty();
                let a = arr.length;
                i = a-4;
                for(i; i<a;i++){
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInLeft" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }else{
                place.empty();
                i=0;
                for(i; i< 4;i++){
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInLeft" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }
            hover_div();
        });
    };
    $.getJSON( "data/data.json", function( data ) {
        let data_phone = [];
            $.each( data, function( key, val ) {
                data_phone = data[key];
            });
        //Hot Celling
        let data_phone3 = [...data_phone];
        let arrSelling=[];
        hotCel(data_phone3,data_phone3,data_phone3[0],arrSelling,5);
        showImg(arrSelling,data_phone);
        //Best Budget
        let data_phone1 = [...data_phone];
        let arrBestBudget=[];
        sortLowest(data_phone1,data_phone1,data_phone1[0],arrBestBudget,8);
        loadAndMoveList(arrBestBudget,'best_budget');
        //Best Offer
        let data_phone2 = [...data_phone];
        let arrBestOffer =[];
        sortOffer(data_phone2,data_phone2,data_phone2[0],arrBestOffer,8);
        loadAndMoveList(arrBestOffer,'best_offer');
        let data_phone4= [...data_phone];
        detailSmall(data_phone4);
        $( window ).resize(function(){
            $('#inffo').hide();
            detailSmall(data_phone4);
        });
        
    });
    let detsm = `<div class="card col-12 mb-3 mx-3 w-100 inffo animate__animated" style="display:none;position: relative;">
        <div class="row g-0 h-100 w-100 animate__animated animate__flipInX">
        <div class="col-md-4 col-lg-4 h-100 inffo-img">
            <a class="get-detail"><img src="" alt="" class="img-fluid rounded-start h-100 detailsm-img"></a>
        </div>
        <div class="col-md-8 col-lg-8 detailsm">
         <div class="card-body w-100">
            <p class="h2 card-title text-center mt-4 mb-5 title"></p>
            <form>
                <div class="form-check form-check-inline w-100 row phone-gb" style="height:fit-content"></div>
                <p style="margin-left:50px">Color</p>
                <div class="form-check form-check-inline w-100 row phone-color" style="height: fit-content"></div>
                <p class="text-center price1"></p>
                <p class="h3 text-danger text-center price2"></p>
                <div class="mx-auto mb-4 phone-start" style="height:fit-content"></div>
                <div class="d-flex flex-row justify-content-center w-100 mb-3" style="height:fit-content;">
                <button class="btn btn-outline-orange detailsmATC mx-4" style="position:relative" ><i class="fa-solid fa-cart-shopping fs-3"></i></button>
                <button class="btn btn-outline-orange" style="position:relative">Add to Compare</button>
                </div>
            </form>
         </div>
        </div>
        <button class="btn btn-light close" style="position: absolute;top:10px; right:10px; width:40px;"><i class="fa-sharp fa-solid fa-xmark fs-4"></i></button>
    </div>
    </div>`;
    const showdtsm=(obj,index)=>{
        $('.detailsm-img').attr('src',obj.image[1]);
        $('.get-detail').attr('href',`#!detail/:id=${index}`);
        $('.title').text(obj.title);
        $('.phone-gb').children().remove();
        obj.storage.forEach(element=>{
            for (let key in element) {
                $('.phone-gb').append(`<input type="radio" class="btn-check " name="storage" id="storage${key}" autocomplete="off"><label class="btn btn-outline-primary col-2 mx-lg-3 mx-md-1 mb-md-1" for="storage${key}">${element[key][0]}</label>`);
            }
        });
        $('.phone-color').children().remove();
        obj.colors.forEach(element=>{
            $('.phone-color').append(`<input type="radio" class="btn-check " name="color" id="color${index}" autocomplete="off"><label class="btn btn-outline-orange col-2 mx-lg-3 mx-md-1 mb-md-1" for="color${index}">${element}</label>`)
        });
        $('.price1').html(`<del class="fs-5">${(obj.storage[0][0][1]*(1+obj.sales)).toLocaleString()}</del>${obj.sales*100}%`);
        $('.price2').html("VND "+obj.storage[0][0][1].toLocaleString());
        $('.phone-start').children().remove();
        for(let i =0; i< obj.rating;i++){
            $('.phone-start').append(`<i class="fa-sharp fa-solid fa-star" style="color: #FFC700; font-size: 2rem;"></i>`);
        };
        $('.phone-start').append(`<span class="ms-3">${obj.soled}</span>`);
    }
    const detailSmall =(arr)=>{
        $('#list_product').empty();
        let width = $(window).width();
        let k =1; 
        for(let i =0; i< arr.length;i++){
            $('#list_product').append(`<div class="card col-md-4 col-lg-3 mx-auto mb-3 p-0 border-0" ><img src="${arr[i].image[0]}" alt="${i}" class="h-100 w-100 rounded shadow" ></div>`);
            if(width>=1024&&k%4 == 0){
                $('#list_product').append(detsm);
            }else if((width<1024 && width >=767)&&k%3==0){
                $('#list_product').append(detsm);
            }else if(k == arr.length){
                $('#list_product').append(detsm);
            };
            k++;
        };
        $('#list_product').children().on('click',function(event){
            let ind  = $(this).find('img').attr('alt');  
            let div;
            if(((width>=1024) && ind<4)||((width<1024 && width>=767) && ind <3)){
                div = $('.inffo').eq(0);
            }else if(((width>=1024) &&ind<8)||((width<1024 && width>=767) && ind <6)){
                div = $('.inffo').eq(1);
            }else if(((width>=1024) &&ind<12)||((width<1024 && width>=767) && ind <9)){
                div = $('.inffo').eq(2);
            }else{
                div = $('.inffo').eq(3);
            };
            div.parent().find('.inffo').hide();
            if(div.css('display') == 'none'){
                div.slideDown();
            }
            showdtsm(arr[ind],ind);
        });
        // $('.close').on('click',function(){
        //     $('.inffo').hide();
        // })        
    };

    
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
        console.log(fill);
        console.log(typeof fill);
    });

})