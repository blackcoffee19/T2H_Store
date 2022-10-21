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
        $(event.currentTarget).siblings().removeClass('bg-white');
        $(event.currentTarget).addClass('bg-white');
        $(event.currentTarget).addClass('text-black');
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
        $(event.currentTarget).parents().siblings().find('.bg-white').removeClass('bg-white');
    });
    $('input[name="search"]').on('focus',function(event){
        event.preventDefault();
        $('.search-bar').css({width: "300px"});
        $(this).css({backgroundColor: "#fff"});
    }).on('blur',function(event){
        $('.search-bar').css({width: "200px"});
    });
    $('main').not('#cartpop').on('click',function(){
        $('#cartpop').slideUp('slow');
        $('.tb-body').empty();
    });
    $('.cartpopup').on('click',function(){
        console.log('OPEN');
        let table= $('.tb-body');
        if($('#cartpop').css('display') == 'block'){
            $('#cartpop').toggle();
            table.empty();
            console.log("OPEN1");
        }else{
            let json_st = localStorage.getItem('items');
            let cart = JSON.parse(json_st);
            if(cart !==null){
                listingCart(cart);
                changQuan();
                $('#cartpop').slideToggle();
                console.log("OPEN2");
            }else{
                $('#cartpop').slideToggle();
                table.append('<tr><td colspan="4">There is no item in cart</td></tr>');
              console.log("OPEN3");
            };
        }
        console.log("OPEN4");
    });
    let arr_json=localStorage.getItem('items');
    let arr = JSON.parse(arr_json);
    const dlive_item = (session)=>{
        $('#cart').empty();
        let sum= 0;
        for(let i = 0; i< session.length;i++){
            $('#cart').append(`<tr><td>${i+1}</td><td class='text-center'>${session[i].name}</td><td>${session[i].stg}</td><td>${session[i].clr}</td><td>${session[i].quantity}</td><td class='text-end text-danger'>${parseInt(session[i].price).toLocaleString()}</td><td><button class="text-danger btn"><i class="fa-solid fa-trash"></i></button></td></tr>`);
            sum += parseInt(session[i].price)*session[i].quantity;
        };
        $('.total-del').text(sum.toLocaleString());
        $('.del-item2').on('click',function(event){
            let index =$(event.currentTarget).parent().siblings().eq(0).text()-1;
            session.splice(index,1);
            let json_st2 = JSON.stringify(session);
            localStorage.setItem('items',json_st2);
            listingCart(session);
            changQuan();
            dlive_item();
            coutItem();
        })
    };
    dlive_item(arr);
    const coutItem = ()=>{
        let sesion= localStorage.getItem('items');
        if(sesion){
            let arr_js = JSON.parse(sesion);
            let count=0;
            arr_js.forEach(elemt=>{
                count += parseInt(elemt.quantity);
            });
            $('#cout').text(count);
        }else{
            $('#cout').text(0);
        }
    }
    coutItem();
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
    const sortHighestPrice=(arr,arr1, obj,arr2,i)=>{
        if(arr2.length==i){
            return arr2;
        }else{
            if(arr1.length == 1){
                if(arr1[0].storage[0][0][1]>obj.storage[0][0][1]){
                    obj = arr1[0];
                };
                arr2.push(obj);
                let index = arr.indexOf(obj);
                arr.splice(index,1);
                return sortLowest(arr,arr,arr[0],arr2,i);
            }else{
                if(arr1[0].storage[0][0][1]>obj.storage[0][0][1]){
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
            // place.append(`<div class="card mx-auto border-light img_hov animate__animated" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
            place.append(`<div class="card mx-auto border-light img_hov animate__animated d-flex flex-column justify-content-between shadow-card" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><a class="bg-black text-light text-decoration-none text-center fs-2" style="line-height:50px;z-index:1;" >More Info</a><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="top:120px;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
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
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInRight d-flex flex-column justify-content-between shadow-card" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><a class="bg-black text-light text-decoration-none text-center fs-2" style="line-height:60px" >More Info</a><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }else{
                place.empty();
                i--;
                let a = i+ 4;
                for(i; i<a;i++){
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInRight d-flex flex-column justify-content-between shadow-card" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><a class="bg-black text-light text-decoration-none text-center fs-2" style="line-height:60px" >More Info</a><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
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
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInLeft d-flex flex-column justify-content-between shadow-card" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><a class="bg-black text-light text-decoration-none text-center fs-2" style="line-height:60px" >More Info</a><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
                }
            }else{
                place.empty();
                i=0;
                for(i; i< 4;i++){
                    place.append(`<div class="card mx-auto border-light img_hov animate__animated animate__backInLeft d-flex flex-column justify-content-between shadow-card" id="i${i}"><img src="${arr[i].image[0]}" alt=""  class="card-img pt-4"><a class="bg-black text-light text-decoration-none text-center fs-2" style="line-height:60px" >More Info</a><div class="card-img-overlay bg-light bg-opacity-75 h-50" style="margin-top: 50%;display:none;"><h5 class="card-title">${arr[i].title}</h5><p class="card-text text-danger fs-5">VND ${arr[i].storage[0][0][1].toLocaleString()}</p></div></div>`);
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
        //Product list
        let url=window.location.href;
        let brand = url.split('=');
        let data_phone4= [...data_phone];
        switch(brand[1]){
            case "apple":
                $('main').css({
                    backgroundImage: 'url(image/apple-logo.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 100px',
                    backgroundAttachment: 'fixed',
                    backgroundSize : '40%',
                });
                data_phone4 = data_phone4.filter(e=>{
                    return e.brand == "Apple";
                });
            break;
            case "samsung":
                $('main').css({
                    backgroundImage: 'url(image/samsung_logo.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 250px',
                    backgroundAttachment: 'fixed',
                    backgroundSize : '50%',
                });
                data_phone4 = data_phone4.filter(e=>{
                    return e.brand == "Samsung";
                });
            break;
            case "oppo":
                data_phone4 = data_phone4.filter(e=>{
                    return e.brand == "Oppo";
                });
                break;
            case "huawei":
                $('main').css({
                    backgroundImage: 'url(image/huawei_logo.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 150px',
                    backgroundAttachment: 'fixed',
                    backgroundSize : '30%',
                });
                data_phone4 = data_phone4.filter(e=>{
                    return e.brand == "Huawei";
                });
                break;
            case "xiaomi":
                data_phone4 = data_phone4.filter(e=>{
                    return e.brand == "Xiami";
                });
                break;
            default:
                break;
        };
        detailSmall(data_phone4);
        $( window ).resize(function(){
            $('#inffo').hide();
            detailSmall(data_phone4);
        });

        //Sort sortPhone() line 378;
        let data_phone5=[...data_phone];
        $('input[name="sort"]').on('change',function(){
            let arr1 = [];
            $('input[name="sort"]:checked').each(function(){
                arr1.push($(this).val());
            }) 
            if(!$('input[name="sort"]:checked').val()){
                detailSmall(data_phone);
            }else{
                data_phone5 = sortPhone(data_phone5,arr1);
                detailSmall(data_phone5);
            };
        });
        //Filter 
        let data_phone6=[...data_phone];
        let click1= 0;
        $('input[name="filter"]').on('click',function(event){
            detailSmall(rangeFil(data_phone6,$('input[name="filter"]:checked').val()));
            if(click1==1){
                $(this).prop('checked',false);
                detailSmall(data_phone);
            }
            click1++;
        });

        //Search
        let data_phone7=[...data_phone];
        $('#search').on('keyup',function(event){
            let word = $(event.currentTarget).val().toLowerCase();
            let cpr1 = word.split(' ');
            let arr_search = data_phone7.filter(element=>{
                let til= element.title.toLowerCase().split(' ');
                return cpr1.every(el=>til.includes(el));
            });
            console.log(arr_search);
            if(arr_search.length == 0){
                $('#search-list').html(`<div class="col-12 " id="emty"><p>No phone matched</p></div>`)
            }else{
                $('#emty').empty();
            }
            var keycode = (event.keyCode ? event.keyCode : event.which);
	        if(keycode == '13'){
	        	detailSmall(arr_search);
	        }else{
                arr_search.forEach(element=>{
                    $('#search-list').append(`<div class="col-12 " style="height: 65px"><img src="${element.image[0]}" style="width: 50px;float:left;"><a class="d-inline text-decoration-none text-dark" style="font-size:1.1rem">${element.title}</a></div>`)
                });
            }
        }).on('blur',function(){
            $('#search-list').slideUp();
        }).on('focus',function(){
            $('#search-list').slideDown();
        });
        //PRODUCT_DETAIL
        let data_phone8 = [...data_phone];
        if($('main').children().hasClass('detaillg')){
            $('.detaillg').scrollTop(0);
            // $('main').css('height','100%');
            let indexProd = url.split('=')[1];
            $('.carousel-indicators').append(`<button type="button" data-bs-target="#slideImg" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`);
            $('.carousel-inner').append(`<div class="carousel-item active" data-bs-interval="10000"><img src="${data_phone8[indexProd].image[0]}" class="d-block w-100" alt="0"></div>`)
            for(let i = 1; i< data_phone8[indexProd].image.length;i++){
                $('.carousel-indicators').append(`<button type="button" data-bs-target="#slideImg" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`);
                $('.carousel-inner').append(`<div class="carousel-item" data-bs-interval="2000"><img src="${data_phone8[indexProd].image[i]}" class="d-block w-100" alt="${i}"></div>`)
            };
            $('#product-detail').text(data_phone8[indexProd].title);
            let ori_price= data_phone8[indexProd].storage[0][0][1]*(1+data_phone8[indexProd].sales);
            ori_price =ori_price.toFixed(); 
            $('.dt-detail-form').children().eq(0).text(parseInt(ori_price).toLocaleString());
            $('#dt-sale').text(data_phone8[indexProd].sales*100+"%")
            $('.dt-detail-form').children().eq(2).text("VND "+parseInt(data_phone8[indexProd].storage[0][0][1]).toLocaleString());
            
            
            $('#dt-inventory').text(data_phone8[indexProd].inventory);
            let ram ="";
            data_phone8[indexProd].storage.forEach(element=>{
                for (const key in element) {
                    if(key==0){
                    $('.dt-ram').append(`<div class="me-3" style="height:fit-content"><input type="radio" class="btn-check" name="dt-storage" id="dtstorage${key}" autocomplete="off" value="${element[key][0]}-${element[key][1]}" checked><label class="btn btn-outline-primary fs-6" for="dtstorage${key}">${element[key][0]}</label></div>`);
                    ram += element[key][0];
                    }else{
                        $('.dt-ram').append(`<div class="me-3" style="height:fit-content"><input type="radio" class="btn-check" name="dt-storage" id="dtstorage${key}" autocomplete="off" value="${element[key][0]}-${element[key][1]}"><label class="btn btn-outline-primary fs-6" for="dtstorage${key}">${element[key][0]}</label></div>`);
                        ram+=" - "+element[key][0];
                    }
                };
            });
            $('input[name="dt-storage"]').on('change',function(event){
                console.log($(event.currentTarget).val());
            })
            data_phone8[indexProd].colors.forEach(element=>{
                $('.dt-color').append(`<div class=" my-2" style="height:fit-content"><input type="radio" class="btn-check" name="dt-color" id="dtcolor${data_phone8[indexProd].colors.indexOf(element)}" value="${element}" autocomplete="off"><label class="btn btn-outline-orange fs-6 mx-1" for="dtcolor${data_phone8[indexProd].colors.indexOf(element)}">${element}</label></div>`);                
            });
            $('#dt-brand').text(data_phone8[indexProd].brand);
            $('#dt-name').text(data_phone8[indexProd].title);
            $('#dt-ram').text(ram);
            $('#dt-color').text(data_phone8[indexProd].colors.toString());
            $('#dt-ds').text(data_phone8[indexProd].display_size);
            $('#dt-dt').text(data_phone8[indexProd].diplay_type);
            $('#dt-fc').text(data_phone8[indexProd].front_camera);
            $('#dt-rc').text(data_phone8[indexProd].rear_camera.toString());
            $('#dt-os').text(data_phone8[indexProd].OS);
            $('#dt-chip').text(data_phone8[indexProd].chipset);
            $('#dt-gpu').text(data_phone8[indexProd].GPU);
            $('#dt-cpu').text(data_phone8[indexProd].CPU);
            $('#dt-battery').text(data_phone8[indexProd].battery);

            $('#show-dt1').on('click',function(){
                if($('#dt1').css('display')=='none'){
                    $(this).addClass('bg-white');
                    $('#show-dt2').removeClass('bg-white');
                    $('#dt2').hide();
                    $('#dt1').show();
                }
            });
            $('#show-dt2').on('click',function(){
                if($('#dt2').css('display')=='none'){
                    $(this).addClass('bg-white');
                    $('#show-dt1').removeClass('bg-white');
                    $('#dt1').hide();
                    $('#dt2').show();
                }
            });
            let comments_arr = [{star: 4,cmt:"The screen is clear. Not bad. The sound is a bit low"},
                                {star: 5,cmt:"I love it"},
                                {star: 5,cmt:"I bought 1 week. In my opinion, Phone has a large screen, not a good battery, says fast charging, but I find it not normally fast, the camera takes a bit of a pale color. Overall ok"},
                                {star: 5,cmt:"Generally fine. The staff at the store are very helpful."},
                                {star: 2,cmt:"Getting Wifi is worse than my old phone, slow touch. If you can't change it, you have to accept it"},
                                {star: 1,cmt:"Bad Phone"},
                                {star: 3,cmt:"Not bad in this price"}];
            for(let i=0;i<3;i++){
                let randomUser = Math.round(Math.random()*100000);
                let randComt= Math.floor(Math.random()*comments_arr.length);
                $('.comment').append(`<div class="col-md-2 col-lg-3"><i class="fa-solid fa-circle-user ps-lg-5" style="font-size:3rem;"></i></div><div class="col-md-10 col-lg-8"><p class="h5" id="dt-cmt-start${i}">User${randomUser} - </p><p>${comments_arr[randComt].cmt}</p></div>`);
                for(let j =0 ; j<parseInt(comments_arr[randComt].star);j++){
                    $('#dt-cmt-start'+i).append("<i class='fa-solid fa-star text-warning'></i>");
                };
                $('.comment').append("<hr style='width:90%; margin-left:40px'>");
            };
            let arr_R= rand_Prod(data_phone8,[]);
            for(let i = 0; i<4; i++){
                $('.rand-product').append(`<div class="card me-lg-3 card-product border-0" style="width: 18rem;"><a href="#!detail/:id=${arr_R[i]}" class="h-100 to-detail"><img src="${data_phone8[arr_R[i]].image[0]}" alt="${i}" class="h-100 w-100 rounded shadow" ></a></div>`);
            };
            $('.to-detail').click(function(){
                console.log("TO TOP");
                toTop();
            })
            changeQuanDT(data_phone[indexProd]);
            $('#dt-atc').on('click',function(){
                let select1 = $('input[name=dt-storage]:checked').val();
                let select2 = $('input[name=dt-color]:checked').val();
                let dtquantity = $('input[name=dt-quan]').val();
                saveCart(data_phone[indexProd],select1,select2,dtquantity);
                coutItem();
            });
        };
        //END GETJSON
    });
    const toTop =()=>{
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    };
    const rand_Prod =(arr1,arr2)=>{
        if(arr2.length==4){
            return arr2;
        }else{
            let rand = Math.floor(Math.random()*arr1.length);
            if(arr2.includes(rand)){
                return rand_Prod(arr1,arr2);
            }else{
                arr2.push(rand);
                return rand_Prod(arr1,arr2);
            }
        }
    }
    const showdtsm=(obj,index)=>{
        $('.detailsm-img').attr('src',obj.image[1]);
        $('.detailsm-img').attr('alt',index);
        $('.get-detail').attr('href',`#!detail/:id=${index}`);
        $('.modal-title').text(obj.title);
        $('.phone-gb').children().remove();
        obj.storage.forEach(element=>{
            for (let key in element) {
                if(key==0){
                    $('.phone-gb').append(`<div class="" style="height:fit-content
                    "><input type="radio" class="btn-check" name="storage" id="storage${key}" autocomplete="off" value="${element[key][0]}-${element[key][1]}" checked><label class="btn btn-outline-primary fs-6" for="storage${key}">${element[key][0]}</label></div>`);    
                }else{
                    $('.phone-gb').append(`<div class="" style="height:fit-content
                    "><input type="radio" class="btn-check" name="storage" id="storage${key}" autocomplete="off" value="${element[key][0]}-${element[key][1]}"><label class="btn btn-outline-primary fs-6" for="storage${key}">${element[key][0]}</label></div>`);
                }
            }
        });
        $('.phone-color').children().remove();
        obj.colors.forEach(element=>{
            $('.phone-color').append(`<div class=" my-2" style="height:fit-content
            "><input type="radio" class="btn-check" name="color" id="color${obj.colors.indexOf(element)}" value="${element}" autocomplete="off"><label class="btn btn-outline-orange fs-6 mx-1" for="color${obj.colors.indexOf(element)}">${element}</label></div>`)
        });

        $('.price1').html(`<del class="fs-5 mt-3 fw-light">${(obj.storage[0][0][1]*(1+obj.sales)).toLocaleString()}</del>${obj.sales*100}%`);
        $('.price2').html("VND "+obj.storage[0][0][1].toLocaleString());
        $('.phone-start').children().remove();
        for(let i =0; i< obj.rating;i++){
            $('.phone-start').append(`<i class="fa-sharp fa-solid fa-star" style="color: #FFC700; font-size: 2rem;"></i>`);
        };
        $('.phone-start').append(`<span class="ms-3">${obj.soled}</span>`);        
    };
    
    const detailSmall =(arr)=>{
        $('#list_product').empty();
        let ind;
        for(let i =0; i< arr.length;i++){
            $('#list_product').append(`<div class="card col-md-4 col-lg-3 mx-auto mb-3 p-0 border-0 card-product" ><a data-bs-toggle="modal" data-bs-target="#pup" class="h-100"><img src="${arr[i].image[0]}" alt="${i}" class="h-100 w-100 rounded shadow" ></a></div>`);
        };
        $('#list_product').append(`<div class="modal fade modal-lg" id="pup" tabindex="-1" aria-labelledby="detailItem" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h3 class="modal-title"></h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><div class="container-fluid"><div class="row g-0 h-100 w-100"><div class="col-md-4 col-lg-4 h-100 inffo-img mx-auto"><a class="get-detail"><img src="" alt="" class="img-fluid rounded-start h-100 detailsm-img"></a></div><div class="col-md-8 col-lg-4 mx-auto py-lg-5 detailsm"><div class="card-body w-100"><form><div class="w-100 phone-gb d-flex flex-row justify-content-evenly flex-wrap mx-auto" style="height:fit-content"></div><p class="mt-2" style="">Color</p><div class="w-100 phone-color d-flex flex-row justify-content-evenly flex-wrap mx-auto" style="height: fit-content"></div><p class="text-center price1"></p><p class="h3 text-danger text-center price2"></p><div class="mx-auto mb-4 phone-start" style="height:fit-content"></div></form><div class="d-flex flex-row justify-content-center w-100 mb-3" style="height:fit-content;"><button class="btn btn-outline-orange detailsmATC mx-4" style="position:relative" ><i class="fa-solid fa-cart-shopping fs-3"></i></button><button class="btn btn-outline-orange" style="position:relative">Add to Compare</button></div></div></div></div></div></div></div></div>`);
        $('.get-detail').on('click',function(){
            console.log('HIEDO');
            $('.modal').modal('hide');
        });
        $('.card-product').on('click',function(event){
            ind  = $(this).find('img').attr('alt');  
            showdtsm(arr[ind],ind);
            $('input[name="storage"]').on('change',function(event){
                let val = $('input[name="storage"]:checked').val();
                let newPrice = val.split('-');
                newPrice = parseInt(newPrice[1]);
                console.log(newPrice);
                $('.price1').html(`<del class="fs-5">${(newPrice*(1+arr[ind].sales)).toLocaleString()}</del>${arr[ind].sales*100}%`);
                $('.price2').html("VND "+newPrice.toLocaleString());
            })      
            
        });
        
        $('.close').on('click',function(){
            $('#list_product').find('.inffo').hide();
        }) 
        $('.detailsmATC').on('click',function(event){
            ind = $(event.currentTarget).parent().parent().parent().parent().find('.detailsm-img').attr('alt');
            let storage = $('input[name="storage"]:checked').val();
            let color= $('input[name="color"]:checked').val()?$('input[name="color"]:checked').val():null;
            saveCart(arr[ind],storage,color)
            coutItem();
        });
    };
    //Add To Cart
    function hover_div(){
        $('.img_hov, .img_hov>div').hover(function(event){
            $(event.currentTarget).addClass('card-active');
            $(event.currentTarget).find('.card-img-overlay').show();
        }).on('mouseleave',function(event){
            $(event.currentTarget).removeClass('card-active');
            $(event.currentTarget).find('.card-img-overlay').hide();
    
        });
    };
    // List Item
    const rangeFil =(arr,filer)=>{
        let arrx = [];
        switch(filer){
            case "lt5mil":
                arrx = arr.filter(price => price.storage[0][0][1] <= 5000000);
                break;
            case "lt10mil":
                arrx = arr.filter(price => price.storage[0][0][1] <= 10000000 && price.storage[0][0][1]>5000000);
                break;
            case "lt15mil":
                arrx = arr.filter(price => price.storage[0][0][1] <= 15000000 && price.storage[0][0][1]>10000000);
                break;
            case "lt20mil":
                arrx = arr.filter(price => price.storage[0][0][1] <= 20000000 && price.storage[0][0][1]>15000000);
                break;
            default:
                arrx = arr.filter(price => price.storage[0][0][1] > 20000000);
                break;
        };
        return arrx;
    };
    const sortPhone = (arr,arr1)=>{
        let arrx = [...arr];
        if(arr1.length == 0){
            return arr;
        }else{
            switch(arr1[0]){
                case "lowestprice":
                    let arr2 = sortLowest(arrx,arrx,arrx[0],[],arrx.length);
                    arr= arr2.copyWithin(0);
                    break;
                case "rating":
                    let arr3 = sortOffer(arrx,arrx,arrx[0],[],arrx.length);
                    arr= arr3.copyWithin(0);
                    break;
                case "selling":
                    let arr4 = hotCel(arrx,arrx,arrx[0],[],arrx.length);
                    arr = arr4.copyWithin(0);
                    break;
            };
            arr1.shift();
            return sortPhone(arr,arr1);
        }
    };
    const saveCart = (obj,storage,color,quan=1)=>{
        // localStorage.clear();
        let arr_st= storage.split('-');
        let str_json="";
        let addObj = {name:obj.title,stg: arr_st[0],clr: color,price:arr_st[1],quantity:quan};
        let js_session = localStorage.getItem('items');
        if(!js_session){
            let arr=[];
            arr.push(addObj);
            str_json = JSON.stringify(arr);
            localStorage.setItem('items',str_json);
        }else{
            let cart = JSON.parse(js_session);
            let checkk=true;
            cart.forEach(el=>{
                if(el.name == addObj.name && el.clr == addObj.clr && el.stg == addObj.stg){
                    console.log("SAME");
                    checkk = false;
                    el.quantity+=1;
                };
            });
            if(checkk){
                cart.push(addObj);
            };
            str_json = JSON.stringify(cart);
            localStorage.setItem('items',str_json);
        };
    };
    const listingCart =(cart)=>{
        let table= $('.tb-body');
        let sum=0;
        table.empty();
        for(let i = 1; i<=cart.length;i++){
            let prce = parseInt(cart[i-1].price);
            prce*=cart[i-1].quantity;
            sum+=prce;
            let color = cart[i-1].clr?cart[i-1].clr:"";
            table.append(`<tr><td class='text-center'>${i}</td><td>${cart[i-1].name} - <span class="text-black-50 fs-6">${color}</span></td><td class='text-center' style='padding-top:15px;'><i class="fa-solid fa-minus text-primary me-md-1 me-lg-3 decrease"></i><span>${cart[i-1].quantity}</span><i class="fa-solid fa-plus text-primary ms-md-1 ms-lg-3 increase"></i></td><td>${prce.toLocaleString()}</td><td class="del-item"><i class="fa-solid fa-xmark text-danger"></i></td></tr>`);
        };
        $('#total').text(sum);
    };
    const changQuan = ()=>{
        let table= $('.tb-body');
        let json_st = localStorage.getItem('items');
        let cart = JSON.parse(json_st);
        let sum=0;
        $('.decrease').click(function(event){
            let index = $(event.currentTarget).parent().siblings().eq(0).text() -1;
            let prce = parseInt(cart[index].price);
            cart[index].quantity--;
            if(cart[index].quantity == 0){
                cart.splice(index,1);
                let json_st2 = JSON.stringify(cart);
                localStorage.setItem('items',json_st2);
                table.empty();
                table.append('<tr><td colspan="4">There is no item in cart</td></tr>');
                listingCart(cart);
                changQuan();
            }else{
                prce*=cart[index].quantity;
                sum = parseInt($('#total').text());
                console.log(sum);
                sum-=parseInt(cart[index].price);
                $(event.currentTarget).next().text(cart[index].quantity);
                $(event.currentTarget).parent().next().text(prce.toLocaleString());
                $('#total').text(sum);
                let json_st2 = JSON.stringify(cart);
                localStorage.setItem('items',json_st2);
            };
            dlive_item(cart);
            coutItem();
        });
        $('.increase').click(function(event){
            let index = $(event.currentTarget).parent().siblings().eq(0).text() -1;
            sum = parseInt($('#total').text());
            cart[index].quantity++;
            let prce = parseInt(cart[index].price);
            prce*=cart[index].quantity;
            sum+=parseInt(cart[index].price);
            $(event.currentTarget).prev().text(cart[index].quantity);
            $(event.currentTarget).parent().next().text(prce.toLocaleString());
            $('#total').text(sum);
            dlive_item(cart);
            let json_st2 = JSON.stringify(cart);
            localStorage.setItem('items',json_st2);
            coutItem();
        });
        $('.del-item').on('click',function(event){
            let index =$(event.currentTarget).siblings().eq(0).text()-1;
            cart.splice(index,1);
            let json_st2 = JSON.stringify(cart);
            localStorage.setItem('items',json_st2);
            table.empty();
            listingCart(cart);
            dlive_item(cart);
            changQuan();
            coutItem();
        });
        $('.clear').on('click',function(){
            table.empty();
            table.append('<tr><td colspan="4">There is no item in cart</td></tr>');
            localStorage.clear();
            $('#total').text(0);
            coutItem();
            dlive_item(cart);
        });
    };
    const changeQuanDT=(obj)=>{
        $('#dt-increase').on('click',function(event){
            let quan = $(event.currentTarget).prev().val();
            quan++;
            if(quan > obj.inventory){
                quan = obj.inventory;   
            };
            $(event.currentTarget).prev().val(quan);
            
        });
        $('#dt-decrease').on('click',function(event){
            let quan = $(event.currentTarget).next().val();
            quan--;
            if(quan<0){
                quan=0;
            };
            $(event.currentTarget).next().val(quan);
        })
    };
})