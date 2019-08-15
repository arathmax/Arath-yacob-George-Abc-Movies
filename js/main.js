$( document ).ready(function() {
      makeRequest("1");
      $('.pagination-list li').on('click',function(event){
        console.log($(event.target).text());
        makeRequest($(event.target).text());
      })
    
});

function makeRequest(pageNo){
  $.get( "https://api.themoviedb.org/3/movie/now_playing?api_key=0293e7ea857843f1e5d640c1a98d77a5&language=en-US&page="+pageNo, function( data ) {
        console.log(data);
        moviesCard(data.results);
    });
}
function makeVideo(id){
  $.get( `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0293e7ea857843f1e5d640c1a98d77a5&language=en-US`, function( data ) {
        console.log(data);
        overlay(data);
    });
}
function moviesCard(data){
  var html="";
  data.forEach(function(movie,index) {
     html += '<article class="media card"> <div class="media-left"> <figure class="img-box image is-128x128"> <img src=https://image.tmdb.org/t/p/w185_and_h278_bestv2//'+movie.poster_path+' alt="Image"> </figure><div class="Trailer" data-id='+movie.id+'>View Trailer</div><div class="Detail">View Detail</div> </div><div class="media-content"> <div class="content"> <p class="title">'+movie.original_title+'</p><p class="content">'+movie.overview+' </p></div><nav class="level is-mobile"> <div class="level-left"> <a class="level-item" aria-label="reply"> <span class="icon is-small"> <i class="fas fa-reply" aria-hidden="true"></i> </span> </a> <a class="level-item" aria-label="retweet"> <span class="icon is-small"> <i class="fas fa-retweet" aria-hidden="true"></i> </span> </a> <a class="level-item" aria-label="like"> <span class="icon is-small"> <i class="fas fa-heart" aria-hidden="true"></i> </span> </a> </div></nav> </div></article>';
  });
  $('.box').empty();
  $('.box').append(html);
  $('.Trailer').on('click',function(event){
    console.log($(event.target).attr('data-id'));
    makeVideo($(event.target).attr('data-id'));
  })
}

function overlay (result){
  $('#overlay-video').remove();
  $('body').append( `
      <div id="overlay-video">
      <iframe width="300" height="420" src="https://www.youtube.com/embed/${result.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`);
}