<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>


jQuery(function($){
 var acc
var swiper
//Funcion que se activa al hacer click en un marcador  
$(document.body).on('select.wpgmza', (event) => {
$('.grouping-handle').trigger('click')

//$('#markerInfoPreview').hide('normal', function(){ $('#markerInfoPreview').remove(); });
  console.log(event.target)

  var infoPreview = '<div class="row rowChange">'
  for(var i = 2; i < event.target.custom_field_data.length; i++){
  infoPreview += '<div class="col center"> <i style ="height: 35px;width:35px;margin-top:-2px" class ="inmu'+event.target.custom_field_data[i].name+'"></i> <p style = "font-family: inmu; margin-top: 2px;">'+event.target.custom_field_data[i].value+'</p></div>' 
  }
	infoPreview += '</div>'
  if($(this).find('div[title='+event.target.title+']').find('#markerInfoPreview').length == 0){
  
  $('div[title='+event.target.title+']').addClass('markerChange')
	console.log('agregando')
  //$('div[title='+event.target.title+']').append()
  setTimeout(function(){
          $('<div style = "display: none;"class="markerPreview" id="markerInfoPreview">'+infoPreview+'</div>').appendTo('div[title='+event.target.title+']').show('normal');
  }, 450);
    $('div[title='+event.target.title+'] img').css('display', 'none')
 }
 
  let fields = JSON.parse(JSON.stringify(event.target.custom_field_data))
   var iconos = ''
     if (fields.filter(e => e.name === 'Descripcion').length > 0) {
            iconos += '<div name="inmuDescripcion">' + fields[0].value + '</div>'
            fields.splice(0, 1)     
        }
  //Carga la descripcion general con iconos
   iconos += '<div class="row ml-3" style="justify-content: space-between;">'
  for(var i = 0; i < fields.length; i++){
  iconos += '<div style ="width: 120px !important;" class= "row mt-2 pt-1 pb-1" ><div class="col-3" style="display: flex; align-items: center;"> <i style ="height: 35px;width:35px;margin-top:-2px" class ="inmu'+fields[i].name+'"></i></div><div class="col-3 ml-3" style="display: flex; align-items: center;">'+ fields[i].value +'</div></div>' 
  }
  iconos += "</div>"
   $('.ac-text').eq(0).append(iconos) 

  var data = {
            action: 'contact_form'
        }
        $.post('/wp-admin/admin-ajax.php',data).done(function(response) {    
             $('#contactForm').html(response);   
          $form = $('#contactForm .wpcf7-form').eq(0);
            wpcf7.init($form[0]);
          
            $('#idINMU').val(event.target.id)
 			$('#propiedadINMU').val(event.target.title)
 			$('#direccionINMU').val(event.target.address)
          
          $.ajax({
  url: "https://geolocation-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function(location) {

 	$('#ubicacionINMU').val( location.country_name + ", " + location.state + ", " + location.city )                                     
  }
});
                                     
        });
  
  if ($('header').width() < 960 ){
    $('.icon-menu,#logo').css({
        'display': 'none',
    });
       } else {
         $('.icon-menu').css({
        'display': 'none',
    });
       }

if(event && event.target && event.target instanceof WPGMZA.Marker){
let markerID = event.target.title;
  
  	$('video.wpgmza-embedded-media').attr('webkit-playsinline', '')
    $('video.wpgmza-embedded-media').attr('playsinline', '')
 	$('video.wpgmza-embedded-media').trigger('play')
 	$('video.wpgmza-embedded-media').removeAttr('controls');
    $('video.wpgmza-embedded-media').attr('loop', '')
      swiper = new Swiper(".mySwiper", {
        loop: false,
        centeredSlides: true,
        speed: 1000,
                effect: "cube",

         cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
  
  $(".wplightbox").wonderpluginlightbox();
  acc = new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: true,
});
 acc.open(0)
/*
   setTimeout(function () {
		acc.open(2)
     }, 1000); 
*/

}
});
  
     $(document).on('click', '.viewport-grouping', function(e) {
       console.log('borrandoClick')
$('#markerInfoPreview').hide('normal', function(){ $('#markerInfoPreview').remove(); });

      if ($(this).hasClass('expanded')){
           $('.icon-menu').css({
               'display': 'none',
            });
            if ($('header').width() < 960 ){
                  $('#logo').css({
                  'display': 'none',
              });
            }
       } else{
       $('.icon-menu,#logo').css({
        'display': 'block',
    		});
         }
	}); 
  
//Function to add sandbox on iframe load (prevents redirection scripts)
$('body').on('DOMNodeInserted', 'iframe', function(e) {
  if($(this).hasClass('html5lightbox-web-iframe')){
     console.log("Iframe inserted into document");
     $(this).attr('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms')
  }
});
  
  $(document).on('click', '.acContactar', function(e) {
    $('.ac-trigger').each(function () {
            if (!$(this).hasClass('acContactar') && $(this).parent().parent().hasClass('is-active') )
					acc.close($(this).index('.ac-trigger'))
    		})
           })
  
  $(document).on('click', '.ac-trigger', function(e) {
        if(! $(this).hasClass("acContactar")){

   			if ($('.acCustom').hasClass('is-active'))
               	acc.close($('.acCustom').find('.ac-trigger').index('.ac-trigger'))
        }
   
  });

  
  });
