$(document).ready(function(){
    $.getJSON( "data/blog.json", function( data ) {
        let blogs = [];
        $.each( data, function() {
            blogs = data;
        });
        blogs.forEach(element=>{
          $('#blog').append(`<div class="row blog-list mt-3 pb-3"><a href="#!blog/id=${blogs.indexOf(element)}" class="col-4"><img src="${element.image}"  class="img-fluid"><div class="col-8"></a>
            <a href="#!blog/id=${blogs.indexOf(element)}" class="fw-bold fs-5 mt-3 text-decoration-none text-dark">${element.title_blog}</a><p>${element.blog[0]}</p></div><a href="#!blog/id=${blogs.indexOf(element)}"  class="text-end" style="font-size:14px">Read more</a></div>`);
        });
        let ulr_blog= window.location.href;
        let index=  ulr_blog.split('=');
        index = index[index.length-1];
        $('#blog-title').text(blogs[index].title_blog);
        $('#blog-img').attr('src',blogs[index].image);
        $('#blog-text').html(blogs[index].blog.join('<br>'))
    })
})