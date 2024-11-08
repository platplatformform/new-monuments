$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
    if ($('#prompt-tag').isInViewport()) {
        $('#prompt-tag').addClass('rotation');
    }
});

$(function(){
    var i= 0;
    //when the next button is clicked on
    $('.next').on("click", function(){
        //increase the display picture index by 1
        i = i + 1;
        //if we are at the end of the image queue, set the index back to 0
        if (i == $('.gallery-image').length) {
            i=0;
        }
        //set current image and previous image
        var currentImg = $('.gallery-image').eq(i);
        var prevImg = $('.gallery-image').eq(i-1);
        //call function to animate the rotation of the images to the right
        animateImageLeft(prevImg, currentImg);  
    });
    //when the previous button is clicked on
    $('.prev').on("click", function(){
        //if we are at the beginning of the image queue, set the previous image to the first image and the current image to the last image of the queue
        if (i==0) { 
            prevImg = $('.gallery-image').eq(0);
            i=$('.gallery-image').length-1;
            currentImg = $('.gallery-image').eq(i);
        }
        //decrease the display picture index by 1
        else {
            i=i-1;
            //set current and previous images
            currentImg = $('.gallery-image').eq(i);
            prevImg = $('.gallery-image').eq(i+1);
        }
        //call function to animate the rotation of the images to the left
        animateImage(prevImg, currentImg);  
    });
    //function to animate the rotation of the images to the left
    function animateImageLeft(prevImg, currentImg) {
        //move the image to be displayed off the visible container to the right
        currentImg.css({"left":"100%"});
        //slide the image to be displayed from off the container onto the visible container to make it slide from the right to left
        currentImg.animate({"left":"0%"}, 500);
        //slide the previous image off the container from right to left
        prevImg.animate({"left":"-100%"}, 500);
    }
    //function to animate the rotation of the images to the right
    function animateImage(prevImg, currentImg) {
        //move the image to be displayed off the container to the left
        currentImg.css({"left":"-100%"});
        //slide the image to be displayed from off the container onto the container to make it slide from left to right
        currentImg.animate({"left":"0%"}, 500);
        //slide the image from on the container to off the container to make it slide from left to right
        prevImg.animate({"left":"100%"}, 500); 
    }
});

// Get the tag data
function createCard(cardData) {
  var cardTemplate = [
    '<div class="tag-wrapper">',
    '<img src="assets/images/all-tags/',
    cardData.Position,
    '.png">',
    '<div class="transcription"><p>',
    cardData.Transcription,
    '</p></div></div>'
  ];

  // a jQuery node
  return $(cardTemplate.join(''));
}

var cards = $();
// Store all the card nodes
data.forEach(function(item, i) {
  cards = cards.add(createCard(item));
});

// Add them to the page
$(function() {
  $('#tag-grid').append(cards);

});

$("#search").on("keyup", function() {
  var value = $(this).val().toLowerCase().trim();
  var v = value.split("%");
  $("#tag-grid div").each(function(j,k) {
    var s = true;
    $.each(v, function(i, x) {
      if (s) {
        s = $(k).text().toLowerCase().indexOf(x) > -1;
      }
    });

    // $(this).toggle(s);

    if ( s === true ) {
        $(this).show().addClass('search-visible');
    } else if ( s === false ) {
        $(this).hide().removeClass('search-visible');
    }

    // if the search input is empty
    if( !value ) {
        $(this).show().removeClass('search-visible');
    }

    // show the 'no results' div
    if($('#tag-grid').children(':visible').length == 0) {
        $('#no-results').show();
    } else {
        $('#no-results').hide();
    }

    // adjust spacing on tag grid
    if($('#tag-grid').find('div.search-visible').length !== 0) {
        $('#tag-grid').addClass('has-results');
    } else {
        $('#tag-grid').removeClass('has-results');
    }
 

  });
});

$(".tag-wrapper").hover(
  function() {
    $(this).addClass("hovered");
  }, function() {
    $(this).removeClass("hovered");
  }
);

