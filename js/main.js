$(document).ready(function(){
    $('main').scrollTop(0);
    if ("geolocation" in navigator){ 
        navigator.geolocation.getCurrentPosition(function(position){ 
            let datetime = new Date();
            datetime = datetime.toUTCString();
            datetime += " - Location: Latitude: "+ position.coords.latitude+" - Longitude: "+ position.coords.longitude;
            $('#getDatenLoca').text(datetime);
        });
	}else{
        console.log("Browser doesn't support geolocation!");
	};
    let count_vis= localStorage.getItem('visitor');
    if(!count_vis){
        localStorage.setItem('visitor',1);
    }else{
        let addVisitor = parseInt(count_vis)+1;
        localStorage.setItem('visitor',addVisitor);
    };
    $('#count-visitor').text(localStorage.getItem('visitor'));
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
        let table= $('.tb-body');
        if($('#cartpop').css('display') == 'none'){
            $('#cartpop').slideDown();
            table.empty();
            let json_st = localStorage.getItem('items');
            let cart = JSON.parse(json_st);
            if(cart !==null){
                listingCart(cart);
                changQuan();
            }else{
                table.append('<tr><td colspan="4">There is no item in cart</td></tr>');
            };
        }
    });
    let arr_json=localStorage.getItem('items');
    let arr = JSON.parse(arr_json);
    const dlive_item = (session)=>{
        $('#cart').empty();
        let sum= 0;
        for(let i = 0; i< session.length;i++){
            $('#cart').append(`<tr><td>${i+1}</td><td class='text-center'>${session[i].name}</td><td>${session[i].stg}</td><td>${session[i].clr}</td><td>${session[i].quantity}</td><td class='text-end text-danger'>${parseInt(session[i].price).toLocaleString()}</td><td><button class="text-danger btn del-item2"><i class="fa-solid fa-trash"></i></button></td></tr>`);
            sum += parseInt(session[i].price)*session[i].quantity;
        };
        $('.total-del').text(sum.toLocaleString());
        $('.del-item2').on('click',function(event){
            let index =$(event.currentTarget).parent().siblings().eq(0).text()-1;
            session.splice(index,1);
            let json_st2 = JSON.stringify(session);
            localStorage.setItem('items',json_st2);
            dlive_item(session);
            listingCart(session);
            changQuan();
            coutItem();
        })
    }; // Show Cart in Delivery Page
    if(arr){dlive_item(arr)};
    let json_compar= localStorage.getItem('compar');
    if(json_compar){
        let arr_compar = JSON.parse(json_compar);
        console.log(arr_compar);
        if(arr_compar.length>0){
            $('.btn-compar').show();
        }
        $('.btn-compar').children().eq(1).text(arr_compar.length);
    }else{
        $('.btn-compar').hide();
    }
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
    } // Counting Item in Cart
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
    };// Recursive Sort hotSeling by lower Price
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
    }; // NEED INCLUDING SORT HIGHEST
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
    }; // Recursive Sort hotSeling by rating
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
    }; // Recursive Sort hotSeling by sold
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
        (obj.sales != 0)?$('#top-extra').text((obj.storage[0][0][1]*(1+obj.sales)).toLocaleString()):$('#top-extra').text("");
        (obj.sales != 0)? $('#top-sales').text(obj.sales*100+"%"):$('#top-sales').text("");
        $('#top-price').text("VND "+obj.storage[0][0][1].toLocaleString());
        $('#top-rating').empty();
        for(let i =0; i< obj.rating;i++){
            $('#top-rating').append(`<i class="fa-sharp fa-solid fa-star" style="color: #FFC700; font-size: 2.3rem;"></i>`);
        };
        $('#top-rating').append(`<span class="ms-3">${obj.soled}</span>`);
        $('#top-link').attr('href',`#!detail/:id=${arr_origanize.indexOf(obj)}`);
    }; // Change display phone in Top Selling
    const showImg = (arr,arr_origanize,index = 0)=>{
        let arr_clone = [...arr];
        $('#top-5').html(`<p class="text-light text-center pe-4 pt-3 h3 " style="text-shadow: 0 0 10px #FFFFFF;">TOP ${parseInt(index)+1}</p>`);
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
    }; // Showing Top 5 Selling
    const loadAndMoveList = (data,arr,content)=>{
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
            let indexe;
            data.forEach(el=>{
                if(el.title == arr[i].title){
                    indexe = data.indexOf(el);
                }
            });
            place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card"><img src="${arr[i].image[0]}" class="card-img-top p-1" alt="${indexe}" style="height:60%;object-fit:contain;"><div class="card-body"><h5 class="card-title">${arr[i].title}</h5><p class="card-text fs-4 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-dark fs-4 w-100 h-todetail">More detail</a></div></div>`);
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
                    let indexe;
                    data.forEach(el=>{
                    if(el.title == arr[i].title){
                    indexe = data.indexOf(el);
                    }
                    });
                place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInRight"><img src="${arr[i].image[0]}" class="card-img-top p-1" alt="${indexe}" style="height:60%;object-fit:contain;"><div class="card-body"><h5 class="card-title">${arr[i].title}</h5><p class="card-text fs-4 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-primary h-todetail">More detail</a></div></div>`);
                }
            }else{
                place.empty();
                i--;
                let a = i+ 4;
                for(i; i<a;i++){
                    let indexe;
                    data.forEach(el=>{
                    if(el.title == arr[i].title){
                    indexe = data.indexOf(el);
                    }
                    });
                    place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInRight"><img src="${arr[i].image[0]}" class="card-img-top p-1" alt="${indexe}" style="height:60%;object-fit:contain;"><div class="card-body" ><h5 class="card-title">${arr[i].title}</h5><p class="card-text fs-4 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-primary h-todetail">More detail</a></div></div>`);
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
                    let indexe;
                    data.forEach(el=>{
                    if(el.title == arr[i].title){
                    indexe = data.indexOf(el);
                    }
                    });
                    place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInLeft"><img src="${arr[i].image[0]}" class="card-img-top p-1" alt="${indexe}" style="height:60%;object-fit:contain;"><div class="card-body"><h5 class="card-title">${arr[i].title}</h5><p class="card-text fs-4 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-primary h-todetail">More detail</a></div></div>`);
                }
            }else{
                place.empty();
                i=0;
                for(i; i< 4;i++){
                    let indexe;
                    data.forEach(el=>{
                    if(el.title == arr[i].title){
                    indexe = data.indexOf(el);
                    }
                    });
                    place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInLeft"><img src="${arr[i].image[0]}" class="card-img-top p-1" alt="${indexe}" style="height:60%;object-fit:contain;"><div class="card-body"><h5 class="card-title">${arr[i].title}</h5><p class="card-text fs-4 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-primary h-todetail">More detail</a></div></div>`);
                }
            }
            hover_div();
        });
        $('.h-todetail').on('click',function(event){
            toTop();
        });
    }; // Moving 4 phone in Best Budget and Best Offer
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
        loadAndMoveList(data_phone,arrBestBudget,'best_budget');
        //Best Offer
        let data_phone2 = [...data_phone];
        let arrBestOffer =[];
        sortOffer(data_phone2,data_phone2,data_phone2[0],arrBestOffer,8);
        loadAndMoveList(data_phone,arrBestOffer,'best_offer');
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
                $('main').css({
                    backgroundImage: 'url(image/oppo_logo.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '58% 50%',
                    backgroundAttachment: 'fixed',
                    backgroundSize : '50%',
                });
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
                $('main').css({
                    backgroundImage: 'url(image/xiaomi_logo.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '60% 250px',
                    backgroundAttachment: 'fixed',
                    backgroundSize : '20%',
                });
                data_phone4 = data_phone4.filter(e=>{
                    return e.brand == "Xiaomi";
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
            $('.carousel-inner').append(`<div class="carousel-item w-100 h-100 active" data-bs-interval="10000"><img src="${data_phone8[indexProd].image[0]}" class="d-block h-100" alt="0" style="object-fit: contain; object-position: center center;"></div>`)
            for(let i = 1; i< data_phone8[indexProd].image.length;i++){
                $('.carousel-indicators').append(`<button type="button" data-bs-target="#slideImg" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`);
                $('.carousel-inner').append(`<div class="carousel-item w-100 h-100" data-bs-interval="2000"><img src="${data_phone8[indexProd].image[i]}" class="d-block h-100" alt="${i}" style="object-fit: contain; object-position: center center;"></div>`)
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
            $('.dt-buy-now').on('click',function(event){
                let select1 = $('input[name=dt-storage]:checked').val();
                let select2 = $('input[name=dt-color]:checked').val();
                let dtquantity = $('input[name=dt-quan]').val();
                saveCart(data_phone[indexProd],select1,select2,dtquantity);
                coutItem();
            })
        };

        let data_phone9 = [...data_phone];
        $('.btn-compar').on('click',function(event){
            showCompareTable(data_phone9);
        });
        if($('main').children().hasClass('map-contact')){
            //Load map for page Contact (Map Leafletjs)
            let map = L.map('map').setView([10.7868295, 106.6635065], 17);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            let marker = L.marker([10.786937401663858, 106.66626577598547]).addTo(map);
            marker.on('click',function(){
                $('.contact-info').fadeToggle();
            });
            $('#btn-scrollTop').hide();
        }
        //END GETJSON
    });
    const toTop =()=>{
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    }; //Scroll to TOP page
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
    } //Random Phone on Detail Page
    const showdtsm=(obj,index)=>{
        $('.detailsm-img').attr('src',obj.image[1]);
        $('.detailsm-img').attr('alt',index);
        $('.get-detail').attr('href',`#!detail/:id=${index}`);
        $('#phone-name-modal').text(obj.title);
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
    }; //Show detail small 
    const detailSmall =(arr)=>{
        $('#list_product').empty();
        let ind;
        for(let i =0; i< arr.length;i++){
            $('#list_product').append(`<div class="card col-md-4 col-lg-3 mx-auto mb-3 p-0 border-0 card-product" ><a data-bs-toggle="modal" data-bs-target="#pup" class="h-100"><img src="${arr[i].image[0]}" alt="${i}" class="h-100 w-100 rounded shadow" ></a></div>`);
        };
        $('#list_product').append(`<div class="modal fade modal-lg" id="pup" tabindex="-1" aria-labelledby="detailItem" aria-hidden="true"> <div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="phone-name-modal"></h3><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><div class="container-fluid"><div class="row g-0 h-100 w-100"><div class="col-md-4 col-lg-4 h-100 inffo-img mx-auto"><a class="get-detail"><img src="" alt="" class="img-fluid rounded-start h-100 detailsm-img"></a></div><div class="col-md-8 col-lg-4 mx-auto py-lg-5 detailsm"><div class="card-body w-100"><form><div class="w-100 phone-gb d-flex flex-row justify-content-evenly flex-wrap mx-auto" style="height:fit-content"></div><p class="mt-2" style="">Color</p><div class="w-100 phone-color d-flex flex-row justify-content-evenly flex-wrap mx-auto" style="height: fit-content"></div><p class="text-center price1"></p><p class="h3 text-danger text-center price2"></p><div class="mx-auto mb-4 phone-start" style="height:fit-content"></div></form><div class="d-flex flex-row justify-content-center w-100 mb-3" style="height:fit-content;"><button class="btn btn-outline-orange detailsmATC mx-4" style="position:relative" ><i class="fa-solid fa-cart-shopping fs-3"></i></button><button class="btn btn-outline-orange detailCompar w-50" style="position:relative"><img src="image/comparison.png" alt="comparision" width="26px" ></button></div></div></div></div></div></div></div></div>`);
        $('.get-detail').on('click',function(){
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
        $('.detailCompar').on('click',function(event){
            let indCp = $(event.currentTarget).parent().parent().parent().parent().find('.detailsm-img').attr('alt');
            let sessCp= localStorage.getItem('compar');
            let json_str="";
            let countCmp=0;
            if(sessCp){
                let arrCp = JSON.parse(sessCp);
                if(arrCp.length < 3 && !arrCp.includes(indCp)){
                    arrCp.push(indCp);
                    countCmp=arrCp.length;
                    json_str = JSON.stringify(arrCp);
                    localStorage.setItem('compar',json_str);
                }else{
                    countCmp=arrCp.length;
                };
            }else{
                let arr = [];
                arr.push(indCp);
                countCmp=arr.length;
                json_str = JSON.stringify(arr);
                localStorage.setItem('compar',json_str);
            };
            $('.btn-compar').show();
            $('.btn-compar').children().eq(1).text(countCmp);
        }).on('mouseenter',function(event){
            $(event.currentTarget).children().attr('src','image/comparison2.png');
        }).on('mouseleave',function(event){
            $(event.currentTarget).children().attr('src','image/comparison.png');
        });
    }; // List Product in Brand List and Create Modal
    const showCompareTable=(data)=>{
        let str = localStorage.getItem('compar');
        let arrObj = JSON.parse(str);
        let lastrow="<tr><td></td>";
        $('.name-phones').empty();
        $('#compareTable').empty();
        $('.name-phones').append('<th class="col-3"></th>');
        arrObj.forEach(ind=>{
            $('.name-phones').append(`<th class='col-3'><img src="${data[ind].image[0]}" class="img-compar" alt="${ind}"><p class="h4">${data[ind].title}</p></th>`);
            lastrow+=`<td class="${arrObj.indexOf(ind)}"><button class="btn text-danger fs-4 remove-compar"><i class="fa-regular fa-circle-minus"></i></button></td>`;    
        });
        lastrow+="</tr>";
        let arrDifference= comparable(data[arrObj[0]],data[arrObj[1]],data[arrObj[2]]);
        console.log(arrDifference);
        for(const element of arrDifference){
            $('#compareTable').append('<tr style="padding:10px 0;">');
            for (const [key,value] of Object.entries(element)) {
                $('#compareTable').append(`<td class="text-center text-capitalize fw-bold border-bottom" style="font-size:16px;">${changeKey(key)}</td>`);
                for(let j = 0; j<arrObj.length;j++){
                    $('#compareTable').append(`<td class="border-bottom"  style="font-size:16px;">${value[j]}</td>`);
                };
            };
            $('#compareTable').append('</tr>');
        };
        $('#compareTable').append(lastrow); 
        $('.remove-compar').on('click',function(event){
            console.log('click');
            let index_remove = $(event.currentTarget).parent().attr('class');
            arrObj.splice(index_remove,1);
            $('.btn-compar').children().eq(1).text(arrObj.length);
            str = JSON.stringify(arrObj);
            console.log(str);
            localStorage.setItem('compar',str);
            if(arrObj.length>0){
                showCompareTable(data);
            }else{
                $('.modal').modal('hide');
                $('.btn-compar').hide();
            }
        });  
    }; // Show comparable
    const changeKey=(key)=>{
        let str ="";
        switch(key){
            case "display_size":
                str = "Display Size";
                break;
            case "diplay_type":
                str = "Display Type";
                break;
            case "front_camera":
                str = "Front Camere";
                break;
            case "rear_camera":
                str = "Rear Camera";
                break;
            case "OS":
                str = "Operating system";
                break;
            default:
                str = key;
                break;
        };
        return str;
    }   //Just change key of json
    const comparable=(obj1,obj2=null,obj3=null)=>{
        let arr1 = Object.values(obj1);
        let arr2 = obj2?Object.values(obj2):[];
        let arr3 = obj3?Object.values(obj3):[];
        let arr = [];
        let arr_key="";
        let subObj={};
        for(let i = 2; i<14;i++){
            if(typeof arr1[i] == 'string' || typeof arr1[i] == 'number'){
                if(arr1[i] !== arr2[i] || (arr1[i] !== arr3[i]&&arr3[i])){
                   for (const key in obj1) {
                        if(obj1[key] === arr1[i]){
                            arr_key = key;
                        }
                    };
                    subObj[arr_key] = [arr1[i],arr2[i],arr3[i]];
                    arr.push(subObj);
                    subObj={}; 
                }
            }else if(i==7){
                let str1 = arr1[i].toString();
                let str2 = arr2[i]?arr2[i].toString():"";
                let str3 = arr3[i]?arr3[i].toString():"";
                subObj['rear_camera'] = [str1,str2,str3];
                arr.push(subObj);
                subObj={};
            };
        };
        return arr;
    }; // Comparable 2-3 product
    const hover_div = ()=>{
        $('.h-card img').hover(function(event){
            $(event.currentTarget).addClass('card-active');
            $(event.currentTarget).siblings().hide();
        }).on('mouseleave',function(event){
            $(event.currentTarget).removeClass('card-active');  
            $(event.currentTarget).siblings().show();
        });
    }; // Hover Img of Card in Best BudGet And Best Selling
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
    };  // Filter range money
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
    };  // Sorting phone
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
    }; //Saving cart to Session
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
    };  // Popup Cart showing
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
    }; // Changing quantity in Cart popup
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
    }; // Changing quantity in Product Detail
})