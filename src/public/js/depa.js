

$(document).on("submit", "#formDepa", function (event) {
    event.preventDefault()
$('#preview').html('')
    var categorias = []
    var data = {}
    var depaCat = ["2", "4", "5", "26"]
    categorias.push("2")

    $('#nav-depa').find('[name = amenidad]').each(function () {
        if ($(this).is(":checked"))
            categorias.push($(this).val())
    })
    if (!multipleExist(depaCat, categorias))
        categorias.push("7")

    //data final
    dataFinal.category = String(categorias).replace(/[|"|]|/g, "")
    dataFinal.baños = $('#nav-depa').find('[name = baños]').val()
    dataFinal.metros = $('#nav-depa').find('[name = metros]').val()
    dataFinal.habitaciones = $('#nav-depa').find('[name = habitaciones]').val()
    dataFinal.estacionamiento = $('#nav-depa').find('[name = estacionamiento]').val()
    dataFinal.precioMuestra = $('#nav-depa').find('[name = precioRango]').val()
    dataFinal.precio = $('#nav-depa').find('[name = precio]').val()
    dataFinal.titulo = $('#nav-depa').find('[name = titulo]').val()
    dataFinal.direccion = eliminarDiacriticos($('#nav-depa').find('[name = direccion]').val())
    dataFinal.detalles = $('#nav-depa').find('[name = detalles]').val()

    //
    data.categorias = categorias
    data.recorrido = $('#nav-depa').find('[name = recorrido]').val()
    data.precio = $('#nav-depa').find('[name = precioRango]').val()
    data.descripcion = $('#nav-depa').find('[name = descripcion]').val()

    data.customFields = []

    data.customFields.push({ name: "Descripcion", value: $('#nav-depa').find('[name = detalles]').val() })
    data.customFields.push({ name: "Precio", value: $('#nav-depa').find('[name = precioRango]').val() })
    data.customFields.push({ name: "Metros", value: $('#nav-depa').find('[name = metros]').val() })
    data.customFields.push({ name: "Estacionamiento", value: $('#nav-depa').find('[name = estacionamiento]').val() })
    data.customFields.push({ name: "Habitaciones", value: $('#nav-depa').find('[name = habitaciones]').val() })
    data.customFields.push({ name: "Baños", value: $('#nav-depa').find('[name = baños]').val() })
    data.customFields.push({ name: "Antiguedad", value: $('#nav-depa').find('[name = antiguedad]').val() })
    data.customFields.push({ name: "Pisos", value: $('#nav-depa').find('[name = pisos]').val() })


    var template = '<div id="precioINMU"></div><div id="iconosINMU"></div>'


    $('[name = materiales2]').each(function (i = 0) {
        if (i == 0) {
            template += `<div id="btnTipologias"><a id="tipologias" href="#mydiv0" data-thumbnail="${$(this).find('[name = descripcion]').val()}" class="wplightbox" data-group="gallery1">Tipologias</a></div>`
        }
        template += `<div id="mydiv${i}" class="d-none"><div class="lightboxcontainer"><img class="wpgmza-embedded-media" src="${$(this).find('[name = descripcion]').val()}"><div class="row iconsTipologia"><div class="col centerTipologia"> <i class="inmuIcon inmuPrecioMuestra"></i><p class="iconosText">${$(this).find('[name = precio]').val()}</p></div><div class="col centerTipologia"> <i class="inmuIcon inmuEstacionamiento"></i><p class="iconosText">${$(this).find('[name = estacionamiento]').val()}</p></div><div class="col centerTipologia"> <i class="inmuIcon inmuBaños"></i><p class="iconosText">${$(this).find('[name = baños]').val()}</p></div><div class="col centerTipologia"> <i class="inmuIcon inmuHabitaciones"></i><p class="iconosText">${$(this).find('[name = habitaciones]').val()}</p></div><div class="col centerTipologia"> <i class="inmuIcon inmuMetros"></i><p class="iconosText">${$(this).find('[name = metros]').val()}</p></div></div></div></div>`

        if (i != 0) {
            template += `<a href="#mydiv${i}" data-thumbnail="${$(this).find('[name = descripcion]').val()}" class="wplightbox d-none" data-group="gallery1"></a>`
        }

        if ($(this).find('[name = recorrido]').val() != "") {
            template += `<a href="${$(this).find('[name = recorrido]').val()}" data-thumbnail="https://inmu.mx/wp-content/uploads/2022/11/Recorrido.jpg" class="wplightbox d-none" data-group="gallery1"></a>`
        }

        i++
    })

    template += '<div class="swiper mySwiper"><div class="swiper-wrapper">'
    $('[name = linkSwipper]').each(async function () {
        index = $(this).index('[name = linkSwipper]')
        if ($(this).val().includes('mp4')) {
            template += '<div class="swiper-slide" data-swiper-autoplay="' + duration[index] + '"><a class="wplightbox" data-group="gallery0" href="' + $(this).val() + '"><video class="wpgmza-embedded-media" src="' + $(this).val() + '"></video></a></div>'
        } else if ($(this).val() == '') {
            return alert('Error: Campo Vacio en Swiper')
        } else {
            template += '<div class="swiper-slide"><a class="wplightbox" data-group="gallery0" href="' + $(this).val() + '" data-thumbnail="' + $(this).val() + '"><img class="wpgmza-embedded-media" src="' + $(this).val() + '"></a></div>'
        }
    })
    template += '</div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div><div class="swiper-pagination"></div></div>'

    //Accordion detalles propiedad
    template += '<div class="accordion-container scrollableC"><div class="ac"><h2 class="ac-header"> <button type="button" class="ac-trigger">Detalles del Inmueble</button></h2><div class="ac-panel"><div class="ac-text"></div></div></div>'

    //Accordion Contacto
    template += '<div class="ac acCustom"><h2 class="ac-header"> <button type="button   " class="ac-trigger acContactar">Contactar</button></h2><div class="ac-panel"><div class="ac-text" id="contactForm">Contactar</div></div></div></div>'

    dataFinal.descripcion = template
    console.log(template)

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