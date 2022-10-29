$(document).ready(function(){
    $('html, body').animate({ scrollTop: 0 }, "fast");
    let currentUsr = localStorage.getItem('user');
    if(!currentUsr){
        $('.cart').hide();
        $('.sigin').show();
    }else{
        $('.cart').show();
        $('.sigin').hide();
    };
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
    $('.signOut').on('click',function(event){
        localStorage.removeItem('user');
        location.href = 'index.html';
    });
    $('#count-visitor').text(localStorage.getItem('visitor'));
    $('.ls1').on('mouseenter',function(event){
        $(event.currentTarget).removeClass('text-bg-dark').addClass('text-bg-light');
        $(event.currentTarget).children().removeClass('text-white-50').addClass('text-dark');
    }).on('mouseleave',function(event){
        $(event.currentTarget).removeClass('text-bg-light').addClass('text-bg-dark');
        $(event.currentTarget).children().removeClass('text-dark').addClass('text-white-50');
    });
    $('.nav-link').not('.signOut').on('mouseenter', function(event){
        $(event.currentTarget).addClass('bg-light').addClass('text-dark');
    }).on('mouseleave',function(event){
        $(event.currentTarget).removeClass('bg-light').removeClass('text-dark');
    }).on('click',function(event){
        $(event.currentTarget).parent().siblings().children().removeClass('bg-dark');
        $(event.currentTarget).addClass('bg-dark');
    });
    $('.nav-spec').on('click',function(event){
        $(event.currentTarget).parents().siblings().find('.bg-white').removeClass('bg-white');
    });
    $('input[name="search"]').on('focus',function(event){
        event.preventDefault();
        if($(event.currentTarget).parent().parent().hasClass('search-bar')){
            $('.search-bar').css({width: "250px"});
        }
    }).on('blur',function(event){
        if($(event.currentTarget).parent().parent().hasClass('search-bar')){
            $('.search-bar').css({width: "200px"});
        }
    });
    $('.cartpopup').on('click',function(){
        let arr_json=localStorage.getItem('items');
        let arr = JSON.parse(arr_json);
        if(arr.length == 0){
            $('.tb-body').html("<tr><td colspan='5' class='text-center'>There are no item in cart</td></tr>")
        }else{
            $('.tb-body').empty();
            listingCart(arr);
            changQuan();
        };
    });
    const dlive_item = (session)=>{
        $('#cart').empty();
        let sum= 0;
        for(let i = 0; i< session.length;i++){
            $('#cart').append(`<tr><td>${i+1}</td><td class='text-center'>${session[i].name}</td><td>${session[i].stg}</td><td>${session[i].clr}</td><td>${session[i].quantity}</td><td class='text-end text-danger'>${parseInt(session[i].price).toLocaleString()}</td><td><button class="text-danger btn del-item2"><i class="fa-solid fa-trash"></i></button></td></tr>`);
            sum += parseInt(session[i].price)*session[i].quantity;
        };
        $('.total-del').text(sum.toLocaleString());
        $('.del-item2').on('click',function(event){
            console.log('del-item2 on click');
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
    let arr_json=localStorage.getItem('items');
        let arr = JSON.parse(arr_json);
    if(arr){dlive_item(arr)};
    let json_compar= localStorage.getItem('compar');
    if(json_compar){
        let arr_compar = JSON.parse(json_compar);
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
    const salesItem=(arr,arr1,obj,arr2,i)=>{
        if(arr2.length == i){
            return arr2;
        }else{
            if(arr1.length == 1){
                if(arr1[0].sales > obj.sales){
                    obj = arr1[0];
                };
                arr2.push(obj);
                let index = arr.indexOf(obj);
                arr.splice(index,1);
                return salesItem(arr,arr,arr[0],arr2,i);
            }else{
                if(arr1[0].sales>obj.sales){
                    obj=arr1[0];
                };
                return salesItem(arr,arr1.slice(1),obj,arr2,i);
            }
        }
    }; // Recursive Sort salesItem by sales
    const showTopInfo =(obj,arr,arr_origanize)=>{
        $('#top').attr('src',obj.image[0]);
        $('#top').attr('alt',arr_origanize.indexOf(obj));
        $('#top-title').text(obj.title);
        $('#top-size').text(obj.display_size);
        $('#storage').empty();
        obj.storage.forEach(element=>{
            for(let key in element){
                $('#storage').append(`<p class="h5 fw-bold btn btn-outline-primary home-btn-size" >${element[key][0]}</p>`)
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
        $('.top-link').attr('href',`#!detail/:id=${arr_origanize.indexOf(obj)}`);
    }; // Change display phone in Top Selling
    const showImg = (arr,arr_origanize,index = 0)=>{
        let arr_clone = [...arr];
        $('#top-5').html(`<p class="text-light text-center pe-4 pt-3 h3 " style="text-shadow: 0 0 10px #FFFFFF;">TOP ${parseInt(index)+1}</p>`);
        showTopInfo(arr_clone[index],arr,arr_origanize);
        arr_clone.splice(index,1);
        $('#top-list').empty();
        for(let i =0; i< arr_clone.length;i++){
            let ind = arr.indexOf(arr_clone[i]);
            $('#top-list').append(`<img src="${arr_clone[i].image[0]}" alt="${ind}" class="img_hov2">`);
        };
        $('.img_hov2').on('click',function(event){
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
            place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card"><a href="#!detail/id=${indexe}" class="img-card-link"><img src="${arr[i].image[0]}" class="card-img-top h-100 p-1" alt="${indexe}" style="object-fit:contain;"></a><div class="card-body d-flex flex-column justify-content-between"><a href="#!detail/id=${indexe}" class="card-title text-decoration-none text-black fs-4">${arr[i].title}</a><p class="card-text fs-5 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-dark fs-5 w-100 h-todetail">More detail</a></div></div>`);
        };
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
                place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInRight"><a href="#!detail/id=${indexe}" class="img-card-link"><img src="${arr[i].image[0]}" class="card-img-top h-100 p-1" alt="${indexe}" style="object-fit:contain;"></a><div class="card-body d-flex flex-column justify-content-between"><a href="#!detail/id=${indexe}" class="card-title text-decoration-none text-black fs-4">${arr[i].title}</a><p class="card-text fs-5 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-dark fs-5 w-100 h-todetail">More detail</a></div></div>`);
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
                    place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInRight"><a href="#!detail/id=${indexe}" class="img-card-link text-decoration-none text-black"><img src="${arr[i].image[0]}" class="card-img-top h-100 p-1" alt="${indexe}" style="object-fit:contain;"></a><div class="card-body d-flex flex-column justify-content-between" ><a href="#!detail/id=${indexe}" class="card-title text-decoration-none text-black fs-4">${arr[i].title}</a><p class="card-text fs-5 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-dark fs-5 w-100 h-todetail">More detail</a></div></div>`);
                }
            };
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
                    place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInLeft"><a href="#!detail/id=${indexe}" class="img-card-link text-decoration-none text-black"><img src="${arr[i].image[0]}" class="card-img-top h-100 p-1" alt="${indexe}" style="object-fit:contain;"></a><div class="card-body d-flex flex-column justify-content-between"><a class="card-title text-decoration-none text-black fs-4">${arr[i].title}</a><p class="card-text fs-5 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-dark fs-5 w-100 h-todetail">More detail</a></div></div>`);
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
                    place.append(`<div class="card animate__animated mx-lg-3 mx-md-2 h-card shadow-card animate__backInLeft"><a href="#!detail/id=${indexe}" class="img-card-link text-decoration-none text-black"><img src="${arr[i].image[0]}" class="card-img-top p-1" alt="${indexe}" style="object-fit:contain;"></a><div class="card-body d-flex flex-column justify-content-between"><a href="#!detail/id=${indexe}" class="card-title text-decoration-none text-black fs-4">${arr[i].title}</a><p class="card-text fs-4 text-danger">VND ${arr[i].storage[0][0][1].toLocaleString()}</p><p class="card-text text-warning">${arr[i].rating} <i class="fa-solid fa-star"></i> <span class="text-black-50">(${arr[i].soled})</span></p><a href="#!detail/id=${indexe}" class="btn btn-dark fs-5 w-100 h-todetail">More detail</a></div></div>`);
                }
            }
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
        brand=brand[brand.length-1];
        let data_phonex = [...data_phone];
        let data_phone4= [...data_phone];
        switch(brand){
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
        detailSmall(data_phonex,data_phone4);

        //Sort sortPhone() line 378;
        let data_phone5=[...data_phone4];
        $('input[name="sort"]').on('change',function(){
            let arr1 = [];
            $('input[name="sort"]:checked').each(function(){
                arr1.push($(this).val());
            }) 
            if(!$('input[name="sort"]:checked').val()){
                detailSmall(data_phonex,data_phone4);
            }else{
                data_phone5 = sortPhone(data_phone5,arr1);
                detailSmall(data_phonex,data_phone5);
            };
        });
        $('#clearSort').on('click',function(event){
            event.preventDefault();
            $('input[name="sort"]').prop("checked", false);
            detailSmall(data_phonex,data_phone4);
        })
        //Filter 
        let data_phone6=[...data_phone4];
        $('input[name="filter"]').on('click',function(event){
            detailSmall(rangeFil(data_phonex,data_phone6,$('input[name="filter"]:checked').val()));
        });

        //Search
        let data_phone7=[...data_phone];
        $('#search').on('keyup',function(event){
            let word = $(event.currentTarget).val().toLowerCase();
            let cpr1 = word.split(' ');
            searching(data_phone7,cpr1,event);
        }).on('blur',function(){
            $('#search-list').slideUp();
        }).on('focus',function(){
            $('#search-list').slideDown();
        });
        let data_phone10 =[...data_phone4];
        $('#search-dt').on('keyup',function(event){
            event.preventDefault();
            let word = $(event.currentTarget).val().toLowerCase();
            let cpr2 = word.split(' ');
            searching(data_phone10,cpr2,event);
        }).on('blur',function(event){
            event.preventDefault();
            if($(event.currentTarget).val() == ""){
                detailSmall(data_phonex,data_phone7);
            }
        });
        $('#search-dt-btn').on('click',function(event){
            event.preventDefault();
            let et_word = $(event.currentTarget).parent().prev().val().toLowerCase();
            let cpr3 = et_word.split(' ');
            searching(data_phone10,cpr3,'click');
        });
        $('#clear-all-fil').on('click',function(event){
            event.preventDefault();
            $('input[name="sort"]').prop("checked", false);
            $('input[name="filter"]').prop("checked",false);
            $('#search-dt').val('');
            detailSmall(data_phonex,data_phone4);
        })
        //PRODUCT_DETAIL
        let data_phone8 = [...data_phone];
        if($('main').children().hasClass('detaillg')){
            $('.detaillg').scrollTop(0);
            let indexProd = url.split('=');
            indexProd=indexProd[indexProd.length-1];
            $('.carousel-indicators').append(`<button type="button" data-bs-target="#slideImg" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`);
            $('.carousel-inner').append(`<div class="carousel-item w-100 h-100 active" data-bs-interval="10000"><img src="${data_phone8[indexProd].image[0]}" class="d-block mx-auto h-100" alt="0" style="object-fit: contain; object-position: center center;"></div>`)
            for(let i = 1; i< data_phone8[indexProd].image.length;i++){
                $('.carousel-indicators').append(`<button type="button" data-bs-target="#slideImg" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`);
                $('.carousel-inner').append(`<div class="carousel-item w-100 h-100" data-bs-interval="2000"><img src="${data_phone8[indexProd].image[i]}" class="d-block mx-auto h-100" alt="${i}" style="object-fit: contain; object-position: center center;"></div>`)
            };
            $('#product-detail').text(data_phone8[indexProd].title);
            let ori_price= data_phone8[indexProd].storage[0][0][1]*(1+data_phone8[indexProd].sales);
            ori_price =ori_price.toFixed(); 
            $('.dt-detail-form').children().eq(0).text(parseInt(ori_price).toLocaleString());
            $('#dt-sale').text(data_phone8[indexProd].sales*100+"%")
            $('.dt-detail-form').children().eq(2).text("VND "+parseInt(data_phone8[indexProd].storage[0][0][1]).toLocaleString());
            $('#dt-inventory').text(checkInventory(data_phone8[indexProd]));
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
                $('.dt-color').append(`<div class=" my-2" style="height:fit-content"><input type="radio" class="btn-check" name="dt-color" id="dtcolor${data_phone8[indexProd].colors.indexOf(element)}" value="${element}" autocomplete="off"><label class="btn btn-outline-orange fs-6 h-auto mx-1" for="dtcolor${data_phone8[indexProd].colors.indexOf(element)}">${element}</label></div>`);                
            });
            let descri1 = "Samsung has been maintaining a particularly strong Galaxy A series of devices for some time now. It has been iterating and improving its value proposition on these phones, and the new 2022 refresh is no different. You can read all about the new Galaxy A73 5G, A53 5G and A33 5G here to see exactly what we mean.<br> The new Galaxy A53 5G is now here for review. Since the 5X series has arguably been one of the better-geared devices in the series, it is also the toughest one to upgrade. In comparison, this year's Galaxy A33 5G is a much lower hanging fruit seeing how its predecessor came with an LCD.Changes going from the A52s 5G to the A53 5G are a lot more subtle. Simply put, not much has changed, certainly not enough to entice current owners of a recent Galaxy A5X series phone, but there are still some noteworthy changes here and there.<br>First up - the straight-up positive change - the A53 5G has a larger 5,000mAh battery than its predecessor. There is also a brand new chipset made by Samsung - the Exynos 1280. A modern 5nm part, still not officially present or detailed on Samsung's semiconductor website, but very much already in the wild and looking intriguing with a 2x2.4 GHz Cortex-A78 & 6x2.0 GHz Cortex-A55 CPU configuration, a Mali-G68 GPU and arguably even more versatile 5G setup than the Snapdragon 778G 5G inside the A52s 5G.On the flip side, there are some notable downgrades in the A53 5G as well. For one, it lacks the 3.5mm audio jack of its predecessor. It is also missing Wi-Fi 6 support. Though, it does offer slightly newer Bluetooth 5.1.Other than this, the A53 5G is pretty much identical both in terms of specs and design to its predecessor. Even though, technically, it has shrunk down some in physical size, all the while keeping its display diagonal and weight unchanged. So, you are essentially getting smaller display bezels and a larger battery for \"free\". Not counting the 3.5mm jack, that is.<br>>To sum up, the new Galaxy A53 5G seems to be a slightly \"tweaked\" variant of what Samsung already knows works and sells well. The slightly bigger battery is always nice to see, but what is going to either make or break the A53 5G is definitely the new Exynos 1280 chipset. To be perfectly frank, it just needs to be as good and not even better than the Snapdragon 778G 5G it is replacing. That would mean another wave of happy customers since every other feature of the A53 5G has been carried over from the previous model, and it's still a fantastic package.";
            let descri2 = "For this generation, Oppo has shuffled up the priorities, and we don't mind the new ones. For starters, an all-around impressive camera setup with big sensors and capable lenses, entirely unique to the Find X2 Pro, beats the Find X's limited (if good for what it was) stow-away outfit. You get a 48MP 1/1.43\" f/1.7 primary cam and another 48MP 1/2.0\" f/2.2 ultra-wide, each outspeccing competitors' offerings in one way or another. And the cherry on top of all that is the 13MP telephoto cam with a 5x periscope lens that beats the Galaxy S20 Ultra in zoom power, if not in resolution and sensor size.<br>Keeping the cameras static has meant a hole in the display, which isn\'t ideal, particularly when the previous generation had no such blemishes. But what a display it is, indeed - high resolution, high refresh rate, high brightness, high dynamic range, high color fidelity - high everything. We\'d take all that and live with the punch hole.And that is one of very compromises on the Find X2 Pro. It doesn\'t have wireless charging, but that\'s not really a make or break feature, the lack of a headphone jack is hardly news at this point, and who is really going to lament the missing microSD card slot with half a terabyte of built-in UFS 3.0 storage? <br> The Find X2 Pro also has an IP68 rating, the \'8\' being a first for Oppo with water and dust protection quite rare in the company\'s lineup to begin with. Stereo speakers get a check mark in the specsheet too and the 65 watts in the charging section are among the most watts you can get on a phone these days.";
            let descri3="The best iPhone ever, version 2022, size XL - we have the iPhone 14 Pro Max. The list of novelties this year includes the notch morphing into a pill, the introduction of an Always-On display, and an all-new primary camera - and while you can get all of that on the 14 Pro, the extra screen estate and longevity coupled with the Max's 'ultimate' status mean it has a market niche of its own.<br>The Face ID notch that\'s been with us since the iPhone X was nobody\'s favorite, and perhaps its reincarnation as a pill is a step towards its eventual removal. But not before turning the eyesore into a feature - the pill is a Dynamic Island of notifications, blurring the line between hardware and software.In a similar vein is the Always-On display - a software feature only made possible now in Apple\'s world thanks to LTPO displays being able to ramp down to 1Hz refresh rate.A massive increase in brightness is also among the key developments this year, this one solely in the hardware department.Late to yet another party, Apple finally joins virtually every other manufacturer and introduces a camera with a Quad Bayer type sensor - the specs on the 48MP main unit don\'t read like any other, so apparently, it\'s an exclusive design. The telephoto remains unchanged, but the ultrawide has gotten a sensor size upgrade, while the front-facing one now features autofocus (and maybe even OIS).On the hardware front, there\'s the mandatory chipset update, of course, and little else worth mentioning. Well, there\'s the blanked-out SIM card slot for the US models, which will only operate with eSIMs - does that count as a hardware change? Crash detection and emergency sort-of satellite connectivity are also on the list of new features combining software and hardware.";
            let descri4 = "A one-inch camera sensor in a phone, and this phone actually uses all of it? The Xiaomi 12S Ultra, the third installment in the company\'s lineup of ultimate flagships with an extra focus on imaging has just arrived. Unfortunately, just like that pioneering Mi 10 Ultra, this latest one will not be sold outside of China - but we do at least have one for review.<br>To avoid confusion, let\'s clear one thing up from the get-go - you probably know that already, but no physical dimension of the \'one-inch\' sensor is actually one inch. It\'s a long-standing oddity in digital camera sensor nomenclature, and we\'ll talk about it in more detail in the camera section of this review.It\'s still the largest camera sensor in a smartphone, tied with the Sharp Aquos R6 that practically nobody outside of Japan has seen and the Xperia Pro-I that\'s gotten more publicity, but has likely sold even fewer units. The China-only Xiaomi means one-inchers will maintain that exclusivity, but it\'s still closer to a mainstream device than those other two.<br>Oh, and unlike the Sony that crops from the center of its one-inch sensor, the Xiaomi utilizes all of it. And unlike the Sharp, the latest Ultra has advanced phase detect autofocus. So, tied for size it may be, but it is better - a properly remarkable camera, that much is certain.The rest of the rear setup isn\'t half bad either - it\'s just mostly the same as it was on the Mi 11 Ultra. Still great, and in many ways superior to the competition, just not all that new. New is the selfie camera, though, and here it will have to pull its own weight - with the little display on the back now gone, more photo ops will need to be handled by the front camera.<br>Outside of picturetaking, the 12S Ultra is a true flagship alright. The phone launches in the second half of the year, so time for the plus version of the Snapdragon 8 Gen 1. RAM and storage are ample, the display is cutting-edge, and the little niceties are here - IP68 rating, stereo speakers, infrared port. Battery capacity and charging capability aren\'t class-leading, but should do just fine. All things considered, that\'s not a specsheet we can complain about, no."
            let descri5="The Huawei nova series is intended for the younger generation with flashy looks and relatively low prices. The nova 9 family isn't far from the original formula. We got the vanilla nova 9 for this review, but the Pro model seems to be only slightly different - it has a bigger display, a smaller battery with faster charging and a secondary selfie camera. Sadly, only the standard nova 9 is making its way to the international market leaving the Pro to be a China-exclusive.<br>However, one would argue that the proper nova 9 might be the more sensible option of the two due to its lower price and relatively the same set of features. In fact, the bigger battery is usually preferred over the faster charging as per our Sunday debate poll from back in the day. Either way, you can use this review as a reference for the Pro model, as most of the hardware is matched.<br>For €499, the nova 9 offers a flagship-grade 6.57-inch, 120Hz OLED panel and 10-bit color depth, potent Snapdragon 778G and a capable 50MP main camera. The 4,300 mAh battery charges over a speedy 66W brick too. A well-rounded midranger that would surely meet plenty of resistance outside of China.After all, the whole Huawei-US drama isn't over, so Huawei's phones ship without Google Mobile Services, which is less than ideal outside of China. That's a big hurdle to overcome. To be honest, Huawei's HarmonyOS has come a long way with version 2.0. There are plenty of native apps already, and the so-called Petal search provides a fast and easy way to sideload apps through third-party stores.The nova 9, though, runs on EMUI 12 based on Android 11, which is pretty close to the China-exclusive HarmonyOS. In any case, we will check if the HMS-powered EMUI 12 will make us forget about GMS and see how the device stacks against the competition in terms of raw power, endurance, display quality, etc. You might be in for a surprise."
            let name_phone ="";
            let str_des="";
            switch(data_phone8[indexProd].brand){
                case "Samsung":
                    name_phone=data_phone8[indexProd].title.slice(15);
                    str_des = descri1.replaceAll("A33",name_phone);
                    $('#dt-describe').html(str_des);
                    break;
                case "Oppo":
                    name_phone =data_phone8[indexProd].title.slice(6);
                    str_des = descri2.replaceAll("Find X2 Pro",name_phone);
                    $('#dt-describe').html(str_des);
                    break;
                case "Apple":
                    name_phone =data_phone8[indexProd].title.slice(7);
                    str_des = descri3.replaceAll("14 Pro Max", name_phone);
                    $('#dt-describe').html(str_des);
                    break;
                case "Xiaomi":
                    name_phone=data_phone8[indexProd].title.slice(8);
                    str_des = descri4.replaceAll("12S Ultra",name_phone);
                    $('#dt-describe').html(str_des);
                    break;
                case "Huawei":
                    name_phone=data_phone8[indexProd].title.slice(7);
                    str_des = descri5.replaceAll("nova 9",name_phone);
                    $('#dt-describe').html(str_des);
                    break;
            }
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
                $('.comment').append(`<div class="col-md-2 col-lg-3 col-sm-2"><i class="fa-solid fa-circle-user ps-lg-5" style="font-size:3rem;"></i></div><div class="col-md-10 col-lg-8 col-sm-auto"><p class="h5" id="dt-cmt-start${i}">User${randomUser} - </p><p>${comments_arr[randComt].cmt}</p></div>`);
                for(let j =0 ; j<parseInt(comments_arr[randComt].star);j++){
                    $('#dt-cmt-start'+i).append("<i class='fa-solid fa-star text-warning'></i>");
                };
                $('.comment').append("<hr style='width:90%; margin-left:20px'>");
            };
            let arr_R= rand_Prod(data_phone8,[]);
            for(let i = 0; i<4; i++){
                let str="";
                let stars="";
                for (const key in data_phone8[arr_R[i]].storage) {
                    str +=`<button class="btn btn-outline-dark lst-btn-sm">${data_phone8[arr_R[i]].storage[key][key][0]}</button>`
                }
                for(let j =0; j< data_phone8[arr_R[i]].rating;j++){
                    stars+=`<i class="fa-solid fa-star text-warning"></i>`;
                }
                let saleDt = (data_phone8[arr_R[i]].sales != 0)?`<span class="badge text-bg-danger">- ${data_phone8[arr_R[i]].sales*100}%</span>`:"";
                $('.rand-product').append(`<div class="card mb-5 p-0 border-0 card-product mx-auto col" ><a href="#!detail/:id=${arr_R[i]}"><img src="${data_phone8[arr_R[i]].image[0]}" alt="${i}" class="rounded shadow card-img-top" ></a><div class="card-body d-flex flex-column justify-content-between">
                <h6 class="card-title">${data_phone8[arr_R[i]].title} ${saleDt}</h6><div class="card-text">${str}</div><p class='text-danger fw-bold mt-3' style="font-size:14px;">VND ${data_phone8[arr_R[i]].storage[0][0][1].toLocaleString()}</p><p>${stars} <span class="text-black-50">(${data_phone8[arr_R[i]].soled})</p></div></div>`);
            };
            $('.to-detail').click(function(){
                console.log("TO TOP");
                toTop();
            })
            $('input[name="dt-quan"]').on('blur',function(event){
                ($(event.currentTarget).val() >= data_phone8[indexProd].inventory)?$('.warning-quan').show():$('.warning-quan').hide();
            });
            changeQuanDT(data_phone[indexProd]);
            $('#dt-atc').on('click',function(){
                let usr =localStorage.getItem('user');
                if(!usr){
                    if(confirm("You need to Sign in before add items to Cart")){
                        location.href = "#!signin";
                    };
                }else{
                    let select1 = $('input[name=dt-storage]:checked').val();
                    let select2 = $('input[name=dt-color]:checked').val();
                    let dtquantity = parseInt($('input[name=dt-quan]').val());
                    if(dtquantity <= data_phone8[indexProd].inventory){
                        console.log(dtquantity);
                        saveCart(data_phone[indexProd],select1,select2,dtquantity);
                        coutItem();
                        let currentInven = parseInt($('#dt-inventory').text());
                        $('#dt-inventory').text(currentInven - dtquantity);
                    }else{
                        alert("You have added more products than we have");
                    }
                }
            });
            $('.dt-buy-now').on('click',function(event){
                let usr =localStorage.getItem('user');
                if(!usr){
                    if(confirm("You need to Sign in before add items to Cart")){
                        location.href = "#!signin";
                    };
                }else{
                let select1 = $('input[name=dt-storage]:checked').val();
                let select2 = $('input[name=dt-color]:checked').val();
                let dtquantity = parseInt($('input[name=dt-quan]').val());
                saveCart(data_phone[indexProd],select1,select2,dtquantity);
                coutItem();
                }
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
        const searching =(data,arr,event)=>{
        let arr_search = data.filter(element=>{
            let titl= element.title.toLowerCase().split(' ');
            return arr.every(el=>titl.includes(el));
        });
        if(arr_search.length == 0){
            $('#search-list').html(`<div class="col-12 " id="emty"><p>No phone matched</p></div>`)
        }else{
            $('#emty').empty();
        }
        if(event == "click"){
            detailSmall(data_phonex,arr_search);
        }else{
            let keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                if(!$('main').children().hasClass('productLst')){
                    location.href = '#!listitem/:brand=all';
                };
                detailSmall(data_phonex,arr_search);
            }else{
                $('#search-list').empty();
                arr_search.forEach(element=>{
                    let x = data.indexOf(element);
                    $('#search-list').append(`<div class="col-12 " style="height: 65px"><a href="#!detail/id=${x}" style="width: 50px;float:left;"><img src="${element.image[0]}" class="img-fluid"></a><a href="#!detail/id=${x}" class="d-inline text-decoration-none text-dark" style="font-size:1.1rem">${element.title}</a></div>`);
                });
            };
            $('#search-btn').on('click',function(event){
                if(!$('main').children().hasClass('productLst')){
                    location.href = '#!listitem/:brand=all';
                };
                detailSmall(data_phonex,arr_search);
            })
        }
    }
    const toTop =()=>{
        $("html, body").animate({ scrollTop: 0 }, "fast");
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
        $('.detailsm-img').attr('src',obj.image[0]);
        $('.detailsm-img').attr('alt',index);
        $('.get-detail').attr('href',`#!detail/:id=${index}`);
        $('#phone-name-modal').text(obj.title);
        $('#phone-name-modal').attr('href',`#!detail/:id=${index}`);
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
    const detailSmall =(data, arr)=>{
        $('#list_product').empty();
        let ind;
        let str= "";
        let stars="";
        for(const element of arr){
            for (const key in element.storage) {
                str +=`<button class="btn btn-outline-dark lst-btn-sm">${element.storage[key][key][0]}</button>`
            }
            for(let j =0; j< element.rating;j++){
                stars+=`<i class="fa-solid fa-star text-warning"></i>`;
            };
            let index_phone = data.indexOf(element);
            let saleDt = (element.sales != 0)?`<span class="badge text-bg-danger">- ${element.sales*100}%</span>`:"";
            $('#list_product').append(`<div class="card mb-5 p-0 border-0 card-product mx-auto col" ><a data-bs-toggle="modal" data-bs-target="#pup" class=""><img src="${element.image[0]}" alt="${index_phone}" class="rounded shadow card-img-top" ></a><div class="card-body d-flex flex-column justify-content-between">
            <h6 class="card-title">${element.title} ${saleDt}</h6><div class="card-text">${str}</div><p class='text-danger fw-bold mt-3'>VND ${element.storage[0][0][1].toLocaleString()}</p><p>${stars} <span class="text-black-50">(${element.soled})</p><a href="#!detail/id=${index_phone}" class="btn btn-primary">More Detail</a></div></div>`);
            str="";
            stars="";
        };
        $('#list_product').append(`<div class="modal fade modal-lg" id="pup" tabindex="-1" aria-labelledby="detailItem" aria-hidden="true"><div class="alert position-absolute w-auto alter" style="bottom: 50px;left: 50%;display:none; margin-left:-100px;z-index:3;" role="alert"></div><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><a href="" class="modal-title h3 text-black text-decoration-none" id="phone-name-modal"></a><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><div class="container-fluid"><div class="row g-0 h-100 w-100"><div class="col-md-4 col-lg-4 col-sm-12 h-100 inffo-img mx-auto"><a class="get-detail"><img src="" alt="" class="img-fluid rounded-start h-100 detailsm-img"></a></div><div class="col-md-8 col-lg-4 col-sm-8 mx-auto py-lg-5 detailsm"><div class="card-body w-100"><form><div class="w-100 phone-gb d-flex flex-row justify-content-evenly flex-wrap mx-auto" style="height:fit-content"></div><p class="mt-2" style="">Color</p><div class="w-100 phone-color d-flex flex-row justify-content-evenly flex-wrap mx-auto" style="height: fit-content"></div><p class="text-center price1"></p><p class="h3 text-danger text-center price2"></p><div class="mx-auto mb-4 phone-start" style="height:fit-content"></div></form><div class="d-flex flex-row justify-content-center w-100 mb-3" style="height:fit-content;"><button class="btn btn-outline-orange detailsmATC mx-4" style="position:relative" ><i class="fa-solid fa-cart-shopping fs-3"></i></button><button class="btn btn-outline-orange detailCompar w-50" style="position:relative"><img src="image/comparison.png" alt="comparision" width="26px" ></button></div></div></div></div></div></div></div></div>`);
        $('.get-detail,#phone-name-modal').on('click',function(){
            $('.modal').modal('hide');
        });
        $('.card-product').on('click',function(event){
            ind  = $(this).find('img').attr('alt');  
            showdtsm(data[ind],ind);
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
            event.preventDefault();
            let userCheck = localStorage.getItem('user');
            console.log(userCheck);
            if(!userCheck){
                if(confirm("You need to Sign in before add items to Cart")){
                    $('#pup').modal('hide');
                    location.href = "#!signin";
                };
            }else{
                ind = $('.detailsm-img').attr('alt');
                let storage = $('input[name="storage"]:checked').val();
                let color= $('input[name="color"]:checked').val()?$('input[name="color"]:checked').val():null;
                saveCart(data[ind],storage,color)
                coutItem();
                $('.alter').removeClass('alert-warning').addClass(' alert-success').html(`<i class="fa-solid fa-cart-circle-check"></i> &nbsp; Add the item to cart successfully`).fadeIn(1000);
                $('.alter').fadeOut(1000);
            };
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
                    $('.alter').removeClass('alert-warning').addClass('alert-success').html(`<i class="fa-solid fa-check"></i> Add the item to the comparison successfully`).fadeIn(1000);
                    $('.alter').fadeOut(2000);
                }else if(arrCp.length >= 3){
                    countCmp=arrCp.length;
                    $('.alter').removeClass('alert-success').addClass('alert-warning').html(`<i class="fa-solid fa-triangle-exclamation"></i> You can not add more than 3 items to comparison!`).fadeIn(1000);
                    $('.alter').fadeOut(3000);
                }else{
                    countCmp=arrCp.length;
                    $('.alter').removeClass('alert-success').addClass('alert-warning').html(`<i class="fa-solid fa-triangle-exclamation"></i> This item almost in the comparison!`).fadeIn(1000);
                    $('.alter').fadeOut(3000);
                };
            }else{
                let arr = [];
                arr.push(indCp);
                countCmp=arr.length;
                json_str = JSON.stringify(arr);
                localStorage.setItem('compar',json_str);
                $('.alter').removeClass('alert-warning').addClass('alert-success').html(`<i class="fa-solid fa-check"></i> Add the item to the comparison successfully`).fadeIn(1000);
                $('.alter').fadeOut(2000);
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
            $('.name-phones').append(`<th class='col-3'><img src="${data[ind].image[0]}" class="img-compar img-fluid h-100" alt="${ind}" style="object-fit: contain;"><p class="h4">${data[ind].title}</p></th>`);
            lastrow+=`<td class="${arrObj.indexOf(ind)}"><button class="btn text-danger fs-4 remove-compar"><i class="fa-regular fa-circle-minus"></i></button></td>`;    
        });
        lastrow+="</tr>";
        let arrDifference= comparable(data[arrObj[0]],data[arrObj[1]],data[arrObj[2]]);
        console.log(arrDifference);
        for(const element of arrDifference){
            $('#compareTable').append('<tr style="padding:10px 0;">');
            for (const [key,value] of Object.entries(element)) {
                $('#compareTable').append(`<td class="text-center text-capitalize fw-bold border-bottom">${changeKey(key)}</td>`);
                for(let j = 0; j<arrObj.length;j++){
                    $('#compareTable').append(`<td class="border-bottom" >${value[j]}</td>`);
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
    }; 
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
        console.log(arrx)
        return arrx;
    };  // Filter range money
    const sortPhone = (arr,arr1)=>{
        let arrx = [...arr];
        let arr2=[];
        if(arr1.length == 0){
            return arr;
        }else{
            switch(arr1[0]){
                case "lowestprice":
                    arr2 = sortLowest(arrx,arrx,arrx[0],[],arrx.length);
                    arr= arr2.copyWithin(0);
                    break;
                case "rating":
                    arr2 = sortOffer(arrx,arrx,arrx[0],[],arrx.length);
                    arr= arr2.copyWithin(0);
                    break;
                case "selling":
                    arr2 = hotCel(arrx,arrx,arrx[0],[],arrx.length);
                    arr = arr2.copyWithin(0);
                    break;
                case "sales":
                    arr2 = salesItem(arrx,arrx,arrx[0],[],arrx.length);
                    arr = arr2.copyWithin(0);
                    break;
            };
            arr1.shift();
            return sortPhone(arr,arr1);
        }
    };  // Sorting phone
    const saveCart = (obj,storage,color,quan=1)=>{
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
                    checkk = false;
                    el.quantity+=quan;
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
            let pric = parseInt(cart[i-1].price);
            prce*=cart[i-1].quantity;
            sum+=prce;
            let color = cart[i-1].clr?cart[i-1].clr:"";
            table.append(`<tr><td class='text-center'>${i}</td><td>${cart[i-1].name} - <span class="text-black-50 fs-6">${color}</span></td><td class='text-center' style='padding-top:15px;'><i class="fa-solid fa-minus text-primary me-md-1 me-lg-3 decrease"></i><span>${cart[i-1].quantity}</span><i class="fa-solid fa-plus text-primary ms-md-1 ms-lg-3 increase"></i></td><td>${pric.toLocaleString()}</td><td class="del-item"><i class="fa-solid fa-xmark text-danger"></i></td></tr>`);
        };
        $('#total').text(sum.toLocaleString());
    };  // Popup Cart showing
    const changQuan = ()=>{
        let table= $('.tb-body');
        let json_st = localStorage.getItem('items');
        let cart = JSON.parse(json_st);
        let sum=0;
        $('.decrease').click(function(event){
            let index = $(event.currentTarget).parent().siblings().eq(0).text() -1;
            let cur_In = parseInt($('#dt-inventory').text());
            if((cart[index].quantity-1) ==0){
                if(confirm("Do you really want to remove this item from your cart?")){
                    cart[index].quantity--;
                    if(cur_In){$('#dt-inventory').text(cur_In+1)};
                    if(cart[index].quantity == 0){
                        cart.splice(index,1);
                        let json_st2 = JSON.stringify(cart);
                        localStorage.setItem('items',json_st2);
                        table.empty();
                        table.append('<tr><td colspan="4">There is no item in cart</td></tr>');
                        listingCart(cart);
                        changQuan();}
                }
            }
            else{
                cart[index].quantity--;
                if(cur_In){$('#dt-inventory').text(cur_In+1)};
                sum = parseInt($('#total').text().split(',').join(''));
                sum-=parseInt(cart[index].price);
                $(event.currentTarget).next().text(cart[index].quantity);
                $('#total').text(sum.toLocaleString());
                let json_st2 = JSON.stringify(cart);
                localStorage.setItem('items',json_st2);
            };
            dlive_item(cart);
            coutItem();
        });
        $('.increase').click(function(event){
            let index = $(event.currentTarget).parent().siblings().eq(0).text() -1;
            sum = parseInt($('#total').text().split(',').join(''));
            cart[index].quantity++;
            let cur_In = parseInt($('#dt-inventory').text());
            if((cur_In-1)>= 0){
                $('#dt-inventory').text(cur_In-1);
                sum+=parseInt(cart[index].price);
                $(event.currentTarget).prev().text(cart[index].quantity);
                $('#total').text(sum.toLocaleString());
                dlive_item(cart);
                let json_st2 = JSON.stringify(cart);
                localStorage.setItem('items',json_st2);
                coutItem();
            }else if((cur_In-1)<0){
                alert("Can not add more this item \nYou have reached the limit");
            }else{
                sum+=parseInt(cart[index].price);
                $(event.currentTarget).prev().text(cart[index].quantity);
                $('#total').text(sum.toLocaleString());
                dlive_item(cart);
                let json_st2 = JSON.stringify(cart);
                localStorage.setItem('items',json_st2);
                coutItem();
            };
        });
        $('.del-item').on('click',function(event){
            let cur_In = parseInt($('#dt-inventory').text());
            if(confirm("Do you really want to remove this item from your cart?")){
                let index =$(event.currentTarget).siblings().eq(0).text()-1;
                if(cur_In){$('#dt-inventory').text(cur_In+cart[index].quantity)};
                cart.splice(index,1);
                let json_st2 = JSON.stringify(cart);
                localStorage.setItem('items',json_st2);
                table.empty();
                listingCart(cart);
                dlive_item(cart);
                changQuan();
                coutItem();
            }
        });
        $('.clear').on('click',function(){
            table.empty();
            table.append('<tr><td colspan="4">There is no item in cart</td></tr>');
            localStorage.removeItem('items');
            $('#total').text(0);
            coutItem();
            dlive_item(JSON.parse(localStorage.getItem('items')));
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
    const checkInventory = (obj)=>{
        let num = obj.inventory;
        let cart_json=localStorage.getItem('items');
        if(cart_json){
            let cart = JSON.parse(cart_json);
            cart.forEach(element=>{
                if(element.name == obj.title){
                    num = obj.inventory - element.quantity;
                }
            });
        }
        return num;
    }
})