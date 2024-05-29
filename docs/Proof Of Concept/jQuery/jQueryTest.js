$('#greeting').text('Hello World from jQuery');

$('#description').on('click ', () => {
  $('#greeting').fadeOut();
  console.log('element selected')
  $('#greeting').slideDown("slow");
});

$('#description').mouseenter( () => {
  $('#description').css('color', 'purple');
});

$('#description').on('mouseleave', () => {
  $('#description').css('color', 'orange');
});

$('section').animate({
  width:  '50%',
  borderWidth: '10px'
}, 2000);

// $('#description').off('click');

$('<p id="after">insertAfter greeting from jQuery</p>').insertAfter('#greeting');
$('<p>insertBefore greeting from jQuery</p>').insertBefore('#greeting');

$('p').toggleClass('newStyle');

$('#after').toggleClass('style2');

$('p:last').css({ "font-size": "40px", "color": "orange" });

