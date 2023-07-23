// let btn = document.querySelector('btn');
// btn.addEventListener('click', callBackFunc);

// function callBackFunc()
// {
//   console.log(щщщщ);
// }


$(document).ready(function () {

  // Menu burger

  $('.js-burger').on('click', function () {
    $('.js-menu').slideToggle();
  });

  // AJAX catalogue

  $('.js-catalogue-btn').on('click', function () {
    $.ajax({
      type: 'POST',
      url: '../jsons/catalogue.json',
      data: {
        quantity: 1
      },
      success: function (res) {
        let catalogueHtml = createCatalogueHtml(res.catalogue);

        $('.js-catalogue-wrap').append(catalogueHtml);
      },
      error: function () {
        console.log('NOPE');
      }
    });
  });

  function createCatalogueHtml(dataArray) {
    let htmlString = '';

    dataArray.forEach(function (item) {
      htmlString = htmlString +
        `<div class="catalogue-wrap"><img src="${item.imgUrl}" alt="${item.imgAlt}" class="catalogue-img"></img><figcaption class="catalogue-caption">${item.text}</figcaption></div >`;
    });


    return htmlString;
  }

  // Catalogue tabs filtration

  $('.js-filter-link').on('click', function (event) {
    event.preventDefault();

    $('.js-filter-link').removeClass('active');
    $(this).addClass('active');

    let filterType = $(this).data('filter');

    if (filterType === 'all') {
      $('.js-catalogue-item').show();
      return;
    }

    $('.js-catalogue-item').each(function () {
      let dataType = $(this).data('type');

      if (filterType === dataType) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });


  // Accordion FAQ

  let prevBtn;
  $('.js-accordion-btn').on('click', function () {
    if (prevBtn === this) {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    } else {
      $(prevBtn).next().slideUp();
      $(prevBtn).removeClass('open');
      $(this).next().slideDown();
      $(this).addClass('open');
      prevBtn = this;
    }
  });


  // Slick carousel
  $('.js-carousel').slick({
    autoplay: true
  });

});


// Contacts tabs

$('.js-tab-link').on('click', function(event) {
  event.preventDefault();
  $('.js-tab-link').removeClass('active');
  $(this).addClass('active');

  let index = $(this).index('.js-tab-link');

  $('.js-contacts-item').removeClass('active');
  $('.js-contacts-item').eq(index).addClass('active');
});
