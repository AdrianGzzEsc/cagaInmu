
$(document).on("submit", "#formCasa", function (event) {
    event.preventDefault()
    $('#preview').html('')

    var categorias = []
    var data = {}
    var casaCat = ["1", "9", "25", "10"]
    categorias.push("1")

    $('#nav-casa').find('[name = amenidad]').each(function () {
        if ($(this).is(":checked"))
            categorias.push($(this).val())
    })
    if (!multipleExist(casaCat, categorias))
        categorias.push("11")
    //data final
    dataFinal.category = String(categorias).replace(/[|"|]|/g, "")
    dataFinal.baños = $('#nav-casa').find('[name = baños]').val()
    dataFinal.metros = $('#nav-casa').find('[name = metros]').val()
    dataFinal.habitaciones = $('#nav-casa').find('[name = habitaciones]').val()
    dataFinal.estacionamiento = $('#nav-casa').find('[name = estacionamiento]').val()
    dataFinal.precioMuestra = $('#nav-casa').find('[name = precioRango]').val()
    dataFinal.precio = $('#nav-casa').find('[name = precio]').val()
    dataFinal.antiguedad = $('#nav-casa').find('[name = antiguedad]').val()
    dataFinal.titulo = $('#nav-casa').find('[name = titulo]').val()
    dataFinal.direccion = eliminarDiacriticos($('#nav-casa').find('[name = direccion]').val())
    dataFinal.detalles = $('#nav-casa').find('[name = detalles]').val()

    //
    data.categorias = categorias
    data.recorrido = $('#nav-casa').find('[name = recorrido]').val()
    data.precio = $('#nav-casa').find('[name = precioRango]').val()
    data.descripcion = $('#nav-casa').find('[name = descripcion]').val()

    data.customFields = []

    data.customFields.push({ name: "Descripcion", value: $('#nav-casa').find('[name = detalles]').val() })
    data.customFields.push({ name: "Precio", value: $('#nav-casa').find('[name = precioRango]').val() })
    data.customFields.push({ name: "Metros", value: $('#nav-casa').find('[name = metros]').val() })
    data.customFields.push({ name: "Estacionamiento", value: $('#nav-casa').find('[name = estacionamiento]').val() })
    data.customFields.push({ name: "Habitaciones", value: $('#nav-casa').find('[name = habitaciones]').val() })
    data.customFields.push({ name: "Baños", value: $('#nav-casa').find('[name = baños]').val() })
    data.customFields.push({ name: "Antiguedad", value: $('#nav-casa').find('[name = antiguedad]').val() })
    data.customFields.push({ name: "Pisos", value: $('#nav-casa').find('[name = pisos]').val() })


    var template = '<div id="precioINMU" style="text-align: center;font-family: inmu;font-size: 32px;"></div><div id="iconosINMU"></div>'
    if (data.recorrido != "")
        template += '<div id="iframeLoad"><a href="' + data.recorrido + '" class="wplightbox">RECORRIDO VIRTUAL</a></div>'
    template += '<div class="swiper mySwiper"><div class="swiper-wrapper">'

    for (let index = 0; index < linkSwiper.length; index++) {
        if (linkSwiper[index].includes('mp4'))
            template += '<div class="swiper-slide" data-swiper-autoplay="' + duration[index] + '"><a class="wplightbox" data-group="gallery0" href="' + linkSwiper[index] + '"><video class="wpgmza-embedded-media" src="' + linkSwiper[index] + '"></video></a></div>'
        else
            template += '<div class="swiper-slide"><a class="wplightbox" data-group="gallery0" href="' + linkSwiper[index] + '" data-thumbnail="' + linkSwiper[index] + '"><img class="wpgmza-embedded-media" src="' + linkSwiper[index] + '"></a></div>'
    }

    template += '</div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div><div class="swiper-pagination"></div></div>'

    //Accordion detalles propiedad
    template += '<div class="accordion-container scrollableC"><div class="ac"><h2 class="ac-header"> <button type="button" class="ac-trigger">Detalles del Inmueble</button></h2><div class="ac-panel"><div class="ac-text"></div></div></div>'

    //Accordion Contacto
    template += '<div class="ac acCustom"><h2 class="ac-header"> <button type="button   " class="ac-trigger acContactar">Contactar</button></h2><div class="ac-panel"><div class="ac-text" id="contactForm">Contactar</div></div></div></div>'

    dataFinal.descripcion = template

    $('#preview').html(template)

    var iconos = ''

    $('#precioINMU').html(data.customFields.filter(e => e.name === 'Precio')[0].value)
    data.customFields.splice(1, 1)


    var iconos = '<div class="row rowChange">'
    for (var i = 1; i < data.customFields.length - 1; i++) {
        iconos += '<div class="col center"> <i style ="height: 35px;width:35px;" class ="inmu' + data.customFields[i].name + '"></i> <p class= "iconosText">' + data.customFields[i].value + '</p></div>'
    }
    iconos += "</div>"

    $('#iconosINMU').append(iconos)
    $('.ac-text').eq(0).append(data.customFields[0].value)


    $('#contactForm').html(contactTemplate)

    $('video.wpgmza-embedded-media').attr('webkit-playsinline', '')
    $('video.wpgmza-embedded-media').attr('playsinline', '')
    $('video.wpgmza-embedded-media').trigger('play')
    $('video.wpgmza-embedded-media').removeAttr('controls');
    $('video.wpgmza-embedded-media').attr('loop', '')
    var swiper = new Swiper(".mySwiper", {
        loop: false,
        centeredSlides: true,
        speed: 1000,

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

    acc = new Accordion('.accordion-container', {
        duration: 400,
        showMultiple: true,
    });
    acc.open(0)

    $('#preview').append('<a class="btn btn-primary" id="Enviar">Enviar a Excel</a>')


})